from django.http import HttpResponse
from django.http import FileResponse
import os
from django.template.loader import render_to_string
from weasyprint import HTML
from datetime import datetime
from django.http import JsonResponse

def generate_pdf(request):
    # Render the HTML template with context
    items = [
        {'count': 2, 'name': 'Item A', 'price': 15.00},
        {'count': 1, 'name': 'Item B', 'price': 30.00},
        {'count': 3, 'name': 'Item C', 'price': 7.50},
    ]
    total = sum(item['count'] * item['price'] for item in items)

    context = {
        'date': datetime.now(),
        'cmd_id': 'CMD12345',
        'items': items,
        'total': total,
        'contact_phone': '+212613276891',
        'website': 'www.staff.com',
    }
    html_content = render_to_string('app/pdf.html', context)

    # Convert the HTML content to a PDF
    pdf = HTML(string=html_content).write_pdf()

    # Create a response object with the generated PDF
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
    return HttpResponse("Hello, World! This is my new app.")
