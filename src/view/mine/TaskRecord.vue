<template>
  <div class="wrapper">
    <van-nav-bar title="任务记录" left-arrow @click-left="onClickBack"/>
    <Location></Location>
    <div style="padding: 10px 10px 0px 10px">
      <div class="date" @click="show=true">{{currentDate}}</div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" @load="onLoad">
        <work-item v-for="(item,i) in list" :key="i"></work-item>
      </van-list>
    </van-pull-refresh>

    <div class="care_popup">
      <van-popup v-model="show"
                 position="bottom">
        <div class="popup_content">
          <!--<van-picker show-toolbar-->
          <!--title="人员"-->
          <!--:columns="columns"-->
          <!--@cancel="onCancel"-->
          <!--@confirm="onConfirm" />-->
          <van-datetime-picker
                  v-model="thisDate"
                  type="year-month"
                  :min-date="minDate"
                  :formatter="formatter"
                  @cancel="onCancel"
                  @confirm="onConfirm"
          />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
    import Location from '@/components/common/Location.vue';
    import WorkItem from './WorkItem';
    import {setTimeout} from 'timers';
    import {getRepairList} from '@/services/assignment';

    const list = [// 1，商家报修，2，平台报修，3，巡检
        {type: 1, number: 'W4403Z0906039527', repairMan: '小米之家', position: '民治天虹一楼A102', problem: '照明灯具损坏，需更换', time: '2019-05-31 12:46'},
        {type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46'},
        {type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46'},
        {type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46'},
        {type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46'},
        {type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46'},
        {type: 2, number: 'W4403Z0906039942', repairMan: '数据采集器#1', position: '民治天虹一楼楼层配电间', problem: '采集器掉线', time: '2019-05-31 12:46'},
        {type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46'},
        {type: 3, number: 'W4403Z0906039527', repairMan: '低压变压器', position: '民治天虹低压配电房', problem: '低压配电房季度训建', time: '2019-05-31 12:46'}
    ]
    export default {
        components: {WorkItem, Location,},
        data() {
            return {
                isLoading: false,
                loading: false,
                finished: false,
                loadingStatus: false, // 自带loading会加载两次，增加额外的loading标识
                list: [], thisDate: new Date(),
                minDate: new Date('2019-01-01'),
                currentDate: '',show:false
            }
        },
        created() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            this.currentDate=year+'年'+month+'月';
        },
        mounted() {
            this.onLoad();
        },
        methods: {
            formatter(type, value) {
                if (type === 'year') {
                    return `${value}年`;
                } else if (type === 'month') {
                    return `${value}月`
                }
                return value;
            },

            onConfirm (value, index) {
                let date = new Date(value);
                let year = date.getFullYear();
                let month = date.getMonth();
                this.currentDate=year+'年'+month+'月';
                this.show = false;
                this.index = index;
            },
            onCancel () {
                this.show = false;

            },
            onClickBack () {
                this.$router.go(-1)
            },
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
  .date{
    width:100px;  height:20px ; background-color:#FFFFFF; color:#006EFF; text-align: center;border-radius:10px
  }
</style>
