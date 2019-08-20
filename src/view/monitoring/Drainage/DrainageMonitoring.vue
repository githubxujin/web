<template>
  <div>
    <nav-bar title="给排水">
      <router-link slot="search" tag="i" class="fr iconfont iconiconshipin" to="/drainage-monitor"></router-link>
    </nav-bar>
    <Location></Location>
    <div class="drainage-container clear">
      <van-tabs>
        <van-tab title="给水系统">
          <supply></supply>
        </van-tab>
        <van-tab title="排水系统">
          <drainage></drainage>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar';
import Location from '@/components/common/Location';
import PageLayout from '@/components/common/PageLayout';
import drainage from './Drainage';
import supply from './Supply';
import { videoMonitorArray } from '@/services/monitoring';
export default {
  components: { NavBar, drainage, supply, Location },
  data() {
    return {
    }
  },
  created() {
    this.getMonitorList();
  },
  mounted() { },
  methods: {
    getMonitorList() {
      videoMonitorArray({ shopNumber: this.$store.getters.shopNumber, type: 2 }).then((res) => {
        if (res.code === 200) {
          this.videoMonitorList = res.data.array;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.drainage-container {
  height: calc(100vh - 86px);
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
