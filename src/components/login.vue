<template>
  <a-form-model :model="ruleForm" ref="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item label="用户名" prop="name">
      <a-input v-model="ruleForm.name" />
    </a-form-model-item>
    <a-form-model-item label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        登录
      </a-button>
      <a-button style="margin-left: 30px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  props: {
    callback: Function
  },
  data() {
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      ruleForm: {
        name: '',
        pass: '',
      },
      rules: {
        name: [{ required: true, message: '请输入登录名' }],
        pass: [{ required: true, message: '请输入密码' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit!');
          this.callback();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>