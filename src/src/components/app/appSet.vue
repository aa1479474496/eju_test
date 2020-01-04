<template>
  <div class="ipageset" :style="{display: optObj.iSiteSet? 'block':'none'}">
    <div class="head">
      页面设置
      <i class="el-icon-close" @click="hideSitePage"></i>
    </div>

    <div class="default-set">
      <div class="item">
        <div class="label">标题设置:</div>
        <div class="ivalue">
          <div class="input l-input">
            <input type="text" placeholder="" v-model="app.data.sTitle">
          </div>
        </div>
      </div>

      <div class="item">
        <div class="label">LOGO:</div>
        <div class="ivalue">
          <el-upload class="upload-demo" :action="uploadUrl" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess" :on-error="handlerError"
            :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">建议100kB以内</div>
          </el-upload>
        </div>
      </div>

      <div class="item">
        <div class="label">皮肤设置:</div>
        <div class="ivalue">
          <div class="li" v-for="(item,key,index) in themeArr" :key="index" @click="setTheme(key)">
            <label>
              <input type="radio" name="theme" class="radio-theme" v-if="app.sTheme == key" checked>
              <input type="radio" name="theme" class="radio-theme" v-else>
              <div class="theme-box" :style="{'background':item.bodyColor}"></div>
              {{key}}
            </label>
          </div>
        </div>
      </div>


      <div class="item">
        <div class="label">页脚设置:</div>
        <div class="ivalue">
          <!-- <el-switch v-model="ifooter" class="iswitch"> </el-switch> -->
          <div class="input l-input" style="display:inline-block">
            <input type="text" placeholder="" v-model="app.data.sFooter">
          </div>
        </div>
      </div>


      <div class="item">
        <div class="label">页面别名:</div>
        <div class="ivalue">
          <div class="input l-input">
            <input type="text" placeholder="" v-model="app.data.sAlias">
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        app: bi.app,
        uploadUrl: `${bi.env.apiUrl}/file/upload`,
        optObj: bi.app.status,
        themeArr: bi.app.theme
      };
    },
    computed: {
      fileList() {
        if (this.app.data.sLogo) {
          return [{
            name: bi.app.data.sLogo,
            url: `${bi.env.apiUrl}/view/${this.app.data.sLogo}`
          }]
        }
        return [];
      }
    },
    methods: {
      handleRemove(file, fileList) {},
      handleSuccess(res) {
        bi.app.data.sLogo = res.file.sFile;
      },
      handlerError() {
        console.error("upload error");
      },
      hideSitePage() {
        bi.app.status.iSiteSet = false;
      },
      setTheme(key) {
        bi.app.status.sTheme = key;
        bi.app.loadingTheme(key);
      }
    }
  };

</script>
<style lang="scss" scoped>
  .ipageset {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: #fff;
    .head {
      height: 80px;
      background: #fff;
      font-size: 20px;
      line-height: 80px;
      padding: 0 20px;
      i {
        float: right;
        line-height: 80px;
        cursor: pointer;
      }
    }
    .default-set {
      padding: 15px 30px 10px 10px;
    }
    .item {
      margin-top: 10px;
      display: flex;
      font-size: 14px;
      .label {
        width: 25%;
        text-align: right;
        vertical-align: middle;
        line-height: 32px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 5px;
      }
      .ivalue {
        width: 75%;
        .input {
          width: 100%;
          box-sizing: border-box;
          input {
            position: relative;
            display: inline-block;
            padding: 4px 7px;
            width: 100%;
            height: 32px;
            cursor: text;
            font-size: 14px;
            line-height: 1.5;
            color: rgba(0, 0, 0, 0.65);
            background-color: #fff;
            background-image: none;
            border: 1px solid #d9d9d9;
            border-radius: 2px;
            transition: all 0.3s;
            box-sizing: border-box;
          }
        }
        .m-input {
          width: 75%;
        }
        .li {
          display: inline-block;
          margin-right: 20px;
          label {
            cursor: pointer;
          }
          .theme-box {
            width: 22px;
            height: 22px;
            margin: 0 auto 5px;
            border: 3px solid #f1f1f1;
            box-sizing: content-box;
            position: relative;
            top: 3px;
            margin-bottom: 5px;
          }
          .radio-theme {
            display: none;
          }
          .radio-theme:checked+.theme-box {
            border: 3px solid #409eff;
          }
        }
        .iswitch {
          margin: 0 10px;
          margin-top: -7px;
        }
      }
    }
  }

</style>
