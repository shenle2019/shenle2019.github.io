---
title: Python-Web 开发入门001-搭建Web开发虚拟环境、Django Demo
date: '2022-04-06T00:00:00+00:00'
permalink: 2022/04/06/Python-Web-开发入门001-搭建Web开发虚拟环境、Django-Demo/
categories:
  - 开发
tags:
  - python
---

#### 虚拟环境

pip install virtualenv

#### pip的使用

pip目前的python中均已自带，如果2.7之前的老版本需要安装，则用easy\_install来安装pip。

pip基本操作，如安装卸载Django 2.0.7

安装 pip install Django==2.0.7

卸载 pip uninstall Django==2.0.7

其他重要命令：

pip list 查看已安装的 软件包

pip freeze 查看通过pip安装的软件包

pip show Django查看软件包的详细信息

pip install–upgrade Django更新软件包。

#### 虚拟环境搭建，virtualenv库

pip3 install virtualenv

查看virtualenv –help，注意目前没有–no-site-package（确保安装的虚拟环境不会有 已经安装过的包文件）选项。

则使用virtualenv -p D:\\pythontest\\python.exe env来创建虚拟环境，

进入env/Scripts中，执行【activate】使其激活，【deactivate】退出虚拟环境。

#### Django demo项目搭建

环境准备，同上。

在venv目录下创建目录：mkdir env wordspace

创建虚拟环境：virtualenv -p D:\\pythontest\\python.exe env

在env/Scripts中，执行【activate】激活当前虚拟环境env

安装Django：pip install Django==2.0.7

验证一下pip list或者python进入解释器，分别执行import django，django.VERSION查看对应版本。

#### 第一个Django项目

一般使用django-admin命令来快速创建。

激活env环境，在env/Scripts中，执行【activate】激活当前虚拟环境env

进入wordspace，创建hello的django项目，命令：django-admin startproject hello

一般只需要修改settings.py和urls.py，另外 几个不用动。

创建一个路由app\_name:python manage.py startapp app\_name

修改前一步骤中的settings.py，INSTALLED\_APPS中添加’app\_name’, ###new line选项。

此时在浏览器中可以输入[http://127.0.0.1:8000](http://127.0.0.1:8000/) 来访问默认admin的路由。

#### 路由配置和视图的使用

urls.py中添加不同的路由：

```python
from django.contrib import admin
from django.urls import path

from app_name import views

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'hello/', views.hello),
    path(r'multiplication/', views.multiplication),
]
```

在app\_name下的views.py中添加对应的处理路由函数：

```python
from django.shortcuts import render

from django.http import HttpResponse

def hello(request):
    if request.method == 'GET':
        return HttpResponse('Hello Python!')
# Create your views here.

def multiplication(request):
    if request.method == 'GET':
        table = '';
        for i in range(1, 10):
            for j in range(1, 10):
                table += '{}*{}={}\t'.format(i, j, i*j)
            table += '\n'
        return HttpResponse(table, content_type="text/plain")
```
