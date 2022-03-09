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
      logo: '/images/logo.svg',
      navbar:navbar
    },
  }