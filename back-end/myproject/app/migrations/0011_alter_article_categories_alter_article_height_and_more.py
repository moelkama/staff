# Generated by Django 4.2 on 2024-12-21 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_article'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='categories',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='article',
            name='height',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
        migrations.AlterField(
            model_name='article',
            name='how_many_available',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='article',
            name='item_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='article',
            name='type',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='article',
            name='width',
            field=models.DecimalField(decimal_places=2, max_digits=5),
        ),
    ]
