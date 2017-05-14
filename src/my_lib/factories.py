import factory
from goals.models import GoalSetter, Goal, WheelOfLifeEvaluation, Task
from django.contrib.auth.models import User



class UserFactory(factory.DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ("email",)

    username = factory.LazyAttribute(lambda obj: "%s@mydomain.com" % obj.email_prefix)
    email = username
    password = factory.PostGenerationMethodCall('set_password', factory.SelfAttribute("plain_password"))

    class Params:
        email_prefix = "joebloggs"
        plain_password = "bloggs"

class GoalSetterFactory(UserFactory):
    
    user = factory.SubFactory(UserFactory)
    fullname = factory.Faker('name')
    phone = factory.Faker('phone_number')
    occupation = factory.Faker('job')

'''
class GoalFactory(factory.DjangoModelFactory):
    #user = GoalSetterFactory.create()
    values = {
        "title": "title",
        "component": "component",
        "q1": "a1",
        "q2": "a2"
    }

    class Meta:
        model = Goal
        django_get_or_create = ("user",)


class UserFactory(factory.DjangoModelFactory):
    username = "user2@mydomain.com"
    email = username
    password = factory.PostGenerationMethodCall('set_password', PLAIN_PASSWORD)

    class Meta:
        model = User
        django_get_or_create = ("username",)


class WheelOfLifeEvaluationFactory(factory.DjangoModelFactory):
    #user = UserFactory.create()
    evaluation = {
        "q1": "a1",
        "q2": "a2",
        "q3": "a3"
    }

    class Meta:
        model = WheelOfLifeEvaluation
        django_get_or_create = ("user",)

class TaskFactory(factory.DjangoModelFactory):
    #user = UserFactory.create()
    #goal = GoalFactory.create()
    title = 'Study ROR daily',
    values = {
        'description': 'Will study ROR from 5am - 6am',
        'goal-id': '9j099876y0jllkj0930990',
        'life-comp-index': '2'
    }

    class Meta:
        model = Task
        django_get_or_create = ('title',) '''