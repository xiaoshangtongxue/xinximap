// 立即执行函数，防止变量污染 (function() {})();

//行业-数量（公司）
var Data1 = (function() {
    var Data1 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data5.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data1 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data1;
})()


var Data2 = (function() {
    var Data2 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data4.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data2 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data2;
})()


var Data3 = (function() {
    var Data3 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data1.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data3 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data3;
})()


var Data4 = (function() {
    var Data4 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data6.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data4 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data4;
})()


var Data5 = (function() {
    var Data5 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data12.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data5 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data5;
})()


var Data6 = (function() {
    var Data6 = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: "/static/js/data7.json",
        dataType: "json", //返回数据形式为json
        success: function(result) {
            //后台返回的数据格式如下：
            Data6 = result
        },
        error: function(errorMsg) {
            alert("加载失败！");
        }
    });
    return Data6
})()


// // 柱状图模块1
// var ret1 = (function() {
//     // 1.实例化对象
//     var myChart = echarts.init(document.querySelector(".bar .chart"));
//     // 声明颜色数组
//     //读取数据
//     var read_Hang_Ye = []
//     var read_Shu_Liang = []
//     for (var i = 0; i < Data1.length; i++) {
//         var Hang_Ye = Data1[i].HangYe
//         var Shu_Liang = Data1[i].ShuLiang
//         read_Hang_Ye.push(Hang_Ye)
//         read_Shu_Liang.push(Shu_Liang)
//     }
//     // 2.指定配置项和数据
//     var option = {
//         color: ['#00f2f1'],
//         // 提示框组件
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: { // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
//             }
//         },
//         dataZoom: [{
//                 id: 'dataZoomX',
//                 type: 'inside',
//                 xAxisIndex: [0],
//                 filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
//                 start: 0,
//                 end: 100
//             },
//             {
//                 id: 'dataZoomY',
//                 type: 'inside',
//                 yAxisIndex: [0],
//                 filterMode: 'empty',
//                 start: 0,
//                 end: 100
//             }
//         ],
//         toolbox: {
//             feature: {
//                 saveAsImage: {},
//                 dataView: {},
//                 restore: {},

//                 magicType: {
//                     typy: ['bar', 'line']
//                 }
//             }
//         },
//         // 修改图表位置大小
//         grid: {
//             top: "10px",
//             left: '3%',
//             bottom: '0%',
//             right: '3%',
//             containLabel: true
//         },
//         legend: {
//             data: [],
//             textStyle: {
//                 color: '#4c9bfd'
//             },
//             right: '10%',
//         },

//         // x轴相关配置
//         xAxis: [{
//             type: 'category',
//             data: [],
//             axisTick: {
//                 alignWithLabel: true
//             },
//             // 修改刻度标签，相关样式
//             axisLabel: {
//                 color: "#4c9bfb", // x轴文本颜色
//                 fontSize: 8,
//                 rotate: 18,
//             },
//             axisLine: {
//                 lineStyle: {
//                     color: "#4c9bfb",
//                     width: 2
//                 }
//             },
//             symbolSize: 8
//         }],
//         // y轴相关配置
//         yAxis: [{
//             type: 'value',
//             // 修改刻度标签，相关样式
//             axisLabel: {
//                 color: "#4c9bfb", // x轴文本颜色
//                 fontSize: 12
//             },
//             // y轴样式修改
//             axisLine: {
//                 lineStyle: {
//                     color: "#4c9bfb",
//                     width: 2
//                 }
//             },
//             // y轴分割线的颜色
//             splitLine: {
//                 lineStyle: {
//                     color: "rgba(255,255,255,0.1)"
//                 }
//             },
//             symbolSize: 8
//         }],
//         // 系列列表配置
//         series: [{
//             name: '数量',
//             type: 'bar',
//             barWidth: '15%',
//             // ajax传动态数据
//             data: [],
//             itemStyle: {
//                 // 修改柱子圆角
//                 barBorderRadius: 5,
//             }
//         }, ]

//     };
//     // 3.把配置项给实例对象
//     myChart.setOption(option);
//     // 4.让图表随屏幕自适应
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })
//     return;
// })(Data1);


