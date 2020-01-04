import api from '@/server/api'
bi.user = {
  logined: false,
  key: 'bitoken',
  info: {
    iUserID: 0,
    sUserName: '',
    sRealName: '',
    sRoleID: '',
    sToken: ''
  },
  setInfo(_info) {
    this.info = _info;
    this.logined = true;
    localStorage.setItem(this.key, JSON.stringify(this.info));
  },

  // 检测是否已经登录
  async check() {
    let _info = localStorage.getItem(this.key);
    if (typeof _info == 'string') {
      _info = JSON.parse(_info);
      if (_info && _info.iUserID) {
        this.info = _info;

        // DEMO 帐号特殊处理，不让进BI平台
        // if (_info.sUserName.indexOf('demo') === 0 && location.pathname.indexOf('/site') !== 0) {
        //   location.replace('/site/index');
        //   return true;
        // }

        let res = await api.userInfo();
        if (res.status) {
          this.logined = true;
          return true;
        } else {
          localStorage.removeItem(this.key);
          this.goto();
          return false;
        }
      }
    }

    this.goto(location.href);
  },

  // 用户登录
  login(_vue) {
    api.userLogin(_vue.user).then(res => {
      if (res.status) {
        this.setInfo(res.data);
        let _url = '';
        // DEMO 帐号特殊处理，不让进BI平台
        if (this.info.sUserName.indexOf('demo') === 0) {
          _url = res.data.sUrl;
        } else {
          _url = bi.cookie.get('login_ret_url');
          bi.cookie.clear('login_ret_url');
          if (!_url) {
            _url = res.data.sUrl;
          }
        }

        // console.log(_url);
        //_vue.$router.push(_url);
        location.replace(_url);
        _vue.errmsg = '';
      } else {
        _vue.errmsg = res.data;
      }
    });
  },

  // API调用后返回
  apiRet(res) {
    if (!res.status) {
      if (res.data == 'NoRight') {
        //this.goto404();
        alert('您没有相应的操作权限，请联系管理员！');
      } else if (res.data == 'NoLogin') {
        this.goto(location.href);
      }
    }
  },

  // 跳转到登录页
  goto(returl) {
    if (location.pathname != '/user/login') {
      if (returl) {
        bi.cookie.set('login_ret_url', returl, 0);
      }
      location.replace('/user/login');
    }
  },

  // 跳转到404页
  goto404() {
    if (location.pathname != '/404') {
      location.replace('/404');
    }
  },

  // 用户登出
  logout() {
    localStorage.removeItem(this.key);
    this.goto();
  },

  // 判断是否有仪表盘权限
  hasDashAuth() {
    if (this.info.sRoleID == '0') {
      return true;
    } else {
      return bi.dash.info.iUserID == this.info.iUserID;
    }
  },
  hasAuth(iUserID) {
    if (this.info.sRoleID == '0') {
      return true;
    } else {
      return iUserID == this.info.iUserID;
    }
  }
};
bi.user.check();