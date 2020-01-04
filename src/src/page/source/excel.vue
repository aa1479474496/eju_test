<template>
  <div class="data-excel">
    <backHeader :headTitle="headTitle" :goBack="true"></backHeader>
    <div class="excel-content">
      <div class="steps-wrap">
        <ul class="upload-step-warp">
          <li class="upload-step  active">
            <span class="circle">1</span>上传文件
          </li>
          <li class="upload-step">
            <span class="circle">2</span>预览数据
          </li>
          <li class="upload-step">
            <span class="circle">3</span>工作表设置
          </li>
        </ul>
      </div>

      <div class="steps-pages">

          <div class="upload-excel">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
             </el-upload>
          </div>


      </div>
    </div>
  </div>
</template>
<script>
import backHeader from "@/components/common/backHeader";
export default {
  data() {
    return {
      headTitle: "上传数据"
    };
  },
  components: {
    backHeader
  }
};
</script>
<style lang="scss" scoped>
ul {
  list-style: none;
}
.data-excel {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  .excel-content {
    margin: 0 auto;
    width: 960px;
    padding-top: 94px;
    .steps-wrap {
      padding: 0 0 24px;
      text-align: center;
      .upload-step-warp {
        display: inline-block;
        .upload-step {
          margin: 0;
          padding: 0;
          float: left;
          opacity: 0.3;
        }
        .upload-step + .upload-step {
          margin-left: 96px;
        }
        .circle {
          display: inline-block;
          border-radius: 100%;
          width: 24px;
          height: 24px;
          text-align: center;
          line-height: 24px;
          margin-right: 4px;
          background-color: #5182e4;
          color: #fff;
        }
      }
      .upload-step.active {
        float: left;
        opacity: 1;
      }
    }
  }
}
</style>
