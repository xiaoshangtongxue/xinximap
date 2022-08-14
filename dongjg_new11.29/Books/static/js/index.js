// 立即执行函数，防止变量污染 (function() {})();

// 柱状图模块1
var ret = (function () {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"));
    // 声明颜色数组
    var ret = []
    $.ajax({
        type: "get",
        async: false, //同步执行
        //url: "http://127.0.0.1:8000/teacher/",
        url: "http://127.0.0.1:8000/company/",
        // url: "http://127.0.0.1:8000/instrument/",
        // url: "http://127.0.0.1:8000/achivement/",
        //url: "http://127.0.0.1:8000/snippets/",
        dataType: "json", //返回数据形式为json
        success: function (result) {
            // console.log("result"+result)
            if (1) {
                //后台返回的数据格式如下：
                ret = result
                var readCompany_categary = []
                //返回的数据
                for (var i = 0; i < ret.length; i++) {
                    var Company_categary = ret[i].company_categary;
                    readCompany_categary.push(Company_categary)
                }
                myChart.hideLoading();
                //分类
                var S_2000 = 0
                var S_2001 = 0
                var S_2002 = 0
                var S_2003 = 0
                var S_2004 = 0
                var S_2005 = 0
                var S_2006 = 0
                var S_2007 = 0
                var S_2008 = 0
                var S_2009 = 0
                var S_2010 = 0
                var S_2011 = 0
                var S_2012 = 0
                var S_2013 = 0
                var S_2014 = 0
                var S_2015 = 0
                var S_2016 = 0
                var S_2017 = 0
                var S_2018 = 0
                var S_2019 = 0
                var S_2020 = 0
                var S_2021 = 0
                var Null = 0
                for (var i = 0; i < readCompany_categary.length; i++) {
                    if (readCompany_categary[i] == '') {
                        Null = Null + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(自然人投资或控股)') {
                        S_2000 = S_2000 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(自然人独资)') {
                        S_2001 = S_2001 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '其他有限责任公司') {
                        S_2002 = S_2002 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司分公司(自然人投资或控股)') {
                        S_2003 = S_2003 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '股份有限公司(非上市、自然人投资或控股)') {
                        S_2004 = S_2004 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司（自然人投资或控股的法人独资）') {
                        S_2005 = S_2005 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '个体工商户') {
                        S_2006 = S_2006 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司（非自然人投资或控股的法人独资）') {
                        S_2007 = S_2007 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(国有独资)') {
                        S_2008 = S_2008 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(外国法人独资)') {
                        S_2009 = S_2009 + 1;
                        continue
                    }

                    if (readCompany_categary[i] == '其他股份有限公司(非上市)') {
                        S_2010 = S_2010 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '全民所有制') {
                        S_2011 = S_2011 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '其他有限责任公司分公司') {
                        S_2012 = S_2012 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(自然人投资或控股的法人独资)') {
                        S_2013 = S_2013 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司') {
                        S_2014 = S_2014 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司分公司(自然人投资或控股的法人独资)') {
                        S_2015 = S_2015 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(中外合资)') {
                        S_2016 = S_2016 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '有限责任公司(国有控股)') {
                        S_2017 = S_2017 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '股份有限公司(非上市、国有控股)') {
                        S_2018 = S_2018 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '股份有限公司(非上市、外商投资企业投资)') {
                        S_2019 = S_2019 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '个人独资企业') {
                        S_2020 = S_2020 + 1;
                        continue
                    }
                    if (readCompany_categary[i] == '普通合伙企业') { S_2021 = S_2021 + 1 }

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
                    dataZoom: [
                        {
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
                            saveAsImage: {},
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
                        right: '10%',
                    },

                    // x轴相关配置
                    xAxis: [{
                        type: 'category',
                        data: ['无信息',
                            '有限责任公司(自然人投资或控股)',
                            '有限责任公司(自然人独资)',
                            '其他有限责任公司',
                            '有限责任公司分公司(自然人投资或控股)',
                            '股份有限公司(非上市、自然人投资或控股)',
                            '有限责任公司（自然人投资或控股的法人独资)',
                            '个体工商户',
                            '有限责任公司（非自然人投资或控股的法人独资)',
                            '有限责任公司(国有独资)',
                            '有限责任公司(外国法人独资)',
                            '其他股份有限公司(非上市)',
                            '全民所有制',
                            '其他有限责任公司分公司',
                            '有限责任公司(自然人投资或控股的法人独资)',
                            '有限责任公司',
                            '有限责任公司分公司(自然人投资或控股的法人独资)',
                            '有限责任公司(中外合资)',
                            '有限责任公司(国有控股)',
                            '股份有限公司(非上市、国有控股)',
                            '股份有限公司(非上市、外商投资企业投资)',
                            '个人独资企业',
                            '普通合伙企业'
                        ],

                        axisTick: {
                            alignWithLabel: true
                        },
                        // 修改刻度标签，相关样式
                        axisLabel: {
                            color: "#4c9bfb", // x轴文本颜色
                            fontSize: 8,
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
                        barWidth: '15%',
                        // ajax传动态数据
                        data: [Null, S_2000, S_2001, S_2002, S_2003, S_2004, S_2005, S_2006, S_2007, S_2008, S_2009, S_2010, S_2011, S_2012, S_2013, S_2014, S_2015, S_2016, S_2017, S_2018, S_2019, S_2020, S_2021],
                        itemStyle: {
                            // 修改柱子圆角
                            barBorderRadius: 5,

                        }
                    },]

                };

                // 3.把配置项给实例对象
                myChart.setOption(option);

                // 4.让图表随屏幕自适应
                window.addEventListener('resize', function () {
                    myChart.resize();
                })
            }
        },
        error: function (errorMsg) {
            alert("加载失败！");
        }
    });
    return ret;

})();

// 柱状图模块2
var ret1 = (function () {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    console.log('ret' + ret)
    // 声明颜色数组
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448"];
    if (1) {
        //后台返回的数据格式如下：
        var readYear = []
        //返回的数据
        for (var i = 0; i < ret.length; i++) {
            var Year = ret[i].year;
            readYear.push(Year)
        }
        myChart.hideLoading();
        //分类
        var Null = 0
        var S_2009 = 0
        var S_2012 = 0
        var S_2015 = 0
        var S_2018 = 0
        var S_2021 = 0
        var Num_Null = 0
        var Num_S_2009 = 0
        var Num_S_2012 = 0
        var Num_S_2015 = 0
        var Num_S_2018 = 0
        var Num_S_2021 = 0

        for (var i = 0; i < readYear.length; i++) {

            if (readYear[i] == '') {
                Null = Null + 1;
                continue
            }
            if (readYear[i] < 2009) {
                S_2009 = S_2009 + 1;
                continue
            }
            if (readYear[i] < 2012) {
                S_2012 = S_2012 + 1;
                continue
            }
            if (readYear[i] < 2015) {
                S_2015 = S_2015 + 1;
                continue
            }
            if (readYear[i] < 2018) {
                S_2018 = S_2018 + 1;
                continue
            }
            if (readYear[i] < 2021) { S_2021 = S_2021 + 1 }
        }
        Num_Null = (100 * Null / readYear.length).toFixed(3) + '%'
        Num_S_2009 = (100 * S_2009 / readYear.length).toFixed(3) + '%'
        Num_S_2012 = (100 * S_2012 / readYear.length).toFixed(3) + '%'
        Num_S_2015 = (100 * S_2015 / readYear.length).toFixed(3) + '%'
        Num_S_2018 = (100 * S_2018 / readYear.length).toFixed(3) + '%'
        Num_S_2021 = (100 * S_2021 / readYear.length).toFixed(3) + '%'

        // 2.指定配置项和数据
        var option = {
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: {},
                }
            },
            grid: {
                top: "15%",
                left: '15%',
                bottom: '0%',
                right: '20%',
                // containLabel: true
            },
            xAxis: {
                // 不显示x轴相关信息
                show: false
            },
            yAxis: [{
                type: 'category',
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
                    color: "#56D0E3",
                },
                data: ["Null", "<2009", "<2012", "<2015", "<2018", "<2021"]
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
                    color: "#56D0E3",
                },

                data: [Num_Null, Num_S_2009, Num_S_2012, Num_S_2015, Num_S_2018, Num_S_2021],
                symbolSize: 8
            }],
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
                    color: function (params) {
                        // params 传进来的是柱子的对象
                        // dataIndex 是当前柱子的索引号
                        // console.log(params);
                        return myColor[params.dataIndex];
                    }
                },
                data: [Null, S_2009, S_2012, S_2015, S_2018, S_2021],
                // 显示柱子内的百分比文字
                label: {
                    show: true,
                    position: "inside",
                    // {c} 会自动解析为数据（data内的数据）
                    formatter: "{c}"
                }
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
                data: [readYear.length, readYear.length, readYear.length, readYear.length, readYear.length, readYear.length],
            }
            ]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);

        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }
    return;
})(ret);

