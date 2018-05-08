<template>
  <div>
    <h4>发表评论</h4>
    <hr>
    <textarea name="" id="" cols="30" rows="3" v-model="content"></textarea>
    <button type="button" class="mui-btn mui-btn-royal mui-btn-block" @click="addComment">发表评论</button>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="(v,i) in commentList" :key="i">
        <a href="javascript:;" class="">
          <p>
            <span>第{{i+1}}楼</span>
            <span>发表时间：{{v.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}</span>
            <span class="mui-pull-right">{{v.user_name}}</span>
          </p>
          <img class="mui-media-object mui-pull-right" src="../../assets/images/menu1.png">
          <div class="mui-media-body">
            <p class="mui-ellipsis" v-text="v.content"></p>
          </div>
        </a>
      </li>
		</ul>
    <button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" v-show="showMoreBtn" @click="more">加载更多</button>
  </div>
</template>

<script>
import axios from "axios";
import dateformat from "../../filters/dateformat";
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      commentList: [],
      content: "",
      currentIndex: 1,
      showMoreBtn: true
    };
  },
  props: ["id"],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios({
        url:
          "http://www.escook.cn:3000/api/getcomments/" +
          this.id +
          "?pageindex=" +
          this.currentIndex
      }).then(res => {
        if (res.data.status == 0) {
          this.commentList.push(...res.data.message);
          if (res.data.message.length == 0) {
            this.showMoreBtn = false;
            Toast("没有更多的数据了~");
          }
        }
      });
    },
    addComment() {
      if (this.content.trim()) {
        axios({
          url: "http://www.escook.cn:3000/api/postcomment/" + this.id,
          method: "post",
          data: "content=" + this.content
        }).then(res => {
          if (res.data.status == 0) {
            this.commentList.unshift({
              add_time: new Date(),
              content: this.content,
              user_name: "匿名用户"
            });
            this.content = "";
          }
        });
      }
    },
    more() {
      this.currentIndex++;
      this.getData();
    }
  },
  filters: {
    dateformat
  }
};
</script>

<style scoped>
textarea {
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>


