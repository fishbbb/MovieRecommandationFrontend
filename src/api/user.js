import request from "@/utils/request";

const userRequest = {
    //用户登录

    //用户自己的评论记录查看

    //用户收藏列表

    //TODO:用户收藏一个电影
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
    }
}


export default userRequest