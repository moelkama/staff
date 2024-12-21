from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .models import Order
from .models import Item

def UpdateOrder(request):
    if request.method == 'PUT':
        try:
            order_id = request.GET.get('id')
            print(f"Order ID: {order_id}")
            order = Order.objects.get(id=order_id)
            items = json.loads(request.body)
            order.items.all().delete()
            for item in items:
                Item.objects.create(name=item.name, count=item.count, price=item.price, order=order)
            order.save()
            return JsonResponse({'message': 'Object updated successfully', 'id': order_id})
        except Order.DoesNotExist:
            return JsonResponse({'error': 'Object not found'}, status=404)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405) 

def CreateOrder(request):
    if request.method == 'POST':
        items = json.loads(request.body)
        # print(f"Items:::::::::::::::::::::::: {items}")
        order = Order.objects.create()
        for item in items:
            # print(f"Item:::::::::::::::::::::::: {item}")
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