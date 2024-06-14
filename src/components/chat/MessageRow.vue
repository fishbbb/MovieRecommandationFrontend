<template>
  <el-container class="dialog-container">
    <el-header class="dialog-header">
         {{message.title}}
    </el-header>
    <el-main >
      <template v-for="(item,index) in message.messageList" :key="index">
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

export default {
  name: "MessageRow",
  components:{singleMessage},
  props: {
    message: {
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

    return {

  }

}
}
</script>