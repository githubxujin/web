<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
    <Loading v-show="false"></Loading>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Loading from '@/components/common/Loading';
export default {
  data() {
    return {
      transitionName: 'van-fade'
    }
  },
  computed: {
    ...mapState('base', ['loadingStatus'])
  },
  components: { Loading },
  created() {
    if (window.plus) {
      window.plus.navigator.setStatusBarBackground('#35a9d3');
    } else {
      document.addEventListener(
        'plusready',
        () => {
          window.plus.navigator.setStatusBarBackground('#35a9d3');
        }, false);
    }
  },
  mounted() {
    // 提交sdk连接请求
    if (this.$router.history.current.name !== 'login') {
      // this.$store.dispatch("connect");
      // this.$store.dispatch("updateRefreshState");
      // this.$store.dispatch('getProjectArray')
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      if (to.name == 'orderDetail') {
        if (from.name == 'overOrder') {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
      } else if (to.name == 'overOrder') {
        this.transitionName = 'slide-right'
      } else if (from.name == 'orderDetail') {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'van-fade'
      }
    }
  }
};
</script>
<style>
/*@import '../static/css/main.css';*/

#app {
  width: 100%;
  height: 100vh;
  background: #f4f5f9;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.view_header {
  width: 100%;
  height: 48px;
  line-height: 48px;
  text-align: center;
  font-size: 20px;
  color: #fefefe;
  background: rgba(53, 169, 211, 1);
}

.view_header .van-nav-bar .van-icon {
  color: #ffffff;
}

.view_header .van-nav-bar__left {
  left: 10px;
  font-size: 18px;
  top: -1px;
}

.van-nav-bar {
  height: 48px;
  line-height: 48px;
  z-index: 5;
}
.slide-right-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease;
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
  position: absolute;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}
</style>
