<template>
  <view>
    <view class="fixed">
      <cu-custom :isBack="true" bgColor="text-white">
        <block slot="content" style="font-size: 16px;font-weight: 800;">日鲜镖局</block>
      </cu-custom>
    </view>
    <view class="">
      <image src="../../static/index/index.png" mode="" style="height: 250upx;width: 100%;"></image>
    </view>
    <view class="flex index-header">
      <view class="" style="width: 30%;">
        <image src="../../static/logo.png" mode="" class="index-image-header"></image>
      </view>
      <view class="" style="width: 70%;font-size: 10px;color: #c9e1e1;padding-left: 20upx;">
        <view class="" style="margin: 10upx;">
          营业时间：2022年
        </view>
        <view class="">
          <text class="cuIcon-location text-white padding-xs"></text>广东省广州市
        </view>
      </view>
    </view>

    <view class="VerticalBox">
      <scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop">
        <view class="cu-item" :class="index==tabCur?'text-black cur':'text-gray'" v-for="(item,index) in list"
          :key="index" @tap="TabSelect" :data-id="index">
          {{item.name}}
        </view>
      </scroll-view>

      <scroll-view class="VerticalMain" scroll-y scroll-with-animation>

        <view class="" style="broder-radius: 50%">
          <image src="../../static/index/index-banner.png" mode=""
            style="width: 100%;height: 250upx;border-radius: 5px"></image>
        </view>

        <view class="text-gray margin-top">
          店长推荐
        </view>

        <view class="flex solid-bottom" v-for="(item, index) in goods" :key="index" style="padding: 30upx 0;">
          <view class="">
            <image class="shoping-img" :src="item.images" mode="aspectFill"
              style="border-radius:3px"></image>
          </view>
          <view class="" style="padding-left: 30upx;">
            <view class="" @click="gotoShopInfor(item)">
              <view class="shopping-title">
               {{item.name}}
              </view>
              <view class="text-gray" style="font-size: 10px;">
                醉酒一号，一口甜在心！
              </view>
              <view class="flex" style="margin-top: 10upx;">
                <!-- <text class="cu-tag bg-yellow light sm padding-xs">满减</text> -->
                <image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
                <text class="" style="font-size: 10px;margin-left: 30upx;color: rgb(255,146,99);">{{item.weight}}</text>
              </view>
            </view>

            <view class="text-gray text-sm flex justify-between">
              <view class="">
                <text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥{{item.price}}</text>
                <text class="text-gray padding-left-sm" style="text-decoration:line-through">￥32.9</text>
              </view>
              <view class="" @click="showBuyModel(item)">
                <image src="../../static/index/add.png" mode="" style="width: 40upx;height: 40upx;"></image>
              </view>
            </view>
          </view>
        </view>




      </scroll-view>
    </view>

    <!-- 底部购买弹窗 -->
    <view class="cu-modal bottom-modal" :class="buyModel?'show':''" @tap="closeModel">
      <view class="buy-model" @tap.stop="">
        <view class="buy-model-top">
          <view class="bg-white" style="height: 500upx;padding-left: 30upx;">
            <view class="flex solid-bottom">
              <view class="buy-model-img">
                <image style="width: 200upx;height: 200upx;" :src="btnGood.images" mode="aspectFill">
                </image>
              </view>
              <view class="margin-top " style="margin-left: 50upx;">
                <view class="shopping-title">
                  {{btnGood.name}}
                </view>
                <view class="text-gray padding-xs" style="font-size: 10px;">
                  醉酒一号，一口甜在心！
                </view>
                <view class="flex" style="margin-top: 10upx;">
                  <image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
                  <text class="" style="font-size: 10px;margin-left: 30upx;color: rgb(255,146,99);">满188立减20</text>
                </view>
                <view class="text-gray text-sm flex justify-between">
                  <view class="">
                    <text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥{{btnGood.price}}</text>
                    <text class="text-gray padding-left-sm" style="text-decoration:line-through">￥{{btnGood.price-3}}</text>
                  </view>
                </view>
              </view>
            </view>

            <view class="text-gray" style="font-size: 14px;">
              规格
            </view>
            <view class="margin-top-xs">
