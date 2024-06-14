<template>
  <div class="active-session">
    <div class="session-name">{{messageDialog.title}}</div>
    <div class="btn-wrapper">
      <el-icon :size="15" class="close" @click="handleClose">
        <CircleClose />
      </el-icon>
    </div>
    <div class="session-other">
      <div class="session-count">{{messageDialog.messageList.length}}条对话</div>
      <div class="session-time">{{messageDialog.updateTime}}</div>
    </div>

    <div class="mask"></div>
  </div>
</template>

<style scoped>
  .active-session{
    width:80%;
    height: 60px;
    border-radius: 10px;
    //border: #5a84fd 1px solid;
    padding: 12px;
    margin: 15px auto;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    overflow: hidden;
    position: relative;

    cursor: pointer;
  }
  .active-session:hover{
    border: #2b7e48 2px solid;
  }
  .session-name{
    font-size: 18px;
    width: 50%;
    font-weight: 700;
  }
  .session-other{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 12px;
  }
  .session-count{
    width:40%;
  }
  .session-time{
    width: 60%;
    text-align: right;
  }
  .mask{
    transition: all 0.2s ease-out;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index:2;
  }
  .mask:hover{
    opacity: 1;
    background-color: rgba(134, 180, 212, 0.36);
  }
  .btn-wrapper{
      width: 50%;
      text-align: right;
      z-index: 10;
  }
  .close:hover{
    cursor: pointer;
    color: #8e1b39;
    z-index: 10;
  }

</style>

<script>

export default ({
  name: "DialogCard",
  props:{
    messageDialog:{
      type: Object,
      required:true,
    }
  },
  data(){
    return {

    };
  }
})
</script>