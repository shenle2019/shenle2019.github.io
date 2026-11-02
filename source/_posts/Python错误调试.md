---
title: Python错误调试
date: '2022-01-03T00:00:00+00:00'
permalink: 2022/01/03/Python错误调试/
categories:
  - 测试
tags:
  - python
---

#### 抛出异常

抛出异常：停止执行此函数代码，将程序执行转到except语句。

raise语句，包含：

-   raise关键字
-   对Exception函数的调用
-   传递给Exception函数的字符串，包含有用的出错信息。

try except使用方法：

```python
def boxPrint(symbol, width, height):
    if len(symbol) != 1:
        raise Exception('使用的字符须是单个字符.')
    if width <= 2:
        raise Exception('宽度必须是大于2.')
    if height <= 2:
        raise Exception('高度必须是大于2.')
    print(symbol * width)
    for i in range(height - 2):
        print(symbol + (' ' * (width - 2)) + symbol)
    print(symbol * width)

for sym, w, h in (('*', 4, 4),('0', 20, 5), ('x', 1, 3),('ZZ', 3, 3),('a', 8, 5)):
    try:
        boxPrint(sym, w, h)
    except Exception as err:
        print('该错误的原因:' + str(err))
```

#### 取得反向跟踪的字符串

可以使用traceback模块处理异常。

