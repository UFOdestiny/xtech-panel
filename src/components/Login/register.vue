<template>
    <div class="register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="nickname">
                <el-input v-model="ruleForm.nickname" autocomplete="off" placeholder="输入用户名"></el-input>
            </el-form-item>

            <!--   <el-form-item prop="email" :rules="[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ]"> -->
            <el-form-item prop="mobile">
                <el-input v-model="ruleForm.mobile" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="verificationCode">
                <el-input placeholder="输入7位验证码" v-model="ruleForm.verificationCode" class="input-with-select"
                    autocomplete="off">
                    <el-button slot="append" v-show="show" @click="getCode('ruleForm')">获取验证码</el-button>
                    <el-button slot="append" v-show="!show">{{ count }}s后重新获取</el-button>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    userRegister,
    register
} from "@/request/index";
export default {
    name: "register",
    data() {
        var validatePass = (rule, value, callback) => {
            var num = value.replace(/[^\x00-\xff]/g, "xx").length;
            if (value === "" || num < 8) {
                callback(new Error("请输入8位数密码"));
            } else {
                if (this.ruleForm.checkPass !== "") {
                    this.$refs.ruleForm.validateField("checkPass");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error("😱两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        var nickname = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("😊请输入用户名"));
            } else {
                callback();
            }
        };
        // var verificationCode = (rule, value, callback) => {
        //   if (value === "") {
        //     callback(new Error("请输入验证码"));
        //   } else {
        //     callback();
        //   }
        // };
        return {
            show: true,
            count: "",
            timer: null,
            ruleForm: {
                nickname: "",
                mobile: "",
                pass: "",
                checkPass: "",
                verificationCode: "",
            },
            rules: {
                pass: [{
                    validator: validatePass,
                    trigger: "blur"
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: "blur"
                }],
                nickname: [{
                    validator: nickname,
                    trigger: "blur"
                }],
                // verificationCode: [{ validator: verificationCode, trigger: "blur" }],
            },
        };
    },
    methods: {
        //获取验证码
        getCode(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const TIME_COUNT = 60;
                    userRegister({
                        email: this.ruleForm.email,
                        nickname: this.ruleForm.nickname,
                        password: this.ruleForm.checkPass,
                    }).then((result) => {
                        // console.log(result);
                        if (result.status == 772) {
                            this.$alert(result.errorMessage);
                        } else {
                            if (!this.timer) {
                                this.count = TIME_COUNT;
                                this.show = false;
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= TIME_COUNT) {
                                        this.count--;
                                    } else {
                                        this.show = true;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000);
                            }
                        }
                    });
                }
            });
        },
        //注册按钮
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    register({
                        code: "123456",
                        mobile: this.ruleForm.mobile,
                        username: this.ruleForm.nickname,
                        password: this.ruleForm.checkPass,
                    }).then((result) => {
                        if (result.code == 500) {
                            this.$alert("注册失败");
                            this.$emit("toggle");
                        } else {
                            this.$alert("注册成功");
                            this.$emit("toggle");
                        }
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.register {
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
        left: 45px;
    }

    /deep/ .el-button--primary {
        width: 320px;
        height: 40px;
        background: #43497b;
        border-radius: 5px;
        border-color: #43497b;
        margin-top: 40px;
    }

    /deep/.el-input-group__append,
    .el-input-group__prepend {
        border: 0;
    }

    /deep/.el-button+.el-button {
        margin-left: 0;
    }
}
</style>
