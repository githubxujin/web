<template>
  <div class="loading">
    <div class="body">
      <van-loading type="spinner" size="30px" vertical>{{this.msg}}</van-loading>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';
Vue.use(Loading);
export default {
  components: {},
  props: {
    msg: {
      type: String,
      default: '加载中...'
    }
  },
  data() {
    return {
    }
  },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  .body {
    box-sizing: border-box;
    width: 40vw;
    height: 30vw;
    padding-top: 30px;
    background-color: rgba(50, 50, 51, 0.88);
  }
  // /deep/ .van-loading__text {
  //   color: ;
  // }
}
</style>
