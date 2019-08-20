<template>
  <div class="layout">
    <nav-bar v-if="header.headerStatus" :title="header.title" :num="header.num"></nav-bar>
    <Location v-if="header.locationStatus">
      <slot name="location"></slot>
    </Location>
    <div class="content" :class="bindClass">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import Location from './Location.vue';
export default {
  components: { NavBar, Location },
  props: {
    header: {
      type: Object,
      default: function() {
        return { title: '红星', headerStatus: true, locationStatus: false }
      }
    }
  },
  computed: {
    bindClass() {
      const { locationStatus, headerStatus } = this.header;
      if (locationStatus && headerStatus) {
        return 'with-all';
      } else if (locationStatus) {
        return 'with-location';
      } else if (headerStatus) {
        return 'with-nav';
      }
      return '';
    }
  },
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
.layout {
  width: 100%;
  height: 100%;
  .content {
    height: 100vh;
    overflow: auto;
    background-color: #fff;
    -webkit-overflow-scrolling: touch;
    &.with-nav {
      height: calc(100vh - 46px);
    }
    &.with-location {
      height: calc(100vh - 40px);
    }
    &.with-all {
      height: calc(100vh - 86px);
    }
  }
}
</style>
