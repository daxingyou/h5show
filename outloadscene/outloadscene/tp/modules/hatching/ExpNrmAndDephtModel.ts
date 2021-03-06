﻿
class ExpNrmAndDephtModelShader extends Shader3D {
    static ExpNrmAndDephtModelShader: string = "ExpNrmAndDephtModelShader";
    constructor() {
        super();
    }
    binLocation($context: WebGLRenderingContext): void {
        $context.bindAttribLocation(this.program, 0, "v3Position");
        $context.bindAttribLocation(this.program, 1, "u2Texture");
    }
    getVertexShaderString(): string {
        var $str: string =
            "attribute vec3 v3Position;" +
            "attribute vec2 u2Texture;" +

            "uniform mat4 viewMatrix3D;" +
            "uniform mat4 camMatrix3D;" +
            "uniform mat4 posMatrix3D;" +

            "varying vec2 vUv;" +

            "void main(void)" +
            "{" +

            "   vUv = vec2(u2Texture.x, 1.0-u2Texture.y);" +
            "   vec4 vt0= vec4(v3Position, 1.0);" +

            "   gl_Position = vt0;" +
            "}"
        return $str


    }
    getFragmentShaderString(): string {
        var $str: string =
            "precision mediump float;\n" +
            "uniform sampler2D normaltexture;\n" +
            "uniform sampler2D depthtexture;\n" +
            "uniform sampler2D hatchtexture;\n" +
            "varying vec2 vUv;\n" +

            "float toNum(vec4 vect){\n" +
                "float a= vect.x * 255.0;\n" +
                "float b= vect.y * 255.0;\n" +
                "return  (a * 255.0 + b) / (255.0*255.0);\n" +
            " }\n" +
            "float planeDistance(const in vec3 positionA, const in vec3 normalA, \n" +
                "const in vec3 positionB, const in vec3 normalB) {\n" +
                "vec3 positionDelta = positionB - positionA;\n" +
                "float planeDistanceDelta = max(abs(dot(positionDelta, normalA)), abs(dot(positionDelta, normalB)));\n" +
                "return planeDistanceDelta;\n" +
            "}\n" +

            "void main(void)\n" +
            "{\n" +

            "float px = 1.0 / 800.0;\n" +
            "float depthCenter  =toNum(texture2D(depthtexture, vUv)); " +

            "vec3 leftpos = vec3(vUv.s - px, vUv.t, 1.0 - texture2D(depthtexture, vec2(vUv.s - px, vUv.t)).r); " +
            "vec3 rightpos = vec3(vUv.s + px, vUv.t, 1.0 - texture2D(depthtexture, vec2(vUv.s + px, vUv.t)).r); " +
            "vec3 uppos = vec3(vUv.s, vUv.t - px, 1.0 - texture2D(depthtexture, vec2(vUv.s, vUv.t - px)).r); " +
            "vec3 downpos = vec3(vUv.s, vUv.t + px, 1.0 - texture2D(depthtexture, vec2(vUv.s, vUv.t + px)).r); " +
    
            "vec3 leftnor = texture2D(normaltexture, vec2(vUv.s - px, vUv.t)).xyz; " +
            "vec3 rightnor = texture2D(normaltexture, vec2(vUv.s + px, vUv.t)).xyz; " +
            "vec3 upnor = texture2D(normaltexture, vec2(vUv.s, vUv.t - px)).xyz; " +
            "vec3 downnor = texture2D(normaltexture, vec2(vUv.s, vUv.t + px)).xyz; " +
         
            "vec2 planeDist = vec2(" +
            "planeDistance(leftpos, leftnor, rightpos, rightnor)," +
            "planeDistance(uppos, upnor, downpos, downnor));" +

            "float planeEdge = 2.5 * length(planeDist);" +
            "planeEdge = 1.0 - 0.5 * smoothstep(0.0, depthCenter, planeEdge);" +

            "float normEdge = max(length(leftnor - rightnor), length(upnor - downnor));" +
            "normEdge = 1.0 - 0.5 * smoothstep(0.0, 0.5, normEdge);" +

            "float edge= planeEdge * normEdge;" +

           // "gl_FragColor =vec4(edge,edge,edge, 1.0);\n" +
           "vec4 hatch = texture2D(hatchtexture, vUv);\n" +
            "gl_FragColor = vec4(vec3(hatch * edge), 1.0);\n" +


            "}"
        return $str

    }

}
class ExpNrmAndDephtModel extends BaseDiplay3dSprite {

    constructor() {
        super();
    }
    private static _instance: ExpNrmAndDephtModel;
    public static getInstance(): ExpNrmAndDephtModel {
        if (!this._instance) {
            this._instance = new ExpNrmAndDephtModel();
        }
        return this._instance;
    }
    protected initData(): void {
        ProgrmaManager.getInstance().registe(ExpNrmAndDephtModelShader.ExpNrmAndDephtModelShader, new ExpNrmAndDephtModelShader);
        this.shader = ProgrmaManager.getInstance().getProgram(ExpNrmAndDephtModelShader.ExpNrmAndDephtModelShader);
        this.program = this.shader.program;

        this.objData = new ObjData;
        this.objData.vertices = new Array();
        this.objData.vertices.push(-1, 1, 0.5);
        this.objData.vertices.push(1, 1, 0.5);
        this.objData.vertices.push(1, -1, 0.5);
        this.objData.vertices.push(-1, -1, 0.5);

        this.objData.uvs = new Array()
        this.objData.uvs.push(0, 0);
        this.objData.uvs.push(1, 0);
        this.objData.uvs.push(1, 1);
        this.objData.uvs.push(0, 1);


        this.objData.indexs = new Array();
        this.objData.indexs.push(0, 1, 2);
        this.objData.indexs.push(0, 2, 3);


        this.upToGpu();

    }
    public expNrmDepht($nrmTexture: WebGLRenderbuffer, $dephtTexture: WebGLRenderbuffer, $hatchTexture:WebGLRenderbuffer): void {
        Scene_data.context3D.update();
        Scene_data.context3D.setDepthTest(true);
        Scene_data.context3D.setWriteDepth(true);
        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵

        if (this.objData && this.objData.indexBuffer) {
            Scene_data.context3D.setProgram(this.shader.program);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "viewMatrix3D", Scene_data.viewMatrx3D.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "camMatrix3D", Scene_data.cam3D.cameraMatrix.m);
            Scene_data.context3D.setVcMatrix4fv(this.shader, "posMatrix3D", this.posMatrix.m);

            Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Scene_data.context3D.setVa(1, 2, this.objData.uvBuffer);

            Scene_data.context3D.setRenderTexture(this.shader, "normaltexture", $nrmTexture, 0);
            Scene_data.context3D.setRenderTexture(this.shader, "depthtexture", $dephtTexture, 1);
            Scene_data.context3D.setRenderTexture(this.shader, "hatchtexture", $hatchTexture, 2);

            Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
        }
    }

}
