from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'igcse'

urlpatterns = [
    path('', views.landing_page, name='landing_page'),  
    path('igcse/igcse-response/', views.igcse_response, name='igcse_response'),  
    path('botiframe/', views.botiframe, name='botiframe'),
    path('igcse/is-educational/', views.isEudcationalRelated, name='is_educational'),
    path('igcse/image-analysis/', views.image_analysis, name='image_analysis'),
    path('igcse/recommend-videos/', views.recommend_links, name='recommend_links'),
    path('igcse/answer-question/', views.question_answer, name='answer_question'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)