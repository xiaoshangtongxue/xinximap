var def = (function() {
    bar1();
    bar2();
    bar3();
    bar4();
    pie1();
    // history.go(0);
    // location.reload();
})();

//全屏监测
function fullScreen(bottom, fulldiv) {
    var fullscreen = false;      
    let btn = document.getElementById(bottom);       
    let fullarea = document.getElementById(fulldiv)  
    var time = 1 
    if (time == 1) { 
        fullarea.webkitRequestFullScreen();   
        fullscreen = !fullscreen;   
        time = time + 1             
    }         
    btn.addEventListener('click', function() {           
        if (fullscreen) {     // 退出全屏                        
            // if (document.exitFullscreen) {                    
            //     document.exitFullscreen();                
            // } else
            if (document.webkitCancelFullScreen) {                    
                document.webkitCancelFullScreen();                
            } else
            if (document.mozCancelFullScreen) {                    
                document.mozCancelFullScreen();                
            } else if (document.msExitFullscreen) {                    
                document.msExitFullscreen();                
            }            
        } else {     // 进入全屏                          
            if (fullarea.requestFullscreen) {                    
                fullarea.requestFullscreen();                
            } else
            if (fullarea.webkitRequestFullScreen) {                    
                fullarea.webkitRequestFullScreen();                
            } else
            if (fullarea.mozRequestFullScreen) {                 
                fullarea.mozRequestFullScreen();                
            } else
            if (fullarea.msRequestFullscreen) {
                // IE11                 
                fullarea.msRequestFullscreen();                
            }            
        }           
        fullscreen = !fullscreen;  
        history.go(0);
        location.reload();
    })
}

// 柱状图模块1
function bar1() {
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data23.json",
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
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar1 .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_2018 = []
    var read_Hang_Ye_2019 = []
    var read_Hang_Ye_2020 = []

    var read_Shu_Liang_2018 = []
    var read_Shu_Liang_2019 = []
    var read_Shu_Liang_2020 = []

    var Hang_Ye = Data1[0].HangYe
    var Shu_Liang = 0

    for (var i = 0; i < Data1.length; i++) {
        if (i < Data1.length - 1) {
            if (Data1[i + 1].HangYe == Data1[i].HangYe) {
                Hang_Ye = Data1[i].HangYe
                Shu_Liang = Data1[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data1[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data1[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }

    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data1.length; i++) {
            if (read_Hang_Ye[j] == Data1[i].HangYe) {
                //2018
                if (Data1[i].ShiJian == '2018') {
                    var Hang_Ye_2018 = Data1[i].HangYe
                    var Shu_Liang_2018 = Data1[i].ShuLiang
                    read_Hang_Ye_2018.push(Hang_Ye_2018)
                    read_Shu_Liang_2018.push(Shu_Liang_2018)
                }
                //2019
                if (Data1[i].ShiJian == '2019') {
                    var Hang_Ye_2019 = Data1[i].HangYe
                    var Shu_Liang_2019 = Data1[i].ShuLiang
                    read_Hang_Ye_2019.push(Hang_Ye_2019)
                    read_Shu_Liang_2019.push(Shu_Liang_2019)
                }
                //2020
                if (Data1[i].ShiJian == '2020') {
                    var Hang_Ye_2020 = Data1[i].HangYe
                    var Shu_Liang_2020 = Data1[i].ShuLiang
                    read_Hang_Ye_2020.push(Hang_Ye_2020)
                    read_Shu_Liang_2020.push(Shu_Liang_2020)
                }
            }
        }
    }


    // 2.指定配置项和数据
    var option = {
        color: ["#1089E7", '#90ed7d', '#f7a35c', '#f15c80'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        dataZoom: [{
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                start: 0,
                end: 100
            },
            {
                id: 'dataZoomY',
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'empty',
                start: 0,
                end: 100
            }
        ],
        toolbox: {
            feature: {
                // saveAsImage: {},
                dataView: {},
                restore: {},

                magicType: {
                    typy: ['bar', 'line']
                }
            }
        },
        // 修改图表位置大小
        grid: {
            top: "10px",
            left: '3%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            left: '10%',
        },

        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: read_Hang_Ye,
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
                rotate: 18,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: 8
        }],
        // y轴相关配置
        yAxis: [{
            type: 'value',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
            },
            // y轴样式修改
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.1)"
                }
            },
            symbolSize: 8
        }],
        // 系列列表配置
        series: [{
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '全部',
                data: read_Shu_Liang
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2018',
                data: read_Shu_Liang_2018
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2019',
                data: read_Shu_Liang_2019
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2020',
                data: read_Shu_Liang_2020
            },

        ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
            myChart.resize();
        })
        // 5.点击切换2020 和 2021 的数据
    $('.bar h2 a').on('click', function() {
        // console.log($(this).index());
        // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
        // console.log(yearData[$(this).index()]);
        var obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        option.series[2].data = obj.data[2];
        option.series[3].data = obj.data[3];
        // 选中年份高亮
        $('.bar h2 a').removeClass('a-active');
        $(this).addClass('a-active');

        // 需要重新渲染
        myChart.setOption(option);
    })
    return;
};

