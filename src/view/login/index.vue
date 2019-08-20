<template>
  <div class="Login_wap" ref="Login_wap">
    <div class="Login_wap_content">
      <div class="logo"></div>
      <div class="Login_wap_title">{{ title }}</div>
      <div class="psdLogin">
        <div class="username login_input ub">
          <!-- <div class="icon iconfont iconweibiaoti-- w1"></div> -->
          <div class="input ub-f1">
            <input
              type="text"
              name="username"
              placeholder="请输入用户名"
              v-model="userName"
              @blur="blured('username')"
              @keyup="keyUpCheck($event)"
            />
          </div>
        </div>
        <div class="password login_input ub">
          <!-- <div class="icon iconfont iconsuo w1"></div> -->
          <div class="input ub-f1">
            <input
              :type="type"
              name="password"
              placeholder="请输入密码"
              v-model="password"
              @blur="blured()"
              @keyup="keyUpCheck($event)"
            />
            <!-- <p v-show="verifyPassword" class="error">密码长度不足6位数</p> -->
          </div>
          <div
            class="iconfont icon psdicon w1"
            :class="isAgree ? show : hide"
            @click="showPassword"
          ></div>
        </div>
      </div>
      <div class="submit">
        <van-button
          size="large"
          type="info"
          @click="$common.throttle(getLogin)()"
          v-show="!isLogin"
        >登 录</van-button>
        <van-button loading size="large" type="info" loading-text="登录中..." v-show="isLogin" />
      </div>
      <div class="forget" @click="forgetPassword">忘记密码？</div>
    </div>
    <!-- <div class="versions">Copyright© 2018 紫衡1.0</div> -->
    <!-- <div class="bottom_bg"></div> -->
  </div>
