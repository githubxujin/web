<template>
    <div>
        <van-nav-bar title="通讯录" left-arrow @click-left="onClickBack"/>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell" @click="tel">
            <i class="van-icon van-cell__left-icon">
                <div class="van-image van-image--round">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>

            </i>
            <div class="van-cell__title">
                <span style="padding-left: 16px">杨周</span><br/>
                <span style="padding-left: 16px; font-size: 14px">电工主管</span>
            </div>
            <div >

            </div>
        </div>
    </div>
</template>

<script>
    const coupon = {
        available: 1,
        condition: '无使用门槛最多优惠12元',
        reason: '',
        value: 150,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '1.5',
        unitDesc: '元'
    };
    export default {
        props: {},
        data() {
            return {
                name: '你好哈',
                enabledtitle: 12,
                items: [
                    {
                        name: '工作状态',
                        pathname: 'workstate',
                        icon: 'icon-daqiakaoqin'
                    },
                    {
                        name: '排班表',
                        pathname: 'dutyManagement',
                        icon: 'icon-zhibanguanli1'
                    },
                    {
                        name: '任务记录',
                        pathname: 'dutySettings',
                        icon: 'icon-zhibanshezhi1'
                    },
                    {
                        name: '任务统计',
                        pathname: 'personalRating',
                        icon: 'icon-dengji'
                    },
                    {
                        name: '通讯录',
                        pathname: 'integral',
                        icon: ' icon-jifen-copy'
                    },
                    {
                        name: '设置',
                        pathname: 'callCenter',
                        icon: 'icon-kefu'
                    }
                ]
            };
        },
        computed: {},
        created() {

        },
        mounted() {

        },
        watch: {},
        methods: {
            tel(){
                this.Dialog.confirm({
                    title: '杨周',
                    message: '15999534339',
                    cancelButtonText:'关闭',
                    confirmButtonText:'拨号'

                }).then(() => {
                    // on confirm
                    if(confirm){
                        alert('拨号中...');
                    }
                }).catch(() => {
                    // on cancel
                });
            },
            topath(path) {
                console.log(path);
                if (path) {
                    this.$router.push({path: path});
                }
            },
            onClickBack() {
                this.$router.go(-1)
            }
        },
        components: {}
    };
</script>

<style scoped lang="scss">
    .van-cell--center {
        height: 100px;
    }

    .van-cell--clickable {
        height: 50px;
        font-size: 17px;
    }

    .mine_content .mine_list:nth-child(4) {
        margin-bottom: 10px;
        border: none;
    }

    .mine_content .mine_list:nth-child(6) {
        margin-bottom: 10px;
        border: none;
    }

    .mine_content .mine_list:nth-child(9) {
        margin-bottom: 10px;
        border: none;
    }

    .mine_content .mine_list:nth-child(13) {
        margin-bottom: 10px;
        border: none;
    }

    .mine_content {
        padding-bottom: 70px;
    }

    .van-cell--clickable {
        height:1.8rem;
        font-size: 0.453333rem;
    }
    .van-image--round{
        width:40px; height:40px; padding-top: 4px;
    }
    .van-image__img{
        object-fit: cover;overflow: hidden;
        border-radius: 50%;
    }
</style>
