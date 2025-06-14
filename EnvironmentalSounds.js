/*:
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter SAN_AnalogMove
 * @orderAfter TMSrpg
 *
 * @param enterMapSe
 * @text Enter Map SE
 * @type struct<sound>
 * @default {"name":"a_enterMap","volume":"50","pitch":"100","pan":"0"}
 *
 * @param changeMapSe
 * @text Change Map SE
 * @type struct<sound>
 * @default {"name":"a_changeMap","volume":"50","pitch":"100","pan":"0"}
 *
 * @param bumpSe
 * @text Bump SE
 * @type struct<sound>
 * @default {"name":"a_bump","volume":"50","pitch":"100","pan":"50"}
 *
 * @param bumpSeInterval
 * @text Bump SE Interval (Frames)
 * @type number
 * @default 30
 *
 * @param nearObstacleSe
 * @text Near Obstacle SE
 * @type struct<sound>
 * @default {"name":"a_nearObstacle","volume":"120","pitch":"100","pan":"100"}
 *
 * @param nearObstacleDistance
 * @text Near Obstacle Max Distance
 * @type number
 * @default 2
 *
 * @param nearEventSeJs
 * @text Near Event SE (JS)
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "switch (this.event().meta.evtype) {\n  case \"1\":\n    return { name: \"Cursor1\", volume: 100, pitch: 100, pan: 100 };\n  case \"2\":\n    return { name: \"a_nearEvent_2\", volume: 50, pitch: 100, pan: 100 };\n  case \"3\":\n    return { name: \"a_nearEvent_3\", volume: 100, pitch: 100, pan: 100 };\n  case \"4\":\n    return { name: \"a_nearEvent_4\", volume: 100, pitch: 100, pan: 100 };\n  case \"5\":\n    return { name: \"a_nearEvent_5\", volume: 100, pitch: 100, pan: 100 };\n  default:\n    return { name: \"a_nearEvent\", volume: 100, pitch: 100, pan: 100 };\n}"
 *
 * @param nearEventDistance
 * @text Near Event Max Distance
 * @type number
 * @default 2
 *
 * @param nearRegionEventSe
 * @text Near Region Event SE
 * @desc For use with the YEP_RegionEvents plugin.
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"100"}
 *
 * @param nearRegionEventDistance
 * @text Near Region Event Max Distance
 * @desc For use with the YEP_RegionEvents plugin.
 * @type number
 * @default 1
 *
 * @param npcMoveSeJs
 * @text NPC Move SE (JS)
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "switch (this.event().meta.movetype) {\n  case \"npc\":\n    return { name: \"a_npcMove\", volume: 100, pitch: 100, pan: 50 };\n  case \"magic\":\n    return { name: \"a_magicMove\", volume: 100, pitch: 100, pan: 50 };\n  default:\n    return { name: \"a_eventMove\", volume: 100, pitch: 100, pan: 50 };\n}"
 *
 * @param npcTurnSeJs
 * @text NPC Turn SE (JS)
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "return { name: \"Wind7\", volume: 50, pitch: 100, pan: 50 };"
 *
 * @param npcIdleSeJs
 * @text NPC Idle SE (JS)
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number; interval: number } | null
 * @type note
 * @default "return null;"
 *
 * @param navigateSe
 * @text Navigation SE
 * @type struct<sound>
 * @default {"name":"Starlight","volume":"70","pitch":"100","pan":"50"}
 *
 * @param navigateSeInterval
 * @text Navigation SE Interval (Frames)
 * @type number
 * @default 60
 *
 * @param leaderGainHpSe
 * @text Leader Gain HP SE
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param leaderLoseHpSe
 * @text Leader Lose HP SE
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param gainGoldSe
 * @text Gain Gold SE
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param loseGoldSe
 * @text Lose Gold SE
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param variableChangeSe
 * @text Variable Change SE
 * @type struct<variableChangeSe>[]
 * @default []
 *
 * @param cameraMoveSe
 * @text Camera Move SE
 * @type struct<sound>
 * @default {"name":"a_cameraMove","volume":"100","pitch":"100","pan":"50"}
 *
 * @param cameraModeKeyCode
 * @text Camera Mode Key Code
 * @desc Refer to https://developer.mozilla.org/docs/Web/API/KeyboardEvent/keyCode for details. Set to 0 if you need to disable camera mode or to manage key bindings with another plugin.
 * @type number
 * @default 71
 *
 * @param optionGroupName
 * @text Option Group Name
 * @type string
 * @default Assistive SE Options
 *
 * @param mapSeVolumeOptionName
 * @text Map SE Volume Option Name
 * @desc Enter Map, Change Map, Bump, NPC Move, NPC Idle, Navigation.
 * @type string
 * @default Map Volume
 *
 * @param mapSeVolumeDefaultValue
 * @text Map SE Volume Default Value
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param obstacleSeVolumeOptionName
 * @text Obstacle SE Volume Option Name
 * @desc Neqr Obstacle.
 * @type string
 * @default Obstacle Sensing Volume
 *
 * @param obstacleSeVolumeDefaultValue
 * @text Obstacle SE Volume Default Value
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param eventSeVolumeOptionName
 * @text Event SE Volume Option Name
 * @desc Near Event, Near Region Event.
 * @type string
 * @default Event Sensing Volume
 *
 * @param eventSeVolumeDefaultValue
 * @text Event SE Volume Default Value
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param alertSeVolumeOptionName
 * @text Alert SE Volume Option Name
 * @desc Leader HP Change, Gain/Lose Gold, Variable Change.
 * @type string
 * @default Alert Volume
 *
 * @param alertSeVolumeDefaultValue
 * @text Alert SE Volume Default Value
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param globalSpatialSeOptionName
 * @text Global Spatial SE Option Name
 * @desc Controls whether “Play SE” commands are spatialized.
 * @type string
 * @default Global Spatial SE
 *
 * @param globalSpatialSeDefaultValue
 * @text Global Spatial SE Default Value
 * @type boolean
 * @default false
 *
 * @help
 *
 * Button Names:
 *   cameraMode     # Enters camera mode when triggered on the map screen.
 */

/*~struct~variableChangeSe:
 * @param variableId
 * @text Variable ID
 * @type variable
 * @default 1
 *
 * @param onIncrease
 * @text On Increase
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param onDecrease
 * @text On Decrease
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 */

/*~struct~sound:
 * @param name
 * @text Filename
 * @type file
 * @dir audio/se
 *
 * @param volume
 * @text Volume
 * @type number
 * @default 100
 * @min 0
 * @max 100
 *
 * @param pitch
 * @text Pitch
 * @type number
 * @default 100
 * @min 1
 * @max 10000
 *
 * @param pan
 * @text Pan
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */

