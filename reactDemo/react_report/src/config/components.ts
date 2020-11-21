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
  }
}

type ComponentName = 'chart' | 'text';

export { ComponentName };