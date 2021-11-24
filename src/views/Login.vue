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

      <el-col :span="6">
        <el-form ref="loginForm" :model="loginForm" label-width="80px" >
          <el-form-item label="用户名" :rules="[{required: true, message: '请输入用户名', trigger: 'blur'}, {validator: checkPhone, trigger: 'blur'}]">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" :rules="[{required: true, message: '请输入密码', trigger: 'blur'}]">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" :rules="[ {required: true, message: '请输入验证码', trigger: 'blur'},{min: 5, max: 5, message: '验证码为5个字符', trigger: 'blur'}]">
            <el-input v-model="loginForm.code"></el-input>
            <el-image src=""></el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
        username: '',
        password: '',
        code: ''
      },
      captchaImg: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    checkPhone (rule, value, callback) {
      //debugger
      if (!(('/^[a-zA-Z0-9_-]{4,16}$/').test(value))) {
        return callback(new Error('邮箱格式不正确'))
      }
      return callback()
    }
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