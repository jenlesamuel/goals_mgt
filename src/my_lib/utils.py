from goals.models import GoalSetter, Goal, WheelOfLifeEvaluation, Task
from rest_framework import serializers


def get_user(username):
    return GoalSetter.objects.get(username=username)


def get_details(username):
    '''
    Gets a user's(goal setter) fullname and id given the username
    :param username:
    :return: string
    '''
    user = GoalSetter.objects.get(username=username)
    goal_setter = user.goalsetter
    return [goal_setter.id, goal_setter.fullname]


def validate_user(username):
    try:
        get_user(username)
        return username

    except GoalSetter.DoesNotExist:
        raise serializers.ValidationError("User does not exist")

def get_goal(goal_id):
    '''
    Returns a goal given its id
    :param goal_id:
    :return: A goal object
    '''

    try:
        return Goal.objects.get(id=goal_id)
    except Goal.DoesNotExist:
        return None

def get_wheel_evaluation(user):
    '''
    Returns the wheel of life evaluation for a user
    :param user:
    :return: WheelOfLifeEvaluation or None
    '''

    try:
        return WheelOfLifeEvaluation.objects.get(user=user)
    except WheelOfLifeEvaluation.DoesNotExist:
        return None


def get_task(task_id):
    '''
    Returns a task given its id
    :param task_id:
    :return: Task object
    :raises: DoesNotExist exception
    '''
    return Task.objects.get(id=task_id)
