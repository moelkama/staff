from django.http import JsonResponse
from .models import Order
from django.shortcuts import render
from django.utils import timezone
from datetime import timedelta

def find_order(request, period_time):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    try:
        today = timezone.now().date()
        if period_time == 'TO_DAY':
            orders = Order.objects.filter(date__date=today).order_by('-date')
        elif period_time == 'YESTERDAY':
            yesterday = today - timedelta(days=1)
            orders = Order.objects.filter(date__date=yesterday).order_by('-date')
        elif period_time == 'LAST_WEEK':
            last_week = today - timedelta(days=7)
            orders = Order.objects.filter(date__date__gte=last_week , date__date__lte=today).order_by('-date')
        elif period_time == 'LAST_MONTH':
            last_month = today - timedelta(days=30)
            orders = Order.objects.filter(date__date__gte=last_month , date__date__lte=today).order_by('-date')
        else:
            orders = Order.objects.all().order_by('-date')
        return JsonResponse(
            {
                'period_time': period_time,
                'period_times': ['TO_DAY', 'YESTERDAY', 'LAST_WEEK', 'LAST_MONTH'],
                'orders': [
                    {
                        'id': order.id,
                        'date': order.date,
                        'total': sum(item.count * item.price for item in order.items.all())
                    }
                    for order in orders
                ]
            })
    except Order.DoesNotExist:
        return JsonResponse({'error': 'Order not found'}, status=404)
    return JsonResponse({'error': 'Internal Server Error'}, status=500)