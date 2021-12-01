<template>
  <div>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <h2>欢迎来到权限后台管理系统</h2>
          <el-image :src="require('@/assets/img.png')" style="height: 180px;width: 180px"></el-image>
          <p>公众号 MarkerHub</p>
          <p>扫码二维码，回复【 VueAdmin 】获取登录密码</p>
        </div>
      </el-col>

      <el-col :span="1">
        <div class="grid-content bg-purple-light">
          <el-divider direction="vertical"></el-divider>
        </div>
      </el-col>

      <el-col :xl="6" :lg="7">
        <!--ref获取dom元素-->
        <el-form label-position="right" :rules="rules" label-width="80px" :model="loginForm" ref="loginForm">
          <el-form-item label="用户名" prop="username" style="width: 380px;">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px;">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px;">
            <el-input v-model="loginForm.code" style="width: 172px; float: left;" maxlength="5"></el-input>
            <el-image class="captchaImg" :src="captchaImg"></el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="getPass">获取密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "markerhub",
        code: "11111",
        token: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "验证码为5个字符", trigger: "blur" }
        ]
      },
      captchaImg: ""
    };
  },
  methods: {
    submitForm(loginForm){
      this.$refs[loginForm].validate((valid) =>{
          if (valid){
            this.$axios({//登录请求
              url:`/login`,
              method:"post",
              data:this.loginForm
            })
            .then(response =>{//登录成功
              //获取jwt
              const jwt = response.headers['authorization']

              //将jwt放入state中
              this.$store.commit('SET_TOKEN',jwt)

              //页面跳转
              this.$router.push({
                path:'/index'
              })
            })

          }else {
            console.log('error submit')
            return false;
          }
      })
    },
    getPass(){

    },
    getCaptcha(){//获取验证图片base64编码,
                //获取随机码的值
      this.$axios({
        url:`/captcha`,
        method:'get'
      }).then(response =>{//请求成功
        console.log(response)
        this.loginForm.token = response.data.data.token
        this.captchaImg = response.data.data.captchaImg
      })
    }
  },
  created() {
    this.getCaptcha()
  }
};
</script>

<style scoped>
.el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.el-row {
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
}

.el-divider {
  height: 200px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>