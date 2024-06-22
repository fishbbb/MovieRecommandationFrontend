<!--<template>-->
<!--  <div class="login-container">-->
<!--    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form">-->
<!--      <el-form-item label="用户名" prop="username">-->
<!--        <el-input v-model="loginForm.username"></el-input>-->
<!--      </el-form-item>-->

<!--      <el-form-item label="密 码" prop="password">-->
<!--        <el-input-->
<!--            class="login-form-input"-->
<!--            placeholder="密 码"-->
<!--            v-model="loginForm.password"-->
<!--            show-password-->
<!--        >-->
<!--          <template #prefix>-->
<!--            <el-icon class="el-input__icon">-->
<!--              <icon-lock />-->
<!--            </el-icon>-->
<!--          </template>-->
<!--        </el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button @click="login" class="login-form-button" type="primary">登 录</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

<!--    &lt;!&ndash; 提示文字 &ndash;&gt;-->
<!--    <div class="login-tip">-->
<!--      <span>还没有账号？试试游客登录或者注册吧</span>-->
<!--    </div>-->

<!--    &lt;!&ndash; 游客登录和注册按钮&ndash;&gt;-->
<!--    <div class="button-group">-->
<!--      <router-link to="/">-->
<!--        <el-button class="login-form-button&#45;&#45;guest el-button&#45;&#45;medium" type="primary">游 客 登 录</el-button>-->
<!--      </router-link>-->
<!--      <router-link to="/register">-->
<!--        <el-button class="login-form-button&#45;&#45;register el-button&#45;&#45;medium" type="primary">注 册</el-button>-->
<!--      </router-link>-->
<!--    </div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { ref } from 'vue';-->
<!--import userRequest from "@/api/user";-->
<!--import store from "@/store/store";-->
<!--import {useRouter} from "vue-router";-->
<!--import {ErrorMessage, SuccessMessage} from "@/utils/my-message";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      loginForm: {-->
<!--        username: '',-->
<!--        password: ''-->
<!--      },-->
<!--      loginRules: {-->
<!--        username: [-->
<!--          { required: true, message: '请输入用户名', trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { required: true, message: '请输入密码', trigger: 'blur' }-->
<!--        ]-->
<!--      },-->
<!--      router:useRouter()-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async login() {-->
<!--      const data = {-->
<!--        password: this.loginForm.password,-->
<!--        username: this.loginForm.username-->
<!--      };-->
<!--      userRequest.login(data).then(res => {-->
<!--        const token = res.data.token;-->
<!--        try {-->
<!--          const tokenParts = token.split('.');-->
<!--          const encodedPayload = tokenParts[1];-->
<!--          const decodedPayload = atob(encodedPayload);-->
<!--          const payloadObj = JSON.parse(decodedPayload);-->
<!--          const user = {-->
<!--            userName: payloadObj.Username,-->
<!--            roleName: payloadObj.authorities,-->
<!--            userId: payloadObj.UserID,-->
<!--            token: token-->
<!--          };-->
<!--          store.dispatch("setUser", JSON.stringify(user));-->
<!--          store.dispatch("setToken", token);-->
<!--          if (user.roleName === 'admin') {-->
<!--            this.router.replace("/admin");-->
<!--          } else {-->
<!--            this.router.replace("/");-->
<!--          }-->
<!--          SuccessMessage("登录成功");-->
<!--        } catch (error) {-->
<!--          ErrorMessage("解析token失败");-->
<!--        }-->
<!--      }).catch(err => {-->
<!--        if (err.response && err.response.status === 401) {-->
<!--          ErrorMessage("用户名或密码错误");-->
<!--        } else {-->
<!--          ErrorMessage("登录失败，请稍后再试");-->
<!--        }-->
<!--      });-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--.bg {-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--  position: absolute;-->
<!--  background-size: cover;-->
<!--  background-color: black;-->
<!--}-->

<!--.login-form {-->
<!--  width: 28rem;-->
<!--  position: absolute;-->
<!--  left: 50%;-->
<!--  top: 10rem;-->
<!--  transform: translate(-50%, 0);-->
<!--  padding: 2rem;-->
<!--  margin-top: 1rem;-->
<!--  letter-spacing: 2px;-->
<!--}-->

<!--.login-form-header {-->
<!--  height: 20px;-->
<!--  padding-left: 45px;-->
<!--  padding-bottom: 100px;-->
<!--  color: black;-->
<!--}-->

<!--.login-form-text {-->
<!--  color: #ffd700;-->
<!--  font-weight: bold;-->
<!--  font-size: 1.8rem;-->
<!--  padding-top: 15px;-->
<!--}-->

<!--.login-form-input {-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.login-form-button {-->
<!--  border-radius: 3px;-->
<!--  width: 100%;-->
<!--  font-weight: 600;-->
<!--  font-size: 15px;-->
<!--  letter-spacing: 2px;-->
<!--  height: 3.5rem;-->
<!--  background: #fad25d;-->
<!--  margin-top: 35px;-->
<!--}-->

<!--.login-form-button:hover {-->
<!--  box-shadow: 0 10px 30px #fad25d;-->
<!--  transition: 3s;-->
<!--}-->

<!--.button-group {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-top: 10px;-->
<!--  width: 100%;-->
<!--}-->

<!--/* 如果需要，可以为游客登录按钮设置一个特定的宽度 */-->
<!--.login-form-button&#45;&#45;guest {-->
<!--  border-radius: 3px;-->
<!--  font-weight: 600;-->
<!--  font-size: 15px;-->
<!--  letter-spacing: 2px;-->
<!--  height: 3.5rem;-->
<!--  background: #fad25d;-->
<!--  margin-top: 25px;-->
<!--  width: 220px; /* 游客登录按钮宽度 */-->
<!--}-->

<!--/* 如果需要，可以为注册按钮设置一个特定的宽度 */-->
<!--.login-form-button&#45;&#45;register {-->
<!--  border-radius: 3px;-->
<!--  font-weight: 600;-->
<!--  font-size: 15px;-->
<!--  letter-spacing: 2px;-->
<!--  height: 3.5rem;-->
<!--  background: #fad25d;-->
<!--  margin-top: 25px;-->
<!--  width: 220px; /* 注册按钮宽度 */-->
<!--}-->

<!--.login-tip {-->
<!--  text-align: center;-->
<!--  margin-top: 10px;-->
<!--  font-size: 12px;-->
<!--  color: #91949c;-->
<!--}-->

<!--.scan-and-forget-div {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  margin-top: 10px;-->
<!--}-->

<!--.my-font {-->
<!--  font-weight: bolder;-->
<!--  font-size: 14px;-->
<!--  color: #91949c;-->
<!--}-->

<!--.my-font:hover {-->
<!--  color: #5a84fd;-->
<!--}-->

<!--.login-form-footer {-->
<!--  font-weight: bolder;-->
<!--  color: #91949c;-->
<!--  padding-top: 1.5rem;-->
<!--  text-align: center;-->
<!--}-->

<!--/deep/ .el-input__inner {-->
<!--  height: 3rem;-->
<!--}-->

<!--.el-checkbox {-->
<!--  color: #91949c;-->
<!--  font-weight: bolder;-->
<!--  font-size: 15px;-->
<!--}-->

<!--/deep/ .el-form-item__label {-->
<!--  color: #91949c;-->
<!--  font-weight: bold;-->
<!--}-->

<!--/deep/ .el-form-item {-->
<!--  align-items: baseline;-->
<!--}-->

<!--.bg-change {-->
<!--  background-color: #e74c3c;-->
<!--  animation: bg-color 20s infinite;-->
<!--  -webkit-animation: bg-color 20s infinite;-->
<!--}-->

<!--@-webkit-keyframes bg-color {-->
<!--  0% {-->
<!--    background-color: #f18f87;-->
<!--  }-->
<!--  20% {-->
<!--    background-color: #ead18c;-->
<!--  }-->
<!--  40% {-->
<!--    background-color: #8be1d1;-->
<!--  }-->
<!--  60% {-->
<!--    background-color: #8cbee1;-->
<!--  }-->
<!--  80% {-->
<!--    background-color: #cba2e1;-->
<!--  }-->
<!--  100% {-->
<!--    background-color: #f18f87;-->
<!--  }-->
<!--}-->

<!--@keyframes bg-color {-->
<!--  0% {-->
<!--    background-color: #f18f87;-->
<!--  }-->
<!--  20% {-->
<!--    background-color: #ead18c;-->
<!--  }-->
<!--  40% {-->
<!--    background-color: #8be1d1;-->
<!--  }-->
<!--  60% {-->
<!--    background-color: #8cbee1;-->
<!--  }-->
<!--  80% {-->
<!--    background-color: #cba2e1;-->
<!--  }-->
<!--  100% {-->
<!--    background-color: #f18f87;-->
<!--  }-->
<!--}-->
<!--</style>-->
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


      axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 根据实际情况设置 Content-Type
        },
        url: 'http://39.107.192.242:8080/login',
        params: data,
      }).then(res=>{
        const token = res.data.data.token;
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

