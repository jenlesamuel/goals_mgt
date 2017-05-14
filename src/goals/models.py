from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.


class GoalSetter(User):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='goal_setter')
    fullname = models.CharField(max_length=30)
    phone = models.CharField(max_length=15, unique=True)
    occupation = models.CharField(max_length=80)

    def __str__(self):
        return self.fullname


class ProcrastinationEvaluation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    q_n_a = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)


class Goal(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    values = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return "{}".format(self.id)

class WheelOfLifeEvaluation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    evaluation = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.id,)


class PreviousGoals(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    answers = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    values = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{}'.format(self.id)
