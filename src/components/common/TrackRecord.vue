<template>
  <div class="track-record">
    <van-nav-bar title="跟踪记录" left-arrow @click-left="onClickBack" />
    <van-steps direction="vertical" :active="0" class="record">
      <van-step>
        <h3>运维杨周，确认工单</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>管理员欧阳，派单给杨周</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>小米之家，提交保修单</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    onClickBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss">
.track-record {
  /deep/ .van-nav-bar__text {
    color: #666;
  }
  /deep/.van-step--vertical {
    font-size: 12px;
  }
  /deep/.van-step--vertical:not(:last-child)::after {
    border-bottom-width: 3px;
  }
}
.record {
  margin-top: 5px;
}
</style>

