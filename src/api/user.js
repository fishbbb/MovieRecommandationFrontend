import request from "@/utils/request";

const userRequest = {
    //用户登录
    login: (loginForm) => {
        return request({
            url: '/login',
            method: 'post',
            headers: {
                isNeedToken: false
            },
            data: loginForm
        })
    },

    //用户自己的评论记录查看

    //用户收藏列表
    getCollections:(id)=>{
        return request({
            url: `/users/favorite`,
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            id
        })
    },
    //POST /users/favorite
    addCollections:(id)=>{
        return request({
            url: `/users/favorite`,
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            id
        })
    },
    deleteCollections:(id)=>{
        return request({
            url: `/users/favorite`,
            method: 'delete',
            headers: {
                isNeedToken: true,
            },
            id
        })
    }
}


export default userRequest