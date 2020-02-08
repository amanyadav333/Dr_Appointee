from . import views
from django.urls import path,include
from django.conf.urls import url

urlpatterns = [
    path('',views.index,name='index'),
    path('logpage/',views.login,name='logpage'),
    url('ajax/validate_username/', views.markershow, name='validate_username'),
    url('ajax/marker_detail/', views.detailshow, name='marker_detail'),
    url('ajax/appoint_show/', views.appoint, name='appoint_show'),
]
