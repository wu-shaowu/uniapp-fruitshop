<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">优惠卷</block>
		</cu-custom>
		
		<!-- 可用优惠卷 -->
		<view class="" style="width: 100%;height: 200upx;">
			<view class="padding" style="width: 100%;">
				<image src="../../static/user/youhui.png" mode="" style="width: 100%;height: 150upx;"></image>
			</view>
			<view class="flex youhuijuan-body">
				<view class="">
					<view class="text-white" >
						￥<text style="font-size: 30px;">9.9</text>
					</view>
					<view class="text-white" style="font-size: 12px;">
						新用户奖励
					</view>
				</view>
				<view class="text-white" style="margin-left: 60upx;margin-top: 20upx;">
					<view class="" style="font-size: 14px;margin-bottom: 10upx;">
						全场商品可用
					</view>
					<view style="font-size: 10px;">有效期： 2019.7.17-2019.12.30</view>
				</view>
				<view class="text-center" style="margin-top: 35upx;margin-left: 25upx;">
					<button class="cu-btn bg-white text-yellow sm">可使用</button>
				</view>
			</view>
		</view>
		
		<!-- 已经过期优惠卷 -->
		<view class="text-gray text-center">
			已过期优惠卷~
		</view>
		
		<view class="" style="width: 100%;height: 200upx;">
			<view class="padding" style="width: 100%;">
				<image src="../../static/user/youhui1.png" mode="" style="width: 100%;height: 150upx;"></image>
			</view>
			<view class="flex youhuijuan-body">
				<view class="">
					<view class="text-white" >
						￥<text style="font-size: 30px;">9.9</text>
					</view>
					<view class="text-white" style="font-size: 12px;">
						新用户奖励
					</view>
				</view>
				<view class="text-white" style="margin-left: 60upx;margin-top: 20upx;">
					<view class="" style="font-size: 14px;margin-bottom: 10upx;">
						全场商品可用
					</view>
					<view style="font-size: 10px;">有效期： 2019.7.17-2019.12.30</view>
				</view>
				<view class="text-center" style="margin-top: 35upx;margin-left: 25upx;">
					<button class="cu-btn bg-white text-gray sm">已使用</button>
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
.youhuijuan-body{
	position: relative;
	top: -160upx;
	left: 60upx;
}
</style>
