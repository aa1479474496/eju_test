<template>
  <div class="l-flex-base l-flex">
    <div class="l-flex-base l-wrap">
        <div class="main">
            <img src="/static/404.png" alt="找不到页面">
            <h1>出错啦 :(</h1>
            <p>抱歉，你访问的页面地址有误或页面不存在。</p>
            <p><span id="skipText"><span id="countdown">{{seconds}}</span>秒之后页面自动跳转…</span> <a class="no-margin" href="/home">返回首页</a></p>
        </div>
    </div>
    <div class="footer">
        Copyright © 2013-2018 DCBI YUN Ltd.
    </div>
</div>
</template>

<script>
import "@/style/default/userLogin.scss";
import "@/style/theme/black/userLogin.scss";
export default {
  data() {
    return { seconds: 5 };
  },
  created() {
    setInterval(() => {
      this.seconds--;
      if (this.seconds <= 0) {
        location.replace("/home");
      }
    }, 1000);
  }
};
</script>
<style scoped>
.l-flex-base {
  color: #fff;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
  -ms-align-items: center;
  justify-content: space-around;
  -webkit-justify-content: space-around;
}
.l-flex {
  position: absolute;
  top: 0;
  margin-top: -65px;
  width: 100%;
  height: 100%;
  min-height: 500px;
  flex-direction: column;
  -webkit-flex-direction: column;
}
.login-l-flex {
  margin-top: 0;
}
.l-wrap {
  position: absolute\9;
  top: 50%\9;
  left: 50%\9;
  margin-top: -230px\9;
  margin-left: -142px\9;
  min-height: 300px;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.no-margin {
  color: #5182e4;
}
</style>

