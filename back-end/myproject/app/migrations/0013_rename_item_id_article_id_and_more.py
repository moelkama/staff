# Generated by Django 4.2 on 2024-12-26 15:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_rename_categories_article_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='item_id',
            new_name='id',
        ),
        migrations.RenameField(
            model_name='article',
            old_name='article_name',
            new_name='name',
        ),
    ]