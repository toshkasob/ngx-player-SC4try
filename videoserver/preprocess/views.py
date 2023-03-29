from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed
from os import popen2

# Create your views here.
def do_preprocess_epilepsy(film_id, processing):
    exe = ('../3rd/preprocess.sh %s', processing)
    try:
		result = popen2(processing)
        return result
    except:
        result = [0.0, 0.0]
    	return HttpResponse([-1,-1])