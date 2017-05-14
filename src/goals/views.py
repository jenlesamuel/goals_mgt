from rest_framework import generics, status, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .serializers import GoalSetterSerializer, ProcrastinationEvaluationSerializer, GoalSerializer, \
    WheelOfLifeEvaluationSerializer, PreviousGoalsSerializer, TaskSerializer
from .models import Goal, GoalSetter
import cloudinary
import cloudinary.uploader
import my_lib.utils
from rest_framework.permissions import IsAuthenticated
from knox.models import AuthToken
from rest_framework.authentication import BasicAuthentication
from knox.auth import TokenAuthentication
from rest_framework.mixins import CreateModelMixin, UpdateModelMixin
import pdb
import uuid
import json

class GoalSetterRegisterView(generics.GenericAPIView):

    serializer_class = GoalSetterSerializer
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        data = request.data

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        goal_setter = serializer.save()

        return Response({"user_id": goal_setter.id}, status.HTTP_201_CREATED)

class CreateProcrastinationEvaluation(generics.GenericAPIView):
    serializer_class = ProcrastinationEvaluationSerializer
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response_data = {
            'username': serializer.validated_data['user']
        }

        return Response(response_data, status.HTTP_201_CREATED)


class UploadImage(generics.GenericAPIView):

    def post(self, request):
        data = request.data

        file = data["file"]
        upload_preset = data["upload_preset"]
        goal_type = data["goal_type"]
        username = data["username"]
        public_id = username+'_'+goal_type

        response = cloudinary.uploader.upload(file, upload_preset=upload_preset, public_id=public_id)

        return Response(response, status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    authentication_classes = (BasicAuthentication,)
    permission_classes = ()

    def post(self, request):
        user = request.user
        token = AuthToken.objects.create(user)

        goal_setter = GoalSetter.objects.get(user=user)

        return Response({
            'fullname': goal_setter.fullname,
            'token': token
        }, status=status.HTTP_200_OK)

class GoalView(generics.GenericAPIView,
               UpdateModelMixin):
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request, goal_id):
        goal = my_lib.utils.get_goal(goal_id)

        if goal is not None:
            serializer = self.get_serializer(goal)
            return Response({"values": serializer.data["values"]}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Resource not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, goal_id):
        goal = my_lib.utils.get_goal(goal_id)

        if goal is not None:
            serializer = self.get_serializer(instance=goal, data=request.data)
            serializer.is_valid(raise_exception=True)

            self.perform_update(serializer)

            return Response({"id": serializer.data['id']}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Requested resource not found"}, status=status.HTTP_404_NOT_FOUND)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class GoalWithLimitView(generics.GenericAPIView,
                        CreateModelMixin):

    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request):

        serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self):
        limit = int(self.request.GET['limit'])
        return Goal.objects.filter(user=self.request.user).reverse()[:limit]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response({"id": serializer.data['id']}, status.HTTP_201_CREATED)

    '''def put(self, request, id):

        print(id)'''

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PaginatedGoalsView(generics.ListAPIView):
    serializer_class = GoalSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user)


class WheelOfLifeEvaluationView(generics.GenericAPIView,
                                CreateModelMixin,
                                UpdateModelMixin):
    serializer_class = WheelOfLifeEvaluationSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        user = request.user
        evaluation = my_lib.utils.get_wheel_evaluation(user)

        if evaluation:
            serializer = self.get_serializer(evaluation)
            evaluation_values = serializer.data["evaluation"]

            return Response({"evaluation": evaluation_values}, status=status.HTTP_200_OK)

        return Response({"detail": "Resource not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        user = request.user
        evaluation = my_lib.utils.get_wheel_evaluation(user)
        data = request.data

        if evaluation:
            # record already exist, update it
            serializer = self.get_serializer(evaluation, data=data)
            serializer.is_valid(raise_exception=True)

            self.perform_update(serializer)

        else:
            # insert a new record
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

        return Response(serializer.data["id"], status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        # Overriding CreateModelMixins perform_create()
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Overriding UpdateModelMixins perform_update()
        serializer.save(user=self.request.user)


class PreviousGoalsView(generics.GenericAPIView):
    serializer_class = PreviousGoalsSerializer
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):

        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        serializer.save()

        response_data = {"username": serializer.validated_data['user']}

        return Response(response_data, status.HTTP_201_CREATED)


class TaskView(generics.GenericAPIView,
               CreateModelMixin):
    serializer_class = TaskSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            data = request.data
            # TODO: remove duplicate title data
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            self.perform_create(serializer)

            return Response({'id': serializer.data['id']}, status=status.HTTP_201_CREATED)
        except Goal.DoesNotExist:
            return Response({'detail': 'Goal object not found'}, status=status.HTTP_404_NOT_FOUND)

    def perform_create(self, serializer):
        data = self.request.data
        user = self.request.user

        values = json.loads(data['values'])
        goal_id = uuid.UUID(values['goal-id'])
        goal = my_lib.utils.get_goal(goal_id)
        if not goal:
            raise Goal.DoesNotExist('Goal object not found')

        serializer.save(user=user, goal=goal)


class PaginatedGoalsView(generics.ListAPIView):
    serializer_class = GoalSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user)


class PaginatedTaskView(generics.ListAPIView):
    serializer_class = TaskSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, )
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        print(self.request.GET)
        print(self.kwargs)
        #goal_id = self.request.GET.get("goal_id")
        goal_id = self.kwargs["goal_id"]
        goal = my_lib.utils.get_goal(goal_id)
        return Task.objects.filter(user=user, goal=goal)

        








