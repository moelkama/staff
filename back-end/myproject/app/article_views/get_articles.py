from django.shortcuts import render
from django.http import JsonResponse
from app.models import Article

def get_articles(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    articles = Article.objects.all()
    return JsonResponse({
        'articles': 
            [
                {
                    'name': article.name,
                    'price': article.price,
                    'src': article.src,
                    'id': article.id,
                }
                for article in articles
            ]
    })
    # return JsonResponse( {'articles': [
    #     {'name': 'Item 1', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'}, 
    #     {'name': 'Item 2', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'}, 
    #     {'name': 'Item 3', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'}, 
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     {'name': 'Item 4', 'price':12, 'src': 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'},
    #     ]})