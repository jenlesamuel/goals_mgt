from rest_framework.test import APIClient, APITestCase
from my_lib.factories import GoalSetterFactory, UserFactory, PLAIN_PASSWORD, GoalFactory, \
WheelOfLifeEvaluationFactory
from django.core.urlresolvers import reverse
from rest_framework import status
from goals.models import GoalSetter
import base64
from django.contrib.auth.models import User
import json
import uuid


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(('%s:%s' % (username, password)).encode('ascii')).decode()


class GoalSetterRegisterViewTestTest(APITestCase):

    def setUp(self):
        self.client = APIClient()

    def test_post_fails_required_fields_absent(self):
        data = {}
        required_data = {
            'occupation': ['This field is required.'],
            'fullname': ['This field is required.'],
            'username': ['This field is required.'],
            'phone': ['This field is required.'],
            'password': ['This field is required.']
        }

        url = reverse("goals:create_goal_setter")

        response = self.client.post(url, data, format='json')
        status_code = response.status_code

        self.assertDictEqual(response.data, required_data)
        self.assertEqual(status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_success(self):
        data = {
            'username': GoalSetterFactory.username,
            'password': PLAIN_PASSWORD,
            'fullname': GoalSetterFactory.fullname,
            'phone': GoalSetterFactory.phone,
            'occupation': GoalSetterFactory.occupation
        }

        url = reverse("goals:create_goal_setter")
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue("user_id" in response.data)

'''
class LoginViewTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.goal_setter = GoalSetterFactory.create()

    def no_test_login_no_auth_failure(self):
        pass

    def no_test_login_success(self):
        url = reverse("goals:login")
        username = self.goal_setter.username
        password = PLAIN_PASSWORD
        auth = get_basic_auth_header(username, password)

        self.client.credentials(HTTP_AUTHORIZATION=auth)
        response = self.client.post(url, None, format="json")
        self.assertTrue('token' in response.data)
        self.assertTrue('fullname' in response.data)
        self.assertEqual(response.data['fullname'], self.goal_setter.fullname)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class WheelOfLifeEvaluationViewTest(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.goal_setter = GoalSetterFactory.create()
        self.user = UserFactory.create()
        self.url = reverse("goals:wheel")

    def test_post_authentication_failed(self):
        pass

    def test_post_required_fields_falure(self):
        self.client.force_authenticate(self.user)

        response = self.client.post(self.url)
        data = response.data
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertDictEqual(response.data, {'evaluation': ['This field is required.']})

    def no_test_post_success(self):
        evaluation = "{}".format({"q1": 4, "q2": 2, "q3": 5})

        self.client.force_authenticate(self.user)
        response = self.client.post(self.url, {"evaluation": evaluation}, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_authentication_failed(self):
        pass

    def no_test_get_wheel_evaluation_not_found(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def no_test_get_wheel_evaluation_success(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)



class TaskViewTest(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("goals:task_admin")
        self.goal_setter = GoalSetterFactory.create()

    def no_test_post_success(self):
        goal = GoalFactory.create()
        goal_id = goal.id

        data = {
            "title": "Solve binary tree algo question",
            "values": json.dumps({
                "description": "Solve hackerank binary tree question",
                "goal-id": str(goal_id),
                "life-comp-index": "3"
            })
        }

        # Attempt login to get token
        login_url = reverse("goals:login")
        username = self.goal_setter.username
        password = PLAIN_PASSWORD
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header(username, password))
        login_response = self.client.post(login_url)
        self.assertTrue('token' in login_response.data)
        token = login_response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(token))

        response = self.client.post(self.url, data, format='json')

        self.assertTrue('id' in response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def no_test_post_duplicate_title(self):
        pass

    def no_test_post_goal_not_exist(self):
        pass
'''






















