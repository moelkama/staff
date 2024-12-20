from django.urls import path
from . import views
from . import dynamic_form

urlpatterns = [
    path('', views.index, name='index'),
    path('download_file', views.download_file),
    path('serve_file', views.serve_file),
    path('generate_pdf/<str:order_id>/', views.generate_pdf, name='generate_pdf'),
    path('search_order/<str:order_id>/', views.search_order, name='search_order'),
    path('dynamic_form', dynamic_form.CreateOrder, name='dynamic_form'),
    path('update_order', dynamic_form.UpdateOrder, name='update_order'),
    path('delete_order', dynamic_form.DeleteOrder, name='delete_order'),
    path('find_order/<str:period_time>', views.find_order, name='find_order'),
    path('create', views.create_order, name='create_order'),
]