<template>
  <div class="ele-monitoring">
    <nav-bar title="电梯监控" :num="alarmNum" >
    </nav-bar>
    <Location></Location>
    <div class="elevator-container clear">
      <div
        class="elevator-info fl box-size"
        v-for="(item,ind) in eleInfo"
        :key="ind"
        @click="toDetail(item)"
      >
        <div class="ele-header" >
          <div class="ele-running-status">
            <div class="ele-background" :class="{warning:item.elevatorStatus==1,graying:!item.anyData}"></div>
          </div>
          <div class="ele-name-run box-size">
            <span class="ele-name white-space">{{item.name}}</span>
          <span
            class="ele-status fr center"
            :class="{warning:item.elevatorStatus==1,graying:!item.anyData}"
            v-html="item.elevatorStatus==1?'故障':(item.anyData?'正常运行':'无数据')"
          ></span>
          </div>
        </div>
        <div class="ele-body box-size">
          <div class="runningStatus">
            <i
              class="iconfont iconshexiangtou camera"
              :class="{warning:item.cameraStatus==1, graying:!item.anyData}"
            ></i>
            <div class="floorAndRunning">
              <i class="iconfont iconiconxiangshangweixuanzhong up" v-show="item.runningStatus!=1"></i>
              <svg class="icon" aria-hidden="true"  v-show="item.runningStatus==1">
                <use xlink:href="#iconiconxiangshangxuanzhong"/>
              </svg>
              <span v-if="item.floor">{{item.floor}}</span>
              <span v-else style="color:#B2B2B2">- -</span>
              <i class="iconfont iconiconxiangxiaweixuanzhong down" v-show="item.runningStatus!=2"></i>
              <svg class="icon" aria-hidden="true" v-show="item.runningStatus==2">
                <use xlink:href="#iconiconxiangxiaxuanzhong"/>
              </svg>
            </div>
          </div>
          <div class="ele-image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { sketchMap } from '@/services/monitoring'
import { initWebSocket } from '@/utils/websocket.js'
import navBar from '@/components/common/NavBar.vue'
import Location from '@/components/common/Location';
export default {
  components: { navBar, Location },
  data() {
    return {
      alarmNum: 3,
      eleInfo: [],
      shopNumber: '',
      style: {
        height: '38px',
        lineHeight: '38px'
      },
      initWebSocketParam: {
        shopNumber: ''
      },
      websocketInstance: null
    }
  },
  created() {
    this.shopNumber = this.$store.getters.getUserInfo.shopNumber;
    this.initWebSocketParam.shopNumber = this.shopNumber;
    this.websocketInstance = initWebSocket(this.initWebSocketParam, this.getComponentData.bind(this),
      'ws://192.168.1.152/ws/safeManage/elevator/websocket')
  },
  mounted() {
    this.getSketchMap()
  },
  distoryed() {
    this.websocketInstance.close()
  },
  methods: {
    getSketchMap() {
      sketchMap(this.shopNumber).then(res => {
        if (res.code == 200) {
          var length = res.data.elevatorDetail.length;
          this.eleInfo = length > 0 ? res.data.elevatorDetail : []
          this.alarmNum = res.data.falutElevatorNum
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getComponentData(res) {
      if (res.code == 200) {
        this.eleInfo = res.data.elevatorDetail;
        this.alarmNum = res.data.falutElevatorNum
      }
    },
    // 去详情页
    toDetail(item) {
      if (item.anyData) {
        // eslint-disable-next-line
        this.$router.push({ name: 'elevatorDetail', params: { number: item.number } })
      } else {
        this.$toast('电梯暂无数据')
        return false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.ele-monitoring {
  width: 100%;
  height: 100%;
  font-size:14px;
  .monitoring-header {
    background-color: #fff;
    margin-bottom: 5px;
  }
  .elevator-container {
    width: 100%;
    padding: 20px 15px 0px;
    background-color:$bgGrayColor;
    box-sizing: border-box;
    .elevator-info {
      width: 48.8%;
      height:180px;
      margin-bottom: 10px;
      margin-right: 8px;
      background-color:$bgLightColor;
      &:nth-child(2n) {
        margin-right: 0px;
      }
      .ele-header {
        width: 100%;
        color:$titleColor;
        .ele-running-status{
          position:relative;
          width:100%;
          height:8px;
          background: repeating-linear-gradient( 135deg, #fff, #fff 10px, #000 10px, #000 20px );
          border-radius:4px 4px 0px 0px;
          background-color:#8BDAA5;
          .ele-background{
            position:absolute;
            top:0px;
            bottom:0px;
            right:0px;
            left:0px;
            border-radius:4px 4px 0px 0px;
            background-color:rgba(139, 218, 165, 0.9);
            &.warning {
              background-color: rgba(250, 152, 152, 0.9);
            }
            &.graying {
              background-color: rgba(218, 218, 218, 0.9);
            }
          }
        }
        .ele-name-run{
          width:100%;
          height:36px;
          line-height:36px;
          padding:0px 10px;
          border-bottom:1px solid $bgGrayColor;
          .ele-name{
            display:inline-block;
            width:50%;

          }
          .ele-status{
            display:inline-block;
            width:54px;
            height:24px;
            line-height:24px;
            font-size:10px;
            color:$bgLightColor;
            background:linear-gradient(to bottom, #47E47A,#26C95C,#3FDA87);
            &.warning {
              background: linear-gradient(to bottom, #FE8877,#FC5353,#FF8F7C);
            }
            &.graying {
              background:#E1E1E1;
            }
          }
        }
      }
      .ele-body {
        width: 100%;
        height: calc(100% - 49px);
        padding: 0px 15px 0px 10px;
        .runningStatus {
          display: inline-block;
          width: 24px;
          height: 100%;
          margin-right:20px;
          vertical-align: middle;
          .camera {
            font-size: 18px;
            margin-left: 3px;
            color: #1CBA50;
            &.warning {
              color: #FD605C;
            }
            &.graying {
              color: #ccc;
            }
          }
          .floorAndRunning {
            width: 100%;
            height: 80px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            i {
              display:inline-block;
              width:24px;
              height:34px;
              font-size:24px;
              color:#B2B2B2;
            }
            span {
              display:block;
              height:23px;
              text-align:center;
              color: #006EFF;
            }
          }
        }
        .ele-image {
          display: inline-block;
          width: 92px;
          height: 86px;
          vertical-align: middle;
          @include bg-image('../../../assets/imgs/monitoring/open-person');
          background-size:100% 100%;
          &.no-person{
            @include bg-image('../../../assets/imgs/monitoring/open-noPerson');
            background-size:100% 100%;
          }
        }
      }
    }
  }
}
</style>

