# Generated by Django 4.2 on 2024-12-21 17:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_article_categories_article_created_at_article_height_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='id',
        ),
        migrations.AddField(
            model_name='article',
            name='item_id',
            field=models.AutoField(default=1, primary_key=True, serialize=False),
        ),
    ]