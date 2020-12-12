<template>
  <div class="home">
    <my-header></my-header>
    <br />
    <a-row>
      <a-col :span="4"></a-col>
      <a-col :span="5">
        <template>
          <div style="background: rgb(245, 243, 243); padding: 20px">
            <a-card title="个人信息" :bordered="false" style="width: auto">
              <a-row>
                <a-col :span="8" class="infoLabel"> 用户名： </a-col>
                <a-col :span="16" class="infoContent">
                  {{ userInfo.userName }}
                </a-col>
              </a-row>
              <br />
              <a-row>
                <a-col :span="8" class="infoLabel"> E-mail： </a-col>
                <a-col :span="16" class="infoContent">
                  {{ userInfo.email }}
                </a-col>
              </a-row>
              <br />
              <a-row>
                <a-col :span="8" class="infoLabel"> 电话： </a-col>
                <a-col :span="16" class="infoContent">
                  {{ userInfo.phone }}
                </a-col>
              </a-row>
            </a-card>
          </div>
        </template>
      </a-col>
      <a-col :span="11">
        <a-card title="我的分数" style="text-align: left">
          <template v-for="(gameInfo, index) in userInfo.gameInfos">
            <a-row
              :key="gameInfo.id"
              class="recordRow"
              type="flex"
              justify="space-around"
              align="middle"
            >
              <a-col :span="6">
                <img :src="imgs[index % 2]" class="recordImg" />
              </a-col>
              <a-col :span="12">
                <h2>
                  {{ gameInfo.gameName }}
                </h2>
              </a-col>
              <a-col :span="6">
                <div class="score">
                  {{ gameInfo.gameScore }}
                </div>
                <div style="color: #99a2aa; font-size: 15px">历史记录</div>
              </a-col>
            </a-row>
            <br :key="gameInfo.id" />
          </template>
        </a-card>
      </a-col>
      <a-col :span="4"></a-col>
    </a-row>

    <my-footer></my-footer>
  </div>
</template>

<script>
import { logout, getUserInfo } from "@/api/user";
import myFooter from "../../components/myFooter.vue";
import MyHeader from "../../components/myHeader.vue";
export default {
  components: { myFooter, MyHeader },
  name: "home",
  data() {
    return {
      title: "web项目模板",
      userInfo: {
        userName: "yanghui",
        email: "test@fudan.edu.cn",
        phone: "11223344556",
        gameInfos: [
          {
            gameId: 1,
            gameName: "Tetris",
            gameScore: 12580,
          },
          {
            gameId: 2,
            gameName: "黑白棋",
            gameScore: 758,
          },
          {
            gameId: 3,
            gameName: "Tetris",
            gameScore: 33455,
          },
          {
            gameId: 4,
            gameName: "黑白棋",
            gameScore: 457,
          },
        ],
      },
      imgs: [
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1695800282,2904318074&fm=26&gp=0.jpg",
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1304658638,3448281260&fm=26&gp=0.jpg",
      ],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserInfo()
        .then((res) => {
          if (res && res.result) {
            this.userInfo.userName = res.userName;
            this.userInfo.email = res.email;
            this.userInfo.phone = res.phone;
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
.gameCard {
  height: auto;
  width: auto;
}
</style>

<style lang="scss" scoped>
.infoLabel {
  text-align: right;
}
.infoContent {
  text-align: left;
}
.recordRow {
  height: 125px;
  background: rgb(245, 243, 243);
}
.recordImg {
  height: 125px;
  width: auto;
  border-radius: 5px;
}
.score {
  color: #00a1d6;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;
}
</style>
