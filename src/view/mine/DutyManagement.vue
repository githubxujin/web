<template>
  <div>
    <van-nav-bar title="排班表"
                 left-arrow
                 @click-left="onClickBack" />
    <div style=" padding:6px 0 7px 0">
      <div class="van-cell van-cell--clickable van-coupon-cell"
           @click="show=true">
        <div class="van-cell__title">
          <span>选择人员</span>
        </div>{{columns[index]}}
        <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
      </div>
    </div>
    <clockCalendar :markDateMore="arr"
                   :count="count"></clockCalendar>


    <div style=" padding:6px 0 7px 20px;background-color:#F8FAFA;font-size: 15px">
      2019-08-15
    </div>
    <div style=" padding:6px 0 7px 0">
      <div class="van-cell van-cell--clickable van-coupon-cell"
           @click="show=true">
        <div class="van-cell__title">
          <span>工作时间</span>
        </div>8:30-18:00
      </div>
    </div>


    <div class="care_popup">
      <van-popup v-model="show"
                 position="bottom">
        <div class="popup_content">
          <van-picker show-toolbar
                      title="人员"
                      :columns="columns"
                      @cancel="onCancel"
                      @confirm="onConfirm" />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import clockCalendar from '@/components/common/ClockCalendar'
export default {
  components: {
    clockCalendar
  }, data () {
    return {
      show: false, radio: '',
      name: "考勤汇总",
      currentdate: '',
      count: {},
      dateList: [],
      arr: [],
      selectMonth: '',
      daysDetail: '', columns: ['张三', '李四', '王五', '赵柳', '赵六'], index: 0
    }
  },
  computed: {},
  created () {

  },
  mounted () {

  },
  methods: {
    onConfirm (value, index) {
      this.show = false;
      this.index = index;
    },
    onCancel () {
      this.show = false;

    },
    onClickBack () {
      this.$router.go(-1)
    },

    clickDay (data) {
      this.show = false;
      console.log(data); //选中某天
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      let seperator2 = ":";
      let arr = data.split("/");
      if (arr[1] >= 0 && arr[1] <= 9) {
        arr[1] = "0" + arr[1]
      }
      if (arr[2] >= 0 && arr[2] <= 9) {
        arr[2] = "0" + arr[2]
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      let time = arr.join("-");
      // this.$ajax.post(this.$url.getClockRecord, { uid: this.$userInfo.id, date: time }).then((res) => {
      //     console.table(res.data);
      //     this.daysDetail = res.data.detail;
      //     this.show = true;
      // })
    }  },

  watch: {}
}
</script>

<style scoped>
.checkingIn_wap {
  position: relative;
  background: #f5f5f5;
  padding-top: 48px;
}

.view_header {
  position: fixed;
  top: 0;
  z-index: 3;
}

.clock_content {
  padding-bottom: 40px;
  height: 80px;
}

.Attendance_content {
  padding-left: 40px;
  padding-top: 20px;
  position: relative;
}

.duty_time {
  color: #8c9295;
}

.clock_time_box {
  font-size: 18px;
  height: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  line-height: 20px;
}

.clock_type {
  width: 40px;
  height: 20px;
  border-radius: 3px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  margin-left: 10px;
}

.clock_position {
  font-size: 14px;
  color: #8c9295;
}

.position_left {
  font-size: 20px;
  margin-right: 3px;
  position: relative;
  top: -3px;
}

.relation_box {
  width: 8px;
  height: 128px;
  position: absolute;
  top: 25px;
  left: 15px;
}

.circle {
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: #8c9295;
  position: absolute;
  left: 0px;
}

.line {
  height: 100%;
  background: #8c9295;
  width: 1px;
  position: absolute;
  top: 0;
  left: 3.5px;
}

.be_late {
  background: #ff5151;
}

.leave_early {
  background: #ffb351;
}

.wap_bottom {
  margin-top: 70px;
  text-align: center;
}

.clock_off {
  font-size: 24px;
  color: #252525;
}

.clock_off_time {
  font-size: 18px;
  color: #8c9295;
}

.clock_off_btn {
  width: 121px;
  height: 121px;
  margin: 0 auto;
}

.wap_content {
  margin-top: 10px;
  background: #ffffff;
}

.rechecking {
  width: 53px;
  height: 18px;
  border: 1px solid #45a6c9;
  color: #45a6c9;
  line-height: 18px;
  text-align: center;
  font-size: 12px;
}

.care_popup {
  text-align: center;
  font-size: 15px;
  color: #45a6c9;
}
</style>