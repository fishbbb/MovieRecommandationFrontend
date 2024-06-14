<template>

  <div class="chat-panel">
    <div class="dialog-sider">
        <div class="dialog-title">ChatABC</div>
        <div class="dialog-subtitle">Build Your Own AI Assistant</div>
      <template v-for="(dialog, index) in messageData.messageHistory"
                :key="index">
        <DialogCard :messageDialog="dialog" class="dialog-card" v-model="listId" @click="selectDialog(dialog.listId)"/>
      </template>

        <el-button class="dialog-new" :icon="Plus" @click="addNewDialog">新的聊天</el-button>
    </div>
    <div class="dialog-main">
      <MessageRow  class="messageRow" :message="
          messageData.messageHistory.filter(dialog => dialog.listId === listId)[0]" />
      <div class="dialog-input">
      <el-input
          placeholder="请输入内容"
          class="input-with-select"
          :rows="7"
          type="textarea"
          v-model="userInput"
          maxlength="200"
      >
      </el-input>
      <el-button class="send-message" :icon="Position" @click="sendMessage(listId)">发送</el-button>
    </div>
    </div>

  </div>
</template>

<style scoped>
.chat-panel{
  width: 100%;
  height: 95vh;
  //background-color: #5a84fd;
  display: flex;
  border-radius: 10px;
  border: #8cbee1 1px solid;

}
.dialog-sider{
  width: 40%;
  height: 100%;
  background-color: rgba(79, 164, 34, 0.2);
  position: relative;

}
.dialog-title,
.dialog-subtitle
{
  margin-left: 20px;
}
.dialog-title{
  font-size: 30px;
  margin-top: 10px;
}
.dialog-subtitle{
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 10px;
}
.dialog-card{
  margin-top: 20px;
}
.dialog-new{
  border-radius: 5px;
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.dialog-main{
  width: 60%;
  height: 100%;
  position: relative;
}
.messageRow{
  position: absolute;
  height:calc(100% - 160px);
  left: 0;
}
.dialog-input{
  position: absolute;
  bottom: 10px;
  width: 86%;
  height: 160px;
  left:calc(50% - 43%);
}
.input-with-select{
  position: absolute;
  width: 100%;
  top:5px;
}
.send-message{
  border: none;
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
<script>
import DialogCard from "@/components/chat/DialogCard.vue";
import {Plus, Position} from "@element-plus/icons";
import {reactive, ref} from "vue";
import MessageRow from "@/components/chat/MessageRow.vue";


export default {
  name:"ChatConversation",
  computed: {
    Position() {
      return Position
    },
    Plus() {
      return Plus
    },

  },
  components: {MessageRow, DialogCard},
  data(){
    const userInput = ref('');
    const listId = ref(1);
    const messageData=reactive({
      userId: 1,
      messageHistory:[
          {
            title: "test",
            listId: 1,
            messageList: [
          {
            messageId: 1,
            role: "user",
            content: "你好",
          },
          {
            messageId: 2,
            role: "chat",
            content: "你好，我是属于你的专属机器人！",
          },
          {
            messageId: 3,
            role: "user",
            content: "请问你有什么事吗？",
          },
          {
            messageId: 4,
            role: "chat",
            content: "当然，我是一个AI助手，我可以回答你的问题，也可以给你推荐电影。",
          }
        ],
            updateTime: new Date().toLocaleString(),
          },
          {
            title:"lsy么么",
            listId: 2,
            messageList: [
        {
          messageId: 1,
          role: "chat",
          content: "请告诉我你的名字",
        },
        {
          messageId: 2,
          role:"user",
          content: "我是你爸爸！"
        }],
            updateTime: new Date().toLocaleString(),
          }
      ]
    }

    )
    return {
      userInput,
      listId,
      messageData
    }
  },
  methods:{
    addNewDialog() {
      console.log("delete");
      let currentHistory = this.messageData.messageHistory;
      currentHistory.push({
        title: "新的对话",
        listId: currentHistory.length + 1,
        updateTime: new Date().toLocaleString(),
        messageList: '',
      })
    },
    sendMessage(listId){
      let currentList = this.messageData.messageHistory.filter(dialog => dialog.listId === listId)[0].messageList || [];
      currentList.push({
        messageId: currentList.length + 1,
        role: "user",
        content: this.userInput,
      });
      this.userInput = '';
      this.messageData.messageHistory.filter(dialog => dialog.listId === listId)[0].updateTime = new Date().toLocaleString();
      },
    selectDialog(userId){
      this.listId = userId;
      console.log(this.listId);
    }
  }
}

</script>