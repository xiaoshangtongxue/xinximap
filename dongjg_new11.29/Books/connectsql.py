#!/usr/bin/python3
 
import pymysql
 
# 打开数据库连接
db = pymysql.connect(host="119.29.130.157", user="xdDu@informap", passwd="qxjd=yangbo@=", db="django_test", port=23619)
 
# 使用 cursor() 方法创建一个游标对象 cursor
cursor = db.cursor()

# sql = "CREATE DATABASE IF NOT EXISTS zz2" 
# # 执行创建数据库的sql
# cursor.execute(sql)
 
# 使用 execute()  方法执行 SQL 查询 
cursor.execute("SELECT VERSION()")
 
# 使用 fetchone() 方法获取单条数据.
data = cursor.fetchone()
 
print ("Database version : %s " % data)
 
# 关闭数据库连接
db.close()