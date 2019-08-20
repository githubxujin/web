<template>
  <router-link :to="'/order-detail/'+ '12'">
    <div class="item">
      <p class="title">
        <span class="type">
          <i class="iconfont iconiconbaoxiujiluxuanzhongxiaochengxu"></i>
          {{'商户报修'}}
        </span>
        <span class="status">待完工</span>
      </p>
      <ul class="content">
        <li>
          <section class="left">工单编号：</section>
          <section class="right">{{'wyh20981124215709'}}</section>
        </li>
        <li>
          <section class="left">报修人：</section>
          <section class="right">{{'小钱'}}</section>
        </li>
        <li>
          <section class="left">具体位置：</section>
          <section class="right">{{'民治天虹商场一楼A102'}}</section>
        </li>
        <li>
          <section class="left">问题描述：</section>
          <section class="right">{{'照明工具损坏，需要更换'}}</section>
        </li>
      </ul>
      <p class="footer">
        <span class="time">
          <i class="iconfont iconiconpaibanbiao"></i>
          {{'2019年4月12日 12:45:08'}}
        </span>
        <span class="edit">完 工</span>
      </p>
      <span class="tip">通常</span>
    </div>
  </router-link>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    }
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
@mixin flex-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.item {
  position: relative;
  padding: 0 10px 0 25px;
  margin-top: 10px;
  background-color: #fff;
  .title {
    @include flex-box;
    height: 40px;
    margin: 0;
    border-bottom: 1px solid #ededed;
    .type {
      font-size: 15px;
      color: #333;
      i {
        color: #006eff;
        margin-right: 3px;
      }
    }
    .status {
      line-height: 18px;
      padding: 0 7px;
      font-size: 10px;
      border-radius: 18px;
      color: #fff;
      background-color: #f58823;
    }
  }
  .content {
    padding-bottom: 10px;
    li {
      margin-top: 10px;
      min-height: 20px;
    }
    section {
      font-size: 14px;
      color: #666666;
      display: inline-block;
      &.left {
        width: 80px;
        float: left;
      }
      &.right {
        max-width: 200px;
      }
    }
  }
  .footer {
    @include flex-box;
    height: 40px;
    margin: 0;
    border-top: 1px solid #ededed;
    .time {
      font-size: 13px;
      i {
        color: #006eff;
        margin-right: 3px;
      }
    }
    .edit {
      line-height: 22px;
      padding: 0 10px;
      border-radius: 5px;
      color: #fff;
      background-color: #006eff;
    }
  }
  .tip {
    position: absolute;
    bottom: 45px;
    right: 10px;
    transform: rotate(-45deg);
    font-size: 16px;
    line-height: 48px;
    width: 48px;
    text-align: center;
    border-radius: 48px;
    color: #f5a623;
    font-size: 16px;
    // font-weight: bold;
    border: 5px solid #f5a623;
    opacity: 0.3;
  }
}
</style>
