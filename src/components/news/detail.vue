<template>
  <div class="page news">
    <detail :article="newsList"></detail>
    <div class="news-comment">
      <comment :id="$route.params.id"></comment>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dateformat from "@/filters/dateformat";
import axios from "axios";
import detail from '../common/detail'
import comment from "../common/comment.vue";
export default {
  data() {
    return {
      newsList: {}
    };
  },
  created() {
    axios({
      url: "http://www.escook.cn:3000/api/getnew/" + this.$route.params.id
    }).then(res => {
      if (res.data.status == 0) {
        this.newsList = res.data.message[0];
      }
    });
  },
  filters: {
    dateformat
  },
  components: {
    comment,
    detail
  }
};
</script>

<style>
.news {
  padding-left: 5px;
  padding-right: 5px;
}

.news-content img {
  width: 100%;
}

.news-comment {
  margin-bottom: 10px;
}
</style>
