<template>
  <div>
    <canvas id="canvas" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/home/index.js";
import { Game } from "./js/game.js";
import { _main, a } from "./js/main.js";
export default {
  name: "home",
  data() {
    return {
      title: "blockBreaker",
      images: {
          "background": require("./images/background.jpg"),
          "ball": require("./images/ball.png"),
          "block001": require("./images/block001.png"),
          "block002": require("./images/block002.png"),
          "paddle": require("./images/paddle.png"),
      }
    };
  },
  created() {
      
  },
  mounted() {
      _main.start(document.getElementById("canvas"), this.images);
  },
  methods: {
    startApi() {},
  },
};
</script>

<style lang='scss' scoped>
canvas{
  display: block;
  margin: 20px auto;
  border: 1px solid black;
  background: #d2b3b3;
}
</style>