export default [
    {
        path: '/personalinfo',
        name: 'personalinfo',
        component: resolve => require(['../../view/mine/PersonalInfo.vue'], resolve),
        meta: {
            title: '个人信息'
        }
    },
    {
        path: '/addressbook',
        name: 'addressbook',
        component: resolve => require(['../../view/mine/AddressBook.vue'], resolve),
        meta: {
            title: '通讯录'
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: resolve => require(['../../view/mine/Setting.vue'], resolve),
        meta: {
            title: '设置'
        }
    }, {
        path: '/taskrecord',
        name: 'taskrecord',
        component: resolve => require(['../../view/mine/TaskRecord.vue'], resolve),
        meta: {
            title: '任务记录'
        }
    }, {
        path: '/workstate',
        name: 'workstate',
        component: resolve => require(['../../view/mine/WorkState.vue'], resolve),
        meta: {
            title: '工作状态'
        }
    }, {
        path: '/duty-management',
        name: 'duty-management',
        component: resolve => require(['../../view/mine/DutyManagement.vue'], resolve),
        meta: {
            title: '排班表'
        }
    }
    , {
        path: '/task-statistics',
        name: 'task-statistics',
        component: resolve => require(['../../view/mine/TaskStatistics.vue'], resolve),
        meta: {
            title: '排班表'
        }
    }

]