// 柱状图模块2
function bar2() {
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data23.json",
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
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_2018 = []
    var read_Hang_Ye_2019 = []
    var read_Hang_Ye_2020 = []

    var read_Shu_Liang_2018 = []
    var read_Shu_Liang_2019 = []
    var read_Shu_Liang_2020 = []

    var Hang_Ye = Data1[0].HangYe
    var Shu_Liang = 0

    for (var i = 0; i < Data1.length; i++) {
        if (i < Data1.length - 1) {
            if (Data1[i + 1].HangYe == Data1[i].HangYe) {
                Hang_Ye = Data1[i].HangYe
                Shu_Liang = Data1[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data1[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data1[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }

    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data1.length; i++) {
            if (read_Hang_Ye[j] == Data1[i].HangYe) {
                //2018
                if (Data1[i].ShiJian == '2018') {
                    var Hang_Ye_2018 = Data1[i].HangYe
                    var Shu_Liang_2018 = Data1[i].ShuLiang
                    read_Hang_Ye_2018.push(Hang_Ye_2018)
                    read_Shu_Liang_2018.push(Shu_Liang_2018)
                }
                //2019
                if (Data1[i].ShiJian == '2019') {
                    var Hang_Ye_2019 = Data1[i].HangYe
                    var Shu_Liang_2019 = Data1[i].ShuLiang
                    read_Hang_Ye_2019.push(Hang_Ye_2019)
                    read_Shu_Liang_2019.push(Shu_Liang_2019)
                }
                //2020
                if (Data1[i].ShiJian == '2020') {
                    var Hang_Ye_2020 = Data1[i].HangYe
                    var Shu_Liang_2020 = Data1[i].ShuLiang
                    read_Hang_Ye_2020.push(Hang_Ye_2020)
                    read_Shu_Liang_2020.push(Shu_Liang_2020)
                }
            }
        }
    }

    // 2.指定配置项和数据
    var option = {
        color: ['#90ed7d', '#f7a35c', '#f15c80'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        dataZoom: [{
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                start: 0,
                end: 100
            },
            {
                id: 'dataZoomY',
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'empty',
                start: 0,
                end: 100
            }
        ],
        toolbox: {
            feature: {
                // saveAsImage: {},
                dataView: {},
                restore: {},

                magicType: {
                    typy: ['bar', 'line']
                }
            }
        },
        // 修改图表位置大小
        grid: {
            top: "10px",
            left: '3%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            data: [],
            textStyle: {
                color: '#4c9bfd'
            },
            left: '10%',
        },

        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: read_Hang_Ye,
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
                rotate: 18,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: 8
        }],
        // y轴相关配置
        yAxis: [{
            type: 'value',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
            },
            // y轴样式修改
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.1)"
                }
            },
            symbolSize: 8
        }],
        // 系列列表配置
        series: [{
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
            },
            name: '2018',
            data: read_Shu_Liang_2018
        }, ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};

