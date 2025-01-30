/*:
 * @target MV MZ
 * @base FootstepSound
 * @base Patcher
 *
 * @param optionName
 * @text Option Name
 * @type string
 * @default Footstep Sound
 *
 * @param optionPlacement
 * @text Option Placement
 * @type select
 * @default after general options
 * @option After general options
 * @value after general options
 * @option After all options
 * @value after all options
 *
 * @param defaultEnabled
 * @text Enable By Default
 * @type boolean
 * @default false
 */

/*:zh
 * @target MV MZ
 * @base FootstepSound
 * @base Patcher
 *
 * @param optionName
 * @text 选项名称
 * @type string
 * @default 脚步声
 *
 * @param optionPlacement
 * @text 选项位置
 * @type select
 * @default after general options
 * @option 一般选项后
 * @value after general options
 * @option 全部选项后
 * @value after all options
 *
 * @param defaultEnabled
 * @text 默认启用
 * @type boolean
 * @default false
 */

(() => {
  "use strict";

  const hasOptionEx = !!Window_Options.prototype.restoreDefaultValues;
  const parameters = PluginManager.parameters("FootstepToggle");
  {
    const convert = (struct, converters) => {
      for (const [name, converter] of Object.entries(converters)) {
        struct[name] = converter(struct[name]);
      }
    };
    const string = (raw) => `${raw}`;
    const boolean = (raw) => raw === "true";
    convert(parameters, {
      optionName: string,
      optionPlacement: string,
      defaultEnabled: boolean,
    });
    console.debug(parameters);
  }
  let enabled = parameters.defaultEnabled;
  Object.defineProperty(ConfigManager, "footstepSound", {
    get: () => enabled,
    set: (value) => enabled = value,
    configurable: true,
  });

  Patcher.patch(Game_Player.prototype, "isPlayStepSound", {
    postfix(ctx) {
      if (!enabled) {
        ctx.result = false;
        return true;
      }
    },
  });

  Patcher.patch(ConfigManager, "makeData", {
    postfix({ result }) {
      result.footstepSound = enabled;
    },
  });

  Patcher.patch(ConfigManager, "applyData", {
    postfix({ args: [config] }) {
      enabled = typeof config.footstepSound === "boolean"
        ? config.footstepSound
        : parameters.defaultEnabled;
    },
  });

  Patcher.patch(Window_Options.prototype, "makeCommandList", {
    postfix() {
      if (parameters.optionPlacement === "after all options") {
        const optionName = parameters.optionName;
        if (optionName) {
          this.addCommand(optionName, "footstepSound");
        }
      }
    },
  });

  Patcher.patch(Window_Options.prototype, "addGeneralOptions", {
    postfix() {
      if (parameters.optionPlacement === "after general options") {
        const optionName = parameters.optionName;
        if (optionName) {
          this.addCommand(optionName, "footstepSound");
        }
      }
    },
  });

  if (hasOptionEx) {
    Patcher.patch(Window_Options.prototype, "restoreDefaultValues", {
      postfix() {
        enabled = parameters.defaultEnabled;
      },
    });
  }
})();
