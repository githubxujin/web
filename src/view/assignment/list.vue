<template>
  <div class="wrapper">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <work-item v-for="(item,i) in list" :key="i"></work-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import WorkItem from './WorkItem';
import { finished } from 'stream';
import { setTimeout } from 'timers';
import { getRepairList } from '@/services/assignment';

const list = [// 1，商家报修，2，平台报修，3，巡检
  { type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46' },
  { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
  { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' },
  { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
  { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
  { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
  { type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46' },
  { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' },
  { type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46' }
]
export default {
  components: { WorkItem },
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      loadingStatus: false, // 自带loading会加载两次，增加额外的loading标识
      list: [],
      params: {

      }
    }
  },
  created() { },
  mounted() {
    this.onLoad();
  },
  methods: {
    onRefresh() {
      setTimeout(_ => {
        this.list = [];
        this.onLoad();
        this.loading = false;
      }, 500)
    },
    onLoad() {
      if (this.loadingStatus) return;
      this.loadingStatus = true;
      const params = {

      }
      getRepairList({})
      setTimeout(_ => {
        this.isLoading = false;
        this.loading = false;
        this.loadingStatus = false;
        this.list = this.list.concat(list)
        if (this.list.length >= 20) this.finished = true;
        else this.finished = false;
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
