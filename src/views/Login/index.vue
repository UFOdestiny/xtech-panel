<template>
  <div class="user_defined_id">
    <vue-particles class="particles-js" color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle"
      :particleSize="4" linesColor="#dedede" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
      :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="matter">
      <div class="matter_right">
        <div class="company_name">
          <h1>交叉科技</h1>
        </div>
        <div class="matter_right_table">
          <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="1">
              <my-login />
            </el-tab-pane>
            <!-- <el-tab-pane label="注册" name="2">
                            <register @toggle="activeName = '1'" />
                        </el-tab-pane> -->
          </el-tabs>
          <div class="WelcomeTo">
            <span class="WelcomeTo_border"></span>
            <span class="WelcomeTo_text">欢迎来到交叉科技</span>
            <span class="WelcomeTo_border"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 注册组件
//import register from '@/components/Login/register'
import MyLogin from '@/components/Login/login'
export default {
  name: 'user_defined_id',
  components: {
//    register,
    MyLogin,
  },
  data() {
    return {
      activeName: '1',
    }
  },
  mounted() { },
}
</script>
<style lang="scss" scoped>
.user_defined_id {
  width: 100%;
  height: 100%;

  .matter {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    .matter_right {
      position: relative;
      width: 390px;
      height: 600px;
      background-color: #fff;
      box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
      border-radius: 15px;
      // top: 20%;
      /*偏移*/
      // left: 0;
      // right: 0;
      // transform: translateY(-50%);
      margin: 0 auto;
      // z-index: 2001;

      .company_name {
        position: relative;
        padding: 20px 0 10px 0;

        h1 {
          position: absolute;
          left: 0;
          right: 0;
          top: -50px;
          font-size: 20px;
          text-align: center;
          display: block;
          color: #ebeef5;
        }
      }

      :deep(.el-tabs__header) {
        padding-left: 50px;
      }

      :deep(.el-tabs__active-bar) {
        background-color: #202747;
        //  background-color: #ffffff;
      }

      :deep(.el-tabs__nav-wrap::after) {
        // height: 1px;
        background-color: transparent;
      }

      :deep(.el-tabs__item.is-active) {
        color: #333333;
        font-weight: 500;
        font-size: 18px;
      }

      :deep(.el-tabs__item) {
        color: #333333;
        font-weight: 400;
        font-size: 18px;
        width: 80px;
        padding: 0;
        text-align: center;
      }

      .WelcomeTo {
        position: absolute;
        bottom: 40px;
        left: 0;
        right: 0;
        width: 90%;
        margin: auto;

        .WelcomeTo_text {
          font-size: 13px;
          color: #43497b;
          //  color: #ffffff;
          padding: 0px 17px 0 17px;
          vertical-align: middle;
        }

        .WelcomeTo_border {
          width: 95px;
          height: 1px;
          vertical-align: middle;
          display: inline-block;
          background-color: #e5e7f0;
        }
      }
    }
  }
}

html,
body {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  width: 100%;
  height: 100%;
  background: #111;
}

.apImgTitle {
  position: fixed;
  width: 42%;
  left: 30%;
  top: 30%;
}

.apTitle {
  font-size: 40px;
  color: #fff;
  position: fixed;
  top: 32%;
  width: 100%;
  text-align: center;
}

.logcon {
  position: fixed;
  width: 100%;
  top: 47%;
  text-align: center;
}

.logcon input {
  padding: 10px 15px;
  border-radius: 3px;
  border: none;
  margin-right: 10px;
  width: 220px;
}

.logcon button {
  padding: 7px 20px 10px 20px;
  border: none;
  background: #fff;
  border-radius: 3px;
}

.logcon button:hover {
  cursor: pointer;
}

.particles-js {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/login_background.png');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
