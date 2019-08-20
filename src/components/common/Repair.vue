 <template>
  <div class="repair-form">
    <nav-bar title="填写保修单">
      <div slot="search" class="carema fr"></div>
    </nav-bar>
    <div class="repair-location box-size">
      <div class="location box-size flex">
        <div class="shop-name">{{shopTitle}}</div>
        <i class="iconfont iconlaihui"></i>
      </div>
    </div>
    <div class="repair-status box-size flex">
      <div class="status center" :class="{active:selected}" @click="selectUsual">
        通 常
        <div class="trangle"></div>
        <i class="iconfont iconduigou" v-show="selected"></i>
      </div>
      <div class="status center" :class="{active:selected1}" @click="selectUrgency">
        紧 急
        <div class="trangle"></div>
        <i class="iconfont iconduigou" v-show="selected1"></i>
      </div>
    </div>
    <div class="repair-info">
      <!-- <van-cell-group>
        <van-field v-model="location" label="位置" placeholder="请输入用户名" />
        <van-field v-model="device" label="故障设备" placeholder="请输入密码" disabled />
        <van-field v-model="repairMan" label="保修人" placeholder="请输入密码" />
        <van-field v-model="relateTel" label="联系方式" placeholder="请输入密码" />
      </van-cell-group>-->
      <div class="repair-detail">
        <div class="repair-content box-size">
          <span class="fl title">位置</span>
          <input type="text" v-model="location" class="input-text fr" placeholder="请输入所在位置" />
        </div>
        <div class="repair-content box-size" @click="selectDevice">
          <span class="fl title">故障设备</span>
          <input type="text" v-model="device" class="input-text fr" placeholder="请选择故障类型" disabled />
        </div>
        <div class="repair-content box-size">
          <span class="fl title">保修人</span>
          <input type="text" v-model="repairMan" class="input-text fr" placeholder="请输入报修人名称" />
        </div>
        <div class="repair-content box-size">
          <span class="fl title">联系方式</span>
          <input type="text" v-model="relateTel" class="input-text fr" placeholder="请输入报修人号码" />
        </div>
        <div class="repair-content box-size">
          <span class="fl title">报修内容</span>
          <div class="record fr">
            <i class="iconfont iconyemian"></i>
            <span>按住说话</span>
          </div>
        </div>
      </div>
    </div>
    <div class="problem-info box-size">
      <div class="problem-desc">
        <textarea rows="3" placeholder="请填写遇到的问题..." v-model="problemDesc"></textarea>
      </div>
      <div class="photo flex">
        <div class="take-photo" @click="showAction">
          <i class="iconfont icontupian"></i>
          <span>上传图片</span>
        </div>
        <div class="take-photo">
          <i class="iconfont iconshipin"></i>
          <span>上传视频</span>
        </div>
      </div>
      <div class="img-list">
        <div
          class="posting-uploader-item"
          v-for="(item,nn) in imgList"
          :key="nn"
          v-show="imgList.length>0"
        >
          <img :src="item.content" alt="图片" class="imgPreview" />
          <van-icon name="delete" @click="delImg(nn)" class="delte" />
        </div>
      </div>
    </div>
    <div class="submit-btn center">提 交</div>
    <!-- 上传照片弹窗 -->
    <div class="pic_popup">
      <van-popup
        v-model="showPopup"
        position="bottom"
        :style="{ height: '25%' }"
        :close-on-click-overlay="false"
      >
        <ul>
          <li @click="captureImage">拍照</li>
          <li @click="selectImage">相册选择</li>
          <li @click="closePop">取消</li>
        </ul>
      </van-popup>
    </div>
    <!-- 选择故障设备 -->
    <van-popup
      v-model="showDevicePop"
      position="bottom"
      :style="{ height: '40%' }"
      :close-on-click-overlay="false"
    >
      <van-picker
        show-toolbar
        title="故障设备"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
import navBar from '@/components/common/NavBar.vue'
import { imgcompress } from '@/utils/utils.js';
import { Dialog } from 'vant';
const citys = {
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州']
};

