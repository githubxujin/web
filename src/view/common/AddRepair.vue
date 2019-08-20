<template>
  <div class="order-detail">
    <van-nav-bar title="工单详情" left-arrow @click-left="onClickBack" />
    <div class="order-info">
      <span class="normal-btn">通常</span>
      <span class="normal-btn">紧急</span>
      <van-cell-group>
        <van-cell title="报修人" value="杨周" />
        <van-cell title="员工编号" value="1245855" />

        <van-field value label="故障设备" />

        <van-field value label="位置" />
      </van-cell-group>
    </div>
    <div class="repair-problem">
      <p>报修内容</p>
      <div>
        <van-cell-group>
          <van-field v-model="content" type="textarea" placeholder="请输入报修内容" rows="4" />
        </van-cell-group>
        <div>
          <i class="iconfont iconweibiaoti-"></i>
          <span class="normal-btn" @clik="startRecognize">按住说话</span>
        </div>
      </div>
    </div>
    <div class="report-content">
      <p>报修内容</p>
      <!--<van-button type="default" @click="picPopupShow=true">添加照片</van-button>-->

      <van-row gutter="5">
        <!-- 添加图片 -->
        <van-col span="6" v-for="(item, index) in imageList" :key="index">
          <div class="image_box" :style="{backgroundImage: 'url(' + item + ')'}">
            <div class="delPic iconfont icon-cuowu" @click="delPic(index)"></div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="image_box">
            <i class="icon iconfont icon_comment">&#xe62a;</i>
            <input
              class="file_input"
              accept="image/png, image/jpeg, image/jpg"
              @click="picPopupShow=true"
            />
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="pic_popup">
      <van-popup v-model="picPopupShow" position="bottom" :close-on-click-overlay="false">
        <div class="pic_popup_content">
          <div class="pic_popup_title">添加图片</div>
          <div class="pic_popup_select ub">
            <div class="photo_graph ub-f1 w1">
              <div class="icon">
                <div class="iconfont icon-paizhao" @click="captureImage()"></div>
              </div>
              <div class="_name">拍照</div>
            </div>
            <div class="photo_album ub-f1 w1">
              <div class="icon">
                <van-uploader :after-read="onRead">
                  <div class="iconfont icon-tupianshangchuan"></div>
                </van-uploader>
              </div>
              <div class="_name">相册</div>
            </div>
          </div>
          <div class="pic_popup_cancel" @click="cancel()">取消</div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import videojs from 'video.js'
import { imgcompress, timeTodate } from '@/utils/utils.js';

export default {
  data() {
    return {

      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' }
      ],

      content: '',
      picPopupShow: false,
      imgPopupShow: false,
      fileList: [],
      imageList: [],
      imdynamic: { picurl: [] },
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
    delPic(index) {
      this.imageList.splice(index, 1);
      this.imdynamic.picurl.splice(index, 1);
      console.log('test:' + JSON.stringify(this.imdynamic.picurl))
    },
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
      this.picPopupShow = false;
      if (file.file.size > 8000000) {
        this.$toast('上传图片不能超过8M');
        return;
      }
      const img = new Image();
      img.src = file.content;
      const that = this;
      if (that.imageList.length >= 9) {
        that.$toast('最多只能传9张图片');
        return;
      }
      this.Notify({
        message: '图片上传中，请耐心等待...',
        duration: 20000
      });
      img.onload = function() {
        const imgs = imgcompress(img);
        that.imageList.push(imgs.content);
        that.imdynamic.picurl.push({
          base64str: imgs.content,
          suffix: '.jpg',
          type: '2'
        });
        that.Notify.clear();
      };
      this.picPopupShow = false;
    },
    // 删除图片
    delImg(index) {
      this.imageList.splice(index, 1);
    },
    initVideo() {
      // 初始化视频方法
      const myPlayer = videojs('myVideo', {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        // 自动播放属性,muted:静音播放
        autoplay: 'muted'
      });
    },
    startRecognize() {
      try {
        document.addEventListener('plusready', () => {
          const that = this;
          var options = {};
          options.engine = 'iFly';
          window.plus.speech.startRecognize(options, function(s) {
            that.content += s;
          }, function(e) {
            alert('语音识别失败：' + e.message);
          });
        })
      } catch (e) { alert(e); }
    },
    captureImage() {
      const that = this;
      that.picPopupShow = false;
      that.Notify({
        message: '图片上传中，请耐心等待...',
        duration: 20000
      });
      try {
        var c = window.plus.camera.getCamera();
        c.captureImage(function(e) {
          window.plus.io.resolveLocalFileSystemURL(e, function(entry) {
            var s = entry.toLocalURL();
            const img = new Image();
            img.src = s;
            img.onload = function() {
              const data = {
                id: that.$userInfo.id,
                avatar: JSON.stringify([
                  {
                    base64str: imgcompress(img).content,
                    suffix: '.jpg',
                    type: '2'
                  }
                ])
              };
              that.$ajax.post(that.$url.editUserInfo,
                data
              ).then(res => {
                if (res.code == 200) {
                  that.user.avatar = res.data.userInfo.avatar;
                  console.log('100:' + that.user.avatar);
                } else if (res.code == 400) {
                  that.$toast('图片格式有误');
                }
                that.Notify.clear();
              })
            }
          }, function(e) {
            that.Notify.clear();
          });
        }, function(s) {
          console.log('error' + JSON.stringify(s));
        }, {
          filename: '_doc/head'
        })
      } catch (e) {
        this.Notify.clear();
        alert('请用手机打开');
      }
    },
    cancel() {
      this.picPopupShow = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.order-detail {
  /deep/ .van-nav-bar__text {
    // font-size: 16px;
    color: #666;
  }
  .order-info,
  .repair-problem,
  .report-content,
  .report-picture,
  .repair-video,
  .repair-men-tel {
    margin: 5px 0px;
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
    margin-top: 20px;
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

.icon .iconfont {
  font-size: 35px;
  width: 65px;
  height: 52px;
}

.icon .iconfont input {
  width: 100%;
  height: 100%;
}

.icon .icon-paizhao {
  font-size: 45px;
  color: #f998d6;
  position: relative;
  top: -5px;
}

.icon .icon-tupianshangchuan {
  color: #9f98f9;
}

.wap_content {
  background: #ffffff;
}

.info_list {
  margin-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 30px;
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  padding-right: 15px;
}

.list_middle {
  color: #8c9295;
}

.avator {
  height: 60px;
  line-height: 60px;
}

.avator .list_middle {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  overflow: hidden;
}

.list_right {
  margin-left: 10px;
}

input {
  text-align: right;
  color: #8c9295;
}

.qr_box {
  width: 315px;
  height: 350px;
  padding: 15px;
  background: #ffffff;
}

.profile_info {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
}

.profile_pic {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.qr_box .qr {
  width: 250px;
  height: 250px;
  margin: 30px auto;
}

.pic_popup_content {
  height: 215px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
}

.pic_popup_select {
  height: 125px;
}

.pic_popup_title {
  font-size: 18px;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #252525;
}

.pic_popup_select .icon {
  width: 65px;
  height: 52px;
  /*background: #F998D6;*/
  margin: 25px auto;
  margin-bottom: 10px;
}

.pic_popup_select ._name {
  font-size: 14px;
}

.pic_popup_cancel {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #252525;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