// 折线图模块1
var ret2 = (function () {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    if (1) {
        //后台返回的数据格式如下：
        var readZhuce_time_2019 = []
        var readZhuce_time_2020 = []
        var readZhuce_time_2021 = []

        for (var i = 0; i < ret.length; i++) {
            var Zhuce_time_year = ret[i].zhuce_time.slice(0, 4);
            if (Zhuce_time_year == 2019) {
                var Zhuce_time_2019 = ret[i].zhuce_time
                readZhuce_time_2019.push("{'" + Zhuce_time_2019 + "'}")
                continue
            }
            if (Zhuce_time_year == 2020) {
                var Zhuce_time_2020 = ret[i].zhuce_time
                readZhuce_time_2020.push("{'" + Zhuce_time_2020 + "'}")
                continue
            }
            if (Zhuce_time_year == 2021) {
                var Zhuce_time_2021 = ret[i].zhuce_time
                readZhuce_time_2021.push("{'" + Zhuce_time_2021 + "'}")
            }
        }
        myChart.hideLoading();
        var Zhuce_time_2019_month = []
        var readZhuce_time_2019_month = []
        var Zhuce_time_2020_month = []
        var readZhuce_time_2020_month = []
        var Zhuce_time_2021_month = []
        var readZhuce_time_2021_month = []


        if (readZhuce_time_2019.length > 0) {
            for (var i = 0; i < readZhuce_time_2019.length; i++) {
                if (readZhuce_time_2019[i].slice(8, 9) == 0 || readZhuce_time_2019[i].slice(8, 9) == 1 || readZhuce_time_2019[i].slice(8, 9) == 2) {
                    Zhuce_time_2019_month = readZhuce_time_2019[i].slice(7, 9);
                    readZhuce_time_2019_month.push(Zhuce_time_2019_month)
                    continue
                }
                if (1) {
                    Zhuce_time_2019_month = readZhuce_time_2019[i].slice(7, 8);
                    readZhuce_time_2019_month.push(Zhuce_time_2019_month)
                }
            }
            //分类
            var S_01 = 0
            var S_02 = 0
            var S_03 = 0
            var S_04 = 0
            var S_05 = 0
            var S_06 = 0
            var S_07 = 0
            var S_08 = 0
            var S_09 = 0
            var S_10 = 0
            var S_11 = 0
            var S_12 = 0

            for (var i = 0; i < readZhuce_time_2019_month.length; i++) {

                if (readZhuce_time_2019_month[i] == 1) {
                    S_01 = S_01 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 2) {
                    S_02 = S_02 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 3) {
                    S_03 = S_03 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 4) {
                    S_04 = S_04 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 5) {
                    S_05 = S_05 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 6) {
                    S_06 = S_06 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 7) {
                    S_07 = S_07 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 8) {
                    S_08 = S_08 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 9) {
                    S_09 = S_09 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 10) {
                    S_10 = S_10 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 11) {
                    S_11 = S_11 + 1;
                    continue
                }
                if (readZhuce_time_2019_month[i] == 12) {
                    S_12 = S_12 + 1;
                    continue
                }
            }
        }
        if (readZhuce_time_2020.length > 0) {
            for (var i = 0; i < readZhuce_time_2020.length; i++) {
                if (readZhuce_time_2020[i].slice(8, 9) == 0 || readZhuce_time_2020[i].slice(8, 9) == 1 || readZhuce_time_2020[i].slice(8, 9) == 2) {
                    Zhuce_time_2020_month = readZhuce_time_2020[i].slice(7, 9);
                    readZhuce_time_2020_month.push(Zhuce_time_2020_month)
                    continue
                }
                if (1) {
                    Zhuce_time_2020_month = readZhuce_time_2020[i].slice(7, 8);
                    readZhuce_time_2020_month.push(Zhuce_time_2020_month)
                }
            }
            //分类
            var L_01 = 0
            var L_02 = 0
            var L_03 = 0
            var L_04 = 0
            var L_05 = 0
            var L_06 = 0
            var L_07 = 0
            var L_08 = 0
            var L_09 = 0
            var L_10 = 0
            var L_11 = 0
            var L_12 = 0

            for (var i = 0; i < readZhuce_time_2020_month.length; i++) {

                if (readZhuce_time_2020_month[i] == 1) {
                    L_01 = L_01 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 2) {
                    L_02 = L_02 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 3) {
                    L_03 = L_03 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 4) {
                    L_04 = L_04 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 5) {
                    L_05 = L_05 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 6) {
                    L_06 = L_06 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 7) {
                    L_07 = L_07 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 8) {
                    L_08 = L_08 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 9) {
                    L_09 = L_09 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 10) {
                    L_10 = L_10 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 11) {
                    L_11 = L_11 + 1;
                    continue
                }
                if (readZhuce_time_2020_month[i] == 12) {
                    L_12 = L_12 + 1;
                    continue
                }
            }

        }
        if (readZhuce_time_2021.length > -1) {
            for (var i = 0; i < readZhuce_time_2021.length; i++) {
                if (readZhuce_time_2021[i].slice(8, 9) == 0 || readZhuce_time_2021[i].slice(8, 9) == 1 || readZhuce_time_2021[i].slice(8, 9) == 2) {
                    Zhuce_time_2021_month = readZhuce_time_2021[i].slice(7, 9);
                    readZhuce_time_2021_month.push(Zhuce_time_2021_month)
                    continue
                }
                if (1) {
                    Zhuce_time_2021_month = readZhuce_time_2021[i].slice(7, 8);
                    readZhuce_time_2021_month.push(Zhuce_time_2021_month)
                }

            }
            //分类
            var M_01 = 0
            var M_02 = 0
            var M_03 = 0
            var M_04 = 0
            var M_05 = 0
            var M_06 = 0
            var M_07 = 0
            var M_08 = 0
            var M_09 = 0
            var M_10 = 0
            var M_11 = 0
            var M_12 = 0

            for (var i = 0; i < readZhuce_time_2021_month.length; i++) {

                if (readZhuce_time_2021_month[i] == 1) {
                    M_01 = M_01 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 2) {
                    M_02 = M_02 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 3) {
                    M_03 = M_03 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 4) {
                    M_04 = M_04 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 5) {
                    M_05 = M_05 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 6) {
                    M_06 = M_06 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 7) {
                    M_07 = M_07 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 8) {
                    M_08 = M_08 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 9) {
                    M_09 = M_09 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 10) {
                    M_10 = M_10 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 11) {
                    M_11 = M_11 + 1;
                    continue
                }
                if (readZhuce_time_2021_month[i] == 12) {
                    M_12 = M_12 + 1;
                    continue
                }
            }
        }
        myChart.hideLoading();

        var option = {
            // 修改三条线的颜色
            color: ['#00f2f1'], //, '#ed3f35', '#98B448'
            tooltip: {
                trigger: 'axis'
            },
            dataZoom: [
                {
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
                    filterMode: 'none',
                    start: 0,
                    end: 100
                }

            ],
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: {},
                }
            },
            // 图例组件
            legend: {
                // 当serise 有name值时， legend 不需要写data
                // 修改图例组件文字颜色
                textStyle: {
                    color: '#4c9bfd'
                },
                right: '10%',
            },
            grid: {
                top: "10%",
                left: '4%',
                right: '3%',
                bottom: '3%',
                containLabel: true,
                show: true, // 显示边框
                borderColor: '#012f4a' // 边框颜色
            },
            xAxis: {
                type: 'category',
                boundaryGap: false, // 去除轴间距
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                // 去除刻度线
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfb" // x轴文本颜色
                },
                axisLine: {
                    lineStyle: {
                        color: "#4c9bfb",
                        width: 2
                    }
                },
            },
            yAxis: {
                type: 'value',
                // 去除刻度线
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#4c9bfb" // x轴文本颜色
                },
                axisLine: {
                    lineStyle: {
                        color: "#4c9bfb",
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "#012f4a"
                    }
                }
            },
            series: [{
                type: 'line',
                smooth: true, // 圆滑的线
                name: '2019年',
                data: [S_01, S_02, S_03, S_04, S_05, S_06, S_07, S_08, S_09, S_10, S_11, S_12]
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '2020年',
                data: [L_01, L_02, L_03, L_04, L_05, L_06, L_07, L_08, L_09, L_10, L_11, L_12]
            },
            {
                type: 'line',
                smooth: true, // 圆滑的线
                name: '2021年',
                data: [M_01, M_02, M_03, M_04, M_05, M_06, M_07, M_08, M_09, M_10, M_11, M_12]
            },
            ]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);

        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
        // 5.点击切换2020 和 2021 的数据
        $('.line h2 a').on('click', function () {
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
    }

    return;
})(ret);