// // 柱状图模块2
// var ret2 = (function() {
//     // 1.实例化对象
//     var myChart = echarts.init(document.querySelector(".bar2 .chart"));
//     // 声明颜色数组
//     var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
//     //读取数据
//     var Sum = 0
//     var Percentage
//     var read_Di_Li = []
//     var read_Shu_Liang = []
//     var read_Sum = []
//     var read_Percentage = []
//     for (var i = 0; i < Data2.length; i++) {
//         var Di_Li = Data2[i].DiLi
//         var Shu_Liang = Data2[i].ShuLiang
//         Sum = Sum + Shu_Liang
//         read_Di_Li.push(Di_Li)
//         read_Shu_Liang.push(Shu_Liang)

//     }
//     for (var i = 0; i < Data2.length; i++) {
//         var Shu_Liang = Data2[i].ShuLiang
//         Percentage = (Shu_Liang / Sum * 100).toFixed(3) + '%'
//         read_Percentage.push(Percentage)
//         read_Sum.push(Sum)
//     }
//     // 2.指定配置项和数据
//     var option = {
//         grid: {
//             top: "10%",
//             left: '10%',
//             bottom: '10%',
//             right: '30%',
//             // containLabel: true
//         },
//         xAxis: {
//             // 不显示x轴相关信息
//             show: false
//         },
//         yAxis: [{
//             type: 'category',
//             // y轴数据反转，与数组的顺序一致
//             inverse: true,
//             // 不显示y轴线和刻度
//             axisLine: {
//                 show: false
//             },
//             axisTick: {
//                 show: false
//             },
//             // 将刻度标签文字设置为白色
//             axisLabel: {
//                 color: "#fff"
//             },
//             data: [],
//         }, {
//             // y轴数据反转，与数组的顺序一致
//             inverse: true,
//             show: true,
//             // 不显示y轴线和刻度
//             axisLine: {
//                 show: false
//             },
//             axisTick: {
//                 show: false
//             },
//             // 将刻度标签文字设置为白色
//             axisLabel: {
//                 color: "#fff"
//             },

//             data: [],
//             symbolSize: 8
//         }],
//         series: [{
//                 // 第一组柱子（条状）
//                 name: '条',
//                 type: 'bar',
//                 // 柱子之间的距离
//                 barCategoryGap: 50,
//                 // 柱子的宽度
//                 barWidth: 10,
//                 // 层级 相当于z-index
//                 yAxisIndex: 0,
//                 // 柱子更改样式
//                 itemStyle: {
//                     barBorderRadius: 20,
//                     // 此时的color可以修改柱子的颜色
//                     color: function(params) {
//                         // params 传进来的是柱子的对象
//                         // dataIndex 是当前柱子的索引号
//                         // console.log(params);
//                         return myColor[params.dataIndex];
//                     }
//                 },
//                 data: [],
//                 // 显示柱子内的百分比文字
//                 label: {
//                     show: true,
//                     position: "inside",
//                     // {c} 会自动解析为数据（data内的数据）
//                     formatter: "{c}"
//                 }
//             },
//             {
//                 // 第二组柱子（框状 border）
//                 name: '框',
//                 type: 'bar',
//                 // 柱子之间的距离
//                 barCategoryGap: 50,
//                 // 柱子的宽度
//                 barWidth: 14,
//                 // 层级 相当于z-index
//                 yAxisIndex: 1,
//                 // 柱子修改样式
//                 itemStyle: {
//                     color: "none",
//                     borderColor: "#00c1de",
//                     borderWidth: 2,
//                     barBorderRadius: 15,
//                 },
//                 data: [],
//             }
//         ]
//     };
//     // 3.把配置项给实例对象
//     myChart.setOption(option);

//     // 4.让图表随屏幕自适应
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })
//     return;
// })(Data6);


// // 折线图模块1
// var ret3 = (function() {
//     var myChart = echarts.init(document.querySelector(".line .chart"));

