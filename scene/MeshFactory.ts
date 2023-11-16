import {
    Scene, Vector3, DynamicTexture, Mesh, StandardMaterial, Color3
    , MeshBuilder, ActionManager, ExecuteCodeAction, InterpolateValueAction, Curve3, ParticleSystem, Texture, Color4, TrailMesh, Vector4, CreatePolygon, Engine, SimplificationType, InstancedMesh, CreateSphere
} from "@babylonjs/core";
import { DeepImmutableObject, Nullable } from "@babylonjs/core/types";
import { AdvancedDynamicTexture, Control, TextBlock } from "@babylonjs/gui"
import * as YSBTH from '../font/YouSheBiaoTiHei_Regular.json';
import * as earcut from 'earcut';
import { MaterialFactory } from "./MaterialFactory";
// import sceneConfig from "@/components/sceneConfig";
// import { MaterialFactory } from "./MaterialFactory";
// import * as GUI from "@babylonjs/gui";


export class MeshFactory {


    static scenecfg: any = window
    public static sceneConfig = this.scenecfg.sceneCFG

    /**
     * 创建文字
     * @param cfg {"name":"","position":"vec3","material":"材质"}
     * @returns 
     */
    public static createTextMesh(scene: Scene, cfg: any): Mesh {
        let options = cfg.options;
        let text_mesh = MeshBuilder.CreatePlane(cfg.name, options, scene);
        text_mesh.scaling.x = 4.0;
        text_mesh.scaling.y = 0.5;
        text_mesh.position.y = 2.1;
        let material = new StandardMaterial(`stand-${cfg.name}`, scene);
        material.diffuseTexture = new DynamicTexture(`dyna-${cfg.name}`,
            { width: 512, height: 64 }, scene, true);
        material.diffuseTexture.hasAlpha = true;
        material.useAlphaFromDiffuseTexture = true;
        material.specularColor = Color3.Black();
        material.emissiveColor = Color3.White();
        material.alpha = 0.0;
        text_mesh.billboardMode = Mesh.BILLBOARDMODE_Y;
        return text_mesh;
    }

    /**
     * 创建一个三次贝塞尔曲线
     * @param point 
     * @returns 
     */
    public static BezierLine(point: DeepImmutableObject<Vector3>[]) {

        const bezier = Curve3.CreateCubicBezier( //通过四个点构建曲线
            point[0], point[1], point[2], point[3],
            60);

        return bezier
    }

    /**
     * 自定义条形，挤压，类似于带宽度的线————飞线的原始模型
     * @param width 
     * @param path 
     * @returns 
     */
    public static widthLine(name: string, width: number, path: any, shape: Vector3[] | undefined) {
        const shapeDefault = [
            new Vector3(-width / 2, 0, 0),
            new Vector3(width / 2, 0, 0)
        ];

        //创建形状
        var extruded = MeshBuilder.ExtrudeShapeCustom(
            name, {
            shape: shape !== undefined ? shape : shapeDefault,
            path: path,
            updatable: true,
            scaleFunction: null,
            sideOrientation: Mesh.DOUBLESIDE
        });

        return extruded
    }

    /**
     * 天空例子效果
     */
    public static SkyParticle(scene: Scene) {
        var particleSystem = new ParticleSystem("snow", 2000, scene);
        particleSystem.emitter = new Vector3(0, 120, 0);  // 设置发射器位置为天空的某个点
        particleSystem.minEmitBox = new Vector3(-100, 0, -100);  // 设置发射器的边界范围
        particleSystem.maxEmitBox = new Vector3(100, 0, 100);
        particleSystem.gravity = new Vector3(0, -9.81, 0);  // 设置重力向下

        particleSystem.particleTexture = new Texture("../resources/images/snow.png", scene);
        particleSystem.color1 = new Color4(1, 1, 1, 1);
        particleSystem.color2 = new Color4(0.8, 0.8, 1, 1);
        particleSystem.minSize = 0.2;
        particleSystem.maxSize = 1.5;
        particleSystem.minLifeTime = 15;
        particleSystem.maxLifeTime = 30;
        particleSystem.emitRate = 240;

        particleSystem.start();
    }


