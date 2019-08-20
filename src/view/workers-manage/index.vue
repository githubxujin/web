<template>
  <div class="work-manage">
    <nav-bar title="工单池">
      <!-- <i slot="search" class="iconfont iconicondaipingjia"></i> -->
      <span slot="search" class="fr">
        <!-- <i class="iconfont iconicondaipingjia"></i> -->
      </span>
    </nav-bar>
    <Location></Location>
    <!-- 主要内容 -->
    <div class="main-contain">
      <van-tabs animated>
        <van-tab title="全部">
          <work-order :dataList="dataList.unfinished.list"></work-order>
        </van-tab>
        <van-tab title="维修">
          <work-order :dataList="dataList.entryOrders.list"></work-order>
        </van-tab>
        <van-tab title="巡检">
          <work-order :dataList="dataList.finished.list"></work-order>
        </van-tab>
        <van-tab title="保养">
          <work-order :dataList="dataList.finished.list"></work-order>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue';
import Location from '@/components/common/Location.vue';
import vHeader from '@/components/common/Header'
// import workOrder from '@/components/common/WorkOrder'
import workOrder from '../assignment/list'
export default {
  name: 'Assignment',
  components: { NavBar, Location, workOrder },
  data() {
    return {
      CurrentShop: '深圳民治天虹商场',
      taskNum: 0,
      dataList: {
        unfinished: {
          num: 3,
          list: [
            { type: 1, number: 'W4403Z0906030898', repairMan: '李宁专买', position: '民治天虹一楼A117', problem: '插座没有电', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '电梯#1', position: '民治天虹A层', problem: '平层故障', time: '2019-05-31 09:46' },
            { type: 4, number: 'W4403Z0906039527', repairMan: '软通空调主机', position: '民治天虹制冷机房', problem: '定期保养', time: '2019-05-31 12:46' }
          ]
        },
        entryOrders: {
          num: 2,
          list: [
            { type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' }
          ]
        },
        finished: {
          list: [
            { type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' }
          ]
        }
      }
    }
  },
  computed: {
    roleType: function() {
      return this.$store.getters.getUserInfo.roleType;
    }
  }
}
</script>
<style lang="scss" scoped>
.work-manage {
  width: 100%;
  .main-contain {
    height: calc(100vh - 136px);
    overflow: auto;
  }
  .selectShop {
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 18px;
    background: #eee;
  }
}
</style>

