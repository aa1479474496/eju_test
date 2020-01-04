
<template>
<div>
  <div class="oneblock">
    <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>图表样式
      <i class="iconfont icon-refresh_light editdialog" title="重置样式" @click.self="resetOption"></i>
    </div>
    <div class="sdisplay">
      <codemirror ref="ocode" :value="optionText" :options="cmOptions" @blur="changeOption"></codemirror>
    </div>
  </div>
</div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai';
import 'codemirror/mode/javascript/javascript';
import '@/components/common/jsformat';
import optionCompile from '@/components/chart/com/compile';

export default {
  data() {
    return {
      chartInfo: bi.chart,
      cmOptions: {
        tabSize: 2,
        mode: "javascript",
        theme: "monokai",
        lineNumbers: true,
        styleActiveLine: true,
        highlightDifferences: true,
        line: true,
        matchBrackets: true,
        extraKeys: {
          F7: function autoFormat(editor) {
            bi.editor = editor;
            var totalLines = editor.lineCount();
            editor.autoFormatRange({ line: 0, ch: 0 }, { line: totalLines });
          } //代码格式化
        }
      }
    };
  },
  components: {
    codemirror
  },
  computed: {
    optionText() {
      let _option = bi.chart.data.option[this.chartInfo.data.type];
      if (bi.isObject(_option)) {
        _option = "option = " + JSON.stringify(_option, "", 2);
      }

      return _option;
    }
  },
  methods: {
    //重置样式
    resetOption() {
      this.$confirm("你确定要重置样式吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let _type = this.chartInfo.data.type;
        bi.chart.data.option[_type] = bi.copy(bi.chart.components[_type]["option"]);
      }).catch(() => {});
    },

    //修改样式
    changeOption() {
      let _type = this.chartInfo.data.type;
      let _text = this.$refs.ocode.content || this.$refs.ocode.value || "";
      _text = _text.trim();
      if (_text == "") {
        //this.$alert("请正确输入你的数据格式!!");
        bi.chart.data.option[_type] = bi.copy(bi.chart.components[_type]["option"]);
        return false;
      }

      let _newOption = optionCompile.check(this.chartInfo, _text);
      
      if (bi.isEmpty(_newOption)) {
        this.$alert("请正确输入你的数据格式!!");
        return false;
      }

      // 格式正确就替换
      bi.chart.data.option[_type] = _text;
    }
  }
};
</script>