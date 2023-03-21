//配置各个echart图的option

//新增确诊TOP10
/**
 * 获取世界各国新增病例Top10
 * @param countryAddConfirmRankList：世界各国新增病例排行榜
 * @returns {{yAxis: [{axisLabel: {color: string, fontSize: number}, axisLine: {lineStyle: {color: string, width: number}}, splitLine: {lineStyle: {color: string}}, type: string}], xAxis: [{axisLabel: {color: string, fontSize: string}, data: [], axisLine: {show: boolean}, axisTick: {alignWithLabel: boolean}, type: string}], color: [string], grid: {top: string, left: string, bottom: string, right: string, containLabel: boolean}, series: [{barWidth: string, data: [], name: string, itemStyle: {barBorderRadius: number}, type: string}], tooltip: {axisPointer: {type: string}, trigger: string}}}
 */
export function setOption1(countryAddConfirmRankList){
	let yAxis =[];
	let xAxis=[];
	for (let val of countryAddConfirmRankList) {
		xAxis.push(val.nation);
		yAxis.push(val.addConfirm);
	}
	let option1 = {
		color: ["#8A2BE2"],
		tooltip: {
			//鼠标悬浮到图上，可以出现标线和刻度文本。
			trigger: "axis",//坐标轴触发，用于柱状图
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow"
			}
		},
		// 修改图表的大小
		grid: {
			left: "0%",
			top: "10px",
			right: "3%",
			bottom: "4%",
			containLabel: true
		},
		xAxis: [{
			type: "category",
			data:xAxis,
			axisTick: {
				alignWithLabel: true
			},
			// 修改刻度标签 相关样式
			axisLabel: {
				color: "rgba(255,255,255,.6) ",
				fontSize: "10"
			},
			// 不显示x坐标轴的样式
			axisLine: {
				show: false
			}
		}],
		yAxis: [{
			type: "value",
			// 修改刻度标签 相关样式
			axisLabel: {
				color: "rgba(255,255,255,.6) ",
				fontSize: 10
			},
			// y轴的线条改为了2像素
			axisLine: {
				lineStyle: {
					color: "rgba(255,255,255,.1)",
					width: 2
				}
			},
			// y轴分割线的颜色
			splitLine: {
				lineStyle: {
					color: "rgba(255,255,255,.1)"
				}
			}
		}],
		series: [{
			name: "24h内新增确诊",
			type: "bar",
			data:yAxis,
			barWidth: "35%",
			itemStyle: {
				barBorderRadius: 5
			}
		}]
	}
	return option1	
}

/**
 * 饼图
 * @param ChinaData
 * @returns {{calculable: boolean, legend: {formatter: function(*): (string|undefined), orient: string, data, x: string, icon: string, y: string, textStyle: {fontFamily: string, color: string, fontSize: string}, align: string}, series: [{encode: {itemName: string, value: string}, clockWise: boolean, center: [string, string], roseType: string, name: string, itemStyle: {normal: {color: function(*): string, label: {formatter: function(*): (*|string), position: string, textStyle: {fontFamily: string, color: string, fontSize: number, fontWeight: string}}}}, type: string, radius: number[]}, {data: [{name: string, value: number}], center: [string, string], name: string, itemStyle: {color: string}, type: string, radius: number[]}], toolbox: {feature: {saveAsImage: {show: boolean, type: string}}, show: boolean}, dataset: {source}}}
 */
