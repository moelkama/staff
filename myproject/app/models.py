from django.db import models
import random
import string

# its not unique id random generation use datetime.now() instead, incrimental id
def generate_unique_id():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

class Order(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True, default=generate_unique_id, editable=False)
    # date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} {self.name} {self.last_name}"

class   Item(models.Model):
    name = models.CharField(max_length=50)
    count = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.item_name} {self.item_count} {self.item_price}"