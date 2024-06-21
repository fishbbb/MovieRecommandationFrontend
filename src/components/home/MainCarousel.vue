<template>
  <div class="carousel-container">
    <el-carousel trigger="click" height="70vh" :interval="3000" arrow="always"
                 class="carousel">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <router-link :to="{ path: '/movie/info', query: { id: item.id } }">
          <img :src="item.src" style="height:100%;width:100%;" alt="图片丢失了" :title="item.title" />
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import movieRequest from "@/api/movie";

export default {
  name:"MainCarousel",
  components: {},
  data() {
    return {
      imgList: [
        {
          id:"1",
          name: "lj",
          //src: require("@/assets/logo.png"),
          src:'https://img.zcool.cn/community/019e495c4bfcf7a801203d228149d2.jpg@1280w_1l_2o_100sh.jpg',
          title: "这是lj.png"
        },
        {
          id:"2",
          name: "logo",
          //src: require("@/assets/logo.png"),
          src:'https://img.zcool.cn/community/01aeb95ecf5b73a801206621a7147c.jpg@1280w_1l_2o_100sh.jpg',
          title: "这是logo.png"
        },
        {
          id:"3",
          name: "bg",
          //src: require("@/assets/logo.png"),
          src:'https://ts1.cn.mm.bing.net/th/id/R-C.0239dcde91bade23a97386332ac823cd?rik=YUzixrMXE49A4Q&riu=http%3a%2f%2fn.sinaimg.cn%2fsinakd20230109ac%2f399%2fw1719h1080%2f20230109%2f3700-720c9571349152aa9346fd0930d49647.jpg&ehk=UBPFLgki6L7ofQ9zPw8O%2fa80cDKsPBmcK9nBCAj%2bMpA%3d&risl=&pid=ImgRaw&r=0',
          title: "这是bg.png"
        },
        {
          id:"4",
          name: "sadmas",
          //src: require("@/assets/logo.png"),
          src:'https://static-cse.canva.cn/blob/234790/b33338ccb83c3ca921a5c9d34773213.jpg',
          title: "这是sadmas.png"
        }
      ],
      adList:[]
    };
  },
  created() {
    this.fetchAdMovie();
  },
  computed: {},
  methods: {
    fetchAdMovie(){
      movieRequest.getAdMovie().then(res => {
        console.log(res)
        this.adList = res.data
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
.carousel-container{
  width: 90%;
}

/deep/ .el-carousel__arrow {
  //color: #dfb518 !important;
  //background-color: #5a84fd !important;
  border: 2px #dfb518 solid;
  border-radius: 0;
  height: 100px;
  width: 50px;
  font-size: 30px;
}
/deep/ .el-carousel__arrow:hover{
  
}

</style>