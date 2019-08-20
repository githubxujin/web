<template>
  <div class="assign-ment">
    <nav-bar title="任务">
      <!-- <i slot="search" class="iconfont iconicondaipingjia"></i> -->
      <span slot="search" class="fr">
        <i class="iconfont iconicondaipingjia"></i>
        <i class="iconfont iconarrright2"></i>
      </span>
    </nav-bar>
    <Location></Location>
    <div class="content">
      <van-tabs animated v-if="roleType==2">
        <van-tab :title="'未完成('+dataList.unfinished.num+')'">
          <work-order :dataList="dataList.unfinished.list" :type="dataList.unfinished.type"></work-order>
        </van-tab>
        <van-tab :title="'挂单('+dataList.entryOrders.num+')'">
          <work-order :dataList="dataList.entryOrders.list"></work-order>
        </van-tab>
        <van-tab title="完成">
          <work-order :dataList="dataList.finished.list"></work-order>
        </van-tab>
      </van-tabs>
      <van-tabs animated v-if="roleType==1">
        <van-tab :title="'审核('+dataList.unfinished.num+')'">
          <work-order :dataList="dataList.unfinished.list"></work-order>
        </van-tab>
        <van-tab :title="'挂单('+dataList.entryOrders.num+')'">
          <work-order :dataList="dataList.entryOrders.list"></work-order>
        </van-tab>
        <van-tab title="评价">
          <work-order :dataList="dataList.finished.list"></work-order>
        </van-tab>
      </van-tabs>
      <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <slot></slot>
        </van-list>
      </van-pull-refresh>-->
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue';
import Location from '@/components/common/Location.vue';
// import workOrder from '@/components/common/WorkOrder';
import workOrder from './list';
export default {
  name: 'Assignment',
  components: { NavBar, Location, workOrder },
  data() {
    return {
      currentShop: '深圳民治天虹商场',
      taskNum: 3,
      dataList: {
        unfinished: {
          num: 5,
          type: 1,
          list: [// 1，商家报修，2，平台报修，3，巡检
            { type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
            { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' }
          ]
        },
        entryOrders: {
          num: 2,
          type: 2,
          list: [
            { type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46' },
            { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' }
          ]
        },
        finished: {
          type: 3,
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
  },
  mounted() {
    console.log('首页', 'xxx')
  }
}
</script>
<style lang="scss" scoped>
.assign-ment {
  width: 100%;
  .content {
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

