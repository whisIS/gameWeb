<template>
  <div style="padding-left: 50px">
    <a-form-model
      :model="ruleForm"
      ref="ruleForm"
      :rules="rules"
      v-bind="layout"
    >
      <a-form-model-item label="用户名" prop="username">
        <a-input v-model="ruleForm.username" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="pwd">
        <a-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="确认密码" prop="checkPwd">
        <a-input
          v-model="ruleForm.checkPwd"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item label="手机" prop="phone">
        <a-input v-model="ruleForm.phone" />
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
  </div>
</template>
<script>
import { signup, login } from "../api/user";
export default {
  props: {
    callback: Function,
  },
  data() {
    let validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码！"));
      } else {
        if (this.ruleForm.checkPwd !== "") {
          this.$refs.ruleForm.validateField("checkPwd");
        }
        callback();
      }
    };
    let validatePwd2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次密码不一致！"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入正确的手机号！"));
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
        username: "",
        pwd: "",
        checkPwd: "",
        phone: "",
        email: "",
      },
      rules: {
        username: [{ required: true, message: "请输入登录名" }],
        pwd: [
          { required: true, message: "请输入密码" },
          { validator: validatePwd, trigger: "change" },
        ],
        checkPwd: [
          { required: true, message: "请再次输入密码" },
          { validator: validatePwd2, trigger: "change" },
        ],
        phone: [
          { required: true, message: "请输入手机号" },
          { validator: validatePhone, trigger: "change" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址" },
          { type: "email", message: "请输入正确的邮箱地址" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!/^1[0123456789]\d{9}$/.test(this.ruleForm.phone)) {
            this.$notification.open({
              message: "手机号码错误",
              icon: <a-icon type="frown" style="color: #108ee9" />,
            });
          }else{
            this.submit();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submit() {
      signup(this.ruleForm)
        .then((res) => {
          if (res && res.result) {
            this.$notification.open({
              message: "注册成功！",
              icon: <a-icon type="smile" style="color: #108ee9" />,
            });
            let temp = {
              username: this.ruleForm.username,
              pwd: this.ruleForm.pwd,
            };
            login(temp);
            this.callback(this.ruleForm.username);
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>