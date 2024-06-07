import request from "@/utils/request";

const userRequest = {
    //用户登录
    //POST/login
    //TODO:返回登录是否成功以及token
    login: (loginForm) => {
        return request({
            url: '/login',
            method: 'post',
            headers: {
                isNeedToken: false
            },
            loginForm
        })
    },
    //用户注册
    //TODO:不需要这个功能
    register: (data) => {
        return request({
            url: '/register',
            method: 'post',
            headers: {
                isNeedToken: false
            },
           data
        })
    },

    //获取用户收藏的电影
    //GET /users/favorite
    getCollections:(id)=>{
        return request({
            url: `/users/favorite`,
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params:{
                userID:id
            }
        })
    },

    //用户收藏电影
    //POST /users/favorite
    addCollections:(data)=>{
        return request({
            url: `/users/favorite`,
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data
        })
    },
    deleteCollections:(data)=>{
        return request({
            url: `/users/favorite`,
            method: 'delete',
            headers: {
                isNeedToken: true,
            },
            data
        })
    },

    //------------用户影评---------------
    //增加影评和评分
    //POST /movies/comment-rating
    addComment: (data) => {
        return request({
            url: `/movies/comment-rating`,
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data
        })
    },

    //删除影评及评分
    //TODO：用户只有自己的评论后面显示删除键
    //DELETE /movies/comment-rating
    deleteComment: (data) => {
        return request({
            url: `/movies/comment-rating`,
            method: 'delete',
            headers: {
                isNeedToken: true,
            },
            data
        })
    },

    //查询单个影评及评分
    //TODO:这是干嘛用的
    //GET /movies/comment-rating
    getComment: (userID,movieID) => {
        return request({
            url: `/movies/comment-rating`,
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params:{
                userID:userID,
                movieID:movieID
            }
        })
    },

    //查询所有影评及评分
    //TODO：或许需要新增加一个页面
    //GET /movies/comment-rating/all
    getUserAllComments:(userID) => {
        return request({
            url: `/movies/comment-rating/all`,
            method: 'get',
            headers: {
                isNeedToken: true,
            },
            params:{
                userID:userID,
                page:1,
                page_size:10
            }
        })
    }

}


export default userRequest