import os

from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse


# Create your views here.


class IndexView(View):
    """ Render main page"""

    def get(self, request):
        """ Return html for main application page"""

        abspath = open(os.path.join(settings.BASE_DIR, "static_dist/index.html"), 'r')
        return HttpResponse(content=abspath.read())