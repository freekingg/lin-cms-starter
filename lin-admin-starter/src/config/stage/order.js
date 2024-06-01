const orderRouter = {
  route: null,
  name: null,
  title: '订单管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/order/',
  order: null,
  inNav: true,
  children: [
    {
      title: '订单列表',
      type: 'view',
      name: 'orderList',
      route: '/order/list',
      filePath: 'view/order/order-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
    {
      title: '业绩统计',
      type: 'view',
      name: 'statisticsList',
      route: '/order/statistics',
      filePath: 'view/order/statistics-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default orderRouter
