from django.urls import path
from Books import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('snippets/', views.getlist),
    path('snippets/<str:pk>/', views.getlispic),
    # path('company/', views.getlist_company),
    # path('compant/<str:pk>/', views.getlispic_compamy),
    # path('teacher/', views.getlist_teacher),
    path('teacher/',views.TeacherListView.as_view()),
    path('achivement/',views.AchivementListView.as_view()),
    path('company/',views.CompanyListView.as_view()),
    path('instrument/',views.InstrumentListView.as_view()),
    path('programe/',views.ProgrameListView.as_view()),
    path('comcontains/',views.sqlcom),

    # path('teacher/<str:pk>/', views.getlispic_teacher),
    # path('instrument/', views.getlist_instrument),
    # path('instrument/<str:pk>/', views.getlispic_instrument),
    # path('achivement/', views.getlist_achivement),
    # path('programe/', views.getlist_programe),
    # path('ahivement/<str:pk>/', views.getlispic_achivement),
    path('TeaMultisearch/', views.TeacherMulList.as_view()),
    path('ComMultisearch/', views.CompanyMulList.as_view()),
    path('InsMultisearch/',views.InstrumentMulList.as_view()),
    path('AchMultisearch/',views.AchivementMulList.as_view()),
    path('ProMultisearch/',views.ProgameMulList.as_view()),
    path('item/', views.Itemlist.as_view()),
  
    path('entrance/', views.entrance, name='home1'),
    path('entrancemap/', views.entrancemap),
    path('entrancedata/', views.entrancedata),
    path('mteacher/',views.Maptea),
    path('mcompany/',views.Mapcom),
    path('minstrument/',views.Mapins),
    path('machievement/',views.Mapach),
    path('mprograme/',views.Mapsni),
    path('demo-achievement/',views.Dtachevement),
    path('demo-company/',views.Dtcompany),
    path('demo-instrument/',views.Dtinstrument),
    path('demo-projection/',views.Dtprojection),
    path('demo-talent/',views.Dttalent),
    path('heatmap/',views.Dtheat),
    path('relative-map/',views.Dtrelation),
    path('teacherset/', views.accountSettings, name='account'),
    path('register/', views.registerPage, name="register"),
	path('login/', views.loginPage, name="login"),  
	path('logout/', views.logoutUser, name="logout"),

    path('reset_password/',auth_views.PasswordResetView.as_view(template_name = "Books/password_reset.html"), name = "reset_password" ),
    path('reset_password_sent/',auth_views.PasswordResetDoneView.as_view(template_name = "Books/password_reset_sent.html"), name="password_reset_done"),
    path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name = "Books/password_reset_form.html"), name="password_reset_confirm" ),
    path('reset_password_complete/',auth_views.PasswordResetCompleteView.as_view(template_name = "Books/password_reset_done.html"), name="password_reset_complete" ),


]