export function setOption2(ChinaData){
	var temp = ChinaData.areaTree[0].children
	console.log(temp)
	function f(a,b) {
		return b.total.confirm - a.total.confirm
	}
	temp.sort(f)

	var tempdata = []
	var nname = []
	var souress = [
		['Country','Confirmed','SQRT','Dead']
	]
	var other = {
		name: '其他',
		Confirmed:0,
		Dead:0
	}
	const sizeArray = [420,350,270,270,250,250,230,190,180,170,150,290]

	temp.forEach((item,index) => {
		if(index <= 10){
			tempdata.push({
				name:item.name,
				Confirmed:item.total.confirm,
				Dead:item.total.dead
			})
			souress.push([item.name,item.total.confirm,sizeArray[index],item.total.dead])
			nname.push(item.name)
			// size = size - 20
		}else{
			other.Confirmed = other.Confirmed + item.total.confirm
			other.Dead = other.Dead + item.total.dead
		}
	})
	tempdata.push(other)
	nname.push('其他')
	souress.push(['其他',other.Confirmed,sizeArray[11],other.Dead])
	console.log(tempdata)

	console.log(nname)
	console.log(souress)
		let option = {
			dataset: {
				source:souress
			},
			toolbox: {
				show: true,//false则不显示工具栏
				feature: {
					saveAsImage: {show: true,type:'jpeg'}
				}
			},
			tooltip: {
				//鼠标悬浮到图上，可以出现标线和刻度文本。
				trigger: "item",//坐标轴触发，用于柱状图
				axisPointer: {
					// 坐标轴指示器，坐标轴触发有效
					type: "shadow"
				},
				formatter(params){
					return params.data[0] + ": " + params.data[1]
				}
			},
			legend: {
				x: '60%',//水平位置，【left\center\right\数字】
				y: '10%',//垂直位置，【top\center\bottom\数字】
				align:'left',//字在图例的左边或右边【left/right】
				orient:'vertical',//图例方向【horizontal/vertical】
				icon: "circle",   //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
				itemHeight: 7, //修改icon图形大小
				itemGap:5, //图例文字间距
				textStyle://图例文字
					{
						fontWeight : 'normal',
						fontSize: 11,
						color:'#fffff',
					},
				data:nname,
				formatter: function(params)  {
					// console.log('图例参数',params)
					for (var i=0;i<tempdata.length;i++){
						if (tempdata[i].name== params){
							return params+"\t确诊:"+tempdata[i].Confirmed+"\t死亡:"+tempdata[i].Dead;
						}
					}
				}

			},

			calculable: true,
			series: [
				{
					name: '累计确诊',
					type: 'pie',
					clockWise: false ,
					radius: [20, 120],
					center: ['30%', '55%'],
					roseType: 'area',
					encode: {
						itemName: 'Country',
						value: 'SQRT'
					},
					itemStyle: {
						normal: {
							color: function(params) {
								var colorList = [
									"#4B0082","#800080","#9400D3","#9932CC","#8A2BE2","#BA55D3","#9370DB","#7B68EE","#4169E1","#4169E1","#6495ED","#B0C4DE"
								];
								return colorList[params.dataIndex]
							},
							label: {
								position: 'inside',
								textStyle:
									{
										fontWeight:'bold',
										fontFamily:'Microsoft YaHei',
										color:'#FAFAFA',
										fontSize:10
									},
								//formatter:'{b} \n{@Confirmed}例 \n死亡{@Dead}',//注意这里大小写敏感哦
								formatter : function(params)
								{
									if(params.data[1]>1)
									{return params.data[0];}
									else{return "";}
								},

							},
						},
					},

				},
				{
					name:'透明圆圈',
					type:'pie',
					radius: [10,27],
					center: ['30%', '55%'],
					itemStyle: {
						color: 'rgba(250, 250, 250, 0.3)',
					},
					data:[
						{value:10,name:''}
					]
				}
			]

		};
	return option

}


