export default {
  chart: {
    icon: 'iconinterfaceDataOriginfill',
    iconText: '插入数据',
    config: {
      w: 400,
      h: 418,
      x: 130,
      y: 130,
      whLock: false,
    }
  },
  text: {
    icon: 'iconredactredacttextfill',
    iconText: '插入文本',
    config: {
      w: 200,
      h: 38,
      x: 100,
      y: 100,
      whLock: false,
    }
  },
  map: {
    icon: 'iconredactredactcircumfill',
    iconText: '插入地图',
    config: {
      w: 400,
      h: 400,
      x: 160,
      y: 100,
      whLock: false,
    }
  },
  image: {
    icon: 'iconredactimage',
    iconText: '插入图片',
    config: {
      w: 400,
      h: 160,
      x: 20,
      y: 20,
      whLock: true,
    }
  },
 
}

type ComponentName = 'chart' | 'image' | 'text' | 'map';
export { ComponentName };