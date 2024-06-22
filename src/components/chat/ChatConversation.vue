<template>

  <div class="chat-panel">
    <div class="dialog-sider">
        <div class="dialog-title">ChatABC</div>
        <div class="dialog-subtitle">Build Your Own AI Assistant</div>
      <template v-for="(dialog, index) in messageData"
                :key="index">
        <DialogCard :messageDialog="dialog" class="dialog-card" v-model="listId" @click="selectDialog(dialog.listId)"/>
      </template>

        <el-button class="dialog-new" :icon="Plus" @click="addNewDialog">新的聊天</el-button>
    </div>
    <div class="dialog-main">
      <MessageRow  class="messageRow" v-if="messageData && messageData.length > 0" :messagelist="
          messageData.filter(dialog => dialog.listId === listId)[0].messageList" />
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
import chatRequest from "@/api/chat";
import store from "@/store/store";


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
    const token = store.state.token;
    //const userId = 1;
    //const Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VybmFtZSI6Ind4ZCIsIlVzZXJJRCI6MjcwOTIyLCJleHAiOjE3MTkyNjUyODMsImlhdCI6MTcxOTAwNjA4MywianRpIjoiOTVkZTBiMDctODFhZS00ZmI1LTk3ZTYtOGVhNzRkNWY3MzdlIiwiYXV0aG9yaXRpZXMiOltdfQ.k6fZ08jVbfNphTwgZn1Y1_UvNx3FoG1c8NR_h-v6SM4';
    const messageData=reactive(
      [
          {
            listId: 1,
            messageList: [
          {
            role: "user",
            content: "你好",
          },
          {
            role: "chat",
            content: "你好，我是属于你的专属机器人！",
          },
          {
            role: "user",
            content: "请问你有什么事吗？",
          },
          {
            role: "chat",
            content: "当然，我是一个AI助手，我可以回答你的问题，也可以给你推荐电影。",
          }
        ],
            updateTime: new Date().toLocaleString(),
          },
          {
            listId: 2,
            messageList: [
            {
              role: "chat",
              content: "请告诉我你的名字",
            },
            {
              role:"user",
              content: "我是你爸爸！"
          }],
            updateTime: new Date().toLocaleString(),
          }
      ]
    );
    return {
      userInput,
      listId,
      messageData,
      token,
    }
  },
  created() {
    this.fetchChatList(this.userId);
  },
  methods:{
    fetchChatList(token){
        chatRequest.getChatList(token)
            .then((res) => {
              console.log("test",res);
              const {chatList,code,message,num} = res;
              this.messageData = chatList;
              console.log("mess",this.messageData);
            })
            .catch((err) => {
              console.log(err);
            })
    },
    addNewDialog() {
      let currentHistory = this.messageData;
      currentHistory.push({
        listId: currentHistory.length + 1,
        updateTime: new Date().toLocaleString(),
        messageList: [{"role":'',"content":'新的对话'}],
      })
      console.log(currentHistory);
    },
    sendMessage(listId){
      //let chatList = '';
      if(listId !== undefined && this.userInput){
        let oldChatList=this.messageData.filter(dialog => dialog.listId === listId)[0];
        console.log("old",oldChatList);
        let newMessage = {
          role: "user",
          content: this.userInput,
        };
        oldChatList.messageList.push(newMessage);
        chatRequest.submitMassage(this.userInput,listId)
            .then((res) => {
              const {chatList} = res;
              console.log(chatList + "success");
              // setTimeout(() => {
              //       currentList.push({
              //         ...chatList.content,
              //         role: "chat",
              //       })}
              //     ,2000);
              oldChatList = chatList.filter(dialog => dialog.listId === listId)[0];

            })
            .catch((error)=>{
              console.log(error);
            })
        //发送后清空输入框
        this.userInput='';
        //最后修改时间
        this.messageData.filter(dialog => dialog.listId === listId)[0].updateTime = new Date().toLocaleString();
      }
      else if(!this.userInput){
        alert("请输入内容!");
      }

      //chatList.title = currentList[0].content.substring(0, 10) + "...";
      //根据用户id和当前对话id提交消息，返回chat回答内容


      },
    selectDialog(userId){
      this.listId = userId;
      console.log(this.listId);
    }
  }
}

</script>