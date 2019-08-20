<template>
  <div class="wrapper">
    <nav-bar title="监控视频"></nav-bar>
    <div class="content">
      <div class="video-stream-block">
        <div id="video"></div>
      </div>
      <div class="video-list">
        <ul>
          <li
            class="video-item"
            :class="{'current':ind === current}"
            v-for="(item,ind) in videoMonitorList"
            @click="changeItem(ind, item)"
            :key="ind"
          >
            {{item.name}}
            <i v-if="ind === current" class="icon"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import NavBar from '@/components/common/NavBar';
import { videoMonitorArray, videoMonitorUrl } from '@/services/monitoring'
export default {
  components: { NavBar },
  data() {
    return {
      current: 0,
      videoMonitorList: [],
      videoUrl: '',
      videoObject: {
        container: '#video', // “#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player', // 该属性必需设置，值等于下面的new chplayer()的对象
        autoplay: true, // 自动播放
        allowFullScreen: false,
        volume: 0,
        live: true,
        video: '' // 视频地址(必填)
      }
    }
  },
  created() {
    this.getMonitorList();
  },
  mounted() {
    this.$nextTick(_ => {
      this.initVideo();
    })
  },
  methods: {
    changeItem(i, item) {
      this.current = i;
      this.getUrl(item.number);
    },
    getMonitorList() {
      videoMonitorArray({ shopNumber: this.$store.getters.shopNumber, type: 2 }).then((res) => {
        if (res.code === 200) {
          this.videoMonitorList = res.data.array;
          this.getUrl(this.videoMonitorList[0].number);
        }
      })
    },
    getUrl(number) {
      videoMonitorUrl({ shopNumber: this.$store.getters.shopNumber, number: number, systemType: 2 }).then(res => {
        this.videoUrl = res.data.videoUrl;
        this.initVideo(this.videoUrl);
      })
    },
    initVideo(video) {
      this.videoObject.video = 'http://192.168.1.83:20001/hls/test1.m3u8';
      // this.videoObject.video = video;
      // eslint-disable-next-line
      const player = new ckplayer(this.videoObject);
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  .content {
    background-color: #fff;
  }
  .video-stream-block {
    overflow: hidden;
  }
  .video-list {
    width: 100%;
    overflow: auto;
    ul {
      display: inline;
      white-space: nowrap;
      padding: 20px 15px;
      li {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        height: 50px;
        margin: 20px 8px 20px 0;
        line-height: 50px;
        text-align: center;
        color: #333333;
        font-size: 15px;
        border-radius: 4px;
        border: 1px solid #f2f2f2;
        background-color: #f7f9fb;
        &.current {
          color: #006eff;
          border-color: #006eff;
        }
        .icon {
          position: absolute;
          width: 0px;
          height: 0px;
          left: 8px;
          bottom: 5px;
          border-left: 5px solid #006eff;
          border-top: 4px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 4px solid transparent;
        }
      }
    }
  }
}
</style>
