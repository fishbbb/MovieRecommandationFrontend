<template>
  <el-container>
    <el-aside class="admin-side">
      <main-side/>
    </el-aside>


    <el-main class="content" style="padding: 0">
      <router-view/>
    </el-main>

  </el-container>
  <el-footer class="footer" style="padding: 0">
    <main-footer/>
  </el-footer>

</template>

<script>
import MainFooter from "@/components/layout/MainFooter.vue"
import MainSide from "@/components/admin/MainSider.vue";

export default {
  name: "IndexView",
  components: {MainFooter,MainSide},
}
</script>

<style scoped>
/* 让header吸顶 */
.content{
  min-height: calc(100vh - 55px);
}
.admin-side{
  width: 150px;
}

</style>