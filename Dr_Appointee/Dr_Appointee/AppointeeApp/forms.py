from django import forms
from .models import User

class User_Form(forms.ModelForm):
    name=forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','placeholder':'UserName','name':'name'}),required=True)
    email=forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control','placeholder':'Email'}),required=True)
    password=forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control','placeholder':'Password'}),required=True)

    class Meta():
        model=User
        fields=['name','email','password']
