from django.http import JsonResponse
from app.models import Order, Item
import json

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