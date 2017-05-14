import factory
from django.test import TestCase
from goals.models import GoalSetter
from my_lib.factories import GoalSetterFactory, WheelOfLifeEvaluationFactory, TaskFactory


class GoalSetterTests(TestCase):
    def setUp(self):
        self.goal_setter = GoalSetterFactory.create()

    def test_unicode(self):
        self.assertEqual(str(self.goal_setter), self.goal_setter.fullname)


class WheelOfLifeEvaluationTests(TestCase):

    def test_unicode(self):
        evaluation = WheelOfLifeEvaluationFactory.create()
        self.assertEqual(str(evaluation.id), str(evaluation))


class TaskTest(TestCase):

    def test_unicode(self):
        task = TaskFactory.create()
        self.assertEqual(str(task), str(task.id))