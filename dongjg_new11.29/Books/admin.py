from django.contrib import admin
from Books.models import BookInfo, MapCompany, MapTeacher, MapInstrument, MapAchivement, MapPrograme
from Books.models import company
from Books.models import People
from Books.models import loverswhite
from .models import *
class BookInfoAdmin(admin.ModelAdmin):
    list_display = ['name','book_date','age','book_detail','bread','bcomment','isDelete']

class PeopleAdmin(admin.ModelAdmin):
    list_display = ['name','age']#,'book_people'

class companyAdmin(admin.ModelAdmin):
    list_display = ['name','introduction','sector', 
    'company_categary','point','auth','zhuce_time','address','categary','year','pgps']

class loverswhiteAdmin(admin.ModelAdmin):
    list_display = ['address','year','isDelete','book_lwhite']

class MapCompanyAdmin(admin.ModelAdmin):
    list_display = ['company_name','company_introduction', 'company_prisector', 'company_auxsector', 'company_fourthsector',
    'company_categary', 'point', 'company_auth', 'company_time', 'company_address', 
    'company_item', 'company_year', 'company_remark', 'company_radius']

class MapTeacherAdmin(admin.ModelAdmin):
    list_display = ['teacher_name', 'teacher_title', 'teacher_position', 'teacher_research', 'teacher_college', 
    'point', 'teacher_program', 'teacher_prisectorsector', 'teacher_auxsectorsector',
    'teacher_fourthsector', 'teacher_remark', 'teacher_radius']

class MapInstrumentAdmin(admin.ModelAdmin):
    list_display = ['instrument_name', 'instrument_address', 'point', 'instrument_category',
    'instrument_pay', 'instrument_prisectorsector', 'instrument_auxsectorsector', 'instrument_fourthsector','instrument_contact',
    'instrument_phone', 'instrument_reuse', 'instrument_remark', 'instrument_radius']

class MapAchivementAdmin(admin.ModelAdmin):
    list_display = ['ach_name', 'ach_people', 'ach_unit', 'ach_keywords', 'ach_clc', 'ach_sc', 'ach_introduction',
    'ach_categary', 'ach_inyear', 'ach_researchtime', 'ach_evaluform', 'ach_level', 'ach_prisectorsector',
    'ach_auxsectorsector', 'ach_fourthsector', 'point', 'ach_remark', 'ach_radius']

class MapProgrameAdmin(admin.ModelAdmin):
    list_display = ['pro_name', 'pro_people', 'pro_position', 'pro_unit', 'pro_corcomp',
    'pro_technology', 'pro_introduction', 'pro_compeople', 'pro_phone',
    'pro_year', 'pro_prisectorsector', 'pro_auxsectorsector',  'pro_fourthsector',
    'point', 'pro_remark']



# Register your models here.
admin.site.register(BookInfo,BookInfoAdmin)
admin.site.register(People, PeopleAdmin)
admin.site.register(company, companyAdmin)
admin.site.register(loverswhite, loverswhiteAdmin)
admin.site.register(MapCompany, MapCompanyAdmin)
admin.site.register(MapTeacher, MapTeacherAdmin)
admin.site.register(MapInstrument, MapInstrumentAdmin)
admin.site.register(MapAchivement, MapAchivementAdmin)
admin.site.register(MapPrograme, MapProgrameAdmin)
admin.site.register(Profile)
