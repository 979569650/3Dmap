import { ArcRotateCamera, Color3, Color4, CreatePolygon, Curve3, Engine, Mesh, MeshBuilder, Scene, SpotLight, Vector3, Vector4 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Control, TextBlock } from '@babylonjs/gui';
import * as BABYLON from "babylonjs";
import * as earcut from 'earcut';
import { Component, Prop, Vue } from "vue-property-decorator";
import { MaterialFactory } from '../../scene/MaterialFactory';
import { MeshFactory } from '../../scene/MeshFactory';
import * as Arial from '../../font/Arial_Bold.json'
import * as geographicCenter from '../resources/mapData/geographicCenter.json';
// import * as china from '../resources/mapData/China.json';
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
    public area: any;

    public sceneConfig: any;
    async mounted() {

        const scenecfg: any = window
        this.sceneConfig = scenecfg.sceneCFG
        BABYLON.ScenePerformancePriority.BackwardCompatible
        // BABYLON.ScenePerformancePriority.Aggressive
        const mapName = this.sceneConfig.mapWhere
        const map = import('../resources/mapData/' + mapName + '.json');
        await map.then((data) => {
            this.area = data
        });

        this._canvas = document.getElementById('rendCanvas') as HTMLCanvasElement;
        this.engine = new Engine(this._canvas);
        // this.engine.doNotHandleContextLost = true;
        // this.engine.enableOfflineSupport = false;
        this.engine.performanceMonitor
        this.scene = new Scene(this.engine);
        this.scene.clearColor = new Color4(
            this.sceneConfig.backgroundColor.r / 255,
            this.sceneConfig.backgroundColor.g / 255,
            this.sceneConfig.backgroundColor.b / 255
        );
        // this.scene.clearCachedVertexData();
        // this.scene.cleanCachedTextureBuffer();
        // this.scene.debugLayer.show()
        this.camera = new ArcRotateCamera(
            "Camera",
            -Math.PI / 2,
            0,
            50,
            Vector3.Zero(),
            this.scene
        );
        if (this.sceneConfig.camera.isControl) {
            this.camera.attachControl(this._canvas, true);
        }
        this.camera.lowerRadiusLimit = this.sceneConfig.camera.lowerRadiusLimit;//视点拉近的最大距离，用于限制视野范围
        this.camera.upperRadiusLimit = this.sceneConfig.camera.upperRadiusLimit;//视点拉远的最大距离
        if (this.sceneConfig.camera.lowerAlphaLimit != null) {
            this.camera.lowerAlphaLimit = this.sceneConfig.camera.lowerAlphaLimit
        }
        if (this.sceneConfig.camera.upperAlphaLimit != null) {
            this.camera.upperAlphaLimit = this.sceneConfig.camera.upperAlphaLimit
        }
        if (this.sceneConfig.camera.lowerBetaLimit != null) {
            this.camera.lowerBetaLimit = this.sceneConfig.camera.lowerBetaLimit
        }
        if (this.sceneConfig.camera.upperBetaLimit != null) {
            this.camera.upperBetaLimit = this.sceneConfig.camera.upperBetaLimit
        }
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


        const indexedObj: any = {}
        geographicCenter.forEach(item => {
            indexedObj[item.name] = item;
        })

        var centerX = indexedObj[this.sceneConfig.mapWhere].centroid[0]
        var centerZ = indexedObj[this.sceneConfig.mapWhere].centroid[1]
        // var grandModel: any = new Mesh("grandModel", this.scene);
        var hight = this.sceneConfig.map.hight;
        var chinaData = this.area.features;
        // console.log(chinaData);
        const flyStar = this.sceneConfig.flyLine.start
        const flyEnd = this.sceneConfig.flyLine.end
        const ChinaMap = MeshFactory.map(chinaData, centerX, centerZ, hight, this.scene) // 生成地图
        if (this.sceneConfig.flyLine.switch) {
            for (let i = 0; i < flyStar.length; i++) {
                const flyLine = MeshFactory.flyLine(chinaData, centerX, centerZ, flyStar[i], indexedObj[flyEnd[i]].center, this.sceneConfig.flyLine.color[i], this.engine, this.scene)
            }
        }

        // 数字
        if (this.sceneConfig.Number3D.switch) {
            chinaData.forEach((f: { properties: { name: string; centroid: number[]; center: number[] }; }) => {
                // 新作一个颜色，代替Text_3D的颜色
                var newColor = this.sceneConfig.Number3D.color != undefined ? [
                    new Color4(
                        this.sceneConfig.Number3D.color.topColor.r / 255,
                        this.sceneConfig.Number3D.color.topColor.g / 255,
                        this.sceneConfig.Number3D.color.topColor.b / 255,
                        this.sceneConfig.Number3D.color.topColor.a
                    ),
                    new Color4(
                        this.sceneConfig.Number3D.color.sideColor.r / 255,
                        this.sceneConfig.Number3D.color.sideColor.g / 255,
                        this.sceneConfig.Number3D.color.sideColor.b / 255,
                        this.sceneConfig.Number3D.color.sideColor.a
                    ),
                    new Color4(
                        this.sceneConfig.Number3D.color.bottomColor.r / 255,
                        this.sceneConfig.Number3D.color.bottomColor.g / 255,
                        this.sceneConfig.Number3D.color.bottomColor.b / 255,
                        this.sceneConfig.Number3D.color.bottomColor.a
                    )
                ] : undefined
                flyStar.forEach((start: string | string[]) => {
                    if (start.includes(f.properties.name)) {
                        console.log();

                        var num = MeshFactory.Text_3D('', '12345', this.scene, { font: Arial, faceColor: newColor })
                        if (f.properties.centroid != undefined) {
                            num.position = new Vector3(f.properties.centroid[0] - centerX, 0, f.properties.centroid[1] - centerZ - 0.8)
                        } else if (f.properties.center != undefined) {
                            num.position = new Vector3(f.properties.center[0] - centerX, 0, f.properties.center[1] - centerZ - 0.8)
                        }

                        num.isPickable = false
                        num.rotation.x = Math.PI / 2
                        num.material = text_3d_material
                    }
                })
            });
        }




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
            }
            else {
                if (temMesh != undefined && temMesh != null) {
                    temMesh.material = temMesh.metadata.materialLog[0]
                    temMesh = null;
                }
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
