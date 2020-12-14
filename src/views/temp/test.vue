<template>
  <div class="home">
    <box></box>
    <tips></tips>
  </div>
</template>

<script>
import box from "../game/box/index";
import tips from "../game/box/tip";
export default {
  components: { box, tips },
  name: "home",
  data() {
    return {
      title: "登录页面",
    };
  },
  created() {
    sessionStorage.setItem("map","map1");
  },
  methods: {
    startApi() {
      this.$notification.open({
        message: "这是一条通知!",
        description: "这是描述内容！.",
        icon: <a-icon type="smile" style="color: #108ee9" />,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  position: relative;
  text-align: center;
  line-height: 30px;
  padding-bottom: 100px;
}
</style>