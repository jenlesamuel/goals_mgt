from django.test import TestCase
from my_lib.factories import GoalSetterFactory, UserFactory, WheelOfLifeEvaluationFactory, \
GoalFactory, TaskFactory
from my_lib.utils import get_goal, get_user, get_wheel_evaluation, get_task
from goals.models import Goal, GoalSetter
import uuid


class UtilsTest(TestCase):

    def test_get_goal_returns_goal(self):

        goal_setter = GoalSetterFactory.create()
        goal = GoalFactory.create()

        goal_id = goal.id
        returned_goal = get_goal(goal_id)

        self.assertEqual(str(goal_id), str(returned_goal))

    def test_get_goal_returns_none_if_goal_not_exist(self):
        dumb_id = uuid.uuid4()
        self.assertEqual(get_goal(dumb_id), None)

    def test_get_user_returns_user_on_success(self):
        goal_setter = GoalSetterFactory.create()
        username = goal_setter.username
        retrieved_goal_setter = get_user(username)

        self.assertEqual(goal_setter.fullname, str(retrieved_goal_setter))
        self.assertEqual(username, retrieved_goal_setter.username)

    def test_get_user_throws_with_invalid_username(self):
        username = "jonses@blogg.com"
        pass
        #TODO: Learn to test methods that throw exception

    def test_get_wheel_evaluation_not_found(self):
        user = UserFactory.create()
        result = get_wheel_evaluation(user)

        self.assertEqual(result, None)

    def test_get_wheel_evaluation_success(self):
        pass
        '''evaluation = WheelOfLifeEvaluationFactory.create()
        user = UserFactory.create()

        result = get_wheel_evaluation(user)
        self.assertEqual(str(evaluation), str(result))'''

    def test_get_task_not_found(self):
        pass

    def test_get_task_success(self):
        task = TaskFactory.create()
        task_id = task.id
        self.assertEqual(str(task.id), str(get_task(task_id)))










