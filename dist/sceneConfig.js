const camera = {
    radius: 80, //相机高度，数值大=>视角/地图小
    target: { //观察点中心位置
        x: 0,
        y: 0,
        z: 2,
    },
};
const flyLine = {
    picture: 'arrow2.jpg',// 不可修改
    color: { //飞线颜色
        r: 255,
        g: 255,
        b: 0
    },
    speed: 0.03 //飞线速度
};
const map = {
    hight: 4, //地图厚度
    topColor: { //地图顶部颜色
        r: 215,
        g: 126,
        b: 40,
        a: 1
    },
    sideColor: { //地图侧边颜色
        r: 135,
        g: 62,
        b: 14,
        a: 1
    },
    bottomColor: { //地图底部颜色
        r: 215,
        g: 126,
        b: 40,
        a: 1
    },
    outlineColor: { //地图轮廓线颜色
        r: 244,
        g: 235,
        b: 163,
        a: 1
    },
    outlineWidth: 10, // 地图轮廓线粗细

    disColor: { // 变色
        r: 200,
        g: 80,
        b: 40,
    }
};
const Text3D = {
    size: 0.6, // 字体大小
    depth: 0.2, // 字体厚度
    // 默认颜色，如果更改后没有变化则为代码中设置的颜色，需在代码中更改
    topColor: { //顶部颜色
        r: 255,
        g: 255,
        b: 255,
        a: 1
    },
    sideColor: { //侧边颜色
        r: 0,
        g: 0,
        b: 0,
        a: 1
    },
    bottomColor: { //底部颜色
        r: 255,
        g: 255,
        b: 255,
        a: 1
    },
};
// export default {camera,flyLine,map,Text3D,QWER}
// module.exports = { camera, flyLine, map, Text3D, QWER };

window.sceneCFG = { camera, flyLine, map, Text3D }