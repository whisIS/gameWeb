<template>
  <div  class="home">
    <div>
      <my-header></my-header>
      <div>
        <br />
        <a-row>
          <a-col :span="5"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard">
                <img
                  class="cardImg"
                  slot="cover"
                  alt="example"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1304658638,3448281260&fm=26&gp=0.jpg"
                />
                <a-card-meta title="黑白棋">
                  <template slot="description">
                    黑白棋，又叫翻转棋（Reversi）、奥赛罗棋（Othello）、苹果棋或正反棋（Anti
                    reversi）。黑白棋在西方和日本很流行。游戏通过相互翻转对方的棋子，最后以棋盘上谁的棋子多来判断胜负。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
          <a-col :span="3"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard">
                <img
                  class="cardImg"
                  slot="cover"
                  alt="example"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1695800282,2904318074&fm=26&gp=0.jpg"
                />
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
        <a-row>
          <a-col :span="5"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard">
                <img
                  class="cardImg"
                  slot="cover"
                  alt="example"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1304658638,3448281260&fm=26&gp=0.jpg"
                />
                <a-card-meta title="黑白棋">
                  <template slot="description">
                    黑白棋，又叫翻转棋（Reversi）、奥赛罗棋（Othello）、苹果棋或正反棋（Anti
                    reversi）。黑白棋在西方和日本很流行。游戏通过相互翻转对方的棋子，最后以棋盘上谁的棋子多来判断胜负。
                  </template>
                </a-card-meta>
              </a-card>
            </template>
          </a-col>
          <a-col :span="3"></a-col>
          <a-col :span="5">
            <template>
              <a-card hoverable class="gameCard">
                <img
                  class="cardImg"
                  slot="cover"
                  alt="example"
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1695800282,2904318074&fm=26&gp=0.jpg"
                />
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
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import { getDemo, postDemo } from "@/api/home/index.js";
import { logout } from "@/api/user/logout.js";
import myFooter from "../../components/myFooter.vue";
import MyHeader from "../../components/myHeader.vue";
import game2048 from "../../views/game/2048/index.vue";
import gameTetris from "../../views/game/tetris/tetris.vue";

export default {
  components: { myFooter, MyHeader, game2048, gameTetris },
  name: "home",
  data() {
    return {
      title: "web项目模板",
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
