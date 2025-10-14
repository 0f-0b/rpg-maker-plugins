/*:
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter YEP_OptionsCore
 *
 * @param topLeftButtonName
 * @text Top Left Button Name
 * @type string
 * @default escape
 *
 * @param topLeftTriggerOnPress
 * @text Top Left Trigger On Press
 * @desc Also disables swipe gestures.
 * @type boolean
 * @default false
 *
 * @param bottomLeftButtonName
 * @text Bottom Left Button Name
 * @type string
 * @default escape
 *
 * @param bottomLeftTriggerOnPress
 * @text Bottom Left Trigger On Press
 * @desc Also disables swipe gestures.
 * @type boolean
 * @default false
 *
 * @param topRightButtonName
 * @text Top Right Button Name
 * @type string
 * @default ok
 *
 * @param topRightTriggerOnPress
 * @text Top Right Trigger On Press
 * @desc Also disables swipe gestures.
 * @type boolean
 * @default false
 *
 * @param bottomRightButtonName
 * @text Bottom Right Button Name
 * @type string
 * @default ok
 *
 * @param bottomRightTriggerOnPress
 * @text Bottom Right Trigger On Press
 * @desc Also disables swipe gestures.
 * @type boolean
 * @default false
 *
 * @param secondaryButtonName
 * @text Right Click/Two Finger Touch Button Name
 * @type string
 * @default cameraMode
 *
 * @param optionName
 * @text Option Name
 * @type string
 * @default Accessible Touch
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
 *   simpleTouchInput
 */

/*:zh
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter YEP_OptionsCore
 *
 * @param topLeftButtonName
 * @text 左上按键名称
 * @type string
 * @default escape
 *
 * @param topLeftTriggerOnPress
 * @text 左上按下时触发
 * @desc 同时会禁用滑动操作。
 * @type boolean
 * @default false
 *
 * @param bottomLeftButtonName
 * @text 左下按键名称
 * @type string
 * @default escape
 *
 * @param bottomLeftTriggerOnPress
 * @text 左下按下时触发
 * @desc 同时会禁用滑动操作。
 * @type boolean
 * @default false
 *
 * @param topRightButtonName
 * @text 右上按键名称
 * @type string
 * @default ok
 *
 * @param topRightTriggerOnPress
 * @text 右上按下时触发
 * @desc 同时会禁用滑动操作。
 * @type boolean
 * @default false
 *
 * @param bottomRightButtonName
 * @text 右下按键名称
 * @type string
 * @default ok
 *
 * @param bottomRightTriggerOnPress
 * @text 右下按下时触发
 * @desc 同时会禁用滑动操作。
 * @type boolean
 * @default false
 *
 * @param secondaryButtonName
 * @text 右键/双指触摸按键名称
 * @type string
 * @default cameraMode
 *
 * @param optionName
 * @text 选项名称
 * @type string
 * @default 无障碍触屏模式
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
 *   simpleTouchInput
 */

