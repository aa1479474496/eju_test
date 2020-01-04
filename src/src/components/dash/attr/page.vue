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
    <div class="dash-attr-block">
			<div class="dash-attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>主题和布局</div>
			<div class="sdisplay">
				<div class="dash-attr-row">
          <span class="dash-attr-span">主题:</span>
          <select class="dash-attr-select max" :value="dashTheme" @change="changeTheme($event.target.value)">
            <option v-for="(option,index) in themeList" :key="index" :value="option.value" >{{ option.name }}</option>
          </select>
			  </div>
				<div class="dash-attr-row">
          <span class="dash-attr-span">全屏:</span>
          <el-switch
            :value="dashData.fullscreen || false"
            @change="dashData.fullscreen=$event"
            active-text="全屏显示"
            inactive-text="普通显示">
          </el-switch>
				</div>
      </div>
		</div>
  </div>
</template>

<script>
import api from '@/server/api'
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      themeList: defaultStyle.dashTheme,
      sqlStatus: {},
      dashData: bi.dash.data
    };
  },
  computed: {
    sqlData() {
      return bi.dash.data.sqldata;
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
      return _theme || 'default';
    },
    aDfilter() {
      return bi.isEmpty(bi.dash.info.aDfilter) ? false : bi.dash.info.aDfilter;
    }
  },
  methods: {
    changeTheme(_theme) {
      bi.dash.data.theme = _theme;
      bi.dash.loadTheme();
    },
    removeDb(index) {
      this.$confirm("是否删除该数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.sqlData.splice(index, 1);
      }).catch(() => {});
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
            this.sqlData[index]["data"] = {"SQL":"出错啦！"};
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
    }
  }
};
</script>