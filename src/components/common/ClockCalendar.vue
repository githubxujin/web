<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}

* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
}

li {
  list-style-type: none;
}

.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #232323;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}

.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #ffffff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 12px;
  width: 13.4%;
  text-align: center;
  color: #232323;
  position: relative;
}

.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 25 px;
  height: 25px;
  line-height: 25px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #45a6c9;
  border-left: 2px solid #45a6c9;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #45a6c9;
  border-right: 2px solid #45a6c9;
  transform: rotate(45deg);
}

.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}

.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}

.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}

.wh_content_item .wh_isToday {
  background: #45a6c9;
  color: #ffffff;
  border-radius: 100px;
  position: relative;
}

.wh_content_item .wh_chose_day {
  /*background: #45a6c9;*/
  /*color: #ffffff;*/
  /*border-radius: 100px;*/

  background: #45a6c9;
  color:#3165FF;
  border-radius: 100px;
  position: relative;
}

.attendance_content {
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
}

.attendance_content li {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  height: 60px;
}

.attendance_content li .attendance_top {
  line-height: 30px;
  height: 30px;
  color: #252525;
}

.attendance_content li .attendance_top span {
  font-size: 20px;
}

.dot {
  width: 5px;
  height: 5px;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 100%;
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -2.5px;
}

.mark1 .dot {
  background: #ff5151;
}

.mark2 .dot {
  background: #45a6c9;
}

.mark3 .dot {
  background: #8c9295;
}

.duty_type {
  margin-left: 65px;
}

.duty_type_list {
  height: 16px;
  line-height: 16px;
  margin-right: 20px;
}

.duty_type_list .lump {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 3px;
}
</style>
<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <!--<div class="attendance_content ub">-->
        <!--<li class="ub-f1">-->
          <!--<div class="attendance_top"><span>{{count.mustout}}</span>天</div>-->
          <!--<div style="color:#19B290;">应出勤</div>-->
        <!--</li>-->
        <!--<li class="ub-f1">-->
          <!--<div class="attendance_top"><span>{{count.out}}</span>天</div>-->
          <!--<div style="color:#279EC9;">已出勤</div>-->
        <!--</li>-->
        <!--<li class="ub-f1">-->
          <!--<div class="attendance_top"><span>{{count.early}}</span>次</div>-->
          <!--<div style="color:#D88418;">早退</div>-->
        <!--</li>-->
        <!--<li class="ub-f1">-->
          <!--<div class="attendance_top"><span>{{count.late}}</span>次</div>-->
          <!--<div style="color:#FF5151;">迟到</div>-->
        <!--</li>-->
      <!--</div>-->
      <div class="wh_content">
        <div class="wh_content_item"
             v-for="tag in textTop">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item"
             v-for="(item,index) in list"
             @click="clickDay(item,index)">
          <div class="wh_item_date"
               v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_chose_day:item.chooseDay},setClass(item)]">
            {{item.id}}
            <div class="dot"></div>
          </div>
        </div>
      </div>
      <!--<div class="duty_type ub">-->
        <!--<div class="duty_type_list ub">-->
          <!--<div class="lump"-->
               <!--style="background:#FF5151"></div>-->
          <!--<div class="duty_type_name">异常值班</div>-->
        <!--</div>-->
        <!--<div class="duty_type_list ub">-->
          <!--<div class="lump"-->
               <!--style="background:#45A6C9"></div>-->
          <!--<div class="duty_type_name">正常值班</div>-->
        <!--</div>-->
        <!--<div class="duty_type_list ub">-->
          <!--<div class="lump"-->
               <!--style="background:#8C9295"></div>-->
          <!--<div class="duty_type_name">待值班</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </section>
</template>
<script>
import timeUtil from '@/utils/calendar.js';
export default {
  data () {
    return {
      textTop: ['一', '二', '三', '四', '五', '六', '日'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    count: {},
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created () {
    this.intStart();
    this.myDate = new Date();
    // console.log(this.count)
  },
  methods: {
    intStart () {
      if (this.sundayStart) {
        this.textTop = ['日', '一', '二', '三', '四', '五', '六'];
      } else {
        this.textTop = ['一', '二', '三', '四', '五', '六', '日'];
      }
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass (data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth' ?
          this.PreMonth(item.date) :
          this.NextMonth(item.date);
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map((k) => {
        return timeUtil.dateFormat(k);
      })
      markDateMore = markDateMore.map((k) => {
        k.date = timeUtil.dateFormat(k.date)
        return k;
      })
      return [markDate, markDateMore];
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}-${date.getMonth() + 1}`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
      // console.log(arr)
    }
  },
  mounted () {
    this.getList(this.myDate);
  },
  watch: {
    markDate (val, oldVal) {
      this.getList(this.myDate);
    },
    markDateMore (val, oldVal) {
      this.getList(this.myDate);
    },
    agoDayHide (val, oldVal) {
      this.agoDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    futureDayHide (val, oldVal) {
      this.futureDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    sundayStart (val, oldVal) {
      this.intStart();
      this.getList(this.myDate);
    }
  }
};

</script>
