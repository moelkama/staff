from django.urls import path
from . import views,find_order , dynamic_form
from app.article_views import create_article, get_articles, delete_article
from app.order_views import create_order, search_order, update_order, delete_order
from . import serve_file, generate_pdf

urlpatterns = [
    #Articles
    path('get_articles', get_articles.get_articles, name='get_articles'), #api , render
    path('create_article', create_article.create_article, name='create_article'), #api
    path('delete_article/<str:article_id>', delete_article.delete_article, name='delete_article'),
    
    #generate_pdf
    path('generate_pdf/<str:order_id>', generate_pdf.generate_pdf, name='generate_pdf'),
    
    
    #serve_file
    path('media/<str:dir>/<str:file>', serve_file.serve_file),
    # path('download_file', views.download_file),
    
    ###############csrf
    path("csrf/", views.get_csrf_token, name="get_csrf_token"),
    
    #oreder
    path('find_order/<str:period_time>', find_order.find_order, name='find_order'), #api
    path('search_order/<str:order_id>', search_order.search_order, name='search_order'), #api
    path('update_order/<str:order_id>', update_order.UpdateOrder, name='update_order'), #api , render
    path('create_order', create_order.create_order, name='dynamic_form'), #api
    path('delete_order/<str:order_id>', delete_order.DeleteOrder, name='delete_order'), #api
    # path('delete_order/<str:order_id>/', delete_order.DeleteOrder, name='delete_order'), #api
]