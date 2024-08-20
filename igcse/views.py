from django.shortcuts import render
from django.http import HttpResponse
import os
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated , AllowAny
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
import json
from .dynamic_analysis import igcse_prompt_generate, check_educationRelated , youtubelinks,extract_words, answer_question
from .chat_model import get_igcse_response
from .image_analysis import get_image_analysis

RETRIEVER_BASE_DIR = 'retreiver/igcse'

@api_view(['GET'])
@permission_classes([AllowAny]) 
def landing_page(request):
    return render(request , 'landing_page.html')


@api_view(['GET'])
@permission_classes([AllowAny]) 
def botiframe(request):
    return render(request , 'igcse_bot.html')


@api_view(['POST'])
@permission_classes([AllowAny]) 
def igcse_response(request):
     try:
        data = request.data
        question = data.get('question')
        if not question:
            return Response({'error': 'Question required'}, status = status.HTTP_400_BAD_REQUEST)
        prompt_template = igcse_prompt_generate(question)
    
        

        retriever_directory = os.path.join(RETRIEVER_BASE_DIR)
        api_key = os.environ.get('OPENAI_API_KEY')

        if not api_key:
            return Response({'error': 'API key not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        response = get_igcse_response(api_key, prompt_template, retriever_directory)
     
        # save_message.delay(request.user.id, key_id, question, 'user')
        # save_message.delay(request.user.id, key_id, response, 'bot')

        return Response({'response': response}, status=status.HTTP_200_OK)

     except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)

     except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

@api_view(['POST'])
@permission_classes([AllowAny])
def isEudcationalRelated(request):
    try:
        print("REQUEST HERE")
        data = request.data
        question = data.get('question')
        if not question:
            return Response({'error': 'Question Required'}, status=status.HTTP_400_BAD_REQUEST)
        
        isEducationRelated = check_educationRelated(question)
        print(isEducationRelated)
        return Response({'response': isEducationRelated}, status=status.HTTP_200_OK)
    
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)



 
@api_view(['POST'])
@permission_classes([AllowAny])
def image_analysis(request):
    data = request.data.get('image')
    print(data)
    analysis  = get_image_analysis(data)
    return Response({'response': analysis}, status=status.HTTP_200_OK)



@api_view(['POST'])
@permission_classes([AllowAny]) 
def recommend_links(request):
    try:
        key = os.environ.get('YOUTUBE_API_KEY')
        bot_response = request.data.get('question')
        words = extract_words(bot_response)
        links = youtubelinks(key, words)
        print("Words:", words)
        return Response({'links': links}, status=status.HTTP_200_OK)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def question_answer(request):
    question = request.data.get('question')
    answer = answer_question(question)
    return Response({'response':answer }, status=status.HTTP_200_OK)
    