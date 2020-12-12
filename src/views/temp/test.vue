<template>
  <div class="home">
    <div style="text-align: center">
      <p>{{ title }}</p>
    </div>
    <game1></game1>
    <login />
  </div>
</template>

<script>
export default {
  components: { game1 },
  name: "home",
  data() {
    return {
      title: "登录页面",
    };
  },
  created() {
    this.startApi();
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
  width: 100%;
  height: 100%;
  line-height: 75px;
}
</style>