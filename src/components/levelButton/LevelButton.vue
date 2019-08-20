<template>
  <div v-if="alarmLevel==1" class="level-btn one-level">一级</div>
  <div v-else-if="alarmLevel==2" class="level-btn two-level">二级</div>
  <div v-else-if="alarmLevel==3" class="level-btn three-level">三级</div>
  <div v-else-if="alarmLevel==4" class="level-btn four-level">四级</div>
  <div v-else class="level-btn five-level">五级</div>
</template>
<script>
export default {
  props: {
    alarmLevel: {
      type: Number
    }
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.level-btn {
  width: 38px;
  height: 18px;
  line-height: 18px;
  border-radius: 38px;
  color: #fff;
  text-align: center;
  padding: 0px 5px;
  font-size: 10px;
  &.one-level {
    background-color: #ff483a;
  }
  &.two-level {
    background: linear-gradient(to right, #ffb45f, #ff7f4e);
  }
  &.three-level {
    background: linear-gradient(to right, #fbea47, #ffb25d);
  }
  &.four-level {
    background: linear-gradient(to right, #53d0ef, #53afef);
  }
  &.five-level {
    background: linear-gradient(to right, #bccbf2, #9aa8cd);
  }
}
</style>
