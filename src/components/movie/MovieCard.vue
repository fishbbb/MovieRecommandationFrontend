<template>
  <div class="card">
    <slot name="header"></slot>

    <router-link :to="{ path: '/movie/info', query: { id: movie.movieID } }">
      <!--      <a :href="`/movie/info/${movie.id}`" target="_blank">-->

      <div class="image-div">
        <el-image  ref="image" :src="movie.url" class="image" @mouseover="blurImage" @mouseleave="unblurImage">
          <template #error>
            <div class="image-error">
              <film class="center-image-error"></film>
              <img class="background-image-error" src="../../assets/logo.png" alt="default"/>
            </div>
          </template>
        </el-image>
        <div class="mask" ref="mask" @mouseover="blurImage" @mouseleave="unblurImage">{{movie.description}}</div>
      </div>

      <div class="text-content" style="padding: 1rem">
        <el-tooltip
            class="box-item"
            effect="light"
            :content="`${ movie.name }`"
            placement="top"
        >
          <div class="line-limit-length">{{ movie.title }}</div>
        </el-tooltip>

        <div class="rate">{{ movie.voteAverage}}</div>
        <div class="release-time">Release At {{ movie.releaseDate }}</div>
      </div>
    </router-link>


    <slot name="footer"></slot>
  </div>
</template>

<script>
// import {PictureFilled, PictureRounded} from "@element-plus/icons-vue";
import {computed, ref} from "vue";

export default {
  name: "MovieCard",
  // components: {PictureRounded, PictureFilled},
  props: {
    movie: {
      type: Object,
    }
  },
  methods: {
    blurImage() {
      if (this.$refs.image && this.$refs.mask) {
        this.$refs.image.$el.style.filter = "blur(5px)";
        this.$refs.mask.style.opacity = 1;
      }
    },
    unblurImage() {
      //确保在访问其属性之前，this.$refs.image 被正确初始化。
      if (this.$refs.image && this.$refs.mask) {
        this.$refs.image.$el.style.filter = "none";
        this.$refs.mask.style.opacity = 0;
      }
    }
  },
  setup(props) {
    let score = computed(() => {
      return props.movie.score / 2;
    })

    //let pic = ref(props.movie.pic);
    return {
      props,
      score,

      //pic
    }
  }
}
</script>

<style lang="less" scoped>

.card {
  position: relative;
  border-radius: 1.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: #eaeaf6;
  /*box-shadow: 10px 10px 20px #888888;*/
  //max-height: 25rem;
  //min-height: 25rem;

  width: 15.0rem;
  //height: 30rem;
  margin-bottom: 1rem;
}

.card:hover {
  border-style: solid;
  border-color: #f2f2f6;
  border-radius: 0.5rem;
  border-width: 1px;
  //box-shadow: 0 10px 20px #dcdbdb;
  transition: all 0.2s;
  transform: scale(1.1);
}

.image-div {
  margin: 0 auto;
  width: 15.0rem;
  max-height: 19.8rem;
  min-height: 19.8rem;
  background-color: #f5f7fa;
  position: relative;
}
.image {
  border-radius: 0.5rem;
  width: 100%;
  height: 19.8rem;
}
.mask{
  opacity: 0;
  background-color: rgba(63, 46, 46, 0.85);
  position: absolute;
  top:60%;
  left:0;
  width:80%;
  height:30%;
  text-align: center;
  //line-height: 40%;
  padding:10% 10% 0 10%;
}
.text-content{
  position: relative;
  height: 4rem;
}
.line-limit-length {
  width: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /*文本不换行，这样超出一行的部分被截取，显示...*/
  font-size: 1.2rem;
  font-weight: bold;
  color:white;
  position: absolute;
  top: 0.8rem;
  left: 0.5rem;
}

.rate {
  width: 20%;
  //text-align: right;
  font-size: 22px;
  font-weight: bold;
  color: #c3792a;
  position: absolute;
  bottom: 1rem;
  right: 0.1rem;
}
.release-time{
  position: absolute;
  margin-top: 2.0rem;
  left: 0.8rem;
  color: white;
}
.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100%;
  width: 100%;

  .center-image-error {
    position: absolute;
    justify-content: center;
    width: 2rem;
  }

  .background-image-error {
    width: 100%;
    height: 100%;
  }
}

/*未访问：蓝色、无下划线*/
a:link {
  color: #420068;
  text-decoration: none;
}

/*激活：红色*/
a:active {
  color: #b53838;
}

/*已访问：紫色、无下划线*/
a:visited {
  color: black;
  text-decoration: none;
}

/*鼠标移近：红色、下划线*/
a:hover {
  color: #3ca390;
  text-decoration: none;
}

</style>