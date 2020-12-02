<template>
  <div  class="home">
    <div>
      <my-header></my-header>
    </div>
    ???????????
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/home/index.js";
import { logout } from "@/api/user/logout.js";
import myFooter from "../../components/myFooter.vue";
import MyHeader from "../../components/myHeader.vue";
export default {
  components: { myFooter, MyHeader },
  name: "home",
  data() {
    return {
      title: "web项目模板",
      userInfo:{
        usrName: "yanghui"
      }
    };
  },
  created() {
    // this.startApi();
  },
  methods: {
    startApi() {
      let params = {
        name: "lyk",
      };
      getDemo(params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  text-align: center;
  line-height: 30px;
  padding-bottom: 100px;
}
.gameCard {
  height: auto;
  width: auto;
}
</style>
