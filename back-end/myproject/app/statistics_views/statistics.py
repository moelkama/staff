
from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import TruncDate
from datetime import date, timedelta
from app.models import Order
from app.models import Article
from django.db.models.functions import ExtractYear, ExtractMonth
from django.db.models.functions import TruncMonth
from collections import Counter

def Orders_statistics(request, year, month):
    if request.method != 'GET':
        return JsonResponse({'status': 'error', 'message': 'method not allowed'}, status=405)
    orders_by_day = (
        Order.objects.filter(date__year=year, date__month=month)
        .annotate(day_only=TruncDate('date'))  # Truncate datetime to date
        .values('day_only')  # Group by day
        .annotate(orders=Count('id'))  # Count orders per day
    )

    orders_dict = {entry['day_only'].day: entry['orders'] for entry in orders_by_day}

    first_day = date(year, month, 1)
    last_day = (first_day + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    all_days = range(1, last_day.day + 1)

    result = [{'date': day, 'orders': orders_dict.get(day, 0)} for day in all_days]
    if request.method == 'GET':
        return JsonResponse(
            {'data': result},
        )
    return JsonResponse({'status': 'error', 'message': 'method not allowed'}, status=405)

def Articles_statistics(request, period_time):
    if request.method != 'GET':
        return JsonResponse({'status': 'error', 'message': 'method not allowed'}, status=405)
    try:
        if period_time == 'TODAY':
            orders = Order.objects.filter(
                date__year=date.today().year,
                date__month=date.today().month,
                date__day=date.today().day
            )
        elif period_time == 'THIS WEEK':
            start_date = date.today() - timedelta(days=7)
            end_date = date.today()  # Optional, today is included by default

            orders = Order.objects.filter(
                date__range=[start_date, end_date]
            )
        elif period_time == 'THIS MONTH':
            orders = Order.objects.filter(
                date__year=date.today().year,
                date__month=date.today().month
            )
        elif period_time == 'THIS YEAR':
            orders = Order.objects.filter(date__year=date.today().year)
        else:
            orders = Order.objects.all()

        all_items = [
            {'name': item.name, 'count': item.count}
            for order in orders
            for item in order.items.all()
        ]

        item_counts = Counter()
        for item in all_items:
            item_counts[item['name']] += item['count']

        result = [{'name': name, 'value': count} for name, count in item_counts.items()]

        article_names = [entry['name'] for entry in result]
        articles = Article.objects.filter(name__in=article_names)

        article_src_map = {article.name: article.src for article in articles}

        for entry in result:
            entry['src'] = article_src_map.get(entry['name'], None)
        # result = [{'order_id': order.id, 'date': order.date} for order in orders]
        return JsonResponse({'data': result}, status=200)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': 'Internal Server Error'}, status=500)

def Orders_per_month(request, year):
    orders_by_month = (
        Order.objects.filter(date__year=year)
        .annotate(month=TruncMonth('date'))
        .values('month')
        .annotate(count=Count('id'))
        .order_by('month')
    )

    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    # result = [{'month': i, 'orders': 0} for i in range(1, 13)]
    result = [{'month': month, 'orders': 0} for month in months]

    for entry in orders_by_month:
        month = entry['month'].month
        result[month - 1]['orders'] = entry['count']

    return JsonResponse(result, safe=False)

def How_many_year(request):
    orders = Order.objects.annotate(
        year=ExtractYear('date')
    ).values('year').distinct()

    formatted_result = [order['year'] for order in orders]

    return JsonResponse({'years': formatted_result}, safe=False)