from django.http import JsonResponse
from django.shortcuts import render
from app.models import Article
import os
from django.core.files.storage import default_storage
UPLOAD_PATH = 'articles_pictures/'
MEDIA_URL = '/media/'

def create_article(request):
    if request.method == 'POST':
        article_name = request.POST.get('name')
        if Article.objects.filter(name=article_name).exists():
            print(f"Article name already exists: {article_name}\r\n")
            return JsonResponse({'error': 'Article name already exists'}, status=400)

        image = request.FILES.get("image")
        if image:
            _, extension = os.path.splitext(image.name)
            valid_extensions = ['.jpg', '.jpeg', '.png']
            if extension.lower() not in valid_extensions:
                return JsonResponse({"error": f"Invalid image extension: {extension}"}, status=400)
            UPLOADED_NAME = f"{article_name}{extension}"
            file_path = default_storage.save(f"{UPLOAD_PATH}/{UPLOADED_NAME}", image)
            print(f"File path: {file_path}")
        else:
            print("Image is required\r\n")
            return JsonResponse({"error": "Image is required"}, status=400)
        # file_path = 'articles_pictures/1.jpg'
        article = Article.objects.create(
            name=article_name,
            price=request.POST.get('price'),
            src=f"{MEDIA_URL}{file_path}",
            type=request.POST.get('type'),
            category=request.POST.get('category'),
            height=request.POST.get('height'),
            width=request.POST.get('width'),
            how_many_available=request.POST.get('how_many_available'),
            )
        return JsonResponse({'id':article.id}, status=201)

    if request.method == 'GET':
        return render(request, 'app/dashboard.html')
    return JsonResponse({'error': 'Unseported HTTP method'}, status=405)

    return JsonResponse({'error': 'Invalid HTTP method'}, status=405)