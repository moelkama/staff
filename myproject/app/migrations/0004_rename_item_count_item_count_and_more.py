# Generated by Django 4.2 on 2024-12-17 17:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_remove_order_last_name_remove_order_name_item'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='item_count',
            new_name='count',
        ),
        migrations.RenameField(
            model_name='item',
            old_name='item_name',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='item',
            old_name='item_price',
            new_name='price',
        ),
    ]
