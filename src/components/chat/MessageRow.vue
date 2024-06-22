<template>
  <el-container class="dialog-container">
    <el-header class="dialog-header">
         {{this.messagelist[0].content.substring(0,8) + "..."}}
    </el-header>
    <el-main >
      <template v-for="(item,index) in messagelist" :key="index">
          <singleMessage :message="item"/>
      </template>
    </el-main>
  </el-container>
</template>

<style scoped>
.dialog-container{
  width:100%;
}
.dialog-header{
  height: 70px;
  //background-color: #90d6ff;
  border-bottom: #eaeaf6 2px solid;
  line-height: 70px;
  font-size: 20px;
  width: 100%;
}
</style>

<script>
import singleMessage from "@/components/chat/singleMessage.vue";
import message from "@element-plus/icons/lib/Message";
import {ref} from "vue";

export default {
  name: "MessageRow",
  components:{singleMessage},
  props: {
    messagelist: {
      type: Object,
      required: true
    },
  },
  methods: {
    deleteItem() {
      console.log("delete");
    }
  },
  data() {
    let title = ref(this.messagelist.length === 0? "暂无消息" :this.messagelist[0].content + "...");
    return {
      title
  }

}
}
</script>