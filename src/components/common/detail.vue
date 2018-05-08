<template>

   <div class="news-detail">
      <div class="news-title">
        <h4>{{ article.title }}</h4>
        <p>
          <span>发表时间: {{ article.add_time | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
          <span>点击： {{article.click}}</span>
        </p>
      </div>
      <slot name="pics"></slot>
      <div class="news-content" v-html="article.content"></div>
    </div>

</template>

<script>
import dateformat from "../../filters/dateformat";
export default {
  props: ["article"],
  filters: {
    dateformat
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

