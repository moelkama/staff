

def update_article(request, article_id):
    if request.method == 'PUT':
        try:
            article = Article.objects.get(id=article_id)
            article_name = request.POST.get('name')
            if article_name:
                article.name = article_name
            price = request.POST.get('price')
            if price:
                article.price = price
            image = request.FILES.get("image")
            if image:
                _, extension = os.path.splitext(image.name)
                valid_extensions = ['.jpg', '.jpeg', '.png']
                if extension.lower() not in valid_extensions:
                    return JsonResponse({"error": f"Invalid image extension: {extension}"}, status=400)
                UPLOADED_NAME = f"{article_name}{extension}"
                file_path = default_storage.save(f"{UPLOAD_PATH}/{UPLOADED_NAME}", image)
                article.src = f"{MEDIA_URL}{file_path}"
            type = request.POST.get('type')
            if type:
                article.type = type
            category = request.POST.get('category')
            if category:
                article.category = category
            height = request.POST.get('height')
            if height:
                article.height = height
            width = request.POST.get('width')
            if width:
                article.width = width
            how_many_available = request.POST.get('how_many_available')
            if how_many_available:
                article.how_many_available = how_many_available
            article.save()
            return JsonResponse({'message': 'Article was updated successfully!'}, status=200)
        except Article.DoesNotExist:
            return JsonResponse({'error': 'Article not found'}, status=404)
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
    return JsonResponse({'message': 'Method Not Allowed'}, status=400)