/*:zh
 * @target MV MZ
 * @base Patcher
 * @orderAfter OptionEx
 * @orderAfter SAN_AnalogMove
 * @orderAfter TMSrpg
 *
 * @param enterMapSe
 * @text 进入地图音效
 * @type struct<sound>
 * @default {"name":"a_enterMap","volume":"50","pitch":"100","pan":"0"}
 *
 * @param changeMapSe
 * @text 切换地图音效
 * @type struct<sound>
 * @default {"name":"a_changeMap","volume":"50","pitch":"100","pan":"0"}
 *
 * @param bumpSe
 * @text 碰撞音效
 * @type struct<sound>
 * @default {"name":"a_bump","volume":"50","pitch":"100","pan":"50"}
 *
 * @param bumpSeInterval
 * @text 碰撞音效间隔（帧）
 * @type number
 * @default 30
 *
 * @param nearObstacleSe
 * @text 接近障碍物音效
 * @type struct<sound>
 * @default {"name":"a_nearObstacle","volume":"120","pitch":"100","pan":"100"}
 *
 * @param nearObstacleDistance
 * @text 接近障碍物最大距离
 * @type number
 * @default 2
 *
 * @param nearEventSeJs
 * @text 接近事件音效（JS）
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "switch (this.event().meta.evtype) {\n  case \"1\":\n    return { name: \"Cursor1\", volume: 100, pitch: 100, pan: 100 };\n  case \"2\":\n    return { name: \"a_nearEvent_2\", volume: 50, pitch: 100, pan: 100 };\n  case \"3\":\n    return { name: \"a_nearEvent_3\", volume: 100, pitch: 100, pan: 100 };\n  case \"4\":\n    return { name: \"a_nearEvent_4\", volume: 100, pitch: 100, pan: 100 };\n  case \"5\":\n    return { name: \"a_nearEvent_5\", volume: 100, pitch: 100, pan: 100 };\n  default:\n    return { name: \"a_nearEvent\", volume: 100, pitch: 100, pan: 100 };\n}"
 *
 * @param nearEventDistance
 * @text 接近事件最大距离
 * @type number
 * @default 2
 *
 * @param nearRegionEventSe
 * @text 接近区域事件音效
 * @desc 用于 YEP_RegionEvents 插件。
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"100"}
 *
 * @param nearRegionEventDistance
 * @text 接近区域事件最大距离
 * @desc 用于 YEP_RegionEvents 插件。
 * @type number
 * @default 1
 *
 * @param npcMoveSeJs
 * @text NPC 移动音效（JS）
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "switch (this.event().meta.movetype) {\n  case \"npc\":\n    return { name: \"a_npcMove\", volume: 100, pitch: 100, pan: 50 };\n  case \"magic\":\n    return { name: \"a_magicMove\", volume: 100, pitch: 100, pan: 50 };\n  default:\n    return { name: \"a_eventMove\", volume: 100, pitch: 100, pan: 50 };\n}"
 *
 * @param npcTurnSeJs
 * @text NPC 转身音效（JS）
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number } | null
 * @type note
 * @default "return { name: \"Wind7\", volume: 50, pitch: 100, pan: 50 };"
 *
 * @param npcIdleSeJs
 * @text NPC 空闲音效（JS）
 * @desc function (this: Game_Event): { name: string; volume: number; pitch: number; pan: number; interval: number } | null
 * @type note
 * @default "return null;"
 *
 * @param navigateSe
 * @text 导航音效
 * @type struct<sound>
 * @default {"name":"Starlight","volume":"70","pitch":"100","pan":"50"}
 *
 * @param navigateSeInterval
 * @text 导航音效间隔（帧）
 * @type number
 * @default 60
 *
 * @param leaderGainHpSe
 * @text 领队 HP 增加音效
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param leaderLoseHpSe
 * @text 领队 HP 减少音效
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param gainGoldSe
 * @text 获得金钱音效
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param loseGoldSe
 * @text 失去金钱音效
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param variableChangeSe
 * @text 变量改变音效
 * @type struct<variableChangeSe>[]
 * @default []
 *
 * @param cameraMoveSe
 * @text 相机移动音效
 * @type struct<sound>
 * @default {"name":"a_cameraMove","volume":"100","pitch":"100","pan":"50"}
 *
 * @param cameraModeKeyCode
 * @text 相机模式键码
 * @desc 详见 https://developer.mozilla.org/docs/Web/API/KeyboardEvent/keyCode。需禁用相机模式或用其他插件管理键位映射时填 0。
 * @type number
 * @default 71
 *
 * @param optionGroupName
 * @text 选项组名称
 * @type string
 * @default 辅助音效设置
 *
 * @param mapSeVolumeOptionName
 * @text 地图音效音量选项名称
 * @desc 进入地图、切换地图、碰撞、NPC 移动、NPC 空闲、导航。
 * @type string
 * @default 地图音量
 *
 * @param mapSeVolumeDefaultValue
 * @text 地图音效音量默认值
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param obstacleSeVolumeOptionName
 * @text 障碍探测音效音量选项名称
 * @desc 接近障碍物。
 * @type string
 * @default 障碍探测音量
 *
 * @param obstacleSeVolumeDefaultValue
 * @text 障碍探测音效音量默认值
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param eventSeVolumeOptionName
 * @text 事件探测音效音量选项名称
 * @desc 接近事件、接近区域事件。
 * @type string
 * @default 事件探测音量
 *
 * @param eventSeVolumeDefaultValue
 * @text 事件探测音效音量默认值
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param alertSeVolumeOptionName
 * @text 提醒音效音量选项名称
 * @desc 领队 HP 改变、金钱改变、变量改变。
 * @type string
 * @default 提醒音量
 *
 * @param alertSeVolumeDefaultValue
 * @text 提醒音效音量默认值
 * @type number
 * @default 0
 * @min 0
 * @max 100
 *
 * @param globalSpatialSeOptionName
 * @text 全局空间音效选项名称
 * @desc 控制“播放 SE”指令是否被空间化。
 * @type string
 * @default 全局空间音效
 *
 * @param globalSpatialSeDefaultValue
 * @text 全局空间音效默认值
 * @type boolean
 * @default false
 *
 * @help
 *
 * 按键名称:
 *   cameraMode     # 在地图场景触发时进入相机模式。
 */

/*~struct~variableChangeSe:zh
 * @param variableId
 * @text 变量 ID
 * @type variable
 * @default 1
 *
 * @param onIncrease
 * @text 增加时
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 *
 * @param onDecrease
 * @text 减少时
 * @type struct<sound>
 * @default {"name":"","volume":"100","pitch":"100","pan":"0"}
 */

/*~struct~sound:zh
 * @param name
 * @text 文件名
 * @type file
 * @dir audio/se
 *
 * @param volume
 * @text 音量
 * @type number
 * @default 100
 * @min 0
 * @max 100
 *
 * @param pitch
 * @text 音高
 * @type number
 * @default 100
 * @min 1
 * @max 10000
 *
 * @param pan
 * @text 声像
 * @type number
 * @default 0
 * @min -100
 * @max 100
 */

