from django.urls import path
from . import views
from . import dynamic_form

urlpatterns = [
    path('', views.index, name='index'),
    path('download_file', views.download_file),
    path('serve_file', views.serve_file),
    path('generate_pdf', views.generate_pdf, name='generate_pdf'),
    path('dynamic_form', dynamic_form.dynamic_form_view, name='dynamic_form'),
    path('get', dynamic_form.get),
]