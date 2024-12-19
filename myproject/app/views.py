from django.http import HttpResponse
from django.http import FileResponse
import os
from django.template.loader import render_to_string
from weasyprint import HTML
from datetime import datetime
from django.http import JsonResponse
from .models import Order
from django.shortcuts import render

def find_order(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    try:
        orders = Order.objects.all()
        return render(request, 'app/find_order.html', {
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

def search_order(request, order_id):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    # order_id = request.GET.get('id')
    try:
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

def generate_pdf(request, order_id):
    # order_id = request.GET.get('id')
    print(f"Order ID: {order_id}")
    order = Order.objects.get(id=order_id)
    items = [{'name': item.name, 'count': item.count, 'price': item.price, 'total_price': item.count * item.price} for item in order.items.all()]

    context = {
        'date': order.date,
        'cmd_id': order.id,
        'items': items,
        'total': sum(item['count'] * item['price'] for item in items),
        'contact_phone': '+212613276891',
        'website': 'www.staff.com'
    }
    html_content = render_to_string('app/pdf.html', context)

    pdf = HTML(string=html_content).write_pdf()

    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'filename="example.pdf"'
    return response

def serve_file(request):
    file_path = os.path.join('/uploads/', 'file.pdf')
    file_handle = open(file_path, 'rb')

    return FileResponse(file_handle, content_type='application/pdf')

def download_file(request):
    file_path = os.path.join('/uploads/', 'file.pdf')
    file_handle = open(file_path, 'rb')
    
    # Return the file as a response
    return FileResponse(file_handle, as_attachment=True, filename='file.pdf')

def index(request):
    return render(request, 'index.html', {'title': 'Home Page'})
