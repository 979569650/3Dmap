const backgroundColor = {
    r: 230,
    g: 224,
    b: 218
};

/**
 * 可用地区：
 */
const mapWhere = 'China'

const camera = {
    isControl: true,
    radius: 80, //相机高度，数值大=>视角/地图小
    target: { //观察点中心位置
        x: 0,
        y: 0,
        z: 2,
    },
    // 缩放限制 取消(关闭)限制设为null
    lowerRadiusLimit: null,//视点拉近的最大距离，用于限制视野范围
    upperRadiusLimit: null,//视点拉远的最大距离
    // ↓横方向角度限制
    lowerAlphaLimit: null,//
    upperAlphaLimit: null,
    // ↓竖方向角度限制
    lowerBetaLimit: null,
    upperBetaLimit: null,
};

const flyLine = {
    switch: true,
    picture: 'arrow2.jpg', // 飞线图片的名称（带后缀），图片放在resources目录下
    speed: 0.03, //飞线速度
    width: 0.5, // 宽度
    uScale: 1,// 水平缩放
    vScale: 3, // 垂直缩放
    // 起始点，两个数组的长度必须一样，且不能为空，对应关系是第i个start流向第i个end
    start: [
        ['青海', '新疆', '云南', '黑龙江', '广东', '浙江'],
        ['新疆', '云南', '黑龙江', '广东']
    ],
    end: [
        '山东',
        '四川'
    ],
    color: [ //飞线颜色，同start和end一样对应，数组长度相同且不能为空，格式必须正确
        {
            r: 255,
            g: 255,
            b: 0
        }, {
            r: 255,
            g: 0,
            b: 255
        }
    ]
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
    switch: true,
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

const Text2D = {
    switch: false,
    size: 18, // 字体大小
    color: '#ffffff' //字体颜色
}

const Number3D = {
    switch: true,
    //大小，厚度跟文字相同
    // 颜色设置为null时，则同文字颜色同色
    // color: undefined,
    color: {
        topColor: { //顶部颜色
            r: 255,
            g: 255,
            b: 0,
            a: 1
        },
        sideColor: { //侧边颜色
            r: 128,
            g: 128,
            b: 128,
            a: 1
        },
        bottomColor: { //底部颜色
            r: 255,
            g: 255,
            b: 0,
            a: 1
        }
    }
}
// export default { camera,flyLine,map,Text3D,QWER}
// module.exports = { camera, flyLine, map, Text3D, QWER };

window.sceneCFG = { backgroundColor, mapWhere, camera, flyLine, map, Text3D, Text2D, Number3D }