// 柱状图3
var ret3 = (function () {
    var myChart = echarts.init(document.querySelector('.bar3 .chart'));

    if (1) {
        //后台返回的数据格式如下：
        //var ret = result
        var readSector = []
        //返回的数据
        for (var i = 0; i < ret.length; i++) {
            var Sector = ret[i].sector;
            readSector.push(Sector)
        }
        myChart.hideLoading();
        //分类
        var S_2000 = 0
        var S_2001 = 0
        var S_2002 = 0
        var S_2003 = 0
        var S_2004 = 0
        var S_2005 = 0
        var S_2006 = 0
        var S_2007 = 0
        var S_2008 = 0
        var S_2009 = 0
        var S_2010 = 0
        var S_2011 = 0
        var S_2012 = 0
        var S_2013 = 0
        var S_2014 = 0
        var S_2015 = 0
        var S_2016 = 0
        var S_2017 = 0
        var S_2018 = 0
        var S_2019 = 0
        var Null = 0
        for (var i = 0; i < readSector.length; i++) {
            if (readSector[i] == '') {
                Null = Null + 1;
                continue
            }
            if (readSector[i] == '农、林、牧、渔业') {
                S_2000 = S_2000 + 1;
                continue
            }
            if (readSector[i] == '采矿业') {
                S_2001 = S_2001 + 1;
                continue
            }
            if (readSector[i] == '制造业') {
                S_2002 = S_2002 + 1;
                continue
            }
            if (readSector[i] == '电力、热力、燃气及水生产和供应业') {
                S_2003 = S_2003 + 1;
                continue
            }
            if (readSector[i] == '建筑业') {
                S_2004 = S_2004 + 1;
                continue
            }
            if (readSector[i] == '批发和零售业') {
                S_2005 = S_2005 + 1;
                continue
            }
            if (readSector[i] == '交通运输、仓储和邮政业') {
                S_2006 = S_2006 + 1;
                continue
            }
            if (readSector[i] == '住宿和餐饮业') {
                S_2007 = S_2007 + 1;
                continue
            }
            if (readSector[i] == '信息传输、软件和信息技术服务业') {
                S_2008 = S_2008 + 1;
                continue
            }
            if (readSector[i] == '金融业') {
                S_2009 = S_2009 + 1;
                continue
            }

            if (readSector[i] == '房地产业') {
                S_2010 = S_2010 + 1;
                continue
            }
            if (readSector[i] == '租赁和商务服务业') {
                S_2011 = S_2011 + 1;
                continue
            }
            if (readSector[i] == '科学研究和技术服务业') {
                S_2012 = S_2012 + 1;
                continue
            }
            if (readSector[i] == '水利、环境和公共设施管理业') {
                S_2013 = S_2013 + 1;
                continue
            }
            if (readSector[i] == '居民服务、修理和其他服务业') {
                S_2014 = S_2014 + 1;
                continue
            }
            if (readSector[i] == '教育') {
                S_2015 = S_2015 + 1;
                continue
            }
            if (readSector[i] == '卫生和社会工作') {
                S_2016 = S_2016 + 1;
                continue
            }
            if (readSector[i] == '文化、体育和娱乐业') {
                S_2017 = S_2017 + 1;
                continue
            }
            if (readSector[i] == '公共管理、社会保障和社会组织') {
                S_2018 = S_2018 + 1;
                continue
            }
            if (readSector[i] == '国际组织') {
                S_2019 = S_2019 + 1
            }
        }
        var option = {
            color: ['#00f2f1'],
            // 提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line'|'shadow'
                }
            },
            dataZoom: [
                {
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
                    saveAsImage: {},
                    dataView: {},
                    restore: {},
                    magicType: {
                        typy: ['bar', 'line']
                    }
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
                data: [],
                textStyle: {
                    color: '#4c9bfd'
                },
                right: '10%',
            },

            // x轴相关配置
            xAxis: [{
                type: 'category',
                data: ['无信息',
                    '农、林、牧、渔业',
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
                    rotate: 18,
                },
                // x轴样式不显示
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
                barWidth: '15%',
                // ajax传动态数据
                data: [Null, S_2000, S_2001, S_2002, S_2003, S_2004, S_2005, S_2006, S_2007, S_2008, S_2009, S_2010, S_2011, S_2012, S_2013, S_2014, S_2015, S_2016, S_2017, S_2018, S_2019],
                itemStyle: {
                    // 修改柱子圆角
                    barBorderRadius: 5,

                }
            },]

        };
        // 3.把配置项给实例对象
        myChart.setOption(option);
        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }
    return;
})();

