<template>
  <div class="order-detail">
    <van-nav-bar title="工单详情" left-arrow @click-left="onClickBack" class="nav-bar" />
    <div class="order-contain">
      <div class="order-info">
        <p class="curShop">{{title}}</p>
        <p class="number">工单号:{{data.number}}</p>
        <div>
          <span class="normal-btn">通常</span>
          <span @click="toPath('record')">
            <span class="record">跟踪记录</span>
            <i class="iconfont iconiconfontyoujiantou"></i>
          </span>
        </div>
      </div>
      <div class="repair-problem">
        <p v-html="data.type==1||data.type==2?'报修工单':'巡检工单'"></p>
        <div v-if="data.type==1">
          <p>商户：{{data.repairMan}}</p>
          <p>位置：{{data.position}}</p>
        </div>
        <div v-if="data.type==2">
          <p>故障设备：{{data.repairMan}}</p>
          <p>故障位置：{{data.position}}</p>
        </div>
        <div v-if="data.type==3">
          <p>巡检名称：{{data.repairMan}}</p>
          <p>巡检周期：{{data.checkCycle}}</p>
          <p>执行时间：{{data.executionTime}}</p>
        </div>
      </div>
      <div class="report-content">
        <p v-html="data.type==1||data.type==2?'报修内容':'设备清单'"></p>
        <div>
          <p>{{data.problem}}</p>
          <div>
            <i class="iconfont iconweibiaoti-"></i>
          </div>
        </div>
      </div>
      <div class="report-picture">
        <p v-html="data.type==1||data.type==2?'报修图片':'设备图片'"></p>
        <div class="show-image-item" v-for="(item,index) in 2" :key="index">
          <img src="../../../public/static/img/test.jpg" />
        </div>
      </div>
      <div class="repair-video" v-show="data.type==1||data.type==2">
        <p>报修视频</p>
        <!-- <div>
          <video id="myVideo" class="video-js" poster="//vjs.zencdn.net/v/oceans.png">
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          </video>
        </div>-->
      </div>
      <div class="repair-men-tel" v-show="data.type==1||data.type==2">
        <p>
          <span>报修人：{{data.linkman}}</span>
          <span>联系方式：{{data.telephone}}</span>
        </p>
      </div>
      <div class="process-mode" v-if="roleType==2">
        <div v-show="orderStatus=='pending'">
          <van-button
            type="default"
            class="start-process"
            v-show="path!='/workersmanage'"
            @click="startHandler"
          >开始处理</van-button>
          <van-button
            type="info"
            class="entry-order"
            v-show="(data.type==1||data.type==2)&&path!='/workersmanage'"
          >挂 单</van-button>
        </div>
        <van-button
          type="primary"
          class="finish-order"
          v-show="orderStatus=='signIn'"
          @click="toPath('finish')"
        >完 工</van-button>
        <van-button
          type="default"
          class="start-process"
          v-show="path=='/workersmanage'"
          @click="acceptOrder"
        >接 单</van-button>
      </div>
      <div class="process-mode" v-if="roleType==1">
        <van-button type="default" class="start-process" v-show="path!='/workersmanage'">审核通过</van-button>
        <van-button type="info" class="entry-order" v-show="path!='/workersmanage'">驳 回</van-button>
        <van-button
          type="default"
          class="start-process"
          v-show="path=='/WorkersManage'&&roleType==1"
        >派 单</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { Dialog } from 'vant';
export default {
  data() {
    return {
      title: '深圳民治天虹商城',
      path: '',
      orderStatus: 'pending', // 工单状态
      data: { type: 1,
        linkman: '小米',
        telephone: '13873021459',
        number: 'W4403Z0906039942',
        repairMan: '数据采集器#1',
        position: '民治天虹一楼楼层配电间',
        problem: '采集器掉线',
        checkCycle: '3个月',
        executionTime: '19.6.1-19.6.15',
        time: '2019-05-31 12:46' },
      imgList: [
        { content: '../../../public/static/img/test.jpg' },
        { content: '../../../public/static/img/test.jpg' }
      ]
    }
  },
  mounted() {
    this.path = this.$store.getters.getRouteFrom;
  },
  computed: {
    roleType: function() {
      return this.$store.getters.getUserInfo.roleType;
    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1)
    },
    // 跟踪记录
    toPath(name) {
      if (name == 'record') {
        this.$router.push({ path: '/trackRecord' })
      } else {
        this.$router.push({ path: '/overOrder' })
      }
    },
    // 开始处理或签到
    startHandler() {
      this.$toast('已签到，开始处理工单');
      this.orderStatus = 'signIn'
    },
    onRead(file) {
      this.fileList.push(file);
    },
    // 删除图片
    delImg(index) {
      this.fileList.splice(index, 1)
    },
    initVideo() {
      // // 初始化视频方法
      // const myPlayer = videojs('myVideo', {
      //   // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
      //   controls: true,
      //   // 自动播放属性,muted:静音播放
      //   autoplay: 'muted'
      // });
    },
    // 接单弹出框
    acceptOrder() {
      Dialog.confirm({
        message: '确定接单吗？'
      }).then(() => {
        this.$router.push({ path: '/assignment' })
      }).catch(() => {
        // on cancel
        console.log('取消')
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.order-detail {
  .nav-bar {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  /deep/ .van-nav-bar__text {
    // font-size: 16px;
    color: #666;
  }
  .order-contain {
    padding-top: 46px;
  }
  .order-info,
  .repair-problem,
  .report-content,
  .report-picture,
  .repair-video,
  .repair-men-tel {
    margin: 3px 0px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 0px 5px 20px;
    background: #fff;
    .curShop {
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 16px;
    }
    .number {
      line-height: 24px;
    }
    .normal-btn {
      display: inline-block;
      width: 50px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .record {
      margin: 0px 5px 0px 10px;
      color: #169bd5;
      vertical-align: middle;
    }
    i {
      font-size: 18px;
      vertical-align: middle;
    }
  }
  .report-content {
    .hold-down-talk {
      padding: 5px 10px;
      margin-left: 10px;
      @include border-1px-all(#000, 10px, solid);
    }
  }
  .report-picture {
    .show-image-item {
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-right: 8px;
    }
  }
  .process-mode {
    width: 100%;
    height: 50px;
    margin-top: 15px;
    position: relative;
    background-color: #f5f5f5;
    .start-process {
      position: absolute; /*定位后转化为块元素，无需考虑是否是块元素*/
      left: 50%;
      transform: translateX(-50%);
    }
    .finish-order {
      position: absolute; /*定位后转化为块元素，无需考虑是否是块元素*/
      left: 50%;
      transform: translateX(-50%);
    }
    .entry-order {
      position: absolute;
      right: 15%;
      bottom: 8px;
    }
    /deep/.van-button--default {
      width: 120px;
    }
    /deep/.van-button--primary {
      width: 120px;
    }
    /deep/.van-button--info {
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>