export function setOption3(continentStatis){
	var charts = {
		unit: '感染人数',
		names: ['亚洲', '欧洲','北美洲'],
		lineX: ['2021-04-29', '2021-04-30', '2021-05-01', '2021-05-02', '2021-05-03', '2021-05-04', '2021-05-05', '2021-05-06', '2021-05-07', '2021-05-08', '2021-05-09', '2021-05-10', '2021-05-11', '2021-05-12', '2021-05-13', '2021-05-14', '2021-05-15', '2021-05-16', '2021-05-17', '2021-05-18'],
		value: [
			[40632632, 40810263, 41265231, 41553215, 41823001, 42136212, 42532632, 42810263, 43165231, 43553215, 43923001, 44336212, 44799833, 45132632, 45510263, 45865231, 46253215, 46523001, 46836212, 47199833],
			[45255621, 45301743, 45351263, 45421263, 45491168, 45555621, 45601743, 45661263, 45721263, 45781168, 45825621, 45877431, 45921263, 45982631, 46021168, 46085621, 46121743, 46171263, 46221263, 46271168],
			[39355236, 39415213, 39480361, 39550512, 39615236, 39665213, 39500361, 39565121, 39610481, 39615236, 39665213, 39710361, 39760512, 39810481, 39615236, 39665213, 39710361, 39760512, 39810481, 39885633]
		]

	}
	var color = ['rgba(23, 255, 243', 'rgba(255,100,97','rgba(163,102,220']
	var lineY = []

	for (var i = 0; i < charts.names.length; i++) {
		var x = i
		if (x > color.length - 1) {
			x = color.length - 1
		}
		var data = {
			name: charts.names[i],
			type: 'line',
			color: color[x] + ')',
			smooth: true,
			areaStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: color[x] + ', 0.3)'
					}, {
						offset: 0.8,
						color: color[x] + ', 0)'
					}], false),
					shadowColor: 'rgba(0, 0, 0, 0.1)',
					shadowBlur: 10
				}
			},
			symbol: 'circle',
			symbolSize: 5,
			data: charts.value[i]
		}
		lineY.push(data)
	}

	lineY[0].markLine = {
		silent: true,
		data: [{
			yAxis: 5
		}, {
			yAxis: 100
		}, {
			yAxis: 200
		}, {
			yAxis: 300
		}, {
			yAxis: 400
		}]
	}

	var option = {

		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: charts.names,
			textStyle: {
				fontSize: 12,
				color: 'rgb(0,253,255,0.6)'
			},
			right: '4%'
		},
		grid: {
			top: '14%',
			left: '0%',
			right: '0%',
			bottom: '12%',
			containLabel: true
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: charts.lineX,
			axisLabel: {
				textStyle: {
					color: 'rgb(0,253,255,0.6)'
				},
				formatter: function(params) {
					return params
				}
			}
		},
		yAxis: {
			name: charts.unit,
			type: 'value',
			axisLabel: {
				formatter: '{value}',
				textStyle: {
					color: 'rgb(0,253,255,0.6)'
				}
			},
			splitLine: {
				lineStyle: {
					color: 'rgb(23,255,243,0.3)'
				}
			},
			axisLine: {
				lineStyle: {
					color: 'rgb(0,253,255,0.6)'
				}
			}
		},
		series: lineY
	}
	console.log(lineY)
	return option

}

/**
 * 中国新增病例省份排行
 * @param ChinaData
 * @returns {{yAxis: [{axisLabel: {textStyle: {color: string}}, axisLine: {lineStyle: {color: string, width: number}}, splitArea: {areaStyle: {color: string}}, axisTick: {show: boolean}, splitLine: {lineStyle: {color: string, width: number, type: string}, show: boolean}, splitNumber: number}], xAxis: {axisLabel: {textStyle: {color: string, fontSize: number}}, data: [], axisLine: {lineStyle: {color: string, width: number}}, axisTick: {show: boolean}}, grid: {top: string, left: string, bottom: string, right: string}, series: [{symbol: string, data: [], name: string, itemStyle: {normal: {color: {x: number, y: number, y2: number, x2: number, global: boolean, colorStops: [{offset: number, color: string}, {offset: number, color: string}], type: string}}, emphasis: {opacity: number}}, z: number, label: {distance: number, color: string, show: boolean, fontSize: number, position: string}, type: string, barCategoryGap: string}]}}
 */
export function setOption4(ChinaData){
	let temp = ChinaData.areaTree[0].children

	function mysort(a,b){
		return b.today.confirm - a.today.confirm
	}
	temp.sort(mysort)
	let provinveName = []
	let newAdd = []
	temp.forEach(item => {
		if(item.today.confirm > 0){
			provinveName.push(item.name)
			newAdd.push(item.today.confirm)
		}

	})
	let option = {
			grid: {
				left: '8%',
				top: '12%',
				bottom: '12%',
				right: '8%'
			},
			xAxis: {
				data: provinveName,
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255, 129, 109, 0.1)',
						width: 1 //这里是为了突出显示加上的
					}
				},
				axisLabel: { //标签
					textStyle: {
						color: '#FFFFFF',
						fontSize: 10
					}
				}
			},
			yAxis: [{
				splitNumber: 2,
				axisTick: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: 'rgba(255, 129, 109, 0.1)',
						width: 1 //这里是为了突出显示加上的
					}
				},
				axisLabel: {
					textStyle: {
						color: '#999'
					}
				},
				splitArea: {
					areaStyle: {
						color: 'rgba(255,255,255,.5)'
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 129, 109, 0.1)',
						width: 0.5,
						type: 'dashed'
					}
				}
			}
			],
			series: [{
				name: 'hill',
				type: 'pictorialBar',
				barCategoryGap: '0%',
				symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
				label: {
					show: true,
					position: 'top',
					distance: 15,
					color: '#00BFFF',
					fontSize: 15,
				},
				itemStyle: {
					normal: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [{
								offset: 0,
								color: 'rgba(0, 195, 255, .8)' //  0%  处的颜色
							}, {
									offset: 1,
									color: 'rgba(0, 195, 255, .3)' //  100%  处的颜色
							}
							],
							global: false //  缺省为  false
						}
					},
					emphasis: {
						opacity: 1
					}
				},
				data: newAdd,
				z: 10
			}]
		};
	return option
}

