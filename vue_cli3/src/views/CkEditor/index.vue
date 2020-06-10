<template>
  <div>
    <myckeditor></myckeditor>
    <el-button @click="test">test</el-button>
  </div>
</template>

<script>
import myckeditor from "@/components/ckeditor/index.vue";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";
// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn";
export default {
  components: {
    myckeditor
  },
  data() {
    return {
      // editor: ClassicEditor,
      // editor: InlineEditor,
      // editorData: "<p>Content of the editor.</p>",
      // editorConfig: {
      //   language: "zh-cn", //中文包
      //   fontSize: {
      //     options: [8, 10, "default", 14, 16, 18, 20, 22, 24, 26, 28, 32, 48]
      //   },
      //   alignment: {
      //     options: ["left", "right"]
      //   },
      //   toolbar: ["bold", "italic", "|", "alignment", "table", "undo", "redo"]
      // }
    };
  },

  methods: {
    test() {
      console.log("--");
    }
  }
};
</script>