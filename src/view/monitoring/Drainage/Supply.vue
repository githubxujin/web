<template>
  <div class="water-supply" v-if="supplyData">
    <div class="split"></div>
    <div class="water-wait-alarm">
      <section>
        待处理报警信息
        <i class="iconfont iconiconjingshi"></i>
      </section>
      <div class="water-alarm-list">
        <p v-if="supplyData.alarm.length" v-for="(item,ind) in supplyData.alarm" :key="ind">{{item}}</p>
        <p v-if="!supplyData.alarm.length" class="empty">暂无数据</p>
      </div>
    </div>
    <div class="split"></div>
    <div class="water-supply-list">
      <div class="water-supply-item" v-for="(detail,ind) in supplyData.detail" :key="ind">
        <div v-for="(item,i) in detail.pumps" :key="i">
          <section class="left">
            <i class="iconfont" :class="'iconiconshenghuoshuibeng'"></i>
            <span>{{item.name}}</span>
          </section>
          <section class="right">
            <span>
              <i
                class="iconfont"
                :class="item.status==='0'?'iconiconzhengchang':item.status===1?'iconiconjingshi error':'iconiconyichang error'"
              ></i>
              {{item.status==='0'?'正常':item.status==='1'?'故障':item.status==='2'?'停止':'请配置参数'}}
            </span>
          </section>
        </div>
        <div>
          <section class="left">
            <i class="iconfont" :class="'iconiconshuixiang'"></i>
            <span>{{detail.name }}</span>
          </section>
          <section class="right">
            <span>
              <i class="iconfont iconiconjingshi" :class="'error'"></i>
              {{detail.fluidLevel}}
            </span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue';
import websocketMinxin from './mixin';
export default {
  data() {
    return {
      enum: {
        l: { icon: '' }
      },
      supplyData: null
    }
  },
  mixins: [websocketMinxin],
  methods: {
    refreshData(res) {
      this.supplyData = res.data.supplySystem
      console.log('刷新给排水数据', res)
    }
  }
}
</script>
<style lang="scss" scoped>
$redColor: #ff2323;
.water-supply {
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
  .water-supply-list {
    .water-supply-item {
      > div {
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
}
</style>

