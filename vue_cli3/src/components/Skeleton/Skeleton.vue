<template>
  <div>
    <div class="layout_header">
      <div class="logo sk_animate"></div>
    </div>
    <div class="ske_box">
      <div class="ske_header">
        <span class="link active">
          <span class="line sk_animate"></span>
        </span>
        <span class="link">
          <span class="line sk_animate"></span>
        </span>
      </div>

      <div class="screen_box">
        <div class="left">
          <div class="ball_box">
            <div class="ball sk_animate" v-for="n in 4" :key="n"></div>
          </div>
        </div>

        <div class="middle">
          <div class="line sk_animate" v-for="n in 12" :key="n"></div>
        </div>

        <div class="right">
          <div class="square sk_animate"></div>
        </div>
      </div>

      <div class="table_box">
        <div class="header">
          <div class="line sk_animate"></div>
          <div class="line sk_animate" style="width: 220px;"></div>
        </div>

        <table>
          <thead>
            <th v-for="n in 10" :key="n">
              <div class="cell sk_animate"></div>
            </th>
          </thead>
          <tbody>
            <tr v-for="k in 3" :key="k">
              <td v-for="n in 10" :key="n">
                <div class="cell sk_animate"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: "skeleton"
};
</script>




<style lang="scss" scoped>
    
.sk_animate {
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: ske-loading 1.4s ease infinite;
}

@keyframes ske-loading {
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0 50%;
    }
}

.logo {
    width: 108px;
    height: 34px;
}

.layout_header {
    position: relative;
    display: flex;
    align-items: center;
    height: 60px;
    border-bottom: 1px solid #E0E0E0;
    background:#fff;

    .logo {
        position: absolute;
        left: 40px;
        top: 13px;
        width: 108px;
        height: 34px;
    }
}
.ske_box {
    width: 1080px;
    height: 100%;
    margin: 24px auto 0;
  
    .ske_header {
      background: #e8edf7;
  
      .link {
        position: relative;
        display: inline-block;
        width: 216px;
        text-align: center;
        height: 48px;
        padding-top: 12px;

        &.active {
            background: #fff;
        }
  
        &.active::before {
          content: "";
          position: absolute;
          left: 3px;
          right: 3px;
          top: 0;
          height: 2px;
          background: #409eff;
        }
        .line {
            display: inline-block;
            width: 65%;
            height: 24px;
        }
      }
    }
  }

  .screen_box {
        display: flex;
        align-items: center;
        height: 120px;
        background: #fff;

      .left {
        width: 432px;
        padding: 30px 46px;

        .ball_box {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .ball {
                width: 64px;
                height: 64px;
                border-radius: 50%;
            }
        }
      }

      .middle {
        position: relative;
        display: flex;
        flex: 1;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 30px 16px 16px 30px;
        &::before, &::after {
            content: '';
            position: absolute;
            top: 12px;
            bottom: 12px;
            width: 1px;
            background: #eee;
        }

        &::before {
            left: 0;
        }

        &::after {
            right: 0;
        }

        .line {
            margin-bottom: 12px;
            margin-right: 14px;
            width:72px;
            height:24px;
            border-radius:4px;
        }

      }

      .right {
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;

          .square {
            width:48px;
            height:48px;
            border-radius:4px;
          }
      }
      
  }

  .table_box {
      margin-top: 24px;
      padding: 0 8px 0 20px;
        background: #fff;

      .header {
          display: flex;
          height: 56px;
          align-items: center;
          justify-content: space-between;

          .line {
              width: 320px;
              height: 14px;
              border-radius: 4px;
          }
      }

      table {
          width: 100%;

          th, td {
              height: 56px;
              color: transparent;
          }

          .cell {
              width: 70%;
              height: 30%;
          }
      }
  }
</style>






