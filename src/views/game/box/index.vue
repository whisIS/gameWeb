<template>
  <div id="bpp">
    <div class="bpp" style="zoom:1.5">
      <h2>{{title}}</h2>
      <ul :style="{ width: width, height: height}">
        <li v-for="(li, index) in box" :class="li.class" :key="index"></li>
      </ul>
    </div>
  </div>
</template>
<script>
import map from "./map.json";
export default {
  props: {
    submitScore: Function
  },
  name: "bpp",
  data() {
    let str = sessionStorage.getItem("map") || "map1";
    return {
      str,
      box: [],
      title: "第1关",
      wall: map[str]["wall"],
      success: map[str]["success"],
      boxli: map[str]["boxli"],
      me: map[str]["me"],
      game: map[str]["game"],
      width: map[str]["width"],
      height: map[str]["height"],
      total: map[str]["num"],
      index: map[str]["index"],
      white: { class: "white" },
      gray: { class: "gray" },
      blue: { class: "blue" },
      yellow: { class: "yellow" },
      green: { class: "green" },
    };
  },
  methods: {
    changeMap(n) {
      let str = "map" + n;
      this.box = [];
      this.title = `第${n}关`;
      this.wall = map[str]["wall"];
      this.success = map[str]["success"];
      this.boxli = map[str]["boxli"];
      this.me = map[str]["me"];
      this.game = map[str]["game"];
      this.width = map[str]["width"];
      this.height = map[str]["height"];
      this.total = map[str]["num"];
      this.index = map[str]["index"];
      this.white = { class: "white" };
      this.gray = { class: "gray" };
      this.blue = { class: "blue" };
      this.yellow = { class: "yellow" };
      this.green = { class: "green" };
      this.render();
      this.$forceUpdate();
    },
    render() {
      this.box = [];
      for (var i = 0; i < this.game; i++) {
        if (this.wall.indexOf(i) != -1) {
          this.box.push(this.gray);
        } else if (this.boxli.indexOf(i) != -1) {
          this.box.push(this.yellow);
        } else if (this.success.indexOf(i) != -1) {
          this.box.push(this.blue);
        } else if (this.me.indexOf(i) != -1) {
          this.box.push(this.green);
        } else {
          this.box.push(this.white);
        }
      }
    },
    //判断是否前进的格子是墙
    testWall(index) {
      var num = this.me[0] + index;
      if (this.wall.indexOf(num) == -1 && this.boxli.indexOf(num) == -1) {
        this.me[0] = num;
      } else if (this.boxli.indexOf(num) != -1) {
        var boxIndex = this.boxli.indexOf(num);
        if (this.wall.indexOf(num + index) != -1) {
          this.me[0] = num - index;
        } else if (this.boxli.indexOf(num + index) != -1) {
          this.me[0] = num - index;
        } else {
          this.boxli.splice(boxIndex, 1, num + index);
          this.me[0] = num;
        }
      }
    },
    //判断胜利
    win() {
      var num = 0;
      for (var i = 0; i < this.total; i++) {
        if (this.success.indexOf(this.boxli[i]) != -1) {
          num++;
          if (num == this.total) {
            let str = sessionStorage.getItem("map") || "map1";
            if(str == "map1"){
              sessionStorage.setItem("map","map2");
              this.submitScore(100);
              this.changeMap(2)
            }else if(str == "map2"){
              sessionStorage.setItem("map","map3");
              this.submitScore(200);
              this.changeMap(3)
            }else{
              this.submitScore(300);
            }
          }
        } else {
          break;
        }
      }
    },
    //键盘上键的方法
    upGo() {
      this.testWall(this.index);
      this.render();
      setTimeout(() => {
        this.win();
      }, 1);
    },
    //键盘下键的方法
    downGo() {
      this.testWall(-this.index);
      this.render();
      setTimeout(() => {
        this.win();
      }, 1);
    },
    //键盘左键的方法
    leftGo() {
      this.testWall(-1);
      this.render();
      setTimeout(() => {
        this.win();
      }, 1);
    },
    //键盘右键的方法
    rightGo() {
      this.testWall(1);
      this.render();
      setTimeout(() => {
        this.win();
      }, 1);
    },
  },
  created() {
    this.render();
    let that = this;
    //使用全局键盘事件
    document.onkeyup = function ($event) {
      if ($event.keyCode == 87) {
        that.upGo();
      } else if ($event.keyCode == 83) {
        that.downGo();
      } else if ($event.keyCode == 65) {
        that.leftGo();
      } else if ($event.keyCode == 68) {
        that.rightGo();
      }
    };
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#bpp {
  display: flex;
  height: 100vh;
}

.bpp {
  margin: auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

li {
  list-style: none;
  width: 30px;
  height: 30px;
  float: left;
}

.white {
  background: white;
}

.gray {
  background: #333;
}

.blue {
  background: blue;
  border-radius: 80%;
}

.yellow {
  background: rgb(238, 204, 9);
}

.green {
  background: url("./role.png");
  background-size: contain;
}
</style>