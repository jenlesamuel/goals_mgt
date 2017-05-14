from rest_framework import serializers
from .models import GoalSetter, ProcrastinationEvaluation, PreviousGoals, Task
from django.contrib.auth.models import User
import my_lib.utils
from .models import Goal, WheelOfLifeEvaluation
from rest_framework.mixins import CreateModelMixin

class GoalSetterSerializer(serializers.ModelSerializer):

    class Meta:
        model = GoalSetter
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):

        username = validated_data['username']
        email = username
        password = validated_data['password']
        fullname = validated_data["fullname"]
        phone = validated_data["phone"]
        occupation = validated_data["occupation"]

        return GoalSetter.objects.create_user(username, email, password, fullname=fullname,
                                              phone=phone, occupation=occupation)

    def validate_username(self, value):
        try:
            my_lib.utils.get_user(value)
            raise serializers.ValidationError("Email already exist");

        except User.DoesNotExist:
            return value

    def validate_phone(self, value):
        try:
            GoalSetter.objects.get(phone=value)
            raise serializers.ValidationError('Phone number already exist')

        except GoalSetter.DoesNotExist:
            return value


    def update(self, instance, validated_data):
        pass

class ProcrastinationEvaluationSerializer(serializers.Serializer):

    user = serializers.CharField(max_length=100)
    q_n_a = serializers.CharField()
    timestamp = serializers.ReadOnlyField()

    def create(self, validated_data):
        username = validated_data["user"]
        questions = validated_data["q_n_a"]

        user = my_lib.utils.get_user(username)  # Don't wrap in try-except, execution only gets here if user exist

        return ProcrastinationEvaluation.objects.create(user=user, q_n_a=questions)

    def update(self, instance, validated_data):
        pass

    def validate_user(self, username):
        return my_lib.utils.validate_user(username)


class GoalSerializer(serializers.Serializer):

    id = serializers.ReadOnlyField()
    user = serializers.ReadOnlyField(source="user.id")
    title = serializers.CharField()
    values = serializers.CharField()
    timestamp = serializers.ReadOnlyField()

    def create(self, validated_data):
        return Goal.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.values = validated_data['values']
        instance.save()

        return instance


class WheelOfLifeEvaluationSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    user = serializers.ReadOnlyField(source="user.id")
    evaluation = serializers.CharField()
    timestamp = serializers.ReadOnlyField()

    def create(self, validated_data):
        return WheelOfLifeEvaluation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data['user']
        instance.evaluation = validated_data['evaluation']
        instance.save()

        return instance


class PreviousGoalsSerializer(serializers.Serializer):
    user = serializers.CharField()
    answers = serializers.CharField()
    timestamp = serializers.ReadOnlyField()

    def create(self, validated_data):
        username = validated_data['user']
        answers = validated_data['answers']

        user = my_lib.utils.get_user(username)

        return PreviousGoals.objects.create(user=user, answers=answers)

    def update(self, instance, validated_data):
        pass

    def validate_user(self, username):
        return my_lib.utils.validate_user(username)

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")
    goal = serializers.ReadOnlyField()
    timestamp = serializers.ReadOnlyField()

    class Meta:
        model = Task
        fields = '__all__'

    def create(self, validated_data):
        return Task.objects.create(**validated_data)



