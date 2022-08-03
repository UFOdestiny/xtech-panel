<template>
  <div class="login">
    <!-- 滑动验证码弹框 -->
    <el-dialog title="请完成安全验证" :visible.sync="puzzePass.visible" width="340px">
      <div>
        <VerifyImg :l="42" ref="dialogopen" :r="10" :w="300" :h="150" :sh="puzzePass.minheight" :sw="puzzePass.minwidth"
          :block_y="puzzePass.block_y" :imgurl="puzzePass.imgurl" :miniimgurl="puzzePass.miniimgurl"
          v-loading="puzzePass.loading" @success="onSuccess" @fail="onFail" @refresh="onRefresh"
          :slider-text="puzzePass.text"></VerifyImg>
      </div>
    </el-dialog>
    <el-form :model="LoginForm" :rules="rules" ref="LoginForm" class="demo-ruleForm">
      <el-form-item prop="userName">
        <el-input v-model="LoginForm.userName" autocomplete="off" placeholder="输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="LoginForm.password" autocomplete="off" placeholder="输入密码"></el-input>
      </el-form-item>
      <div class="remember-password">
        <el-checkbox v-model="RememberPassword">记住我</el-checkbox>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('LoginForm')" :loading="loginLoading"
          @keyup.enter.native="submitForm()">登陆</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="third-party">
      <el-divider><span class="divider">第三方账号登录</span></el-divider>
      <div class="loginWay">
        <img src="@/assets/svg/weixin.svg" class="svgImg" />
      </div>
    </div> -->
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from '@/utils/cookies.js'
import { userLogin, getMemberInfo } from '@/request/index'
import { userInfo, getImageVerifyCode, verifyImageVerifyCode } from '@/request/user'
import VerifyImg from './captha.vue'
// import dragVerifyImgChip from "@/components/dragVerifyImgChip";
export default {
  name: 'login',
  components: { VerifyImg },
  data() {
    let password = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    let userName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginLoading: false,
      LoginForm: {
        userName: '',
        password: '',
      },
      rules: {
        userName: [
          {
            validator: userName,
            trigger: 'blur',
          },
        ],
        password: [
          {
            validator: password,
            trigger: 'blur',
          },
        ],
      },
      userToken: '',
      RememberPassword: false,

      // 滑块字段
      puzzePass: {
        visible: false,
        loading: false,
        block_y: 20,
        minwidth: 60,
        minheight: 60,
        imgurl: '',
        miniimgurl: '',
        text: '向右拖动滑块填充拼图',
        chenckMoveid: '',
      },
    }
  },

  created() {
    //enter登录
    var that = this
    document.onkeydown = function (e) {
      if (window.event == undefined) {
        var key = e.keyCode
      } else {
        var key = window.event.keyCode
      }
      if (key == 13) {
        that.submitForm('LoginForm')
      }
    }
  },
  mounted() {
    //页面加载调用获取cookie值
    this.getCookievalue()
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.puzzePass.visible = true
          this.codeImage()
        }
      })
    },
    //读取cookie
    getCookievalue() {
      if (getCookie('result') || getCookie('userPwd')) {
        if (JSON.parse(getCookie('userNamePwd')) !== null && JSON.parse(getCookie('userNamePwd')) !== '{}') {
          this.LoginForm.userName = JSON.parse(getCookie('userNamePwd')).userName
          this.LoginForm.password = JSON.parse(getCookie('userNamePwd')).password
        }
      }
    },

    toLogin() {
      this.loginLoading = true
      let _this = this
      let obj = { username: this.LoginForm.userName, password: this.LoginForm.password }
      userLogin(obj)
        .then((result) => {
          if (result.code == 200) {
            this.loginLoading = false
            setCookie('result', JSON.stringify(result.data), 1)
            //请求用户信息
            userInfo().then((res) => {
              setCookie('userPermission', JSON.stringify(res.data.permissionValueList))
              //传入账号名，密码，和保存天数3个参数
              setCookie('userNamePwd', JSON.stringify(this.LoginForm), 1)
              setCookie('userid', res.data.id, 7)
              _this.$router.push('/Home')
            })
            //判断复选框是否被勾选 勾选则调用配置cookie方法
            //传入账号名，密码，和保存天数3个参数
            _this.RememberPassword ? setCookie('userPwd', _this.LoginForm.password, 7) : delCookie('userPwd')
          } else {
            this.puzzePass.imgurl = ''
            this.puzzePass.miniimgurl = ''
            this.loginLoading = false
          }
        })
        .catch((error) => {
          this.$alert('登陆失败,请检查网络')
          this.puzzePass.imgurl = ''
          this.puzzePass.miniimgurl = ''
          this.loginLoading = false
        })
    },
    // 获取拼图图片 位置
    codeImage() {
      this.puzzePass.loading = true
      getImageVerifyCode().then((res) => {
        var imgobj = JSON.parse(res.data)
        this.puzzePass.minwidth = imgobj.templateWidth
        this.puzzePass.minheight = imgobj.templateHeight
        this.puzzePass.block_y = imgobj.yHeight
        this.puzzePass.imgurl = 'data:image/png;base64,' + imgobj.bigImage
        this.puzzePass.miniimgurl = 'data:image/png;base64,' + imgobj.smallImage
        this.puzzePass.chenckMoveid = imgobj.chenckMoveid
        this.$refs.dialogopen && this.$refs.dialogopen.reset(this.puzzePass.block_y)
        this.puzzePass.loading = false
      })
    },

    // toLogin() {
    //   this.loginLoading = true
    //   let _this = this
    //   let obj = { username: this.LoginForm.userName, password: this.LoginForm.password }
    //   userLogin(obj)
    //     .then((result) => {
    //       if (result.code == 200) {
    //         this.loginLoading = false
    //         setCookie('result', JSON.stringify(result.data.token), 1)
    //         //请求用户信息
    //         userInfo().then((res) => {
    //           console.log(res)
    //           setCookie('userPermission', JSON.stringify(res.data.permissionValueList))
    //           //传入账号名，密码，和保存天数3个参数
    //           setCookie('userNamePwd', JSON.stringify(this.LoginForm), 1)
    //           setCookie('userid', res.data.id, 7)
    //           _this.$router.push('/Home')
    //         })

    //         //判断复选框是否被勾选 勾选则调用配置cookie方法
    //         //传入账号名，密码，和保存天数3个参数
    //         _this.RememberPassword ? setCookie('userPwd', _this.LoginForm.password, 7) : delCookie('userPwd')
    //       } else {
    //         this.puzzePass.imgurl = ''
    //         this.puzzePass.miniimgurl = ''
    //         this.loginLoading = false
    //       }
    //     })
    //     .catch((error) => {
    //       this.$alert('登陆失败,请检查网络')
    //       this.puzzePass.imgurl = ''
    //       this.puzzePass.miniimgurl = ''
    //       this.loginLoading = false
    //     })
    // },

    // 验证码拉动距离返回
    onSuccess(left) {
      verifyImageVerifyCode({ chenckMoveid: this.puzzePass.chenckMoveid, x_index: left }).then((res) => {
        if (res.code == 200) {
          this.$refs.dialogopen.handleSuccess()
          this.puzzePass.visible = false
          this.toLogin()
        } else {
          this.onRefresh()
          this.$refs.dialogopen.handleFail()
        }
      })
    },

    // 刷新验证码
    onRefresh() {
      this.puzzePass.imgurl = ''
      this.puzzePass.miniimgurl = ''
      this.codeImage()
    },

    onFail() { },
  },
}
</script>
<style lang="scss" scoped>
.login {
  margin-top: 20px;

  /deep/.el-form-item__content {
    padding: 0px 38px 0 33px;
  }

  /deep/.el-input__inner {
    border: 0;
  }

  /deep/.el-input {
    border: 0;
    border-bottom: 1px solid #e5e7f0;
    width: 100%;
    margin: auto;
  }

  /deep/ .el-form-item__error {
    left: 33px;
  }

  /deep/ .el-button--primary {
    width: 320px;
    height: 40px;
    background: #43497b;
    border-radius: 5px;
    border-color: #43497b;
    margin-top: 30px;
  }

  /deep/.el-input-group__append,
  .el-input-group__prepend {
    border: 0;
  }

  .remember-password {
    padding: 0px 38px 0 33px;

    /deep/.el-checkbox__input.is-checked+.el-checkbox__label {
      color: #666666;
      font-weight: 400;
    }
  }

  //第三方账号登陆
  .third-party {
    width: 320px;
    margin: auto;
    margin-top: 40px;

    .divider {
      color: #666666;
      font-weight: 400;
    }

    .loginWay {
      width: 30px;
      padding-top: 20px;
      margin: auto;

      .svgImg {
        width: 30px;
        height: 30px;
      }
    }
  }
}

/deep/.v-modal {
  display: none !important;
}
</style>
