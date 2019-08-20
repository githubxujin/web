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
      <ul class="comm-content">
        <li class="comm-switch">
          <span class="comm-name">
            {{"交换机"}}
            <img :src="require('@/assets/imgs/monitoring/comm-all.png')" />
          </span>
          <div class="img-box">
            <img :src="require('@/assets/imgs/monitoring/comm-switch.png')" alt />
          </div>
        </li>
        <li
          class="comm-collector"
          :class="{'comm-outline': item.collectorStatus === 1}"
          @click="toDetail"
          v-for="(item, ind) in items"
          :key="ind"
        >
          <span class="comm-name">
            {{item.collectorName}}
            <!-- <i
              class="iconfont"
              :class="item.collectorStatus === 0 ? 'iconiconzhengchang': 'iconiconyichang'"
            ></i>-->
            <img
              :src="require(`@/assets/imgs/monitoring/${item.collectorStatus === 0 ? 'agree' : 'disagree'}.png`)"
            />
          </span>
          <div class="img-box">
            <img :src="require('@/assets/imgs/monitoring/comm-collector.png')" alt />
          </div>
          <i class="split"></i>
          <span class="rate">
            {{item.collectorOnlineRate + '%'}}
            <section v-if="ind === 0">在线率</section>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import NavBar from '@/components/common/NavBar.vue';
import Location from '@/components/common/Location.vue';
import WebSocketMixin from './mixin';
export default {
  components: { NavBar, Location },
  data() {
    return {
      commStatus: true,
      title: '通讯检测',
      items: [{ 'collectorStatus': 0, 'collectorOnlineRate': '0', 'collectorId': 55, 'coms': [], 'collectorName': 'sh-test采集器' }]
    }
  },
  mixins: [WebSocketMixin],
  created() {
    // this.$store.dispatch('monitoring/getCommunication', this.shopNumber)
  },
  mounted() { },
  watch: {
  },
  computed: {
    shopNumber() {
      return this.$store.getters.shopNumber;
    }
    // commStatus() {
    //   console.log(this.items);
    //   this.items.every(item => item.collectorStatus === 0);
    //   console.log("comm状态", this.items.every(item => item.collectorStatus === 0));
    //   return false;
    // }
  },
  methods: {
    init() {
      console.log('初始化', '')
    },
    toDetail() {
      this.$router.push('/communicationDetail')
    },
    refreshData(data) {
      console.log('数据', data)
      if (data.code === 200) {
        this.items = data.data;
        this.items[1].collectorStatus = 1;
        // 标题栏状态
        this.commStatus = this.items.every(item => item.collectorStatus === 0);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$color: #333333;
$greenColor: #05cb5d;
$redColor: #ff2323;
.wrapper {
  width: 100vw;
  height: 100%;
  .content {
    height: calc(100% - 97px);
    margin-top: 11px;
    overflow: auto;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
  }
  /deep/ .comm-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #05cb5d;
    i {
      font-size: 20px;
      margin: 0 4px;
    }
    &.failStatus {
      color: #ff2323;
    }
  }
}
.comm-content {
  padding-top: 40px;
  padding-left: 47px;
  li {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 17px;

    .img-box {
      display: inline-block;
      width: 100px;
      height: 60px;
      border: 1px dashed #ddd;
    }
    .comm-name {
      position: relative;
      display: inline-block;
      top: -10px;
      padding: 0 0 4px 15px;
      font-size: 12px;
      width: 107px;
      border-bottom: 2px solid $greenColor;
    }
    .rate {
      position: relative;
      font-size: 16px;
      font-weight: bold;
      section {
        position: absolute;
        left: 0;
        top: -30px;
        font-size: 12px;
        width: 50px;
        font-weight: normal;
      }
    }
    .split {
      width: 12px;
      height: 1px;
      background-color: #979797;
      margin: 0 7px;
    }
    &.comm-switch {
      .img-box {
        width: 120px;
        height: 70px;
      }
      .comm-name {
        top: -5px;
        border-bottom: 2px solid $color;
        img {
          width: 10px;
          height: 10px;
          position: absolute;
          left: -4px;
          bottom: -5px;
          z-index: 5;
        }
      }
    }
    &.comm-collector {
      .comm-name {
        img {
          width: 12px;
          height: 12px;
          position: absolute;
          left: -5px;
          bottom: -6px;
          z-index: 5;
        }
        &:after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 78px;
          width: 2px;
          background-color: $color;
        }
      }
      &.comm-outline {
        .img-box {
          border-color: $redColor;
        }
        .comm-name {
          border-color: $redColor;
        }
      }
    }
  }
}
</style>
