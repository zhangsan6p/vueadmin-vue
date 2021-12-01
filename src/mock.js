// 使用 Mock 引用对象
const Mock = require("mockjs");

const random = Mock.Random;

//模拟后端json数据
// code msg data
let Result = {
  code: 200,
  msg: "登录成功",
  data: null
};

Mock.mock("/captcha", "get", () => {
  Result.data = {
    token: random.string(32),
    captchaImg: random.dataImage("120x40", "p7n5w")
  };

  return Result;
});

Mock.mock("/login", "post", () => {
  Result.code = 200;
  Result.msg = "";
  return Result;
});

/*用户登录信息*/
Mock.mock("/sys/userInfo", "get", () => {
  Result.data = {
    id: "1",
    username: "张三",
    avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
  };
  return Result;
});

/*退出登录*/
Mock.mock("/logout", "post", () => {

  return Result;
});
/*获取权限信息*/
Mock.mock("/sys/menu/nav", "get", () => {
  let nav = [
    {
      name: "SysManga",
      title: "系统管理",
      icon: "el-icon-s-operation",
      path: "",
      component: "",
      children: [
        {
          name: "SysUser",
          title: "用户管理",
          icon: "el-icon-s-custom",
          path: "/sys/users",
          component: "sys/User",
          children: []
        }
      ]
    },
    {
      name: "SysTools",
      title: "系统工具",
      icon: "el-icon-s-tools",
      path: "",
      component: "",
      children: [
        {
          name: "SysDict",
          title: "数字字典",
          icon: "el-icon-s-order",
          path: "/sys/dicts",
          component: "sys/System",
          children: []
        }
      ]
   }
]
  // 权限数据
  let authoritys = [];

  Result.data = {};
  Result.data.nav = nav;
  Result.data.authoritys = authoritys;
  return Result;
});

