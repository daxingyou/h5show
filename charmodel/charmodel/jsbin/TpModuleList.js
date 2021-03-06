var CharShow;
(function (CharShow) {
    var TpModuleList = /** @class */ (function () {
        function TpModuleList() {
        }
        TpModuleList.getModuleList = function () {
            //所有的需要注册的模块  都写在这里
            return [
                new CharShow.TpSceneModule(),
            ];
        };
        /**
         * 启动所有模块
         */
        TpModuleList.startup = function () {
            var allModules = TpModuleList.getModuleList();
            for (var i = 0; i < allModules.length; i++) {
                Module.registerModule(allModules[i]);
            }
        };
        return TpModuleList;
    }());
    CharShow.TpModuleList = TpModuleList;
})(CharShow || (CharShow = {}));
//# sourceMappingURL=TpModuleList.js.map