    /**
     * 物体移动拖尾效果
     * @param mesh 物体
     * @param scene 
     * @param wid? 轨迹宽度||0.5,参考值：mesh小球的半径
     * @param long? 轨迹长度||30，参考值：40*mesh小球的半径
     */
    public static Tailing(scene: Scene, options: { mesh: any, wid?: number, long?: number }) {
        // 轨迹对象，轨迹的宽度为0.2，轨迹的长度为30
        const width = options.wid || 0.5;
        const length = options.long || 30;
        const trail = new TrailMesh("new", options.mesh, scene, width, length, true);

        const sourceMat = new StandardMaterial("sourceMat", scene);
        sourceMat.emissiveColor = sourceMat.diffuseColor = Color3.Blue();
        // sourceMat.specularColor = BABYLON.Color3.Black();

        trail.material = sourceMat;
    }

    /**
     * 3D字体
     * @param name 
     * @param text 文本内容
     * @param scene 
     * @param font 字体 
     * @param faceColor 颜色
     * @returns 
     */
    public static Text_3D(name: string, text: string, scene: Scene, options?: { font?: any, faceColor?: Color4[] | undefined }) {
        const fontData: any = options && options.font ? options.font : YSBTH
        // const fontData = await (await fetch('/font/YouSheBiaoTiHei_Regular.json')).json();
        const text_3d: any = MeshBuilder.CreateText(
            name,
            text,
            fontData,
            {
                size: this.sceneConfig.Text3D.size,
                resolution: 8, // 分辨率
                depth: this.sceneConfig.Text3D.depth,
                faceUV: [
                    new Vector4(0, 0, 1, 1),
                    new Vector4(0, 0, 1, 1),
                    new Vector4(0, 0, 1, 1)
                ],
                faceColors: options && options.faceColor ? options.faceColor : [
                    new Color4(
                        this.sceneConfig.Text3D.topColor.r / 255,
                        this.sceneConfig.Text3D.topColor.g / 255,
                        this.sceneConfig.Text3D.topColor.b / 255,
                        this.sceneConfig.Text3D.topColor.a
                    ),
                    new Color4(
                        this.sceneConfig.Text3D.sideColor.r / 255,
                        this.sceneConfig.Text3D.sideColor.g / 255,
                        this.sceneConfig.Text3D.sideColor.b / 255,
                        this.sceneConfig.Text3D.sideColor.a
                    ),
                    new Color4(
                        this.sceneConfig.Text3D.bottomColor.r / 255,
                        this.sceneConfig.Text3D.bottomColor.g / 255,
                        this.sceneConfig.Text3D.bottomColor.b / 255,
                        this.sceneConfig.Text3D.bottomColor.a
                    )
                ]
            },
            scene,
            earcut
        );
        return text_3d
    }


