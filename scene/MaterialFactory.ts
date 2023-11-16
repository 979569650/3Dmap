
import {
    Scene, ShaderMaterial, AbstractMesh, Mesh, Texture,
    Color3, PBRMaterial, StandardMaterial
} from "@babylonjs/core";


export class MaterialFactory {
    /**
     * 创建图片纹理
     * @param src 
     * @param color 
     * @param scene 
     * @returns 
     */
    public static picMaterial(src: string, color: Color3, scene: Scene) {
        // 流动材质-纹理
        let flowTexture = new Texture(src, scene);
        // flowTexture.wAng = - Math.PI / 2; // 旋转90度
        flowTexture.uScale = 1; // 水平缩放为1倍
        flowTexture.vScale = 1; // 垂直缩放为1倍
        // 设置纹理的位置偏移
        flowTexture.uOffset = 0; // 在水平方向上偏移0.5个单位
        flowTexture.vOffset = 0; // 在垂直方向上偏移0.5个单位

        var picMaterial = new StandardMaterial("material", scene);
        // pbrMaterial.diffuseTexture = flowTexture
        picMaterial.diffuseColor = color
        picMaterial.emissiveColor = color
        picMaterial.opacityTexture = flowTexture
        picMaterial.opacityTexture.getAlphaFromRGB = true;
        // pbrMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD;

        return { flowTexture, picMaterial }
    }
    //效果二
    public static picMaterial2(src: string, scene: Scene) {
        // 流动材质-纹理
        var flowTexture = new Texture(src, scene);
        // flowTexture.wAng = - Math.PI / 2; // 旋转90度
        flowTexture.uScale = 1; // 水平缩放为2倍
        flowTexture.vScale = 1; // 垂直缩放为2倍
        // 设置纹理的位置偏移
        flowTexture.uOffset = 0; // 在水平方向上偏移0.5个单位
        flowTexture.vOffset = 0; // 在垂直方向上偏移0.5个单位

        var picMaterial = new StandardMaterial("material", scene);
        // picMaterial.emissiveColor = color
        picMaterial.emissiveTexture = flowTexture
        picMaterial.opacityTexture = flowTexture
        // picMaterial.opacityTexture.getAlphaFromRGB = true;
        // pbrMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD;

        return { flowTexture, picMaterial }
    }

    /**
     * 自发光材质
     * @param r 
     * @param g 
     * @param b 
     * @param scene 
     * @returns 
     */
    public static RGB_emissive(r: any, g: any, b: any, scene: any) {
        const RGB = new StandardMaterial("RGB", scene,)
        RGB.emissiveColor = new Color3(r, g, b)
        return RGB
    }

}