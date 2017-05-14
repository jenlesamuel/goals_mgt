from goals_mgt.settings.base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'goals_mgt',
        'USER': 'goalsuser',
        'PASSWORD': 'helivesA1!',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Update database configuration with $DATABASE_URL.
import dj_database_url
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)