<template>
  <div class="page">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(v, i) in lunbos" :key="i">
              <img :src="v.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <!--页眉，放置标题-->
      <div class="mui-card-header">{{ goodsInfo.title }}</div>
      <!--内容区-->
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
              <span>市场价：
                  <del>￥{{goodsInfo.market_price}}</del>
              </span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>销售价：
                  <span class="sale_price">￥{{goodsInfo.sell_price}}</span>
              </span>
          </div>
          <!-- 选择购买数量框 -->
          <div class="count">
            <span>购买数量：</span>

              <numberbox :max="goodsInfo.stock_quantity" :min="0" :step="1" v-model="count"></numberbox>
           
            <div class="btns">
                <mt-button type="primary">立即购买</mt-button>
                <mt-button type="danger" @click="addCart">加入购物车</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号：{{goodsInfo.goods_no}}</p>
                <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                <p>上架时间：{{goodsInfo.add_time | dateformat("YYYY-MM-DD HH:mm:ss")}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" size="large" :plain="true" @click="$router.push('/goods/desc/' + goodsInfo.id)">商品描述</mt-button>
            <br>
            <mt-button type="danger" size="large" :plain="true" @click="$router.push('/goods/comment/' + goodsInfo.id)">商品评论</mt-button>
        </div>
    </div>
    <transition v-on:before-enter="beforeEnter" v-on:enter="enter">
      <div class="redball" v-show="isShowBall"></div>
    </transition>
  </div>
 
</template>

<script>
import numberbox from '../common/numberbox'
import dateformat from '../../filters/dateformat'
import axios from "axios";
export default {
  data() {
    return {
      lunbos: [],
      goodsInfo: {},
      count:0,
      isShowBall:false
    };
  },
  created() {
    // 图片数据
    axios({
      url:
        "http://www.escook.cn:3000/api/getthumimages/" + this.$route.params.id
    }).then(res => {
      if (res.data.status == 0) {
        this.lunbos = res.data.message;
      }
    });
    // 商品信息
    axios({
      url:
        "http://www.escook.cn:3000/api/goods/getinfo/" + this.$route.params.id
    }).then(res => {
      if (res.data.status == 0) {
        
        this.goodsInfo = res.data.message[0];
      }
    });
  },
  filters: {
    dateformat
  },
  components: {
    numberbox
  },
  methods:{
    beforeEnter(el){
      // 给元素加上过渡效果
      el.style.top = "445px";
      el.style.left = "175px"
      
      
    },
    enter(el){
      el.style.transition = "all .3s linear";
      el.offsetWidth;//触发一次重绘 让上面的样式生效进而实现有transition效果
      el.style.top = (600 + window.pageYOffset)  +"px";
      el.style.left = "240px";
      this.isShowBall = false;
      
    },
    addCart(){

      this.isShowBall=true;
      // 将当前商品id和数量往vuex存一份儿
      this.$store.commit("addCart",{
        // 传递给vuex该商品的数量和id
        id:this.$route.params.id,
        count:this.count
      })
    }
  }
};
</script>

<style scoped>
.redball {
  z-index: 999;
  top: 445px;
  left: 175px;
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: red;
  border-radius: 50%;
}
.mint-swipe {
  height: 180px;
}
.mint-swipe img {
  height: 100%;
}

.mint-swipe-item {
  text-align: center;
}

.mui-card-content-inner > div {
  margin: 10px 0;
}

.sale_price {
  color: red;
  font-size: 18px;
}

.mui-card-footer {
  display: block;
}

</style>