export function setOption5(globalDailyHistory){
	let xAxis = [];
	let series1 = [];
	let series2 = []
	for(var i = 0;i < globalDailyHistory.length;i += 7){
		xAxis.push(globalDailyHistory[i].date)
		series1.push(globalDailyHistory[i].all.dead)
		series2.push(globalDailyHistory[i].all.heal)
	}

	var option = {
		tooltip: {
			trigger: "axis"
		},
		legend: {
			top: "0%",
			textStyle: {
				color: "rgba(255,255,255,.5)",
				fontSize: "12"
			}
		},

		grid: {
			left: "0",
			top: "30",
			right: "18",
			bottom: "10",
			containLabel: true
		},
		xAxis: [
			{
				type: "category",
				boundaryGap: false,
				// x轴更换数据
				data:xAxis ,
				// 文本颜色为rgba(255,255,255,.6)  文字大小为 12
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12
					}
				},
				// x轴线的颜色为   rgba(255,255,255,.2)
				axisLine: {
					lineStyle: {
						color: "rgba(255,255,255,.2)"
					}
				}
			}
		],
		yAxis: [
			{
				type: "value",
				axisTick: { show: false },
				axisLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)"
					}
				},
				axisLabel: {
					textStyle: {
						color: "rgba(255,255,255,.6)",
						fontSize: 12
					}
				},
				// 修改分割线的颜色
				splitLine: {
					lineStyle: {
						color: "rgba(255,255,255,.1)"
					}
				}
			}
		],
		series: [
			{
				name: "死亡人数",
				type: "line",
				smooth: true,
				// 单独修改当前线条的样式
				lineStyle: {
					color: "#0184d5",
					width: "2"
				},
				// 填充颜色设置
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0,0,0,1,
						[
							{
								offset: 0,
								color: "rgba(1, 132, 213, 0.4)" // 渐变色的起始颜色
							},
							{
								offset: 0.8,
								color: "rgba(1, 132, 213, 0.1)" // 渐变线的结束颜色
							}
						],
						false
					),
					shadowColor: "rgba(0, 0, 0, 0.1)"
				},
				// 设置拐点
				symbol: "circle",
				// 拐点大小
				symbolSize: 8,
				// 开始不显示拐点， 鼠标经过显示
				showSymbol: false,
				// 设置拐点颜色以及边框
				itemStyle: {
					color: "#0184d5",
					borderColor: "rgba(221, 220, 107, .1)",
					borderWidth: 12
				},
				data:series1
			},
			{
				name: "治愈人数",
				type: "line",
				smooth: true,
				lineStyle: {
					normal: {
						color: "#00d887",
						width: 2
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0,0,0,1,
							[
								{
									offset: 0,
									color: "rgba(0, 216, 135, 0.4)"
								},
								{
									offset: 0.8,
									color: "rgba(0, 216, 135, 0.1)"
								}
							],
							false
						),
						shadowColor: "rgba(0, 0, 0, 0.1)"
					}
				},
				// 设置拐点 小圆点
				symbol: "circle",
				// 拐点大小
				symbolSize: 5,
				// 设置拐点颜色以及边框
				itemStyle: {
					color: "#00d887",
					borderColor: "rgba(221, 220, 107, .1)",
					borderWidth: 12
				},
				// 开始不显示拐点， 鼠标经过显示
				showSymbol: false,
				data:series2
			}
		]
	};
	return option;
}

