import request from "@/utils/request";

const adminRequest = {

    //TODO:管理员页面相关接口

    //心跳检测数据获取
    //GET /security/logs
    getLogs:() => {
        return request({
            url:'/security/logs',
            method:'get',
            headers:{
                isNeedToken:true
            }
        })
    },

    //异常IP
    //GET security/abnormal-ips
    getAbnormalIp:() => {
        return request({
            url:'security/abnormal-ips',
            method:'get',
            headers:{
                isNeedToken:true
            }
        })
    },

    //返回当前QPS
    //GET security/qps/now
    getCurrentQPS:() => {
        return request({
            url:'security/qps/no',
            method:'get',
            headers:{
                isNeedToken:true
            }
        })
    },

    //返回历史QPS
    //GET security/qps/history
    getHistoryQPS:(start,end) =>{
        return request({
            url:'security/qps/no',
            method:'get',
            headers:{
                isNeedToken:true
            },
            params:{
                time_start:start,
                time_end:end,
                page:1,
                page_size:10,
            }
        })
    },


    //返回当前服务器组健康状态
    //GET security/server-state/now
    getServerState:() =>{
        return request({
            url:'security/server-state/now',
            method:'get',
            headers:{
                isNeedToken:true
            },
        })
    },

    //TODO:页面没有这个内容
    //返回历史服务器组健康状态
    //GET security/server-state/history
    getHistoryServerState:(start,end) =>{
        return request({
            url:'security/server-state/history',
            method:'get',
            headers:{
                isNeedToken:true
            },
            params:{
                time_start:start,
                time_end:end,
                page:1,
                page_size:10,
            }
        })
    },

    //---------用户管理----------------
    //禁止用户发表评论
    //POST users/shut-you-fxxking-up
    userCommentBan:(data) =>{
        return request({
            url:'users/shut-you-fxxking-up',
            method:'post',
            headers:{
                isNeedToken:false
            },
            data
        })
    },

    //干掉用户
    //POST users/ban
    deleteUser:(data) =>{
        return request({
            url:'users/ban',
            method:'post',
            headers:{
                isNeedToken:false
            },
            data
        })
    },

    //-----------电影管理------------
    //广告位增加电影
    //POST movies/ad
    addAdMovie:(data)=>{
        return request({
            url:'movies/ad',
            method:'post',
            headers:{
                isNeedToken:true
            },
            data
        })
    },
    //DELETE movies/ad
    deleteAdMovie:(data)=>{
        return request({
            url:'movies/ad',
            method:'delete',
            headers:{
                isNeedToken:true
            },
            data
        })
    },
}

export default adminRequest