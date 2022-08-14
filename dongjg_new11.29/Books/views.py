# -*-coding:utf-8 -*-
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader, RequestContext
from Books.models import *
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt # 这里的csrf和api_view 有什么区别呢？这个问题不了解
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from Books.serializers import *
import datetime
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, DjangoModelPermissions
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination
from django_filters import rest_framework as rffilters
from django.db import connection
from Books.filters import *
import pandas as pd
from .forms import *
from django.forms import inlineformset_factory
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import Group
# from .filters import OrderFilter
from .decorators import unauthenticated_user, allowed_users, admin_only


def my_custom_sql(request):
    # with connection.cursor() as cursor:
    cursor=connection.cursor()
    cursor.execute("SELECT teacher_college '所在院系',COUNT(*) '人数' FROM books_mapteacher GROUP BY teacher_college")
    row = cursor.fetchall()
    teacherview = MapTeacher.objects.all()
    ordersteacher = teacherview.order_set.all()
    ordersteacher_count = ordersteacher.count()
    teacherFilter = TeacherFilter()
    context = {'TeacherView':teacherview, 'OrdersTeacher':ordersteacher,
    'TeacherCount':ordersteacher_count, 'row':row}
    # for pijn in row:
    #     print(pijn)
    return render(request, "Books/books.html", {"row":row})

# def index(request):
#     sql = "Select count(*) from data" #标准sql语句，此处为测试返回数据库data表的数据条目n，之后可以用python处理字符串的方式动态扩展
#     df = pd.read_sql_query(sql, ENGINE) #将sql语句结果读取至Pandas Dataframe
#     return HttpResponse(df.to_html()) #渲染，

def my_custom_sql2(request, searchname):
    # with connection.cursor() as cursor:
    cursor=connection.cursor()
    #创建数据库连接对象。
    # name=input("一个传回来的某个名称，比如：‘陈晋胜’ :")
    sql_0 = "CALL GL(%s)"
    args=searchname
    sql_1 = """ CALL SC; """
    cursor.execute(sql_1) #先执行下删除
    cursor.execute(sql_0,args) #执行创建相关表的结果

    sql1 = """SELECT * FROM info_1;"""
    sql2 = """SELECT * FROM info_2;"""

    sql = [sql1,sql2]

    for _sql in sql:
        cursor.execute(_sql)
        results = cursor.fetchall()  # 获取全部结果集。  fetchone 查询第一条数据
        if not results:  # 判断是否为空。
            print("数据为空！")
        else:
            # df = pd.read_sql(sql[i], con=connection)  # 从数据库查询结果中读取数据
            # for test in df:
            #      print('test',   test)
            # ht[i] = json.dumps(df.to_dict(orient='records'),sort_keys=True,indent=8,separators=(',',':'),ensure_ascii=False)
            return HttpResponse (json.dumps(pd.read_sql(sql1, con=connection).to_dict(orient='records')+pd.read_sql(sql2, con=connection).to_dict(orient='records'),sort_keys=True,indent=8,separators=(',',':'),ensure_ascii=False), content_type="application/json")
    cursor.execute(sql_1)

def sqlcom(request):
    cursor=connection.cursor()
    sql = """select company_name 公司名称,company_year 认定时间,year(company_time) 成立时间, (company_year-year(company_time)) 花费时间
from books_mapcompany WHERE company_item ="高新技术企业";"""
    cursor.execute(sql)
    results = cursor.fetchall()  # 获取全部结果集。  fetchone 查询第一条数据
    if not results:  # 判断是否为空。
        print("数据为空！")
    else:
        return HttpResponse (json.dumps(pd.read_sql(sql, con=connection).to_dict(orient='records'),sort_keys=True,indent=8,separators=(',',':'),ensure_ascii=False), content_type="application/json")



def accountSettings(request):
    # user = request.user
    form = TeacherForm() #instance=user
    if request.method == 'POST':
        form = TeacherForm(request.POST, request.FILES) # request.FILES, instance = customer
        if form.is_valid():
            form.save()

    context = {'form':form}
    return render(request, 'Books/teacher_settings.html',context)


# Create your views here.
# 视图函数定义在这里
def index(request):
# 1. 加载模板文件，生成一个模板对象
    temp = loader.get_template('Books/index.html')
# 2. 给模板传数据
    # context = {'name': 'kuls'}
    context = {'name': 'kuls', 'datas':list(range(1,20))}
