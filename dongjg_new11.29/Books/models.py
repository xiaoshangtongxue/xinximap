from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles
from django.contrib.auth.models import User

LEXERS = [item for item in get_all_lexers() if item[1]]  ## 这里的三个功能不清楚，仅仅是放在这里
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted([(item, item) for item in get_all_styles()])

# Create your models here.
class BookInfo(models.Model):
    name = models.CharField(max_length=20) #图书名称
    book_date = models.DateField() #图书日期
    age = models.IntegerField() #年龄
    book_detail = models.CharField(max_length=255) #书的细节
    bread = models.IntegerField(default=0)#阅读量
    bcomment = models.IntegerField(default=0)#评论量
    isDelete = models.BooleanField(default=False)#逻辑删除
    def __str__(self):
        return self.name

class People(models.Model):
    name = models.CharField(max_length=20)
    age = models.IntegerField()
    book_people = models.ForeignKey(BookInfo,on_delete=models.CASCADE,null=True, blank=True, db_constraint=False)
    isDelete = models.BooleanField(default=False)#逻辑删除
    def __str__(self):
        return self.name

class company(models.Model):
    name = models.CharField(max_length=255) #图书名称
    introduction = models.CharField(max_length=255,default='') #公司介绍
    sector = models.CharField(max_length=255,default='') #行业
    company_categary = models.CharField(max_length=255,default='') # 公司类型
    point = models.JSONField(null=True, blank=True) #公司地理位置
    auth = models.CharField(max_length=255,default='') #公司法人
    zhuce_time = models.CharField(max_length=255,default='') #公司注册时间
    address = models.CharField(max_length=255,default='') #公司地址
    categary = models.CharField(max_length=255,default='') #公司类别
    year = models.CharField(max_length=255, null=True, blank=True) #批准年
    pgps = models.JSONField(null=True, blank=True)
    def __str__(self):
        return self.name

class lovers(models.Model):
    name = models.CharField(max_length=10)
    age = models.IntegerField()
    isDelete = models.BooleanField(default=False)#逻辑删除

class loverswhite(models.Model):
    address = models.CharField(max_length=10)
    year = models.DateField()
    isDelete = models.BooleanField(default=False)#逻辑删除
    book_lwhite = models.ForeignKey(BookInfo,on_delete=models.CASCADE,null=True, blank=True, db_constraint=False)
    def __str__(self):
        return self.address

class MapCompany(models.Model):
    company_name = models.CharField(max_length=255) #图书名称
    company_introduction = models.CharField(max_length=255,default='',null=True, blank=True) #公司介绍
    company_prisector = models.CharField(max_length=255,default='',null=True, blank=True) #一级行业
    company_auxsector = models.CharField(max_length=255,default='',null=True, blank=True) #二级行业
    company_fourthsector = models.CharField(max_length=255,default='',null=True, blank=True) #公司十四个行业
    company_categary = models.CharField(max_length=255,default='',null=True, blank=True) # 公司类型
    point = models.JSONField(null=True, blank=True) #公司地理位置
    company_auth = models.CharField(max_length=255,default='',null=True, blank=True) #公司法人
    company_time = models.CharField(max_length=255,default='',null=True, blank=True) #公司注册时间
    company_address = models.CharField(max_length=255,default='',null=True, blank=True) #公司地址
    company_item = models.CharField(max_length=255,default='',null=True, blank=True) #公司类别
    company_year = models.CharField(max_length=255, null=True, blank=True) #批准年
    company_xzqy = models.CharField(max_length=255, null=True, blank=True) #行政区域
    company_radius = models.IntegerField() #半径
    company_remark = models.CharField(max_length=255, null=True, blank=True) #公司备注
    def __str__(self):
        return self.company_name


class MapTeacher(models.Model):
    # user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    teacher_name = models.CharField(max_length=255) #教师名称
    teacher_title = models.CharField(max_length=255) #教师名称
    teacher_position = models.CharField(max_length=255,default='',null=True, blank=True) #教师职称
    teacher_research = models.CharField(max_length=255,default='',null=True, blank=True) #教师研究方向
    teacher_college = models.CharField(max_length=255,default='',null=True, blank=True) #所在学院
    point = models.JSONField(null=True, blank=True) # 学院地理位置
    teacher_program =  models.CharField(max_length=255,default='',null=True, blank=True) #教师科研项目
    teacher_prisectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #教师所属一级行业
    teacher_auxsectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #教师所属二级行业
    teacher_fourthsector = models.CharField(max_length=255,default='',null=True, blank=True) #十四大行业
    teacher_radius = models.IntegerField() #半径
    teacher_remark = models.CharField(max_length=255,default='',null=True, blank=True) #教师备注
    def __str__(self):
        return self.teacher_name

