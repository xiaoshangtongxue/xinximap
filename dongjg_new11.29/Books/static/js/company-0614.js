var def = (function() {
    bar1();
    bar2();
    bar3();
    bar4();
    bar5();
    bar6();
    bar7();
    bar8();
    line1();
    pie1();
    pie2();
    pie3();
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

// 柱状图-行业分析图 左1
function bar1() {
    var Data1 = (function() {
            var Data1 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data1.json",
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

    for (var i = 0; i < Data1.length; i++) {
        // if (Data4[i].HangYe == '') {
        //     Null = Null + 1;
        //     continue
        // }
        if (Data1[i].HangYe == '农、林、牧、渔业') {
            var Hang_Ye1 = Data1[i].HangYe
            var Shu_Liang1 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '采矿业') {
            var Hang_Ye2 = Data1[i].HangYe
            var Shu_Liang2 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '制造业') {
            var Hang_Ye3 = Data1[i].HangYe
            var Shu_Liang3 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '电力、热力、燃气及水生产和供应业') {
            var Hang_Ye4 = Data1[i].HangYe
            var Shu_Liang4 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '建筑业') {
            var Hang_Ye5 = Data1[i].HangYe
            var Shu_Liang5 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '批发和零售业') {
            var Hang_Ye6 = Data1[i].HangYe
            var Shu_Liang6 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '交通运输、仓储和邮政业') {
            var Hang_Ye7 = Data1[i].HangYe
            var Shu_Liang7 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '住宿和餐饮业') {
            var Hang_Ye8 = Data1[i].HangYe
            var Shu_Liang8 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '信息传输、软件和信息技术服务业') {
            var Hang_Ye9 = Data1[i].HangYe
            var Shu_Liang9 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '金融业') {
            var Hang_Ye10 = Data1[i].HangYe
            var Shu_Liang10 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '房地产业') {
            var Hang_Ye11 = Data1[i].HangYe
            var Shu_Liang11 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '租赁和商务服务业') {
            var Hang_Ye12 = Data1[i].HangYe
            var Shu_Liang12 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '科学研究和技术服务业') {
            var Hang_Ye13 = Data1[i].HangYe
            var Shu_Liang13 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '水利、环境和公共设施管理业') {
            var Hang_Ye14 = Data1[i].HangYe
            var Shu_Liang14 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '居民服务、修理和其他服务业') {
            var Hang_Ye15 = Data1[i].HangYe
            var Shu_Liang15 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '教育') {
            var Hang_Ye16 = Data1[i].HangYe
            var Shu_Liang16 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '卫生和社会工作') {
            var Hang_Ye17 = Data1[i].HangYe
            var Shu_Liang17 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '文化、体育和娱乐业') {
            var Hang_Ye18 = Data1[i].HangYe
            var Shu_Liang18 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '公共管理、社会保障和社会组织') {
            var Hang_Ye19 = Data1[i].HangYe
            var Shu_Liang19 = Data1[i].ShuLiang
            continue
        }
        if (Data1[i].HangYe == '国际组织') {
            var Hang_Ye20 = Data1[i].HangYe
            var Shu_Liang20 = Data1[i].ShuLiang
        }
    }
    var Data_ShuLiang = [Shu_Liang1,
        Shu_Liang2,
        Shu_Liang3,
        Shu_Liang4,
        Shu_Liang5,
        Shu_Liang6,
        Shu_Liang7,
        Shu_Liang8,
        Shu_Liang9,
        Shu_Liang10,
        Shu_Liang11,
        Shu_Liang12,
        Shu_Liang13,
        Shu_Liang14,
        Shu_Liang15,
        Shu_Liang16,
        Shu_Liang17,
        Shu_Liang18,
        Shu_Liang19,
        Shu_Liang20
    ];
    // 2.指定配置项和数据
    var option = {
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
            top: "5%",
            left: '5%',
            bottom: '0%',
            right: '3%',
            containLabel: true
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
                fontSize: '80%',
                rotate: 20,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: "8%"
        }],
        // y轴相关配置
        yAxis: [{
            type: 'log',
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '80%',
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
            //symbolSize: 8
        }],
        // 系列列表配置
        series: [{
            name: '数量',
            type: 'bar',
            barWidth: '20%',
            // ajax传动态数据
            data: Data_ShuLiang,
            color: function(params) {
                // build a color map as your need.
                var colorList = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
                    '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6'
                ];
                return colorList[params.dataIndex]
            },
            itemStyle: {
                // 修改柱子圆角
                barBorderRadius: 5,
            }
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

// 折线图-高企时间序列变化图 左2
function line1() {
    var Data3 = (function() {
            var Data3 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data17.json",
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
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".line1 .chart"));
    //读取数据
    var read_Zhu_Ce_Shi_Jian = []
    var read_Shu_Liang = []
    var read_Zhu_Ce_Shi_Jian_Xiao_Wei = []
    var read_Zhu_Ce_Shi_Jian_Ke_Xiao = []
    var read_Zhu_Ce_Shi_Jian_Gao_Xin = []

    var read_Shu_Liang_Xiao_Wei = []
    var read_Shu_Liang_Ke_Xiao = []
    var read_Shu_Liang_Gao_Xin = []

    var Zhu_Ce_Shi_Jian = Data3[0].ZhuCeShiJian
    var Shu_Liang = 0
    for (var i = 0; i < Data3.length - 1; i++) {
        // if (i < Data3.length - 2) {
        if (Data3[i + 1].ZhuCeShiJian == Data3[i].ZhuCeShiJian) {
            Zhu_Ce_Shi_Jian = Data3[i].ZhuCeShiJian
            Shu_Liang = Data3[i].ShuLiang + Shu_Liang
        } else {
            Shu_Liang = Shu_Liang + Data3[i].ShuLiang
            read_Zhu_Ce_Shi_Jian.push(Zhu_Ce_Shi_Jian)
            read_Shu_Liang.push(Shu_Liang)
            Shu_Liang = 0
        }
        // } else {
        //     Shu_Liang = Shu_Liang + Data3[i].ShuLiang
        //     read_Zhu_Ce_Shi_Jian.push(Zhu_Ce_Shi_Jian)
        //     read_Shu_Liang.push(Shu_Liang)
        // }
    }
    for (var j = 0; j < read_Zhu_Ce_Shi_Jian.length; j++) {
        for (var i = 0; i < Data3.length; i++) {
            if (read_Zhu_Ce_Shi_Jian[j] == Data3[i].ZhuCeShiJian) {
                //小微企业
                if (Data3[i].QiYeGuiMo == '小微企业') {
                    var Zhu_Ce_Shi_Jian_Xiao_Wei = Data3[i].ZhuCehiJian
                    var Shu_Liang_Xiao_Wei = Data3[i].ShuLiang
                    read_Zhu_Ce_Shi_Jian_Xiao_Wei.push(Zhu_Ce_Shi_Jian_Xiao_Wei)
                    read_Shu_Liang_Xiao_Wei.push(Shu_Liang_Xiao_Wei)
                }
                //科技型中小企业
                if (Data3[i].QiYeGuiMo == '科技型中小企业') {
                    var Zhu_Ce_Shi_Jian_Ke_Xiao = Data3[i].ZhuCehiJian
                    var Shu_Liang_Ke_Xiao = Data3[i].ShuLiang
                    read_Zhu_Ce_Shi_Jian_Ke_Xiao.push(Zhu_Ce_Shi_Jian_Ke_Xiao)
                    read_Shu_Liang_Ke_Xiao.push(Shu_Liang_Ke_Xiao)
                }
                //高新技术企业
                if (Data3[i].QiYeGuiMo == '高新技术企业') {
                    var Zhu_Ce_Shi_Jian_Gao_Xin = Data3[i].ZhuCeShiJian
                    var Shu_Liang_Gao_Xin = Data3[i].ShuLiang
                    read_Zhu_Ce_Shi_Jian_Gao_Xin.push(Zhu_Ce_Shi_Jian_Gao_Xin)
                    read_Shu_Liang_Gao_Xin.push(Shu_Liang_Gao_Xin)
                }
            }
        }
    }
    var option = {
        // 修改三条线的颜色
        color: ['#0096ff', '#ed8884', '#9fe6b8', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
            '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44'
        ], //, '#ed3f35', '#98B448'
        tooltip: {
            trigger: 'axis'
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
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
            show: true, // 显示边框
            borderColor: '#012f4a' // 边框颜色
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false, // 去除轴间距
            data: read_Zhu_Ce_Shi_Jian,
            // 去除刻度线
            axisTick: {
                alignWithLabel: true
            },
            // 修改刻度标签，相关样式
            axisLabel: {
                color: "#4c9bfb", // x轴文本颜色
                fontSize: '100%',
                rotate: 50,
            },
            axisLine: {
                lineStyle: {
                    color: "#4c9bfb",
                    width: 2
                }
            },
            symbolSize: '10%'
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
            symbolSize: "10%"
        }],
        series: [{
                type: 'line',
                smooth: true, // 圆滑的线
                name: '全部',
                data: read_Shu_Liang
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '小微企业',
                data: read_Shu_Liang_Xiao_Wei
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '科技型中小企业',
                data: read_Shu_Liang_Ke_Xiao
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '高新技术企业',
                data: read_Shu_Liang_Gao_Xin
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
        // 选中年份高亮
        $('.line h2 a').removeClass('a-active');
        $(this).addClass('a-active');

        // 需要重新渲染
        myChart.setOption(option);
    })
    return;
};

// 柱状图-高新技术企业行业分布 左3
function bar3() {

    var Data7 = (function() {
            var Data7 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data22.json",
                dataType: "json", //返回数据形式为json
                success: function(result) {
                    //后台返回的数据格式如下：
                    Data7 = result
                },
                error: function(errorMsg) {
                    alert("加载失败！");
                }
            });
            return Data7
        })()
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar3 .chart"));
    // //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    var read_Hang_Ye_2018 = []
    var read_Hang_Ye_2019 = []
    var read_Hang_Ye_2020 = []

    var read_Shu_Liang_2018 = []
    var read_Shu_Liang_2019 = []
    var read_Shu_Liang_2020 = []

    var Hang_Ye = Data7[0].HangYe
    var Shu_Liang = 0

    for (var i = 0; i < Data7.length; i++) {
        if (i < Data7.length - 1) {
            if (Data7[i + 1].HangYe == Data7[i].HangYe) {
                Hang_Ye = Data7[i].HangYe
                Shu_Liang = Data7[i].ShuLiang + Shu_Liang
            } else {
                Shu_Liang = Shu_Liang + Data7[i].ShuLiang
                read_Hang_Ye.push(Hang_Ye)
                read_Shu_Liang.push(Shu_Liang)
                Shu_Liang = 0
            }
        } else {
            Shu_Liang = Shu_Liang + Data7[i].ShuLiang
            read_Hang_Ye.push(Hang_Ye)
            read_Shu_Liang.push(Shu_Liang)
        }
    }

    for (var j = 0; j < read_Hang_Ye.length; j++) {
        for (var i = 0; i < Data7.length; i++) {
            if (read_Hang_Ye[j] == Data7[i].HangYe) {
                //2018
                if (Data7[i].RenDinShiJian == '2018') {
                    var Hang_Ye_2018 = Data7[i].HangYe
                    var Shu_Liang_2018 = Data7[i].ShuLiang
                    read_Hang_Ye_2018.push(Hang_Ye_2018)
                    read_Shu_Liang_2018.push(Shu_Liang_2018)
                }
                //2019
                if (Data7[i].RenDinShiJian == '2019') {
                    var Hang_Ye_2019 = Data7[i].HangYe
                    var Shu_Liang_2019 = Data7[i].ShuLiang
                    read_Hang_Ye_2019.push(Hang_Ye_2019)
                    read_Shu_Liang_2019.push(Shu_Liang_2019)
                }
                //2020
                if (Data7[i].RenDinShiJian == '2020') {
                    var Hang_Ye_2020 = Data7[i].HangYe
                    var Shu_Liang_2020 = Data7[i].ShuLiang
                    read_Hang_Ye_2020.push(Hang_Ye_2020)
                    read_Shu_Liang_2020.push(Shu_Liang_2020)
                }
            }
        }
    }

    //分类
    var Data_ShuLiang = []
    var Data_2018 = []
    var Data_2019 = []
    var Data_2020 = []

    for (var i = 0; i < read_Hang_Ye.length; i++) {

        if (read_Hang_Ye[i] == '农、林、牧、渔业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '采矿业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '制造业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '电力、热力、燃气及水生产和供应业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '建筑业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '批发和零售业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '交通运输、仓储和邮政业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '住宿和餐饮业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '信息传输、软件和信息技术服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '金融业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '房地产业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '租赁和商务服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '科学研究和技术服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '水利、环境和公共设施管理业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '居民服务、修理和其他服务业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '教育') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '卫生和社会工作') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '文化、体育和娱乐业') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '公共管理、社会保障和社会组织') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        if (read_Hang_Ye[i] == '国际组织') {
            var data_Shu_Liang = read_Shu_Liang[i]
            var data_2018 = read_Shu_Liang_2018[i]
            var data_2019 = read_Shu_Liang_2019[i]
            var data_2020 = read_Shu_Liang_2020[i]
        }
        Data_ShuLiang.push(data_Shu_Liang)
        Data_2018.push(data_2018)
        Data_2019.push(data_2019)
        Data_2020.push(data_2020)
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
            top: "5%",
            left: '5%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
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
                fontSize: '80%',
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
                fontSize: '80%',
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
                name: '2018',
                data: Data_2018
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2019',
                data: Data_2019
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2020',
                data: Data_2020
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
    $('.bar3 h2 a').on('click', function() {
        // console.log($(this).index());
        // 点击a 之后 根据当前a的索引号 找到对应的 yearData 相关对象
        // console.log(yearData[$(this).index()]);
        var obj = yearData[$(this).index()];
        option.series[0].data = obj.data[0];
        option.series[1].data = obj.data[1];
        option.series[2].data = obj.data[2];
        option.series[3].data = obj.data[3];
        // 选中年份高亮
        $('.bar3 h2 a').removeClass('a-active');
        $(this).addClass('a-active');

        // 需要重新渲染
        myChart.setOption(option);
    })
    return;
};

// 柱状图-十四大行业 左4
function bar8() {

    var Data8 = (function() {
        var Data8 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data31.json",
            dataType: "json", //返回数据形式为json
            success: function(result) {
                //后台返回的数据格式如下：
                Data1 = result
            },
            error: function(errorMsg) {
                alert("加载失败！");
            }
        });
        return Data1
    })()

    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar8 .chart"));
    //读取数据
    var read_Hang_Ye = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data1.length; i++) {

        var Hang_Ye = Data1[i].ShiSiHangYe
        var Shu_Liang = Data1[i].ShuLiang
        read_Hang_Ye.push(Hang_Ye)
        read_Shu_Liang.push(Shu_Liang)

    }


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
            bottom: '4%',
            right: '3%',
            containLabel: true
        },
        // legend: {

        //     textStyle: {
        //         color: '#4c9bfd'
        //     },
        //     right: '10%',
        // },

        // x轴相关配置
        xAxis: [{
            //name: "花费时间/年",
            nameLocation: 'middle',
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
            //name: "公司数量/个",
            nameLocation: 'middle',
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
                barWidth: '11%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '行业',
                data: read_Shu_Liang,
                color: function(params) {
                    // build a color map as your need.
                    var colorList = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
                        '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6'
                    ];
                    return colorList[params.dataIndex]
                },
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

// 柱状图-企业成立到认定花费时间 左4
function bar4() {

    var Data8 = (function() {
        var Data8 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "http://119.29.130.157:8000/comcontains/",
            dataType: "json", //返回数据形式为json
            success: function(result) {
                //后台返回的数据格式如下：
                Data8 = result
            },
            error: function(errorMsg) {
                alert("加载失败！");
            }
        });
        return Data8
    })()

    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar4 .chart"));
    // //读取数据
    var max_consumTime = 33;
    var consumTime = Array(max_consumTime).fill(0);;
    var ShuLiang = Array(max_consumTime).fill(0);
    var ShuLiang_2018 = Array(max_consumTime).fill(0);
    var ShuLiang_2019 = Array(max_consumTime).fill(0);
    var ShuLiang_2020 = Array(max_consumTime).fill(0);


    for (var i = 0; i < Data8.length; i++) {
        if (Data8[i].认定时间 == 2020) {
            for (var j = 0; j < max_consumTime; j++) {
                if (Data8[i].花费时间 == j) {
                    ShuLiang_2020[j] = ShuLiang_2020[j] + 1;
                }
            }
        } else
        if (Data8[i].认定时间 == 2019) {
            for (var z = 0; z < max_consumTime; z++) {
                if (Data8[i].花费时间 == z) {
                    ShuLiang_2019[z] = ShuLiang_2019[z] + 1;
                }
            }
        } else
        if (Data8[i].认定时间 == 2018) {
            for (var k = 0; k < max_consumTime; k++) {
                if (Data8[i].花费时间 == k) {
                    ShuLiang_2018[k] = ShuLiang_2018[k] + 1;
                }
            }
        }
    }


    for (var i = 0; i < max_consumTime; i++) {
        consumTime[i] = i;
        ShuLiang[i] = ShuLiang_2018[i] + ShuLiang_2019[i] + ShuLiang_2020[i];
    }


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
            bottom: '4%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },

        // x轴相关配置
        xAxis: [{
            name: "花费时间/年",
            nameLocation: 'middle',
            type: 'category',
            data: consumTime,
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
            name: "公司数量/个",
            nameLocation: 'middle',
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
                data: ShuLiang
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2018年认定',
                data: ShuLiang_2018
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2019年认定',
                data: ShuLiang_2019
            },
            {
                type: 'bar',
                barWidth: '15%',
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,
                },
                name: '2020年认定',
                data: ShuLiang_2020
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

// 柱状图-2018年认定企业成立到认定花费时间 左5
function bar5() {

    var Data8 = (function() {
        var Data8 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "http://119.29.130.157:8000/comcontains/",
            dataType: "json", //返回数据形式为json
            success: function(result) {
                //后台返回的数据格式如下：
                Data8 = result
            },
            error: function(errorMsg) {
                alert("加载失败！");
            }
        });
        return Data8
    })()

    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar5 .chart"));
    // //读取数据
    var max_consumTime = 33;
    var consumTime = Array(max_consumTime).fill(0);;
    var ShuLiang_2018 = Array(max_consumTime).fill(0);

    for (var i = 0; i < Data8.length; i++) {

        if (Data8[i].认定时间 == 2018) {
            for (var k = 0; k < max_consumTime; k++) {
                if (Data8[i].花费时间 == k) {
                    ShuLiang_2018[k] = ShuLiang_2018[k] + 1;
                }
            }
        }
    }

    for (var i = 0; i < max_consumTime; i++) {
        consumTime[i] = i;

    }

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
            bottom: '4%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },

        // x轴相关配置
        xAxis: [{
            name: "花费时间/年",
            nameLocation: 'middle',
            type: 'category',
            data: consumTime,
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
            name: "公司数量/个",
            nameLocation: 'middle',
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
            data: ShuLiang_2018
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



// 柱状图-地理分析图 右1
function bar2() {

    var Data2 = (function() {
            var Data2 = []
            $.ajax({
                type: "get",
                async: false, //同步执行
                url: "/static/js/data24.json",
                dataType: "json", //返回数据形式为json
                success: function(result) {
                    //后台返回的数据格式如下：
                    var compare = function(prop) {
                        return function(obj1, obj2) {
                            var val1 = obj1[prop];
                            var val2 = obj2[prop];
                            if (val1 < val2) {
                                return -1;
                            } else if (val1 > val2) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    }
                    Data2 = result.sort(compare("ShuLiang"))

                },
                error: function(errorMsg) {
                    alert("加载失败！");
                }
            });
            return Data2;
        })()
        // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    // 声明颜色数组
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
    //读取数据
    var Sum = 0
    var Percentage
    var read_Xing_Zheng_Qu_Yu = []
    var read_Shu_Liang = []
    var read_Sum = []
    var read_Percentage = []
    for (var i = Data2.length - 2; i >= 0; i--) {
        var Xing_Zheng_Qu_Yu = Data2[i].XingZhengQuYu
        var Shu_Liang = Data2[i].ShuLiang
        Sum = Sum + Shu_Liang
        read_Xing_Zheng_Qu_Yu.push(Xing_Zheng_Qu_Yu)
        read_Shu_Liang.push(Shu_Liang)
    }
    for (var i = Data2.length - 2; i >= 0; i--) {
        var Shu_Liang = Data2[i].ShuLiang
        Percentage = (Shu_Liang / Sum * 100).toFixed(3) + '%'
        read_Percentage.push(Percentage)
        read_Sum.push(Sum)
    }
    // 2.指定配置项和数据
    var option = {
        grid: {
            top: "10%",
            left: '3%',
            bottom: '0%',
            right: '3%',
            containLabel: true
        },
        xAxis: {
            // 不显示x轴相关信息
            show: false
        },
        yAxis: [{
            //type: 'category',
            // y轴数据反转，与数组的顺序一致
            inverse: true,
            // 不显示y轴线和刻度
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            // 将刻度标签文字设置为白色
            axisLabel: {
                color: "#fff"
            },
            data: read_Xing_Zheng_Qu_Yu,
        }, {
            // y轴数据反转，与数组的顺序一致
            inverse: true,
            show: true,
            // 不显示y轴线和刻度
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            // 将刻度标签文字设置为白色
            axisLabel: {
                color: "#fff"
            },

            data: read_Percentage,
            symbolSize: 8
        }],
        dataZoom: {
            // 区域缩放组件
            show: false,
            startValue: 0,
            endValue: 5000,
        },
        series: [{
                // 第一组柱子（条状）
                name: '条',
                type: 'bar',
                // 柱子之间的距离
                barCategoryGap: 50,
                // 柱子的宽度
                barWidth: 10,
                // 层级 相当于z-index
                yAxisIndex: 0,
                // 柱子更改样式
                itemStyle: {
                    barBorderRadius: 20,
                    // 此时的color可以修改柱子的颜色
                    color: function(params) {
                        // params 传进来的是柱子的对象
                        // dataIndex 是当前柱子的索引号
                        // console.log(params);
                        return myColor[params.dataIndex];
                    }
                },
                data: read_Shu_Liang,
                // 显示柱子内的文字
                // label: {
                //     show: true,
                //     position: "inside",
                //     // {c} 会自动解析为数据（data内的数据）
                //     formatter: "{c}"
                // }
            },
            {
                // 第二组柱子（框状 border）
                name: '框',
                type: 'bar',
                // 柱子之间的距离
                barCategoryGap: 50,
                // 柱子的宽度
                barWidth: 14,
                // 层级 相当于z-index
                yAxisIndex: 1,
                // 柱子修改样式
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 2,
                    barBorderRadius: 15,
                },
                data: read_Sum,
            }
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

// 饼形图-企业规模分析图 右2
function pie1() {
    var Data5 = (function() {
        var Data5 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data3.json",
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
    var read_Qi_Ye_Gui_Mo = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data5.length; i++) {
        var Qi_Ye_Gui_Mo = Data5[i].QiYeGuiMo
        var Shu_Liang = Data5[i].ShuLiang
        read_Qi_Ye_Gui_Mo.push(Qi_Ye_Gui_Mo)
        read_Shu_Liang.push(Shu_Liang)
    }
    // 2.指定配置项和数据
    var option = {
        color: ['#ed8884', '#9fe6b8', '#8085e9', ],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            // 垂直居中,默认水平居中
            // orient:'vertical',
            bottom: 10,
            // left: 10,
            // 小图标的宽度和高度
            itemWidth: 10,
            itemHeight: 10,
            // 修改图例组件的文字为 12px
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: 14
            }
        },
        series: [{
            name: '企业规模',
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
                    name: read_Qi_Ye_Gui_Mo[1],
                },
                {
                    value: read_Shu_Liang[0],
                    name: read_Qi_Ye_Gui_Mo[0],
                },
                {
                    value: read_Shu_Liang[2],
                    name: read_Qi_Ye_Gui_Mo[2],
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

// 饼形图-认定企业数统计 右3
function pie2() {
    var Data6 = (function() {
        var Data6 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data16.json",
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
    //读取数据
    var read_Ren_Ding_Shi_Jian = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data6.length; i++) {
        var Ren_Ding_Shi_Jian = Data6[i].RenDingShiJian
        var Shu_Liang = Data6[i].ShuLiang
        read_Ren_Ding_Shi_Jian.push(Ren_Ding_Shi_Jian)
        read_Shu_Liang.push(Shu_Liang)
    }
    // 2.指定配置项和数据
    var option = {
        color: ['#90ed7d', '#f7a35c', '#f15c80'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: "30%",
            bottom: 10,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "15"
            }
        },
        series: [{
            name: '年份',
            type: 'pie',
            radius: ["20%", "55%"],
            center: ['50%', '50%'],
            // 半径模式  area面积模式
            roseType: 'radius',
            // 图形的文字标签
            label: {
                fontsize: '100%'
            },
            // 引导线调整
            labelLine: {
                // 连接扇形图线长(斜线)
                length: 8,
                // 连接文字线长(横线)
                length2: 10
            },
            data: [{
                    value: read_Shu_Liang[0],
                    name: read_Ren_Ding_Shi_Jian[0],
                },
                {
                    value: read_Shu_Liang[1],
                    name: read_Ren_Ding_Shi_Jian[1],
                },
                {
                    value: read_Shu_Liang[2],
                    name: read_Ren_Ding_Shi_Jian[2],
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

// 饼形图-注册时间 右4
function pie3() {
    var Data4 = (function() {
        var Data4 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "/static/js/data2.json",
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
    var myChart = echarts.init(document.querySelector('.pie3 .chart'));
    //读取数据
    var read_Shi_Jian = []
    var read_Shu_Liang = []
    for (var i = 0; i < Data4.length; i++) {
        var Shi_Jian = Data4[i].ShiJian
        var Shu_Liang = Data4[i].ShuLiang
        read_Shi_Jian.push(Shi_Jian)
        read_Shu_Liang.push(Shu_Liang)
    }
    // 2.指定配置项和数据
    var option = {
        color: function(params) {
            // build a color map as your need.
            var colorList = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1', '#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#D47F00', '#00FFFF', '#D4FF55', '#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#7FBF55',
                '#a5c2d5', '#cbab4f', '#76a871', '#a56f8f', '#c12c44', '#9f7961', '#76a871', '#6f83a5', '0f4fb8', '106dcf', '#b3d74c', '#74aae3', '#5cdec6', '#3526de', '#9d65ee', '#a8b3e3', '#6bc1b7', '549ee2', '#6e98d6'
            ];
            return colorList[params.dataIndex]
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: "5%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: '100%'
            }
        },
        series: [{
            name: '数量',
            type: 'pie',
            radius: ["10%", "35%"],
            center: ['50%', '40%'],
            // 半径模式  area面积模式
            roseType: 'radius',
            // 图形的文字标签
            label: {
                fontsize: '100%'
            },
            // 引导线调整
            labelLine: {
                // 连接扇形图线长(斜线)
                length: 2,
                // 连接文字线长(横线)
                length2: 2
            },
            data: [{
                    value: read_Shu_Liang[0],
                    name: read_Shi_Jian[0],
                },
                {
                    value: read_Shu_Liang[1],
                    name: read_Shi_Jian[1],
                },
                {
                    value: read_Shu_Liang[2],
                    name: read_Shi_Jian[2],
                },
                {
                    value: read_Shu_Liang[3],
                    name: read_Shi_Jian[3],
                },
                {
                    value: read_Shu_Liang[4],
                    name: read_Shi_Jian[4],
                },
                {
                    value: read_Shu_Liang[5],
                    name: read_Shi_Jian[5],
                },
                {
                    value: read_Shu_Liang[6],
                    name: read_Shi_Jian[6],
                },
                {
                    value: read_Shu_Liang[7],
                    name: read_Shi_Jian[7],
                },
                {
                    value: read_Shu_Liang[8],
                    name: read_Shi_Jian[8],
                },
                {
                    value: read_Shu_Liang[9],
                    name: read_Shi_Jian[9],
                },
                {
                    value: read_Shu_Liang[10],
                    name: read_Shi_Jian[10],
                },
                {
                    value: read_Shu_Liang[11],
                    name: read_Shi_Jian[11],
                },
                {
                    value: read_Shu_Liang[12],
                    name: read_Shi_Jian[12],
                },
                {
                    value: read_Shu_Liang[13],
                    name: read_Shi_Jian[13],
                },
                {
                    value: read_Shu_Liang[14],
                    name: read_Shi_Jian[14],
                },
                {
                    value: read_Shu_Liang[15],
                    name: read_Shi_Jian[15],
                },
                {
                    value: read_Shu_Liang[16],
                    name: read_Shi_Jian[16],
                },
                {
                    value: read_Shu_Liang[17],
                    name: read_Shi_Jian[17],
                },
                {
                    value: read_Shu_Liang[18],
                    name: read_Shi_Jian[18],
                },
                {
                    value: read_Shu_Liang[19],
                    name: read_Shi_Jian[19],
                },
                {
                    value: read_Shu_Liang[20],
                    name: read_Shi_Jian[20],
                },
                {
                    value: read_Shu_Liang[21],
                    name: read_Shi_Jian[21],
                },
                {
                    value: read_Shu_Liang[22],
                    name: read_Shi_Jian[22],
                },
                {
                    value: read_Shu_Liang[23],
                    name: read_Shi_Jian[23],
                },
                {
                    value: read_Shu_Liang[24],
                    name: read_Shi_Jian[24],
                },
                {
                    value: read_Shu_Liang[25],
                    name: read_Shi_Jian[25],
                },
                {
                    value: read_Shu_Liang[26],
                    name: read_Shi_Jian[26],
                },
                {
                    value: read_Shu_Liang[27],
                    name: read_Shi_Jian[27],
                },
                {
                    value: read_Shu_Liang[28],
                    name: read_Shi_Jian[28],
                },
                {
                    value: read_Shu_Liang[29],
                    name: read_Shi_Jian[29],
                },
                {
                    value: read_Shu_Liang[30],
                    name: read_Shi_Jian[30],
                },
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

// 柱状图-2019年认定企业成立到认定花费时间 右5
function bar6() {

    var Data8 = (function() {
        var Data8 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "http://119.29.130.157:8000/comcontains/",
            dataType: "json", //返回数据形式为json
            success: function(result) {
                //后台返回的数据格式如下：
                Data8 = result
            },
            error: function(errorMsg) {
                alert("加载失败！");
            }
        });
        return Data8
    })()

    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar6 .chart"));
    // //读取数据
    var max_consumTime = 33;
    var consumTime = Array(max_consumTime).fill(0);;
    var ShuLiang_2019 = Array(max_consumTime).fill(0);


    for (var i = 0; i < Data8.length; i++) {
        if (Data8[i].认定时间 == 2019) {
            for (var k = 0; k < max_consumTime; k++) {
                if (Data8[i].花费时间 == k) {
                    ShuLiang_2019[k] = ShuLiang_2019[k] + 1;
                }
            }
        }
    }


    for (var i = 0; i < max_consumTime; i++) {
        consumTime[i] = i;
    }
    StartValue = 0;
    EndValue = 10;
    var option = {
        color: ['#f7a35c'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        // dataZoom: [{
        //         id: 'dataZoomX',
        //         type: 'inside',
        //         xAxisIndex: [0],
        //         filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
        //         start: 0,
        //         end: 100
        //     },
        //     {
        //         id: 'dataZoomY',
        //         type: 'inside',
        //         yAxisIndex: [0],
        //         filterMode: 'empty',
        //         start: 0,
        //         end: 100
        //     }
        // ],
        dataZoom: {
            // 区域缩放组件
            show: false,
            startValue: StartValue,
            endValue: EndValue,
        },
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
            bottom: '4%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },

        // x轴相关配置
        xAxis: [{
            name: "花费时间/年",
            nameLocation: 'middle',
            type: 'category',
            data: consumTime,
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
            name: "公司数量/个",
            nameLocation: 'middle',
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

                data: ShuLiang_2019
            },

        ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);

    //更新数据
    function updata() {

        var dataOption = {
            dataZoom: {
                // // 区域缩放组件
                // show: false,
                startValue: StartValue,
                endValue: EndValue,


            },
            // x轴相关配置
            xAxis: [{
                data: consumTime,
            }],
            // 系列列表配置
            series: [{
                data: ShuLiang_2019
            }, ]
        };
        myChart.setOption(dataOption);
    }

    //定时器
    setInterval(function() {
        StartValue++
        EndValue++
        if (EndValue > consumTime.length - 1) {
            StartValue = 0
            EndValue = 10
        }
        updata()
    }, 2000)


    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};

// 柱状图-2020年认定企业成立到认定花费时间 6
function bar7() {

    var Data8 = (function() {
        var Data8 = []
        $.ajax({
            type: "get",
            async: false, //同步执行
            url: "http://119.29.130.157:8000/comcontains/",
            dataType: "json", //返回数据形式为json
            success: function(result) {
                //后台返回的数据格式如下：
                Data8 = result
            },
            error: function(errorMsg) {
                alert("加载失败！");
            }
        });
        return Data8
    })()

    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar7 .chart"));
    // //读取数据
    var max_consumTime = 33;
    var consumTime = Array(max_consumTime).fill(0);;
    var ShuLiang_2020 = Array(max_consumTime).fill(0);


    for (var i = 0; i < Data8.length; i++) {
        if (Data8[i].认定时间 == 2020) {
            for (var k = 0; k < max_consumTime; k++) {
                if (Data8[i].花费时间 == k) {
                    ShuLiang_2020[k] = ShuLiang_2020[k] + 1;
                }
            }
        }
    }


    for (var i = 0; i < max_consumTime; i++) {
        consumTime[i] = i;
    }
    StartValue = 0;
    EndValue = 10;
    var option = {
        color: ['#f15c80'],
        // 提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
            }
        },
        // dataZoom: [{
        //         id: 'dataZoomX',
        //         type: 'inside',
        //         xAxisIndex: [0],
        //         filterMode: 'filter', // 设定为 'filter' 从而 X 的窗口变化会影响 Y 的范围。
        //         start: 0,
        //         end: 100
        //     },
        //     {
        //         id: 'dataZoomY',
        //         type: 'inside',
        //         yAxisIndex: [0],
        //         filterMode: 'empty',
        //         start: 0,
        //         end: 100
        //     }
        // ],
        dataZoom: {
            // 区域缩放组件
            show: false,
            startValue: StartValue,
            endValue: EndValue,
        },
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
            bottom: '4%',
            right: '3%',
            containLabel: true
        },
        legend: {
            textStyle: {
                color: '#4c9bfd'
            },
            right: '10%',
        },

        // x轴相关配置
        xAxis: [{
            name: "花费时间/年",
            nameLocation: 'middle',
            type: 'category',
            data: consumTime,
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
            name: "公司数量/个",
            nameLocation: 'middle',
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

                data: ShuLiang_2020
            },

        ]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);

    //更新数据
    function updata() {

        var dataOption = {
            dataZoom: {
                // // 区域缩放组件
                // show: false,
                startValue: StartValue,
                endValue: EndValue,


            },
            // x轴相关配置
            xAxis: [{
                data: consumTime,
            }],
            // 系列列表配置
            series: [{
                data: ShuLiang_2020
            }, ]
        };
        myChart.setOption(dataOption);
    }

    //定时器
    setInterval(function() {
        StartValue++
        EndValue++
        if (EndValue > consumTime.length - 1) {
            StartValue = 0
            EndValue = 10
        }
        updata()
    }, 2000)


    // 4.让图表随屏幕自适应
    window.addEventListener('resize', function() {
        myChart.resize();
    })
    return;
};