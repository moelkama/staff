from django.urls import path
from . import views
from . import dynamic_form

urlpatterns = [
    path('', views.index, name='index'),
    # path('download_file', views.download_file),
    # path('serve_file', views.serve_file),
    path('generate_pdf/<str:order_id>/', views.generate_pdf, name='generate_pdf'),
    path('search_order/<str:order_id>/', views.search_order, name='search_order'), #api
    path('dynamic_form', dynamic_form.CreateOrder, name='dynamic_form'), #api
    path('update_order/<str:order_id>', dynamic_form.UpdateOrder, name='update_order'), #api , render
    path('delete_order/<str:order_id>/', dynamic_form.DeleteOrder, name='delete_order'), #api
    path('find_order/<str:period_time>', views.find_order, name='find_order'), #api
    path('create', views.create_order, name='create_order'), #api , render
    path('create_article', dynamic_form.create_article, name='create_article'), #api
]