# class StandardResultSetPagination(LimitOffsetPagination):
#     # 默认每页显示的条数
#     default_limit = 20
#     # url 中传入的显示数据条数的参数
#     limit_query_param = 'limit'
#     # url中传入的数据位置的参数
#     offset_query_param = 'offset'
#     # 最大每页显示条数
#     max_limit = None

class MapInstrument(models.Model):
    instrument_name = models.CharField(max_length=255) #仪器名称
    instrument_address = models.CharField(max_length=255,default='',null=True, blank=True) #仪器地址
    point = models.JSONField(null=True, blank=True)#仪器经纬度
    instrument_category = models.CharField(max_length=255,default='',null=True, blank=True) #仪器分类
    instrument_pay = models.CharField(max_length=255,default='',null=True, blank=True) # 仪器使用付费说明
    # instrument_sector =  models.CharField(max_length=255,default='',null=True, blank=True) #仪器所属行业
    instrument_prisectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #仪器所属一级行业
    instrument_auxsectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #仪器所属二级行业
    instrument_fourthsector = models.CharField(max_length=255,default='',null=True, blank=True) 
    instrument_contact = models.CharField(max_length=255,default='',null=True, blank=True) #联系人
    instrument_phone = models.CharField(max_length=255,default='',null=True, blank=True) #联系电话
    instrument_reuse = models.CharField(max_length=255,default='',null=True, blank=True) #是否可复用
    instrument_radius = models.IntegerField() #半径
    instrument_remark = models.CharField(max_length=255,default='',null=True, blank=True) #公司备注
    def __str__(self):
        return self.instrument_name

class MapAchivement(models.Model):
    ach_name = models.CharField(max_length=255) #成果名称
    ach_people = models.CharField(max_length=255,default='',null=True, blank=True) # 成果完成人
    ach_unit = models.CharField(max_length=255,default='',null=True, blank=True) #成果完成单位
    ach_keywords = models.CharField(max_length=255,default='',null=True, blank=True) #成果关键词
    ach_clc = models.CharField(max_length=255,default='',null=True, blank=True) #中图分类号
    ach_sc = models.CharField(max_length=255,default='',null=True, blank=True) #学科分类号
    ach_introduction = models.CharField(max_length=255,default='',null=True, blank=True) #公司介绍
    ach_categary = models.CharField(max_length=255,default='',null=True, blank=True) # 成果类别
    ach_inyear = models.CharField(max_length=255, null=True, blank=True) #成果入库时间
    ach_researchtime = models.CharField(max_length=255,default='',null=True, blank=True) #成果起止时间
    ach_evaluform = models.CharField(max_length=255,default='',null=True, blank=True) #成果评价形式
    ach_level = models.CharField(max_length=255,default='',null=True, blank=True) #成果水平
    ach_prisectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #成果所属一级行业
    ach_auxsectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #成果所属二级行业
    ach_fourthsector = models.CharField(max_length=255,default='',null=True, blank=True) #十四大行业
    point = models.JSONField(null=True, blank=True)#成果经纬度
    ach_radius = models.IntegerField() #半径
    ach_remark = models.CharField(max_length=255, null=True, blank=True) #成果备注
    def __str__(self):
        return self.ach_name

class MapPrograme(models.Model):
    pro_name = models.CharField(max_length=255) #项目名称
    pro_people = models.CharField(max_length=255,default='',null=True, blank=True) # 项目完成人
    pro_position = models.CharField(max_length=255,default='',null=True, blank=True) # 项目完成人职称
    pro_unit = models.CharField(max_length=255,default='',null=True, blank=True) #项目完成单位
    pro_corcomp = models.CharField(max_length=255,default='',null=True, blank=True) #项目合作公司
    pro_technology = models.CharField(max_length=255,default='',null=True, blank=True) #项目技术领域
    pro_introduction = models.CharField(max_length=255,default='',null=True, blank=True) #项目介绍
    pro_compeople = models.CharField(max_length=255,default='',null=True, blank=True) # 合作公司联系人
    pro_phone = models.CharField(max_length=255, null=True, blank=True) #合作公司联系电话
    pro_year = models.CharField(max_length=255,default='',null=True, blank=True) #合作公司联系人电话
    pro_prisectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #项目所属一级行业
    pro_auxsectorsector = models.CharField(max_length=255,default='',null=True, blank=True) #项目所属二级行业
    pro_fourthsector = models.CharField(max_length=255,default='',null=True, blank=True) #十四大行业
    point = models.JSONField(null=True, blank=True)#项目经纬度
    pro_remark = models.CharField(max_length=255, null=True, blank=True) #项目备注
    def __str__(self):
        return self.pro_name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    first_name = models.CharField(max_length=200, null=True, blank= True)
    last_name = models.CharField(max_length=200, null=True,blank=True)
    phone =  models.CharField(max_length=200, null=True, blank = True)

    def __str__(self):
        return str(self.user)