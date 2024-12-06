/*:
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
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
 * @param optionName
 * @text Option Name
 * @type string
 * @default Accessible Touch
 *
 * @param defaultEnabled
 * @text Enable By Default
 * @type boolean
 * @default false
 */

/*:zh
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
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
 * @param optionName
 * @text 选项名称
 * @type string
 * @default 无障碍触屏模式
 *
 * @param defaultEnabled
 * @text 默认启用
 * @type boolean
 * @default false
 */

(() => {
  "use strict";

  const { abs, max, min } = Math;
  const hasOptionEx = !!Window_Options.prototype.restoreDefaultValues;
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
      optionName: string,
      defaultEnabled: boolean,
    });
    console.debug(parameters);
  }
  let enabled = parameters.defaultEnabled;
  Object.defineProperty(ConfigManager, "simpleTouchInput", {
    get: () => enabled,
    set: (value) => enabled = value,
    configurable: true,
  });

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
    touches.clear();
  }

  document.body.style.touchAction = "none";
  document.body.style.height = "100vh";
  document.body.style.margin = "0";
  document.addEventListener("pointerdown", (event) => {
    if (!enabled) {
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
    if (!enabled) {
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
    if (!enabled) {
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
    if (!enabled) {
      return;
    }
    clearTouches();
  });

  Patcher.patch(Input, "update", {
    postfix() {
      if (!enabled && touches.size !== 0) {
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
          if (enabled) {
            ctx.result = false;
            return true;
          }
        },
      });
    }
  }

  Patcher.patch(ConfigManager, "makeData", {
    postfix({ result }) {
      result.simpleTouchInput = enabled;
    },
  });

  Patcher.patch(ConfigManager, "applyData", {
    postfix({ args: [config] }) {
      enabled = typeof config.simpleTouchInput === "boolean"
        ? config.simpleTouchInput
        : parameters.defaultEnabled;
    },
  });

  Patcher.patch(Window_Options.prototype, "addGeneralOptions", {
    postfix() {
      const optionName = parameters.optionName;
      if (optionName) {
        this.addCommand(optionName, "simpleTouchInput");
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
