<template>
  <div class="home">
    <p>{{title}}</p>
    <component-demo />
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/home/index.js";
export default {
  name: "home",
  data() {
    return {
      title: "web项目模板"
    };
  },
  created() {
    // this.startApi();
  },
  methods: {
    startApi() {
      let params = {
        name: "lyk"
      };
      getDemo(params)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 30px;
}
</style>