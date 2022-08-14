"""
Django settings for dongjg project.

Generated by 'django-admin startproject' using Django 3.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
from pymysql import install_as_MySQLdb
from pathlib import Path
import os

install_as_MySQLdb()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '!(pit5s6ept)&de3um4#s@qm076!hrke^7c#5)@prql-iwa8u4'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True # 这个地方可以修改为False TRUE

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'Books',
    'rest_framework',
    'corsheaders',
    'django_filters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware' ,  # 注册中间件
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = [
    'https://localhost:8080'
]
CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)


ROOT_URLCONF = 'dongjg.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR,'templates')], #模板目录
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dongjg.wsgi.application'


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100
}


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }


DATABASES = {
      'default': {
          'ENGINE': 'django.db.backends.mysql', # 数据库引擎
          'NAME': 'django_test', # 数据库名称
          'HOST': '119.29.130.157', # 数据库主机119.29.130.157
          'PORT': '23619', # 数据库端口
          'USER': 'xdDu@informap', # 数据库用户名
          'PASSWORD': 'qxjd=yangbo@=' # 数据库密码
      }
  }

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

# LANGUAGE_CODE = 'en-us'
LANGUAGE_CODE = 'zh-hans'

# TIME_ZONE = 'UTC'
TIME_ZONE = 'Asia/Shanghai'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'dongjg')
STATICFILES_DIRS = (
    ('Books/static/css', os.path.join(STATIC_ROOT, 'Books/static/css')),
    ('Books/static/images', os.path.join(STATIC_ROOT, 'Books/static/images')),
    ('Books/static/js', os.path.join(STATIC_ROOT, 'Books/static/js')),
    ('Books/static/font', os.path.join(STATIC_ROOT, 'Books/static/font')),
      ('templates/Books', os.path.join(STATIC_ROOT, 'templates/Books')),
  
)
# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'templates/Books/')
# STATICFILES_DIRS = (

#     ('html', os.path.join(STATIC_ROOT, 'html')),
# )


MEDIA_URL = '/images/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'static/images')

# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'templates/Books/')
# STATICFILES_DIRS = (

#     ('html', os.path.join(STATIC_ROOT, 'html')),
# )

#smtp configuration

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = '587'
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'xiaodianmap@gmail.com'
EMAIL_HOST_PASSWORD = 'cgzhjszy0430'
