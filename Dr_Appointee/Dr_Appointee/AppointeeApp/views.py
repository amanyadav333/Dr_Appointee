from django.shortcuts import render
from django.http import HttpResponse
from .forms import User_Form
from .models import User,DoctorModel
from django.http import JsonResponse
from django.core.mail import send_mail

# Create your views here.
def index(request):
    if request.method=='POST':
        form=User_Form(request.POST)
        if form.is_valid():
            form.save()
            value="Hii "+request.POST.get('name')+" Welcome Back"
            print(value)
            return render(request,'AppointeeApp/index.html',{"show": value,'email':request.POST.get('email')+""})
    else:
        form=User_Form()
    return render(request,'AppointeeApp/index.html',{"form": form})

def login(request):
    if request.method=='POST':
        email=request.POST.get('email')
        password=request.POST.get('password')
        user=User.objects.all()
        for i in user:
            if i.email==email and i.password==password:
                print(i.name)
                value="Hii "+i.name+" Welcome Back"
                print(value)
                return render(request,'AppointeeApp/index.html',{"show": value,"email": i.email+""})

    return render(request,'AppointeeApp/index.html')

def markershow(request):
    value = request.GET.get('username', None)
    print(value)
    doctor=DoctorModel.objects.all()
    late=[]
    long=[]
    if value=="All":
        for i in doctor:
            late.append(i.late)
            long.append(i.long)
            print(i.late,"+++",i.long)
    else:
        for i in doctor:
            if i.category==value:
                late.append(i.late)
                long.append(i.long)
                print(i.late,"+++",i.long)

    data = {
        'late': late,
        'long': long
    }
    return JsonResponse(data)


def detailshow(request):
    latlng = request.GET.get('username', None)
    doctor=DoctorModel.objects.all()
    for i in doctor:
        if i.late==latlng:
            feild={'DT':'Dermatologist','OT':'Opthalmologist','ET':'Endocrinologist','PT':'Psychiatrist','NT':' Neurologist','CT':'Cardiologist','GT':'Gynecologist','PN':'Pediatrician','DT':'Dentist'}
            print(feild.get(i.category))
            data = {
                'name': i.name,
                'cate': feild.get(i.category),
                'clinic': i.clinic_name,
                'fees': i.fees,
                'exp': i.exp
            }
            break
    return JsonResponse(data)

def appoint(request):
    email = request.GET.get('username', None)
    send_mail('Dr Appointee','Your Appointment is Confirmed.Your appointment is this Date is 12 March 07:00 pm with Dr. Khatri','amanyadavwolvrine@gmail.com',[email],fail_silently=False)
    data={'name':'aman'}
    return JsonResponse(data)
