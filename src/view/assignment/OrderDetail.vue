<template>
  <div class="order-detail">
    <nav-bar title="工单详情"></nav-bar>
    <div class="content">
      <div class>
        <p class="title">
          <span class="left">工单流程</span>
          <span @click="allProcess = !allProcess" class="right">详情 {{allProcess? '^':'v'}}</span>
        </p>
        <div class="order-process" :class="{'close': !allProcess}">
          <ul>
            <li v-for="item in 5" :key="item">
              <p class="time">
                <span>{{'04-12'}}</span>
                <br />
                <span>{{'10:00:45'}}</span>
              </p>
              <i class="iconfont" :class="item === 2?'iconiconyichang error':'iconiconzhengchang'"></i>
              <p class="msg">
                {{'评价'}}
                <span>{{'小米之家已给出好评'}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class>
        <p class="title">
          <span class="left">
            基本信息
            <i>已完工</i>
          </span>
          <span class="order-status">通常</span>
        </p>
        <ul class="order-assign order-info">
          <li>
            <section>工单编号</section>
            <section>wyh20981124215709</section>
          </li>
          <li>
            <section>商户</section>
            <section>小米之家</section>
          </li>
          <li>
            <section>保修人</section>
            <section>钱小西</section>
          </li>
          <li>
            <section>联系方式</section>
            <section>15512121212</section>
          </li>
          <li>
            <section>具体位置</section>
            <section>民治天虹商城</section>
          </li>
          <li>
            <section>问题描述</section>
            <section>照明工具损坏</section>
          </li>
          <li>
            <section>报修图片</section>
            <div class="img-content">
              <img src="../../../public/static/img/test.jpg" alt />
              <img src="../../../public/static/img/test.jpg" alt />
              <img src="../../../public/static/img/test.jpg" alt />
              <img src="../../../public/static/img/test.jpg" alt />
            </div>
          </li>
          <li>
            <section>报修视频</section>
            <div class="img-content video-box">
              <img src="../../../public/static/img/test.jpg" alt />
            </div>
          </li>
        </ul>
      </div>
      <div class>
        <p class="title">
          <span class="left">指派信息</span>
        </p>
        <ul class="order-assign">
          <li>
            <section>维修人</section>
            <section>刘广华</section>
          </li>
          <li>
            <section>联系方式</section>
            <section>15525251212</section>
          </li>
          <li>
            <section>部门</section>
            <section>运维部</section>
          </li>
          <a :href="'tel:'+'15525251212'">
            <i class="iconfont iconiconbohao"></i>
            立即联系
          </a>
        </ul>
      </div>
      <div>
        <p class="title">
          <span class="left">完工说明</span>
        </p>
        <div class="order-explain">
          <textarea v-model="reason" id cols="30" rows="4" placeholder="请填写完工说明信息"></textarea>
          <van-uploader v-model="fileList" multiple :max-count="2" />
        </div>
      </div>
      <div>
        <p class="title">
          <span class="left">审核</span>
        </p>
        <div class="order-examine">
          <van-radio-group v-model="radio">
            <van-radio name="1">通过</van-radio>
            <van-radio name="2">驳回</van-radio>
          </van-radio-group>
          <textarea v-if="radio == 2" class="reject" id cols="30" rows="10" placeholder="请输入驳回原因"></textarea>
        </div>
      </div>
    </div>
    <div class="bottom">
      <a class="operate" @click="editStatus = !editStatus">转单/撤单/挂单</a>
      <a class="finish" @click="finish">完工</a>
    </div>
    <van-popup round v-model="editStatus">
      <order-edit :editStatus.sync="editStatus"></order-edit>
    </van-popup>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';
import Location from '@/components/common/Location.vue';
import OrderEdit from './OrderEdit';
export default {
  name: 'OrderDetail',
  components: { NavBar, OrderEdit },
  data() {
    return {
      fileList: [],
      reason: '',
      radio: '',
      allProcess: true,
      editStatus: false
    }
  },
  created() {
    this.initData()
  },
  mounted() { },
  methods: {
    initData() {
      const { id } = this.$route.params;
      console.log(id)
    },
    finish() {
      if (!this.reason) {
        return this.$toast('请填写完工说明')
      }
      if (!this.fileList.length) {
        return this.$toast('请上传完工说明照片')
      }
      this.$toast('完工成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.order-detail {
  .content {
    height: calc(100vh - 108px);
    overflow: auto;
    padding-bottom: 10px;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    > div {
      padding: 0 10px 0 25px;
      margin-top: 10px;
      background-color: #fff;
    }
    .title {
      display: flex;
      line-height: 40px;
      margin: 0;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ededed;
      .left {
        font-size: 15px;
        color: #333;
        i {
          display: inline-block;
          margin-left: 12px;
          padding: 0 7px;
          border-radius: 18px;
          line-height: 18px;
          font-size: 10px;
          font-style: normal;
          color: #fff;
          background: #38d691;
        }
      }
      .right {
        color: #006eff;
      }
      .order-status {
        width: 45px;
        line-height: 18px;
        font-size: 10px;
        color: #f5a623;
        text-align: center;
        border-radius: 18px;
        border: 1px solid #f5a623;
      }
    }
    .order-assign {
      position: relative;
      padding-bottom: 10px;
      li {
        margin-top: 10px;
        section {
          display: inline-block;
          font-size: 14px;
          width: 100px;
          &:first-of-type {
            color: #999999;
          }
        }
        .img-content {
          padding-top: 10px;
          display: flex;
          flex-wrap: wrap;

          img {
            // flex: 1
            margin: 0 6px 10px;
            width: 100px;
            height: 75px;
          }
        }
      }
      a {
        position: absolute;
        width: 80px;
        line-height: 26px;
        font-size: 11px;
        right: 0;
        top: 20px;
        color: #17bc00;
        border-radius: 14px;
        text-align: center;
        border: 1px solid #17bc00;
      }
    }
    .order-process {
      overflow: hidden;
      padding: 15px 0 25px;
      &.close {
        height: 90px;
      }
      li {
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-bottom: 34px;
        &:last-of-type {
          margin-bottom: 0;
          i:after {
            display: none;
          }
        }
        .time {
          width: 52px;
          text-align: right;
          font-size: 13px;
          margin: 0 10px 0 0;
          span {
            &:last-of-type {
              font-size: 10px;
            }
          }
        }
        i {
          position: relative;
          color: #006eff;
          font-size: 25px;
          background: #fff;
          &::after {
            content: "";
            position: absolute;
            top: 27px;
            left: 12px;
            height: 44px;
            width: 1px;
            border-left: 1px dotted #006eff;
          }
          &.error {
            color: #ec142e;
            &::after {
              border-color: #ec142e;
            }
          }
        }
        .msg {
          margin: 0 0 0 10px;
          font-size: 16px;
          width: 220px;
          position: relative;
          span {
            font-size: 12px;
            position: absolute;
            bottom: -16px;
            left: 0;
          }
        }
      }
    }
    .order-explain {
      textarea {
        display: block;
        border: none;
        font-size: 14px;
        width: 100%;
      }
    }
    .order-examine {
      padding-bottom: 10px;
      /deep/ .van-radio-group {
        &::after {
          content: "";
          display: block;
          clear: both;
        }
        .van-radio {
          width: 170px;
          height: 46px;
          float: left;
        }
      }
      textarea {
        display: block;
        margin: 0 auto;
        width: 333px;
        height: 63px;
        font-size: 13px;
        padding: 12px;
        resize: none;
        box-sizing: border-box;
        border: 1px solid #e3e3e3;
        background-color: #e3e3e3;
      }
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    padding-top: 10px;
    height: 62px;
    text-align: center;
    background: #fff;
    box-sizing: border-box;
    a {
      display: inline-block;
      font-size: 16px;
      line-height: 44px;
      border-radius: 2px;
      &.operate {
        width: 140px;
        color: #006eff;
        margin-right: 5px;
        border: 1px solid #006eff;
        background: #cfe1f9;
      }
      &.finish {
        width: 198px;
        color: #fff;
        background: #006eff;
      }
    }
  }
  /deep/ .van-popup {
    background: none;
  }
}
</style>
