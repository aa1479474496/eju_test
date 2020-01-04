<template>
    <div class="datav-list-page"  @click="chengeName()" >
        <homeHeader :activeIndex="5"></homeHeader>
         <div class="tips">
           <!-- ！当前可视化模板4个，汉可以创建5个 -->
         </div>
        <div class="datav-lists">
           
            <div class="items" @click="addDatv()">
              <div class="hrefs">
                <i class="iconfont icon-plus" ></i>
                <div class="desc fontcommon" >新建可视化</div>
              </div>
            </div>


            <div class="items" v-for="(elm,index) in list" :key="index">
               <div class="listpic">
                   <img v-if="elm.sImage" :src="elm.sImage" />
                   <div class="edits">
                        <router-link :to="`/datav/edit/${elm.iAutoID}`" class="editHref"> 
                            <el-button class="btn" plain type="success"   size="small" >编辑</el-button>
                        </router-link>
                   </div>
               </div>
               <div class="list-bottom">
                   <div class="listName" @click.stop="setChangeIndex(index)">
                        <i class="ifont el-icon-edit fontcommon" ></i>
                        <div class="editName fontcommon" v-if="changeIndex != index">
                            <span class="inners">{{elm.sName}}</span>
                        </div>
                        <div class="editName fontcommon" v-else  >
                           <input class="inners" v-model="elm.sName"  @blur="chengeName(elm.iAutoID,elm.sName)"  @keyup.enter="chengeName(elm.iAutoID,elm.sName)" />
                        </div>
                   </div>
                   <div class="optsAction">
                       <el-button class="btns leftbtn" plain type="primary"  size="mini" icon="el-icon-view"   @click="goFullscreen(elm.iAutoID)">预览</el-button>
                       <el-button class="btns rightbtn" plain type="danger"  size="mini" icon="el-icon-delete" @click="deleteDatav(elm.iAutoID)">删除</el-button>
                   </div>
               </div>
            </div>


        </div>
    </div>
</template>
<script>
import api from "@/server/api";
import homeHeader from "@/components/home/homeHeader";
export default {
  data() {
    return {
      list: [],
      changeIndex: -1
    };
  },
  components: {
    homeHeader
  },
  created() {
    this.getListData();
  },
  methods: {
    setChangeIndex(val) {
      this.changeIndex = val;
    },
    chengeName(iAutoID,sName) {
      this.changeIndex = -1;
      if(typeof(iAutoID) == 'undefined'){
        return false;
      }
      api
        .dashRename({ id: iAutoID, type: 2, name: sName })
        .then(res => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        });
    },
    addDatv() {
      this.$prompt("数据大屏名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S.{1,20}$/,
        inputErrorMessage: "数据大屏名称格式不正确"
      })
        .then(({ value }) => {
          api
            .dashSave({ id: "", data: "", name: value, type: 2, node: 0 })
            .then(res => {
              this.$router.push(`/datav/edit/${res.data}`);
            });
        })
        .catch(() => {});
    },
    getListData() {
      api.dashList({ type: 2 }).then(res => {
        if (res.status) {
          this.list = res.data;
        }
      });
    },
    deleteDatav(iAutoID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.dashDelete({ id: iAutoID }).then(res => {
            this.list = this.list.filter(e => {
              return e.iAutoID != res.data;
            });
          });
        })
        .catch(() => {});
    },
    goFullscreen(val) {
      this.$router.push(`/datav/show/${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.datav-list-page {
  .tips {
    max-width: 1300px;
    margin: auto;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    display: block;
    margin-top: 15px;
  }
  .datav-lists {
    max-width: 1300px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    .items {
      margin: 10px 7px 10px 0;
      position: relative;
      background: rgba(255, 255, 255, 1);
      height: 230px;
      width: 240px;
      cursor: pointer;
      .hrefs {
        display: block;
        text-align: center;
        height: 100%;
        text-decoration: none;
        padding-top: 40px;
        color: #666;
        .desc {
          margin-top: 20px;
        }
      }
      .icon-plus {
        font-size: 78px;
        display: block;
      }
      .listpic {
        height: 146px;
        width: 100%;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .edits {
          height: 100%;
          width: 100%;
          position: absolute;
          z-index: 2;
          background: rgba(0, 0, 0, 0.5);
          top: 0;
          display: none;
          .editHref {
            display: block;
            text-align: center;
            line-height: 146px;
            .btn {
              width: 100px;
            }
          }
        }
      }
      .listpic:hover {
        .edits {
          display: block;
        }
      }
      .list-bottom {
        padding: 0 10px;
        .listName {
          width: 100%;
          height: 30px;
          vertical-align: middle;
          position: relative;
          white-space: nowrap;
          margin-top: 8px;
          padding-bottom: 3px;
          border-bottom: 1px solid #e8ecf2;
          color: #666;
          cursor: pointer;
          font-size: 16px;
          box-sizing: border-box;
          .editName {
            width: 200px;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            .inners {
              height: 21px;
              box-sizing: border-box;
              font-size: 16px;
            }
          }
          .ifont {
            margin-top: -12px;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .optsAction {
          .btns {
            margin-top: 10px;
          }
          .leftbtn {
            float: left;
          }
          .rightbtn {
            float: right;
          }
        }
      }
    }
    .items:hover {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.9),
        0 16px 24px 0 rgba(0, 0, 0, 0.9);
    }
    .fontcommon:hover {
      color: #5182e4;
    }
  }
}
</style>


