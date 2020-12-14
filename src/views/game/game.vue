<template>
  <div class="home">
    <div>
      <my-header></my-header>
      <a-row>
        <a-col :span="3"></a-col>
        <a-col :span="14">
          <game-2048 v-if="gameId == 1" :submitScore="saveScore"></game-2048>
          <tetris v-if="gameId == 2" :submitScore="saveScore"></tetris>
          <block-breaker
            v-if="gameId == 3"
            :submitScore="saveScore"
          ></block-breaker>
          <box v-if="gameId == 4"></box>
        </a-col>
        <a-col :span="3">
          <div style="height: 100px"></div>
          <a-card :title="rankTitle">
            <div v-for="(item, index) in rank" :key="index">
              <a-row>
                <a-col :span="8" class="username">
                  {{ item.username }}
                </a-col>
                <a-col :span="16" class="score">
                  {{ item.score }}
                </a-col>
              </a-row>
              <hr />
            </div>
          </a-card>
        </a-col>
      </a-row>
      <br />
      <a-row>
        <a-col :span="5"></a-col>
        <a-col :span="12" style="text-align: left">
          <a-comment>
            <div slot="content">
              <a-form-item>
                <a-textarea :rows="4" v-model="comment" />
              </a-form-item>
              <span>
                <a-rate v-model="grade" allow-half />
              </span>
              <a-form-item>
                <a-button
                  html-type="submit"
                  type="primary"
                  @click="submitComment"
                >
                  发表评论
                </a-button>
              </a-form-item>
            </div>
          </a-comment>
        </a-col>
      </a-row>
      <div v-for="(item, index) in comments" :key="index">
        <a-row>
          <a-col :span="5"></a-col>
          <a-col :span="12" style="text-align: left">
            <a-comment class="comment">
              <a slot="author">{{ item.username }}</a>
              <a-avatar
                slot="avatar"
                style="backgroundcolor: #2d7e99"
                icon="user"
              />
              <p slot="content">
                {{ item.comment }}
              </p>
              <a-rate v-model="item.grade" allow-half disabled />
              <a-tooltip slot="datetime"> {{ item.date }} </a-tooltip>
            </a-comment>
          </a-col>
        </a-row>
      </div>
    </div>
    <a-modal
      v-model="visible"
      title="上传得分"
      @ok="handleOk"
      cancelText="取消"
      okText="确认"
    >
      <p>确定要上传分数吗？当前分数:{{ score }}</p>
    </a-modal>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "../../components/myFooter";
import myHeader from "../../components/myHeader";
import game2048 from "../game/2048/index";
import tetris from "../game/tetris/tetris";
import box from "../game/box/index";
import blockBreaker from "../game/blockBreaker/index";
import {
  gameRank,
  gameComment,
  writeComment,
  gameInfo,
  gameScore,
} from "../../api/game";
import { getUserInfo } from "../../api/user";

export default {
  components: { myHeader, MyFooter, game2048, tetris, blockBreaker, box },
  name: "home",
  data() {
    return {
      gameId: this.$route.params["gameId"],
      gameName: "",
      grade: 5,
      comment: "",
      rank: "",
      rankTitle: "",
      comments: "",
      visible: false,
      score: 0,
    };
  },
  created() {
    this.getGameInfo();
    this.getGameComments();
    this.getGameRank();
  },
  mounted() {},
  methods: {
    getGameInfo() {
      let temp = parseInt(this.gameId);
      gameInfo({ gameId: temp })
        .then((res) => {
          if (res && res.result) {
            this.gameName = res.gamename;
            this.grade = res.mark;
            this.rankTitle = res.gamename + "排行榜";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitComment() {
      let temp = {
        gameId: parseInt(this.gameId),
        comment: this.comment,
        grade: this.grade,
      };
      writeComment(temp)
        .then((res) => {
          if (res && res.result) {
            this.$notification.open({
              message: "发表成功！",
              icon: <a-icon type="smile" style="color: #108ee9" />,
            });
            this.getGameComments();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGameComments() {
      let temp = {
        gameId: parseInt(this.gameId),
      };
      gameComment(temp)
        .then((res) => {
          if (res && res.comments) {
            this.comments = res.comments;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getGameRank() {
      let temp = {
        gameId: parseInt(this.gameId),
      };
      gameRank(temp)
        .then((res) => {
          if (res && res.ranks) {
            this.rank = res.ranks;
            // this.$forceUpdate();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveScore(s) {
      this.score = s;
      this.visible = true;
    },
    handleOk() {
      this.submitScore(this.score);
      this.visible = false;
    },
    submitScore(ss) {
      getUserInfo()
        .then((res) => {
          if (res && res.result) {
            let temp = {
              gameId: parseInt(this.gameId),
              score: parseInt(ss),
            };
            gameScore(temp)
              .then((res) => {
                this.getGameRank();
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
.username {
  color: #021d25;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
}
.score {
  color: #05759b;
  font-weight: 700;
  font-size: 18px;
  text-align: center;
}
.comment {
  margin-top: 5px;
  background-color: rgb(242, 245, 247);
  padding: 5px 20px;
  border-radius: 5px;
}
</style>
