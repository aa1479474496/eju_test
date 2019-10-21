<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <el-button type="primary" @click="del">删除</el-button>
    <Simple :loading="simpleLoading"></Simple>
    <el-button type="primary" @click="testSimple">测试simple</el-button>

    <transition name="slide-fade">
      <el-table :data="tableData" style="width: 100%" v-show="isExit">
        <el-table-column
          v-for="(item, index) in tableHead"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 'auto'"
        ></el-table-column>
      </el-table>
    </transition>
  </div>
</template>

  <script>
// import Simple from "@/components/simple.jsx";
export default {
  components: {
    // Simple
  },
  data() {
    return {
      simpleLoading: true,
      tableHead: [
        {
          prop: "date",
          label: "日期",
          width: 180
        },
        {
          prop: "name",
          label: "姓名",
          width: 180
        },
        {
          prop: "address",
          label: "地址"
        }
      ],

      addHead: { prop: "age", label: "年龄", width: 180 },
      isExit: true,

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          age: 11
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          age: 12
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          age: 13
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          age: 14
        }
      ]
    };
  },

  mounted() {
    console.log("$", $);
  },

  methods: {
    add() {
      let _self = this;
      $(".el-table")
        .css({
          visibility: "hidden"
        })
        .animate(
          {
            opacity: 0
          },
          100,
          function() {
            _self.tableHead.push(_self.addHead);
            setTimeout(() => {
              $(".el-table")
                .css({
                  visibility: "visible"
                })
                .animate({
                  opacity: 1
                });
            }, 100);
          }
        );
    },

    del() {
      this.tableHead.pop();
    },

    testSimple() {
        this.simpleLoading = false;
    }
  }
};
</script>

<style>
table {
  table-layout: fixed;
  transition: all 0.3s;
}

table.hide {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>