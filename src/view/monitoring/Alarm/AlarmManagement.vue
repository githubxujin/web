<template>
  <div class="monitoring-info">
    <div class="monitoring-header">
      <nav-bar title="综合报警" :num="alarmNum" type="type">
        <i slot="search" class="iconfont iconiconsousuo fr" @click="search"></i>
      </nav-bar>
      <div class="selection-condition">
        <van-dropdown-menu>
          <van-dropdown-item v-model="alarmRange" :options="range" @change="getAlarmRange" />
          <van-dropdown-item v-model="alarmStatus" :options="status" @change="getAlarmStatus" />
        </van-dropdown-menu>
      </div>
      </div>
    <alarmInfo :alarmRange="alarmRange" :alarmStatus="alarmStatus" ref="alarmInfo"></alarmInfo>
  </div>
</template>
<script>
import alarmInfo from '@/components/alarmInfo/'
import navBar from '@/components/common/NavBar.vue'
export default {
  components: { navBar, alarmInfo },
  data() {
    return {
      alarmNum: 3,
      alarmRange: '',
      alarmStatus: 0,
      range: [
        { text: '全部', value: '' },
        { text: '供配电', value: 1 },
        { text: '给排水', value: 2 },
        { text: '能耗', value: 3 },
        { text: '电梯', value: 4 },
        { text: '空调', value: 5 }
      ],
      status: [
        { text: '全部', value: '' },
        { text: '待确认', value: 0 },
        { text: '处理中', value: 2 },
        { text: '已恢复', value: 3 },
        { text: '已忽略', value: 1 }
      ]
    }
  },
  mounted() {
    this.$refs['alarmInfo'].getAlarmList()
  },
  computed: {
    roleType: function() {
      return this.$store.getters.getUserInfo.roleType;
    }
  },
  methods: {
    // 点击放大镜进行搜索
    search() {
      this.$router.push({ name: 'alarmSearch' })
    },
    // 获取报警范围
    getAlarmRange(val) {
      this.alarmRange = val;
    },
    // 获取报警状态
    getAlarmStatus(val) {
      this.alarmStatus = val;
    }
  }
}
</script>
<style lang="scss" scoped>
.monitoring-info {
  width: 100%;
  height:100%;
  .monitoring-header {
    position: fixed;
    top:0px;
    z-index: 100;
    width: 100%;
  }
  .selection-condition {
    /deep/.van-dropdown-menu {
      width: 100%;
      height: 36px;
    }
  }
}

</style>

