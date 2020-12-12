<style scoped>
#wrap {
  width: 100%;
  text-align: center;
}
.wrap-ul {
  display: inline-block;
}
ul {
  font-size: 0;
  padding-left: 0;
  height: 30px;
}
li {
  list-style: none;
}
.class-box {
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  margin: 1px;
  text-align: center;
  font-size: 12px;
}
.color-normal {
  background: #eee;
}
.color-blank {
  background: #000;
}
#gameBox {
  padding: 10px;
  text-align: right;
}
#infoBox {
  padding: 10px;
  text-align: left;
}
</style>
<template>
  <div id="wrap">
    <a-row>
      <a-col :span="16" id="gameBox">
        <ul class="wrap-ul">
          <li v-for="(rows, index) in tetrisArray" :key="index">
            <ul v-if="index > 0">
              <li
                v-for="(col, index) in rows"
                :key="index"
                class="class-box color-normal"
                :class="[col.active || col.static ? colorClass : '']"
              ></li>
            </ul>
          </li>
        </ul>
      </a-col>
      <a-col :span="8" id="infoBox">
        <h1>NEXT</h1>
        <ul class="wrap-ul">
          <li v-for="(rows, index) in nextShape" :key="index">
            <ul>
              <li
                v-for="(col, index) in rows"
                :key="index"
                class="class-box color-normal"
                :class="[col == 1 ? colorClass : '']"
              ></li>
            </ul>
          </li>
        </ul>
        <br />
        <h2>POINT</h2>
        <h3 style="color: #00a1d6;font-size: 20px;">{{ score }}</h3>
        <br />
        <div style="color: #066381">
          W: 旋转方块<br />
          A,D: 移动方块<br />
          S: 加速下降<br />
          SPACE:落到底部<br />
          P: 暂停游戏
        </div>
        <br />
        <a-button
          type="primary"
          @click="newGame"
          style="selectable: false;"
          id="btnew"
        >
          New Game
        </a-button>
        <h3 style="color:red;padding: 5px;" v-if="flagStop">
          暂停中
        </h3>
        <h3 style="padding: 5px;" v-if="flagOver">
          点击开始游戏
        </h3>   
      </a-col>
    </a-row>
  </div>
