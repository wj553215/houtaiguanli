<template>
  <div class="box">
    <div class="m-box">
      <el-card class="box-card">
        <el-form ref="form" :rules="rules" :model="form" class="box-from" :inline="true">
          <h2>管理系统</h2>
          <el-form-item prop="username" label="账户名">
            <el-input placeholder="请输入账号名" v-model.trim="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input type="password" placeholder="请输入密码" v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "Login",
  data () {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submit () {
      //   通过校验
      this.$refs.form.validate(valid => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            // console.log(data);
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              //  跳转首页
              this.$router.push("/home");
              this.$message({
                message: "登录成功",
                type: "success"
              });
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style>
body {
  background: url('../assets/imges/bg.jpg') no-repeat center;
}

.box {

  width: 100%;
  height: 100%;
  display: flex;
  height: calc(100vh - 70px);
}

.m-box {
  width: 400px;
  height: 300px;
  /* background-color: skyblue; */
  margin: auto;
}

.box-card {
  width: 100%;
  height: 100%;
}

.box-from {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
</style>