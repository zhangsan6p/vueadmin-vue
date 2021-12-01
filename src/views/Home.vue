<template>
  <el-container>



    <!--导航菜单开始-->
    <SideMenu></SideMenu>
    <!--导航菜单结束-->


    <el-container>
      <!--页面头开始-->
      <el-header>
        <strong>VueAdmin后台管理系统</strong>

        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>

          <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{name:'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://element.eleme.cn/2.15/#/zh-CN/component/dropdown" target="_blank">网站</el-link>
          <el-link href="https://space.bilibili.com/431350256" target="_blank">b站</el-link>
        </div>

      </el-header>
      <!--页面头结束-->

      <el-main style="padding: 0px;line-height: 0px">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>

    </el-container>


  </el-container>
</template>

<script>
import SideMenu from "@/views/inc/SideMenu";
import Tabs from "@/views/inc/Tabs";
export default {
  name: "Home",
  data(){
    return{
      userInfo:{
        id:"",
        username:"",
        avatar:""
      }
    }
  },
  created() {
    this.getUserInfo();
  },
  methods:{
    //获取用户信息
    getUserInfo(){
      this.$axios({
        url:'/sys/userInfo',
        method:'get'
      })
      .then(response => {
        this.userInfo = response.data.data
      })
    },

    //退出
    logout(){
        this.$axios({
          url:'/logout',
          method:'post'
        })
        .then(response => {
          console.log(response)
          localStorage.clear()
          sessionStorage.clear()

          this.$store.commit('resetState')

          this.$router.push({
            path:'/login'
          })
        })
    }
  },
  components:{
    SideMenu,
    Tabs
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
}

.el-dropdown-link {
  cursor: pointer;
}

.header-avatar{
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.el-header{
  background-color: #17B3A3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>