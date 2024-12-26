from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from .models import Order

def generate_pdf(request, order_id):
    if request.method != 'GET':
        return HttpResponse(status=405)
    try:
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
    except Order.DoesNotExist:
        return HttpResponse(status=404)
    return HttpResponse(status=500)