export default {
  components: { navBar },
  data() {
    return {
      selected: true,
      selected1: false,
      problemDesc: '',
      location: this.$store.getters.getUserInfo.positionName,
      repairMan: this.$store.getters.getUserInfo.realName,
      device: '',
      relateTel: this.$store.getters.getUserInfo.phone,
      repairContent: '',
      imgList: [],
      showPopup: false,
      showDevicePop: false,
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    };
  },
  computed: {
    shopTitle() {
      return this.$store.getters.getUserInfo.shopName;
    }
  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: {
    selectUrgency() {
      this.selected = false;
      this.selected1 = true;
    },
    selectUsual() {
      this.selected1 = false;
      this.selected = true;
    },
    selectDevice() {
      this.showDevicePop = true;
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    onCancel() {
      this.showDevicePop = false;
    },
    onConfirm(value, index) {
      // console.log(value, index)
      this.device = value.join('-');
      this.showDevicePop = false;
    },
    showAction() {
      this.showPopup = true;
    },
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
};
</script>
<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
.repair-form {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: $titleColor;
  padding-bottom: 60px;
}
.carema {
  display: inline-block;
  width: 21px;
  height: 19px;
  margin-top: 13px;
  @include bg-image("../../assets/imgs/monitoring/carema");
  background-size: 100% 100%;
}
.repair-location {
  width: 100%;
  height: 66px;
  padding: 12px 10px 10px;
  .location {
    width: 100%;
    height: 100%;
    padding: 0px 22px;
    background-color: $bgLightColor;
    justify-content: space-between;
    .shop-name {
      font-size: 17px;
    }
  }
}
.repair-status {
  height: 52px;
  padding: 0px 56px;
  justify-content: space-between;
  .status {
    width: 110px;
    height: 52px;
    line-height: 52px;
    background-color: #fff;
    color: $placeholderColor;
    border-radius: 2px;
    margin-bottom: 10px;
    &.active {
      border: 1px solid $primaryColor;
      color: $primaryColor;
      position: relative;
      .trangle {
        width: 0;
        height: 0;
        border-color: transparent $primaryColor $primaryColor transparent;
        border-style: solid;
        border-width: 10px 14px 10px 14px;
        position: absolute;
        right: -1px;
        bottom: -1px;
      }
      i {
        position: absolute;
        right: -1px;
        bottom: -20px;
        color: #fff;
      }
    }
  }
}
.repair-info {
  font-size: 16px;
  .repair-detail {
    background-color: $bgLightColor;
    padding-left: 15px;
  }
  .repair-content {
    padding: 10px 15px 10px 0px;
    line-height: 24px;
    height: 44px;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    color: $primaryColor;
    border-bottom: 1px solid #eee;
    &:last-child {
      border: none;
    }
    .title {
      color: #323232;
    }
    .input-text {
      text-align: right;
      border: 0px none;
      outline: none;
      font-size: 14px;
      color: #333;
    }
    input:disabled {
      background-color: #fff;
    }
    .record {
      border: 1px solid $primaryColor;
      padding: 0px 5px;
      border-radius: 27px;
      font-size: 14px;
    }
  }
}
.problem-info {
  width: 100%;
  padding: 15px 16px;
  background-color: #fff;
  .problem-desc,
  textarea {
    width: 100%;
    height: 60px;
    border: 0 none;
    font-size: 16px;
  }
  .photo {
    justify-content: flex-start;
    .take-photo {
      width: 80px;
      height: 80px;
      margin-right: 8px;
      vertical-align: middle;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #999999;
      border: 1px dashed #999;
      span {
        font-size: 12px;
        display: inline-block;
        margin-top: 10px;
      }
    }
  }
}
.submit-btn {
  width: 375px;
  height: 47px;
  line-height: 47px;
  font-size: 18px;
  color: $primaryColor;
  background-color: $bgLightColor;
  position: fixed;
  bottom: 0px;
  left: 0px;
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
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      @include border-1px-b(#999);
      &:last-child:after {
        border: none;
      }
    }
  }
}
.img-list {
  widows: 100%;
  .posting-uploader-item {
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-right: 2px;
    margin-top: 10px;
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
</style>

