<template>
  <div class="forget-password">
    <nav-bar title="忘记密码"></nav-bar>
    <div class="forget-form box-size">
      <div class="tel-input">
        <input
          type="number"
          class="box-size"
          name="telephone"
          placeholder="请输入手机号码"
          v-model.trim="telephone"
          maxlength="11"
          @blur="ValidateTel()"
          @keyup="keyUpCheck($event)"
        />
        <span class="code" @click="getCode">{{codeText}}</span>
      </div>
      <input
        type="text"
        class="box-size"
        name="code"
        placeholder="请输入验证码"
        v-model.trim="verifyCode"
        @keyup="keyUpCheck($event)"
      />
      <div class="submit-btn">
        <van-button
          type="info"
          size="large"
          :disabled="(telephone&&(verifyCode&&verifyCode.length==6))?false:true"
          style="border-radius:4px;"
          @click="submit"
        >提 交</van-button>
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
      telephone: '',
      verifyCode: '',
      codeText: '获取验证码'
    }
  },
  methods: {
    ValidateTel() {
      if (this.telephone) {
        if (!regexp.mobile.test(this.telephone)) {
          this.$toast('请输入正确的手机号码');
        }
      } else {
        this.$toast('手机号码不能为空');
      }
    },
    keyUpCheck(event) {
      const val = event.target.value.replace(/ /g, '');
      if (event.target.name === 'telephone') {
        this.telephone = val
      } else {
        this.verifyCode = val
      }
    },
    getCode() {
      console.log(!this.telephone, 'shouji')
      if (!this.telephone) {
        this.$toast('手机号码不能为空');
      } else if (!regexp.mobile.test(this.telephone)) {
        this.$toast('请输入正确的手机号码');
        return false
      } else {
        // 获取验证码
        let second = 30;
        var that = this;
        getVcode({ type: 3, phone: this.telephone }).then(res => {
          if (res.code == 200) {
            this.$toast('短信验证码已发送成功，请注意查收');
            const clock = setInterval(function() {
              if (second > 0) {
                that.codeText = '重新获取' + (second--) + 's'
              } else {
                clearInterval(clock);
                that.codeText = '获取验证码'
              }
            }, 1000);
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    submit() {
      sendVcode({ phone: this.telephone, verifyCode: this.verifyCode }).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: 'resetPassword' })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
/deep/ .van-button {
  height: 44px;
}
</style>
