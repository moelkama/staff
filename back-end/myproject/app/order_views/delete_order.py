from django.http import JsonResponse
from app.models import Order

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