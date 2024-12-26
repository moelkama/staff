from django.http import JsonResponse
from app.models import Order, Item
from django.shortcuts import render
import json

def create_order(request):
    print("------------------hello from create_order------------------")
    if request.method == 'POST':
        items = json.loads(request.body)
        order = Order.objects.create()
        for item in items:
            Item.objects.create(name=item['name'], count=item['count'], price=item['price'], order=order)
        return JsonResponse({'id': order.id}, status=201)

    if request.method == 'GET':
        return render(request, 'app/dynamic_form.html')

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)