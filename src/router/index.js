import login from '../view/login/index.vue'
import index from '@/components/index'

export default [
  {
    path: '/test',
    name: 'test',
    component: resolve => require(['../view/test.vue'], resolve),
    meta: {
      title: 'test'
    }
  },
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/forget',
    name: 'forget',
    component: resolve =>
      require(['../view/login/ForgetPassword.vue'], resolve),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: resolve => require(['../view/login/ResetPassword.vue'], resolve),
    meta: {
      title: '重置密码'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: '/assignment',
        name: 'assignment',
        component: resolve => require(['../view/assignment/index'], resolve),
        meta: {
          title: '任务'
        }
      },
      {
        path: '/workersmanage',
        name: 'workersmanage',

        component: resolve =>
          require(['../view/workers-manage/index'], resolve),
        meta: {
          title: '工单池'
        }
      },
      {
        path: '/monitoring',
        name: 'monitoring',
        component: resolve => require(['../view/monitoring/index'], resolve),
        meta: {
          title: '监测'
        }
      },
      {
        path: '/discover',
        name: 'discover',
        component: resolve => require(['../view/discover/index'], resolve),
        meta: {
          title: '发现'
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: resolve => require(['../view/mine/index'], resolve),
        meta: {
          title: '我的'
        }
      }
    ]
  },
  {
    path: '/order-detail/:id',
    name: 'order-detail',
    component: resolve =>
      require(['../view/assignment/OrderDetail.vue'], resolve),
    meta: {
      title: '工单详情'
    }
  },
  {
    path: '/device-msg',
    name: 'device-msg',
    component: resolve =>
      require(['../view/assignment/DeviceMsg.vue'], resolve),
    meta: {
      title: '工单详情-设备参数'
    }
  },
  {
    path: '/trackRecord',
    name: 'trackRecord',
    component: resolve =>
      require(['../components/common/TrackRecord.vue'], resolve),
    meta: {
      title: '跟踪记录'
    }
  },
  {
    path: '/overOrder',
    name: 'overOrder',
    component: resolve =>
      require(['../view/assignment/OverOrder.vue'], resolve),
    meta: {
      title: '维修完工单'
    }
  },
  {
    path: '/add-repair',
    name: 'add-repair',
    component: resolve => require(['../view/common/AddRepair.vue'], resolve),
    meta: {
      title: '填写保修单'
    }
  }
]