    /**
     * 地图生成
     * @param mapData 地图数据：注意传入的不是原始数据，而是：例如传入数据是china，那么要传入china.features
     * @param centerX 地图中心X坐标
     * @param centerZ 地图中心Z坐标
     * @param hight 地图厚度
     * @param scene 
     * @returns 
     */
    public static map(mapData: string | any[], centerX: number, centerZ: number, hight: number, scene: Scene) {
        var text_3d_material = MaterialFactory.RGB_emissive(1, 1, 1, scene)
        var material = MaterialFactory.RGB_emissive(1, 1, 1, scene) // 地图颜色
        var transColor = this.sceneConfig.map.topColor
        var disColor = this.sceneConfig.map.disColor
        var material2 = MaterialFactory.RGB_emissive( // 变色颜色材质
            disColor.r / transColor.r,
            disColor.g / transColor.g,
            disColor.b / transColor.b,
            scene)
        var grandModel: any = new Mesh("MAP", scene);


        const adt = AdvancedDynamicTexture.CreateFullscreenUI("地名")

        for (let l = 0; l < mapData.length; l++) {
            // console.log(l)
            var boundaries = mapData[l].geometry.coordinates;
            // console.log(boundaries)
            var parentModel = new Mesh(mapData[l].properties.name, scene)

            var centerXZ: number[]
            centerXZ = mapData[l].properties.centroid != undefined ? mapData[l].properties.centroid : mapData[l].properties.center

            // for (var i = 0; i <= 1; i++) {            
            boundaries.forEach((pointGroup: any[]) => {
                var points: any[] = [];
                // console.log(pointGroup)
                pointGroup.forEach(point => {
                    // console.log(point)
                    point.forEach((point: number[]) => {
                        points.push(new Vector3(point[0] - centerX, 0, point[1] - centerZ))
                    })
                })

                // 卡特穆尔-罗姆样条所需点集
                var catmullRom = Curve3.CreateCatmullRomSpline(points, 60, true)
                // console.log(catmullRom.getPoints()) 

                //面
                // var polygon = CreatePolygon("polygon", points, scene);
                var polygon: Mesh = CreatePolygon("polygon", {
                    shape: points,
                    sideOrientation: Mesh.DOUBLESIDE,
                    depth: hight,
                    faceUV: [
                        new Vector4(0, 0, 1, 1),
                        new Vector4(0, 0, 1, 1),
                        new Vector4(0, 0, 1, 1)
                    ],
                    faceColors: [
                        new Color4(
                            this.sceneConfig.map.topColor.r / 255,
                            this.sceneConfig.map.topColor.g / 255,
                            this.sceneConfig.map.topColor.b / 255,
                            this.sceneConfig.map.topColor.a),
                        new Color4(
                            this.sceneConfig.map.sideColor.r / 255,
                            this.sceneConfig.map.sideColor.g / 255,
                            this.sceneConfig.map.sideColor.b / 255,
                            this.sceneConfig.map.sideColor.a),
                        new Color4(
                            this.sceneConfig.map.bottomColor.r / 255,
                            this.sceneConfig.map.bottomColor.g / 255,
                            this.sceneConfig.map.bottomColor.b / 255,
                            this.sceneConfig.map.bottomColor.a),
                    ]
                }, scene, earcut);

                polygon.material = material
                polygon.metadata = {
                    materialLog: [material, material2],
                    longitude: centerXZ[0], //经度
                    latitude: centerXZ[1]   //纬度
                }
                polygon.parent = parentModel;
                polygon.renderingGroupId = 0


                // //轮廓
                const curveMesh2: any = MeshBuilder.CreateLines("side", { points: catmullRom.getPoints(), updatable: false }, scene)
                curveMesh2.color = new Color3(
                    this.sceneConfig.map.outlineColor.r / 255,
                    this.sceneConfig.map.outlineColor.g / 255,
                    this.sceneConfig.map.outlineColor.b / 255
                )
                curveMesh2.enableEdgesRendering(); // 启用边缘渲染
                curveMesh2.edgesWidth = this.sceneConfig.map.outlineWidth; // 设置线条宽度
                curveMesh2.edgesColor = new Color4(
                    this.sceneConfig.map.outlineColor.r / 255,
                    this.sceneConfig.map.outlineColor.g / 255,
                    this.sceneConfig.map.outlineColor.b / 255,
                    this.sceneConfig.map.outlineColor.a); // 设置边缘颜色
                curveMesh2.renderingGroupId = 0;
                curveMesh2.isPickable = false
                curveMesh2.parent = parentModel
                // curveMesh2.color = new BABYLON.Color3(1, 1, 1)
                curveMesh2.alpha = 1
                curveMesh2.parent = parentModel;
                // glow.referenceMeshToUseItsOwnMaterial(curveMesh2)
            })
            // }


            if (this.sceneConfig.Text3D.switch && mapData[l].properties.name != undefined) {
                // var name = text(adt, cter, )
                const text = this.Text_3D(mapData[l].properties.name, mapData[l].properties.name, scene)
                if (text != null) {
                    text.position = new Vector3(centerXZ[0] - centerX, 0, centerXZ[1] - centerZ)
                    text.rotation.x = Math.PI / 2
                    text.material = text_3d_material
                    text.parent = parentModel;
                    text.isPickable = false
                    // 将侧面的材质应用到字体的侧面 
                    // text.sideOrientation = BABYLON.Mesh.DOUBLESIDE; // 设置字体的侧面可见
                    // text.material.subMaterials = [material2];
                }
            }

            if (this.sceneConfig.Text2D.switch && mapData[l].properties.name != undefined) {
                const cter = CreateSphere('center', { diameter: 0.01 }, scene);
                cter.isVisible = false
                cter.parent = parentModel
                cter.position = new Vector3(centerXZ[0] - centerX, 0, centerXZ[1] - centerZ)
                const text: any = this.GUIText(adt, cter, mapData[l].properties.name)
            }


            parentModel.parent = grandModel;

        }
        return grandModel;

    }

