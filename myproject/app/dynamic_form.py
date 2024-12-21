from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .models import Order, Item, Article


def create_article(request):
    if request.method == 'POST':
        # data = json.loads(request.body)
        article = Article.objects.create(
            article_name='elkamal',
            price=15,
            src='https://pixolabo.com/wp-content/uploads/2021/09/PixoLabo-Product-Only-E-Commerce-Product-Image.jpg',
            type='rozzazza',
            categories='rizedddddd',
            height=1,
            width=0.6,
            how_many_available=100,
            )
        return JsonResponse({
            'article_name': article.article_name,
            'article_id': article.item_id,
            'price': article.price,
            'src': article.src,
            'type': article.type,
            'categories': article.categories,
            'height': article.height,
            'width': article.width,
            'how_many_available': article.how_many_available,
            'how_many_times_ordered': article.how_many_times_ordered,
            }, status=201)

    if request.method == 'GET':
        return render(request, 'app/create_article.html')
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