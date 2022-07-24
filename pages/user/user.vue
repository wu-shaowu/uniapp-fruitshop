<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">个人中心</block>
		</cu-custom>
		<view class="flex user-header-image" style="height: 400upx;width: 100%;background-image: url(/static/user/user-top.png);">
			<view class="user-header" style="width: 100%;">
				<view class="flex align-center padding">
					<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);border:2px solid white"></view>
					<view class="text-white padding-left-sm">雷神索尔</view>
				</view>
				<view class="grid col-3 text-center" style="width: 100%;padding: 0 30upx;">
					<view class="text-white" @click="gotoCoupon">
						<view class="">
							2
						</view>
						
						<view class="">
							优惠卷
						</view>
					</view>
					<view class="text-white">
						<view class="">
							<text class="padding-left-sm">100</text> <text class="cuIcon-question text-yellow"></text>
						</view>
						<view class="">
							积分
						</view>
					</view>
					<view class="text-white" @click="gotoMyMoney">
						<view class="">
							￥500
						</view>
						<view class="">
							余额
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="user-order">
			<view class="user-border-radius bg-white" >
				<view class="cu-item shadow">
					<view class="flex justify-between solid-bottom">
						<view class=" text-xl padding">
							<text class="text-black text-bold">我的订单</text>
						</view>
						<view class="text-df text-gray padding " @click="gotoAllOrder">
							查看全部订单<text class="cuIcon-right"></text>
						</view>
					</view>
					
					<view class="grid col-4 padding text-center">
						<view class="">
							<image class="order-image" src="../../static/user/daifukuang.png" mode="" style="width: 90upx;height: 100upx;"></image>
						</view>
						<view class="">
							<image class="order-image" src="../../static/user/daifahuo.png" mode="" style="width: 90upx;height: 100upx;"></image>
						</view>
						<view class="">
							<image class="order-image" src="../../static/user/daishouhuo.png" mode="" style="width: 90upx;height: 100upx;"></image>
						</view>
						<view class="">
							<image class="order-image" src="../../static/user/yiwancheng.png" mode="" style="width: 90upx;height: 100upx;"></image>
						</view>
					</view>
					
				</view>
			</view>
			
			<!-- 充值有关 -->
			<view class="user-border-radius bg-white" >
				<view class="cu-item shadow">
					<view class="solids-bottom">
						<view class=" text-xl padding">
							<text class="text-black text-bold">充值有礼</text>
						</view>
					</view>
					
					<view class="grid col-4 padding text-center">
						<view class="">
							<view class="">
								<image class="chongzhi-image" src="../../static/user/1.png" mode=""></image>
							</view>
							<view class="" style="font-size: 16px;">
								<text class="cuIcon-roundcheckfill text-orange"></text>
							</view>
						</view>
						<view class="">
							<view class="">
								<image class="chongzhi-image" src="../../static/user/2.png" mode=""></image>
							</view>
							<view class="">
								<text class="cuIcon-round text-orange"></text>
							</view>
						</view>
						<view class="">
							<view class="">
								<image class="chongzhi-image" src="../../static/user/3.png" mode=""></image>
							</view>
							<view class="">
								<text class="cuIcon-round text-orange"></text>
							</view>
						</view>
						<view class="">
							<view class="">
								<image class="chongzhi-image" src="../../static/user/4.png" mode=""></image>
							</view>
							<view class="">
								<text class="cuIcon-round text-orange"></text>
							</view>
						</view>
					</view>
					<view class="text-center" style="padding-bottom: 30upx;">
						<image src="../../static/user/liji-chongzhi.png" mode="" style="width: 350upx;height: 100upx;"></image>
					</view>
				</view>
			</view>
			
			
			<!-- 联系客户 -->
			<view class="user-border-radius" style="background-color: #fff8e7;padding: 30upx;">
				<view class="flex justify-between" style="font-size: 14px;">
					<view class="flex">
						<view class="">
							<image src="../../static/user/call.png" mode="" style="width: 40upx;height: 40upx;"></image>
						</view>
						<text class="text-black padding-left-sm">联系客服</text>
					</view>
					<view class="" style="color: #ffbe4f;">
						（09:00—22:00）<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>
			
		</view>
		
		
		

		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoAllOrder(){
				uni.navigateTo({
					url:'../user/all-order'
				})
			},
			gotoMyMoney(){
				uni.navigateTo({
					url:'../user/my-money'
				})
			},
			gotoCoupon(){
				uni.navigateTo({
					url:'../user/my-coupon'
				})
			}
		}
	}
</script>

<style>
.user-header{
	position: absolute;
	top: 150upx;
	left: 0;
}
.order-image{
	width: 60upx;
	height: 60upx;
}
.user-order{
	position: relative;
	top: -140upx;
}
.chongzhi-image{
	width: 100%;
	height: 160upx;
}
.cu-card>.cu-item {
	margin: 10rpx 30rpx;
}
.user-header-image{
	background-repeat:no-repeat;
	background-size:100% 100%;
	-moz-background-size:100% 100%;
}

.user-border-radius{
	border-radius:30upx;
	margin: 20upx 30upx;
}
</style>