// 饼形图1
var ret4 = (function () {
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    if (1) {
        //后台返回的数据格式如下：
        //var result =  [ ];
        var readZhuce_time = []
        for (var i = 0; i < ret.length; i++) {
            var Zhuce_time = ret[i].zhuce_time.slice(0, 4);
            readZhuce_time.push(Zhuce_time)
        }

        myChart.hideLoading();
        //分类
        var Null = 0
        var S_2009 = 0
        var S_2012 = 0
        var S_2015 = 0
        var S_2018 = 0
        var S_2021 = 0

        for (var i = 0; i < readZhuce_time.length; i++) {
            if (readZhuce_time[i] == '') {
                Null = Null + 1;
                continue
            }
            if (readZhuce_time[i] < 2009) {
                S_2009 = S_2009 + 1;
                continue
            }
            if (readZhuce_time[i] < 2012) {
                S_2012 = S_2012 + 1;
                continue
            }
            if (readZhuce_time[i] < 2015) {
                S_2015 = S_2015 + 1;
                continue
            }
            if (readZhuce_time[i] < 2018) {
                S_2018 = S_2018 + 1;
                continue
            }
            if (readZhuce_time[i] < 2021) { S_2021 = S_2021 + 1 }
        }
        var option = {
            color: ['#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8'],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: {},
                }
            },
            legend: {
                // 垂直居中,默认水平居中
                // orient:'vertical',
                bottom: 0,
                left: 10,
                // 小图标的宽度和高度
                itemWidth: 10,
                itemHeight: 10,
                // 修改图例组件的文字为 12px
                textStyle: {
                    color: "#56D0E3",
                    fontSize: "9"
                }
            },
            series: [{
                name: '企业注册时间',
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
                    value: S_2009,
                    name: '<2009'
                },
                {
                    value: S_2012,
                    name: '<2012'
                },
                {
                    value: S_2015,
                    name: '<2015'
                },
                {
                    value: S_2018,
                    name: '<2018'
                },
                {
                    value: S_2021,
                    name: '<2021'
                },
                ]
            }]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);
        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }

})(ret);

