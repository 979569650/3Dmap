import { ArcRotateCamera, Color3, Color4, CreatePolygon, Curve3, Engine, Mesh, MeshBuilder, Scene, SpotLight, Vector3, Vector4 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, TextBlock } from '@babylonjs/gui';
import * as BABYLON from "babylonjs";
import * as earcut from 'earcut';
import { Component, Prop, Vue } from "vue-property-decorator";
import { MaterialFactory } from '../../scene/MaterialFactory';
import { MeshFactory } from '../../scene/MeshFactory';
import * as Arial from '../../font/Arial_Bold.json'
import * as china from '../resources/China.json';
// import sceneConfig from './sceneConfig';
// import sceneConfig from '../../public/sceneConfig.js';
// import { MeshWriter } from 'meshwriter'
// import './styles.css';

// import * as GUI from 'babylonjs-gui';
// import * as GUI from '@babylonjs/gui'
// let sceneConfig: any


@Component
export default class BabylonAPP extends Vue {
    @Prop() private msg!: string;
    public engine!: Engine;
    public scene!: Scene;
    public camera: any;
    public _canvas!: HTMLCanvasElement;

    public sceneConfig: any;
    mounted() {
        const scenecfg: any = window
        this.sceneConfig = scenecfg.sceneCFG
        // console.log(this.sceneConfig.aio);
        // console.log(this.sceneConfig.sceneCFG);

        this._canvas = document.getElementById('rendCanvas') as HTMLCanvasElement;
        this.engine = new Engine(this._canvas);
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(230 / 255, 224 / 255, 218 / 255);
        // this.scene.debugLayer.show()
        this.camera = new ArcRotateCamera(
            "Camera",
            -Math.PI / 2,
            0,
            50,
            Vector3.Zero(),
            this.scene
        );
        this.camera.attachControl(this._canvas, true);
        // this.scene.createDefaultLight();
        // this.scene.createDefaultEnvironment();

        this.init();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
    init() {
        this.chinaMap();
    }
    chinaMap() {
        // console.log(sceneConfig);
        this.camera.radius = this.sceneConfig.camera.radius
        this.camera.target.z = this.sceneConfig.camera.target.z
        var light = new SpotLight("spotLight", new Vector3(-30, -120, -60), new Vector3(0.25, 1, 0.5), Math.PI, 2, this.scene);
        light.diffuse = new Color3(254 / 255, 254 / 255, 81 / 255)
        light.specular = new Color3(254 / 255, 254 / 255, 81 / 255);
        // var adt = AdvancedDynamicTexture.CreateFullscreenUI('text', true, this.scene)
        var text_3d_material = MaterialFactory.RGB_emissive(1, 1, 1, this.scene)
        text_3d_material.diffuseColor = new Color3(0, 0, 0);
        // var material = MaterialFactory.RGB_emissive(1, 1, 1, this.scene)
        // material.diffuseColor = new Color3(1, 1, 1);
        /* var transColor = sceneConfig.map.topColor
        var disColor = sceneConfig.map.disColor
        var material2 = MaterialFactory.RGB_emissive(
            disColor.r / transColor.r,
            disColor.g / transColor.g,
            disColor.b / transColor.b,
            this.scene) */
        // var material2 = MaterialFactory.RGB_emissive(0, 0, 0, this.scene)
        // material.alpha = 0.9
        // var material3 = MaterialFactory.RGB_emissive(135 / 255, 62 / 255, 14 / 255, this.scene)
        // var color0 = MaterialFactory.RGB_emissive(254 / 255, 254 / 255, 211 / 255, this.scene)
        // var color1 = MaterialFactory.RGB_emissive(253 / 255, 217 / 255, 142 / 255, this.scene)
        // var color2 = MaterialFactory.RGB_emissive(254 / 255, 152 / 255, 41 / 255, this.scene)
        // var color3 = MaterialFactory.RGB_emissive(217 / 255, 95 / 255, 13 / 255, this.scene)
        // var color4 = MaterialFactory.RGB_emissive(153 / 255, 51 / 255, 4 / 255, this.scene)
        var centerX = 108
        var centerZ = 34
        // var grandModel: any = new Mesh("grandModel", this.scene);
        var hight = this.sceneConfig.map.hight;
        var chinaData = china.features;
        // console.log(chinaData);
        var flyStar = ['青海', '新疆', '云南', '黑龙江', '广东', '浙江']
        // var flyLineParent = new Mesh('flyLineParent', this.scene) // 用于存放飞线模型
        // for (let l = 0; l < chinaData.length; l++) {
        //     // console.log(l)
        //     var boundaries = chinaData[l].geometry.coordinates;
        //     // console.log(boundaries)
        //     var parentModel = new Mesh(chinaData[l].properties.name, this.scene)

        //     var centerXZ: number[]
        //     centerXZ = chinaData[l].properties.centroid

        //     // for (var i = 0; i <= 1; i++) {
        //     boundaries.forEach(pointGroup => {
        //         var points: any[] = [];
        //         // console.log(pointGroup)
        //         pointGroup.forEach(point => {
        //             // console.log(point)
        //             point.forEach(point => {
        //                 points.push(new Vector3(point[0] - centerX, 0, point[1] - centerZ))
        //             })
        //         })

        //         // 卡特穆尔-罗姆样条所需点集
        //         var catmullRom = Curve3.CreateCatmullRomSpline(points, 60, true)
        //         // console.log(catmullRom.getPoints())

        //         // var cter = CreateSphere('center', { diameter: 0.01 }, this.scene);
        //         // cter.isVisible = false
        //         // // if (chinaData[l] !=undefined){
        //         // cter.position = new Vector3(centerXZ[0] - centerX, hight, centerXZ[1] - centerZ)
        //         // }
        //         if (china.features[l].properties.name != undefined) {
        //             // var name = text(adt, cter, )
        //             var text = MeshFactory.Text_3D(china.features[l].properties.name, china.features[l].properties.name, this.scene)
        //             if (text != null) {
        //                 text.position = new Vector3(centerXZ[0] - centerX, 0, centerXZ[1] - centerZ)
        //                 text.rotation.x = Math.PI / 2
        //                 text.material = text_3d_material
        //                 text.parent = parentModel;
        //                 text.isPickable = false
        //                 // 将侧面的材质应用到字体的侧面 
        //                 // text.sideOrientation = BABYLON.Mesh.DOUBLESIDE; // 设置字体的侧面可见
        //                 // text.material.subMaterials = [material2];
        //             }
        //         }

        //         //面
        //         // var polygon = CreatePolygon("polygon", points, this.scene);
        //         var polygon: any = CreatePolygon("polygon", {
        //             shape: points,
        //             sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        //             depth: hight,
        //             faceUV: [
        //                 new Vector4(0, 0, 1, 1),
        //                 new Vector4(0, 0, 1, 1),
        //                 new Vector4(0, 0, 1, 1)
        //             ],
        //             faceColors: [
        //                 new Color4(
        //                     sceneConfig.map.topColor.r / 255,
        //                     sceneConfig.map.topColor.g / 255,
        //                     sceneConfig.map.topColor.b / 255,
        //                     sceneConfig.map.topColor.a),
        //                 new Color4(
        //                     sceneConfig.map.sideColor.r / 255,
        //                     sceneConfig.map.sideColor.g / 255,
        //                     sceneConfig.map.sideColor.b / 255,
        //                     sceneConfig.map.sideColor.a),
        //                 new Color4(
        //                     sceneConfig.map.bottomColor.r / 255,
        //                     sceneConfig.map.bottomColor.g / 255,
        //                     sceneConfig.map.bottomColor.b / 255,
        //                     sceneConfig.map.bottomColor.a),
        //             ]
        //         }, this.scene, earcut);

        //         polygon.material = material
        //         polygon.parent = parentModel;
        //         polygon.renderingGroupId = 0


        //         // //轮廓
        //         const curveMesh2: any = MeshBuilder.CreateLines("side", { points: catmullRom.getPoints(), updatable: false }, this.scene)
        //         curveMesh2.enableEdgesRendering(); // 启用边缘渲染
        //         curveMesh2.edgesWidth = 10; // 设置线条宽度
        //         curveMesh2.edgesColor = new Color4(
        //             sceneConfig.map.outlineColor.r / 255,
        //             sceneConfig.map.outlineColor.g / 255,
        //             sceneConfig.map.outlineColor.b / 255,
        //             sceneConfig.map.outlineColor.a); // 设置边缘颜色
        //         curveMesh2.renderingGroupId = 0;
        //         curveMesh2.isPickable = false
        //         curveMesh2.parent = parentModel
        //         // curveMesh2.color = new BABYLON.Color3(1, 1, 1)
        //         curveMesh2.alpha = 1
        //         curveMesh2.parent = parentModel;
        //         // glow.referenceMeshToUseItsOwnMaterial(curveMesh2)
        //     })
        //     // }

        //     parentModel.parent = grandModel;

        // }
        const ChinaMap = MeshFactory.map(chinaData, centerX, centerZ, hight, this.scene) // 生成地图
        const flyLine = MeshFactory.flyLine(chinaData, centerX, centerZ, flyStar, this.engine, this.scene)
        // flyLine(this.scene, this.engine);


        // 数字
        chinaData.forEach(f => {
            var newColor = [
                new Color4(
                    255 / 255,
                    255 / 255,
                    0 / 255,
                    1
                ),
                new Color4(
                    128 / 255,
                    128 / 255,
                    128 / 255,
                    1
                ),
                new Color4(
                    255 / 255,
                    255 / 255,
                    0 / 255,
                    1
                )
            ];
            if (flyStar.includes(f.properties.name)) {
                var num = MeshFactory.Text_3D('', '12345', this.scene, { font: Arial, faceColor: newColor })
                num.position = new Vector3(f.properties.centroid[0] - centerX, 0, f.properties.centroid[1] - centerZ - 0.8)
                num.isPickable = false
                num.rotation.x = Math.PI / 2
                num.material = text_3d_material
            }
        });




        // 鼠标移动事件 主要用于变色，没什么别的用
        var temMesh: any;
        var onPointerOver = () => {
            var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
            var pickedMesh = pickResult.pickedMesh
            // grandModel._children.forEach((children: any) => {
            if (pickedMesh) {
                if (temMesh !== pickedMesh) {
                    pickedMesh.material = pickedMesh.metadata.materialLog[1]
                    if (temMesh !== undefined && temMesh !== null && temMesh !== pickedMesh) {
                        temMesh.material = temMesh.metadata.materialLog[0]
                    }
                    temMesh = pickedMesh;
                }
                // if (children.position.y !== 1.5) {
                // gsap.to(camera.target, { x: children.getChildren()[0].position.x * 2, y: 2.5, z: children.getChildren()[0].position.z * 2, duration: 1, ease: 'Power1.easeInout' })
                // gsap.to(camera, { radius: 30, duration: 1, ease: 'Power1.easeInout' })
                // gsap.to(children.position, { y: 1.5, duration: 1, ease: 'Power1.easeInout' })
                // children.position.y = 1.5
                // children._children.forEach((child: any) => {
                //     /* if (child.name == 'h') {
                //       // child.material = material32
                //       child.material = child.metadata[1]
                //     }
                //     if (child.name == 'polygon') {
                //       // child.material = material1
                //       child.material = child.metadata[1]
                //     } */
                //     if (child.name == 'polygon') {
                //         child.material = material2
                //     }

                //     // child.edgesColor = new BABYLON.Color4(1, 1, 1, 1)
                //     // child.renderingGroupId = 1
                // })
            }
            else {
                if (temMesh != undefined && temMesh != null) {
                    temMesh.material = temMesh.metadata.materialLog[0]
                    temMesh = null;
                }
                // children.position.y = 0
                // gsap.to(children.position, { y: 0, duration: 1, ease: 'Power1.easeInout' })
                // gsap.to(camera, { radius: 50, duration: 1, ease: 'Power1.easeInout' })
                // gsap.to(camera.target, { x: 0, y: 0, z: 0, duration: 1, ease: 'Power1.easeInout' })
                // children._children.forEach((child: any) => {
                //     // if (child.onReady != '1') {
                //     /* if (child.name == 'h') {
                //       child.material = material3
                //     }
                //     if (child.name == 'polygon') {
                //       child.material = material
                //     } */
                //     if (child.name == 'polygon') {
                //         child.material = material
                //     }
                //     // child.edgesColor = new BABYLON.Color4(0, 1, 1, 1)
                //     // child.renderingGroupId = 0
                //     // }
                // })
                // }
                // })
            }
        }
        this._canvas.addEventListener('pointermove', onPointerOver, false)


        // 鼠标点击事件，用于传输数据
        const postMes = () => {
            var pickResult = this.scene.pick(this.scene.pointerX, this.scene.pointerY)
            var pickedMesh = pickResult.pickedMesh
            // grandModel._children.forEach((children: any) => {
            if (pickedMesh) {
                window.postMessage(convertToDMS(pickedMesh.metadata.longitude, pickedMesh.metadata.latitude), '*');
            }
        }
        this._canvas.addEventListener('click', postMes, false)

        /* function flyLine(scene: Scene, engine: Engine) {
            const color = new Color3(
                sceneConfig.flyLine.color.r / 255,
                sceneConfig.flyLine.color.g / 255,
                sceneConfig.flyLine.color.b / 255) // 颜色
            const result = MaterialFactory.picMaterial(require('../resources/arrow2.jpg'), color, scene) // 引用资源
            const pMaterial = result.picMaterial


            china.features.forEach(f => {
                if (flyStar.includes(f.properties.name)) {
                    if (f.properties.center != undefined) {
                        var x0 = (117.000923 - centerX)
                        var z0 = (36.675807 - centerZ)
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
                        var path = MeshFactory.BezierLine(pathPoint).getPoints()
                        var Wl = MeshFactory.widthLine('feixian', 0.5, path, undefined)
                        // Wl.position.y += hight;
                        Wl.material = pMaterial
                        Wl.renderingGroupId = 2
                        Wl.isPickable = false
                        Wl.parent = flyLineParent
                    }
                }

            })

            engine.runRenderLoop(() => {
                result.flowTexture.vOffset += sceneConfig.flyLine.speed
            })
        } */


        // 经纬度转换
        function convertToDMS(longitude: number, latitude: number): { lat: string, lon: string } {
            const lonDMS = convertToDMSUnit(longitude);
            const latDMS = convertToDMSUnit(latitude);

            return { lon: lonDMS, lat: latDMS };
        }
        function convertToDMSUnit(value: number): string {
            const degrees = Math.floor(value);
            const minutes = Math.floor((value - degrees) * 60);
            const seconds = ((value - degrees - minutes / 60) * 3600).toFixed(2);
            return `${degrees}°${minutes}'${seconds}"`;
        }
    }
}
