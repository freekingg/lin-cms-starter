const appRouter = {
  route: null,
  name: null,
  title: '产品管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/app/',
  order: 4,
  inNav: true,
  children: [
    {
      title: '产品列表',
      type: 'view',
      name: 'appList',
      route: '/app/list',
      filePath: 'view/app/app-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '联系人列表',
      type: 'view',
      name: 'userList',
      route: '/user/list',
      filePath: 'view/app/user-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default appRouter
