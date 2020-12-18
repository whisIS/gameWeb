<template>
  <div>
    <canvas id="canvas" width="1000" height="500" style="zoom: 0.88;"></canvas>
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/index.js";
import { Game } from "./js/game.js";
import { _main, a } from "./js/main.js";
export default {
  props: {
    submitScore: Function
  },
  name: "home",
  data() {
    return {
      title: "blockBreaker",
      score: 0,
      flagOver: false,
      images: {
        background: require("./images/background.jpg"),
        ball: require("./images/ball.png"),
        block001: require("./images/block001.png"),
        block002: require("./images/block002.png"),
        paddle: require("./images/paddle.png"),
      },
    };
  },
  created() {},
  mounted() {
    document.body.onkeydown = function(event) {
      var e = window.event || event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
    };
    _main.start(document.getElementById("canvas"), this.images);
    clearInterval(this.timeId);
    var that = this;
    this.timeId = setInterval(function() {
      this.score = _main.score.allScore;
      if (!this.flagOver) {
        if (_main.game.state == 4 || _main.game.state == 5) {
          this.flagOver = true;
          /* TODO:
            调用接口保存分数
          */
          if(this.score>0){
            that.submitScore(this.score);
          }
        }
      }else{
        if(_main.game.state == 1 || _main.game.state == 2){
          this.flagOver = false;
        }
      }
      
    }, 1000);
  },
  methods: {
    startApi() {},
  },
};
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  margin: 20px auto;
  border: 1px solid black;
  background: #d2b3b3;
}
</style>
