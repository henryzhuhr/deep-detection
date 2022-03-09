import type { NavbarConfig } from '@vuepress/theme-default'

const dataset = {
  text: '数据集',
  children: [
    {
      text: "VOC2012数据",
      link:"/dataset/voc2012/"
    },
    {
      text: "自定义数据集制作",
      link: "docs/dataset/custom/README.md"
    },
  ],
}

const model={
  text: '模型',
  children: [
    {
      text: "yolov5",
      link:"/model/yolov5/README.md"
    },
    // {
    //   text: "yolox",
    //   link: "/model/yolox/README.md"
    // },
  ],
}


export const navbar: NavbarConfig = [
  {
    text: '首页',
    link: '/',
  },
  {
    text: '参考',
    children: [
      dataset,
      model
    ],
  },
]
