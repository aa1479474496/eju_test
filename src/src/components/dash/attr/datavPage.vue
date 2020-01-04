<template>
  <div>
    <div class="dash-attr-block" v-if="aDfilter">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>接收到的参数
      </div>
      <div class="sdisplay" v-for="(val,key) in aDfilter" :key="key">
        <div class="dash-attr-row">
          <span class="dash-attr-span" style="width:120px">{{key}}:</span>
          <input class="dash-attr-input" style="width:160px" type="text" readonly :value="val">
        </div>
      </div>
    </div>
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>数据信息
        <i class="el-icon-plus" @click.stop="addDbGroup"></i>
      </div>
      <div class="sdisplay">
        <div v-for="(value,index) in sqlData" :key="index">
          <div class="dash-attr-row">
            <input class="dash-attr-input min" type="text" placeholder="name" :value="value.name" @change="sqlChange(index)" @blur="value.name=$event.target.value;getSourceData(index)">
            <select class="dash-attr-select min" v-model="value.db" @change="sqlStatus[index]=true;getSourceData(index)">
              <option v-for="(item,index) in dbList" :value="index" :key="index">{{ item }}</option>
            </select>
            <select class="dash-attr-select mid">
              <option v-for="(val,key) in value.data" :key="key">{{key}} : {{val}}</option>
            </select>
            <i class="el-icon-delete" @click="removeDb(index)"></i>
          </div>
          <div class="dash-attr-row">
            <textarea class="dash-attr-textarea" placeholder="SELECT * FROM t_table" :value="value.sql" @change="sqlChange(index)" @blur="value.sql=$event.target.value;getSourceData(index)"></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- 屏幕大小 -->
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>屏幕大小
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <span class="dash-attr-span6">宽度</span>
          <input class="dash-attr-input px min" type="number" min="0" v-model="currItem.info.datav.w">
          <span class="dash-attr-span6">高度</span>
          <input class="dash-attr-input px min" type="number" min="0" v-model="currItem.info.datav.h" >
        </div>
      </div>
    </div>
    <!-- 栅格间距 -->
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>栅格间距
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
            <span class="dash-attr-span6">间距</span>
          <input class="dash-attr-input px max" type="number" min="0" :value="grid"  @input="setGrid($event.target.value)">
        </div>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>背景图
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
          <el-upload class="upload-demo" :action="uploadUrl" :on-remove="handleRemove" :limit="1" :on-success="handleSuccess" :on-error="handlerError"
            :file-list="fileList" list-type="picture">
            <el-button size="small">点击上传</el-button>
          </el-upload>
        </div>
      </div>
    </div>
    <!-- 封面图 -->
    <div class="dash-attr-block">
      <div class="dash-attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>封面图
      </div>
      <div class="sdisplay">
        <div class="dash-attr-row">
            <el-upload class="upload-demo" :action="uploadUrl" :on-remove="coverHandleRemove" :limit="1" :on-success="coverHandleSuccess" :on-error="handlerError"
            :file-list="coverfileList" list-type="picture">
              <el-button size="small">上传封面</el-button>
            </el-upload>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import api from "@/server/api";
import defaultStyle from "@/config/style";
import "@/config/env";
export default {
  data() {
    return {
      themeList: defaultStyle.dashTheme,
      sqlStatus: {},
      uploadUrl: `${bi.env.apiUrl}/file/upload`
    };
  },
  computed: {
    currItem() {
      return bi.dash.currItem;
    },
    fileList() {
      if (this.currItem.info.css["background-image"]) {
        let _url = this.currItem.info.css["background-image"]
          .split("(")[1]
          .split(")")[0];
        return [
          {
            name: this.currItem.info.css["background-image"].substring(
              this.currItem.info.css["background-image"].lastIndexOf("/") + 1
            ),
            url: _url
          }
        ];
      }
      return [];
    },
    coverfileList() {
      let _url = this.currItem.info.datav.coverImg;
      if (_url) {
        return [
          {
            name: _url.substring(_url.lastIndexOf("/") + 1),
            url: _url
          }
        ];
      }
      return [];
    },
    sqlData() {
      return bi.dash.data.sqldata;
    },
    grid() {
      return this.currItem.info.datav.grid;
    },
    coverImg() {
      return this.currItem.info.datav.coverImg;
    },
    dbList() {
      return bi.dash.info.aDbList;
    },
    dashTheme() {
      let _theme = bi.dash.data.theme;
      if (bi.isObject(_theme)) {
        bi.dash.data.theme = _theme.dash;
        _theme = _theme.dash;
      }
      return _theme || "default";
    },
    aDfilter() {
      return bi.isEmpty(bi.dash.info.aDfilter) ? false : bi.dash.info.aDfilter;
    }
  },
  methods: {
    setGrid(val) {
      this.currItem.info.grid = val;
    },
    changeTheme(_theme) {
      bi.dash.data.theme = _theme;
      bi.dash.loadTheme();
    },
    removeDb(index) {
      this.$confirm("是否删除该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.sqlData.splice(index, 1);
        })
        .catch(() => {});
    },
    sqlChange(index) {
      this.sqlStatus[index] = true;
    },
    getSourceData(index) {
      if (this.sqlStatus[index] && this.sqlStatus[index] == true) {
        this.sqlStatus[index] = false;
        api.pageData(this.sqlData[index]).then(res => {
          if (res.status) {
            this.sqlData[index]["data"] = res.data;
          } else {
            this.sqlData[index]["data"] = {
              SQL: "出错啦！"
            };
          }
        });
      }
    },
    addDbGroup() {
      this.sqlData.push({
        name: "source",
        db: "",
        sql: "SELECT * FROM t_table",
        data: {}
      });
    },
    handleRemove(file, fileList) {
      this.$set(this.currItem.info.css, "background-image", "");
    },
    handleSuccess(res) {
      this.$set(
        this.currItem.info.css,
        "background-image",
        `url(${bi.env.apiUrl}/view/${res.file.sFile})`
      );
    },
    coverHandleRemove(file, fileList) {
      this.currItem.info.datav.coverImg = "";
    },
    coverHandleSuccess(res) {
      this.currItem.info.datav.coverImg = `${bi.env.apiUrl}/view/${
        res.file.sFile
      }`;
    },
    handlerError() {
      console.error("upload error");
    }
  }
};
</script>
