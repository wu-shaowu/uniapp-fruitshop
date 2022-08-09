class Service {
	constructor (provider) {
		this.provider = provider || 'weixin';	// 服务供应商 默认微信
	}
	static getProvider() {
		return new Promise((resolve, reject) => {
			uni.getProvider({	// 获取服务供应商
				service: 'oauth',
				success: (res) => {
					if (Array.isArray(res.provider)) {
						// 得到的服务供应商
						resolve(res.provider);
					} else {
						console.log(res);
						reject(res);
					}
				},
				fail: (err) => {
					console.log(err);
					reject(err);
				}
			});
		});
	}
	static login(provider) {
		return new Promise((resolve, reject) => {
			if (!provider) {
				console.log('no provider');
				return reject();
			}
			uni.login({
				provider,
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					console.log(err);
					reject(err);
				}
			});
		});
	}
	static getUserInfo(provider) {
		return new Promise((resolve, reject) => {
			if (!provider) {
				console.warn('no provider');
				return reject();
			}
			uni.getUserInfo({
				provider,
				success: (res) => {
					console.log(res);
					resolve(res);
				},
				fail: (err) => {
					console.log(err);
					reject(err);
				}
			});
		});
	}
}

export default Service;
