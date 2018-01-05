var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EngineProcessor = (function (_super) {
    __extends(EngineProcessor, _super);
    function EngineProcessor() {
        _super.apply(this, arguments);
        this.coreDataNum = 0;
        this.hasCoreDataInit = false;
    }
    EngineProcessor.prototype.getName = function () {
        return "EngineProcessor";
    };
    EngineProcessor.prototype.receivedModuleEvent = function ($event) {
        var engEvt = $event;
        if (engEvt.type == EngineEvent.CREAT_SCENE_EVENT) {
            GameInstance.threeBattarId = 0;
            var sName = engEvt.sceneName;
            SceneManager.getInstance().loadScene(sName, engEvt.sceneLoadcomplteFun, engEvt.sceneProgressFun, engEvt.sceneAnylsizFun);
        }
        else if (engEvt.type == EngineEvent.ENTER_SCENE_EVENT) {
            GameControlManager.getInstance().init();
            this.AnalysisMapData();
            this.enterSceneDothing();
        }
        else if (engEvt.type == EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS) {
            this.mapIntFieldQuestsProcess();
        }
        else if (engEvt.type == EngineEvent.CORE_DATA_CREATED_EVENT) {
            this.addCoreNum();
        }
    };
    EngineProcessor.prototype.addCoreNum = function () {
        if (this.hasCoreDataInit) {
            return;
        }
        this.coreDataNum++;
        if (this.coreDataNum >= 9) {
            this.hasCoreDataInit = true;
            ModuleEventManager.dispatchEvent(new EngineEvent(EngineEvent.CORE_DATA_COMPLETE_EVENT));
        }
    };
    EngineProcessor.prototype.findNextTaskPos = function () {
        TimeUtil.addTimeOut(250, function () {
            if (GameInstance.questMoveVo && GuidData.map.isBaseMap()) {
                console.log("寻路到下个坐标点");
                quest.QuestModel.getInstance().toplay(GameInstance.questMoveVo.pos);
            }
        });
    };
    /**进入场景需要处理的逻辑*/
    EngineProcessor.prototype.enterSceneDothing = function () {
        if (GuidData.map.isBaseMap()) {
            this.findNextTaskPos();
        }
        if (GuidData.player.getLastMapType() == 17) {
            ModulePageManager.openPanel(SharedDef.MODULE_BOSS, SharedDef.MODULE_BOSS_PERSON_BOSS);
        }
    };
    EngineProcessor.prototype.mapIntFieldQuestsProcess = function () {
        //console.log("更新副本进度")
        if (GuidData.map.isFuBen()) {
            ModuleEventManager.dispatchEvent(new fb.FubenEvent(fb.FubenEvent.REFRESH_FUBEN_SCENE_LEFT_QUEST)); //副本
        }
    };
    EngineProcessor.prototype.AnalysisMapData = function () {
        //if (GuidData.map.isFuBen()) {  //副本
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //}
        //if (GuidData.map.isBaseMap()) {  //基础场景
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}
        //if (GuidData.map.tbMapVo && GuidData.map.tbMapVo.inst_type == 2) {
        //    AotuSkillManager.getInstance().aotuBattle = true;
        //} else {
        //    AotuSkillManager.getInstance().aotuBattle = false;
        //}
        //AotuSkillManager.getInstance().aotuBattle = false;
        if (GuidData.map.tbMapVo.path.length) {
            var $path = new Array();
            for (var i = 0; i < GuidData.map.tbMapVo.path.length; i++) {
                $path.push(new Vector2D(GuidData.map.tbMapVo.path[i][0], GuidData.map.tbMapVo.path[i][1]));
            }
            AotuSkillManager.getInstance().pathItem = $path;
            console.log($path);
        }
        else {
            AotuSkillManager.getInstance().pathItem = null;
        }
        quest.QuestModel.getInstance().changeTab();
    };
    EngineProcessor.prototype.loadSecenCom = function () {
        console.log("over");
    };
    EngineProcessor.prototype.loadProgress = function (num) {
        console.log("loading " + float2int(num * 100) + "%");
    };
    EngineProcessor.prototype.listenModuleEvents = function () {
        return [
            new EngineEvent(EngineEvent.CREAT_SCENE_EVENT),
            new EngineEvent(EngineEvent.CREAT_MAINCHAR_EVENT),
            new EngineEvent(EngineEvent.ENTER_SCENE_EVENT),
            new EngineEvent(EngineEvent.MAP_INT_FIELD_QUESTS_PROCESS),
            new EngineEvent(EngineEvent.CORE_DATA_CREATED_EVENT),
        ];
    };
    return EngineProcessor;
})(BaseProcessor);
//# sourceMappingURL=EngineProcessor.js.map