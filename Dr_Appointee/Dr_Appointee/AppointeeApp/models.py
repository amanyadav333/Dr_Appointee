from django.db import models

class User(models.Model):
    name=models.CharField(max_length=50)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=30)

    def __str__(self):
        return f'{self.name}'


FIELD_CHOICE=(
	('DT','Dermatologist'),('OT','Opthalmologist'),('ET','Endocrinologist'),('PT','Psychiatrist'),('NT',' Neurologist')
	,('CT','Cardiologist'),('GT','Gynecologist'),('PN','Pediatrician'),('DT','Dentist'),)

class DoctorModel(models.Model):
	name=models.CharField(max_length=25)
	clinic_name=models.CharField(max_length=25)
	category=models.CharField(max_length=2,choices=FIELD_CHOICE)
	fees=models.IntegerField(default=2)
	late=models.CharField(max_length=50)
	long=models.CharField(max_length=50)
	exp=models.CharField(max_length=50)
	def __str__(self):
		return f'{self.name},{self.category}'