<!--             <text class="cu-tag xl  padding-df margin-right-sm"
                :class="sizeCheckId == index + 1?'bg-yellow text-white':''" @click="sizeCheck"
                v-for="(item, index) in sizeCheckList" :key="index" :data-id="item.id">{{item.number}}g</text> -->
                   <text class="cu-tag xl  padding-df margin-right-sm">{{btnGood.weight}}</text>
            </view>
         

            <view class="flex justify-between margin-top" style="margin-bottom: 20upx;">
              <view class="text-gray" style="font-size: 14px;">购买数量</view>
              <view class="">
                <text class="bg-grey light" style="padding: 3upx 20upx;margin-right: 6upx;" @click="countMinus">-</text>
                <text class="bg-grey light" style="padding: 5upx 20upx;margin-right: 6upx;">{{shopNumber}}</text>
                <text class="bg-grey light" style="padding: 3upx 20upx;margin-right: 60upx;" @click="countAdd">+</text>
              </view>
            </view>

            <view class="" style="margin-left: -30upx;">
              <image src="../../static/index/submit.png" mode="" style="height: 100upx;width: 100%;" @tap="addcar()"></image>
            </view>

          </view>


        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {addCars} from '@/api/index.js'
  export default {
    data() {
      return {
        list: [{
            'id': 1,
            'name': '店长推荐'
          },
          {
            'id': 2,
            'name': '新品上市'
          },
          {
            'id': 3,
            'name': '国外狠货'
          },
          {
            'id': 4,
            'name': '休闲零食'
          },
        ],
        tabCur: 0,
        mainCur: 0,
        verticalNavTop: 0,
        load: true,

        // 规格选择有关
        sizeCheckList: [{
            "id": 1,
            "number": 500
          },
          {
            "id": 2,
            "number": 1000
          },
          {
            "id": 3,
            "number": 2500
          }
        ],
        sizeCheckId: "",

        // 记载商品数量
        shopNumber: 1,


        // 模态框的弹出
        buyModel: false,
        searchInfo: {
          name: "",
          pageNo: 1,
          pageSize: 10,
        },
        WindowsHight: this.WindowsHight,
        btnGood:{
          images:"",
          isCheap:true,
          name:"",
          price:"",
          weight:"",
          _id:""
        }
      }
    },
    created() {
      uni.showLoading({
        title: '加载中...',
        mask: true
      });
      this.getdata();

    },
    onReady() {
      uni.hideLoading()
    },
    onReachBottom() {
      // const data = {
      //   name:'',
      //   pageNo:1,
      //   pageSize: this.pageSize
      // };
      this.searchInfo.pageNo++;
     
      this.$store.dispatch("searchGoods", this.searchInfo);
      console.log("触底")
    
      // console.log(this.text);
    },
    methods: {
      getdata() {
        this.$store.dispatch("searchGoods", this.searchInfo);
           },
      TabSelect(e) {
        this.tabCur = e.currentTarget.dataset.id;
        this.mainCur = e.currentTarget.dataset.id;
        this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
      },
      showBuyModel(item) {
        this.shopNumber = 1
        this.btnGood = item;
        this.buyModel = true;
        console.log("触发加号")
      },
      gotoShopInfor(item) {
        // console.log("看这里")
        // console.log(item);
        	// this.$emit('acceptDataFromOpenerPage',item)       //第二步
          this.$store.commit("DETAILGOODINFO",item)
        uni.navigateTo({
          url: '../index/shopping-infor',
          // success: function(res) {
          //   // 通过eventChannel向被打开页面传送数据
          //   res.eventChannel.emit('acceptDataFromOpenerPage', item)
          // }
        })
      },
      closeModel() {
        this.buyModel = false
      },
      sizeCheck(e) {
        let id = e.currentTarget.dataset.id;
        this.sizeCheckId = id;

      },
      countMinus() {
        if (this.shopNumber < 2) {
          uni.showToast({
            icon: 'none',
            title: '数量不可以小于1'
          });
          return
        }
        this.shopNumber -= 1
      },
      countAdd() {
        this.shopNumber += 1
      },
      async addcar(){
                  // console.log(this.detailInfo.isCheap);
                  // console.log(this.btnGood)
              const data = {
                usersId: "62b178b0e3f366b069b4a39a",
                images: this.btnGood.images,
                name: this.btnGood.name,
                weight: this.btnGood.weight,
                number: this.shopNumber,
                unitPrice: this.btnGood.price,
                isCheap:this.btnGood.isCheap,
                price: Math.floor(this.shopNumber * 1 * (this.btnGood.price * 1)*100)/100,
                isTrade:false,
              };
              // console.log(data);
              const result = await addCars(data);
              this.buyModel = false
              console.log(result)
        // console.log(123456789)
      }



    },
    computed: {
      goods() {
        return this.$store.state.goods.searchGoods;
      }
    }
  }
</script>

<style>
  .index-header {
    position: relative;
    top: -100upx;
    height: 0;
  }


  .index-image-header {
    padding: 10upx;
    width: 100%;
    height: 90upx;
  }

  .fixed {
    position: fixed;
    z-index: 99;
  }

  .VerticalNav.nav {
    width: 150upx;
    white-space: initial;
  }

  .VerticalNav.nav .cu-item {
    width: 100%;
    text-align: center;
    background-color: #f1f1f1;
    margin: 0;
    border: none;
    height: 100upx;
    position: relative;
  }

  .VerticalNav.nav .cu-item.cur {
    background-color: #fff;
  }

  .VerticalNav.nav .cu-item.cur::after {
    content: "";
    width: 8upx;
    height: 30upx;
    border-radius: 10upx;
    position: absolute;
    background-color: #fdba42;
    top: -10upx;
    left: 0upx;
    bottom: 0;
    margin: auto;
  }

  .VerticalBox {
    display: flex;
  }

  .VerticalMain {
    padding: 30upx;
    background-color: #fff;
    flex: 1;
  }

  .shopping-title {
    width: 360upx;
    font-size: 30rpx;
    font-weight: 500;
    color: #333333;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .shoping-img {
    width: 150upx;
    height: 150upx;
  }

  .cu-modal {
    text-align: left;
  }

  .buy-model {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    /* background: rgba(0,0,0,0.6); */
    border-radius: 10rpx;
    overflow: hidden;
  }

  .buy-model-img {
    position: relative;
    top: -30upx;
  }

  .buy-model-top {
    height: 500upx;
    margin-top: 50upx;
  }

  .tip-check {
    background-color: #ffd23d;
    color: white;
  }

  .nav .cu-item {
    display: inline-block;
    line-height: 90rpx;
    margin: 0 10rpx;
  }
</style>