// 饼形图2
var ret5 = (function () {
    var myChart = echarts.init(document.querySelector('.pie2 .chart'));

    if (1) {
        //后台返回的数据格式如下：
        //var result =  [ ];
        //var ret = result
        var readCategary = []
        for (var i = 0; i < ret.length; i++) {
            var Categary = ret[i].categary;
            readCategary.push(Categary)

        }
        myChart.hideLoading();
        //分类
        var TSME = 0
        var NHTE = 0
        var Null = 0
        for (var i = 0; i < readCategary.length; i++) {

            if (readCategary[i] == '科技型中小企业') { TSME = TSME + 1 }
            if (readCategary[i] == '高新技术企业') { NHTE = NHTE + 1 }
            if (readCategary[i] == '') { Null = Null + 1 }
        }
        var option = {
            color: ["#1089E7", "#F57474", "#56D0E3"],
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    dataView: {},
                }
            },
            legend: {
                bottom: 0,
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    color: "#56D0E3",
                    fontSize: 6
                }
            },
            series: [{
                name: '企业规模',
                type: 'pie',
                radius: ["20%", "50%"],
                center: ['50%', '40%'],
                // 半径模式  area面积模式
                roseType: 'radius',
                // 图形的文字标签
                label: {
                    fontsize: 9
                },
                // 引导线调整
                labelLine: {
                    // 连接扇形图线长(斜线)
                    length: 6,
                    // 连接文字线长(横线)
                    length2: 8
                },
                data: [{
                    value: Null,
                    name: "无信息"
                },
                {
                    value: NHTE,
                    name: "高新技术企业"
                },
                {
                    value: TSME,
                    name: "科技型中小企业"
                },
                ]
            }]
        };
        // 3.把配置项给实例对象
        myChart.setOption(option);
        // 4.让图表随屏幕自适应
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }
    return;
})(ret);