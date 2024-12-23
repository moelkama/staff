# Generated by Django 4.2 on 2024-12-21 17:53

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_delete_article'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('article_name', models.CharField(max_length=30)),
                ('item_id', models.AutoField(default=1, primary_key=True, serialize=False)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('src', models.URLField(max_length=100)),
                ('created_at', models.DateField(default=datetime.datetime.now)),
                ('type', models.CharField(default='untyped', max_length=20)),
                ('categories', models.CharField(default='Uncategorized', max_length=20)),
                ('height', models.DecimalField(decimal_places=2, default=1, max_digits=5)),
                ('width', models.DecimalField(decimal_places=2, default=1, max_digits=5)),
                ('how_many_available', models.PositiveIntegerField(default=0)),
                ('how_many_times_ordered', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]