<template>
  <div class="home">
    <div>
      <my-header></my-header>
      <a-row>
        <a-col :span="5"></a-col>
        <a-col :span="12">
          <game-2048 v-if="gameId==1"></game-2048>
          <tetris v-if="gameId==2"></tetris>
        </a-col>
        <a-col :span="3">
          <div style="height: 100px"></div>
          <a-card title="2048 高分榜">
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
                <a-textarea :rows="4" :value="comment" />
              </a-form-item>
              <span>
                <a-rate v-model="grade" allow-half />
                <span class="ant-rate-text">评分</span>
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
                style="backgroundColor:#2d7e99"
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
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from "../../components/myFooter.vue";
import myHeader from "../../components/myHeader.vue";
import game2048 from "../game/2048/index.vue";
import Tetris from '../game/tetris/tetris.vue';
import tetris from "../game/tetris/tetris.vue";

export default {
  components: { myHeader, MyFooter, game2048, Tetris },
  name: "home",
  data() {
    return {
      gameId: this.$route.params["gameId"],
      grade: 5,
      comment: "",
      rank: [
        {
          rank: 1,
          username: "user1",
          score: 5000,
        },
        {
          rank: 2,
          username: "user2",
          score: 4000,
        },
        {
          rank: 3,
          username: "user3",
          score: 3000,
        },
        {
          rank: 4,
          username: "user4",
          score: 2000,
        },
        {
          rank: 5,
          username: "user5",
          score: 1000,
        },
      ],
      comments: [
        {
          username: "user1",
          comment: "太简单了！！！",
          grade: 3.5,
          date: "2020-12-12 06:21:21",
        },
        {
          username: "user2",
          comment: "还不错，继续加油！",
          grade: 4,
          date: "2020-12-12 06:22:21",
        },
        {
          username: "user3",
          comment: "经典2048。",
          grade: 4,
          date: "2020-12-12 06:23:21",
        },
        {
          username: "user4",
          comment: "什么sb游戏？？？",
          grade: 1.5,
          date: "2020-12-12 06:24:21",
        },
      ],
    };
  },
  created() {
    this.startApi();
  },
  methods: {
    startApi() {},

    submitComment() {
      console.log(this.grade);
      console.log(this.comment);
      console.log(this.$route.params["gameId"]);
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
