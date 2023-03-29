from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed, HttpResponseNotFound
from django.middleware.csrf import get_token

# Create your views here.
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def ping(request):
    return JsonResponse({'result': 'OK'})

def videoplayer(request):
    if request.method == 'GET':
        try:
            print('player is RUN =)')
            return render(request, 'index.html')
        except:
            return HttpResponseNotFound()
    else:
        return HttpResponseNotFound(['GET'])