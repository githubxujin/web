<template>
    <div>
        <van-nav-bar title="工作状态" left-arrow @click-left="onClickBack"/>
        <div class="location"><span><i class="iconfont icondingwei"></i>东莞红星美凯龙总店

  </span></div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round color="#006EFF">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round color="#F5A623">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>
        <div class="van-cell van-cell--clickable van-coupon-cell">
            <i class="">
                <div class="van-image van-image--round" style="width:30px; height:30px;">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="van-image__img"></div>
                &nbsp;&nbsp;
            </i>
            <div class="van-cell__title">
                <span>杨周炸酱面</span>
            </div>
            <div class="van-cell__title">
                <span>电工</span>
            </div>
            <div class="van-cell__title">
                <van-tag round type="primary">空闲</van-tag>
            </div>
        </div>

    </div>
</template>

<script>
    const coupon = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
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

    .van-cell__title {
        padding-top: 5px;
    }

    .van-image__img {
        object-fit: cover;
        overflow: hidden;
        border-radius: 50%;
    }
</style>
