<template>
  <a-form-model :model="ruleForm" ref="ruleForm" :rules="rules" v-bind="layout">
    <a-form-model-item label="用户名" prop="name">
      <a-input v-model="ruleForm.name" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="pass">
      <a-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="checkPass">
      <a-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item label="邮箱" prop="email">
      <a-input v-model="ruleForm.email" />
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submitForm('ruleForm')">
        注册
      </a-button>
      <a-button style="margin-left: 30px" @click="resetForm('ruleForm')">
        重置
      </a-button>
    </a-form-model-item>

  </a-form-model>
</template>
<script>
export default {
  props:{
    callback: Function
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: '',
      },
      rules: {
        name: [{ required: true, message: '请输入登录名' }],
        pass: [{ required: true, message: '请输入密码' }, { validator: validatePass, trigger: 'change' }],
        checkPass: [{ validator: validatePass2, trigger: 'change' }],
        email: [{type: 'email', message: '请输入正确的邮箱地址'}]
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