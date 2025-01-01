
from django.http import JsonResponse
from app.models import Article
from app.article_views.create_article import MEDIA_URL
import os

def delete_article(request, article_id):
    if request.method == 'DELETE':
        try:
            article = Article.objects.get(id=article_id)
            article.delete()
            pwd = os.getcwd()
            file_path = f"{pwd}{article.src}"
            if os.path.exists(file_path):
                os.remove(file_path)
            return JsonResponse({'message': 'Article was deleted successfully!'}, status=200)
        except Article.DoesNotExist:
            return JsonResponse({'error': 'Article not found'}, status=404)
        return JsonResponse({'error': 'Internal Server Error'}, status=500)
    return JsonResponse({'message': 'Method Not Allowed'}, status=400) 