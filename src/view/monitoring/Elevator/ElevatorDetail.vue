<template>
  <div>
    <nav-bar title="电梯详情"></nav-bar>
    <div class="ele-detail">
      <div class="video">
        <div id="video" v-show="videoUrl"></div>
        <div v-show="!videoUrl" class="camera-error">
          <i class="iconfont iconshibai1"></i>
          <span>摄像头故障，暂无视频</span>
        </div>
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
          <span class="item">摄像头状态</span>
          <span :class="{warning:eleDetail.cameraStatus!='正常'}">{{eleDetail.cameraStatus}}</span>
        </div>
        <div class="detail-info">
          <span class="item">电梯报警</span>
          <span :class="{warning:eleDetail.elevatorAlarm}">{{eleDetail.elevatorAlarm}}</span>
        </div>
        <div class="detail-info">
          <span class="item">电梯井水浸</span>
          <span :class="{warning:eleDetail.elevatorAlarm}">{{eleDetail.elevatorAlarm}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getVideoUrl, getDetail } from '@/services/monitoring'
import navBar from '@/components/common/NavBar.vue'
export default {
  components: { navBar },
  data() {
    return {
      eleNumber: '',
      videoUrl: '1',
      shopNumber: this.$store.getters.getUserInfo.shopNumber,
      loading: false,
      videoObject: {
        container: '#video', // “#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', // 该属性必需设置，值等于下面的new chplayer()的对象
        autoplay: true, // 自动播放
        allowFullScreen: false,
        volume: 0,
        live: true,
        video: '' // 视频地址(必填)
      },
      eleDetail: {}
    }
  },
  mounted() {
    this.eleNumber = this.$route.params.number
    this.getEleVideoUrl()
    this.getDetail()
  },
  methods: {
    getEleVideoUrl() {
      this.loading = true;
      getVideoUrl({ shopNumber: this.shopNumber, number: this.eleNumber }).then(res => {
        this.loading = false;
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
    initVideo() {
      // ckPlayer
      this.videoObject.video = this.videoUrl;
      console.log('基本路劲', this.videoUrl)
      // this.videoObject.video = 'http://192.168.1.83:20001/hls/test1.m3u8';
      // eslint-disable-next-line
      const player = new ckplayer(this.videoObject);
    }
  }
}
</script>
<style lang="scss" scoped>
.ele-detail {
  height: 100%;
  color: $titleColor;
  font-size: 14px;
  .video {
    width: 100%;
    height: 210px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    #video {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
    .camera-error {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
}
.alarm-info,
.ele-info {
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
  .title,
  .info {
    font-size: 15px;
    height: 18px;
    line-height: 18px;
    margin: 5px 0px;
    font-weight: 600;
  }
  .detail-info {
    line-height: 24px;
    .item {
      display: inline-block;
      width: 80px;
      margin-right: 15px;
    }
    .warning {
      color: $errorColor;
    }
  }
  .warnning {
    line-height: 24px;
    color: $errorColor;
  }
}
.alarm-info {
  margin-bottom: 10px;
}
</style>

