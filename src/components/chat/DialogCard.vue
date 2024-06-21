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
    font-weight: 700;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .session-other{
    width: 95%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    font-size: 12px;
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
      z-index: 10;
      position: absolute;
      top:10px;
      right:10px;
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