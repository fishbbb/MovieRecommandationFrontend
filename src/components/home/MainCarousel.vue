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
import {useRouter} from "vue-router";

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
      ]
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleCarouselClick(index) {
      const clickedImage = this.imgList[index];
      console.log(`Clicked image id: ${clickedImage.id}`);
      let router = useRouter();
      // router.push({ path: "/movie/info/${clickedImage.id}" })
      router.push({ path: "/movie/info" })
    }}
};
</script>

<style lang="scss">
</style>