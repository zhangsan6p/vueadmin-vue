<template>
  <!--导航菜单开始-->
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <router-link to="/index">
        <el-menu-item index="0">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
      </router-link>

      <el-submenu :index="menu.name" v-for="menu in menuList" :key="menu.path">

        <template slot="title">
          <i :class="menu.ic"></i>
          <span>{{menu.title}}</span>
        </template>

        <router-link :to="item.path" v-for="item in menu.children" :key="item.path">
          <el-menu-item :index="item.name" @click="clickMenuA(item)">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
          </el-menu-item>
        </router-link>
      </el-submenu>
    </el-menu>
  </el-aside>
  <!--导航菜单结束-->
</template>

<script>


export default {
  name: "SideMenu",
  data(){
    return{

    }
  },
  computed:{
    menuList:{
      get(){
        return this.$store.state.menus.menuList
      }
    }
  },
  methods:{
    clickMenuA(itme){
      this.$store.commit('clickMenuS',itme)
    }
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.el-menu-vertical-demo{
  height: 100%;
}

</style>