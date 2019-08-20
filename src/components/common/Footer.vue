<template>
  <van-tabbar v-model="active" @change="changeTab">
    <van-tabbar-item v-for="(item,ind) in footerList" :key="ind" :name="item.index">
      <div slot="icon" slot-scope="props">
        <i class="iconfont" :class="props.active ? item.active:item.normal"></i>
      </div>
      <span slot-scope="props" :class="props.active ? icon.active : icon.normal">{{item.title}}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script>
import Storages from '@/utils/storages'
export default {
  data() {
    return {
      footerList: '',
      active: 0,
      icon: {
        normal: 'gray',
        active: 'blue'
      }
    }
  },
  created() {
    this.footerList = Storages.getLocalStorage('$permission');
    this.initData();
  },
  methods: {
    initData() {
      console.log('底部菜单', this.footerList, '所在页面:', this.$route.name)
      if (!this.footerList) return;
      const activeItem = this.footerList.find(item => { return item.index == this.$route.name });
      if (activeItem) {
        this.active = activeItem.index;
      }
    },
    changeTab(val) {
      this.active = val;
      // console.log(this.footerList[val].index)
      this.$router.push({ name: this.active })
    }
  }
}
</script>
<style lang="scss" scoped>
.iconfont {
  font-size: 26px;
}
</style>

