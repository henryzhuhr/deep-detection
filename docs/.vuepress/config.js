module.exports = {
    // 站点配置
    base: '/ObjectDetection/',
    lang: 'zh-CN',
    title: '目标检测',
    description: '目标检测算法从模型训练到终端部署',

    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: 'https://vuejs.org/images/logo.png',
        lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
        nav : [
            { text: '接口定义', link: '/apiword' },
            { text: '接口字段定义', link: '/api' },
            { text: '附录：错误码', link: '/error' }
        ],
    },

}
