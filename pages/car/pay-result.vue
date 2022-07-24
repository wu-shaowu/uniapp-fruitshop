<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">支付结果</block>
		</cu-custom>
		
		<view class="bg-white">
			<view class="flex-sub text-center" style="padding-top: 100upx;">
				<view class="">
					<image src="../../static/car/success.png" mode="" style="width: 260upx;height: 200upx;"></image>
				</view>
				
				<view class="" style="margin-top: 60upx;">
					<image src="../../static/car/order-information.png" mode="" style="width: 260upx;height: 70upx;"></image>
				</view>
				
				<view class="text-grey" style="margin-top: 25upx;padding-bottom: 60upx;">
					返回首页
				</view>
			</view>
		</view>
		
		<view class="margin-top bg-white">
			<view class="solid-bottom text-xl padding text-center">
				<text class="text-black text-bold">猜你喜欢</text>
			</view>
			<view class="flex margin-top">
				<view class="" style="width: 50%;padding-left: 45upx;padding-right: 30upx;" v-for="(item, index) in 4" :key="index">
					<view class="">
						<image class="shoping-img" src="../../static/car/juzi.png" mode="aspectFill"></image>
					</view>
					<view class="">
						<view class="solid-bottom">
							<text class="text-black text-bold" style="font-size: 14px;">美国进口脐橙</text>
						</view>
					</view>
					<view class="text-gray padding-bottom-sm">
						<view class="">
							<text class="text-red" style="font-weight: 500;font-size: 14px;color: rbg(238,54,85);">￥19.9</text>
							<text class="text-gray padding-left-sm" style="text-decoration:line-through">￥32.9</text>
						</view>
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
			
		}
	}
</script>

<style>
.shoping-img{
	width: 300upx;
	height: 300upx;
}
</style>
