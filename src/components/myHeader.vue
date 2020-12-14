<template>
  <div class="myHeader">
    <a-row>
      <a-col :span="13">
        <a-menu v-model="current" mode="horizontal" style="background: #ccffff;text-align:right">
          <a-menu-item key="app">
            <a href="#/"> <a-icon type="appstore" />9934小游戏 </a>
          </a-menu-item>
          <a-menu-item key="mail">
            <a
              href="mailto:17302010051@fudan.edu.cn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a-icon type="mail" />联系我们
            </a>
          </a-menu-item>
          <a-menu-item key="github">
            <a
              href="https://github.com/whisIS/gameWeb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <a-icon type="github" />加入我们
            </a>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :span="11">
        <div v-if="userName == null">
          <a-menu v-model="current" mode="horizontal" style="background: #ccffff;text-align: left">
            <a-menu-item key="login" @click="login">
              <a-icon type="login" />登录
            </a-menu-item>
            <a-menu-item key="signup" @click="sign">
              <a-icon type="user-add" />注册
            </a-menu-item>
          </a-menu>
        </div>
        <div v-else>
          <a-menu v-model="current" mode="horizontal" style="background: #ccffff;text-align: left">
            <a-sub-menu>
              <span slot="title" class="submenu-title-wrapper">
                <a-icon type="user" />{{ userName }}
              </span>
              <a-menu-item-group title="用户">
                <a-menu-item key="setting:1" @click="jumpUserInfo">
                  我的信息
                </a-menu-item>
                <a-menu-item key="setting:2"> 我的好友 </a-menu-item>
              </a-menu-item-group>
              <a-menu-item key="setting:4" @click="logout"> 登出 </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-col>
    </a-row>
    <a-modal
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="handleCancel"
      :footer="null"
    >
      <login :callback="loginSuccess" v-if="title == '登录'" />
      <sign :callback="signSuccess" v-if="title == '注册'" />
    </a-modal>
  </div>
</template>

<script>
import { getUserInfo, logout } from "../api/user";
export default {
  name: "myHeader",
  data() {
    return {
      current: [],
      userName: null,
      title: "登录",
      visible: false,
      confirmLoading: false,
    };
  },
  created() {
    this.check();
  },
  methods: {
    check() {
      getUserInfo()
        .then((res) => {
          if (res && res.result && res.userName) {
            this.userName = res.userName;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      this.title = "登录";
      this.visible = true;
    },
    sign() {
      this.title = "注册";
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
    },
    loginSuccess(name) {
      this.visible = false;
      this.userName = name;
    },
    signSuccess(name) {
      this.visible = false;
      this.userName = name;
    },
    logout() {
      this.userName = null;
      logout();
      window.location.hash = "#/";
    },
    jumpUserInfo() {
      window.location.hash = "#/user";
    },
  },
};
</script>

<style scoped>

</style>