    /**
     * 地图中生成一组飞线
     * @param mapData 地图数据：注意传入的不是原始数据，而是：例如传入数据是china，那么要传入china.features
     * @param centerX 地图中心X坐标
     * @param centerZ 地图中心Z坐标
     * @param flyStar 飞线的起点名称
     * @param engine 
     * @param scene 
     * @returns 
     */
    public static flyLine(mapData: any[], centerX: number, centerZ: number, flyStar: string | any[], flyEnd: any,flyColor: any, engine: Engine, scene: Scene) {
        const flyLineParent = new Mesh('flyLineParent', scene) // 用于存放飞线模型

        const color = new Color3(
            flyColor.r / 255,
            flyColor.g / 255,
            flyColor.b / 255
        ) // 颜色
        const result = MaterialFactory.picMaterial(require('../src/resources/' + this.sceneConfig.flyLine.picture), color, scene) // 引用资源
        const pMaterial = result.picMaterial
        result.flowTexture.uScale = this.sceneConfig.flyLine.uScale;
        result.flowTexture.vScale = this.sceneConfig.flyLine.vScale;


        mapData.forEach(f => {
            if (flyStar.includes(f.properties.name)) {
                if (f.properties.center != undefined) {
                    var x0 = (flyEnd[0] - centerX)
                    var z0 = (flyEnd[1] - centerZ)
                    var x = (f.properties.center[0] - centerX)
                    var z = (f.properties.center[1] - centerZ)


                    var pathPoint = [
                        new Vector3(x0, 0.5, z0),
                        new Vector3(
                            x0 + (x - x0) * 0.3,
                            Math.abs(Math.sqrt((x - x0) * (x - x0) + (z - z0) * (z - z0)) * 0.5),
                            z0 + (z - z0) * 0.3 + Math.abs(z - z0) * 0.5
                        ),
                        new Vector3(
                            x0 + (x - x0) * 0.7,
                            Math.abs(Math.sqrt((x - x0) * (x - x0) + (z - z0) * (z - z0)) * 0.5),
                            z0 + (z - z0) * 0.9 + Math.abs(z - z0) * 0.5
                        ),
                        new Vector3(x, 0.5, z)
                    ]
                    var path = this.BezierLine(pathPoint).getPoints()
                    var Wl = this.widthLine('feixian', this.sceneConfig.flyLine.width, path, undefined)
                    // Wl.position.y += hight;
                    Wl.material = pMaterial
                    Wl.renderingGroupId = 2
                    Wl.isPickable = false
                    Wl.parent = flyLineParent
                }
            }

        })

        engine.runRenderLoop(() => {
            result.flowTexture.vOffset += this.sceneConfig.flyLine.speed
        })

        return flyLineParent;
    }


    /**
     * 简单的GUI文本标签
     * @param adt 文本控制器
     * @param mesh 文本关联物体
     * @param name 文本内容/名称
     * @returns 
     */
    public static GUIText(adt: AdvancedDynamicTexture, mesh: Mesh | InstancedMesh, name: string) {
        var h = 1
        var wMax = name.length * 1.5
        // const width = '160px'
        const size = this.sceneConfig.Text2D.size
        const width = size * (12 / 15) * wMax + 'px'
        const height = size * (18 / 15) * h + 'px' // h是行数，18px为一行

        const text = new TextBlock(name, name)
        text.color = this.sceneConfig.Text2D.color
        text.fontWeight = '300' // 字体粗细
        text.fontSizeInPixels = size
        // text.fontFamily = 'YSBTH';  //这里加载字体资源作为字体
        // text.widthInPixels = c.name.length * text.fontSizeInPixels / 2
        // text.heightInPixels = 2 * text.fontSizeInPixels * 3
        text.width = width
        text.height = height
        text.textWrapping = true // 开启自动换行
        // text.background = '#ffffff7f'
        text.alpha = 1
        // text.thickness = 1   //边框厚度
        text.linkOffsetYInPixels = 0 // 连接线
        text.isReadOnly = true
        text.isPointerBlocker = true
        text.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER
        text.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER
        text.overlapGroup = 0
        adt.addControl(text)
        text.linkWithMesh(mesh)

        return text;
    }

}