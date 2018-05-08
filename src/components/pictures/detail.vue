<template>
  <div class="page">
    <detail :article="picInfo">
      <div slot="pics">
        <vue-preview :slides="thumbs"></vue-preview>
      </div>
    </detail>
    <comment :id="$route.params.id"></comment>
  </div>
 
</template>

<script>
import detail from '../../components/common/detail'
import axios from 'axios'
import comment from '../common/comment'

export default {
  data(){
    return {
      picInfo:[],
      thumbs:[]
    }
  },
  created(){
    // 这是图片描述的请求
    axios({
      url:"http://www.escook.cn:3000/api/getimageInfo/"+this.$route.params.id
    }).then(res => {
      if(res.data.status == 0){}
      this.picInfo = res.data.message[0]
    })

  //这是请求图片的
    axios({
      url:"http://www.escook.cn:3000/api/getthumimages/"+this.$route.params.id
    }).then(res =>{
      // 拿到存储图片的数组
      //由于后台不够健全,只返回了图片地址，我们需要用vue-preview插件
      //来做放大图片的轮播效果，需要给返回的数据添加一些属性
      //去main.js中下载安装vue-preview
        res.data.message.forEach(v => {
            v.msrc = v.src;
            v.alt = "pic";
            v.title = "缩略图";
            v.w = 600;
            v.h = 400;
        })
      //然后再赋值给我们的pics 
      this.thumbs = res.data.message
    })
  },

  components:{
    detail,
    comment
  }
}
</script>

<style>
.pic-detail{
    padding-left: 5px;
    padding-right: 5px;
}

.my-gallery img{
  /* width: 20%; */
  width: 100%;
  margin: 1%;
  box-shadow: 0 0 3px 0px;
}

figure{
    display: inline-block;
    margin: 5px;
    width: 20%;
}
</style>
