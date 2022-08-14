import django_filters
from django_filters import CharFilter
from Books.models import *

class TeacherFilter(django_filters.FilterSet):
    teacher_name = CharFilter(field_name = "teacher_name", lookup_expr='icontains')
    class Meta:
        model = MapTeacher
        fields = ['id','teacher_name', 'teacher_position']