</template>
<script>
import Storages from '@/utils/storages'
import { login } from '@/services/login';
import { setTimeout } from 'timers';
import { administrationAuthority } from '@/mock/permission' // 模拟权限用，联调之后需要删除
export default {
  data() {
    return {
      islogin: false,
      title: '智慧运营  省心省事',
      userName: '',
      password: '',
      userPhone: '',
      codeText: '获取验证码',
      tab: true, // 记录是账号登录还是手机号验证登录
      vcode: '',
      isAgree: false,
      show: 'iconyanjing',
      hide: 'iconyanjing1',
      type: 'password',
      flag: false, // 记录按钮是否被点击
      reCode: '',
      verifyPassword: false, // 控制登录
      disabled: false,
      isLogin: false
    };
  },
  created() {

  },
  methods: {
    // 登录
    async getLogin() {
      this.islogin = true;
      this.verifyKey();
      // 账号密码登录
      const data = {
        userName: this.userName,
        password: this.password
        // password: this.$md5(this.password)
      };
      const res = await login(data);
      if (res.code === 200) {
        const result = administrationAuthority;
        this.islogin = false;
        // 储存用户信息，token，并跳转页面
        if (res.data.info) {
          this.$store.commit('user/setUserInfo', res.data.info);
        }
        if (res.data.token) {
          this.$store.commit('user/setRequestHeader', res.data.token);
        }
        // 储存用户权限
        if (res.data.permission) {
          Storages.setLocalStorage('$permission', result.data.permission)
        }
        this.$router.push({
          name: 'monitoring'
        });
      } else {
        this.islogin = false;
        this.$toast(res.msg);
        return false;
      }
    },
    // 验证账号密码是否为空
    verifyKey() {
      if (!this.userName) {
        this.$toast('账号不能为空');
        return false;
      }
      if (!this.password) {
        this.$toast('密码不能为空');
        return false;
      }
    },
    // 切换是否可查看密码
    showPassword() {
      this.type = this.type === 'password' ? 'text' : 'password';
      this.isAgree = this.type !== 'password';
    },
    // 输入框失去焦点时自动去除空格并校验密码var regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
    blured(target) {
      if (target != 'username' && this.password.length < 6) {
        console.log(this.verifyPassword)
        this.verifyPassword = true;
      }
    },
    keyUpCheck(event) {
      const val = event.target.value.replace(/ /g, '');
      if (event.target.name === 'username') {
        this.userName = val
      } else {
        this.password = val
      }
    },
    forgetPassword() {
      this.$router.push({ name: 'forget' })
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
.Login_wap {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: relative;
}
.Login_wap_title {
  width: 100%;
  font-size: 14px;
  text-align: center;
  font-family: "hzgb";
  color: #2e2e2e;
  padding-top: 14px;
  margin-bottom: 46px;
}

.mint-cell {
  width: 329px;
  background: none;
  border: none;
  border: 1px solid #29adad;
  margin-bottom: 30px;
  background: rgba(6, 19, 17, 0.3);
  font-family: "PingFang-SC-Regular";
  color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
}

.mint-field-core {
  background: none;
}

.Login_wap_content {
  width: 329px;
  position: absolute;
  top: 110px;
  left: 50%;
  margin-left: -165px;
  /deep/ .van-button {
    height: 44px;
    border-radius: 5px;
    font-size: 18px;
    letter-spacing: 15px;
  }
}

.logo {
  width: 68px;
  height: 68px;
  @include bg-image("../../assets/imgs/login/logo");
  background-size: cover;
  margin: 0 auto;
}

.mint-button--default {
  width: 329px;
  height: 44px;
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFang-SC-Medium;
  font-weight: "Medium";
  color: rgba(77, 77, 77, 1);
  letter-spacing: 10px;
}

.login_input {
  width: 100%;
  height: 44px;
  border-radius: 5px;
  line-height: 44px;
  background: #ecf3ff;
  margin-bottom: 16px;
  font-size: 18px;
}

.submit {
  width: 100%;
  height: 44px;
  border-radius: 5px;
  line-height: 44px;
  text-align: center;
  font-size: 18px;
  color: rgba(77, 77, 77, 1);
  background: #ffffff;
  font-family: PingFang-SC-Regular;
  margin-top: 36px;
}

.icon {
  width: 40px;
  height: 40px;
  text-align: center;
  color: #ffffff;
  font-size: 20px;
}
.psdicon {
  color: #006eff;
}
.forget {
  font-size: 12px;
  line-height: 12px;
  height: 12px;
  width: 100%;
  text-align: right;
  color: #5f79aa;
  margin-top: 10px;
}

.versions {
  font-size: 9px;
  line-height: 15px;
  height: 15px;
  width: 100%;
  text-align: center;
  color: #ffffff;
  position: fixed;
  bottom: 5px;
  z-index: 3;
}
// 去除number右边默认的上下箭头
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #5f79aa;
  font-size: 14px;
}

input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #5f79aa;
  font-size: 14px;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #5f79aa;
  font-size: 14px;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #5f79aa;
  font-size: 14px;
}
.input {
  position: relative;
  .error {
    position: absolute;
    top: 35px;
    left: -40px;
    color: red;
    font-size: 12px;
  }
}
.input input {
  color: #5f79aa;
  font-size: 14px;
  width: calc(100% - 16px);
  height: 30px;
  line-height: 30px;
  padding-left: 16px;
  margin-top: 5px;
}

.code_input input {
  letter-spacing: 2px;
}
.loginTab {
  padding: 40px 20px;
  text-align: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
}

.loginTab div {
  margin-left: 10px;
  margin-right: 10px;
}

.login_active {
  padding-bottom: 5px;
  border-bottom: 2px solid #ffffff;
  color: rgba(255, 255, 255, 1);
}

.get_code {
  width: 88px;
  height: 44px;
  background: #ffffff;
  line-height: 44px;
  font-size: 15px;
  color: #0a8fbf;
  text-align: center;
  border-radius: 5px;
  margin-left: 10px;
  opacity: 0.8;
  outline: none;
  border: none;
}

.txt_pad {
  padding: 0 20px;
}
</style>
