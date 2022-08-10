const demoRouter = {
  route: null,
  name: null,
  title: '示例页面',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/demo/',
  order: null,
  inNav: true,
  children: [
    {
      title: '列表',
      type: 'view',
      name: 'DemoList',
      route: '/demo/list',
      filePath: 'view/demo/demo-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default demoRouter
