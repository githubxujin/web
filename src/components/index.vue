<template>
  <div class="index_wap">
    <transition :name="transitionName">
      <div class="view_box">
        <router-view></router-view>
      </div>
    </transition>
    <div class="footer">
      <v-foot></v-foot>
    </div>
  </div>
</template>
<script>
import vFoot from './common/Footer'
export default {
  components: { vFoot },
  data() {
    return {
      name: '首页',
      transitionName: ''
    };
  }
};
</script>
<style scoped>
.index_wap {
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.view_box {
  width: 100%;
  height: 100%;
  position: relative;
  overflow-x: hidden;
}

.footer {
  width: 100%;
  height: 50px; /*no*/
  position: fixed;
  bottom: 0px;
}
</style>
