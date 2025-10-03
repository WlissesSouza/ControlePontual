from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Todas as rotas da API estão sob o prefixo /api/v1 <-- Vesão 1 padrao do rest
    path('api/v1/', include('authapi.urls')),
]