</template>
<script>
import index from "../../home/index.vue";
export default {
  components: { index },
  data: function() {
    return {
      score: 0,
      shapesArray: [
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ],
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 0],
          [0, 0, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
        ],
        [
          [1, 1, 0, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 1],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        [
          [0, 0, 1, 0],
          [0, 1, 1, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 0],
        ],
      ],
      nextShape: [],
      shapeArray: [],
      px: 3,
      py: 0,
      tetrisArray: [],
      colorClass: "color-blank",
      colcount: 10,
      rowcount: 18 + 1,
      timeId1: "",
      timeId2: "",
      flagStop: false,
      flagOver: true,
      speed: 600,
    };
  },
  mounted: function() {
    document.body.onkeydown = function(event) {
      var e = window.event || event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
    };
    this.init();
  },
  methods: {
    // 随机生成一个俄罗斯方块数组
    randomShape: function() {
      this.shapeArray =
        this.nextShape.length == 0
          ? this.shapesArray[parseInt(Math.random() * 7)]
          : this.nextShape;
      this.nextShape = this.shapesArray[parseInt(Math.random() * 7)];
    },
    // 初始化
    create: function() {
      if (!this.tetrisArray.length) {
        for (var i = 0; i < this.rowcount; i++) {
          var tempArray = [];
          for (var j = 0; j < this.colcount; j++) {
            tempArray.push({ active: 0, static: 0 });
          }
          this.tetrisArray.push(tempArray);
        }
      }
    },
    // 显示俄罗斯方块
    show: function() {
      for (var i = 0; i < this.tetrisArray.length; i++) {
        for (var j = 0; j < this.tetrisArray[i].length; j++) {
          if (this.tetrisArray[i][j].active) {
            this.tetrisArray[i][j].active = 0;
          }
        }
      }
      for (var i = 0; i < this.shapeArray.length; i++) {
        for (var j = 0; j < this.shapeArray[i].length; j++) {
          if (this.shapeArray[i][j]) {
            this.tetrisArray[this.py + i][this.px + j].active = 1;
          }
        }
      }
    },
    // 检测是否碰壁
    check: function(x, y, _shapeArray) {
      for (var i = 0; i < _shapeArray.length; i++) {
        for (var j = 0; j < _shapeArray[i].length; j++) {
          if (_shapeArray[i][j]) {
            if (
              y + i > this.rowcount - 1 ||
              x + j > this.colcount - 1 ||
              x + j < 0 ||
              this.tetrisArray[y + i][x + j].static
            )
              return false;
          }
        }
      }
      return true;
    },
    //  删除某行
    delete: function(line) {
      for (var j = 0; j < this.tetrisArray[line].length; j++) {
        this.tetrisArray[line][j].static = 0;
      }
      for (var i = line; i > 0; i--) {
        for (var j = 0; j < this.tetrisArray[i].length; j++) {
          this.tetrisArray[i][j].static = this.tetrisArray[i - 1][j].static;
        }
      }
      this.score += 100;
    },
    //  检测是否满行
    preDelete: function() {
      for (var i = 0; i < this.tetrisArray.length; i++) {
        var count = 0;
        for (var j = 0; j < this.tetrisArray[i].length; j++) {
          if (!this.tetrisArray[i][j].static) {
            break;
          }
          count++;
        }
        if (count == this.tetrisArray[i].length) {
          this.delete(i);
        }
      }
    },
    // 游戏是否结束
    isOver: function() {
      for (var i = 0; i < this.tetrisArray[0].length; i++) {
        if (this.tetrisArray[0][i].static == 1) {
          return true;
        }
      }
      return false;
    },
    // 固定方块
    fix: function() {
      for (var i = 0; i < this.tetrisArray.length; i++) {
        for (var j = 0; j < this.tetrisArray[i].length; j++) {
          if (this.tetrisArray[i][j].active) {
            this.tetrisArray[i][j].active = 0;
            this.tetrisArray[i][j].static = 1;
          }
        }
      }
      this.preDelete();
    },
    // 移动方块
    move: function(a, b) {
      if (this.flagStop || this.flagOver) return;
      var _px = this.px + a;
      var _py = this.py + b;
      if (this.check(_px, _py, this.shapeArray)) {
        this.px = _px;
        this.py = _py;
        this.show();
      } else {
        if (b == 0) return;
        if (this.isOver()) {
          this.flagOver = true;
          console.log(this.score)
          /* TODO:
            调用接口保存分数
          */
        }
        this.fix();
        this.px = 3;
        this.py = 0;
        this.randomShape();
        this.show();
        clearInterval(this.timeId2);
      }
    },
    // 旋转方块
    rotate: function() {
      if (this.flagStop || this.flagOver) return;
      var newShapeArray = [];
      for (var i = 0; i < this.shapeArray[0].length; i++) {
        var tempArray = [];
        for (var j = 0; j < this.shapeArray.length; j++) {
          tempArray.push(0);
        }
        newShapeArray.push(tempArray);
      }
      for (var i = 0; i < this.shapeArray.length; i++) {
        for (var j = 0; j < this.shapeArray[i].length; j++) {
          newShapeArray[this.shapeArray.length - 1 - j][i] = this.shapeArray[i][
            j
          ];
        }
      }
      if (this.check(this.px, this.py, newShapeArray)) {
        this.shapeArray = newShapeArray;
        this.show();
      }
    },
    // 快降
    quickDown: function() {
      var that = this;
      clearInterval(this.timeId2);
      this.timeId2 = setInterval(function() {
        that.move(0, 1);
      }, 0);
    },
    // 重新开始
    newGame: function() {
      this.nextShape = [];
      this.shapeArray = [];
      this.tetrisArray = [];
      this.score = 0;
      (this.px = 3), (this.py = 0), (this.flagStop = false);
      this.flagOver = false;
      this.init();
      document.getElementById("btnew").blur();
    },
    // 绑定事件
    bindEvents: function(x) {
      var that = this;
      document.onkeydown = function(e) {
        if(that.flagOver) return;
        var e = e || window.event,
          code = e.code;
        switch (code) {
          case "Space":
            that.quickDown();
            break;
          case "KeyA":
            that.move(-1, 0);
            break;
          case "KeyW":
            that.rotate();
            break;
          case "KeyS":
            that.move(0, 1);
            break;
          case "KeyD":
            that.move(1, 0);
            break;
          case "KeyP":
            that.flagStop = !that.flagStop;
            break;
        }
      };
    },
    // 初始化
    init: function() {
      var that = this;
      this.randomShape();
      this.create();
      this.show();
      this.bindEvents(this);
      clearInterval(this.timeId1);
      clearInterval(this.timeId2);
      this.timeId1 = setInterval(function() {
        that.move(0, 1);
      }, this.speed);
    },
  },
};
</script>
