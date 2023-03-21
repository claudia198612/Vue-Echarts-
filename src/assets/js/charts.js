import {jsonp} from './jsonp.js'
import {setOption1,setOption2,setOption3,setOption4,setOption5,setOption6,setForeignData} from './options.js'
import axios from 'axios'
import * as url from "url";

//获取国外疫情数据
//通过return promise的形式,导出异步获得的数据
export function getForeinData (){
	//获得国外的疫情信息
	return new Promise((resolve,reject)=>{
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_foreign',
			},
			success(res) {
				let foreinData = JSON.parse(res.data);
				console.log("disease_foreign:")
				console.log(foreinData)
				const option1 = setOption1(foreinData.countryAddConfirmRankList);//新增排行
				const option3 = setOption3(foreinData.continentStatis);//以州为单位的数据统计
				// const option4 = setOption4(foreinData.globalDailyHistory);//世界疫情状况每日记录
				const option5 = setOption5(foreinData.globalDailyHistory);//随便选了个时间段内的感染人数（按州划分）
				const option6 = setOption6(foreinData.importStatis);//国内输入病例
				const centerTop = foreinData.globalStatis; //获得全球数据信息  【累计确诊、现有确诊、累计治愈、累计死亡】
				resolve({option1,option3,option5,option6,centerTop,foreinData})
			}
		});		
	})
}

export function getChinaData(){
	return new Promise((resolve,reject)=>{
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_h5',
			},
			success(res) {
				let Data = JSON.parse(res.data);
				const option2 = setOption2(Data)
				const option4 = setOption4(Data)
				resolve({option2,option4})
			}
		});
	})
}
//同时获取国外和国内疫情数据与，并进行一定处理
export function getMapData(){
	return Promise.all([new Promise((resolve,reject)=>{
		
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_foreign',
			},
			success(res) {
				let foreinData;
				foreinData = JSON.parse(res.data);
				const foreignData = setForeignData(foreinData.foreignList);

				console.log("foreginData:")
				console.log(foreinData)
				resolve(foreignData)
			}})
		
		
	}),new Promise((resolve,reject)=>{
		jsonp({
			url: 'https://view.inews.qq.com/g2/getOnsInfo',
			params: {
				name: 'disease_h5',
			},
			success(res1) {   //注意不能和上面的重复
				let chinaData;
				chinaData = JSON.parse(res1.data);
				console.log("disease_h5:")
				console.log(chinaData)
				const chinaMapData = {name:'中国',confirm:chinaData.chinaTotal.confirm,nowConfirm:chinaData.chinaTotal.nowConfirm,allChinaData:chinaData}
				resolve(chinaMapData);
			}
		});
	})])
}

//

//将配置添加到echart图表中
export function addChart(dom,option){
	let myChart = echarts.init(dom);
	myChart.setOption(option);
	window.addEventListener("resize", function() {
	  myChart.resize();
	});
	return myChart;
}
