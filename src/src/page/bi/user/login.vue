<template>
<div class="l-wrap">
  <div class="l-form ng-pristine ng-valid" autocomplete="off">
    <div class="login-info clearfix">
      <input type="text" name="username" v-model="user.username" autocomplete="off" class="l-input has-text">
      <label for="username" class="icon-user">用户名</label>
    </div>
    <div class="login-info clearfix">
      <input type="password" name="password" v-model="user.password" autocomplete="off" class="l-input has-text">
      <label for="password" class="icon-pwd">密码</label>
      <div class="forget-pwd">
        <a href="/user/password">忘记密码？</a>
      </div>
    </div>
    <div class="login-info clearfix login-info-short">
      <input type="text" name="verifyPicCode" autocomplete="off" v-model="user.verify" @keyup.13="login()" class="l-input has-text">
      <label for="verifyPicCode" class="icon-user">验证码</label>
      <img class="verify-pic" @click="$event.target.src=verifyImg(false)" :src="verifyImg(true)">
    </div>
    <p class="error" v-show="errmsg">{{errmsg}}</p>
    <div id="loginBtn">
      <button type="button" class="l-btn ok" @click="login()">登 录</button>
    </div>
  </div>
</div>
</template>

<script>
import "@/style/default/userLogin.scss";
import "@/style/theme/black/userLogin.scss";
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
        verify: ''
      },
      errmsg: ''
    };
  },
  methods: {
    verifyImg(_init) {
      return bi.env.apiUrl + '/verify/image?_t=' + (_init?'':new Date().getTime());
    },
    login() {
      bi.user.login(this);
    }
  }
};
</script>
