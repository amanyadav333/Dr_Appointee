# Generated by Django 2.1.7 on 2019-02-26 08:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DoctorModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('clinic_name', models.CharField(max_length=25)),
                ('category', models.CharField(choices=[('DT', 'Dermatologist'), ('OT', 'Opthalmologist'), ('ET', 'Endocrinologist'), ('PT', 'Psychiatrist'), ('NT', ' Neurologist'), ('CT', 'Cardiologist'), ('GT', 'Gynecologist'), ('PN', 'Pediatrician'), ('DT', 'Dentist')], max_length=2)),
                ('fees', models.IntegerField(default=2)),
                ('late', models.CharField(max_length=50)),
                ('long', models.CharField(max_length=50)),
                ('exp', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=50)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
    ]
