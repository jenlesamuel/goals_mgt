# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-04-11 15:01
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='wheeloflifeevaluation',
            old_name='goal_setter',
            new_name='user',
        ),
        migrations.AlterField(
            model_name='goalsetter',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='goal_setter', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]