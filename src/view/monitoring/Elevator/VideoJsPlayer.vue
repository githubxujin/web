<template>
  <div>
    <div class="monitoring-header clear">
      <div class="fl" @click="goBack">
        <i class="iconfont iconarrow-left-copy"></i>
        <span>电梯详情</span>
      </div>
    </div>
    <div class="ele-detail">
      <div class="video">
        <video
          id="my-player"
          class="video-js vjs-default-skin vjs-big-play-centered"
          poster="//vjs.zencdn.net/v/oceans.png"
          preload="auto"
          autoplay
          controls
          style="width: 100%;height: 100%;"
          ref="videoplayer"
          data-setup="{}"
        >
          <source :src="videoUrl" type="rtmp/flv" />
        </video>
      </div>
      <div class="alarm-info" v-show="eleDetail.pendingAlarmInformation">
        <div class="title">待处理报警信息</div>
        <div class="warnning">{{eleDetail.pendingAlarmInformation}}</div>
      </div>
      <div class="ele-info">
        <div class="info">电梯详情</div>
        <div class="detail-info">
          <span class="item">电梯名称</span>
          <span>{{eleDetail.name}}</span>
        </div>
        <div class="detail-info">
          <span class="item">运行转态</span>
          <span>{{eleDetail.runningStatus}}</span>
        </div>
        <div class="detail-info">
          <span class="item">所在楼层</span>
          <span>{{eleDetail.floor}}</span>
        </div>
        <div class="detail-info">
          <span class="item">上下行状态</span>
          <span>{{eleDetail.upAndDown}}</span>
        </div>
        <div class="detail-info">
          <span class="item">是否载人</span>
          <span>{{eleDetail.anyPassenger}}</span>
        </div>
        <div class="detail-info">
          <span class="item">轿门开关</span>
          <span>{{eleDetail.doorStatus}}</span>
        </div>
        <div class="detail-info">
          <span class="item">摄像头正常</span>
          <span>{{eleDetail.cameraStatus}}</span>
        </div>
        <div class="detail-info">
          <span class="item">电梯报警</span>
          <span>{{eleDetail.elevatorAlarm}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { getVideoUrl, getDetail } from '@/services/monitoring'

export default {
  data() {
    return {
      eleNumber: '',
      videoUrl: '',
      shopNumber: this.$store.getters.getUserInfo.shopNumber,
      eleDetail: {}
    }
  },
  mounted() {
    this.eleNumber = this.$route.params.number
    // this.getEleVideoUrl()
    this.initVideo()
    this.getDetail()
  },
  methods: {
    getEleVideoUrl() {
      getVideoUrl({ shopNumber: this.shopNumber, number: this.eleNumber }).then(res => {
        this.videoUrl = res.code == 200 ? res.data : ''
        if (this.videoUrl) {
          this.initVideo()
        }
      })
    },
    getDetail() {
      getDetail({ shopNumber: this.shopNumber, number: this.eleNumber }).then(res => {
        this.eleDetail = res.code == 200 ? res.data : {}
      })
    },
    goBack() {
      this.$router.go(-1)
    },
    initVideo() {
      var videoPlayer = videojs('my-player');
      videoPlayer.src({
        src: 'rtmp://192.168.1.40:1935/live/0010868182009536473',
        type: 'rtmp/flv'
      });
      videoPlayer.play()
    }
  }
}
</script>
<style lang="scss" scoped>
.ele-detail {
  height: 100%;
  margin: 5px;
  box-sizing: border-box;
  //   background-color: aquamarine;
  .video {
    width: 100%;
    height: 180px;
    margin-bottom: 4px;
    #video {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
  }
}
.alarm-info,
.ele-info {
  padding: 8px;
  box-sizing: border-box;
  background: #fff;
  .title,
  .info {
    border-left: 3px #ff0000 solid;
    padding-left: 5px;
    font-size: 14px;
    height: 18px;
    line-height: 18px;
    margin: 5px 0px;
  }
  .info {
    border-left: 3px #5eb1df solid;
  }
  .warnning,
  .detail-info {
    padding-left: 8px;
    line-height: 24px;
    .item {
      display: inline-block;
      width: 80px;
      margin-right: 15px;
    }
  }
}
.ele-info {
  margin-top: 6px;
}
</style>

