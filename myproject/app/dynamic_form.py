from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from .models import Order
from .models import Item

def dynamic_form_view(request):
    if request.method == 'POST':
        items = json.loads(request.body)
        order = Order.objects.create()
        for item in items:
            Item.objects.create(name=item['name'], count=item['count'], price=item['price'], order=order)
        return JsonResponse({'id': order.id}, status=201)

    return render(request, 'app/dynamic_form.html')


def get(request):
    orders = Order.objects.get(id=request.GET['id'])
    return JsonResponse({'id': order.id, 'items': [{'name': item.name, 'count': item.count, 'price': item.price} for item in order.items.all()]})