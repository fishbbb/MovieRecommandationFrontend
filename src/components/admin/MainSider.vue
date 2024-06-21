<template>
    <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
    >
      <router-link v-for="item in menuList" :key="item.index" :to="item.route">
        <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
      </router-link>
    </el-menu>
</template>

<script>
export default {
  name: "MainSide",
  data() {
    return {
      isCollapse: false,
      menuList: [
        { name: '用户管理', index: '1', route: '/userManagement' },
        { name: '流量监控', index: '2', route: '/qps' },
        { name: '安全审计', index: '3', route: '/security' },
        { name: '广告位管理', index: '4', route: '/adManagement' },
        { name: '去用户端', index: '5', route: '/home' },
      ]
    };
  }
};
</script>

<style scoped>
.el-menu-vertical-demo{
  height: 100%;
}

</style>