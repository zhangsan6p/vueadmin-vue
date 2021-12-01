import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default ({
  state: {
    menuList: [],
    permList: [],

    //当前选修卡
    editableTabsValue: '2',
    //选项卡数据域
    editableTabs: [

    ],

    hasRoute: false
  },
  mutations: {
    setMenuList(state, menus) {
      state.menuList = menus
    },
    setPermList(state, perms) {
      state.permList = perms
    },
    changeRouteStatus(state,hasRoute){
      state.hasRoute = hasRoute
    },
    clickMenuS(state,val) {
      //1.判断当前点中菜单是否在tabs里面
      let res = state.editableTabs.findIndex(item => item.name===val.name)
      //2.如果不存在,组织tabs数据存放在editableTabs
      if (res === -1){
        let tab = {}
        tab.title=val.title
        tab.name=val.name
        state.editableTabs.push(tab)
      }
      //构造标签页
      //3.设置当前选择的选项卡
      state.editableTabsValue = val.name
      //4.把当前选中的选修卡放入sessionStorage的选项卡
      sessionStorage.setItem('tabsList',JSON.stringify(state.editableTabsValue))
    }
  },
  actions: {}
});
