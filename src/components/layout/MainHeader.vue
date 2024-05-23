<template>
  <div class="navbar">
    <div class="logo">
      <img src="../../assets/logo.png" alt="logo"/>
      <span class="title">电影推荐系统</span>
    </div>
    <router-link to="/home">
      <el-button>首页</el-button>
    </router-link>
    <router-link to="/classification">
      <el-button>分类</el-button>
    </router-link>
    <div class="spacer"></div> <!-- Spacer -->
    <div class="search-div">
      <el-autocomplete
          v-model="searchKeywords"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入电影名"
          @select="handleSelect"
          @keydown.enter="handleSearch"
          class="long-input"
      >
        <template #suffix>
          <search @click="handleSearch" width="20px"/>
        </template>
      </el-autocomplete>
    </div>
    <div class="spacer"></div> <!-- Spacer -->


    <router-link to="/login">
      <el-button
          class="login-button"
          v-if="!isLogin">
        登录
      </el-button>
    </router-link>

    <el-dropdown class="login-dropdown" v-if="isLogin">
      <el-button type="text">
        <div class="login-name">
          {{ user.nickname }}
        </div>
        <el-avatar :src="user.avatar">
          <!-- 当图片加载错误时，将加载这里面的图片 -->
          <img src="../../assets/logo.png" alt="default avatar"/>
        </el-avatar>
      </el-button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link :underline="false" @click="show()" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>我的主页
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link :underline="false" @click="show()" style="padding-right: 7px">
              <i style="padding-right: 3px"></i>我的记录
            </el-link>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-button type="text" @click="handleLogout" :underline="false">
              <i style="padding-right: 3px"></i>退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import store from "@/store/store";

export default {
  name: "MainHeader",
  setup() {
  },
  data() {
    return {
      searchKeywords: '',
      isLogin : store.state.isLogin,
      router:useRouter(),
      user:{
        id:0,
        nickname:store.state.userName,
      }
    };
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      // 这里是异步请求数据的逻辑，根据queryString获取电影名建议列表
      console.log(queryString)
      console.log(cb)
      // 将建议列表传递给cb函数
    },
    handleSelect(item) {
      // 处理选择建议项的逻辑
      console.log(item)
    },
    handleSearch(){

    },
    show(){

    },
    handleLogout(){
      this.$router.go(0);
    }
  }

}
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  z-index: 999;
}
.navbar {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 40px; /* Adjust as needed */
  margin-right: 10px; /* Adjust as needed */
}

.title {
  font-size: 20px; /* Adjust as needed */
}

.search-div {
  flex: 1;
  display: flex;
  justify-content: center;
}

.long-input {
  width: 300px; /* Adjust as needed */
}

.el-button{
  margin-left: 10px;
  margin-right: 10px;
}
/*登录样式*/
.login-link {
  margin-left: auto; /*右对齐*/
}

/*登录成功抽屉样式*/
.login-dropdown {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;

  /*登录用户名样式*/

  .login-name {
    font-weight: bolder;
    font-size: 15px;
    letter-spacing: 2px;
  }
}


/* 响应式布局 - 当屏幕小于 740 像素宽 */
@media screen and (max-width: 740px) {
  .navbar {
    z-index: 999;
    padding: 0 1rem;
  }

  .menu-icon {
    order: 1;
    display: block;
    width: 2rem;
    height: 2rem;
    position: relative;
    margin: auto 0;
  }

  .big-menu {
    display: none;
  }

  .menu {
    order: 5;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    z-index: 500;
    background-color: #333;
    flex-direction: column;
    display: flex;

    .search-div {
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 10px;
    }
  }

  .logo {
    position: absolute;
    left: 45%;

    .title {
      display: none;
    }
  }

  .login-link, .login-dropdown {
    order: 3;
  }

  .menu-enter-active {
    animation: show-menu 0.5s linear;
  }

  .menu-leave-active {
    animation: show-menu 0.5s reverse;
  }

  @keyframes show-menu {
    from {
      z-index: -100;
      transform: translateY(-100%);
    }

    to {
      z-index: 500;
      transform: translateY(0%);
    }
  }
}

/* 响应式布局 - 当屏幕为（740px < 屏幕像素 < 1200px)宽 时，系统名消失，并且左右内边距变为0 */
@media screen and (min-width: 740px) and  (max-width: 1200px) {
  /* 左右内边距变为0 */
  .navbar {
    padding-left: 0;
    padding-right: 0;
  }

  /* logo名消失 */
  .logo .title {
    display: none;
  }

  .big-menu {
    display: flex;
  }

  .menu {
    display: none;
  }
}
</style>