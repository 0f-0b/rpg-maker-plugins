/*:
 * @target MV MZ
 */

self.Patcher = (() => {
  "use strict";

  const dev = false;
  const hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
  const { getOwnPropertyDescriptor, getPrototypeOf } = Object;

  function getOrInsert(mapLike, key, callback) {
    const existing = mapLike.get(key);
    if (existing !== undefined || mapLike.has(key)) {
      return existing;
    }
    const value = callback(key);
    mapLike.set(key, value);
    return value;
  }

  function patch(target, key, { prefix, postfix }) {
    const original = target[key];
    if (typeof original !== "function") {
      throw new TypeError(`Patch failed: ${String(key)} is missing`);
    }
    const own = hasOwn(target, key);
    const proto = own ? null : getPrototypeOf(target);
    const patched = target[key] = function (...args) {
      const ctx = { args, result: undefined };
      if (prefix && prefix.call(this, ctx)) {
        return ctx.result;
      }
      ctx.result = (proto ? proto[key] : original).apply(this, args);
      if (postfix) {
        postfix.call(this, ctx);
      }
      return ctx.result;
    };
    if (own) {
      replaceGlobals:
      for (
        const path of [
          // Drill_MenuBackground
          ["_drill_MBa_terminate"],
          // Drill_SceneMain
          ["_drill_SMa_statusWindowRefresh"],
          // FlyCat_MiniWindowUi
          ["FlyCat", "MiniWindowUi", "Window_MiniCommand_select"],
          ["FlyCat", "MiniWindowUi", "Window_MiniItem_select"],
          // LiuYue_AutoSave
          ["Zzy", "ASF", "Scene_Menu_terminate"],
          // LiuYue_SealSkill
          ["Zzy", "SSF", "Window_SkillType_select"],
          // MOG_MenuParticles
          ["_alias_mog_mpart_scmb_terminate"],
        ]
      ) {
        const depth = path.length - 1;
        let obj = self;
        for (let i = 0; i < depth; i++) {
          obj = obj[path[i]];
          if (obj === null || typeof obj !== "object") {
            continue replaceGlobals;
          }
        }
        const name = path[depth];
        if (obj[name] === original) {
          console.debug(`Replacing global ${path.join(".")}`);
          obj[name] = patched;
        }
      }
      if (dev) {
        for (const key of Object.keys(self)) {
          if (key === "chrome") {
            continue;
          }
          const desc = getOwnPropertyDescriptor(self, key);
          if (!hasOwn(desc, "value") || !desc.writable || desc.configurable) {
            continue;
          }
          const path = [key];
          const seen = new Set();
          (function walk(obj) {
            if (obj === original) {
              console.warn(
                `Found unpatched global ${path.join(".")}; stuff may break`,
              );
              return;
            }
            if (
              obj === null || typeof obj !== "object" ||
              ArrayBuffer.isView(obj) || seen.has(obj)
            ) {
              return;
            }
            seen.add(obj);
            for (const key of Object.keys(obj)) {
              const desc = getOwnPropertyDescriptor(obj, key);
              if (!hasOwn(desc, "value") || !desc.writable) {
                continue;
              }
              path.push(key);
              walk(desc.value);
              path.pop();
            }
          })(desc.value);
        }
      }
    }
    // MOG_MenuParticles
    if (
      target === Scene_Base.prototype && key === "terminate" &&
      Scene_MenuBase.prototype.createMenuParticles
    ) {
      patch(Scene_MenuBase.prototype, key, { prefix, postfix });
    }
    // OptionEx
    if (
      target === Window_Selectable.prototype && key === "select" &&
      Window_Options.prototype.restoreDefaultValues
    ) {
      patch(Window_Options.prototype, key, { prefix, postfix });
    }
    // Torigoya_SkillCutIn
    if (
      target === Scene_Base.prototype && key === "update" &&
      Scene_Message.prototype.torigoyaSkillCutIn_updateCutIn
    ) {
      patch(Scene_Message.prototype, key, { prefix, postfix });
    }
  }

  const foundClassCallbacks = new WeakMap();

  function findClass(Base, derivedName, callback) {
    getOrInsert(
      getOrInsert(foundClassCallbacks, Base.prototype, (baseProto) => {
        const map = new Map();
        patch(baseProto, "initialize", {
          prefix() {
            if (map.size === 0) {
              return;
            }
            // deno-lint-ignore no-this-alias
            for (let o = this; o !== baseProto; o = getPrototypeOf(o)) {
              const Derived = o.constructor;
              const derivedName = Derived.name;
              const list = map.get(derivedName);
              if (!list) {
                continue;
              }
              map.delete(derivedName);
              for (const callback of list) {
                callback(Derived);
              }
            }
          },
        });
        return map;
      }),
      derivedName,
      () => [],
    ).push(callback);
  }

  return { patch, findClass };
})();
