import request from "@/utils/request";

const movieRequest = {
    //TODO：主页面广告位轮播图获取

    //TODO:主页面的个性化推荐获取
    //GET /api/users/recommendations/{userId}
    getRecommendedMovie:(userId) =>{
        return request({
            url: `/api/users/recommendations/${userId}`,
            method: 'get',
            headers: {
                isNeedToken: false
            },
        })
    },

    //TODO：主页面的本站热榜获取
    //GET /api/movies/rankings/weekly
    getHottestMovies: () => {
        return request({
            url: '/api/movies/rankings/weekly',
            method: 'get',
            headers: {
                isNeedToken: false
            },
        })
    },

    //TODO:主页面的评分最高榜单获取
    //GET /api/movies/rankings
    getHighestRatedMovies: () => {
        return request({
            url: '/api/movies/rankings',
            method: 'get',
            headers: {
                isNeedToken: false
            },
        })
    },

    //TODO:电影详情页信息获取
    //GET /api/movies/{id}
    getMovieInfo: (id) => {
        return request({
            url: `/api/movies/${id}`,
            method: 'get',
            headers: {
                isNeedToken: false
            }
        });
    },
    //TODO:评论区获取
    //GET /api/movies/ratings/comment/{id}
    getComment:(id) => {
        return request({
            url: `/api/movies/ratings/comment/${id}`,
            method: 'get',
            headers: {
                isNeedToken: false
            }
        });
    },
    //TODO:用户评论上传接口
    //POST /api/movies/ratings/{id},请求体包含userId、rating和comment
    addComment:(userId,rating,comment)=>{
        return request({
            url: `/api/movies/ratings/${userId}`,
            method: 'post',
            headers: {
                isNeedToken: true,
            },
            params: {
                userId: userId,
                rating: rating,
                comment: comment,
            }
        })
    }
}

export default movieRequest