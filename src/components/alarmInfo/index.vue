<template>
<div>
    <div
      class="alarm-list"
    >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有数据了"
          @load="onload"
        >
        <div class="list-item box-size" v-for="(item,ind) in alarmList" :key="ind"  @click="getDetail(item)">
          <div class="alarm-info">
            <div class="alarm-title">{{item.alarmName}}</div>
            <div class="alarm-status">
              <levelButton
                :alarmLevel="item.alarmLevel"
                style="display:inline-block;margin-right:15px;"
              ></levelButton>
              <van-button plain round type="danger" size="mini" v-show="item.status==2">处理中</van-button>
              <van-button plain round type="primary" size="mini" v-show="item.status==3">已恢复</van-button>
              <van-button plain round type="default" size="mini" v-show="item.status==1">已忽略</van-button>
            </div>
            <div class="alarm-location clear">
              <div class="location fl">
                <i class="iconfont icondingwei"></i>
                <span>{{item.alarmLocation}}</span>
              </div>
              <div class="operating-button fr" v-show="item.status==0&&roleType==1">
                <span class="ignore" @click="showPopup(item,ind)">忽略</span>
                <span class="turn-order" @click="turnOrder">转工单</span>
              </div>
            </div>
          </div>
        </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup :round="true" v-model="isIgnore" :close-on-click-overlay="false">
            <div class="ignore-pop">
              <div class="title">确定忽略该报警？</div>
              <div class="operate-btn">
                <span @click="cancel">取 消</span>
                <span  @click="ignore">确 定</span>
              </div>
            </div>
    </van-popup>

</div>
</template>
<script>
import levelButton from '@/components/levelButton/LevelButton'
import { getAlarmList, getAlarmDetail, delAlarm } from '@/services/monitoring'
export default {
  components: { levelButton },
  props: {
    alarmStatus: { type: [String, Number] },
    alarmRange: { type: [String, Number] },
    type: { type: String },
    keyword: { type: String, default: '' }
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      deletedData: '',
      index: '',
      isIgnore: false,
      alarmList: [],
      pageNum: 1,
      pageSize: 15,
      detailData: {},
      showDetail: false
    }
  },
  computed: {
    roleType: function() {
      return this.$store.getters.getUserInfo.roleType;
    }
  },
  methods: {
    onload() {
      if (this.type && !this.keyword) {
        this.loading = false
        return false
      } else {
        this.getAlarmList()
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.pageNum = 1;
        this.getAlarmList()
        this.$toast('刷新成功');
      }, 500);
    },
    getAlarmList() {
      this.loading = false;
      var data = {
        alarmStatus: this.alarmStatus,
        alarmSysType: this.alarmRange,
        keyword: this.keyword,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (!this.finished) {
        this.pageNum++;
      }
      getAlarmList(data).then(res => {
        if (res.code == 200) {
          if (!res.data || res.data.total == 0) {
            this.alarmList = [];
            return;
          }
          if (res.data.total != 0) {
            if (this.pageNum == 2) {
              this.alarmList = [];
            }
            res.data.list.forEach(item => {
              this.alarmList.push(item)
            });
            var page = Math.ceil(res.data.total / this.pageSize);
            if (this.pageNum > page) {
              this.finished = true
              return false
            }
          } else {
            this.alarmList = []
          }
        }
      })
    },
    showPopup(item, ind) {
      this.deletedData = item;
      this.index = ind
      this.isIgnore = true;
    },
    getDetail(item) {
      // eslint-disable-next-line
      this.$router.push({ name: 'alarmDetail', params: { id: item.id }})
    },
    // 忽略工单
    ignore() {
      console.log(this.deletedData, this.index)
      delAlarm({ id: this.deletedData.id, status: 1 }).then(res => {
        if (res.code == 200) {
          this.$toast('忽略工单成功')
          this.pageNum = 1;
          this.getAlarmList();
          this.alarmList.splice(this.index, 0);
          this.isIgnore = false;
        }
      }).catch(err => {
        this.$toast(err)
        this.isIgnore = false;
      })
    },
    cancel() {
      this.isIgnore = false;
    },
    // 转工单
    turnOrder() {
      // this.showList = true;
    },
    toAlarmDetail(id) {
      /* eslint-disable */
      this.$router.push({ name: 'alarmDetail', params: { id: id } })
    },
  },
  watch:{
    keyword(val,old){
      if(val){
        this.getAlarmList()
      }
    },
    alarmStatus(val){
      this.pageNum=1;
      this.getAlarmList()
    },
    alarmRange(val){
      this.pageNum=1;
      this.getAlarmList()
    }
  }
}
</script>
<style lang="scss" scoped>
 .alarm-list {
    padding-top: 82px;
    background: $bgGrayColor;
    .list-item {
      width: 100%;
      height: 80px;
      background-color: #fff;
      margin: 10px 0px;
      padding: 10px;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .alarm-info {
        width: 100%;
        .alarm-title {
          color: #333333;
          font-weight: 600;
        }
        .alarm-status {
          margin: 5px 0px;
          /deep/ .van-button--mini {
            height: 18px;
            vertical-align: middle;
          }
        }
        .alarm-location {
          .location {
            color: #555555;
            i {
              font-size: 10px;
              color: #b6bdd2;
            }
          }
          .ignore {
            color: #0f8cff;
            margin-right: 24px;
          }
          .turn-order {
            padding: 3px 10px;
            background-color: #006eff;
            border-radius: 4px;
            color: #fff;
          }
        }
      }
    }
  }
   .ignore-pop{
      width:270px;
      height:115px;
      border-radius:12px;
      background:$bgLightColor;
      .title{
        color:#030303;
        font-size:16px;
        text-align:center;
        height:70px;
        line-height:70px;
      }
      .operate-btn{
        height:43px;
        width:100%;
        font-size:16px;
        color:#007AFF;
        // border-top:1px solid #cecece;
        display:flex;
        justify-content:space-between;
        align-items:center;
        span{
          height:42px;
          flex:1;
          display:flex;
          justify-content:center;
          align-items:center;
          border-top:1px solid #cecece;
          &:first-child{
            border-right:1px solid #cecece;
          }
        }
      }
  }
</style>
