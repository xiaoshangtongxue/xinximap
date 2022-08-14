var def = (function() {
    bar1();
    bar2();
    line1();
    pie1();
    pie2();
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
    //行业-数量（公司）
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data9.json",
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
    // 声明颜色数组
    //读取数据
    var read_Suo_Zai_Yuan_Xi = []
    var read_Shu_Liang = []
    for (var i = 1; i < Data1.length; i++) {
        var Suo_Zai_Yuan_Xi = Data1[i].SuoZaiYuanXi
        var Shu_Liang = Data1[i].ShuLiang
        read_Suo_Zai_Yuan_Xi.push(Suo_Zai_Yuan_Xi)
        read_Shu_Liang.push(Shu_Liang)
    }
    // 2.指定配置项和数据
    var option = {
        color: ['#00f2f1'],
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
            left: '4%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            data: [],
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },
        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: read_Suo_Zai_Yuan_Xi,
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: 8,
                rotate: 45,
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
                fontSize: 12
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
            name: '数量',
            type: 'bar',
            barWidth: '30%',
            // ajax传动态数据
            data: read_Shu_Liang,
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
            }
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

// 线性图模块1
function line1() {
    var Data3 = (function() {
        var Data3 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data11.json",
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
    var myChart = echarts.init(document.querySelector(".line1 .chart"));
    //读取数据
    var read_Suo_Zai_Yuan_Xi = []
    var read_Shu_Liang = []
    var read_Suo_Zai_Yuan_Xi_Jiao_Shou = []
    var read_Suo_Zai_Yuan_Xi_Fu_Jiao_Shou = []
    var read_Suo_Zai_Yuan_Xi_Jiang_Shi = []
    var read_Suo_Zai_Yuan_Xi_Zhu_Jiao = []
    var read_Suo_Zai_Yuan_Xi_Qi_Ta = []
    var read_Shu_Liang_Jiao_Shou = []
    var read_Shu_Liang_Fu_Jiao_Shou = []
    var read_Shu_Liang_Jiang_Shi = []
    var read_Shu_Liang_Zhu_Jiao = []
    var read_Shu_Liang_Qi_Ta = []
    var Suo_Zai_Yuan_Xi = Data3[0].SuoZaiYuanXi
    var Shu_Liang = 0
    for (var i = 0; i < Data3.length; i++) {
        if (i < Data3.length - 1) {
            if (Data3[i + 1].SuoZaiYuanXi == Data3[i].SuoZaiYuanXi) {
                Suo_Zai_Yuan_Xi = Data3[i].SuoZaiYuanXi
                Shu_Liang = Data3[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data3[i].ShuLiang
                read_Suo_Zai_Yuan_Xi.push(Suo_Zai_Yuan_Xi)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data3[i].ShuLiang
            read_Suo_Zai_Yuan_Xi.push(Suo_Zai_Yuan_Xi)
            read_Shu_Liang.push(Shu_Liang)
        }
    }
    for (var j = 0; j < read_Suo_Zai_Yuan_Xi.length; j++) {
        for (var i = 0; i < Data3.length; i++) {
            if (read_Suo_Zai_Yuan_Xi[j] == Data3[i].SuoZaiYuanXi) {
                //教授
                if (Data3[i].ZhiCheng == '教授') {
                    var Suo_Zai_Yuan_Xi_Jiao_Shou = Data3[i].SuoZaiYuanXi
                    var Shu_Liang_Jiao_Shou = Data3[i].ShuLiang
                    read_Suo_Zai_Yuan_Xi_Jiao_Shou.push(Suo_Zai_Yuan_Xi_Jiao_Shou)
                    read_Shu_Liang_Jiao_Shou.push(Shu_Liang_Jiao_Shou)
                }
                //副教授
                if (Data3[i].ZhiCheng == '副教授') {
                    var Suo_Zai_Yuan_Xi_Fu_Jiao_Shou = Data3[i].SuoZaiYuanXi
                    var Shu_Liang_Fu_Jiao_Shou = Data3[i].ShuLiang
                    read_Suo_Zai_Yuan_Xi_Fu_Jiao_Shou.push(Suo_Zai_Yuan_Xi_Fu_Jiao_Shou)
                    read_Shu_Liang_Fu_Jiao_Shou.push(Shu_Liang_Fu_Jiao_Shou)
                }
                //讲师
                if (Data3[i].ZhiCheng == '讲师') {
                    var Suo_Zai_Yuan_Xi_Jiang_Shi = Data3[i].SuoZaiYuanXi
                    var Shu_Liang_Jiang_Shi = Data3[i].ShuLiang
                    read_Suo_Zai_Yuan_Xi_Jiang_Shi.push(Suo_Zai_Yuan_Xi_Jiang_Shi)
                    read_Shu_Liang_Jiang_Shi.push(Shu_Liang_Jiang_Shi)
                }
                //助教
                if (Data3[i].ZhiCheng == '助教') {
                    var Suo_Zai_Yuan_Xi_Zhu_Jiao = Data3[i].SuoZaiYuanXi
                    var Shu_Liang_Zhu_Jiao = Data3[i].ShuLiang
                    read_Suo_Zai_Yuan_Xi_Zhu_Jiao.push(Suo_Zai_Yuan_Xi_Zhu_Jiao)
                    read_Shu_Liang_Zhu_Jiao.push(Shu_Liang_Zhu_Jiao)
                }
                //其他
                if (Data3[i].ZhiCheng == '其他') {
                    var Suo_Zai_Yuan_Xi_Qi_Ta = Data3[i].SuoZaiYuanXi
                    var Shu_Liang_Qi_Ta = Data3[i].ShuLiang
                    read_Suo_Zai_Yuan_Xi_Qi_Ta.push(Suo_Zai_Yuan_Xi_Qi_Ta)
                    read_Shu_Liang_Qi_Ta.push(Shu_Liang_Qi_Ta)
                }
            }
        }
    }
    //配置项
    var option = {
        // 修改三条线的颜色
        color: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C'],
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
        // 图例组件
        legend: {
            // 当serise 有name值时， legend 不需要写data
            // 修改图例组件文字颜色
            textStyle: {
                color: '#4c9bfd'
            },
            left: '12%',
        },
        grid: {
            top: "10%",
            left: '5%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show: true, // 显示边框
            borderColor: '#012f4a' // 边框颜色
        },
        xAxis: {
            type: 'category',
            boundaryGap: false, // 去除轴间距
            data: read_Suo_Zai_Yuan_Xi,
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: 8,
                rotate: 50,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: 8,
            // 去除刻度线
            axisTick: {
                show: true
            },
        },
        yAxis: {
            type: 'value',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: 12
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
            symbolSize: 8,
        },
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
                name: '教授',
                data: read_Shu_Liang_Jiao_Shou
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '副教授',
                data: read_Shu_Liang_Fu_Jiao_Shou
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '讲师',
                data: read_Shu_Liang_Jiang_Shi
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '助教',
                data: read_Shu_Liang_Zhu_Jiao
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '其他',
                data: read_Shu_Liang_Qi_Ta
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
    $('.line h2 a').on('click', function() {
        // console.log($(this).index());
        // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
        // console.log(yearData[$(this).index()]);
        var obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        option.series[2].data = obj.data[2];
        option.series[3].data = obj.data[3];
        option.series[4].data = obj.data[4];
        option.series[5].data = obj.data[5];
        // 选中年份高亮
        $('.line h2 a').removeClass('a-active');
        $(this).addClass('a-active');

        // 需要重新渲染
        myChart.setOption(option);
    })
    return;
};

// 柱状图2
function bar2() {
    var Data4 = (function() {
        var Data4 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data14.json",
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
    var myChart = echarts.init(document.querySelector('.bar2 .chart'));
    // //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_Jiao_Shou = []
    var read_Hang_Ye_Fu_Jiao_Shou = []
    var read_Hang_Ye_Jiang_Shi = []
    var read_Hang_Ye_Zhu_Jiao = []
    var read_Hang_Ye_Qi_Ta = []
    var read_Shu_Liang_Jiao_Shou = []
    var read_Shu_Liang_Fu_Jiao_Shou = []
    var read_Shu_Liang_Jiang_Shi = []
    var read_Shu_Liang_Zhu_Jiao = []
    var read_Shu_Liang_Qi_Ta = []
    var Hang_Ye = Data4[0].HangYe
    var Shu_Liang = 0
    for (var i = 0; i < Data4.length; i++) {
        if (i < Data4.length - 1) {
            if (Data4[i + 1].HangYe == Data4[i].HangYe) {
                Hang_Ye = Data4[i].HangYe
                Shu_Liang = Data4[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data4[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data4[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }
    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data4.length; i++) {
            if (read_Hang_Ye[j] == Data4[i].HangYe) {
                //教授
                if (Data4[i].ZhiCheng == '教授') {
                    var Hang_Ye_Jiao_Shou = Data4[i].HangYe
                    var Shu_Liang_Jiao_Shou = Data4[i].ShuLiang
                    read_Hang_Ye_Jiao_Shou.push(Hang_Ye_Jiao_Shou)
                    read_Shu_Liang_Jiao_Shou.push(Shu_Liang_Jiao_Shou)
                }
                //副教授
                if (Data4[i].ZhiCheng == '副教授') {
                    var Hang_Ye_Fu_Jiao_Shou = Data4[i].HangYe
                    var Shu_Liang_Fu_Jiao_Shou = Data4[i].ShuLiang
                    read_Hang_Ye_Fu_Jiao_Shou.push(Hang_Ye_Fu_Jiao_Shou)
                    read_Shu_Liang_Fu_Jiao_Shou.push(Shu_Liang_Fu_Jiao_Shou)
                }
                //讲师
                if (Data4[i].ZhiCheng == '讲师') {
                    var Hang_Ye_Jiang_Shi = Data4[i].HangYe
                    var Shu_Liang_Jiang_Shi = Data4[i].ShuLiang
                    read_Hang_Ye_Jiang_Shi.push(Hang_Ye_Jiang_Shi)
                    read_Shu_Liang_Jiang_Shi.push(Shu_Liang_Jiang_Shi)
                }
                //助教
                if (Data4[i].ZhiCheng == '助教') {
                    var Hang_Ye_Zhu_Jiao = Data4[i].HangYe
                    var Shu_Liang_Zhu_Jiao = Data4[i].ShuLiang
                    read_Hang_Ye_Zhu_Jiao.push(Hang_Ye_Zhu_Jiao)
                    read_Shu_Liang_Zhu_Jiao.push(Shu_Liang_Zhu_Jiao)
                }
                //其他
                if (Data4[i].ZhiCheng == '其他') {
                    var Hang_Ye_Qi_Ta = Data4[i].HangYe
                    var Shu_Liang_Qi_Ta = Data4[i].ShuLiang
                    read_Hang_Ye_Qi_Ta.push(Hang_Ye_Qi_Ta)
                    read_Shu_Liang_Qi_Ta.push(Shu_Liang_Qi_Ta)
                }
            }
        }
    }

    //分类
    var Data_ShuLiang = []
    var Data_JiaoShou = []
    var Data_FuJiaoShou = []
    var Data_JiangShi = []
    var Data_ZhuJiao = []
    var Data_QiTa = []

    for (var i = 0; i < read_Hang_Ye.length; i++) {

        if (read_Hang_Ye[i] == '农、林、牧、渔业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '采矿业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '制造业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '电力、热力、燃气及水生产和供应业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '建筑业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '批发和零售业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '交通运输、仓储和邮政业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '住宿和餐饮业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '信息传输、软件和信息技术服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '金融业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '房地产业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '租赁和商务服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '科学研究和技术服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '水利、环境和公共设施管理业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '居民服务、修理和其他服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '教育') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '卫生和社会工作') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '文化、体育和娱乐业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '公共管理、社会保障和社会组织') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        if (read_Hang_Ye[i] == '国际组织') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_Jiao_Shou = read_Shu_Liang_Jiao_Shou[i]
            var data_Fu_Jiao_Shou = read_Shu_Liang_Fu_Jiao_Shou[i]
            var data_Jiang_Shi = read_Shu_Liang_Jiang_Shi[i]
            var data_Zhu_Jiao = read_Shu_Liang_Zhu_Jiao[i]
            var data_Qi_Ta = read_Shu_Liang_Qi_Ta[i]
        }
        Data_ShuLiang.push(data_Shu_Liang)
        Data_JiaoShou.push(data_Jiao_Shou)
        Data_FuJiaoShou.push(data_Fu_Jiao_Shou)
        Data_JiangShi.push(data_Jiang_Shi)
        Data_ZhuJiao.push(data_Zhu_Jiao)
        Data_QiTa.push(data_Qi_Ta)
    }

    // 2.指定配置项和数据
    var option = {
        // 修改三条线的颜色
        color: ['#7cb5ec', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C'],

        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        // 修改图表位置大小
        grid: {
            left: '4%',
            top: '10px',
            right: '3%',
            bottom: '0%',
            containLabel: true
        },
        legend: {
            // data: [],
            textStyle: {
                color: '#4c9bfd'
            },
            left: '12%',
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
        // x轴相关配置
        xAxis: [{
            type: 'category',
            data: ['农、林、牧、渔业',
                '采矿业',
                '制造业',
                '电力、热力、燃气及水生产和供应业',
                '建筑业',
                '批发和零售业',
                '交通运输、仓储和邮政业',
                '住宿和餐饮业',
                '信息传输、软件和信息技术服务业', '金融业',
                '房地产业',
                '租赁和商务服务业',
                '科学研究和技术服务业',
                '水利、环境和公共设施管理业',
                '居民服务、修理和其他服务业',
                '教育',
                '卫生和社会工作',
                '文化、体育和娱乐业',
                '公共管理、社会保障和社会组织',
                '国际组织'
            ],
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: 8,
                rotate: 25,
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
                fontSize: 12
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
                data: Data_ShuLiang
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '教授',
                data: Data_JiaoShou
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '副教授',
                data: Data_FuJiaoShou
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '讲师',
                data: Data_JiangShi
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '助教',
                data: Data_ZhuJiao
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '其他',
                data: Data_QiTa
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
    $('.line h2 a').on('click', function() {
        // console.log($(this).index());
        // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
        // console.log(yearData[$(this).index()]);
        var obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        option.series[2].data = obj.data[2];
        option.series[3].data = obj.data[3];
        option.series[4].data = obj.data[4];
        option.series[5].data = obj.data[5];
        // 选中年份高亮
        $('.line h2 a').removeClass('a-active');
        $(this).addClass('a-active');

        // 需要重新渲染
        myChart.setOption(option);
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
            url: "/static/js/data8.json",
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
    var read_Zhi_Cheng = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data5.length; i++) {
        var Zhi_Cheng = Data5[i].ZhiCheng
        var Shu_Liang = Data5[i].ShuLiang
        read_Zhi_Cheng.push(Zhi_Cheng)
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
                fontSize: "18"
            }
        },
        series: [{
            name: '教师职称',
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
                    value: read_Shu_Liang[3],
                    name: read_Zhi_Cheng[3],
                },
                {
                    value: read_Shu_Liang[1],
                    name: read_Zhi_Cheng[1],
                },
                {
                    value: read_Shu_Liang[4],
                    name: read_Zhi_Cheng[4],
                },
                {
                    value: read_Shu_Liang[2],
                    name: read_Zhi_Cheng[2],
                },
                {
                    value: read_Shu_Liang[0],
                    name: read_Zhi_Cheng[0],
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

// 饼形图2
function pie2() {
    var Data6 = (function() {
        var Data6 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data10.json",
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
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));
    // //读取数据
    // var read_Hang_Ye = []
    // var read_Shu_Liang = []
    // for (var i = 2; i < Data4.length; i++) {
    //     var Hang_Ye = Data4[i].HangYe
    //     var Shu_Liang = Data4[i].ShuLiang
    //     read_Hang_Ye.push(Hang_Ye)
    //     read_Shu_Liang.push(Shu_Liang)
    // }
    //分类
    for (var i = 0; i < Data6.length; i++) {
        // if (Data4[i].HangYe == '') {
        //     Null = Null + 1;
        //     continue
        // }
        if (Data6[i].HangYe == '农、林、牧、渔业') {
            var Hang_Ye1 = Data6[i].HangYe
            var Shu_Liang1 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '采矿业') {
            var Hang_Ye2 = Data6[i].HangYe
            var Shu_Liang2 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '制造业') {
            var Hang_Ye3 = Data6[i].HangYe
            var Shu_Liang3 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '电力、热力、燃气及水生产和供应业') {
            var Hang_Ye4 = Data6[i].HangYe
            var Shu_Liang4 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '建筑业') {
            var Hang_Ye5 = Data6[i].HangYe
            var Shu_Liang5 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '批发和零售业') {
            var Hang_Ye6 = Data6[i].HangYe
            var Shu_Liang6 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '交通运输、仓储和邮政业') {
            var Hang_Ye7 = Data6[i].HangYe
            var Shu_Liang7 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '住宿和餐饮业') {
            var Hang_Ye8 = Data6[i].HangYe
            var Shu_Liang8 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '信息传输、软件和信息技术服务业') {
            var Hang_Ye9 = Data6[i].HangYe
            var Shu_Liang9 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '金融业') {
            var Hang_Ye10 = Data6[i].HangYe
            var Shu_Liang10 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '房地产业') {
            var Hang_Ye11 = Data6[i].HangYe
            var Shu_Liang11 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '租赁和商务服务业') {
            var Hang_Ye12 = Data6[i].HangYe
            var Shu_Liang12 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '科学研究和技术服务业') {
            var Hang_Ye13 = Data6[i].HangYe
            var Shu_Liang13 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '水利、环境和公共设施管理业') {
            var Hang_Ye14 = Data6[i].HangYe
            var Shu_Liang14 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '居民服务、修理和其他服务业') {
            var Hang_Ye15 = Data6[i].HangYe
            var Shu_Liang15 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '教育') {
            var Hang_Ye16 = Data6[i].HangYe
            var Shu_Liang16 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '卫生和社会工作') {
            var Hang_Ye17 = Data6[i].HangYe
            var Shu_Liang17 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '文化、体育和娱乐业') {
            var Hang_Ye18 = Data6[i].HangYe
            var Shu_Liang18 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '公共管理、社会保障和社会组织') {
            var Hang_Ye19 = Data6[i].HangYe
            var Shu_Liang19 = Data6[i].ShuLiang
            continue
        }
        if (Data6[i].HangYe == '国际组织') {
            var Hang_Ye20 = Data6[i].HangYe
            var Shu_Liang20 = Data6[i].ShuLiang
        }
    }
    // 2.指定配置项和数据
    var option = {
        color: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
            '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6'
        ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 25,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: 13
            }
        },
        series: [{
            name: '行业',
            type: 'pie',
            radius: ["20%", "40%"],
            center: ['47%', '35%'],
            // 半径模式  area面积模式
            roseType: 'radius',
            // 图形的文字标签
            label: {
                fontsize: 8
            },
            // 引导线调整
            labelLine: {
                // 连接扇形图线长(斜线)
                length: 5,
                // 连接文字线长(横线)
                length2: 6
            },
            data: [{
                    value: Shu_Liang1,
                    name: Hang_Ye1,
                },
                {
                    value: Shu_Liang2,
                    name: Hang_Ye2,
                },
                {
                    value: Shu_Liang3,
                    name: Hang_Ye3,
                },
                {
                    value: Shu_Liang4,
                    name: Hang_Ye4,
                },
                {
                    value: Shu_Liang5,
                    name: Hang_Ye5,
                },
                {
                    value: Shu_Liang6,
                    name: Hang_Ye6,
                },
                {
                    value: Shu_Liang7,
                    name: Hang_Ye7,
                },
                {
                    value: Shu_Liang8,
                    name: Hang_Ye8,
                },
                {
                    value: Shu_Liang9,
                    name: Hang_Ye9,
                },
                {
                    value: Shu_Liang10,
                    name: Hang_Ye10,
                },
                {
                    value: Shu_Liang11,
                    name: Hang_Ye11,
                },
                {
                    value: Shu_Liang12,
                    name: Hang_Ye12,
                },
                {
                    value: Shu_Liang13,
                    name: Hang_Ye13,
                },
                {
                    value: Shu_Liang14,
                    name: Hang_Ye14,
                },
                {
                    value: Shu_Liang15,
                    name: Hang_Ye15,
                },
                {
                    value: Shu_Liang16,
                    name: Hang_Ye16,
                },
                {
                    value: Shu_Liang17,
                    name: Hang_Ye17,
                },
                {
                    value: Shu_Liang18,
                    name: Hang_Ye18,
                },
                {
                    value: Shu_Liang19,
                    name: Hang_Ye19,
                },
                {
                    value: Shu_Liang20,
                    name: Hang_Ye20,
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