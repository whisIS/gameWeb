<template>
  <div class="home">
    <div style="text-align: center">
      <p>{{ title }}</p>
    </div>
    <login />
  </div>
</template>

<script>
export default {
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
    startApi() {},
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