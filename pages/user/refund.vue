<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content" style="font-size: 16px;font-weight: 800;">申请退款</block>
		</cu-custom>
		<view class="">
			<image src="../../static/user/gonggao.png" mode="" style="width: 100%;height: 350upx;"></image>
		</view>
		
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">退款原因</view>
				<picker @change="CauseChange" :value="causeId" :range="causePicker">
					<view class="picker text-gray">
						{{causeId>-1?causePicker[causeId]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">退款方式</view>
				<picker @change="MethodChange" :value="methodId" :range="methodPicker">
					<view class="picker text-gray">
						{{methodId>-1?methodPicker[methodId]:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					上传凭证
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="" @tap="ChooseImage" v-if="imgList.length<4">
						<image src="../../static/user/camer.png" mode="" style="width: 200upx;height: 150upx;"></image>
					</view>
				</view>
			</view>
			
			
		</form>
		
		<view class="padding flex flex-direction">
			<image src="../../static/user/submit-shouhou.png" mode="" style="width: 100%;height: 90upx;"></image>
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				causeId:-1,
				causePicker:["坏了", "臭了", "变质了"],
				
				methodId:-1,
				methodPicker:["支付宝", "微信", "日鲜镖局"],
				
				imgList: [],
			}
		},
		methods: {
			CauseChange(e) {
				this.causeId = e.detail.value
			},
			MethodChange(e) {
				this.methodId = e.detail.value
			},
			
			
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
		}
	}
</script>

<style>

</style>
