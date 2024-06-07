<template>
  <div>
    <el-carousel trigger="click" height="250px" :interval="3000" arrow="always" style="width:800px" >

      <el-carousel-item v-for="item in imgList" :key="item.id" >
<!--        <router-link to="movie/info">-->
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
          src: require("@/assets/logo.png"),
          title: "这是lj.png"
        },
        {
          id:"2",
          name: "logo",
          src: require("@/assets/logo.png"),
          title: "这是logo.png"
        },
        {
          id:"3",
          name: "bg",
          src: require("@/assets/logo.png"),
          title: "这是bg.png"
        },
        {
          id:"4",
          name: "sadmas",
          src: require("@/assets/logo.png"),
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

<style lang="scss">
</style>