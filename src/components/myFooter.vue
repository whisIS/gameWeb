<template>
  <div class="myFooter">
    <a-layout>
      <a-layout-footer>
        <a-row>
          <a-col :span="4">
          </a-col>
          <a-col :span="8">
            Copyright © 2020 fdu 17ss<br>
            <a-breadcrumb>
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item><a href="">关于项目</a></a-breadcrumb-item>
              <a-breadcrumb-item><a href="">关于我们</a></a-breadcrumb-item>
              <a-breadcrumb-item><a href="">意见反馈</a></a-breadcrumb-item>
            </a-breadcrumb>            
          </a-col>
          <a-col :span="8">
            联系我们
            <a-breadcrumb>
              <a-breadcrumb-item><a href="">17302010051@fudan.edu.cn</a></a-breadcrumb-item>
            </a-breadcrumb>
          </a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>
  </div>
  
</template>

<script>
export default {
  name: "myFooter",
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
.myFooter {
  width: 100%;
  text-align: center;
  line-height: 30px;
  position: absolute;
  bottom: 0;
}
</style>