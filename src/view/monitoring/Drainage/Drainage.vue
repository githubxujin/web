<template>
  <div class="water-drainage" v-if="drainageData">
    <div class="split"></div>
    <div class="water-wait-alarm">
      <section>
        待处理报警信息
        <i class="iconfont iconiconjingshi"></i>
      </section>
      <div class="water-alarm-list">
        <p
          v-if="drainageData.alarm.length"
          v-for="(item,ind) in drainageData.alarm"
          :key="ind"
        >{{item}}</p>
        <p v-if="!drainageData.alarm.length" class="empty">暂无报警数据</p>
      </div>
    </div>
    <div class="split"></div>
    <div class="water-drainage-list">
      <div class="water-drainage-item" v-for="(item,ind) in drainageData.detail" :key="ind">
        <section class="left">
          <i class="iconfont" :class="'iconiconshuixiang'"></i>
          <span>{{item.name}}</span>
        </section>
        <section class="right">
          <span>
            <i class="iconfont iconiconjingshi" :class="'error'"></i>
            {{item.fluidLevel || '暂无配置'}}
          </span>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import websocketMinxin from './mixin'
export default {
  data() {
    return {
      enum: {
        l: { icon: '' }
      },
      drainageData: null
    }
  },
  mixins: [websocketMinxin],
  methods: {
    refreshData(res) {
      this.drainageData = res.data.drainageSystem
    }
  }
}
</script>
<style lang="scss" scoped>
$redColor: #ff2323;
.water-drainage {
  background-color: #fff;
  .split {
    height: 10px;
    background-color: #f4f5f9;
  }
  .water-wait-alarm {
    padding: 8px 15px;
    box-sizing: border-box;
    .water-alarm-list {
      max-height: 80px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    section {
      font-size: 15px;
      color: #333333;
      i {
        margin-left: 6px;
        color: $redColor;
      }
    }
    p {
      color: $redColor;
      font-size: 14px;
      margin-top: 10px;
      &.empty {
        color: #333;
      }
    }
  }
  .water-drainage-list {
    .water-drainage-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      padding: 0 15px 0 20px;
      border-bottom: 1px solid #f4f5f9;
      &:last-of-type {
        border: none;
      }
      section {
        display: flex;
        align-items: center;
        &.left {
          font-size: 14px;
          color: #333;
          i {
            font-size: 28px;
            color: #006eff;
            margin-right: 5px;
          }
        }
        &.right {
          font-size: 12px;
          color: #333;
          span {
            margin-left: 26px;
            &:first-of-type {
              margin-left: 0;
            }
          }
          i {
            color: #05cb5d;
            &.error {
              color: #ff2323;
            }
          }
        }
      }
    }
  }
}
</style>
