from django.urls import path

from .views import *

urlpatterns = [
    # Rota para obter o access token e refresh token usando login (username + senha)
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # Rota para renovar o access token com um refresh token válido
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),

]
