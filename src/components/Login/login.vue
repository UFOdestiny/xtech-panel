<template>
  <div class="login">
    <!-- 滑动验证码弹框 -->
    <!-- <el-dialog title="请完成安全验证" v-model="puzzePass.visible" width="340px">
      <div>
        <button @click="handleClick">刷新</button>
        <div>{{ msg }}</div>
      </div>
    </el-dialog> -->


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
          @keyup.enter="submitForm('LoginForm')">登陆
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { setCookie, getCookie, delCookie } from '@/utils/cookies.js'
import { userLogin } from '@/request/index.js'
// import { userInfo } from '@/request/user.js'
//import VerifyImg from '@/components/Login/captha.vue'
import AES from '@/utils/AES.js'

export default {
  name: 'LogIn',
  //components: { VerifyImg },
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


    }
  },

  created() {
    //enter登录
    var that = this
    document.onkeydown = function (e) {
      var key;
      if (window.event == undefined) {
        key = e.key
      } else {
        key = window.event.key
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

          //this.puzzePass.visible = true
          //this.codeImage()

          this.toLogin()
          //this.toLogin_test()
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

    toLogin_test() {
      this.loginLoading = true
      let _this = this
      _this.$router.push('/MainPage')
      _this.RememberPassword ? setCookie('userPwd', _this.LoginForm.password, 7) : delCookie('userPwd')
    },

    toLogin() {
      this.loginLoading = true
      let _this = this
      let obj = { username: AES.Encrypt(this.LoginForm.userName), password: AES.Encrypt(this.LoginForm.password) }
      // _this.$router.push('/kline')
      userLogin(obj)
        .then((result) => {
          if (result.code == 200) {
            this.loginLoading = false
            setCookie('result', JSON.stringify(result.data), 1)
            setCookie('userNamePwd', JSON.stringify(this.LoginForm), 1)

            //console.log(JSON.parse(getCookie("result")).token_type+' '+JSON.parse(getCookie("result")).access_token)

            _this.$router.push('/MainPage')

            // 请求用户信息
            // userInfo().then((res) => {
            //   setCookie('userPermission', JSON.stringify(res.data.permissionValueList))
            //   //传入账号名，密码，和保存天数3个参数
            //   setCookie('userNamePwd', JSON.stringify(this.LoginForm), 1)
            //   setCookie('userid', res.data.id, 7)
            //   _this.$router.push('/Home')
            // })

            //判断复选框是否被勾选 勾选则调用配置cookie方法
            //传入账号名，密码，和保存天数3个参数
            _this.RememberPassword ? setCookie('userPwd', _this.LoginForm.password, 7) : delCookie('userPwd')

          } else {
            this.loginLoading = false
          }
        })
        .catch(() => {
          this.$alert('登陆失败,请检查网络')
          this.loginLoading = false
        })
    },

    // 验证码拉动距离返回
    // onSuccess() {
    //   this.$refs.slideblock.handleSuccess()
    //   this.puzzePass.visible = false
    //   this.toLogin()
    // },

  },
}
</script>
<style lang="scss" scoped>
.login {
  margin-top: 20px;

  :deep(.el-form-item__content) {
    padding: 0px 38px 0 33px;
  }

  :deep(.el-input__inner) {
    border: 0;
  }

  :deep(.el-input) {
    border: 0;
    border-bottom: 1px solid #e5e7f0;
    width: 100%;
    margin: auto;
  }

  :deep(.el-form-item__error) {
    left: 33px;
  }

  :deep(.el-button--primary) {
    width: 320px;
    height: 40px;
    background: #43497b;
    border-radius: 5px;
    border-color: #43497b;
    margin-top: 30px;
  }

  :deep(.el-input-group__append,
    .el-input-group__prepend) {
    border: 0;
  }

  .remember-password {
    padding: 0px 38px 0 33px;

    :deep(.el-checkbox__input.is-checked+.el-checkbox__label) {
      color: #666666;
      font-weight: 400;
    }
  }
}

:deep(.v-modal) {
  display: none !important;
}
</style>
