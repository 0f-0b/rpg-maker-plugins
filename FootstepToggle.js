/*:
 * @target MV MZ
 * @base FootstepSound
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter YEP_OptionsCore
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
 *
 * @help
 *
 * Option Symbols:
 *   footstepSound
 */

/*:zh
 * @target MV MZ
 * @base FootstepSound
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter YEP_OptionsCore
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
 *
 * @help
 *
 * 选项符号:
 *   footstepSound
 */

(() => {
  "use strict";

  const hasOptionEx = !!Window_Options.prototype.restoreDefaultValues;
  const hasYEPOptionsCore = typeof Yanfly !== "undefined" && !!Yanfly.Options;
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
  ConfigManager.footstepSound = parameters.defaultEnabled;

  Patcher.patch(Game_Player.prototype, "isPlayStepSound", {
    postfix(ctx) {
      if (!ConfigManager.footstepSound) {
        ctx.result = false;
        return true;
      }
    },
  });

  Patcher.patch(ConfigManager, "makeData", {
    postfix({ result }) {
      result.footstepSound = this.footstepSound;
    },
  });

  Patcher.patch(ConfigManager, "applyData", {
    postfix({ args: [config] }) {
      this.footstepSound = typeof config.footstepSound === "boolean"
        ? config.footstepSound
        : parameters.defaultEnabled;
    },
  });

  if (hasOptionEx) {
    Patcher.patch(Window_Options.prototype, "restoreDefaultValues", {
      postfix() {
        ConfigManager.footstepSound = parameters.defaultEnabled;
      },
    });
  }

  if (!hasYEPOptionsCore) {
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
  }
})();
