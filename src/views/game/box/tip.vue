<template>
  <div>
    <div>
      <span>上:W</span>
      <span>下:S</span>
      <span>左:A</span>
      <span>右:D</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "tips",
};
</script>
<style scoped>
.container {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
span {
  font-size: 18px;
  font-weight: 800;
  margin-right: 20px;
}
</style>