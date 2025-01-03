
from django.http import JsonResponse
from django.db.models import Count
from django.db.models.functions import TruncDate
from datetime import date, timedelta
from app.models import Order
from app.models import Article
from django.db.models.functions import ExtractYear, ExtractMonth

def Orders_statistics(request, year, month):
    if request.method != 'GET':
        return JsonResponse({'status': 'error', 'message': 'method not allowed'}, status=405)
    orders_by_day = (
        Order.objects.filter(date__year=year, date__month=month)
        .annotate(day_only=TruncDate('date'))  # Truncate datetime to date
        .values('day_only')  # Group by day
        .annotate(orders=Count('id'))  # Count orders per day
    )

    # Convert queryset to dictionary for easier lookup
    orders_dict = {entry['day_only'].day: entry['orders'] for entry in orders_by_day}

    # Generate all days in the specified month
    first_day = date(year, month, 1)
    last_day = (first_day + timedelta(days=32)).replace(day=1) - timedelta(days=1)
    all_days = range(1, last_day.day + 1)

    # Combine orders with all days, filling in missing days with 0 orders
    result = [{'date': day, 'orders': orders_dict.get(day, 0)} for day in all_days]
    if request.method == 'GET':
        return JsonResponse(
            {'data': result},
        )
    return JsonResponse({'status': 'error', 'message': 'method not allowed'}, status=405)

def Articles_statistics(request, period_time):
    articles = Article.objects.all()
    result = [{'name': article.name, 'value': article.how_many_times_ordered, 'src':article.src } for article in articles]
    print('result::::::::::::::::::::', result)
    return JsonResponse({'data': result}, status=200)

def How_many_year(request):
    orders = Order.objects.annotate(
        year=ExtractYear('date'),
        month=ExtractMonth('date')
    ).values('year', 'month').distinct()

    result = {}
    for order in orders:
        year = order['year']
        month = order['month']
        if year not in result:
            result[year] = []
        if month not in result[year]:
            result[year].append(month)

    # Convert the result to the desired format
    formatted_result = [{'year': year, 'months': sorted(months)} for year, months in result.items()]

    return JsonResponse(formatted_result, safe=False)