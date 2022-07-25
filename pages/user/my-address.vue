<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">我的收货地址</block>
		</cu-custom>
		<view class="cu-card">
			<view class="cu-item shadow">
				<view class="padding">
					<view class="flex justify-between" @click="getUserHomeLocation">
						<view class="">
							<view class="padding-left-sm">
								<image src="../../static/car/home.png" mode="" style="width: 60upx;height: 30upx;"></image>
								<image src="../../static/car/moren.png" mode="" style="width: 60upx;height: 30upx;margin-left: 10upx;"></image>
								<text class="margin-left-sm" style="font-weight: 600;font-size: 14px;">吴少武</text>
								<text class="margin-left-xs" style="font-weight: 600;font-size: 14px;">15011966300</text>
							</view>
							<view class="padding-left-sm">
								<text class="cuIcon-locationfill text-blue" style="font-size: 14px;"></text><text style="margin-left: 10upx;">广东省江门市五邑大学</text>
							</view>
						</view>
						<view class=" text-center" style="margin-top: 20upx;" @click="editUserAddress">
							<image src="../../static/user/edit-address.png" mode="" style="width: 35upx;height: 35upx;"></image>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		<view class="padding flex flex-direction edit-buttom" @click="addAddress">
			<image src="../../static/user/add-address.png" mode="" style="width: 100%;height: 80upx;"></image>
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
			editUserAddress(){
				console.log('编辑收货地址')
			},
			addAddress(){
				uni.navigateTo({
					url:'../user/add-address'
				})
			},
			getUserHomeLocation(){
				console.log('修改当前地址')
			}
			
		}
	}
</script>

<style>
.edit-buttom{
	position: absolute;
	bottom: 10upx;
	left: 0;
	right: 0;
}
</style>
