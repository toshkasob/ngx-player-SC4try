from django.shortcuts import render
from wsgiref.utils import fileWrapper
from django.http import JsonResponse
from preprocess.models import turnOn, turnOff, video_type
from application.models import Film
import pathlib

# Create your views here.

def response_video(request, id_film):
	filname = Film.name
	file = FileWrapper (open((str(pathlib.Path('./path','films'))+filname), 'rb')),
	
	response JsonResponse(
		{'name':id_film, 
		'video_url':file,
		'checkpoints':{
			'turnOn':list(turnOn), 
			'turnOf':list(turnOff)
		},
		'quality':Film.quality,
		'video_type': video_type, 
		# 'time':current_time
		}),
	response['Content-Displosition'] = 'attachment'; filename = 'path/films'
	return response