let commonFieldset = [
		{
				name: "排序",
				value: "order",
				type: "all",
				children: [
						{
								name: "默认",
								value: false
						}, {
								name: "升序",
								value: "ascending"
						}, {
								name: "降序",
								value: "descending"
						}
				]
		}, {
				name: "对齐",
				value: "align",
				type: "table",
				children: [
						{
								name: "默认(左对齐)",
								value: "left"
						}, {
								name: "居中对齐",
								value: "center"
						}, {
								name: "右对齐",
								value: "right"
						}
				]
		}
];

export default {
		borderStype : [
				{
						name: '默认',
						value: ''
				}, {
						name: '虚线',
						value: 'dashed'
				}, {
						name: '实线',
						value: 'solid'
				}, {
						name: '双线',
						value: 'double'
				}, {
						name: '虚点',
						value: 'dotted'
				}
		],
		borderWidth : [
				{
						name: '默认',
						value: ''
				}, {
						name: '1px',
						value: '1px'
				}, {
						name: '2px',
						value: '2px'
				}, {
						name: '3px',
						value: '3px'
				}, {
						name: '4px',
						value: '4px'
				}, {
						name: '5px',
						value: '5px'
				}, {
						name: '6px',
						value: '6px'
				}, {
						name: '7px',
						value: '7px'
				}, {
						name: '8px',
						value: '8px'
				}, {
						name: '9px',
						value: '9px'
				}, {
						name: '10px',
						value: '10px'
				}
		],
		fontFamily : [
				{
						name: '默认',
						value: ''
				}, {
						name: '宋体',
						value: 'SimSun'
				}, {
						name: '黑体',
						value: 'SimHei'
				}, {
						name: '微软雅黑',
						value: 'Microsoft Yahei'
				}, {
						name: '楷体',
						value: 'KaiTi'
				}, {
						name: '新宋体',
						value: 'NSimSun'
				}, {
						name: 'Arial',
						value: 'Arial'
				}, {
						name: 'Times New Roman',
						value: 'Times New Roman'
				}, {
						name: 'Times',
						value: 'Times'
				}, {
						name: 'MS Sans Serif',
						value: 'MS Sans Serif'
				}
		],
		fontSize : [
				{
						name: '默认',
						value: ''
				}, {
						name: '12px',
						value: '12px'
				}, {
						name: '13px',
						value: '13px'
				}, {
						name: '14px',
						value: '14px'
				}, {
						name: '15px',
						value: '15px'
				}, {
						name: '16px',
						value: '16px'
				}, {
						name: '17px',
						value: '17px'
				}, {
						name: '18px',
						value: '18px'
				}, {
						name: '19px',
						value: '19px'
				}, {
						name: '20px',
						value: '20px'
				}, {
						name: '22px',
						value: '22px'
				}, {
						name: '24px',
						value: '24px'
				}, {
						name: '26px',
						value: '26px'
				}, {
						name: '28px',
						value: '28px'
				}, {
						name: '30px',
						value: '30px'
				}, {
						name: '32px',
						value: '32px'
				}, {
						name: '36px',
						value: '36px'
				}, {
						name: '48px',
						value: '48px'
				}, {
						name: '64px',
						value: '64px'
				}, {
						name: '72px',
						value: '72px'
				}
		],
		textAlign : [
				{
						name: '默认',
						value: ''
				}, {
						name: '左对齐',
						value: 'left'
				}, {
						name: '右对齐',
						value: 'right'
				}, {
						name: '居中对齐',
						value: 'center'
				}, {
						name: '分散对齐',
						value: 'justify'
				}
		],
		alignItems:[
			{
				name: '默认',
				value: 'normal'
			},
			{
				name: '上',
				value: 'flex-start'
			}, {
				name: '中',
				value: 'center'
			}, {
				name: '下',
				value: 'flex-end'
			}
		],
		justifyContent:[
			{
				name: '默认',
				value: 'normal'
			},
			{
				name: '左',
				value: 'flex-start'
			}, {
				name: '中',
				value: 'center'
			}, {
				name: '右',
				value: 'flex-end'
			}
		],
		fontWeight : [
				{
						name: '默认',
						value: ''
				}, {
						name: '粗体',
						value: 'bold'
				}, {
						name: '细体',
						value: 'lighter'
				}
		],
		textTheme : [
				{
						name: '默认',
						value: ''
				}, {
						name: '标题一',
						value: 'title1'
				}, {
						name: '标题二',
						value: 'title2'
				}, {
						name: '标题三',
						value: 'title3'
				}, {
						name: '正文',
						value: 'text'
				}, {
						name: 'HTML',
						value: 'html'
				}, {
						name: '要点',
						value: 'keypoint'
				}, {
						name: '引用',
						value: 'quote'
				}, {
						name: '标签',
						value: 'label'
				}, {
						name: '按钮',
						value: 'button'
				}, {
						name: '链接',
						value: 'link'
				}
		],
		itemStyle : {
				'background': 'rgba(29,37,50,1)',
				'border-color': 'transparent',
				'border-width': '0',
				'border-style': 'none',
				'margin-top': '0px',
				'margin-left': '0px',
				'margin-right': '0px',
				'margin-bottom': '0px',
				'padding-left': '0px',
				'padding-right': '0px',
				'padding-bottom': '0px',
				'padding-top': '0px',
				'border-top-left-radius': '0px',
				'border-top-right-radius': '0px',
				'border-bottom-left-radius': '0px',
				'border-bottom-right-radius': '0px'
		},
		mapTheme : [
				{
						name: '默认',
						value: 'default'
				}, {
						name: '白色',
						value: 'white'
				}, {
						name: '黑色',
						value: 'dark'
				}
		],
		mapZoom : [
				16,
				15,
				14,
				13,
				12,
				11,
				10,
				9,
				8,
				7,
				6,
				5,
				4
		],
		chartTheme : [
				{
						name: '默认',
						value: 'default'
				}, {
						name: '白色',
						value: 'white'
				}, {
						name: '黑色',
						value: 'dark'
				}
		],
		dashTheme : [
				{
						name: '默认',
						value: 'default'
				}, {
						name: '黑色',
						value: 'dark'
				}, {
						name: '白色',
						value: 'white'
				}
		],
		chartClass : [
				{
						name: 'ECharts',
						value: 'echarts'
				}, {
						name: 'HighCharts',
						value: 'hcharts'
				}, {
						name: '高德地图',
						value: 'amap'
				}
		],
		chartDesigns : [
				{
						name: '普通模式',
						value: 0
				}, {
						name: '高级模式',
						value: 1
				}
		],
		chartStackings : [
				{
						name: "不堆叠",
						value: ""
				}, {
						name: "值堆叠",
						value: "normal"
				}, {
						name: "百份比",
						value: "percent"
				}
		],
		chartAmapZooms : [
				{
						name: "3",
						value: "3"
				}, {
						name: "4",
						value: "4"
				}, {
						name: "5",
						value: "5"
				}, {
						name: "6",
						value: "6"
				}, {
						name: "7",
						value: "7"
				}, {
						name: "8",
						value: "8"
				}, {
						name: "9",
						value: "9"
				}, {
						name: "10",
						value: "10"
				}, {
						name: "11",
						value: "11"
				}, {
						name: "12",
						value: "12"
				}, {
						name: "13",
						value: "13"
				}, {
						name: "14",
						value: "14"
				}, {
						name: "15",
						value: "15"
				}, {
						name: "16",
						value: "16"
				}, {
						name: "17",
						value: "17"
				}, {
						name: "18",
						value: "18"
				}, {
						name: "19",
						value: "19"
				}
		],
		chartFieldFun : {
				string: [
						{
								name: "设置名称",
								type: "all",
								value: "alias"
						},
						...commonFieldset, {
								name: "无",
								type: "all",
								value: ""
						}
				],
				number: [
						{
								name: "设置名称",
								type: "all",
								value: "alias"
						}, {
								name: "求和",
								type: "all",
								value: "sum"
						}, {
								name: "平均值",
								type: "all",
								value: "avg"
						}, {
								name: "计数",
								type: "all",
								value: "count"
						}, {
								name: "去重计数",
								type: "all",
								value: "distinct"
						}, {
								name: "最大值",
								type: "all",
								value: "max"
						}, {
								name: "最小值",
								type: "all",
								value: "min"
						}, {
								name: "中位值",
								type: "all",
								value: "mid"
						}, {
								name: "数值显示格式",
								type: "all",
								value: "format"
					    },
						...commonFieldset, {
								name: "无",
								type: "all",
								value: ""
						}
				],
				date: [
						{
								name: "设置名称",
								type: "all",
								value: "alias"
						}, {
								name: "按年",
								type: "all",
								value: "year"
						}, {
								name: "按季",
								type: "all",
								value: "quarter"
						}, {
								name: "按月",
								type: "all",
								value: "month"
						}, {
								name: "按周",
								type: "all",
								value: "week"
						}, {
								name: "按日",
								type: "all",
								value: "date"
						},
						...commonFieldset, {
								name: "无",
								type: "all",
								value: ""
						}
				]
		}
}