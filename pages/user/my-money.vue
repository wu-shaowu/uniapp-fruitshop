<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">我的余额</block>
		</cu-custom>
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="flex" style="line-height: 30upx;">
					<view class="">
						<image src="../../static/user/xiaofei.png" mode="" style="width: 70upx;height: 70upx;"></image>
					</view>
					<view class="text-left" style="margin: 0 30upx;">
						<view class="">
							<text class="">消费</text>
						</view>
						<view class="text-gray" style="margin-top: 10upx;">
							今天 21:00
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-black" style="font-size: 16px;font-weight: 600;">-80.90</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="flex" style="line-height: 30upx;">
					<view class="">
						<image src="../../static/user/chongzhi.png" mode="" style="width: 70upx;height: 70upx;"></image>
					</view>
					<view class="text-left" style="margin: 0 30upx;">
						<view class="">
							<text class="">充值</text>
						</view>
						<view class="text-gray" style="margin-top: 10upx;">
							今天 21:00
						</view>
					</view>
				</view>
				<view class="action">
					<text class="text-black" style="font-size: 16px;font-weight: 600;">+2000.00</text>
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

</style>
