var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SkillKeyVo = (function () {
    function SkillKeyVo() {
        this.frame = 0;
    }
    SkillKeyVo.prototype.setData = function ($data) {
        this.frame = $data.frame;
        this.url = $data.url;
    };
    return SkillKeyVo;
})();
var SkillShockVo = (function () {
    function SkillShockVo() {
    }
    SkillShockVo.prototype.setData = function ($data) {
        this.time = $data.time * Scene_data.frameTime;
        this.lasttime = $data.lasttime * Scene_data.frameTime;
        this.amp = $data.amp;
    };
    return SkillShockVo;
})();
var SkillFixEffectKeyVo = (function (_super) {
    __extends(SkillFixEffectKeyVo, _super);
    function SkillFixEffectKeyVo() {
        _super.apply(this, arguments);
    }
    SkillFixEffectKeyVo.prototype.setData = function ($data) {
        _super.prototype.setData.call(this, $data);
        this.hasSocket = $data.hasSocket;
        if (this.hasSocket) {
            this.socket = $data.socket;
        }
        else {
            this.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
            this.rotation = new Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
        }
    };
    return SkillFixEffectKeyVo;
})(SkillKeyVo);
var SkillTrajectoryTargetKeyVo = (function (_super) {
    __extends(SkillTrajectoryTargetKeyVo, _super);
    function SkillTrajectoryTargetKeyVo() {
        _super.apply(this, arguments);
    }
    SkillTrajectoryTargetKeyVo.prototype.setData = function ($data) {
        _super.prototype.setData.call(this, $data);
        this.beginType = $data.beginType;
        if (this.beginType == 0) {
            this.beginPos = new Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
        }
        else if (this.beginType == 1) {
            this.beginSocket = $data.beginSocket;
        }
        this.speed = $data.speed;
        if ($data.hitSocket) {
            this.hitSocket = $data.hitSocket;
        }
        if ($data.endParticle) {
            this.endParticleUrl = $data.endParticle;
        }
        this.multype = $data.multype;
    };
    return SkillTrajectoryTargetKeyVo;
})(SkillKeyVo);
//# sourceMappingURL=SkillKeyVo.js.map