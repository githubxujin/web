<template>
  <div class="wrapper">
    <nav-bar title="通讯检测"></nav-bar>
    <Location>
      <slot>
        <span class="comm-title" :class="{'failStatus': !commStatus}">
          {{commStatus ? '正常': '掉线'}}
          <i
            class="iconfont"
            :class="commStatus? 'iconiconzhengchang' : 'iconicondiaoxian1'"
          ></i>
        </span>
      </slot>
    </Location>
    <div class="content">
      <div class="comm-swipe">
        <!-- <van-swipe @change="onChange" :initial-swipe="initial">
          <van-swipe-item v-for="(item,ind) in items" :key="ind">
            <div class="comm_item">
              <img :src="require('@/assets/imgs/monitoring/comm-collector.png')" />
            </div>
          </van-swipe-item>
        </van-swipe>-->
        <ul>
          <li
            @click="changeComm(ind)"
            v-for="(item,ind) in items"
            :key="ind"
            :class="{'current': commIndex === ind}"
          >
            <img :src="require('@/assets/imgs/monitoring/comm-collector.png')" />
            <div
              class="comm-frame"
              :class="{'comm-fail' : item.collectorStatus === 1}"
              v-show="commIndex === ind"
            >
              <p class="tip-role">
                <img
                  :src="require(`@/assets/imgs/monitoring/${item.collectorStatus === 0 ? 'agree' : 'disagree'}.png`)"
                  alt
                />
                <!-- <i
                  class="iconfont"
                  :class="item.collectorStatus === 0? 'iconiconzhengchang' : 'iconicondiaoxian1'"
                ></i>-->
              </p>
            </div>
          </li>
        </ul>
      </div>
      <template v-if="items[commIndex].coms.length">
        <div class="comm-subbar">
          <ul>
            <li
              @click="changeSub(ind)"
              v-for="(item,ind) in items[commIndex].coms"
              :class="{'active': ind === subIndex}"
              :key="ind"
            >{{item.comName}}</li>
          </ul>
        </div>
        <div class="comm-detail" v-if="items[commIndex].coms.length > 0">
          <div
            class="item"
            :class="{'fail': item.status === 1}"
            c
            v-for="(item,ind) in items[commIndex].coms[subIndex].meters"
            :key="ind"
          >
            <section>
              {{item.meterName}}
              <i
                class="iconfont"
                :class="item.status === 0 ? 'iconiconzhengchang': 'iconiconyichang'"
              ></i>
            </section>
            <div class="comm-msg">
              <p class="rate">在线率：{{item.onlineRate}}%</p>
              <p class="comm-dev">{{item.meterName}}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="text-align: center;line-height: 40px; font-size: 16px;">暂无数据</div>
      </template>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import Location from '@/components/common/Location.vue';
import WebSocketMixin from './mixin';
export default {
  components: { NavBar, Location },
  data() {
    return {
      initial: 0,
      items: [{ 'collectorStatus': 0, 'collectorOnlineRate': '0', 'collectorId': 55, 'coms': [], 'collectorName': 'sh-test采集器' }, { 'collectorStatus': 0, 'collectorOnlineRate': '0', 'collectorId': 55, 'coms': [], 'collectorName': 'sh-test采集器' }],
      commIndex: 0,
      subIndex: 0,
      commStatus: true
    }
  },
  mixins: [WebSocketMixin],
  created() { },
  mounted() { },
  methods: {
    init() {

    },
    changeComm(i) {
      this.commIndex = i;
      this.subIndex = 0;
    },
    changeSub(i) {
      this.subIndex = i;
    },
    onChange(i) {
      console.log(i)
    },
    refreshData(data) {
      this.items = data.data;
      this.items[1].collectorStatus = 1;
      console.log('数据', data);
      // 标题栏状态
      this.commStatus = this.items.every(item => item.collectorStatus === 0);
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin ul-horizontal {
  display: inline;
  white-space: nowrap;
  padding: 0 15px;
}
$greenColor: #05cb5d;
$redColor: #ff2323;
.wrapper {
  width: 100vw;
  height: 100%;
  /deep/ .comm-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $greenColor;
    i {
      font-size: 20px;
      margin: 0 4px;
    }
    &.failStatus {
      color: $redColor;
    }
  }
  .content {
    height: calc(100% - 97px);
    margin-top: 11px;
    overflow: auto;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;

    .comm-swipe {
      width: 100%;
      overflow: auto;
      margin-top: 25px;
      height: 93px;
      ul {
        @include ul-horizontal;
        li {
          position: relative;
          box-sizing: border-box;
          display: inline-block;
          width: 100px;
          height: 60px;
          line-height: 60px;
          margin-right: 10px;
          text-align: center;
          background: #fff;
          border: 1px dashed #999;
          border-radius: 2px;
          animation: all 0.2s linear;
          &.current {
            height: 66px;
            border: none;
            img {
              top: 3px;
            }
          }
          .comm-frame {
            box-sizing: border-box;
            position: absolute;
            top: -2px;
            left: -2px;
            width: 102px;
            height: 68px;
            border: 2px solid $greenColor;
            border-top: 3px solid $greenColor;
            border-radius: 4px;
            overflow: hidden;
            p {
              position: absolute;
              right: -4px;
              bottom: -14px;
              width: 20px;
              height: 40px;
              line-height: 40px;
              transform: rotateZ(45deg);
              background: $greenColor;
              img {
                position: relative;
                top: 0px;
                left: -2px;
                width: 15px;
                height: 15px;
                display: inline-block;
                transform: rotateZ(-45deg);
                color: $greenColor;
              }
            }
            &.comm-fail {
              border-color: $redColor;
              p {
                background: $redColor;
              }
            }
          }
          img {
            position: relative;
            display: inline-block;
            width: 94px;
            height: 39px;
            vertical-align: middle;
            animation: all 0.2s linear;
          }
        }
      }
      .comm_item {
      }
    }
    .comm-subbar {
      width: 100%;
      overflow: auto;
      ul {
        @include ul-horizontal;
        li {
          display: inline-block;
          width: 64px;
          height: 32px;
          line-height: 32px;
          border-radius: 32px;
          text-align: center;
          background-color: #ffffff;
          &.active {
            font-weight: 600;
            color: #0f8cff;
            background-color: #d0e8ff;
          }
        }
      }
    }
    .comm-detail {
      margin-top: 11px;
      padding-left: 10px;
      color: #fff;
      .item {
        box-sizing: border-box;
        display: inline-block;
        width: 108px;
        height: 95px;
        padding: 8px;
        margin: 5px;
        background: linear-gradient(
          137deg,
          rgba(110, 219, 158, 1) 0%,
          rgba(11, 198, 94, 1) 100%
        );
        border-radius: 4px;
        &.fail {
          background: linear-gradient(
            137deg,
            rgba(234, 134, 119, 1) 0%,
            rgba(252, 84, 84, 1) 100%
          );
        }
        section {
          display: inline-block;
          font-size: 12px;
          position: relative;
          max-width: 72px;
          height: 34px;
          i {
            position: absolute;
            right: -20px;
            top: -4px;
          }
        }
        .comm-msg {
          p {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
