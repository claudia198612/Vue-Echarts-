export function jsonp({
	url,
	params = {},
	success
}) {
	let callbackName = 'jsonp_callback_' + Date.now() + Math.random().toString().substr(2, 5);
	let script = document.createElement('script');
	let baseUrl = `${url}?callback=${callbackName}`;


	for (let item in params) {
		baseUrl += `&${item}=${params[item]}`;
	}  //拿URL
	// jsonp核心，通过script的跨域特性发出请求
	script.src = baseUrl;
	// 把创建的script挂载到DOM
	document.body.appendChild(script);

	// 给window添加属性，用于获取jsonp结果
	window[callbackName] = (res) => {
		success(res);
		delete window[callbackName];
		document.body.removeChild(script);
	}

}
