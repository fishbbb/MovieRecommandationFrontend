import request from "@/utils/request";

const chatRequest = {
    //获取聊天列表
    //GET /chat/list
    getChatList:(userID) => {
        return request({
            url:'/chat/list',
            method:'get',
            headers:{
                isNeedToken:true,
            },
            params:{
               userID:userID
            }
        })
    },

    //获取某一聊天的历史
    //GET /chat/history
    getOneChat:(userID,listID) => {
        return request({
            url:'/chat/history',
            method:'get',
            headers:{
                isNeedToken:true,
            },
            params:{
                userID:userID,
                listID:listID
            }
        })
    },

    //发送消息
    //POST /chat
    submitMassage:(data) => {
        return request({
            url:'/chat',
            method:'post',
            headers:{
                isNeedToken:true,
            },
            data
        })
    }
}


export default chatRequest