<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">订单详情</block>
		</cu-custom>
		<view class="text-xl padding-sm">
			<text class="text-black text-bold">订单待收货(根据订单类型修改)</text><text class="cuIcon-right"></text>
		</view>
		
		<view class="">
			<view class="order-body bg-white">
				<view class="padding-sm solid-bottom">
					订单编号: 201906060001
				</view>
				<view class="flex solid-bottom margin-top padding-left-sm" v-for="(item, index) in 3" :key="index" @click="gotoShopInfor">
					<view class="">
						<image class="shoping-img" src="../../static/index/shopping.png" mode="aspectFill"></image>
					</view>
					<view class="" style="padding-left: 30upx;">
						<view class="shaoping-title">
							我以为天理，何必了？你觉得我应该怎么办，我要杀戮！
						</view>
						<view class="text-gray" style="font-size: 10px;">
							醉酒一号，一口甜在心！
						</view>
						<view class="flex" style="margin-top: 10upx;">
							<image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
							<text class="" style="font-size: 10px;margin-left: 30upx;color: rgb(255,146,99);">满188立减20</text>
						</view>
						<view class="text-gray text-sm flex justify-between">
							<view class="">
								<text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥19.9</text>
								<text class="text-gray padding-left-sm" style="text-decoration:line-through">￥32.9</text>
							</view>
							<view class="" style="font-size: 12px;">
								<text class="cuIcon-close">1</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="flex justify-between padding-sm">
					<view class="text-gray">
						下单时间
					</view>
					<view class="">
						2019年8月13日 11:56:00
					</view>
				</view>
				<view class="flex justify-between solid-bottom" style="padding: 0 20upx;">
					<view class="text-gray">
						配送地址
					</view>
					<view class="">
						<view class="">
							湖北省黄石市下陆区湖北理工学院
						</view>
						<view class="">
							毛毛福 （男士） 15629717751
						</view>
					</view>
				</view>
				<view class="">
					<view class="flex justify-between padding">
						<view class="flex">
							<view class="" style="line-height: 45upx;">
								<image src="../../static/index/manjian.png" mode="" style="width: 70upx;height: 30upx;"></image>
							</view>
							<text class="" style="padding-left: 20upx;">满减优惠</text>
						</view>
						<view class="text-right">
							<view style="font-size: 14px;">-￥5</view>
							<view style="font-size: 14px;">合计： <text class="text-red">￥205.90</text></view>
							<view class="text-gray">已优惠： ￥5</view>
							<view class="margin-top" @click="gotoRefund">
								<image src="../../static/user/tuikuan.png" mode="" style="width: 140upx;height: 50upx;"></image>
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		<!-- 联系客户 -->
		<view class="order-body" style="background-color: #fff8e7;padding: 30upx;margin-bottom: 50upx;">
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
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoRefund(){
				uni.navigateTo({
					url:'../user/refund'
				})
			}
		}
	}
</script>

<style>
.shaoping-title{
		width: 450upx;
		font-size: 30rpx;
		font-weight: 900;
		color: #333333;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
.shoping-img{
	width: 150upx;
	height: 150upx;
}
.order-body{
	border-radius:20upx;
	margin: 10upx;
	
}
</style>
