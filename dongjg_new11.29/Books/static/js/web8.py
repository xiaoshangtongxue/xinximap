# -*-coding = utf-8 -*-
# @time 2021/3/24 22:12
# @Author: 付延松
# @File: web5.py
# @Software: PyCharm

import  pymysql as mysql
import pandas as pd
import json

#创建数据库连接对象。
db=mysql.connect(
    host="119.29.130.157",
    user="xdDu@informap",
    passwd="qxjd=yangbo@=",
    database="django_test",
    port=23619,
    charset='utf8',
    use_unicode=True)

#使用 cursor() 方法创建一个游标对象cursor
cursor = db.cursor()

# SQL语句------------------百分比语句已经删除了

#企业数据查询
#企业行业百分比
sql1="""SELECT sector as "HangYe",count(*) AS "ShuLiang" FROM books_company GROUP BY sector ORDER BY COUNT(*) DESC;"""
#企业时间序列变化图
sql2="""select year(zhuce_time) as "ShiJian",count(*) as "ShuLiang" FROM books_company WHERE categary ='高新技术企业' GROUP BY year(zhuce_time);"""
#企业规模分析图
sql3="""SELECT categary as "QiYeGuiMo",count(*) AS "ShuLiang" FROM books_company GROUP BY categary ORDER BY COUNT(*) DESC;"""
#企业地理分析
sql4='''SELECT "小店区" AS "DiLi" ,count(*) AS "ShuLiang" FROM books_company WHERE address LIKE "%小店区%"
            UNION
            SELECT "综改示范区" AS "DiLi" ,count(*) AS "ShuLiang" FROM books_company WHERE address LIKE "%综改示范区%"
            UNION
            SELECT "高新区" AS "DiLi" ,count(*) AS "ShuLiang" FROM books_company WHERE address LIKE "%高新区%"
            UNION
            SELECT "杏花岭区" AS "DiLi" ,count(*) AS "ShuLiang" FROM books_company WHERE address LIKE "%杏花岭区%"
            UNION
            SELECT "万柏林区" AS "DiLi" ,count(*) AS "ShuLiang" FROM books_company WHERE address LIKE "%万柏林区%"'''

#成果数据查询
#成果的行业分类数据
sql5="""SELECT ach_prisectorsector as "HangYe",count(*) AS "ShuLiang" FROM books_mapachivement GROUP BY ach_prisectorsector ORDER BY COUNT(*) DESC;"""
#成果数量的时间序列变化图
sql6="""select ach_inyear as "ShiJian",count(*) as "ShuLiang" FROM books_mapachivement GROUP BY ach_inyear;"""
#成果的研发状态
sql7="""SELECT ach_evaluform AS "YanFaZhuangTai",count(*) AS "ShuLiang" FROM books_mapachivement GROUP BY ach_evaluform ORDER BY COUNT(*) DESC;"""

#教师数据查询
#职称百分比
sql8="""SELECT zhicheng 'ZhiCheng',COUNT(*) 'ShuLiang'
    FROM books_mapteacher t,teacher_match m
    WHERE t.`teacher_position`=m.`position`
    GROUP BY zhicheng;"""

#院系百分比
sql9="""SELECT teacher_college 'SuoZaiYuanXi',COUNT(*) 'ShuLiang'
    FROM books_mapteacher
    GROUP BY teacher_college;"""

#行业百分比
sql10="""SELECT teacher_prisectorsector 'HangYe',COUNT(*) 'ShuLiang'
    FROM books_mapteacher
    GROUP BY teacher_prisectorsector;"""

#专业结构
sql11="""select p.teacher_college SuoZaiYuanXi,p.zhicheng ZhiCheng,ifnull(q.c,0) ShuLiang
from (
   select * 
   from 
     (select distinct teacher_college
      from books_mapteacher) a
      cross join 
     (select distinct zhicheng from teacher_match)b )p
   left join 
   (
   SELECT teacher_college,zhicheng,COUNT(*) c
   FROM books_mapteacher t, teacher_match m
   WHERE t.`teacher_position`=m.`position`
   GROUP BY teacher_college,zhicheng)q
   
   on p.teacher_college=q.teacher_college and p.zhicheng = q.zhicheng;"""
#-----------------------------------仪器设备
sql12="""#行业分布
SELECT instrument_prisectorsector 'HangYe',COUNT(*) 'ShuLiang' FROM books_mapinstrument GROUP BY instrument_prisectorsector;"""

#-------------------------------------项目数据---------------------------------------
#行业
sql13="""SELECT pro_technology AS'HangYe',COUNT(*) AS'ShuLiang' FROM books_mapprograme GROUP BY pro_technology; """

#1.教师表每个行业有多少职称
sql14="""SELECT x.teacher_prisectorsector AS HangYe,x.teacher_position AS ZhiCheng,IFNULL(y.n,0) AS ShuLiang
        FROM (SELECT *
                  FROM (select DISTINCT teacher_prisectorsector FROM books_mapteacher)a
                             CROSS JOIN
                            (select DISTINCT teacher_position FROM books_mapteacher)b
                 )x
        LEFT JOIN
                 (SELECT teacher_prisectorsector, teacher_position, COUNT(*) AS n
                    FROM books_mapteacher
                    GROUP BY teacher_prisectorsector,teacher_position)y
        ON x.teacher_prisectorsector=y.teacher_prisectorsector AND x.teacher_position=y.teacher_position
        ORDER BY x.teacher_prisectorsector;"""


# 2.成果按照学院分出来，即每个学院有多少成果
sql15="""SELECT ach_colloge AS SuoZaiYuanXi,count(*) as ShuLiang
         FROM books_mapachivement
         WHERE ach_colloge !=""
         GROUP BY ach_colloge;"""

# 3.成果按照时间分出来，即不同的时间点有多少成果--------------这个数据之前就有


# 4.高新技术企业的时间分布，即每个时间点上有多少高新技术企业的认定
sql16="""select company_year as RenDingShiJian,count(*) AS ShuLiang
         FROM books_mapcompany
         WHERE company_item="高新技术企业"
         GROUP BY company_year;"""


sql=[sql1,sql2,sql3,sql4,sql5,sql6,sql7,sql8,sql9,sql10,sql11,sql12,sql13,sql14,sql15,sql16]


for _sql in sql:
    try:
        cursor.execute(_sql)
        results = cursor.fetchall() #获取全部结果集。  fetchone 查询第一条数据
        if not results: #判断是否为空。
            print("数据为空！")
        else:
            df = pd.read_sql(_sql, con=db)  # 从数据库查询结果中读取数据
            dict_str = json.dumps(df.to_dict(orient="records"), sort_keys=True, indent=4, separators=(', ', ': '),
                                  ensure_ascii=False)
            try:
                with open(file="data{}.json".format(sql.index(_sql)+1), mode="w", encoding="utf-8") as json_file:
                    json_file.write(dict_str)
            except Exception as error:
                print(error)

    except Exception as e:
        db.rollback()  #如果出错就会滚数据库并且输出错误信息。
        print("Error:{0}".format(e))

db.close()#关闭数据库。
