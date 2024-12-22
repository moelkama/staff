from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .models import Order, Item, Article
from django.core.files.storage import default_storage
import os
UPLOAD_PATH = 'articles_pictures/'

def create_article(request):
    if request.method == 'POST':
        ## check if the article already exists
        image = request.FILES.get("image")

        if image:
            _, extension = os.path.splitext(image.name)
            valid_extensions = ['.jpg', '.jpeg', '.png']
            if extension.lower() not in valid_extensions:
                return JsonResponse({"error": f"Invalid image extension: {extension}"}, status=400)
            UPLOADED_NAME = f"{request.POST.get('article_name')}{extension}"
            file_path = default_storage.save(f"{UPLOAD_PATH}/{UPLOADED_NAME}", image)
            print(f"File path: {file_path}")
        else:
            return JsonResponse({"error": "Image is required"}, status=400)
        article = Article.objects.create(
            article_name=request.POST.get('article_name'),
            price=request.POST.get('price'),
            src='https://pixolabo.com/wp-content/uploads/2021/09/PixoLabo-Product-Only-E-Commerce-Product-Image.jpg',
            type=request.POST.get('type'),
            category=request.POST.get('category'),
            height=request.POST.get('height'),
            width=request.POST.get('width'),
            how_many_available=request.POST.get('how_many_available'),
            )
        return JsonResponse({
            'article_name': article.article_name,
            'article_id': article.item_id,
            'price': article.price,
            'src': article.src,
            'created_at': article.created_at,
            'type': article.type,
            'category': article.category,
            'height': article.height,
            'width': article.width,
            'how_many_available': article.how_many_available,
            'how_many_times_ordered': article.how_many_times_ordered,
            }, status=201)

    if request.method == 'GET':
        return render(request, 'app/dashboard.html')
    return JsonResponse({'error': 'Unseported HTTP method'}, status=405)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

def UpdateOrder(request, order_id):
    if request.method == 'PUT':
        try:
            print(f"Order ID: {order_id}")
            order = Order.objects.get(id=order_id)
            items = json.loads(request.body)
            order.items.all().delete()
            for item in items:
                Item.objects.create(name=item['name'], count=item['count'], price=item['price'], order=order)
            order.save()
            return JsonResponse({'message': 'Object updated successfully', 'id': order_id})
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Object not found'}, status=404)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405) 

def CreateOrder(request):
    if request.method == 'POST':
        items = json.loads(request.body)
        order = Order.objects.create()
        for item in items:
            Item.objects.create(name=item['name'], count=item['count'], price=item['price'], order=order)
        return JsonResponse({'id': order.id}, status=201)

    if request.method == 'GET':
        return render(request, 'app/dynamic_form.html')

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

def DeleteOrder(request, order_id):
    if request.method == 'DELETE':
        try:
            print(f"delet Order ID::::::::::::::: {order_id}")
            order = Order.objects.get(id=order_id)
            order.delete()
            return JsonResponse({'message': 'Object deleted successfully'})
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Object not found'}, status=404)
    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)