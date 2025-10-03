from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        # Adiciona os dados do usuário à resposta
        data['user'] = {
            'username': user.username,
            'first_name': user.first_name,
            'email': user.email,
        }

        return data


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Aqui você acessa o usuário via o novo access token
        access_token = data['access']
        from rest_framework_simplejwt.tokens import AccessToken
        token = AccessToken(access_token)
        user_id = token['user_id']

        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(id=user_id)

        data['user'] = {
            'username': user.username,
            'first_name': user.first_name,
            'email': user.email,
        }

        return data


class CustomTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