# 3. 模板渲染，生成html文件
    html = temp.render(context)
# 4. 返回给浏览器
    return HttpResponse(html)



def render(request,templates_lj, context_dict={}):
# 1. 加载模板文件，生成一个模板对象
    temp = loader.get_template(templates_lj)
# 2. 给模板传数据
    # context = {'name': 'kuls'}
    context = context_dict
# 3. 模板渲染，生成html文件
    html = temp.render(context)
# 4. 返回给浏览器
    return HttpResponse(html)


def show_books(request):
    # book = BookInfo.objects.filter(age__gte = 4)
    book = MapPrograme.objects.raw("SELECT pro_technology AS '行业', COUNT(*) AS '数量' FROM books_mapprograme GROUP BY pro_technology")
    return render(request, "Books/books.html", {"books":book})
# @login_required(login_url='login')

def Maptea(request):
    return render(request, "Books/teacher.html")

# @login_required(login_url='login')
def Mapcom(request):
    return render(request, "Books/company.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Mapach(request):
    return render(request, "Books/achievement.html")

# @login_required(login_url='login')
def entrance(request):
    return render(request, "Books/entrance.html")

def entrancemap(request):
    return render(request, "Books/entrancemap.html")

def entrancedata(request):
    return render(request, "Books/entrancedata.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Mapins(request):
    return render(request, "Books/instrument.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Mapsni(request):
    return render(request, "Books/snippets.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Dtachevement(request):
    return render(request, "Books/demo-achievement.html")

# @login_required(login_url='login')
def Dtcompany(request):
    return render(request, "Books/demo-company.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Dtinstrument(request):
    return render(request, "Books/demo-instrument.html")

# @login_required(login_url='login')
# @allowed_users(allowed_roles=['admin'])
def Dtprojection(request):
    return render(request, "Books/demo-projection.html")

# @login_required(login_url='login')
def Dttalent(request):
    return render(request, "Books/demo-talent.html")

# @login_required(login_url='login')
def Dtheat(request):
    return render(request, "Books/heatmap.html")


def Dtrelation(request):
    return render(request, "Books/relative-map.html")


def detail_info(request,cid):
    #1 根据id来查找书籍信息
    book = BookInfo.objects.get(id=cid)
    #2 根据书籍信息找到人物信息
    people = book.people_set.all()
    #2 把数据返回Html文件
    return render(request, "Books/details.html", {'book':book, 'people':people})



@api_view(['GET'])
def getlist(request, format=None):
    if request.method == 'GET':
        # meizis = BookInfo.objects.values('mid','title').distinct()
        Book = company.objects.all()
        # serializer = SnippetSerializer(Book, many=True)
        serializer = CompanySerializer(Book, many=True)
        return HttpResponse("{" + "\"type\"" + ":" + "\"FeatureCollection\""  + "," +"\"features\""+":"+json.dumps(serializer.data,ensure_ascii=False)+ "}", content_type="application/json")
        #return JsonResponse(serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CompanySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return HttpResponse("{" + "\"type\"" + ":" + "\"FeatureCollection\""  + "," +"\"features\""+":"+json.dumps(serializer.data,ensure_ascii=False)+ "}", content_type="application/json")
            #return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def getlispic(request, pk):
    try:
        snippet = company.objects.filter(sector=pk)
        # snippet = BookInfo.objects.all()
    except company.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = CompanySerializer(snippet, many=True)
        return HttpResponse("{" + "\"type\"" + ":" + "\"FeatureCollection\""  + "," +"\"features\""+":"+json.dumps(serializer.data,ensure_ascii=False)+ "}", content_type="application/json")
        # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
        #return HttpResponse(json.dumps(serializer.data,ensure_ascii=False),  content_type="application/json")


# @api_view(['GET'])
# def getlist_teacher(request, format=None):
#     if request.method == 'GET':
#         Teacher = MapTeacher.objects.all()
#         Tea_serializer = MapTeacherSerializer(Teacher, many=True)
#         return JsonResponse(Tea_serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         Tea_serializer = MapTeacherSerializer(data=data)
#         if Tea_serializer.is_valid():
#             Tea_serializer.save()
#             return JsonResponse(Tea_serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
#         return JsonResponse(Tea_serializer.errors, status=400)

# @api_view(['GET', 'POST'])
# def getlispic_teacher(request, pk):
#     try:
#         Tea_snippet = MapTeacher.objects.filter(teacher_prisectorsector=pk)
#         # snippet = BookInfo.objects.all()
#     except MapTeacher.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         Tea_serializer = MapTeacherSerializer(Tea_snippet, many=True)
#         # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
#         return HttpResponse(json.dumps(Tea_serializer.data,ensure_ascii=False),  content_type="application/json")

# @api_view(['GET'])
# def getlist_instrument(request, format=None):
#     if request.method == 'GET':
#         Instrument = MapInstrument.objects.all()
#         Ins_serializer = MapInstrumentSerializer(Instrument, many=True)
#         return JsonResponse(Ins_serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         Ins_serializer = MapInstrumentSerializer(data=data)
#         if Ins_serializer.is_valid():
#             Ins_serializer.save()
#             return JsonResponse(Ins_serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
#         return JsonResponse(Ins_serializer.errors, status=400)

# @api_view(['GET', 'POST'])
# def getlispic_instrument(request, pk):
#     try:
#         Ins_snippet = MapInstrument.objects.filter(instrument_prisectorsector=pk)
#         # snippet = BookInfo.objects.all()
#     except MapInstrument.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         Ins_serializer = MapInstrumentSerializer(Ins_snippet, many=True)
#         # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
#         return HttpResponse(json.dumps(Ins_serializer.data,ensure_ascii=False),  content_type="application/json")

# @api_view(['GET'])
# def getlist_achivement(request, format=None):
#     if request.method == 'GET':
#         Achivement = MapAchivement.objects.all()
#         Ach_serializer =  MapAchivementSerializer(Achivement, many=True)
#         return JsonResponse(Ach_serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         Ach_serializer = MapAchivementSerializer(data=data)
#         if Ach_serializer.is_valid():
#             Ach_serializer.save()
#             return JsonResponse(Ach_serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
#         return JsonResponse(Ach_serializer.errors, status=400)

# @api_view(['GET', 'POST'])
# def getlispic_achivement(request, pk):
#     try:
#         Ach_snippet = MapAchivement.objects.filter(ach_prisectorsector=pk)
#         # snippet = BookInfo.objects.all()
#     except MapAchivement.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         Ach_serializer = MapAchivementSerializer(Ach_snippet, many=True)
#         # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
#         return HttpResponse(json.dumps(Ach_serializer.data,ensure_ascii=False),  content_type="application/json")

# @api_view(['GET'])
# def getlist_company(request, format=None):
#     if request.method == 'GET':
#         Compa = MapCompany.objects.all()
#         Compa_serializer = MapCompanySerializer(Compa, many=True)
#         return JsonResponse(Compa_serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         Compa_serializer = MapCompanySerializer(data=data)
#         if Compa_serializer.is_valid():
#             Compa_serializer.save()
#             return JsonResponse(Compa_serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
#         return JsonResponse(Compa_serializer.errors, status=400)

# @api_view(['GET', 'POST'])
# def getlispic_compamy(request, pk):
#     try:
#         Compa_snippet = MapCompany.objects.filter(company_prisectorsector=pk)
#         # snippet = BookInfo.objects.all()
#     except MapCompany.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         Compa_serializer = MapCompanySerializer(Compa_snippet, many=True)
#         # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
#         return HttpResponse(json.dumps(Compa_serializer.data,ensure_ascii=False),  content_type="application/json")

# @api_view(['GET'])
# def getlist_programe(request, format=None):
#     if request.method == 'GET':
#         Pro = MapPrograme.objects.all()
#         Pro_serializer = MapProgrameSerializer(Pro, many=True)
#         return JsonResponse(Pro_serializer.data,  json_dumps_params={'ensure_ascii': False}, safe = False)   
#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         Pro_serializer = MapProgrameSerializer(data=data)
#         if Pro_serializer.is_valid():
#             Pro_serializer.save()
#             return JsonResponse(Pro_serializer.data, json_dumps_params={'ensure_ascii': False},status=201)
#         return JsonResponse(Pro_serializer.errors, status=400)

# @api_view(['GET', 'POST'])
# def getlispic_programe(request, pk):
#     try:
#         Pro_snippet = MapPrograme.objects.filter(pro_prisectorsector=pk)
#         # snippet = BookInfo.objects.all()
#     except MapPrograme.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         Pro_serializer = MapProgrameSerializer(Pro_snippet, many=True)
#         # return JsonResponse(serializer.data, json_dumps_params={'ensure_ascii': False}, safe=False)
#         return HttpResponse(json.dumps(Pro_serializer.data,ensure_ascii=False),  content_type="application/json")
class MyPageNumber(PageNumberPagination):
    page_size = 20  # 每页显示多少条
    page_size_query_param = 'size'  # URL中每页显示条数的参数
    page_query_param = 'page'  # URL中页码的参数
    max_page_size = None  # 最大页码数限制


class Itemlist(generics.ListCreateAPIView):
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, DjangoModelPermissions)
    lookup_field = "Id"
    queryset = MapTeacher.objects.all()
    serializer_class = MapTeacherSerializer


class MapcompanyFilter(rffilters.FilterSet):
    company_name = rffilters.CharFilter(lookup_expr="icontains")
    company_introduction = rffilters.CharFilter(lookup_expr="icontains")
    company_prisector = rffilters.CharFilter(lookup_expr="icontains")
    company_auxsector = rffilters.CharFilter(lookup_expr="icontains")
    company_fourthsector = rffilters.CharFilter(lookup_expr="icontains")
    company_categary = rffilters.CharFilter(lookup_expr="icontains")
    company_auth = rffilters.CharFilter(lookup_expr="icontains")
    company_time = rffilters.CharFilter(lookup_expr="icontains")
    company_address = rffilters.CharFilter(lookup_expr="icontains")
    company_item = rffilters.CharFilter(lookup_expr="icontains")
    company_year = rffilters.CharFilter(lookup_expr="icontains")
    company_remark = rffilters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = MapCompany
        fields = ['id','company_name','company_introduction', 'company_prisector', 'company_auxsector', 'company_fourthsector',
    'company_categary', 'company_auth', 'company_time', 'company_address', 
    'company_item', 'company_year', 'company_remark', 'company_radius']

class MapteacherFilter(rffilters.FilterSet):
    teacher_name = rffilters.CharFilter(lookup_expr="icontains")
    teacher_title = rffilters.CharFilter(lookup_expr="icontains")
    teacher_position = rffilters.CharFilter(lookup_expr="icontains")
    teacher_research = rffilters.CharFilter(lookup_expr="icontains")
    teacher_college = rffilters.CharFilter(lookup_expr="icontains")
    teacher_program = rffilters.CharFilter(lookup_expr="icontains")
    teacher_prisectorsector = rffilters.CharFilter(lookup_expr="icontains")
    teacher_auxsectorsector = rffilters.CharFilter(lookup_expr="icontains")
    teacher_fourthsector = rffilters.CharFilter(lookup_expr="icontains")
    teacher_remark = rffilters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = MapTeacher
        fields = ['id','teacher_name', 'teacher_title','teacher_position', 'teacher_research', 'teacher_college', 
    'teacher_program', 'teacher_prisectorsector', 'teacher_auxsectorsector',
    'teacher_fourthsector', 'teacher_remark','teacher_radius']

class MapinstrumentFilter(rffilters.FilterSet):
    instrument_name = rffilters.CharFilter(lookup_expr="icontains")
    instrument_address = rffilters.CharFilter(lookup_expr="icontains")
    instrument_category = rffilters.CharFilter(lookup_expr="icontains")
    instrument_pay = rffilters.CharFilter(lookup_expr="icontains")
    instrument_prisectorsector = rffilters.CharFilter(lookup_expr="icontains")
    instrument_auxsectorsector = rffilters.CharFilter(lookup_expr="icontains")
    instrument_fourthsector = rffilters.CharFilter(lookup_expr="icontains")
    instrument_contact = rffilters.CharFilter(lookup_expr="icontains")
    instrument_phone = rffilters.CharFilter(lookup_expr="icontains")
    instrument_reuse = rffilters.CharFilter(lookup_expr="icontains")
    instrument_remark = rffilters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = MapInstrument
        fields = ['id','instrument_name', 'instrument_address', 'instrument_category',
    'instrument_pay', 'instrument_prisectorsector', 'instrument_auxsectorsector', 'instrument_fourthsector', 'instrument_contact',
    'instrument_phone', 'instrument_reuse', 'instrument_remark','instrument_radius']


class MapachivementFilter(rffilters.FilterSet):
    ach_name = rffilters.CharFilter(lookup_expr="icontains")
    ach_people = rffilters.CharFilter(lookup_expr="icontains")
    ach_unit = rffilters.CharFilter(lookup_expr="icontains")
    ach_keywords = rffilters.CharFilter(lookup_expr="icontains")
    ach_clc = rffilters.CharFilter(lookup_expr="icontains")
    ach_sc = rffilters.CharFilter(lookup_expr="icontains")
    ach_introduction = rffilters.CharFilter(lookup_expr="icontains")
    ach_categary = rffilters.CharFilter(lookup_expr="icontains")
    ach_inyear = rffilters.CharFilter(lookup_expr="icontains")
    ach_researchtime = rffilters.CharFilter(lookup_expr="icontains")
    ach_evaluform = rffilters.CharFilter(lookup_expr="icontains")
    ach_level = rffilters.CharFilter(lookup_expr="icontains")
    ach_prisectorsector = rffilters.CharFilter(lookup_expr="icontains")
    ach_auxsectorsector = rffilters.CharFilter(lookup_expr="icontains")
    ach_fourthsector = rffilters.CharFilter(lookup_expr="icontains")
    ach_remark = rffilters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = MapAchivement
        fields = ['id','ach_name', 'ach_people', 'ach_unit', 'ach_keywords', 'ach_clc', 'ach_sc', 'ach_introduction',
    'ach_categary', 'ach_inyear', 'ach_researchtime', 'ach_evaluform', 'ach_level', 'ach_prisectorsector',
    'ach_auxsectorsector', 'ach_fourthsector', 'ach_remark' ,'ach_radius' ]


class MapprogrameFilter(rffilters.FilterSet):
    pro_name = rffilters.CharFilter(lookup_expr="icontains")
    pro_people = rffilters.CharFilter(lookup_expr="icontains")
    pro_position = rffilters.CharFilter(lookup_expr="icontains")
    pro_unit = rffilters.CharFilter(lookup_expr="icontains")
    pro_corcomp = rffilters.CharFilter(lookup_expr="icontains")
    pro_technology = rffilters.CharFilter(lookup_expr="icontains")
    pro_introduction = rffilters.CharFilter(lookup_expr="icontains")
    pro_compeople = rffilters.CharFilter(lookup_expr="icontains")
    pro_phone = rffilters.CharFilter(lookup_expr="icontains")
    pro_year = rffilters.CharFilter(lookup_expr="icontains")
    pro_prisectorsector = rffilters.CharFilter(lookup_expr="icontains")
    pro_auxsectorsector = rffilters.CharFilter(lookup_expr="icontains")
    pro_fourthsector = rffilters.CharFilter(lookup_expr="icontains")
    pro_remark = rffilters.CharFilter(lookup_expr="icontains")
    class Meta:
        model = MapPrograme
        fields = ['id', 'pro_name', 'pro_people', 'pro_position', 'pro_unit', 'pro_corcomp',
    'pro_technology', 'pro_introduction', 'pro_compeople', 'pro_phone',
    'pro_year', 'pro_prisectorsector', 'pro_auxsectorsector', 'pro_fourthsector','pro_remark']



# class ComListView(generics.ListAPIView):
#     queryset = company.objects.all()
#     serializer_class = CompanySerializer
#     filter_class = companyFilter
#     filter_backends = [DjangoFilterBackend]

class TeacherMulList(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, DjangoModelPermissions)
    queryset = MapTeacher.objects.all()
    serializer_class = MapTeacherSerializer
    filter_class = MapteacherFilter
    filter_backends = [DjangoFilterBackend]
    # filterset_fields = ['teacher_name', 'teacher_position', 'teacher_research', 'teacher_college', 
    # 'teacher_point', 'teacher_program', 'teacher_prisectorsector', 'teacher_auxsectorsector',
    # 'teacher_fourthsector', 'teacher_remark']
    filterset_fields = ['teacher_name', 'teacher_title', 'teacher_position', 'teacher_research', 'teacher_college', 'teacher_program', 
    'teacher_prisectorsector', 'teacher_auxsectorsector', 'teacher_fourthsector', 'teacher_remark', 'teacher_radius']


class CompanyMulList(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, DjangoModelPermissions)
    queryset = MapCompany.objects.all()
    serializer_class = MapCompanySerializer
    filter_class = MapcompanyFilter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['company_name','company_introduction', 'company_prisector', 'company_auxsector', 'company_fourthsector',
    'company_categary', 'company_auth', 'company_time', 'company_address', 
    'company_item', 'company_year', 'company_remark', 'company_radius']


class InstrumentMulList(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, DjangoModelPermissions)
    queryset = MapInstrument.objects.all()
    serializer_class = MapInstrumentSerializer
    filter_class = MapinstrumentFilter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['instrument_name', 'instrument_address', 'instrument_category',
    'instrument_pay', 'instrument_prisectorsector', 'instrument_auxsectorsector', 'instrument_fourthsector', 'instrument_contact',
    'instrument_phone', 'instrument_reuse', 'instrument_remark', 'instrument_radius']

class AchivementMulList(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, DjangoModelPermissions)
    queryset = MapAchivement.objects.all()
    serializer_class = MapAchivementSerializer
    filter_class = MapachivementFilter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['ach_name', 'ach_people', 'ach_unit', 'ach_keywords', 'ach_clc', 'ach_sc', 'ach_introduction',
    'ach_categary', 'ach_inyear', 'ach_researchtime', 'ach_evaluform', 'ach_level', 'ach_prisectorsector',
    'ach_auxsectorsector', 'ach_fourthsector', 'ach_remark' , 'ach_radius']

class ProgameMulList(generics.ListAPIView):
    # permission_classes = (IsAuthenticated, DjangoModelPermissions)
    queryset = MapPrograme.objects.all()
    serializer_class = MapProgrameSerializer
    filter_class = MapprogrameFilter
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['pro_name', 'pro_people', 'pro_position', 'pro_unit', 'pro_corcomp',
    'pro_technology', 'pro_introduction', 'pro_compeople', 'pro_phone',
    'pro_year', 'pro_prisectorsector', 'pro_auxsectorsector',  'pro_fourthsector',
    'pro_remark']

# class PublisherViewSet(ModelViewSet):
#     queryset = models.Publisher.objects.all()
#     serializer_class = PublisherModelSerializer
#     pagination_class = PageNumberPagination  # 注意不是列表（只能有一个分页模式）



class TeacherListView(generics.ListAPIView):
    queryset = MapTeacher.objects.all()
    serializer_class = MapTeacherSerializer
    pagination_class = MyPageNumber

class CompanyListView(generics.ListAPIView):
    queryset = MapCompany.objects.all()
    serializer_class = MapCompanySerializer
    pagination_class = MyPageNumber

class AchivementListView(generics.ListAPIView):
    queryset = MapAchivement.objects.all()
    serializer_class = MapAchivementSerializer
    pagination_class = MyPageNumber

class InstrumentListView(generics.ListAPIView):
    queryset = MapInstrument.objects.all()
    serializer_class = MapInstrumentSerializer
    pagination_class = MyPageNumber

class ProgrameListView(generics.ListAPIView):
    queryset = MapPrograme.objects.all()
    serializer_class = MapProgrameSerializer
    pagination_class = MyPageNumber

# class companyFilter(rffilters.FilterSet):
#     name = rffilters.CharFilter(lookup_expr="icontains")
#     class Meta:
#         model = company
#         fields = ['id','name','introduction','sector', 'company_categary','auth','zhuce_time','address','categary','year']

# class ComListView(generics.ListAPIView):
#     queryset = company.objects.all()
#     serializer_class = CompanySerializer
#     filter_class = companyFilter
#     filter_backends = [DjangoFilterBackend]
#     # search_fields = ('name','company_introduction')
    

# @unauthenticated_user
@csrf_exempt
def registerPage(request):

	form = CreateUserForm()
	if request.method == 'POST':
		form = CreateUserForm(request.POST)
		if form.is_valid():
			user = form.save()
			username = form.cleaned_data.get('username')


			messages.success(request, 'Account was created for ' + username)

			return redirect('login')
		

	context = {'form':form}
	return render(request, 'Books/register.html', context)

# @unauthenticated_user
@csrf_exempt
def loginPage(request):

	if request.method == 'POST':
		username = request.POST.get('username')
		password =request.POST.get('password')

		user = authenticate(request, username=username, password=password)

		if user is not None:
			login(request, user)
			return redirect('home')
		else:
			messages.info(request, 'Username OR password is incorrect')

	context = {}
	return render(request, 'Books/login.html', context)

def logoutUser(request):
	logout(request)
	return redirect('login')
    