//     var option = {
//         // 修改三条线的颜色
//         color: ['#00f2f1'], //, '#ed3f35', '#98B448'
//         tooltip: {
//             trigger: 'axis'
//         },
//         // 图例组件
//         legend: {
//             // 当serise 有name值时， legend 不需要写data
//             // 修改图例组件文字颜色
//             textStyle: {
//                 color: '#4c9bfd'
//             },
//             right: '10%',
//         },
//         grid: {
//             top: "10%",
//             left: '3%',
//             right: '3%',
//             bottom: '3%',
//             containLabel: true,
//             show: true, // 显示边框
//             borderColor: '#012f4a' // 边框颜色
//         },
//         xAxis: {
//             type: 'category',
//             boundaryGap: false, // 去除轴间距
//             data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
//             // 去除刻度线
//             axisTick: {
//                 show: false
//             },
//             axisLabel: {
//                 color: "#4c9bfb" // x轴文本颜色
//             },
//             axisLine: {
//                 show: false // 去除轴线
//             }
//         },
//         yAxis: {
//             type: 'value',
//             // 去除刻度线
//             axisTick: {
//                 show: false
//             },
//             axisLabel: {
//                 color: "#4c9bfb" // x轴文本颜色
//             },
//             axisLine: {
//                 show: false // 去除轴线
//             },
//             splitLine: {
//                 lineStyle: {
//                     color: "#012f4a"
//                 }
//             }
//         },
//         series: [{
//                 type: 'line',
//                 smooth: true, // 圆滑的线
//                 name: '2019年',
//                 data: []
//             },
//             {
//                 type: 'line',
//                 smooth: true, // 圆滑的线
//                 name: '2020年',
//                 data: []
//             },
//             {
//                 type: 'line',
//                 smooth: true, // 圆滑的线
//                 name: '2021年',
//                 data: []
//             },
//         ]
//     };
//     // 3.把配置项给实例对象
//     myChart.setOption(option);

//     // 4.让图表随屏幕自适应
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })

//     // 5.点击切换2020 和 2021 的数据
//     $('.line h2 a').on('click', function() {
//         // console.log($(this).index());
//         // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
//         // console.log(yearData[$(this).index()]);
//         var obj = yearData[$(this).index()];
//         option.series[0].data = obj.data[0];
//         option.series[1].data = obj.data[1];
//         option.series[2].data = obj.data[2];
//         // 选中年份高亮
//         $('.line h2 a').removeClass('a-active');
//         $(this).addClass('a-active');

//         // 需要重新渲染
//         myChart.setOption(option);
//     })
//     return;
// })(Data3);


// // 柱状图3
// var ret4 = (function() {
//     var myChart = echarts.init(document.querySelector('.bar3 .chart'));
//     //读取数据
//     var read_Shi_Jian = []
//     var read_Shu_Liang = []
//     for (var i = 0; i < Data4.length; i++) {
//         var Shi_Jian = Data4[i].ShiJian
//         var Shu_Liang = Data4[i].ShuLiang
//         read_Shi_Jian.push(Shi_Jian)
//         read_Shu_Liang.push(Shu_Liang)
//     }
//     // 2.指定配置项和数据
//     var option = {
//         color: ['#2f89cf'],
//         // 提示框组件
//         tooltip: {
//             trigger: 'axis',
//             axisPointer: { // 坐标轴指示器，坐标轴触发有效
//                 type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
//             }
//         },
//         // 修改图表位置大小
//         grid: {
//             left: '4%',
//             top: '10px',
//             right: '3%',
//             bottom: '0%',
//             containLabel: true
//         },
//         legend: {
//             data: [],
//             textStyle: {
//                 color: '#4c9bfd'
//             },
//             right: '10%',
//         },
//         dataZoom: [{
//                 id: 'dataZoomX',
//                 type: 'inside',
//                 xAxisIndex: [0],
//                 filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
//                 start: 0,
//                 end: 100
//             },
//             {
//                 id: 'dataZoomY',
//                 type: 'inside',
//                 yAxisIndex: [0],
//                 filterMode: 'empty',
//                 start: 0,
//                 end: 100
//             }
//         ],
//         toolbox: {
//             feature: {
//                 saveAsImage: {},
//                 dataView: {},
//                 restore: {},

//                 magicType: {
//                     typy: ['bar', 'line']
//                 }
//             }
//         },

