import json
from django.http import JsonResponse
from app.models import Order

def search_order(request, order_id):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    try:
        order_id = order_id.upper()
        order = Order.objects.get(id=order_id)
        items = [{'name': item.name, 'count': item.count, 'price': item.price} for item in order.items.all()]

        context = {
            'date': order.date,
            'id': order.id,
            'total': sum(item['count'] * item['price'] for item in items),
        }
        return JsonResponse(context)
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found'}, status=404)
    return JsonResponse({'error': 'Internal Server Error'}, status=500)