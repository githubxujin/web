<<<<<<< HEAD
export default [{
  path: '/alarmManagement',
  name: 'alarmManagement',
  component: resolve =>
    require(['../../view/monitoring/Alarm/AlarmManagement.vue'], resolve),
  meta: {
    title: '报警管理'
=======
export default [
  {
    path: '/alarmManagement',
    name: 'alarmManagement',
    component: resolve =>
      require(['../../view/monitoring/Alarm/AlarmManagement.vue'], resolve),
    meta: {
      title: '报警管理'
    }
  },
  {
    path: '/alarmSearch',
    name: 'alarmSearch',
    component: resolve =>
      require(['../../view/monitoring/Alarm/AlarmSearch.vue'], resolve),
    meta: {
      title: '报警筛选'
    }
  },
  {
    path: '/alarmDetail/:id',
    name: 'alarmDetail',
    component: resolve =>
      require(['../../view/monitoring/Alarm/AlarmDetail.vue'], resolve),
    meta: {
      title: '报警详情'
    }
  },
  {
    path: '/elevatorMonitoring',
    name: 'elevatorMonitoring',
    component: resolve =>
      require([
        '../../view/monitoring/Elevator/ElevatorMonitoring.vue'
      ], resolve),
    meta: {
      title: '电梯监控'
    }
  },
  {
    path: '/elevatorDetail/:number',
    name: 'elevatorDetail',
    component: resolve =>
      require(['../../view/monitoring/Elevator/ElevatorDetail.vue'], resolve),
    meta: {
      title: '电梯详情'
    }
  },
  // {
  //   path: '/elevatorDetail1/:number',
  //   name: 'elevatorDetail1',
  //   component: resolve => require(['../../view/monitoring/Elevator/VideoJsPlayer.vue'], resolve),
  //   meta: {
  //     title: '电梯视频测试'
  //   }
  // },
  {
    path: '/energy-monitoring',
    name: 'energy-monitoring',
    component: resolve =>
      require(['../../view/monitoring/Energy/EnergyMonitoring.vue'], resolve),
    meta: {
      title: '给排水监控'
    }
  },
  {
    path: '/drainage-monitoring',
    name: 'drainage-monitoring',
    component: resolve =>
      require([
        '../../view/monitoring/Drainage/DrainageMonitoring.vue'
      ], resolve),
    meta: {
      title: '能耗监测'
    }
  },
  {
    path: '/drainage-monitor',
    name: 'drainageMonitor',
    component: resolve =>
      require(['../../view/monitoring/Drainage/DrainageMonitor.vue'], resolve),
    meta: {
      title: '能耗监测'
    }
  },
  {
    path: '/communication',
    name: 'communication',
    component: resolve =>
      require(['../../view/monitoring/Communication'], resolve),
    meta: {
      title: '通讯监测'
    }
  },
  {
    path: '/communicationDetail',
    name: 'communicationDetail',
    component: resolve =>
      require([
        '../../view/monitoring/Communication/CommunicationDetail'
      ], resolve),
    meta: {
      title: '通讯监测'
    }
>>>>>>> e18021f1aed452edd1c2f24c8b28caf963cb0749
  }
},
{
  path: '/alarmSearch',
  name: 'alarmSearch',
  component: resolve =>
    require(['../../view/monitoring/Alarm/AlarmSearch.vue'], resolve),
  meta: {
    title: '报警筛选'
  }
},
{
  path: '/alarmDetail/:id',
  name: 'alarmDetail',
  component: resolve =>
    require(['../../view/monitoring/Alarm/AlarmDetail.vue'], resolve),
  meta: {
    title: '报警详情'
  }
},
{
  path: '/elevatorMonitoring',
  name: 'elevatorMonitoring',
  component: resolve =>
    require([
      '../../view/monitoring/Elevator/ElevatorMonitoring.vue'
    ], resolve),
  meta: {
    title: '电梯监控'
  }
},
{
  path: '/elevatorDetail/:number',
  name: 'elevatorDetail',
  component: resolve =>
    require(['../../view/monitoring/Elevator/ElevatorDetail.vue'], resolve),
  meta: {
    title: '电梯详情'
  }
},
{
  path: '/energyMonitoring',
  name: 'energyMonitoring',
  component: resolve =>
    require(['../../view/monitoring/Energy/EnergyMonitoring.vue'], resolve),
  meta: {
    title: '给排水监控'
  }
},
{
  path: '/drainageMonitoring',
  name: 'drainageMonitoring',
  component: resolve =>
    require([
      '../../view/monitoring/Drainage/DrainageMonitoring.vue'
    ], resolve),
  meta: {
    title: '能耗监测'
  }
},
{
  path: '/drainageMonitor',
  name: 'drainageMonitor',
  component: resolve =>
    require(['../../view/monitoring/Drainage/DrainageMonitor.vue'], resolve),
  meta: {
    title: '能耗监测'
  }
},
{
  path: '/communication',
  name: 'communication',
  component: resolve =>
    require(['../../view/monitoring/Communication'], resolve),
  meta: {
    title: '通讯监测'
  }
},
{
  path: '/communicationDetail',
  name: 'communicationDetail',
  component: resolve =>
    require([
      '../../view/monitoring/Communication/CommunicationDetail'
    ], resolve),
  meta: {
    title: '通讯监测'
  }
},
{
  path: '/repairForm',
  name: 'repairForm',
  component: resolve =>
    require([
      '../../components/common/Repair'
    ], resolve),
  meta: {
    title: '填写保修单'
  }
}
]
