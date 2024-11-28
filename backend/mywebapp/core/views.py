# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Message
from .serializers import MessageSerializer

class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve only the messages of the logged-in user
        messages = Message.objects.filter(user=request.user)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Create a new message for the logged-in user
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
