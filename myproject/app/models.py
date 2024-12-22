from django.db import models
import random
import string
from datetime import datetime

# its not unique id random generation use datetime.now() instead, incrimental id
def generate_unique_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

class Article(models.Model):
    article_name           = models.CharField(max_length=30)  # String
    item_id                = models.AutoField(primary_key=True)  # ID
    price                  = models.DecimalField(max_digits=6, decimal_places=2)  # Number
    src                    = models.URLField(max_length=100)  # URL
    created_at             = models.DateField(default=datetime.now)  # Date
    type                   = models.CharField(max_length=20)  # String
    category               = models.CharField(max_length=20)  # String
    height                 = models.DecimalField(max_digits=5, decimal_places=2)  # Number
    width                  = models.DecimalField(max_digits=5, decimal_places=2)  # Number
    how_many_available     = models.PositiveIntegerField()  # Number
    how_many_times_ordered = models.PositiveIntegerField(default=0)  # Number

    def __str__(self):
        return f"{self.article_name} {self.price} {self.src} {self.type} {self.category} {self.height} {self.width} {self.how_many_available} {self.how_many_times_ordered}"

class Order(models.Model):
    id   = models.CharField(primary_key=True, max_length=6, unique=True, default=generate_unique_id, editable=False)
    date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.id}"

class   Item(models.Model):
    name  = models.CharField(max_length=50)
    count = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} {self.count} {self.price}"