<template>
        <div>
            <van-nav-bar title="任务统计" left-arrow @click-left="onClickBack"/>
            <div class="location"><span><i class="iconfont icondingwei"></i>东莞红星美凯龙总店
  </span>
            </div>
            <div style="padding: 10px 10px 10px 10px">
            <div  class="date" @click="show=true">{{currentDate}}</div>
                <div class="people">杨周炒饭</div>
            </div>

            <div class="van-cell van-cell--clickable van-coupon-cell">

                <div class="van-cell__title">
                    <span>电工 张三 在此期间</span>
                </div>
            </div>
            <div class="van-cell van-cell--clickable van-coupon-cell">

                <div class="van-cell__title">
                    <span>完成工单</span>
                </div>191个
            </div>
            <div class="van-cell van-cell--clickable van-coupon-cell">

                <div class="van-cell__title">
                    <span>平均响应时间</span>
                </div>5分23秒
            </div>
            <div class="van-cell van-cell--clickable van-coupon-cell">

                <div class="van-cell__title">
                    <span>审核通过率</span>
                </div>96%
            </div>
            <div class="van-cell van-cell--clickable van-coupon-cell">

                <div class="van-cell__title">
                    <span>商户评分平均值</span>
                </div>4.8
            </div>
            <div class="care_popup">


                <van-popup v-model="show"
                           position="bottom">
                    <div class="popup_content">
                        <!--<van-picker show-toolbar-->
                                    <!--title="人员"-->
                                    <!--:columns="columns"-->
                                    <!--@cancel="onCancel"-->
                                    <!--@confirm="onConfirm" />-->
                        <van-datetime-picker
                                v-model="thisDate"
                                type="year-month"
                                :min-date="minDate"
                                :formatter="formatter"
                                @cancel="onCancel"
                                @confirm="onConfirm"
                        />
                    </div>
                </van-popup>
            </div>
        </div>
</template>

<script>
    export default {
            components: {

            }, data () {
                return {
                    show: false,
                    thisDate:new Date(),
                    minDate:new Date('2019-01-01'),
                    currentDate:''
        }
            },
            computed: {},
            created () {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                this.currentDate=year+'年'+month+'月';
            },
            mounted () {

            },
            methods: {
                formatter(type, value) {
                    if (type === 'year') {
                        return `${value}年`;
                    } else if (type === 'month') {
                        return `${value}月`
                    }
                    return value;
                     },

                onConfirm (value, index) {
                    let date = new Date(value);
                    let year = date.getFullYear();
                    let month = date.getMonth();
                    this.currentDate=year+'年'+month+'月';
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
    .date{
        width:100px;  height:20px ; background-color:#FFFFFF; color:#006EFF; text-align: center;border-radius:10px
    }
    .people{
        width:100px;  height:20px ; background-color:#FFFFFF; color:#006EFF; text-align: center;border-radius:10px;float: right; margin-top: -20px
    }
    .location {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        height: 1.066667rem;
        line-height: 1.066667rem;
        padding: 0 0.4rem;
        font-size: 0.426667rem;
        color: #333333;
        background-color: #ffffff;
        overflow: hidden;
    }
    .location .icondingwei {
        background-image: -webkit-gradient(linear, left top, left bottom, from(#ff8768), to(#f65544));
        background-image: linear-gradient(180deg, #ff8768 0%, #f65544 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>