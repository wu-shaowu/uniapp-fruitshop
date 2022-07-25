<template>
	<view>
		<view class="fixed">
			<cu-custom :isBack="true" bgColor="text-white">
				<block slot="backText">返回</block>
				<block slot="content" style="font-size: 16px;font-weight: 800;">商品详情</block>
			</cu-custom>
		</view>
		<scroll-view scroll-y="true" @scroll="scroll" upper-threshold="10">
			<view class="" style="width: ;">
				<image :src="detailGoodInfo.images" mode="" style="width: 100%;height: 600upx;"></image>
       <!-- <image :src="detailGoodInfo.images" mode=""></image> -->
 
			</view>
			<view class="bg-white solid-bottom " style="padding-left: 30upx;padding-top: 30upx;">
				<view class="shopping-title">
					{{detailGoodInfo.name}}
				</view>
				<view class="text-gray shopping-title-infor">
					“醉”酒一号，一口甜在心！
				</view>
	
				<view class="text-gray text-sm flex justify-between">
					<view class="">
						<text class="text-red" style="font-size: 40rpx;">￥{{detailGoodInfo.price}}</text>
						<text class="text-gray padding-left-sm" style="text-decoration:line-through;color: #CCCCCC;">￥{{detailGoodInfo.price+2}}</text>
					</view>
					<view class="text-gray text-sm" style="margin-right: 30upx;">
						已售 4888份
					</view>
				</view>
			</view>
			<view class="bg-white grid col-3 solid-bottom" style="padding-left: 30upx;">
				<view class="padding-sm" style="font-size: 30rpx;">
					<text class="cuIcon-roundcheck text-green" style="font-weight: 500;font-size: 35rpx;"></text>
					<text class="text-gray">三无退货</text>
				</view>
				<view class="padding-sm" style="font-size: 30rpx;">
					<text class="cuIcon-roundcheck text-green" style="font-weight: 500;font-size: 35rpx;"></text>
					<text class="text-gray">特约供货地</text>
				</view>
				<view class="padding-sm" style="font-size: 30rpx;">
					<text class="cuIcon-roundcheck text-green" style="font-weight: 500;font-size: 35rpx;"></text>
					<text class="text-gray">品控质检</text>
				</view>
			</view>
			<view class="bg-white" style="padding-left: 30upx;padding-top: 30upx;">
				<view class="flex justify-between" style="margin-top: 10upx;">
					<view class="">
						<text class="text-gray" style="font-size: 12px;margin-right: 30upx;">促销</text>
						<image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
						<text class="text-orange" style="font-size: 12px;margin-left: 30upx;">满188立减20</text>
					</view>
					<view class="">
						<text class="cuIcon-right" style="font-size: 16px; color: #CCCCCC;margin-right: 30upx;"></text>
					</view>
					
				</view>
				<view class="text-gray margin-top" style="font-size: 12px;">
					规格
				</view>
				<view class="margin-top-xs" style="padding-bottom: 30upx;">
		<!-- 			<text class="cu-tag xl  padding-df margin-right-sm" :class="sizeCheckId == index + 1?'bg-yellow text-white':''" @click="sizeCheck" v-for="(item, index) in sizeCheckList" :key="index" :data-id="item.id">{{item.number}}g</text> -->
    <text class="cu-tag xl  padding-df margin-right-sm">{{detailGoodInfo.weight}}</text>
				</view>
			</view>
			
			
			<view class="shadow-blur margin-top" style="background-color: rgb(123,197,252);">
				<image src="../../static/wave.gif" mode="scaleToFill" class="gif-black response" style="height:100upx"></image>
			</view>
			<view class=" bg-white" style="padding-left: 30upx;">
				
				<view class="shopping-title padding-top">
					商品详情
				</view>
				<view class="text-gray margin-top" style="font-size: 13px;line-height: 50upx;">
					<view>重量：1500g</view>
					<view>包装：普通</view>
					<view>保质期：到货即可食用</view>
					<view>储存方法：冷藏</view>
				</view>
				<view class="margin-top" style="margin-right: 30upx;">
123
				</view>
				
				
			</view>
			<view class="text-center padding-top bg-white">
				<image src="../../static/logo-1.png" mode="" style="width: 250upx;height: 75upx;"></image>
			</view>
			<view style="margin-bottom: 100upx;">
				<image class="bg-white" src="../../static/bottom.png" mode="" style="width: 100%;height: 100upx;"></image>
			</view>
		</scroll-view>
		
		
		
		
		
		<view class="cu-bar bg-white tabbar shop foot">
			<view class="action text-gray" @click="gotoIndex">
				<view class="">
					<image src="../../static/index/shop-index.png" mode="" style="width: 40upx;height: 40upx;"></image>
				</view>
				首页
			</view>
			<view class="action text-gray">
				<view class="">
					<image src="../../static/index/share.png" mode="" style="width: 40upx;height: 40upx;"></image>
				</view>
				分享
			</view>
			<view class="action text-gray" @click="gotoShopCar">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="">
				<image src="../../static/index/add-car.png" mode="" style="width: 350upx;height: 100upx;" @click="addcar"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				// 规格选择有关
				sizeCheckList:[
					{"id":1, "number":500},
					{"id":2, "number":1000},
					{"id":3, "number":2500}
				],
				sizeCheckId:"",
        // goodInfo:{}
			}
		},
    // 在test.vue页面，向起始页通过事件传递数据
    onLoad: function(item) {
      // #ifdef APP-NVUE
      const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
      // #endif
      // #ifndef APP-NVUE
      const eventChannel = this.getOpenerEventChannel();
      // #endif
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      eventChannel.on('acceptDataFromOpenerPage', function(item) {
        this.goodInfo = item
        console.log(this.goodInfo.name)
        console.log("看上面")
      })
    },
		methods: {
			gotoIndex(){
				uni.navigateBack()
			},
			gotoShopCar(){
				uni.navigateTo({
					url:'../car/car'
				})
			},
			sizeCheck(e){
				let id = e.currentTarget.dataset.id;
				this.sizeCheckId = id;
				
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			scrolltoupper(){
				console.log(123456789)
			},
      addcar(){
        uni.navigateTo({
          url:"../car/car"
        })
      }
		},
    computed:{
      detailGoodInfo(){
        return this.$store.state.goods.detailGoodInfo
      }
    }
	}
</script>

<style>
.shopping-title{
	font-size: 38rpx;
	font-weight: 900;
	/* color: #333333; */
}
.shopping-title-infor{
	font-size: 30rpx;
}
@import "../../colorui/animation.css";
	
	image[class*="gif-"] {
		border-radius: 6upx;
		display: block;
	}

/* css 滤镜 控制黑白底色gif的 */
.gif-black{  
  mix-blend-mode: screen;  
}
.gif-white{  
  mix-blend-mode: multiply; 
}

.information-header{
	position: relative;
	top: -100upx;
	border-top-left-radius:50upx;
	border-top-right-radius:50upx; 
	height: 1px;
}


</style>