/**
 * 境外输入病例top10
 * @param importStatis
 * @returns {{animationEasingUpdate: string, color: string[], series: [{layout: string, data: [], force: {repulsion: number, edgeLength: number}, label: {normal: {show: boolean}}, type: string, roam: boolean}], tooltip: {}, animationDurationUpdate: function(*): *}}
 */
export function setOption6(importStatis){
	//跳转代码


	var colorList = [
		[
		'#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
		'#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
		'#1e90ff', '#ff6347', '#7b68ee', '#d0648a', '#ffd700',
		'#6b8e23', '#4ea397', '#3cb371', '#b8860b', '#7bd9a5'
		],
		[
			'#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
			'#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
			'#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
			'#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0'
		],
		[
			'#929fff', '#9de0ff', '#ffa897', '#af87fe', '#7dc3fe',
			'#bb60b2', '#433e7c', '#f47a75', '#009db2', '#024b51',
			'#0780cf', '#765005', '#e75840', '#26ccd8', '#3685fe',
			'#9977ef', '#f5616f', '#f7b13f', '#f9e264', '#50c48f'
		]][2];

	var data = []
	for(var i = 0;i < importStatis.TopList.length;i ++){
		data.push({
			name:importStatis.TopList[i].province,
			value:importStatis.TopList[i].importedCase,
			symbolSize:importStatis.TopList[i].importedCase/10,
			draggable: true,
			itemStyle: {
				normal: {
					"color": colorList[i]
				}
			}
		})
	}
	console.log(data)
	let option = {
		// 图表标题
		tooltip: {},
		animationDurationUpdate: function(idx) {
			// 越往后的数据延迟越大
			return idx * 100;
		},
		animationEasingUpdate: 'bounceIn',
		color: ['#fff', '#fff', '#fff'],
		series: [{
			type: 'graph',
			layout: 'force',
			force: {
				repulsion: 100,
				edgeLength: 5
			},
			roam: true,
			label: {
				normal: {
					show: true
				}
			},
			data
		}]
	}
	return option
}

//世界疫情图
export function worldMapOption(){
	let option = {
		    // 设置提示信息
		    tooltip: {
		        // 设置提示信息触发源
		        trigger: 'item',
		        // 设置提示信息格式
		        formatter: function (params) {
		            return params.name + " : " + (params.value ? params.value : '未知');
		        }
		    },
		    // 视觉映射组件
		    visualMap: {
		        // 设置映射类型：piecewise分段型、continuous连续性
		        type: 'piecewise',
		        pieces: [
		            { max: 0, label: '0', color: '#eee' },
		            { min: 1, max: 499, label: '1-499', color: '#fff7ba' },
		            { min: 500, max: 4999, label: '500-4999', color: '#ffc24b' },
		            { min: 5000, max: 9999, label: '5000-9999', color: '#ff7c20' },
		            { min: 10000, max: 100000, label: '1万-10万', color: '#fe5e3b' },
		            { min: 100000, max: 500000, label: '10万-50万', color: '#e2482b' },
		            { min: 500000, label: '50万以上', color: '#b93e26' },
		        ],
		        itemHeight: 10,
		        itemWidth: 10,
		        inverse: true,
				bottom:"20%",
				textStyle: {
				  color: "rgba(255,255,255,.5)",
				  fontSize: "12"
				}
		    },
		    // 系列列表
		    series: [{
		        // 数据名称
		        name: '',
		        // 设置数据
		        data: '',
		        // 绘制的图表类型
		        type: 'map',
		        // 指定地图名称
		        mapType: 'world',
		        // 地区名称映射
		        nameMap: '',
		        // 图表所绘制区域样式
		        itemStyle: {
		            emphasis: {
		                areaColor: '#c9ffff',
		                label: {
		                    show: false
		                }
		            }
		        },
		        // 设置位置：保持地图高宽比的情况下把地图放在容器的正中间
		        layoutCenter: ['48%','50%'],
		        // 地图缩放
		        layoutSize: "80%",
		    }]
		};
	return option
}
export function setForeignData(foreignList){
	let confirmData = [];
	let nowConfirmData = [];
	let foreignData = {};
	for(let value of foreignList){
		confirmData.push({name:value.name,value:value.confirm})
		nowConfirmData.push({name:value.name,value:value.nowConfirm})
	}
	foreignData = {confirmData,nowConfirmData}
	return foreignData
}