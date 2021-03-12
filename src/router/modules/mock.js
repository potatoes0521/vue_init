/*
 * @Author: liuYang
 * @description: 请填写描述信息
 * @path: 引入路径
 * @Date: 2021-03-12 17:24:43
 * @LastEditors: liuYang
 * @LastEditTime: 2021-03-12 17:34:03
 * @mustParam: 必传参数
 * @optionalParam: 选传参数
 * @emitFunction: 函数
 */
import Layout from '@layout'

export const mockRouter = [
  {
    id: 1000,
    path: '/offer',
    name: 'offer',
    icon: 'iconxunjiadanliebiao',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '询价管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10001,
        path: 'offerList',
        name: 'offerList',
        icon: 'iconxunjiadanliebiao',
        sort: 3,
        buttons: ['export', 'push-offer'],
        hideInMenu: false,
        title: '询价单列表',
        keepAlive: true,
        loadPath: 'offer/index',
        children: null
      },
      {
        id: 10002,
        path: 'offerDetails',
        name: 'offerDetails',
        icon: 'iconxunjiadanliebiao',
        sort: 2,
        buttons: [],
        hideInMenu: true,
        title: '询价单详情',
        keepAlive: false,
        loadPath: 'offer/details',
        children: null
      },
      {
        id: 10003,
        path: 'pushOffer',
        name: 'pushOffer',
        icon: 'iconxunjiadanliebiao',
        sort: 2,
        buttons: [],
        hideInMenu: true,
        title: '推询价',
        keepAlive: false,
        loadPath: 'transport/index',
        children: null
      },
      {
        id: 10004,
        path: 'offerPrice',
        name: 'offerPrice',
        icon: 'iconxunjiadanliebiao',
        sort: 2,
        buttons: [],
        hideInMenu: false,
        title: '线路价格管理',
        keepAlive: false,
        loadPath: 'offer/offerPrice',
        children: null
      }
    ]
  },
  {
    id: 1002,
    path: '/order',
    name: 'order',
    icon: 'icondingdanliebiao',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '订单管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10021,
        path: 'logisticsOrderList',
        name: 'logisticsOrderList',
        icon: 'icondingdanliebiao',
        sort: 3,
        buttons: ['pay-Offline', 'export', 'update-location'],
        hideInMenu: false,
        title: '物流订单列表',
        keepAlive: true,
        loadPath: 'order/logistics/index'
      },
      {
        id: 10022,
        path: 'logisticsOrderDetails',
        name: 'logisticsOrderDetails',
        icon: 'icondingdanliebiao',
        sort: 3,
        buttons: [
          'update-location',
          'pay-Offline',
          'cancel-order',
          'complete-order',
          'change-order-price',
          'push-order'
        ],
        hideInMenu: true,
        title: '物流订单详情',
        keepAlive: false,
        loadPath: 'order/logistics/details'
      },
      {
        id: 100045,
        path: 'pushOrder',
        name: 'pushOrder',
        icon: 'icondingdanliebiao',
        sort: 2,
        buttons: [],
        hideInMenu: true,
        title: '推单',
        keepAlive: false,
        loadPath: 'transport/index',
        children: null
      },
      {
        id: 10023,
        path: 'carProxyOrderList',
        name: 'carProxyOrderList',
        icon: 'icondingdanliebiao',
        sort: 3,
        buttons: ['pay-Offline', 'export', 'update-location'],
        hideInMenu: false,
        title: '车务订单列表',
        keepAlive: true,
        loadPath: 'order/carProxy/index'
      },
      {
        id: 10024,
        path: 'carProxyOrderDetails',
        name: 'carProxyOrderDetails',
        icon: 'icondingdanliebiao',
        sort: 3,
        buttons: [
          'update-location',
          'pay-Offline',
          'cancel-order',
          'complete-order',
          'change-order-price',
          'push-order'
        ],
        hideInMenu: true,
        title: '车务订单详情',
        keepAlive: false,
        loadPath: 'order/carProxy/details'
      }
    ]
  },
  {
    id: 1003,
    path: '/customer',
    name: 'customer',
    icon: 'iconkehuguanli',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '客户管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10031,
        path: 'customerList',
        name: 'customerList',
        icon: 'iconkehuguanli',
        sort: 3,
        buttons: ['append', 'edit', 'export'],
        hideInMenu: false,
        title: '客户管理',
        keepAlive: false,
        loadPath: 'customer/index'
      },
      {
        id: 10032,
        path: 'customerDetails',
        name: 'customerDetails',
        icon: 'iconkehuguanli',
        sort: 3,
        buttons: ['edit'],
        hideInMenu: true,
        title: '客户详情',
        keepAlive: false,
        loadPath: 'customer/details'
      },
      {
        id: 10033,
        path: 'customerAppend',
        name: 'customerAppend',
        icon: 'iconkehuguanli',
        sort: 3,
        buttons: [],
        hideInMenu: true,
        title: '客户添加',
        keepAlive: false,
        loadPath: 'customer/append'
      }
    ]
  },
  {
    id: 1004,
    path: '/transport',
    name: 'transport',
    icon: 'iconyunliguanli',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '运力管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10041,
        path: 'transportList',
        name: 'transportList',
        icon: 'iconyunliguanli',
        sort: 3,
        buttons: ['append', 'export', 'edit'],
        hideInMenu: false,
        title: '运力管理',
        keepAlive: false,
        loadPath: 'transport/index',
        children: null
      },
      {
        id: 10042,
        path: 'transportAppend',
        name: 'transportAppend',
        icon: 'iconyunliguanli',
        sort: 2,
        buttons: [],
        hideInMenu: true,
        title: '运力添加',
        keepAlive: false,
        loadPath: 'transport/append',
        children: null
      },
      {
        id: 10043,
        path: 'transportDetails',
        name: 'transportDetails',
        icon: 'iconyunliguanli',
        sort: 2,
        buttons: ['edit'],
        hideInMenu: true,
        title: '运力详情',
        keepAlive: false,
        loadPath: 'transport/details',
        children: null
      },
      {
        id: 10044,
        path: 'transportSystem',
        name: 'transportSystem',
        icon: 'iconyunliguanli',
        sort: 2,
        buttons: [],
        hideInMenu: true,
        title: '账户体系',
        keepAlive: false,
        loadPath: 'transport/system',
        children: null
      }
    ]
  },
  {
    id: 1006,
    path: '/post',
    name: 'post',
    icon: 'iconyizhanguanli1',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '驿站管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10061,
        path: 'postUserList',
        name: 'postUserList',
        icon: 'iconyizhanrenyuanliebiao',
        sort: 3,
        buttons: ['append', 'edit'],
        hideInMenu: false,
        title: '驿站人员列表',
        keepAlive: false,
        loadPath: 'post/index'
      },
      {
        id: 10062,
        path: 'postList',
        name: 'postList',
        icon: 'iconyizhanliebiao',
        sort: 3,
        buttons: ['edit'],
        hideInMenu: false,
        title: '驿站列表',
        keepAlive: false,
        loadPath: 'post/list'
      },
      {
        id: 10063,
        path: 'postDetails',
        name: 'postDetails',
        icon: 'iconjingxiaoshangguanli',
        sort: 3,
        buttons: ['edit'],
        hideInMenu: true,
        title: '驿站人员详情',
        keepAlive: false,
        loadPath: 'post/details'
      }
    ]
  },
  {
    id: 1007,
    path: '/merchant',
    name: 'merchant',
    icon: 'iconshanghuguanli',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '商户管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10071,
        path: 'merchantList',
        name: 'merchantList',
        icon: 'iconshanghuguanli',
        sort: 3,
        buttons: ['append', 'edit'],
        hideInMenu: false,
        title: '商户管理',
        keepAlive: false,
        loadPath: 'merchant/index'
      },
      {
        id: 10072,
        path: 'merchantTypeList',
        name: 'merchantTypeList',
        icon: 'iconjingxiaoshangguanli',
        sort: 3,
        buttons: ['edit'],
        hideInMenu: true,
        title: '商户类型',
        keepAlive: false,
        loadPath: 'merchant/typeList'
      },
      {
        id: 10073,
        path: 'merchantDetails',
        name: 'merchantDetails',
        icon: 'iconjingxiaoshangguanli',
        sort: 3,
        buttons: ['edit'],
        hideInMenu: true,
        title: '商户编辑',
        keepAlive: false,
        loadPath: 'merchant/details'
      }
    ]
  },
  {
    id: 1008,
    path: '/administration',
    name: 'administration',
    icon: 'iconyunyingguanli',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '运营管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10081,
        path: 'bannerList',
        name: 'bannerList',
        icon: 'iconbannerliebiao',
        sort: 3,
        buttons: ['append', 'edit', 'delete'],
        hideInMenu: false,
        title: 'banner列表',
        keepAlive: false,
        loadPath: 'administration/banner/index'
      },
      {
        id: 10082,
        path: 'bannerAppend',
        name: 'bannerAppend',
        icon: 'iconbannerliebiao',
        sort: 3,
        buttons: [],
        hideInMenu: true,
        title: 'banner添加',
        keepAlive: false,
        loadPath: 'administration/banner/append'
      },
      {
        id: 10083,
        path: 'lineList',
        name: 'lineList',
        icon: 'iconbannerliebiao',
        sort: 3,
        buttons: ['append', 'edit', 'delete'],
        hideInMenu: true,
        title: '常跑线路列表',
        keepAlive: false,
        loadPath: 'administration/line/index'
      },
      {
        id: 10084,
        path: 'lineAppend',
        name: 'lineAppend',
        icon: 'iconbannerliebiao',
        sort: 3,
        buttons: [],
        hideInMenu: true,
        title: '常跑线路添加',
        keepAlive: false,
        loadPath: 'administration/line/append'
      }
    ]
  },
  {
    id: 1009,
    path: '/admin',
    name: 'admin',
    icon: 'iconguanliyuanliebiao',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '权限管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10091,
        path: 'adminList',
        name: 'adminList',
        icon: 'iconguanliyuanliebiao',
        sort: 3,
        buttons: ['edit', 'delete', 'append', 'change'],
        hideInMenu: false,
        title: '管理员列表',
        keepAlive: false,
        loadPath: 'admin/index'
      },
      {
        id: 10092,
        path: 'roleList',
        name: 'roleList',
        icon: 'iconjiaoseliebiao',
        sort: 3,
        buttons: [],
        hideInMenu: false,
        title: '角色列表',
        keepAlive: false,
        loadPath: 'admin/roleList'
      },
      {
        id: 10093,
        path: 'menu',
        name: 'menu',
        icon: 'iconjiaoseliebiao',
        sort: 3,
        buttons: [],
        hideInMenu: true,
        title: '权限编辑',
        keepAlive: false,
        loadPath: 'admin/menuEdit'
      }
    ]
  },
  {
    id: 1010,
    path: '/record',
    name: 'record',
    icon: 'iconrizhi',
    sort: 2,
    buttons: [],
    hideInMenu: false,
    title: '日志管理',
    keepAlive: false,
    loadPath: Layout,
    children: [
      {
        id: 10101,
        path: 'recordList',
        name: 'recordList',
        icon: 'iconrizhi',
        sort: 3,
        buttons: [],
        hideInMenu: false,
        title: '日志列表',
        keepAlive: false,
        loadPath: 'record/index'
      }
    ]
  }
]
