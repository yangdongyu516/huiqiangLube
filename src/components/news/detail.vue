<template>
  <div class="page news">
    <div class="news-detail">
      <div class="news-title">
        <h4>{{ newsList.title }}</h4>
        <p>
          <span>发表时间: {{ newsList.add_time | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
          <span>点击： {{newsList.click}}</span>
        </p>
      </div>
      <div class="news-content" v-html="newsList.content"></div>
    </div>
    <div class="news-comment">
      <comment :id="$route.params.id"></comment>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import dateformat from "@/filters/dateformat";
import axios from "axios";

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
    comment
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
