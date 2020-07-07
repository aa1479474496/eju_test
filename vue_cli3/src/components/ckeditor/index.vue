<template>
  <div>
   
    <div class="editor" ref="editor">
      <!-- <div v-html="testData">
      </div> -->
    </div>
  </div>
</template>

<script>
import './ckeditor.js';
let testData = '<figure class="table"><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>'
export default {
  components: {
    // ckeditor: CKEditor.component
  },

  data() {
    return {
      editor: null,
      testData
    };
  },

  mounted() {
    this.$nextTick(() => {
      // this.$refs.baseMap
      let re = this.$refs.editor;
      let ir = document.querySelector('.editor')
      console.log('reeee', InlineEditor);
      InlineEditor
			.create( re, {
				toolbar: {
					items: [
						'bold',
						'italic',
						'alignment',
						'bulletedList',
						'numberedList',
						'|',
						'|',
						'insertTable',
						// 'undo',
						// 'redo',
						// 'fontFamily',
						'fontSize',
						'fontColor',
						'fontBackgroundColor',
						'heading'
					]
				},
				language: 'zh-cn',
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells',
						'tableCellProperties',
						'tableProperties'
					]
				},
        licenseKey: '',
        fontSize: {
            options: [
                12,
                13,
                14,
                16,
                18,
                21
            ]
        },
        fontFamily: {
          supportAllValues: false,
          options: ['FangSong,STFangsong']
        }
				
			} )
			.then( editor => {
        this.editor = editor;
        this.editor.setData('12345');
         this.editor.model.document.on('change:data', this.changeData);
			} )
			.catch( error => {
				console.error( 'Oops, something gone wrong!' );
			} );
    })
  },

  methods: {
    changeData() {
      let data = this.editor.getData();
      this.$emit('handlChange', data);
      // console.log('vvvvv',data);
    }
  }
};
</script>