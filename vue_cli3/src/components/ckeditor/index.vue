<template>
  <div>
    <h1>myckeditor -- component</h1>
    <ckeditor id="article-editor" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
// import CKEditor from '@ckeditor/ckeditor5-vue';
// import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor";

// import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
// import FontFamilyPlugin from '@ckeditor/ckeditor5-font/src/fontfamily';

// console.log('CKEditor---', CKEditor);
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
console.log("++", InlineEditor);
export default {
  components: {
    // ckeditor: CKEditor.component
  },

  data() {
    return {
      editor: InlineEditor,
      editorData: "<p>测试数据</>",
      editorConfig: {
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin
        ],
        toolbar: {
          items: ["bold", "italic", "link", "undo", "redo"]
        }
        // toolbar: [ 'bold', 'italic', '|' ,'link']
      }
    };
  }
};
</script>