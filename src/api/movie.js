import request from "@/utils/request";

const movieRequest = {

    //获取广告位电影（所有）：GET movies/ad
   getAdMovie:()=>{
       return request({
           url:'movies/ad',
           method:'get',
           headers:{
               isNeedToken:false
           }
       })
   },

    //获取用户推荐电影：GET /users/recommendations
    getRecommendedMovie: (userId) => {
        return request({
            url: `/users/recommendations`,
            method: 'get',
            headers: {
                isNeedToken: true
            },
            params: {
                userID: userId,
                num: 10
            }
        })
    },

    //用超级无敌强强强大搜索中的popularity:GET /movies/search
    getHottestMovies: () => {
        return request({
            url: '/movies/search',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params:{
                sort_by_popularity:0,
                page:1,
                page_size:10,
            }
        })
    },
    getMoviesWithConditions:(optionalParams)=>{
       return request({
           url:'movie/search',
           method:'get',
           headers: {
               isNeedToken: false
           },
           params:{
               optionalParams
           }
       })
    },
    //主页面的评分最高榜单获取:GET /movies/search
    getHighestRatedMovies: () => {
        return request({
            url: '/movies/search',
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params:{
                sort_by_ratings:0,
                page:1,
                page_size:10,
            }
        })
    },

    //获取单个电影详情：GET /movies
    getMovieInfo: (id) => {
        return request({
            url: `/movies`,
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                id: id
            }
        });
    },

    //TODO:评论区获取
    //GET /api/movies/ratings/comment/{id}
    getComments: (id) => {
        return request({
            url: `/movies/comments`,
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                id: id
            }
        });
    },

    //用户上传评论：POST /movies/comment
    addComment: (data) => {
        return request({
            url: `/movies/comment`,
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            data
        })
    },
}

export default movieRequest