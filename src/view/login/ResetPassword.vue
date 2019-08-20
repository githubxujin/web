<template>
  <div class="forget-password">
    <nav-bar title="设置新密码"></nav-bar>
    <div class="forget-form box-size">
      <div class="tel-input">
        <input
          :type="type"
          class="box-size"
          name="password"
          placeholder="请输入新密码"
          v-model.trim="password"
          maxlength="16"
          @keyup="keyUpCheck($event)"
        />
        <i class="iconfont" :class="isAgree ? show : hide" @click="showPassword" v-show="password"></i>
      </div>
      <input
        type="password"
        class="box-size"
        name="repassword"
        placeholder="请再次输入新密码"
        v-model.trim="repassword"
        maxlength="16"
        @keyup="keyUpCheck($event)"
      />
      <div class="submit-btn">
        <van-button
          type="info"
          size="large"
          style="border-radius:4px;"
          @click="$common.throttle(submit)()"
        >保 存</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/NavBar.vue'
import { getVcode, sendVcode } from '@/services/login.js'
import { setInterval, clearInterval } from 'timers';
import regexp from '@/utils/regexp.js';
export default {
  components: { navBar },
  data() {
    return {
      password: '',
      repassword: '',
      isAgree: false,
      show: 'iconyanjing',
      hide: 'iconyanjing1',
      type: 'password'
    }
  },
  methods: {
    showPassword() {
      this.type = this.type === 'password' ? 'text' : 'password';
      this.isAgree = this.type !== 'password';
    },
    checkPass() {
      var flag = false;
      if (!this.password) {
        this.$toast('请输入密码')
      } else if (regexp.chinese.test(this.password)) {
        this.$toast('密码中不能含有中文，请重新输入')
      } else if (!this.repassword) {
        this.$toast('请再次输入密码')
      } else if (this.password != this.repassword) {
        this.$toast('两次密码不一致，请重新输入')
      } else {
        flag = true;
      }
      return flag;
    },
    keyUpCheck(event) {
      const val = event.target.value.replace(/ /g, '');
      if (event.target.name === 'password') {
        this.password = val
      } else {
        this.repassword = val
      }
    },
    submit() {
      const flag = this.checkPass();
      if (flag) {
        // 将新密码储存起来
        //   sendVcode({ password: this.password, repassword: this.repassword }).then(res => {
        //     if (res.code == 200) {
        // this.$toast('密码重置成功！将去往登录页')
        //       this.$router.push({ name: 'login' })
        //     }
        //   }).catch(err => {
        //     console.log(err)
        //   })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tel-input {
  position: relative;
  i {
    position: absolute;
    color: #006eff;
    right: 10px;
    top: 12px;
  }
}
@import "./index.scss";
</style>

