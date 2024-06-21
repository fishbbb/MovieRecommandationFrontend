<template>
  <div :class="['oneMessage',message.role === 'user'?'message-right':'message-left']">
    <div class="avator-wrapper">
      <el-avatar :src="message.role === 'user'? userAvatar: chatAvatar" />
    </div>
    <div class="dialog-content">
      {{message.content}}
    </div>
  </div>
</template>

<style scoped>
.oneMessage{
  margin-top: 15px;
  width: 100%;
}
.dialog-content{
  border-radius: 5px;
  padding: 10px;
  overflow-x: hidden;
}


</style>
<script>


export default ({
  name: "singleMessage",
  props:{
    message:{
      type:Object,
      required:true,
    }
  },
  data(){
    return{
      userAvatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      chatAvatar:'https://static.vecteezy.com/system/resources/previews/018/764/128/original/chatgpt-logo-open-ai-icon-with-chatbot-artificial-intelligence-openai-chatbot-icon-chatgpt-openai-icon-artificial-intelligence-smart-ai-virtual-smart-assistant-bot-free-vector.jpg',
    };
  }
})
</script>