self.EnvironmentalSounds = (() => {
  "use strict";

  const {
    PI,
    abs,
    atan2,
    ceil,
    cos,
    floor,
    hypot,
    max,
    min,
    random,
    round,
    sign,
    sin,
  } = Math;
  const clamp = (x, lower, upper) => min(max(x, lower), upper);
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const isMV = Utils.RPGMAKER_NAME === "MV";
  const hasOptionEx = !!Window_Options.prototype.restoreDefaultValues;
  const hasSANAnalogMove = typeof Sanshiro !== "undefined" &&
    !!Sanshiro.AnalogMove;
  const hasTMSrpg = typeof Imported !== "undefined" && !!Imported.TMSrpg;
  const parameters = PluginManager.parameters("EnvironmentalSounds");
  {
    const convert = (struct, converters) => {
      for (const [name, converter] of Object.entries(converters)) {
        struct[name] = converter(struct[name]);
      }
    };
    const string = (raw) => `${raw}`;
    const note = (raw) => `${JSON.parse(raw)}`;
    const number = (raw) => +raw;
    const boolean = (raw) => raw === "true";
    const array = (converter) => (raw) => {
      const arr = JSON.parse(raw);
      for (const index of arr.keys()) {
        arr[index] = converter(arr[index]);
      }
      return arr;
    };
    const struct = (converters) => (raw) => {
      const obj = JSON.parse(raw);
      convert(obj, converters);
      return obj;
    };
    const sound = {
      name: string,
      volume: number,
      pitch: number,
      pan: number,
    };
    const variableChangeSe = {
      variableId: number,
      onIncrease: struct(sound),
      onDecrease: struct(sound),
    };
    convert(parameters, {
      enterMapSe: struct(sound),
      changeMapSe: struct(sound),
      bumpSe: struct(sound),
      bumpSeInterval: number,
      nearObstacleSe: struct(sound),
      nearObstacleDistance: number,
      nearEventSeJs: note,
      nearEventDistance: number,
      nearRegionEventSe: struct(sound),
      nearRegionEventDistance: number,
      npcMoveSeJs: note,
      npcTurnSeJs: note,
      npcIdleSeJs: note,
      navigateSe: struct(sound),
      navigateSeInterval: number,
      leaderGainHpSe: struct(sound),
      leaderLoseHpSe: struct(sound),
      gainGoldSe: struct(sound),
      loseGoldSe: struct(sound),
      variableChangeSe: array(struct(variableChangeSe)),
      cameraMoveSe: struct(sound),
      cameraModeKeyCode: number,
      optionGroupName: string,
      mapSeVolumeOptionName: string,
      mapSeVolumeDefaultValue: number,
      obstacleSeVolumeOptionName: string,
      obstacleSeVolumeDefaultValue: number,
      eventSeVolumeOptionName: string,
      eventSeVolumeDefaultValue: number,
      alertSeVolumeOptionName: string,
      alertSeVolumeDefaultValue: number,
      globalSpatialSeOptionName: string,
      globalSpatialSeDefaultValue: boolean,
    });
    console.debug(parameters);
  }
  parameters.nearEventSeJs = new Function(parameters.nearEventSeJs);
  parameters.npcMoveSeJs = new Function(parameters.npcMoveSeJs);
  parameters.npcTurnSeJs = new Function(parameters.npcTurnSeJs);
  parameters.npcIdleSeJs = new Function(parameters.npcIdleSeJs);
  if (parameters.cameraModeKeyCode) {
    Input.keyMapper[parameters.cameraModeKeyCode] = "cameraMode";
  }

  function removeRandom(array) {
    const length = array.length;
    if (length === 0) {
      return undefined;
    }
    const index = floor(random() * length);
    const value = array[index];
    array[index] = array[length - 1];
    array.pop();
    return value;
  }

  class Audio extends WebAudio {
    constructor(url) {
      super(url);
      this._isPlaying = false;
      this._onEnd = this.stop.bind(this);
    }

    // for MV and MZ
    isPlaying() {
      return this._isPlaying;
    }

    play(loop, offset) {
      super.play(loop, offset);
      this._isPlaying = true;
    }

    stop() {
      this._isPlaying = false;
      super.stop();
    }

    _createEndTimer() {
      if (isMV) {
        const sourceNode = this._sourceNode;
        if (!sourceNode || sourceNode.loop) {
          return;
        }
        this._endTimer = sourceNode;
      } else {
        const sourceNodes = this._sourceNodes;
        if (sourceNodes.length === 0 || this._loop) {
          return;
        }
        this._endTimer = sourceNodes[sourceNodes.length - 1];
      }
      this._endTimer.addEventListener("ended", this._onEnd);
    }

    _removeEndTimer() {
      if (this._endTimer) {
        this._endTimer.removeEventListener("ended", this._onEnd);
        this._endTimer = null;
      }
    }
  }

  class SpatialAudio extends Audio {
    constructor(url) {
      super(url);
      this._azimuth = 0;
      this._distance = 0;
      this._attenuationDistance = 1;
      this._pitchNode = null;
    }

    get azimuth() {
      return this._azimuth;
    }

    set azimuth(value) {
      this._azimuth = value;
      this._updatePitch();
      this._updatePanner();
    }

    get distance() {
      return this._distance;
    }

    set distance(value) {
      this._distance = value;
      this._updatePanner();
    }

    get attenuationDistance() {
      return this._attenuationDistance;
    }

    set attenuationDistance(value) {
      this._attenuationDistance = value;
      this._updatePanner();
    }

    get pitchChange() {
      return this._pitchChange;
    }

    set pitchChange(value) {
      this._pitchChange = value;
      this._updatePitch();
    }

    setPosition(x, y) {
      this._azimuth = atan2(x, y);
      this._distance = hypot(x, y);
      this._updatePitch();
      this._updatePanner();
    }

    _createPitchNode() {
      this._pitchNode = WebAudio._context.createConstantSource();
      this._pitchNode.start();
      this._updatePitch();
    }

    _updatePitch() {
      if (this._pitchNode) {
        const pitch = this._distance === 0
          ? 1
          : this._pitchChange ** cos(this._azimuth);
        this._pitchNode.offset.value = (pitch - 1) * this._pitch;
      }
    }

    // for MV and MZ
    _updatePanner() {
      if (this._pannerNode) {
        const azimuth = this._azimuth;
        const distance = this._distance;
        const pan = lerp(round(azimuth / PI) * PI, azimuth, this._pan);
        this._pannerNode.positionX.value = sin(pan) * distance;
        this._pannerNode.positionZ.value = cos(pan) * distance;
        this._pannerNode.refDistance = this._attenuationDistance;
      }
    }

    // for MV
    _createNodes() {
      super._createNodes();
      this._createPitchNode();
    }

    _connectNodes() {
      super._connectNodes();
      if (this._sourceNode) {
        this._pitchNode.connect(this._sourceNode.playbackRate);
      }
    }

    // for MZ
    _createGainNode() {
      super._createGainNode();
      this._createPitchNode();
    }

    _createSourceNode(index) {
      super._createSourceNode(index);
      if (isMV) {
        // assume it's AudioStreaming.js
        if (index && index.sourceNode) {
          this._pitchNode.connect(index.sourceNode.playbackRate);
        }
        return;
      }
      this._pitchNode.connect(this._sourceNodes[index].playbackRate);
    }
  }

  function getListenerPos() {
    const cameraMode = $gameTemp._cameraMode;
    if (cameraMode) {
      const { camera } = cameraMode;
      return { x: camera.x, y: camera.y };
    }
    return { x: $gamePlayer._x, y: $gamePlayer._y };
  }

  class FixedPositionProvider {
    constructor(x, y) {
      this._x = x;
      this._y = y;
    }

    update(buffer) {
      buffer.setPosition(this._x, this._y);
    }
  }

  class AbsolutePositionProvider {
    constructor(mapId, x, y) {
      this._mapId = mapId;
      this._x = x;
      this._y = y;
    }

    update(buffer) {
      if ($gameMap && $gameMap.mapId() === this._mapId) {
        const listener = getListenerPos();
        const x = $gameMap.deltaX(this._x, listener.x);
        const y = $gameMap.deltaY(this._y, listener.y);
        buffer.setPosition(x, y);
      }
    }
  }

  class EventPositionProvider {
    constructor(event, dx = 0, dy = 0) {
      this._event = event;
      this._dx = dx;
      this._dy = dy;
    }

    update(buffer) {
      if ($gameMap && $gameMap.mapId() === this._event._mapId) {
        const listener = getListenerPos();
        const x = $gameMap.deltaX(this._event._x + this._dx, listener.x);
        const y = $gameMap.deltaY(this._event._y + this._dy, listener.y);
        buffer.setPosition(x, y);
      }
    }
  }

  class AudioChannel {
    constructor(dir) {
      this.dir = dir;
      this._buffers = [];
    }

    update() {
      this._buffers = this._buffers.filter(({ positionProvider, buffer }) => {
        if (!buffer.isPlaying()) {
          if (buffer.destroy) {
            buffer.destroy();
          }
          return false;
        }
        if (positionProvider) {
          positionProvider.update(buffer);
        }
        return true;
      });
    }

    play(audio, {
      positionProvider = null,
      attenuationDistance = 1,
      pitchChange = 0.8,
    } = {}) {
      const buffer = this.createBuffer(audio, positionProvider !== null);
      if (!buffer) {
        return;
      }
      if (positionProvider !== null) {
        positionProvider.update(buffer);
        buffer.attenuationDistance = attenuationDistance;
        buffer.pitchChange = pitchChange;
      }
      buffer.play(false);
      this._buffers.push({ positionProvider, buffer });
    }

    stopAll() {
      for (const { buffer } of this._buffers) {
        if (buffer.destroy) {
          buffer.destroy();
        } else {
          buffer.stop();
        }
      }
      this._buffers = [];
    }

    createBuffer(audio, spatial) {
      if (this.volume === 0) {
        return null;
      }
      const { name, volume = 0, pitch = 0, pan = 0 } = audio;
      if (!name) {
        return null;
      }
      const ext = AudioManager.audioFileExt();
      const url = `audio/${this.dir}${encodeURIComponent(name + ext)}`;
      const buffer = spatial ? new SpatialAudio(url) : new Audio(url);
      buffer.name = name;
      buffer.volume = (this.volume * volume) / 10000;
      buffer.pitch = pitch / 100;
      buffer.pan = pan / 100;
      return buffer;
    }
  }

  class BuiltinAudioChannel extends AudioChannel {
    constructor(dir, volumeProvider) {
      super(dir);
      this._volumeProvider = volumeProvider;
    }

    get volume() {
      return this._volumeProvider();
    }
  }

  class CustomAudioChannel extends AudioChannel {
    constructor(dir, volume) {
      super(dir);
      this.volume = volume;
    }
  }

  const builtinSeChannel = new BuiltinAudioChannel(
    "se/",
    () => AudioManager.seVolume,
  );
  const mapSeChannel = new CustomAudioChannel(
    "se/",
    parameters.mapSeVolumeDefaultValue,
  );
  const obstacleSeChannel = new CustomAudioChannel(
    "se/",
    parameters.obstacleSeVolumeDefaultValue,
  );
  const eventSeChannel = new CustomAudioChannel(
    "se/",
    parameters.eventSeVolumeDefaultValue,
  );
  const alertSeChannel = new CustomAudioChannel(
    "se/",
    parameters.alertSeVolumeDefaultValue,
  );
  let globalSpatialSe = parameters.globalSpatialSeDefaultValue;
  Object.defineProperties(ConfigManager, {
    mapSeVolume: {
      get: () => mapSeChannel.volume,
      set: (value) => mapSeChannel.volume = value,
      configurable: true,
    },
    obstacleSeVolume: {
      get: () => obstacleSeChannel.volume,
      set: (value) => obstacleSeChannel.volume = value,
      configurable: true,
    },
    eventSeVolume: {
      get: () => eventSeChannel.volume,
      set: (value) => eventSeChannel.volume = value,
      configurable: true,
    },
    alertSeVolume: {
      get: () => alertSeChannel.volume,
      set: (value) => alertSeChannel.volume = value,
      configurable: true,
    },
    globalSpatialSe: {
      get: () => globalSpatialSe,
      set: (value) => globalSpatialSe = value,
      configurable: true,
    },
  });
  const directions = [
    [0, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];
  const dir4 = [2, 4, 6, 8];
  const enqueueAudio = (queueId, channel, audio, options) => {
    const queues = $gameTemp._audioQueues;
    if (!queues[queueId]) {
      queues[queueId] = [];
    }
    queues[queueId].push({ channel, audio, options });
  };

  function updateAudioQueues() {
    const queues = $gameTemp._audioQueues;
    for (const queueId in queues) {
      const item = removeRandom(queues[queueId]);
      if (item) {
        const { channel, audio, options } = item;
        channel.play(audio, options);
      }
    }
  }

  function getCharacterBoundingBox(character) {
    if (character.getEventTriggerArea) {
      const area = character.getEventTriggerArea();
      const width = area.width - 1;
      const height = area.height - 1;
      return { x: area.x + width / 2, y: area.y + height / 2, width, height };
    }
    return { x: character.x, y: character.y, width: 0, height: 0 };
  }

  function isInteractable(event) {
    if (hasTMSrpg && $gameMap.isSrpg()) {
      return event.isSrpgUnit(true);
    }
    const page = event.page();
    return page !== undefined && Game_Event.isInteractable(page.list);
  }

  function isNear(event, x, y) {
    const box = getCharacterBoundingBox(event);
    const dx = $gameMap.deltaX(box.x, x);
    const dy = $gameMap.deltaY(box.y, y);
    const adx = max(abs(dx) - box.width / 2, 0);
    const ady = max(abs(dy) - box.height / 2, 0);
    return (adx === 0 || ady === 0) &&
      adx + ady <= parameters.nearEventDistance;
  }

  function updateNearEvents(x, y, dx, dy) {
    const events = [];
    for (const event of $gameMap.events()) {
      if (isInteractable(event) && isNear(event, x, y)) {
        if (!event._nearEventSePlayed) {
          events.push(event);
        }
      } else {
        event._nearEventSePlayed = false;
      }
    }
    if (events.length !== 0) {
      const event = events[floor(random() * events.length)];
      const se = parameters.nearEventSeJs.call(event);
      if (se) {
        eventSeChannel.play(se, {
          positionProvider: new EventPositionProvider(event, dx, dy),
        });
      }
      event._nearEventSePlayed = true;
    }
  }

  function updateLeaderHp() {
    const actor = $gameParty.leader();
    if (!actor) {
      $gameParty._lastLeader = null;
      return;
    }
    const id = actor.actorId();
    const hp = actor.hp;
    if ($gameParty._lastLeader && $gameParty._lastLeader.id === id) {
      const change = hp - $gameParty._lastLeader.hp;
      const pitch = hp / actor.mhp + 0.5;
      if (change > 0) {
        const se = { ...parameters.leaderGainHpSe };
        se.pitch *= pitch;
        alertSeChannel.play(se);
      } else if (change < 0) {
        const se = { ...parameters.leaderLoseHpSe };
        se.pitch *= pitch;
        alertSeChannel.play(se);
      }
    }
    $gameParty._lastLeader = { id, hp };
  }

  function updateGold() {
    const gold = $gameParty.gold();
    if ($gameParty._lastGold !== undefined) {
      const change = gold - $gameParty._lastGold;
      if (change > 0) {
        alertSeChannel.play(parameters.gainGoldSe);
      } else if (change < 0) {
        alertSeChannel.play(parameters.loseGoldSe);
      }
    }
    $gameParty._lastGold = gold;
  }

  function updateNearObstacles(x, y) {
    for (const dir of dir4) {
      let x2 = x;
      let y2 = y;
      for (let i = 1; i <= parameters.nearObstacleDistance; i++) {
        const blocked = !$gamePlayer.canPass(x2, y2, dir);
        x2 = $gameMap.roundXWithDirection(x2, dir);
        y2 = $gameMap.roundYWithDirection(y2, dir);
        if (blocked) {
          const [dx, dy] = directions[dir];
          enqueueAudio(
            "nearObstacleSe",
            obstacleSeChannel,
            parameters.nearObstacleSe,
            { positionProvider: new FixedPositionProvider(i * dx, i * dy) },
          );
          break;
        }
      }
    }
  }

  function updateNearRegionEvents(x, y) {
    if (typeof Yanfly !== "undefined" && Yanfly.RCE) {
      for (const dir of dir4) {
        let x2 = x;
        let y2 = y;
        for (let i = 1; i <= parameters.nearRegionEventDistance; i++) {
          x2 = $gameMap.roundXWithDirection(x2, dir);
          y2 = $gameMap.roundYWithDirection(y2, dir);
          const regionId = $gameMap.regionId(x2, y2);
          if (!regionId) {
            continue;
          }
          const eventId = $gameMap.getUniqueRegionCommonEvent(regionId) ||
            Yanfly.RCE.RegionEvents[regionId];
          if (!eventId) {
            continue;
          }
          const [dx, dy] = directions[dir];
          enqueueAudio(
            "nearRegionEventSe",
            eventSeChannel,
            parameters.nearRegionEventSe,
            { positionProvider: new FixedPositionProvider(i * dx, i * dy) },
          );
        }
      }
    }
  }

  function setBumpDir(player, dir) {
    if (dir !== player._lastBumpDir) {
      player._bumpSeWait = 0;
    }
    if (dir !== 0 && player._bumpSeWait === 0) {
      const [dx, dy] = directions[dir];
      mapSeChannel.play(parameters.bumpSe, {
        positionProvider: new FixedPositionProvider(dx, dy),
      });
      player._bumpSeWait = parameters.bumpSeInterval;
    }
    player._lastBumpDir = dir;
  }

  function isMaybeBlocked(x, y) {
    if ($gamePlayer.isCollidedWithCharacters(x, y)) {
      return true;
    }
    for (const dir of dir4) {
      if (!$gameMap.isPassable(x, y, dir)) {
        return true;
      }
    }
    return false;
  }

  const navigate = (destination) => {
    $gameTemp._navigateDestination = destination;
  };
  const stopNavigation = () => {
    $gameTemp._navigateDestination = null;
  };

  Patcher.patch(ConfigManager, "makeData", {
    postfix({ result }) {
      result.mapSeVolume = mapSeChannel.volume;
      result.obstacleSeVolume = obstacleSeChannel.volume;
      result.eventSeVolume = eventSeChannel.volume;
      result.alertSeVolume = alertSeChannel.volume;
      result.globalSpatialSe = globalSpatialSe;
    },
  });

  Patcher.patch(ConfigManager, "applyData", {
    postfix({ args: [config] }) {
      mapSeChannel.volume = typeof config.mapSeVolume === "number"
        ? config.mapSeVolume
        : parameters.mapSeVolumeDefaultValue;
      obstacleSeChannel.volume = typeof config.obstacleSeVolume === "number"
        ? config.obstacleSeVolume
        : parameters.obstacleSeVolumeDefaultValue;
      eventSeChannel.volume = typeof config.eventSeVolume === "number"
        ? config.eventSeVolume
        : parameters.eventSeVolumeDefaultValue;
      alertSeChannel.volume = typeof config.alertSeVolume === "number"
        ? config.alertSeVolume
        : parameters.alertSeVolumeDefaultValue;
      globalSpatialSe = typeof config.globalSpatialSe === "boolean"
        ? config.globalSpatialSe
        : parameters.globalSpatialSeDefaultValue;
    },
  });

  Patcher.patch(AudioManager, "stopSe", {
    postfix() {
      builtinSeChannel.stopAll();
      mapSeChannel.stopAll();
      obstacleSeChannel.stopAll();
      eventSeChannel.stopAll();
      alertSeChannel.stopAll();
    },
  });

  Patcher.patch(Game_Temp.prototype, "initialize", {
    postfix() {
      this._audioQueues = { __proto__: null };
      this._navigateDestination = null;
      this._cameraMode = null;
    },
  });

  Patcher.patch(Game_Variables.prototype, "setValue", {
    prefix({ args: [variableId, value] }) {
      const list = parameters.variableChangeSe
        .filter((entry) => entry.variableId === variableId);
      if (list.length === 0) {
        return;
      }
      const change = value - this.value(variableId);
      if (change > 0) {
        for (const entry of list) {
          alertSeChannel.play(entry.onIncrease);
        }
      } else if (change < 0) {
        for (const entry of list) {
          alertSeChannel.play(entry.onDecrease);
        }
      }
    },
  });

  Patcher.patch(Game_Map.prototype, "setup", {
    postfix() {
      mapSeChannel.play(parameters.enterMapSe);
    },
  });

  Patcher.patch(Game_Map.prototype, "update", {
    postfix() {
      updateLeaderHp();
      updateGold();
      builtinSeChannel.update();
      mapSeChannel.update();
      obstacleSeChannel.update();
      eventSeChannel.update();
      alertSeChannel.update();
    },
  });

  Patcher.patch(Game_Character.prototype, "processMoveCommand", {
    prefix({ args: [command] }) {
      if (command.code === Game_Character.ROUTE_PLAY_SE) {
        const [se] = command.parameters;
        const mapId = $gameMap.mapId();
        builtinSeChannel.play({ ...se, pan: 50 }, {
          positionProvider: new AbsolutePositionProvider(mapId, this.x, this.y),
          attenuationDistance: 4,
        });
        return true;
      }
    },
  });

  Patcher.patch(Game_Player.prototype, "increaseSteps", {
    postfix() {
      updateNearObstacles(this.x, this.y);
      updateNearRegionEvents(this.x, this.y);
      for (const event of $gameMap.events()) {
        event._nearEventSePlayed = false;
      }
    },
  });

  Patcher.patch(Game_Player.prototype, "executeMove", {
    postfix({ args: [dir] }) {
      setBumpDir(this, this.isMovementSucceeded() ? 0 : dir);
    },
  });

  Patcher.patch(Game_Player.prototype, "update", {
    prefix() {
      this._bumpSeWait = this._bumpSeWait || 0;
      this._lastBumpDir = this._lastBumpDir || 0;
      if (this._bumpSeWait > 0) {
        this._bumpSeWait--;
      }
    },
    postfix() {
      if ($gameMap.isEventRunning()) {
        for (const event of $gameMap.events()) {
          event._nearEventSePlayed = false;
        }
      } else {
        updateNearEvents(this.x, this.y);
      }
    },
  });

  Patcher.patch(Game_Event.prototype, "increaseSteps", {
    postfix() {
      const se = parameters.npcMoveSeJs.call(this);
      if (se) {
        mapSeChannel.play(se, {
          positionProvider: new EventPositionProvider(this),
        });
      }
      this._nearEventSePlayed = false;
    },
  });

  function updateTurn(event) {
    const dir =
      (event.characterName() || event.tileId() > 0) && !event.isTransparent()
        ? event.direction()
        : 0;
    const lastDir = event._lastApparentDir || 0;
    event._lastApparentDir = dir;
    if (lastDir === 0 || dir === 0 || dir === lastDir) {
      return;
    }
    const se = parameters.npcTurnSeJs.call(event);
    if (se) {
      const [dx, dy] = directions[dir];
      mapSeChannel.play(se, {
        positionProvider: new EventPositionProvider(event, dx * 0.5, dy * 0.5),
      });
    }
  }

  function updateIdle(event) {
    if (!event.isStopping()) {
      event._idleSeWait = null;
      return;
    }
    const se = parameters.npcIdleSeJs.call(event);
    if (se) {
      event._idleSeWait = event._idleSeWait ||
        floor((random() + 0.5) * se.interval);
      if (--event._idleSeWait <= 0) {
        mapSeChannel.play(se, {
          positionProvider: new EventPositionProvider(event),
          attenuationDistance: 4,
        });
        event._idleSeWait = null;
      }
    }
  }

  Patcher.patch(Game_Event.prototype, "update", {
    postfix() {
      updateTurn(this);
      updateIdle(this);
    },
  });

  Patcher.patch(Game_Interpreter.prototype, "setWaitMode", {
    postfix({ args: [waitMode] }) {
      if (waitMode === "transfer") {
        mapSeChannel.play(parameters.changeMapSe);
      }
    },
  });

  Patcher.patch(Game_Interpreter.prototype, "command250", {
    prefix(ctx) {
      if (!globalSpatialSe) {
        return;
      }
      const event = this.character(0);
      if (!event) {
        return;
      }
      const [params = this._params] = ctx.args;
      const [se] = params;
      const mapId = this._mapId;
      builtinSeChannel.play({ ...se, pan: 100 }, {
        positionProvider: new AbsolutePositionProvider(mapId, event.x, event.y),
        attenuationDistance: 4,
      });
      ctx.result = true;
      return true;
    },
  });

  function updateNavigation() {
    if (!$gamePlayer.canMove()) {
      $gameTemp._navigateDestination = null;
      return;
    }
    if (Graphics.frameCount % parameters.navigateSeInterval === 0) {
      const destination = $gameTemp._navigateDestination;
      if (destination) {
        const { mapId, eventId, x, y } = destination;
        if (mapId === $gameMap.mapId()) {
          const event = eventId ? $gameMap.event(eventId) : null;
          mapSeChannel.play(parameters.navigateSe, {
            positionProvider: event
              ? new EventPositionProvider(event)
              : new AbsolutePositionProvider(mapId, x, y),
            attenuationDistance: 4,
          });
        }
      }
    }
  }

  const limitCameraMovement = false;

  function getCameraMovementBoundary() {
    const loopX = $gameMap.isLoopHorizontal();
    const loopY = $gameMap.isLoopVertical();
    if (limitCameraMovement) {
      const displayX = $gameMap.displayX();
      const displayY = $gameMap.displayY();
      const screenWidth = $gameMap.screenTileX();
      const screenHeight = $gameMap.screenTileY();
      let minX = floor(displayX + 0.125);
      let minY = floor(displayY + 0.125);
      let maxX = ceil(displayX + screenWidth - 0.125);
      let maxY = ceil(displayY + screenHeight - 0.125);
      if (!loopX) {
        const mapWidth = $gameMap.width();
        minX = clamp(minX, 0, mapWidth);
        maxX = clamp(maxX, 0, mapWidth);
      }
      if (!loopY) {
        const mapHeight = $gameMap.height();
        minY = clamp(minY, 0, mapHeight);
        maxY = clamp(maxY, 0, mapHeight);
      }
      return { minX, minY, maxX: maxX - 1, maxY: maxY - 1 };
    }
    return {
      minX: loopX ? -Infinity : 0,
      minY: loopY ? -Infinity : 0,
      maxX: loopX ? Infinity : $gameMap.width() - 1,
      maxY: loopY ? Infinity : $gameMap.height() - 1,
    };
  }

  function getMapScrollBoundary() {
    const loopX = $gameMap.isLoopHorizontal();
    const loopY = $gameMap.isLoopVertical();
    return {
      minX: loopX ? -Infinity : 0,
      minY: loopY ? -Infinity : 0,
      maxX: loopX ? Infinity : $gameMap.width() - $gameMap.screenTileX(),
      maxY: loopY ? Infinity : $gameMap.height() - $gameMap.screenTileY(),
    };
  }

  class Camera {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.dir = 0;
      this.flags = 0;
    }

    update() {
      const x = $gameMap.roundX(this.x);
      const y = $gameMap.roundY(this.y);
      updateNearEvents(x, y, this.x - x, this.y - y);
    }

    processInput() {
      const { minX, minY, maxX, maxY } = getCameraMovementBoundary();
      if (Input.isRepeated("left")) {
        if (Input.isPressed("shift")) {
          this.dir = 4;
        } else if (this.x > minX) {
          this.x--;
          this.dir = 0;
        }
      }
      if (Input.isRepeated("right")) {
        if (Input.isPressed("shift")) {
          this.dir = 6;
        } else if (this.x < maxX) {
          this.x++;
          this.dir = 0;
        }
      }
      if (Input.isRepeated("up")) {
        if (Input.isPressed("shift")) {
          this.dir = 8;
        } else if (this.y > minY) {
          this.y--;
          this.dir = 0;
        }
      }
      if (Input.isRepeated("down")) {
        if (Input.isPressed("shift")) {
          this.dir = 2;
        } else if (this.y < maxY) {
          this.y++;
          this.dir = 0;
        }
      }
    }

    scrollToCenter() {
      const { minX, minY, maxX, maxY } = getMapScrollBoundary();
      const lastX = $gameMap._displayX;
      const lastY = $gameMap._displayY;
      $gameMap._displayX = clamp(this.x - $gamePlayer.centerX(), minX, maxX);
      $gameMap._displayY = clamp(this.y - $gamePlayer.centerY(), minY, maxY);
      $gameMap._parallaxX += $gameMap._displayX - lastX;
      $gameMap._parallaxY += $gameMap._displayY - lastY;
    }

    onStateChange() {
      this.flags = 0;
      const [dx, dy] = directions[this.dir];
      builtinSeChannel.play(parameters.cameraMoveSe, {
        positionProvider: new FixedPositionProvider(dx, dy),
      });
    }

    onMove() {
      for (const event of $gameMap.events()) {
        event._nearEventSePlayed = false;
      }
      const x = $gameMap.roundX(this.x);
      const y = $gameMap.roundY(this.y);
      if (isMaybeBlocked(x, y)) {
        mapSeChannel.play({ ...parameters.bumpSe, pan: 0 });
      }
      updateNearRegionEvents(x, y);
    }
  }

  function saveScrollPos() {
    return {
      displayX: $gameMap._displayX,
      displayY: $gameMap._displayY,
      parallaxX: $gameMap._parallaxX,
      parallaxY: $gameMap._parallaxY,
    };
  }

  function restoreScrollPos(saved) {
    $gameMap._displayX = saved.displayX;
    $gameMap._displayY = saved.displayY;
    $gameMap._parallaxX = saved.parallaxX;
    $gameMap._parallaxY = saved.parallaxY;
  }

  function updateCamera() {
    if (!$gameTemp._cameraMode && Input.isTriggered("cameraMode")) {
      SoundManager.playOk();
      $gameTemp._cameraMode = {
        camera: new Camera($gamePlayer.x, $gamePlayer.y),
        savedScrollPos: saveScrollPos(),
      };
      $gameTemp.clearDestination();
      stopNavigation();
    }
    const cameraMode = $gameTemp._cameraMode;
    if (!cameraMode) {
      return;
    }
    const { camera, savedScrollPos } = cameraMode;
    if (Input.isTriggered("ok")) {
      restoreScrollPos(savedScrollPos);
      const x = $gameMap.roundX(camera.x);
      const y = $gameMap.roundY(camera.y);
      SoundManager.playOk();
      navigate({ mapId: $gameMap.mapId(), eventId: null, x, y });
      if (hasTMSrpg && $gameMap.isSrpg()) {
        $gamePlayer.setSrpgCameraXy(x, y);
      } else {
        $gameTemp.setDestination(x, y);
      }
      $gameTemp._cameraMode = null;
      return;
    }
    const lastX = camera.x;
    const lastY = camera.y;
    const lastDir = camera.dir;
    if (Input.isTriggered("cancel")) {
      restoreScrollPos(savedScrollPos);
      if (camera.x === $gamePlayer.x && camera.y === $gamePlayer.y) {
        SoundManager.playCancel();
        $gameTemp._cameraMode = null;
        return;
      }
      camera.x = $gamePlayer.x;
      camera.y = $gamePlayer.y;
      camera.dir = 0;
    }
    camera.processInput();
    if (!(camera.x === lastX && camera.y === lastY && camera.dir === lastDir)) {
      camera.onStateChange();
    }
    if (!(camera.x === lastX && camera.y === lastY)) {
      camera.onMove();
    }
    camera.update();
    camera.scrollToCenter();
  }

  Patcher.patch(Scene_Map.prototype, "update", {
    postfix() {
      updateNavigation();
      updateCamera();
      updateAudioQueues();
    },
  });

  Patcher.patch(Scene_Map.prototype, "updateMainMultiply", {
    prefix() {
      if ($gameTemp._cameraMode) {
        return true;
      }
    },
  });

  Patcher.patch(Scene_Map.prototype, "updateChildren", {
    prefix() {
      if ($gameTemp._cameraMode) {
        this._spriteset.update();
        return true;
      }
    },
  });

  Patcher.patch(Scene_Map.prototype, "isMenuEnabled", {
    prefix(ctx) {
      if ($gameTemp._cameraMode) {
        ctx.result = false;
        return true;
      }
    },
  });

  class CameraSprite extends Sprite {
    initialize() {
      super.initialize();
      this.createBitmap();
      this._frameCount = 0;
    }

    update() {
      super.update();
      const cameraMode = $gameTemp._cameraMode;
      if (cameraMode) {
        const { camera } = cameraMode;
        this.updatePosition(camera);
        this.updateAnimation();
        this.visible = true;
      } else {
        this._frameCount = 0;
        this.visible = false;
      }
    }

    createBitmap() {
      const tileWidth = $gameMap.tileWidth();
      const tileHeight = $gameMap.tileHeight();
      this.bitmap = new Bitmap(tileWidth, tileHeight);
      this.bitmap.fillAll("white");
      this.anchor.x = 0.5;
      this.anchor.y = 0.5;
      this.blendMode = PIXI.BLEND_MODES.ADD;
    }

    updatePosition(camera) {
      const displayX = $gameMap.displayX();
      const displayY = $gameMap.displayY();
      const tileWidth = $gameMap.tileWidth();
      const tileHeight = $gameMap.tileHeight();
      this.x = (camera.x - displayX + 0.5) * tileWidth;
      this.y = (camera.y - displayY + 0.5) * tileHeight;
    }

    updateAnimation() {
      this.opacity = abs(sin(this._frameCount++ / 40 * PI)) * 80;
    }

    // for MZ
    destroy() {
      if (this.bitmap) {
        this.bitmap.destroy();
      }
      super.destroy();
    }
  }

  Patcher.patch(Spriteset_Map.prototype, "createLowerLayer", {
    postfix() {
      const sprite = new CameraSprite();
      sprite.z = 9;
      this._tilemap.addChild(sprite);
    },
  });

  class EnvironmentalSoundsOptionsWindow extends Window_Options {
    makeCommandList() {
      const mapSeVolumeOptionName = parameters.mapSeVolumeOptionName;
      if (mapSeVolumeOptionName) {
        this.addCommand(mapSeVolumeOptionName, "mapSeVolume");
      }
      const obstacleSeVolumeOptionName = parameters.obstacleSeVolumeOptionName;
      if (obstacleSeVolumeOptionName) {
        this.addCommand(obstacleSeVolumeOptionName, "obstacleSeVolume");
      }
      const eventSeVolumeOptionName = parameters.eventSeVolumeOptionName;
      if (eventSeVolumeOptionName) {
        this.addCommand(eventSeVolumeOptionName, "eventSeVolume");
      }
      const alertSeVolumeOptionName = parameters.alertSeVolumeOptionName;
      if (alertSeVolumeOptionName) {
        this.addCommand(alertSeVolumeOptionName, "alertSeVolume");
      }
      const globalSpatialSeOptionName = parameters.globalSpatialSeOptionName;
      if (globalSpatialSeOptionName) {
        this.addCommand(globalSpatialSeOptionName, "globalSpatialSe");
      }
    }
  }

  Patcher.patch(Scene_Options.prototype, "createOptionsWindow", {
    postfix() {
      const window = this._optionsWindow;
      const subwindow = isMV
        ? new EnvironmentalSoundsOptionsWindow()
        : new EnvironmentalSoundsOptionsWindow(this.optionsWindowRect());
      subwindow.setHandler("cancel", () => {
        subwindow.openness = 0;
        subwindow.deactivate();
        window.open();
        window.activate();
      });
      if (PluginManager._scripts.includes("AltMenuScreen3")) {
        subwindow.opacity = 0;
      }
      subwindow.openness = 0;
      subwindow.deactivate();
      this.addWindow(window._environmentalSoundsOptionsWindow = subwindow);
    },
  });

  Patcher.patch(Window_Options.prototype, "addVolumeOptions", {
    postfix() {
      const optionGroupName = parameters.optionGroupName;
      if (optionGroupName) {
        this.addCommand(optionGroupName, "environmentalSounds");
      }
    },
  });

  Patcher.patch(Window_Options.prototype, "statusText", {
    prefix(ctx) {
      const [index] = ctx.args;
      switch (this.commandSymbol(index)) {
        case "environmentalSounds":
          ctx.result = "";
          return true;
      }
    },
  });

  Patcher.patch(Window_Options.prototype, "processOk", {
    prefix() {
      const index = this.index();
      switch (this.commandSymbol(index)) {
        case "environmentalSounds": {
          SoundManager.playOk();
          const subwindow = this._environmentalSoundsOptionsWindow;
          subwindow.open();
          subwindow.activate();
          this.openness = 0;
          this.deactivate();
          return true;
        }
      }
    },
  });

  Patcher.patch(Window_Options.prototype, "cursorRight", {
    prefix() {
      const index = this.index();
      switch (this.commandSymbol(index)) {
        case "environmentalSounds":
          return true;
      }
    },
  });

  Patcher.patch(Window_Options.prototype, "cursorLeft", {
    prefix() {
      const index = this.index();
      switch (this.commandSymbol(index)) {
        case "environmentalSounds":
          return true;
      }
    },
  });

  Game_Event.isInteractable = (list) =>
    list.some((cmd) => cmd.code !== 0 && cmd.code !== 108 && cmd.code !== 408);

  if (hasOptionEx) {
    Patcher.patch(Window_Options.prototype, "restoreDefaultValues", {
      postfix() {
        mapSeChannel.volume = parameters.mapSeVolumeDefaultValue;
        obstacleSeChannel.volume = parameters.obstacleSeVolumeDefaultValue;
        eventSeChannel.volume = parameters.eventSeVolumeDefaultValue;
        alertSeChannel.volume = parameters.alertSeVolumeDefaultValue;
        globalSpatialSe = parameters.globalSpatialSeDefaultValue;
        this._environmentalSoundsOptionsWindow.refresh();
      },
    });
  }

  if (hasSANAnalogMove) {
    const quantize = (x) => round(x * 256) / 256;

    Patcher.patch(PlayerMover.prototype, "updatePosition", {
      postfix() {
        if (!this.isInputed()) {
          return;
        }
        const inputVelocity = this._velVec;
        const moveVelocity = this._posVec.sub2(this._lasPosVec);
        const inputX = quantize(inputVelocity.x());
        const inputY = quantize(inputVelocity.y());
        const moveX = quantize(moveVelocity.x());
        const moveY = quantize(moveVelocity.y());
        const dx = moveX / inputX < 0.5 ? sign(inputX) : 0;
        const dy = moveY / inputY < 0.5 ? sign(inputY) : 0;
        setBumpDir(
          this.character(),
          dx === 0 && dy === 0 ? 0 : 5 - 3 * dy + dx,
        );
      },
    });
  }

  if (hasTMSrpg) {
    Patcher.patch(Game_Player.prototype, "setSrpgCameraXy", {
      prefix({ args: [x, y] }) {
        if (x === this._x && y === this._y) {
          return;
        }
        for (const event of $gameMap.events()) {
          event._nearEventSePlayed = false;
        }
      },
    });
  }

  return {
    Audio,
    SpatialAudio,
    FixedPositionProvider,
    AbsolutePositionProvider,
    EventPositionProvider,
    AudioChannel,
    BuiltinAudioChannel,
    CustomAudioChannel,
    builtinSeChannel,
    mapSeChannel,
    obstacleSeChannel,
    eventSeChannel,
    alertSeChannel,
    enqueueAudio,
    navigate,
    stopNavigation,
    Camera,
  };
})();