// 柱状图模块3
function bar3() {
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data23.json",
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
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar3 .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_2018 = []
    var read_Hang_Ye_2019 = []
    var read_Hang_Ye_2020 = []

    var read_Shu_Liang_2018 = []
    var read_Shu_Liang_2019 = []
    var read_Shu_Liang_2020 = []

    var Hang_Ye = Data1[0].HangYe
    var Shu_Liang = 0

    for (var i = 0; i < Data1.length; i++) {
        if (i < Data1.length - 1) {
            if (Data1[i + 1].HangYe == Data1[i].HangYe) {
                Hang_Ye = Data1[i].HangYe
                Shu_Liang = Data1[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data1[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data1[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }

    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data1.length; i++) {
            if (read_Hang_Ye[j] == Data1[i].HangYe) {
                //2018
                if (Data1[i].ShiJian == '2018') {
                    var Hang_Ye_2018 = Data1[i].HangYe
                    var Shu_Liang_2018 = Data1[i].ShuLiang
                    read_Hang_Ye_2018.push(Hang_Ye_2018)
                    read_Shu_Liang_2018.push(Shu_Liang_2018)
                }
                //2019
                if (Data1[i].ShiJian == '2019') {
                    var Hang_Ye_2019 = Data1[i].HangYe
                    var Shu_Liang_2019 = Data1[i].ShuLiang
                    read_Hang_Ye_2019.push(Hang_Ye_2019)
                    read_Shu_Liang_2019.push(Shu_Liang_2019)
                }
                //2020
                if (Data1[i].ShiJian == '2020') {
                    var Hang_Ye_2020 = Data1[i].HangYe
                    var Shu_Liang_2020 = Data1[i].ShuLiang
                    read_Hang_Ye_2020.push(Hang_Ye_2020)
                    read_Shu_Liang_2020.push(Shu_Liang_2020)
                }
            }
        }
    }

    // 2.指定配置项和数据
    var option = {
        color: ['#f7a35c', '#f15c80'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        dataZoom: [{
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                start: 0,
                end: 100
            },
            {
                id: 'dataZoomY',
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'empty',
                start: 0,
                end: 100
            }
        ],
        toolbox: {
            feature: {
                // saveAsImage: {},
                dataView: {},
                restore: {},

                magicType: {
                    typy: ['bar', 'line']
                }
            }
        },
        // 修改图表位置大小
        grid: {
            top: "10px",
            left: '3%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            data: [],
            textStyle: {
                color: '#4c9bfd'
            },
            left: '10%',
        },

        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: read_Hang_Ye,
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
                rotate: 18,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: 8
        }],
        // y轴相关配置
        yAxis: [{
            type: 'value',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
            },
            // y轴样式修改
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.1)"
                }
            },
            symbolSize: 8
        }],
        // 系列列表配置
        series: [{
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
            },
            name: '2019',
            data: read_Shu_Liang_2019
        }, ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};

