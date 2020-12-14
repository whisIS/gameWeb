<template>
  <div class="home">
    <div>
      <my-header></my-header>
      <div>
        <br />
        <a-row style="margin-bottom: 30px">
          <a-col :span="5"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard" @click="jumpToGame(1)">
                <img class="cardImg" slot="cover" alt="example" :src="game1" />
                <a-card-meta title="2048">
                  <template slot="description">
                    一款益智小游戏，游戏的规则很简单，你需要控制所有方块向同一个方向运动，相同数字方块撞在一起合并成为他们的和，每次操作之后会随机生成一个2或者4，最终得到一个“2048”的方块就算胜利了。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
          <a-col :span="3"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard" @click="jumpToGame(2)">
                <img class="cardImg" slot="cover" alt="example" :src="game2" />
                <a-card-meta title="Tetris">
                  <template slot="description">
                    Tetris（Тетрис）是一款由俄罗斯人阿列克谢·帕基特诺夫于1984年6月发明的休闲游戏。
                    Tetris的基本规则是移动、旋转和摆放游戏自动输出的各种方块，使之排列成完整的一行或多行并且消除得分。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
        </a-row>
        <a-row style="margin-bottom: 30px">
          <a-col :span="5"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard" @click="jumpToGame(3)">
                <img class="cardImg" slot="cover" alt="example" :src="game3" />
                <a-card-meta title="打砖块">
                  <template slot="description">
                    球碰到砖块、棒子与底下以外的三边会反弹，落到底下会失去一颗球，把砖块全部消去就可以破关。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
          <a-col :span="3"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard" @click="jumpToGame(4)">
                <img class="cardImg" slot="cover" alt="example" :src="game4" />
                <a-card-meta title="推箱子">
                  <template slot="description">
                    在一个狭小的仓库中，要求把木箱放到指定的位置，合理安排移动的次序和位置，才能顺利的完成任务。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
        </a-row>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/index.js";
import myFooter from "../../components/myFooter.vue";
import MyHeader from "../../components/myHeader.vue";

export default {
  components: { myFooter, MyHeader },
  name: "home",
  data() {
    return {
      title: "web项目模板",
      game1: require("../../assets/game1.jpg"),
      game2: require("../../assets/game2.jpg"),
      game3: require("../../assets/game3.jpg"),
      game4: require("../../assets/game4.jpg"),
    };
  },
  created() {},
  methods: {
    jumpToGame(num) {
      window.location.hash = "#/game/" + num;
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