参考：[https://www.cnblogs.com/shangpolu/p/7206348.html](https://www.cnblogs.com/shangpolu/p/7206348.html)

交互环境调试：

```plaintext
import traceback

try:
    raise Exception('this is the error message')
except:
    errorFile = open('errorInfo.txt', 'w')
    errorFile.write(traceback.format_exc())
    errorFile.close()
    print('the traceback info was written to errorInfo.txt')
```

输出errorInfo.txt：

```plaintext
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
Exception: this is the error message
```

#### 断言

asser 语句：

assert 条件 ，当条件为False时显示的字符串。

#### 日志

-   使用日志模块
    
    作用：
    
    -   程序调试
        
    -   了解软件程序运行情况，是否正常
        
    -   软件程序运行故障分析与问题定位
        

```python
import logging
logging.basicConfig(level= logging.DEBUG, format= '%(asctime)s - %(levelname)s - %(message)s')
```

-   不要使用print
    
-   日志级别
    
    日志等级（level）
    
    描述
    
    DEBUG
    
    最详细的日志信息，典型应用场景是 问题诊断
    
    INFO
    
    信息详细程度仅次于DEBUG，通常只记录关键节点信息，用于确认一切都是按照我们预期的那样进行工作
    
    WARNING
    
    当某些不期望的事情发生时记录的信息（如，磁盘可用空间较低），但是此时应用程序还是正常运行的
    
    ERROR
    
    由于一个更严重的问题导致某些功能不能正常运行时记录的信息
    
    CRITICAL
    
    当发生严重错误，导致应用程序不能继续运行时记录的信息
    

-   禁用日志
    
    logging.disable() 可传入一个日志级别，禁止该级别及以下的日志输出
    
-   将日志记录到文件
    
    basicCconfig中的filename可设置文件名，保持屏幕清爽。
    

-   logging.basicConfig()函数说明

该方法用于为logging日志系统做一些基本配置，方法定义如下：

```plaintext
logging.basicConfig(**kwargs)
```

该函数可接收的关键字参数如下：

参数名称

描述

filename

指定日志输出目标文件的文件名，指定该设置项后日志信心就不会被输出到控制台了

filemode

指定日志文件的打开模式，默认为’a’。需要注意的是，该选项要在filename指定时才有效

format

指定日志格式字符串，即指定日志输出时所包含的字段信息以及它们的顺序。logging模块定义的格式字段下面会列出。

datefmt

指定日期/时间格式。需要注意的是，该选项要在format中包含时间字段%(asctime)s时才有效

level

指定日志器的日志级别

stream

指定日志输出目标stream，如sys.stdout、sys.stderr以及网络stream。需要说明的是，stream和filename不能同时提供，否则会引发 `ValueError`异常

style

Python 3.2中新添加的配置项。指定format格式字符串的风格，可取值为’%’、’{‘和’$’，默认为’%’

handlers

Python 3.3中新添加的配置项。该选项如果被指定，它应该是一个创建了多个Handler的可迭代对象，这些handler将会被添加到root logger。需要说明的是：filename、stream和handlers这三个配置项只能有一个存在，不能同时出现2个或3个，否则会引发ValueError异常。

-   logging模块定义的格式字符串字段

我们来列举一下logging模块中定义好的可以用于format格式字符串中字段有哪些：

字段/属性名称

使用格式

描述

asctime

%(asctime)s

日志事件发生的时间–人类可读时间，如：2003-07-08 16:49:45,896

created

%(created)f

日志事件发生的时间–时间戳，就是当时调用time.time()函数返回的值

relativeCreated

%(relativeCreated)d

日志事件发生的时间相对于logging模块加载时间的相对毫秒数（目前还不知道干嘛用的）

msecs

%(msecs)d

日志事件发生事件的毫秒部分

levelname

%(levelname)s

该日志记录的文字形式的日志级别（’DEBUG’, ‘INFO’, ‘WARNING’, ‘ERROR’, ‘CRITICAL’）

levelno

%(levelno)s

该日志记录的数字形式的日志级别（10, 20, 30, 40, 50）

name

%(name)s

所使用的日志器名称，默认是’root’，因为默认使用的是 rootLogger

message

%(message)s

日志记录的文本内容，通过 `msg % args`计算得到的

pathname

%(pathname)s

调用日志记录函数的源码文件的全路径

filename

%(filename)s

pathname的文件名部分，包含文件后缀

module

%(module)s

filename的名称部分，不包含后缀

lineno

%(lineno)d

调用日志记录函数的源代码所在的行号

funcName

%(funcName)s

调用日志记录函数的函数名

process

%(process)d

进程ID

processName

%(processName)s

进程名称，Python 3.1新增

thread

%(thread)d

线程ID

threadName

%(thread)s

线程名称

简单测试：

```python
先简单配置下日志器的日志级别
logging.basicConfig(level=logging.DEBUG)

logging.debug("This is a debug log.")
logging.info("This is a info log.")
logging.warning("This is a warning log.")
logging.error("This is a error log.")
logging.critical("This is a critical log.")
输出结果：

DEBUG:root:This is a debug log.
INFO:root:This is a info log.
WARNING:root:This is a warning log.
ERROR:root:This is a error log.
CRITICAL:root:This is a critical log.
```

学习一下python的日志模块logging，可以参考如下博客，写得很详细

[https://www.cnblogs.com/yyds/p/6901864.html](https://www.cnblogs.com/yyds/p/6901864.html)

[https://www.cnblogs.com/goodhacker/p/3355660.html](https://www.cnblogs.com/goodhacker/p/3355660.html)

[https://cuiqingcai.com/6080.html](https://cuiqingcai.com/6080.html)

[https://www.cnblogs.com/hanmk/p/10448963.html](https://www.cnblogs.com/hanmk/p/10448963.html)

新建一个logs文件夹，用来存放输出的日志文件；然后在utils工具中创建一个logger.py，封装日志调用方法：

```python
# -*- coding:utf-8 -*-
import logging
import os
from utils import getcwd


log_path = os.path.dirname(getcwd.get_cwd())
print(log_path)
class Logger:
    def __init__(self,loggername):

        #创建一个logger
        self.logger = logging.getLogger(loggername)
        self.logger.setLevel(logging.DEBUG)

        #创建一个handler，用于写入日志文件
        log_path = os.path.dirname(getcwd.get_cwd())+"/logs/" # 指定文件输出路径，注意logs是个文件夹，一定要加上/，不然会导致输出路径错误，把logs变成文件名的一部分了
        logname = log_path + 'out.log' #指定输出的日志文件名
        fh = logging.FileHandler(logname,encoding = 'utf-8')  # 指定utf-8格式编码，避免输出的日志文本乱码
        fh.setLevel(logging.DEBUG)

        #创建一个handler，用于将日志输出到控制台
        ch = logging.StreamHandler()
        ch.setLevel(logging.DEBUG)

        # 定义handler的输出格式
        formatter = logging.Formatter('%(asctime)s-%(name)s-%(levelname)s-%(message)s')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)

        # 给logger添加handler
        self.logger.addHandler(fh)
        self.logger.addHandler(ch)


    def get_log(self):      """定义一个函数，回调logger实例"""
        return self.logger  


if __name__ == '__main__':
    t = Logger("hmk").get_log().debug("User %s is loging" % 'jeck')
```

run\_main.py

```python
# coding: utf-8
# author: hmk

from base.main import RunMethod
from get_datas.get_data import GetData
from utils.handle_excel import HandleExcel
import json
from utils.logger import Logger


class RunMain:
    def __init__(self):
        """实例化写好的类，备用"""
        self.run_method = RunMethod()
        self.get_data = GetData()
        self.excel = HandleExcel()
        self.logger = Logger(__name__)

    def run(self):
        count = self.get_data.get_nrows()
        # print(count)
        for i in range(1, count):
            priority = self.get_data.get_priority(i)  # 获取用例的优先级priority
            url = self.get_data.get_url(i)  # 获取用例的url
            method = self.get_data.get_method(i)  # 获取请求方法
            params = self.get_data.get_params(i)  # 获取参数(此处取出来的数据是字符串格式)
            params_load = json.loads(params)  # 将获取到的参数反序列化，即转化为字典
            except_value = self.get_data.get_except_value(i)  # 获取预期结果值
            if priority == 'H':
                r = self.run_method.run_main(method, url, params_load, header=None)  # 如果是高优先级用例，则执行
                
                # print(r)
                self.logger.get_log().debug('第'+str(i)+'个接口的返回结果为:%s',r) # 输出接口响应内容
                
                # print(type(r))
                if except_value in r:
                    
                    # print(self.get_data.get_caseSeq(i) + '测试通过')
                    self.logger.get_log().debug('第' + str(i) + '接口测试通过')
                    
                    # self.get_data.write_values(i, 'PASS')  # 调用get_data.py文件中的write_values()方法
                    self.excel.write_value(i, 11, 'pass')  # 调用handle_excel.py文件中的write_value()方法
                else:
                    
                    # print(self.get_data.get_caseSeq(i) + '执行失败')
                    self.logger.get_log().debug('第' + str(i) + '接口测试不通过')
                    
                    # self.get_data.write_values(i, 'FAIL')
                    self.excel.write_value(i, 11, 'fail')


if __name__ == '__main__':
    t = RunMain()
    t.run()
```

### 捕获 Traceback

如果遇到错误，我们更希望报错时出现的详细 Traceback 信息，便于调试，利用 logging 模块我们可以非常方便地实现这个记录，我们用一个实例来感受一下：

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(level=logging.DEBUG)

# Formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# FileHandler
file_handler = logging.FileHandler('result.log')
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# StreamHandler
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)

# Log
logger.info('Start')
logger.warning('Something maybe fail.')
try:
    result = 10 / 0
except Exception:
    logger.error('Faild to get result', exc_info=True)
logger.info('Finished')
```

这里我们在 error () 方法中添加了一个参数，将 exc\_info 设置为了 True，这样我们就可以输出执行过程中的信息了，即完整的 Traceback 信息。 运行结果如下：

```plaintext
2018-06-03 16:00:15,382 - __main__ - INFO - Start print log
2018-06-03 16:00:15,382 - __main__ - DEBUG - Do something
2018-06-03 16:00:15,382 - __main__ - WARNING - Something maybe fail.
2018-06-03 16:00:15,382 - __main__ - ERROR - Faild to get result
Traceback (most recent call last):
  File "/private/var/books/aicodes/loggingtest/demo8.py", line 23, in <module>
    result = 10 / 0
ZeroDivisionError: division by zero
2018-06-03 16:00:15,383 - __main__ - INFO - Finished
```

可以看到这样我们就非常方便地记录下来了报错的信息，一旦出现了错误，我们也能非常方便地排查。
