<template>
  <div class="bg"></div>
  <div
      name="animate__bounce"
      class="login-form my-border"
      @keyup.enter="postLogin"
  >
    <div class="login-form-header">
      <router-link to="/home">
        <img
            style="width: 75px; height: 75px; float: left; padding-right: 40px;"
            src="../assets/logo.png"
            alt="logo"
        />
      </router-link>
      <div class="login-form-text">电影推荐系统 - 注册</div>
    </div>

    <el-form ref="loginFormRef" :model="register" :rules="rules">
      <el-form-item label="账 号" prop="username">
        <el-input
            class="login-form-input"
            placeholder="账 号"
            v-model="registerForm.username"
            autofocus
            autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="密 码" prop="password">
        <el-input
            class="login-form-input"
            placeholder="密 码"
            v-model="registerForm.password"
            show-password
        >
          <template #prefix>
            <el-icon class="el-input__icon">
              <icon-lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="postRegister" class="login-form-button" type="primary">注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Lock as IconLock, User as IconUser } from "@element-plus/icons";
import { reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";
import { debounce } from "@/utils/debounce-throttle";
import userRequest from "@/api/user"; // Import userRequest for registration

export default {
  name: "RegisterView",
  components: {
    IconUser,
    IconLock,
  },
  setup() {
    const router = useRouter();
    const loginFormRef = ref("");

    const registerForm = reactive({ // Change loginForm to registerForm
      username: "",
      password: "",
    });

    const rules = reactive({
      username: [
        { required: true, message: "请输入账号", trigger: "blur" },
        { min: 4, max: 20, message: "长度在4到20个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 4, max: 20, message: "长度在4到20个字符", trigger: "blur" },
      ],
    });

    const postRegister = debounce(async () => { // Rename postLogin to postRegister
      const form = unref(loginFormRef);
      if (!form) {
        return;
      }
      try {
        await form.validate();

        // Call user registration API
        const res = await userRequest.register(registerForm);

        // Handle registration response
        if (res.code === 200) {
          // Handle successful registration
          // Redirect the user to the appropriate page
          await router.replace("/login");
        } else {
          // Handle registration failure
          // You can display an error message or take other actions here
          console.error("Registration failed:", res.msg);
        }
      } catch (err) {
        console.error("Error during registration:", err);
      }
    });

    return {
      loginFormRef, // No need to return remember, as it's not used in this component
      registerForm, // Change loginForm to registerForm
      rules,
      postRegister, // Rename postLogin to postRegister
    };
  },
};
</script>

<style lang="less" scoped>
.bg {
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
}

.login-form {
  width: 28rem;
  position: absolute;
  left: 50%;
  top: 10rem;
  transform: translate(-50%, 0);
  padding: 2rem;
  margin-top: 1rem;
  letter-spacing: 2px;
}

.login-form-header {
  height: 20px;
  padding-left: 45px;
  padding-bottom: 100px;
}

.login-form-text {
  color: #000000;
  font-weight: bold;
  font-size: 1.8rem;
  padding-top: 15px;
}

.login-form-input {
  margin-bottom: 10px;
}

.login-form-button {
  border-radius: 3px;
  width: 100%;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 2px;
  height: 3.5rem;
  background: #5a84fd;
  margin-top: 35px;
}

.login-form-button:hover {
  box-shadow: 0 10px 30px #2156f6;
  transition: 3s;
}

.scan-and-forget-div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.my-font {
  font-weight: bolder;
  font-size: 14px;
  color: #91949c;
}

.my-font:hover {
  color: #5a84fd;
}

.login-form-footer {
  font-weight: bolder;
  color: #91949c;
  padding-top: 1.5rem;
  text-align: center;
}

/deep/ .el-input__inner {
  height: 3rem;
}

.el-checkbox {
  color: #91949c;
  font-weight: bolder;
  font-size: 15px;
}

/deep/ .el-form-item__label {
  color: #91949c;
  font-weight: bold;
}

/deep/ .el-form-item {
  align-items: baseline;
}

.bg-change {
  background-color: #e74c3c;
  animation: bg-color 20s infinite;
  -webkit-animation: bg-color 20s infinite;
}

@-webkit-keyframes bg-color {
  0% {
    background-color: #f18f87;
  }
  20% {
    background-color: #ead18c;
  }
  40% {
    background-color: #8be1d1;
  }
  60% {
    background-color: #8cbee1;
  }
  80% {
    background-color: #cba2e1;
  }
  100% {
    background-color: #f18f87;
  }
}

@keyframes bg-color {
  0% {
    background-color: #f18f87;
  }
  20% {
    background-color: #ead18c;
  }
  40% {
    background-color: #8be1d1;
  }
  60% {
    background-color: #8cbee1;
  }
  80% {
    background-color: #cba2e1;
  }
  100% {
    background-color: #f18f87;
  }
}
</style>