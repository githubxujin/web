<template>
<div>
       <van-search
        v-model="keyWord"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        class="search-bar"
      />
      <alarmInfo :alarmRange="alarmRange" :alarmStatus="alarmStatus" type="type" :keyword="keyWord" :list="alarmList"></alarmInfo>
</div>
</template>
<script>
import { getAlarmList, delAlarm } from '@/services/monitoring'
import levelButton from '@/components/levelButton/LevelButton'
import alarmInfo from '@/components/alarmInfo/'
export default {
  components: { alarmInfo },
  data() {
    return {
      pageNum: 0,
      pageSize: 15,
      alarmList: [],
      alarmStatus: 0,
      alarmRange: '',
      keyWord: '',
      isIgnore: false
    }
  },
  methods: {
    // 关键字搜索
    onSearch() {

    },
    onCancel() {
      this.alarmList = []
      this.$router.push({ name: 'alarmManagement' });
    }
  }
}
</script>
<style scoped lang="scss">
.search-bar{
   background-color:#F4F5F9 !important;
}
/deep/ .alarm-list{
    padding-top:0px;
}
/deep/ .van-search__content{
  background-color:#ffffff;
  border-radius:15px;
}
/deep/ .van-search__action{
  color:#0F8CFF;
}
</style>
