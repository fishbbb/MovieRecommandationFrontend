import request from "@/utils/request";

const chatRequest = {
    //获取聊天列表
    //GET /chat/list
    getChatList:(Authorization) => {
        return request({
            url:'/chat/list',
            method:'get',
            headers:{
                isNeedToken: true,
                Authorization: Authorization
            },
        })
    },


    //发送消息
    //POST /chat
    submitMassage:(data,ListId) => {
        return request({
            url:'/chat',
            method:'post',
            headers:{
                isNeedToken:true,
            },
            params:{
                listId:ListId,
                content:data,
            }

        })
    }
}


export default chatRequest