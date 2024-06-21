import request from "@/utils/request";

const movieRequest = {

    //获取广告位电影（所有）：GET movies/ad
    getAdMovie:()=>{
        return request({
            url:'/movies/ad',
            method:'get',
            headers:{
                isNeedToken:false
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
                movieid: id
            }
        });
    },

    //获取制定电影的影评和评分
    //GET /movies/comments
    getComments: (id,page,size) => {
        return request({
            url: `/movies/comments`,
            method: 'get',
            headers: {
                isNeedToken: false
            },
            params: {
                movieid: id,
                page:page,
                page_size:size,
            }
        });
    },

    //联想搜索 GET /movies/search-suggestions
    //TODO：返回电影的名字、movieID、图片url、发行日期、主演
    searchSuggestions:(input) => {
        return request({
            url:'/movies/search-suggestions',
            method:'get',
            headers:{
                isNeedToken:false,
            },
            params:{
                input:input,
                size:5,
            }
        })
    },

    //超超超超级强大搜索的应用
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

    //分类
    getMoviesWithConditions:(newParams)=>{
        return request({
            url:'/movie/search',
            method:'get',
            headers: {
                isNeedToken: false
            },
            params:newParams
        })
    },

    //搜索框搜索结果
    search:(input,page,size) => {
        return request({
            url:'/movies/search',
            method:'get',
            headers:{
                isNeedToken:false,
            },
            params:{
                input:input,
                page:page,
                page_size:size
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
                userid: userId,
                num: 10
            }
        })
    },

}

export default movieRequest
