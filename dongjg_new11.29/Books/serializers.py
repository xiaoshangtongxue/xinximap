from rest_framework import serializers
from Books.models import BookInfo, LANGUAGE_CHOICES, STYLE_CHOICES, company, MapAchivement, MapCompany, MapInstrument, MapTeacher


class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    book_date = serializers.DateField() #图书日期
    age = serializers.IntegerField() #年龄
    book_detail = serializers.CharField(max_length=255) #书的细节
    bread = serializers.IntegerField(default=0)#阅读量
    bcomment = serializers.IntegerField(default=0)#评论量
    isDelete = serializers.BooleanField(default=False)#逻辑删除
    class Meta:
        # model = BookInfo
        fields = ['id','name','book_date','age','book_detail','bread','bcomment','isDelete']

class CompanySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=255)
    introduction = serializers.CharField(max_length=255)
    sector = serializers.CharField(max_length=255)
    company_categary = serializers.CharField(max_length=255)
    point = serializers.JSONField()
    auth = serializers.CharField(max_length=255)
    zhuce_time = serializers.CharField(max_length=255)
    address = serializers.CharField(max_length=255)
    categary = serializers.CharField(max_length=255)
    year = serializers.CharField(max_length=255)
    
    class Meta:
        # model = BookInfo
        fields = ['id','name','introduction','sector', 'company_categary','point','auth','zhuce_time','address','categary','year','pgps']

class MapCompanySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    company_name = serializers.CharField(max_length=255) #图书名称
    company_introduction = serializers.CharField(max_length=255) #公司介绍
    company_prisector = serializers.CharField(max_length=255) #一级行业
    company_auxsector = serializers.CharField(max_length=255) #二级行业
    company_fourthsector = serializers.CharField(max_length=255) #公司十四个行业
    company_categary = serializers.CharField(max_length=255) # 公司类型
    point = serializers.JSONField() #公司地理位置
    company_auth = serializers.CharField(max_length=255) #公司法人
    company_time = serializers.CharField(max_length=255) #公司注册时间
    company_address = serializers.CharField(max_length=255) #公司地址
    company_item = serializers.CharField(max_length=255) #公司类别
    company_year = serializers.CharField(max_length=255) #批准年
    company_radius = serializers.IntegerField()
    company_remark = serializers.CharField(max_length=255) #公司备注
    class Meta:
        # model = BookInfo
        fields =['id','company_name','company_introduction', 'company_prisector', 'company_auxsector', 'company_fourthsector',
    'company_categary', 'point', 'company_auth', 'company_time', 'company_address', 
    'company_item', 'company_year', 'company_remark', 'company_radius']

class MapTeacherSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    teacher_name = serializers.CharField(max_length=255) #教师名称
    teacher_title = serializers.CharField(max_length=255) #教师名称
    teacher_position = serializers.CharField(max_length=255) #教师职称
    teacher_research = serializers.CharField(max_length=255) #教师研究方向
    teacher_college = serializers.CharField(max_length=255) #所在学院
    point = serializers.JSONField() # 学院地理位置
    teacher_program =  serializers.CharField(max_length=255) #教师科研项目
    teacher_prisectorsector = serializers.CharField(max_length=255) #教师所属一级行业
    teacher_auxsectorsector = serializers.CharField(max_length=255) #教师所属二级行业
    teacher_fourthsector = serializers.CharField(max_length=255) #十四大行业
    teacher_radius = serializers.IntegerField()
    teacher_remark = serializers.CharField(max_length=255) #教师备注
    class Meta:
        # model = BookInfo
        fields =  ['id','teacher_name', 'teacher_title','teacher_position', 'teacher_research', 'teacher_college', 
    'point', 'teacher_program', 'teacher_prisectorsector', 'teacher_auxsectorsector',
    'teacher_fourthsector', 'teacher_remark', 'teacher_radius',]

class MapInstrumentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    instrument_name = serializers.CharField(max_length=255) #仪器名称
    instrument_address = serializers.CharField(max_length=255) #仪器地址
    point = serializers.JSONField()#仪器经纬度
    instrument_category = serializers.CharField(max_length=255) #仪器分类
    instrument_pay = serializers.CharField(max_length=255) # 仪器使用付费说明
    # instrument_sector =  models.CharField(max_length=255,default='',null=True, blank=True) #仪器所属行业
    instrument_prisectorsector = serializers.CharField(max_length=255) #仪器所属一级行业
    instrument_auxsectorsector = serializers.CharField(max_length=255) #仪器所属二级行业
    instrument_fourthsector = serializers.CharField(max_length=255) #十四大行业
    instrument_contact = serializers.CharField(max_length=255) #联系人
    instrument_phone = serializers.CharField(max_length=255) #联系电话
    instrument_reuse = serializers.CharField(max_length=255) #是否可复用
    instrument_radius = serializers.IntegerField()
    instrument_remark = serializers.CharField(max_length=255) #公司备注
    class Meta:
        # model = BookInfo
        fields = ['id','instrument_name', 'instrument_address', 'point', 'instrument_category',
    'instrument_pay', 'instrument_prisectorsector', 'instrument_auxsectorsector', 'instrument_fourthsector', 'instrument_contact',
    'instrument_phone', 'instrument_reuse', 'instrument_remark', 'instrument_radius',]

class MapAchivementSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    ach_name = serializers.CharField(max_length=255) #成果名称
    ach_people = serializers.CharField(max_length=255) # 成果完成人
    ach_unit = serializers.CharField(max_length=255) #成果完成单位
    ach_keywords = serializers.CharField(max_length=255) #成果关键词
    ach_clc = serializers.CharField(max_length=255) #中图分类号
    ach_sc = serializers.CharField(max_length=255) #学科分类号
    ach_introduction = serializers.CharField(max_length=255) #公司介绍
    ach_categary = serializers.CharField(max_length=255) # 成果类别
    ach_inyear = serializers.CharField(max_length=255) #成果入库时间
    ach_researchtime = serializers.CharField(max_length=255) #成果起止时间
    ach_evaluform = serializers.CharField(max_length=255) #成果评价形式
    ach_level = serializers.CharField(max_length=255) #成果水平
    ach_prisectorsector = serializers.CharField(max_length=255) #成果所属一级行业
    ach_auxsectorsector = serializers.CharField(max_length=255) #成果所属二级行业
    ach_fourthsector = serializers.CharField(max_length=255) #十四大行业
    point = serializers.JSONField()#仪器经纬度
    ach_radius = serializers.IntegerField()
    ach_remark = serializers.CharField(max_length=255) #成果备注
    class Meta:
        # model = BookInfo
        fields = ['id','ach_name', 'ach_people', 'ach_unit', 'ach_keywords', 'ach_clc', 'ach_sc', 'ach_introduction',
    'ach_categary', 'ach_inyear', 'ach_researchtime', 'ach_evaluform', 'ach_level', 'ach_prisectorsector',
    'ach_auxsectorsector', 'ach_fourthsector', 'point', 'ach_remark' , 'ach_radius']

class MapProgrameSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    pro_name = serializers.CharField(max_length=255) #成果名称
    pro_people = serializers.CharField(max_length=255) # 成果完成人
    pro_position = serializers.CharField(max_length=255) # 
    pro_unit = serializers.CharField(max_length=255) #成果完成单位
    pro_corcomp = serializers.CharField(max_length=255) #成果关键词
    pro_technology = serializers.CharField(max_length=255) #中图分类号
    pro_introduction = serializers.CharField(max_length=255) #学科分类号
    pro_compeople = serializers.CharField(max_length=255) #学科分类号
    pro_phone = serializers.CharField(max_length=255) #公司介绍
    pro_year = serializers.CharField(max_length=255) #成果入库时间
    pro_prisectorsector = serializers.CharField(max_length=255) #成果所属一级行业
    pro_auxsectorsector = serializers.CharField(max_length=255) #成果所属二级行业
    pro_fourthsector = serializers.CharField(max_length=255) #十四大行业
    point = serializers.JSONField()#仪器经纬度
    pro_remark = serializers.CharField(max_length=255) #成果备注
    class Meta:
        # model = BookInfo
        fields = ['id', 'pro_name', 'pro_people', 'pro_position', 'pro_unit', 'pro_corcomp',
    'pro_technology', 'pro_introduction', 'pro_compeople', 'pro_phone',
    'pro_year', 'pro_prisectorsector', 'pro_auxsectorsector', 'pro_fourthsector',
    'point', 'pro_remark']
