<template>
  <div>
    <div class="monitoring-header">
      <div class="shop-info box-size">
        <span class="shop-name">{{currentShop}}</span>
        <div>
          <i class="iconfont iconiconxiaoxi"></i>
          <i class="iconfont iconicontianjia" @click="goToRepair"></i>
        </div>
      </div>
    </div>
    <div class="inspect-management">
      <div class="inspect-model">
        <ul>
          <li v-for="(item,index) in inspectModel" :key="index" @click="toPath(item)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="'#'+item.icon" />
            </svg>
            <span class="title">{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="monitoring-subsystem">
      <van-swipe :touchable="true" indicator-color="#3795f9">
        <van-swipe-item v-for="(item,key) in swipeArr" :key="key">
          <ul class="clear">
            <li
              v-for="(sub, index) in item"
              :key="index"
              @click="sub.path && $router.push(sub.path)"
            >
              <!-- <img :src="sub.imgUrl" /> -->
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="'#'+sub.icon" />
              </svg>
              <span>{{sub.title}}</span>
              <van-tag
                round
                color="#f76a5a"
                v-show="sub.num"
                class="tag"
                text-color="#fff"
              >{{sub.num}}</van-tag>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentShop: this.$store.getters.getUserInfo.shopName || '深圳民治天虹商场',
      inspectModel: [
        { title: '运行报告', icon: 'iconiconyunhangbaogao' },
        { title: '报警管理', icon: 'iconiconbaojingguanli', path: '/alarmManagement' },
        { title: '通讯监测', icon: 'iconicontongxunjiance', path: '/communication' }
      ],
      systemTypeList: [
        {
          title: '供配电',
          icon: 'iconicongongpeidian',
          path: '',
          num: 0
        },
        {
          title: '暖通空调',
          icon: 'iconiconnuantongkongtiao',
          path: '',
          num: 15
        },
        {
          title: '给排水',
          icon: 'iconicongeipaishui',
          path: '/drainage-monitoring',
          num: 0
        },
        {
          title: '电梯',
          icon: 'iconicondianti1',
          path: '/elevatorMonitoring',
          num: 0
        },
        {
          title: '能耗',
          icon: 'iconiconnengyuan',
          path: '/energy-monitoring',
          num: 0
        }
      ],
      swipeArr: {}
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      var len = Math.ceil(this.systemTypeList.length / 4);
      for (let index = 0; index < len; index++) {
        this.swipeArr[index] = [];
      }
      this.systemTypeList.forEach((item, ind) => {
        if (ind < 4) {
          this.swipeArr[0].push(item)
        } else {
          this.swipeArr[1].push(item)
        }
      })
      console.log(this.swipeArr)
    },
    toPath(item) {
      this.$router.push({ path: item.path })
    },
    goToRepair() {
      this.$router.push({ path: '/repairForm' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.monitoring-header {
  width: 375px;
  height: 180px;
  @include bg-image("../../assets/imgs/monitoring/banner");
  background-size: 100% 100%;
  .shop-info {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0px 15px 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shop-name {
      color: #ffffff;
      font-size: 14px;
      font-weight: 600;
    }
    i {
      color: #ffffff;
      font-size: 18px;
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}
.inspect-management {
  width: 100%;
  height: 100%;
  background-color: #fff;
  margin-bottom: 5px;
  p {
    height: 30px;
    line-height: 30px;
    margin-left: 10px;
  }
  .inspect-model {
    width: 100%;
    ul {
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
          display: inline-block;
          font-size: 68px;
          text-align: center;
          margin-bottom: 10px;
        }
        .title {
          font-size: 15px;
          color: #439cfa;
        }
      }
    }
  }
}
.monitoring-subsystem {
  width: 100%;
  height: 130px;
  background-color: #fff;
  ul {
    width: 100%;
    height: 130px;
    li {
      position: relative;
      float: left;
      width: 25%;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 5px;
      .icon {
        margin-bottom: 5px;
      }
      span {
        color: #9c9c9c;
      }
      .tag {
        position: absolute;
        top: 21px;
        right: 8px;
      }
    }
  }
  /deep/ .van-swipe__indicator {
    background-color: #dfdfdf;
    opacity: 1;
  }
  /deep/ .van-swipe__indicator--active {
    width: 10px;
    border-radius: 3px;
  }
}
</style>

