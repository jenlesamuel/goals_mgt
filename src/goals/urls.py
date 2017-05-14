from django.conf.urls import url, include
from .views import GoalSetterRegisterView, CreateProcrastinationEvaluation, UploadImage, \
    LoginView, GoalView, GoalWithLimitView, WheelOfLifeEvaluationView, PreviousGoalsView, PaginatedGoalsView,\
    TaskView, PaginatedTaskView

app_name = 'goals'

urlpatterns = [
    url(r'^users/$', GoalSetterRegisterView.as_view(), name='create_goal_setter'),
    url(r'^procrastination/$', CreateProcrastinationEvaluation.as_view(), name="procrastination"),
    url(r'^images/$', UploadImage.as_view(), name="upload_image"),
    url(r'^login/$', LoginView.as_view(), name="login"),
    url(r'^goals/paged/$', PaginatedGoalsView.as_view(), name="get_paged_goals"),
    url(r'^goals/$', GoalWithLimitView.as_view(),
        name="get_limited_goals"), #change this to be in GoalView
    url(r'^goals/(?P<goal_id>[0-9A-Za-z\-]+)/$', GoalView.as_view(), name="goals_url"),
    url(r'^wheel/$', WheelOfLifeEvaluationView.as_view(), name='wheel'),
    url(r'^previous-goals/$', PreviousGoalsView.as_view(), name='previous_goals'),
    url(r'^task/$', TaskView.as_view(), name='task_admin'),
    url(r'^goals/(?P<goal_id>[0-9A-Za-z\-]+)/tasks/paged/$',
        PaginatedTaskView.as_view(), name='paginated_tasks'),
    url(r'api/auth/', include('knox.urls')),
]
