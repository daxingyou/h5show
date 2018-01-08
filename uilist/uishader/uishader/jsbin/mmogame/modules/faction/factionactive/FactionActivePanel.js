var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var faction;
(function (faction) {
    var FactionActivePanel = (function (_super) {
        __extends(FactionActivePanel, _super);
        function FactionActivePanel() {
            _super.call(this);
            this._selIdx = 0;
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;
            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this._baseUiAtlas = new UIAtlas();
            this._leaderPanel = new faction.FactionLeaderPanel();
            this._tripPanel = new faction.FactionTripPanel();
        }
        FactionActivePanel.prototype.dispose = function () {
            this._baseRender.dispose();
            this._baseRender = null;
            this._topRender.dispose();
            this._topRender = null;
            if (this._leaderPanel) {
                this._leaderPanel.dispose();
                this._leaderPanel = null;
            }
            if (this._tripPanel) {
                this._tripPanel.dispose();
                this._tripPanel = null;
            }
            _super.prototype.dispose.call(this);
        };
        FactionActivePanel.prototype.butClik = function (evt) {
            if (evt.target == this.w_close) {
                this.hide();
            }
        };
        FactionActivePanel.prototype.applyLoad = function () {
            var _this = this;
            this._baseUiAtlas.setInfo("ui/uidata/faction/factionactive/factionactive.xml", "ui/uidata/faction/factionactive/factionactive.png", function () { _this.loadConfigCom(); });
        };
        FactionActivePanel.prototype.loadConfigCom = function () {
            this.applyLoadComplete();
            this._baseRender.uiAtlas = this._baseUiAtlas;
            this._topRender.uiAtlas = this._baseUiAtlas;
            this.winmidRender.uiAtlas = this._baseUiAtlas;
            this.initUI();
            this._leaderPanel.setUIAtlas(this._baseUiAtlas, this);
            this._tripPanel.setUIAtlas(this._baseUiAtlas, this.winmidRender);
            this.setIdx(0);
            this.resize();
        };
        FactionActivePanel.prototype.initUI = function () {
            this.addUIList(["t_win_bian"], this.winmidRender);
            this.addUIList(["t_win_line"], this._topRender);
            this.addChild(this._baseRender.getComponent("t_win_title"));
            this.tab0 = this._baseRender.getComponent("t_tab0");
            this.addChild(this.tab0);
            this.tab0.addEventListener(InteractiveEvent.Down, this.tabClick, this);
            this.tab1 = this._baseRender.getComponent("t_tab1");
            this.addChild(this.tab1);
            this.tab1.addEventListener(InteractiveEvent.Down, this.tabClick, this);
        };
        FactionActivePanel.prototype.tabClick = function ($e) {
            if ($e.target == this.tab0) {
                this.setIdx(0);
            }
            else if ($e.target == this.tab1) {
                this.setIdx(1);
            }
        };
        FactionActivePanel.prototype.setIdx = function ($idx) {
            if ($idx == 0) {
                this.tab0.selected = true;
                this.tab1.selected = false;
                this._tripPanel.show();
                this._leaderPanel.hide();
            }
            else if ($idx == 1) {
                this.tab0.selected = false;
                this.tab1.selected = true;
                this._tripPanel.hide();
                this._leaderPanel.show();
            }
            this._selIdx = $idx;
        };
        FactionActivePanel.prototype.show = function () {
            UIManager.getInstance().addUIContainer(this);
            ModulePageManager.showResTittle([1, 2, 3]);
            SceneManager.getInstance().render = false;
            if (this._baseRender.uiAtlas) {
                this.setIdx(0);
            }
            //UIManager.getInstance().addUIContainer(this._tripPanel);
            var evt = new mainUi.MainUiEvent(mainUi.MainUiEvent.HIDE_MAINUI_EVENT);
            ModuleEventManager.dispatchEvent(evt);
        };
        FactionActivePanel.prototype.hide = function () {
            UIManager.getInstance().removeUIContainer(this);
            if (this._selIdx == 0) {
                this._tripPanel.hide();
            }
            else if (this._selIdx == 1) {
                this._leaderPanel.hide();
            }
            //UIManager.getInstance().removeUIContainer(this._leaderPanel);
            //UIManager.getInstance().removeUIContainer(this._tripPanel);
            SceneManager.getInstance().render = true;
            ModuleEventManager.dispatchEvent(new mainUi.MainUiEvent(mainUi.MainUiEvent.SHOW_MAINUI_EVENT));
            _super.prototype.hide.call(this);
        };
        FactionActivePanel.prototype.leadDataChg = function () {
            if (this._leaderPanel && this._leaderPanel.hasStage) {
                this._leaderPanel.drawLead();
            }
        };
        FactionActivePanel.prototype.tripDataChg = function () {
            if (this._tripPanel && this._tripPanel.hasStage) {
                this._tripPanel.maxChg();
            }
        };
        return FactionActivePanel;
    })(WindowUi);
    faction.FactionActivePanel = FactionActivePanel;
})(faction || (faction = {}));
//# sourceMappingURL=FactionActivePanel.js.map