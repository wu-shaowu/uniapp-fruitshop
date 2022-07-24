const api = (params) => {
	let URL = "http://192.168.163.1:3000/" //域名
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中',
		})
		uni.request({
			url: URL + params.url,
			method: params.method || "GET",
			data: params.data || '',
			success: res => {
				uni.hideLoading()
				resolve(res)
			}

		})
	})
}
export default api
