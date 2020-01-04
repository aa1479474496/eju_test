<template>
  <div class="g-dialog" :class="{iShow:createFolder}"  >
        <div class="gd-content">
            <form>
            <div class="gd-main">
                <div class="dialog-title">{{folderTypeName}}</div>
                <div class="dialog-center">
                    <div class="form-group">
                        <div class="fli">
                            <div class="label">文件夹名称 </div>
                            <div class="inners">
                                <input type="text" name="folderName" v-model="folder.folderName" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-buttons">
                    <button type="button" class="ngdialog-button" @click="addFolder">确定</button>
                    <button type="button" class="ngdialog-button" @click="cancleDialog">取消</button>
                </div>
            </div>
            </form>
        </div>
  </div>

</template>
<script>
    
  import api from '@/server/api'
  export default {
    data() {
      return { }
    },
    methods: {
        cancleDialog(){
            this.$emit('cancleDialog','folder');
        },
        addFolder(){
            let iname = this.folder.folderName; 
            if(this.folder.folderType === "add"){
                api.nodeAdd({class:'dash',name:iname,parent:0}).then(res => {
                    res.status && this.$emit('cancleDialog','folder') ;
                });
            }else{
                let iTypeID = this.folder.iTypeID;
                api.nodeUpdate({id:iTypeID,name:iname}).then(res => {
                    res.status && this.$emit('cancleDialog','folder') ;
                });
            }
        }
    },
    props:{
        createFolder:Boolean,
        folder :Object
    },
    computed:{ 
        folderTypeName (){
             return  this.folder.folderType == 'add' ? '新建文件夹' : "编辑文件夹" ; 
        }
    }
  }

</script>