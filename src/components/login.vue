<template>
  <div class="login">
    <div class="logo">B</div>
    <!-- <ul :model="loginForm" status-icon :rules="rules" ref="loginForm" >
            <li prop="pass">
                <em></em><input type="text" placeholder="帐号/邮箱/手机号">
            </li>
            <li>
                <em></em><input type="text" placeholder="请输入密码">
            </li>
    </ul>-->
    <el-form
      :label-position="labelPosition"
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="帐号" prop="loginName">
        <el-input
          type="text"
          v-model="loginForm.loginName"
          placeholder="用户名/邮箱/手机号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')">登录</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </el-form-item>
    </el-form>
    <!-- <div class="bts"><button @click="submitForm('loginForm')">登录</button></div> -->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateUserID = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      labelPosition: "top",
      loginForm: {
        loginName: "",
        password: ""
      },
      rules: {
        loginName: [{ required: true, message: "请输入帐号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = "/api/Account/Login";
          //let pars = { userid: 20, pageindex: 1 };
          that.$api.get(url, that.loginForm, data => {
            if (data.success) {
              let token = data.token;
              that.$store.commit("saveToken", token); //保存 token
              that.$router.replace(
                // that.$route.query.redirect ? that.$route.query.redirect : "/"
                that.$route.query.redirect ? that.$route.query.redirect : "/"
              );
            } else {
              console.log(data.msg);
            }
          });
        } else {
          console.log("请正确填写登录信息");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  padding: 6rem 3rem 0;
}
.login .logo {
  width: 12rem;
  height: 12rem;
  line-height: 12rem;
  display: block;
  color: #ffffff;
  font-size: 8rem;
  text-align: center;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 3rem;
  font-weight: bold;
  font-style: italic;
  text-shadow: 0 2px 2px #2169a7;
  background: -webkit-linear-gradient(
    top,
    #00c8d0,
    #0096ff
  ); /* Safari 5.1 - 6.0 */
  background: -moz-linear-gradient(
    top,
    #00c8d0,
    #0096ff
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom, #00c8d0, #0096ff); /* 标准的语法 */
}
.login >>> .el-form-item__label {
  line-height: 10px;
  margin: 0;
  font-size: 16px;
}
.el-form-item__content {
  text-align: center;
}
.el-form-item {
  margin: 0 0 30px;
}
.el-input__inner {
  border: none;
  border-bottom: 1px solid #eaeaea;
  border-radius: 0;
  padding: 0;
  font-size: 16px;
}
.el-button--primary span {
  font-size: 16px;
}
</style>
