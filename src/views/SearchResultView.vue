<template>
<div>test</div>
</template>

<script>
import movieRequest from "@/api/movie";
import {useRoute} from "vue-router";
export default {
  name:'SearchResult',
  data(){
    return{
      searchKeywords: null,
      searchResultList:[],
    }
  },
  created() {
    const route = useRoute(); // Use useRoute to get the current route
    this.searchKeywords = route.query.searchKeywords; // Access the id from the current route
    console.log(this.searchKeywords)
  },
  methods:{
    fetchSearchResult(){
      movieRequest.search(this.searchKeywords).then(res => {
        console.log(res)
        this.searchResultList = res;
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>