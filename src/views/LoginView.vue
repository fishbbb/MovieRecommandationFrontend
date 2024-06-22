<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="margin:10px;">登录</el-button>
        <router-link to="/register">
          <el-button type="primary" style="margin:10px;">注册</el-button>
        </router-link>
        <router-link to="/">
          <el-button type="primary" style="margin:10px;">游客登录</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ref } from 'vue';
import userRequest from "@/api/user";
import store from "@/store/store";
import {useRouter} from "vue-router";
import {ErrorMessage, SuccessMessage} from "@/utils/my-message";
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      router:useRouter()
    };
  },
  methods: {
    async login() {
      //this.router.replace("/admin");
      const data = {
        password: this.loginForm.password,
        username: this.loginForm.username
      }
      // console.log("用户输入数据：", data)
      // const res = {
      //   data: {
      //     userName: "lsy",
      //     roleName: "admin",
      //     userId:'123',
      //     token: "exampleToken123",
      //   }
      // }
      // console.log("isLogin:", store.state.isLogin);
      // await store.dispatch("setUser", JSON.stringify(res.data));
      // await store.dispatch("setToken", res.data.token);
      // console.log("isLogin:", store.state.isLogin);
      // SuccessMessage("登录成功")
      // if (res.data.roleName ==='admin'){
      //   await this.router.replace("/admin");
      // }else{
      //   await this.router.replace("/");
      // }

// axios({
//       method: 'POST',
//           headers: {
//         'Content-Type': 'application/json', // 根据实际情况设置 Content-Type
//       },
//       url: 'http://39.107.192.242:8080/login',
//           params: data,
//     }).
      userRequest.login(data).then(res=>{
        const token = res.data.token;
        console.log("token+",token)
        const tokenParts = token.split('.');
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        // 将解码后的 JSON 字符串转换为对象
        const payloadObj = JSON.parse(decodedPayload);
        const user = {
          userName: payloadObj.Username,
          roleName: payloadObj.authorities,
          userId:payloadObj.UserID,
          token: token
        }
        store.dispatch("setUser",JSON.stringify(user));
        // store.dispatch("setToken",res.data.token);
        store.dispatch("setToken",token);
        if(user.roleName === 'admin'){
          this.router.replace("/admin");
        }else{
          this.router.replace("/")
        }
        SuccessMessage("登录成功")
      })

      // const url = 'http://39.107.192.242:8080/login';
      //
      // fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json', // 根据实际情况设置 Content-Type
      //   },
      //   params: JSON.stringify(data), // 将对象转换为 JSON 字符串
      // })
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error('Network response was not ok');
      //       }
      //       return response.json(); // 解析 JSON 响应数据
      //     })
      //     .then(data => {
      //       console.log('Success:', data);
      //     })
      //     .catch(error => {
      //       console.error('Error:', error);
      //     });

      // userRequest.login(data).then(res => {
      //   const token = res.data;
      //   const tokenParts = token.split('.');
      //   const encodedPayload = tokenParts[1];
      //   const decodedPayload = atob(encodedPayload);
      //   // 将解码后的 JSON 字符串转换为对象
      //   const payloadObj = JSON.parse(decodedPayload);
      //   const user = {
      //     userName: payloadObj.Username,
      //     roleName: payloadObj.authorities,
      //     userId:payloadObj.UserID,
      //     token: token
      //   }
      //   store.dispatch("setUser",JSON.stringify(user));
      //   // store.dispatch("setToken",res.data.token);
      //   store.dispatch("setToken",token);
      //   if(user.roleName === 'admin'){
      //     this.router.replace("/admin");
      //   }else{
      //     this.router.replace("/")
      //   }
      //   SuccessMessage("登录成功")
      // }).catch(err=>{
      //   ErrorMessage("登录失败")
      // })
      // 实现登录逻辑
      console.log('登录');
    },
  }
}
</script>

<style scoped>
.login-container {
  width: 400px;
  margin: 100px auto;
}

.login-form {
  margin-top: 20px;
}
</style>