(() => {
  "use strict";

  const { abs, max, min } = Math;
  const hasOptionEx = !!Window_Options.prototype.restoreDefaultValues;
  const hasYEPOptionsCore = typeof Yanfly !== "undefined" && !!Yanfly.Options;
  const parameters = PluginManager.parameters("SimpleTouchInput");
  {
    const convert = (struct, converters) => {
      for (const [name, converter] of Object.entries(converters)) {
        struct[name] = converter(struct[name]);
      }
    };
    const string = (raw) => `${raw}`;
    const boolean = (raw) => raw === "true";
    convert(parameters, {
      topLeftButtonName: string,
      topLeftTriggerOnPress: boolean,
      bottomLeftButtonName: string,
      bottomLeftTriggerOnPress: boolean,
      topRightButtonName: string,
      topRightTriggerOnPress: boolean,
      bottomRightButtonName: string,
      bottomRightTriggerOnPress: boolean,
      secondaryButtonName: string,
      optionName: string,
      optionPlacement: string,
      defaultEnabled: boolean,
    });
    console.debug(parameters);
  }
  ConfigManager.simpleTouchInput = parameters.defaultEnabled;

  function getButtonName(x, y) {
    return x < 0.5
      ? (y < 0.5
        ? parameters.topLeftButtonName
        : parameters.bottomLeftButtonName)
      : (y < 0.5
        ? parameters.topRightButtonName
        : parameters.bottomRightButtonName);
  }

  function getTriggerOnPress(x, y) {
    return x < 0.5
      ? (y < 0.5
        ? parameters.topLeftTriggerOnPress
        : parameters.bottomLeftTriggerOnPress)
      : (y < 0.5
        ? parameters.topRightTriggerOnPress
        : parameters.bottomRightTriggerOnPress);
  }

  const touches = new Map();
  const releaseTimers = new Map();

  function clearTouches() {
    Input._currentState.up = false;
    Input._currentState.down = false;
    Input._currentState.left = false;
    Input._currentState.right = false;
    Input._currentState[parameters.topLeftButtonName] = false;
    Input._currentState[parameters.bottomLeftButtonName] = false;
    Input._currentState[parameters.topRightButtonName] = false;
    Input._currentState[parameters.bottomRightButtonName] = false;
    Input._currentState[parameters.secondaryButtonName] = false;
    touches.clear();
  }

  document.body.style.touchAction = "none";
  document.body.style.height = "100vh";
  document.body.style.margin = "0";
  document.addEventListener("pointerdown", (event) => {
    if (!ConfigManager.simpleTouchInput) {
      return;
    }
    let cancel = event.button === 2;
    if (!cancel) {
      if (event.button !== 0) {
        return;
      }
      for (const touch of touches.values()) {
        if (!(touch.hasMoved || touch.triggerOnPress)) {
          cancel = true;
          break;
        }
      }
    }
    if (cancel) {
      clearTouches();
      Input._currentState[parameters.secondaryButtonName] = true;
      releaseTimers.set(parameters.secondaryButtonName, 1);
      return;
    }
    const x = event.x / innerWidth;
    const y = event.y / innerHeight;
    const triggerOnPress = getTriggerOnPress(x, y);
    touches.set(event.pointerId, {
      startX: x,
      startY: y,
      hasMoved: false,
      triggerOnPress,
    });
    if (triggerOnPress) {
      const buttonName = getButtonName(x, y);
      Input._currentState[buttonName] = true;
    }
  });
  document.addEventListener("pointermove", (event) => {
    if (!ConfigManager.simpleTouchInput) {
      return;
    }
    const touch = touches.get(event.pointerId);
    if (!touch || touch.triggerOnPress) {
      return;
    }
    const x = event.x / innerWidth;
    const y = event.y / innerHeight;
    const aspectRatio = innerWidth / innerHeight;
    const dx = (x - touch.startX) * max(aspectRatio, 1);
    const dy = (y - touch.startY) / min(aspectRatio, 1);
    const threshold = 0.1;
    const accuracy = 0.5;
    if (abs(dx) < threshold && abs(dy) < threshold) {
      return;
    }
    Input._currentState.up = dy < -abs(dx) * accuracy;
    Input._currentState.down = dy > abs(dx) * accuracy;
    Input._currentState.left = dx < -abs(dy) * accuracy;
    Input._currentState.right = dx > abs(dy) * accuracy;
    touch.hasMoved = true;
  });
  document.addEventListener("pointerup", (event) => {
    if (!ConfigManager.simpleTouchInput) {
      return;
    }
    const touch = touches.get(event.pointerId);
    if (!touch) {
      return;
    }
    if (touch.hasMoved) {
      Input._currentState.up = false;
      Input._currentState.down = false;
      Input._currentState.left = false;
      Input._currentState.right = false;
    } else if (touch.triggerOnPress) {
      const buttonName = getButtonName(touch.startX, touch.startY);
      Input._currentState[buttonName] = false;
    } else {
      const x = event.x / innerWidth;
      const y = event.y / innerHeight;
      const buttonName = getButtonName(x, y);
      Input._currentState[buttonName] = true;
      releaseTimers.set(buttonName, 1);
    }
    touches.delete(event.pointerId);
  });
  document.addEventListener("touchcancel", () => {
    if (!ConfigManager.simpleTouchInput) {
      return;
    }
    clearTouches();
  });

  Patcher.patch(Input, "update", {
    postfix() {
      if (!ConfigManager.simpleTouchInput && touches.size !== 0) {
        clearTouches();
      }
      for (const [name, timer] of releaseTimers) {
        if (timer > 0) {
          releaseTimers.set(name, timer - 1);
        } else {
          Input._currentState[name] = false;
          releaseTimers.delete(name);
        }
      }
    },
  });

  for (
    const key of [
      "isClicked",
      "isPressed",
      "isTriggered",
      "isRepeated",
      "isLongPressed",
      "isCancelled",
      "isMoved",
      "isHovered",
      "isReleased",
    ]
  ) {
    if (TouchInput[key]) {
      Patcher.patch(TouchInput, key, {
        prefix(ctx) {
          if (ConfigManager.simpleTouchInput) {
            ctx.result = false;
            return true;
          }
        },
      });
    }
  }

  Patcher.patch(ConfigManager, "makeData", {
    postfix({ result }) {
      result.simpleTouchInput = this.simpleTouchInput;
    },
  });

  Patcher.patch(ConfigManager, "applyData", {
    postfix({ args: [config] }) {
      this.simpleTouchInput = typeof config.simpleTouchInput === "boolean"
        ? config.simpleTouchInput
        : parameters.defaultEnabled;
    },
  });

  if (hasOptionEx) {
    Patcher.patch(Window_Options.prototype, "restoreDefaultValues", {
      postfix() {
        ConfigManager.simpleTouchInput = parameters.defaultEnabled;
      },
    });
  }

  if (!hasYEPOptionsCore) {
    Patcher.patch(Window_Options.prototype, "makeCommandList", {
      postfix() {
        if (parameters.optionPlacement === "after all options") {
          const optionName = parameters.optionName;
          if (optionName) {
            this.addCommand(optionName, "simpleTouchInput");
          }
        }
      },
    });

    Patcher.patch(Window_Options.prototype, "addGeneralOptions", {
      postfix() {
        if (parameters.optionPlacement === "after general options") {
          const optionName = parameters.optionName;
          if (optionName) {
            this.addCommand(optionName, "simpleTouchInput");
          }
        }
      },
    });
  }
})();
