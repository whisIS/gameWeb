<template>
  <a-form-model :model="ruleForm" ref="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item label="用户名" prop="username">
      <a-input v-model="ruleForm.username" />
    </a-form-model-item>
    <a-form-model-item label="密码" prop="pass">
      <a-input v-model="ruleForm.pwd" type="pwd" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')"> 登录 </a-button>
      <a-button style="margin-left: 30px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { login, signup } from "../api/user";
export default {
  props: {
    callback: Function,
  },
  data() {
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      ruleForm: {
        username: "",
        pwd: "",
      },
      rules: {
        username: [{ required: true, message: "请输入登录名" }],
        pwd: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
            .then((res) => {
              if (res && res.result) {
                this.$notification.open({
                  message: "登录成功！",
                  icon: <a-icon type="smile" style="color: #108ee9" />,
                });
                this.callback();
              } else {
                this.$notification.open({
                  message: res.message,
                  icon: <a-icon type="frown" style="color: #108ee9" />,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>