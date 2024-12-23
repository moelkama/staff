from django.contrib import admin
from .models import Order, Item, Article

@admin.register(Order)  # Registering the model
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'list_items')  # Fields to show in admin list view
    def list_items(self, obj):
        """
        List all items related to the order.
        """
        return ", ".join([f"{item.name} ({item.count})" for item in obj.items.all()])

    list_items.short_description = "Items"

@admin.register(Item)  # Registering the model
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'count', 'price', 'order')  # Fields to show in admin list view

@admin.register(Article)  # Registering the model
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('article_name', 'price', 'src')
