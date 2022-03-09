import { navbar } from './navbar'

module.exports = {
  // 站点配置
  base: '/deep-detection/',
  lang: 'zh-CN',
  title: '目标检测',
  description: '这是一个关于目标检测的故事',

  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    // logo: https://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=39294
    logo: '/images/logo.svg',
    logoDark: '/images/logoDark.svg',
    navbar: navbar
  },
}