//         // x轴相关配置
//         xAxis: [{
//             type: 'category',
//             data: [],
//             axisTick: {
//                 alignWithLabel: true
//             },
//             // 修改刻度标签，相关样式
//             axisLabel: {
//                 color: "rgba(255,255,255,0.8)",
//                 fontSize: 8,
//                 rotate: 20,
//             },
//             // x轴样式不显示
//             axisLine: {
//                 show: false
//             },
//             symbolSize: 8
//         }],
//         // y轴相关配置
//         yAxis: [{
//             type: 'value',
//             // 修改刻度标签，相关样式
//             axisLabel: {
//                 color: "rgba(255,255,255,0.6)",
//                 fontSize: 12
//             },
//             // y轴样式修改
//             axisLine: {
//                 lineStyle: {
//                     color: "rgba(255,255,255,0.6)",
//                     width: 2
//                 }
//             },
//             // y轴分割线的颜色
//             splitLine: {
//                 lineStyle: {
//                     color: "rgba(255,255,255,0.1)"
//                 }
//             },
//             symbolSize: 8
//         }],
//         // 系列列表配置
//         series: [{
//             name: '数量',
//             type: 'bar',
//             barWidth: '15%',
//             // ajax传动态数据
//             data: [],
//             itemStyle: {
//                 // 修改柱子圆角
//                 barBorderRadius: 5,
//             }
//         }, ]
//     };
//     // 3.把配置项给实例对象
//     myChart.setOption(option);
//     // 4.让图表随屏幕自适应
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })
//     return;
// })(Data4);


// 饼形图1
var ret5 = (function() {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data5.length; i++) {
        var Hang_Ye = Data5[i].HangYe
        var Shu_Liang = Data5[i].ShuLiang
        read_Hang_Ye.push(Hang_Ye)
        read_Shu_Liang.push(Shu_Liang)
    }
    // 2.指定配置项和数据
    var option = {
        color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', "#56D0E3"],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            // 垂直居中,默认水平居中
            // orient:'vertical',
            bottom: 0,
            // left: 10,
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "16"
            }
        },
        series: [{
            name: '行业分布',
            type: 'pie',
            // 设置饼形图在容器中的位置
            center: ["50%", "42%"],
            // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            // 图形上的文字
            label: {
                show: false,
                position: 'center'
            },
            // 链接文字和图形的线
            labelLine: {
                show: false
            },
            data: [{
                value: read_Shu_Liang[1],
                name: read_Hang_Ye[1],
            }]
        }]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
})(Data5);

// //饼形图2
// var ret6 = (function() {
//     var myChart = echarts.init(document.querySelector('.pie2 .chart'));
//     //读取数据
//     var read_Yan_Fa_Zhuang_Tai = []
//     var read_Shu_Liang = []
//     for (var i = 0; i < Data6.length; i++) {
//         var Yan_Fa_Zhuang_Tai = Data6[i].YanFaZhuangTai
//         var Shu_Liang = Data6[i].ShuLiang
//         read_Yan_Fa_Zhuang_Tai.push(Yan_Fa_Zhuang_Tai)
//         read_Shu_Liang.push(Shu_Liang)
//     }
//     // 2.指定配置项和数据
//     var option = {
//         color: ["#1089E7", "#F57474", "#56D0E3"],
//         tooltip: {
//             trigger: 'item',
//             formatter: '{a} <br/>{b} : {c} ({d}%)'
//         },
//         legend: {
//             bottom: 0,
//             itemWidth: 10,
//             itemHeight: 10,
//             textStyle: {
//                 color: "rgba(255,255,255,.5)",
//                 fontSize: 13
//             }
//         },
//         series: [{
//             name: '研发状态',
//             type: 'pie',
//             radius: ["20%", "50%"],
//             center: ['50%', '40%'],
//             // 半径模式  area面积模式
//             roseType: 'radius',
//             // 图形的文字标签
//             label: {
//                 fontsize: 10
//             },
//             // 引导线调整
//             labelLine: {
//                 // 连接扇形图线长(斜线)
//                 length: 6,
//                 // 连接文字线长(横线)
//                 length2: 8
//             },
//             data: []
//         }]
//     };
//     // 3.把配置项给实例对象
//     myChart.setOption(option);
//     // 4.让图表随屏幕自适应
//     window.addEventListener('resize', function() {
//         myChart.resize();
//     })
//     return;
// })(Data6);