// 柱状图模块4
function bar4() {
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data23.json",
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
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar4 .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_2018 = []
    var read_Hang_Ye_2019 = []
    var read_Hang_Ye_2020 = []

    var read_Shu_Liang_2018 = []
    var read_Shu_Liang_2019 = []
    var read_Shu_Liang_2020 = []

    var Hang_Ye = Data1[0].HangYe
    var Shu_Liang = 0

    for (var i = 0; i < Data1.length; i++) {
        if (i < Data1.length - 1) {
            if (Data1[i + 1].HangYe == Data1[i].HangYe) {
                Hang_Ye = Data1[i].HangYe
                Shu_Liang = Data1[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data1[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data1[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }

    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data1.length; i++) {
            if (read_Hang_Ye[j] == Data1[i].HangYe) {
                //2018
                if (Data1[i].ShiJian == '2018') {
                    var Hang_Ye_2018 = Data1[i].HangYe
                    var Shu_Liang_2018 = Data1[i].ShuLiang
                    read_Hang_Ye_2018.push(Hang_Ye_2018)
                    read_Shu_Liang_2018.push(Shu_Liang_2018)
                }
                //2019
                if (Data1[i].ShiJian == '2019') {
                    var Hang_Ye_2019 = Data1[i].HangYe
                    var Shu_Liang_2019 = Data1[i].ShuLiang
                    read_Hang_Ye_2019.push(Hang_Ye_2019)
                    read_Shu_Liang_2019.push(Shu_Liang_2019)
                }
                //2020
                if (Data1[i].ShiJian == '2020') {
                    var Hang_Ye_2020 = Data1[i].HangYe
                    var Shu_Liang_2020 = Data1[i].ShuLiang
                    read_Hang_Ye_2020.push(Hang_Ye_2020)
                    read_Shu_Liang_2020.push(Shu_Liang_2020)
                }
            }
        }
    }

    // 2.指定配置项和数据
    var option = {
        color: ['#f15c80'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        dataZoom: [{
                id: 'dataZoomX',
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
                start: 0,
                end: 100
            },
            {
                id: 'dataZoomY',
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'empty',
                start: 0,
                end: 100
            }
        ],
        toolbox: {
            feature: {
                // saveAsImage: {},
                dataView: {},
                restore: {},

                magicType: {
                    typy: ['bar', 'line']
                }
            }
        },
        // 修改图表位置大小
        grid: {
            top: "10px",
            left: '3%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            data: [],
            textStyle: {
                color: '#4c9bfd'
            },
            left: '10%',
        },

        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: read_Hang_Ye,
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
                rotate: 18,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: 8
        }],
        // y轴相关配置
        yAxis: [{
            type: 'value',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
            },
            // y轴样式修改
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            // y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "rgba(255,255,255,0.1)"
                }
            },
            symbolSize: 8
        }],
        // 系列列表配置
        series: [{
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2020',
                data: read_Shu_Liang_2020
            },

        ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};

// 饼形图1
function pie1() {
    var Data5 = (function() {
        var Data5 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data13.json",
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
    var myChart = echarts.init(document.querySelector(".pie1 .chart"));
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
            bottom: 10,
            left: 10,
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
            center: ["50%", "35%"],
            // 修改饼形图大小，第一个为内圆半径，第二个为外圆半径
            radius: ['30%', '50%'],
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
                    value: read_Shu_Liang[0],
                    name: read_Hang_Ye[0],
                },
                {
                    value: read_Shu_Liang[1],
                    name: read_Hang_Ye[1],
                },
                {
                    value: read_Shu_Liang[2],
                    name: read_Hang_Ye[2],
                },
                {
                    value: read_Shu_Liang[3],
                    name: read_Hang_Ye[3],
                },
                {
                    value: read_Shu_Liang[4],
                    name: read_Hang_Ye[4],
                },
                {
                    value: read_Shu_Liang[5],
                    name: read_Hang_Ye[5],
                },
                {
                    value: read_Shu_Liang[6],
                    name: read_Hang_Ye[6],
                },
                {
                    value: read_Shu_Liang[7],
                    name: read_Hang_Ye[7],
                },
                {
                    value: read_Shu_Liang[8],
                    name: read_Hang_Ye[8],
                },
                {
                    value: read_Shu_Liang[9],
                    name: read_Hang_Ye[9],
                },
                {
                    value: read_Shu_Liang[10],
                    name: read_Hang_Ye[10],
                }, {
                    value: read_Shu_Liang[11],
                    name: read_Hang_Ye[11],
                },
                {
                    value: read_Shu_Liang[12],
                    name: read_Hang_Ye[12],
                },
                {
                    value: read_Shu_Liang[13],
                    name: read_Hang_Ye[13],
                },
                {
                    value: read_Shu_Liang[14],
                    name: read_Hang_Ye[14],
                },
                {
                    value: read_Shu_Liang[15],
                    name: read_Hang_Ye[15],
                },
                {
                    value: read_Shu_Liang[16],
                    name: read_Hang_Ye[16],
                },
                {
                    value: read_Shu_Liang[17],
                    name: read_Hang_Ye[17],
                }
            ]
        }]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};