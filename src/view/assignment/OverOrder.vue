<template>
  <div>
    <div class="header">
      <i class="iconfont iconarrow-left-copy left-arrow" @click="goBack"></i>
      填写维修完工内容
    </div>
    <div class="take-photo">
      <div class="photo">
        <span class="push-photo" @click="showAction">
          <i class="iconfont iconpaizhao"></i>
          <span>必填</span>
        </span>
      </div>

      <div class="posting-uploader-item" v-for="(item,nn) in imgList" :key="nn">
        <img :src="item.content" alt="图片" class="imgPreview" />
        <van-icon name="delete" @click="delImg(nn)" class="delte" />
      </div>
    </div>
    <div class="over-content">
      <textarea rows="3" placeholder="请填写完工后情况(必填)..." v-model="result"></textarea>
    </div>
    <!-- 故障类型 -->
    <!-- <div class="breakdown">
      <span class="mark">*</span>
      <span class="describe">故障类型</span>
      <input type="text" placeholder="请选择故障类型" readonly="readonly" v-model="breakType" />
      <van-icon name="arrow" />
    </div>-->
    <div class="bottom">
      <van-button type="primary" size="large" @click="uploadImage">提 交</van-button>
    </div>
    <div class="pic_popup">
      <van-popup v-model="showPopup" position="bottom" :style="{ height: '25%' }">
        <ul>
          <li @click="captureImage">拍照</li>
          <li @click="selectImage">相册选择</li>
          <li @click="closePop">取消</li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { imgcompress, timeTodate } from '@/utils/utils.js';
import { Dialog } from 'vant';
import { uploadByBase64, finishBill } from '@/services/common';
export default {
  data() {
    return {
      showPopup: false,
      curCount: 0, // 当前选中图片数量
      imgList: [],
      basePicurl: {
        picurl: []
      },
      billNumber: 'W001190704001',
      result: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 点击弹出选择图片或拍照
    showAction() {
      this.showPopup = true;
    },
    // 关闭弹窗
    closePop() {
      this.showPopup = false;
    },
    // 拍照
    captureImage() {
      const that = this;
      this.showPopup = false;
      if (that.imgList.length > 5) {
        that.$toast('最多只能选择' + 5 + '张图片');
        return false
      }
      try {
        var cmr = window.plus.camera.getCamera();
        cmr.captureImage(function(e) {
          window.plus.io.resolveLocalFileSystemURL(e, function(entry) {
            var imgUrl = entry.toLocalURL();
            console.log('源地址' + entry.toLocalURL())
            var img = new Image();
            img.src = imgUrl;
            console.log('img' + img.src)
            img.onload = function() {
              console.log('进入压缩')
              const imgs = imgcompress(img);
              that.imgList.push(imgs);
              var data = {
                base64str: imgs.content,
                suffix: '.jpg',
                type: 2
              }
              that.basePicurl.picurl.push(data)
            }
          })
          that.Notify.clear();
        }, function(e) {
          window.plus.nativeUI.toast('读取拍照文件错误' + e.message)
        }, {
          filename: '_doc/camera/'
        })
      } catch (e) {
        this.Notify.clear();
        alert('请用手机打开');
      }
    },
    // 相册选择图片
    selectImage() {
      const that = this;
      var max = 5 - that.imgList.length;
      this.showPopup = false;
      window.plus.gallery.pick(function(e) {
        let count = 0;
        count += e.files.length
        if (that.imgList.length + count > 5) {
          that.$toast('当前只能选择' + 5 + '张图片');
          return false
        }
        console.log('源地址:' + e.files)
        for (const i in e.files) {
          window.plus.io.resolveLocalFileSystemURL(e.files[i], function(entry) {
            var imgUrl = entry.toLocalURL();
            const img = new Image();
            img.src = imgUrl;
            img.onload = function() {
              const imgs = imgcompress(img);
              that.imgList.push(imgs);
              var data = {
                base64str: imgs.content,
                suffix: '.jpg',
                type: 2
              }
              that.basePicurl.picurl.push(data)
              console.log('图片总集合：' + JSON.stringify(that.basePicurl.picurl))
            }
          })
        }
      }, function(e) {
        window.plus.nativeUI.toast('读取相册文件错误：' + e.message);
      }, { filter: 'image',
        filename: '_doc/camera/',
        multiple: true,
        maximum: max,
        onmaxed: function() {
          window.plus.nativeUI.toast('最多只能选择' + max + '张图片');
        }
      })
    },
    uploadImage() {
      if (this.basePicurl.picurl.length == 0) {
        this.$toast('完工图片必须上传');
        return false
      }
      if (!this.result) {
        this.$toast('完工情况不能为空');
        return false
      }
      uploadByBase64(JSON.stringify(this.basePicurl)).then(res => {
        console.log('提交结果' + JSON.stringify(res))
        if (res.code == 200) {
          var list = [];
          res.data.array.forEach(item => {
            var obj = {};
            obj.billNumber = this.billNumber;
            obj.pictureName = item
            list.push(obj)
          });
          var data = {
            billNumber: this.billNumber,
            imgList: list,
            result: this.result
          }
          console.log('完工参数' + JSON.stringify(data))
          finishBill(JSON.stringify(data)).then(res => {
            if (res.data == 200) {
              this.$router.push({ path: '/assignment' })
            }
          })
        }
      })
    },
    delImg(ind) {
      Dialog.confirm({
        message: '确定要删除这张图片吗？'
      }).then(() => {
        this.imgList.splice(ind, 1)
      }).catch(() => {
        // on cancel
        console.log('取消删除图片')
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.header {
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  background-color: #007acc;
  .left-arrow {
    float: left;
    font-size: 20px;
    margin-left: 5px;
  }
}
.take-photo {
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-bottom: 10px;
  box-sizing: border-box;
  background-color: #fff;
  .photo {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px dashed #ccc;
    margin-right: 8px;
    vertical-align: middle;
  }
  .push-photo {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    vertical-align: middle;
    // @include border-1px-all(#333, 5px, dashed);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .iconfont {
      font-size: 20px;
    }
  }
  .posting-uploader-item {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 8px;
    vertical-align: middle;
    position: relative;
    .delte {
      position: absolute;
      bottom: 2px;
      right: 2px;
      color: #fff;
    }
  }
}
.over-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding-bottom: 10px;
  padding-left: 5px;
  box-sizing: border-box;
  textarea {
    width: 100%;
  }
}
.breakdown {
  background-color: #fff;
  height: 30px;
  line-height: 30px;
  padding: 0px 15px 0px 5px;
  box-sizing: border-box;
  @include border-1px-t(#333);
  .mark {
    color: red;
  }
  .describe {
    margin-left: 5px;
    margin-right: 15px;
  }
  i {
    float: right;
    margin-top: 9px;
  }
}
.bottom {
  width: 100%;
  height: 50px;
  background-color: #fff;
  position: fixed;
  bottom: 0px;
  /deep/.van-button--large {
    width: 70%;
    height: 36px;
    line-height: 36px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.pic_popup {
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      @include border-1px-b(#333);
      &:last-child:after {
        border: none;
      }
    }
  }
}
</style>

