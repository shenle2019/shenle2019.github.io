---
title: 处理CSV文件和JSON数据
date: '2022-02-21T00:00:00+00:00'
permalink: 2022/02/21/处理CSV文件和JSON数据/
categories:
  - 测试
tags:
  - python
---

### 处理CSV文件和JSON数据

#### CSV模块

csv文件中：

• 值没有类型，所有东西都是字符串；

• 没有字体大小或颜色的设置；

• 没有多个工作表；

• 不能指定单元格的宽度和高度；

• 不能合并单元格；

• 不能嵌入图像或图表

#### Reader对象

```python
 >>> import csv
 >>> exampleFile = open('example.csv')
 >>> exampleReader = csv.reader(exampleFile)
 >>> exampleData = list(exampleReader)
 >>> exampleData
[['4/5/2015 13:34', 'Apples', '73'], ['4/5/2015 3:41', 'Cherries', '85'],
['4/6/2015 12:46', 'Pears', '14'], ['4/8/2015 8:59', 'Oranges', '52'],
['4/10/2015 2:07', 'Apples', '152'], ['4/10/2015 18:10', 'Bananas', '23'],
['4/10/2015 2:40', 'Strawberries', '98']]
>>> exampleData[0][0]
'4/5/2015 13:34'
>>> exampleData[0][1]
'Apples'
>>> exampleData[0][2]
'73'
>>> exampleData[1][1]
'Cherries'
>>> exampleData[6][1]
'Strawberries'
```

#### 在 for 循环中，从 Reader 对象读取数据

```python
>>> import csv
>>> exampleFile = open('example.csv')
>>> exampleReader = csv.reader(exampleFile)
>>> for row in exampleReader:
print('Row #' + str(exampleReader.line_num) + ' ' + str(row))
Row #1 ['4/5/2015 13:34', 'Apples', '73']
Row #2 ['4/5/2015 3:41', 'Cherries', '85']
Row #3 ['4/6/2015 12:46', 'Pears', '14']
Row #4 ['4/8/2015 8:59', 'Oranges', '52']
Row #5 ['4/10/2015 2:07', 'Apples', '152']
Row #6 ['4/10/2015 18:10', 'Bananas', '23']
Row #7 ['4/10/2015 2:40', 'Strawberries', '98']
```

#### Writer 对象

```python
>>> import csv
 >>> outputFile = open('output.csv', 'w', newline='')
 >>> outputWriter = csv.writer(outputFile)
>>> outputWriter.writerow(['spam', 'eggs', 'bacon', 'ham'])
21
>>> outputWriter.writerow(['Hello, world!', 'eggs', 'bacon', 'ham'])
32
>>> outputWriter.writerow([1, 2, 3.141592, 4])
16
>>> outputFile.close()

spam,eggs,bacon,ham
"Hello, world!",eggs,bacon,ham
1,2,3.141592,4
```

#### delimiter 和 lineterminator 关键字参数

分别设置行分隔符和换行符。

```python
>>> import csv
>>> csvFile = open('example.tsv', 'w', newline='')
 >>> csvWriter = csv.writer(csvFile, delimiter='\t', lineterminator='\n\n')
>>> csvWriter.writerow(['apples', 'oranges', 'grapes'])
24
>>> csvWriter.writerow(['eggs', 'bacon', 'ham'])
17
>>> csvWriter.writerow(['spam', 'spam', 'spam', 'spam', 'spam', 'spam'])
32
>>> csvFile.close()

apples oranges grapes
eggs bacon ham
spam spam spam spam spam spam
```

#### 项目：从 CSV 文件中删除表头

假设你有一个枯燥的任务，要删除几百CSV 文件的第一行。也许你会将它们送入一

个自动化的过程，只需要数据，不需要每列顶部的表头。可以在Excel 中打开每个文件，

删除第一行，并重新保存该文件，但这需要几个小时。让我们写一个程序来做这件事。

该程序需要打开当前工作目录中所有扩展名为.csv 的文件，读取 CSV 文件的内

容，并除掉第一行的内容重新写入同名的文件。这将用新的、无表头的内容替换

CSV 文件的旧内容。

总的来说，该程序必须做到以下几点：

• 找出当前工作目录中的所有 CSV 文件。

• 读取每个文件的全部内容。

• 跳过第一行，将内容写入一个新的 CSV 文件。

在代码层面上，这意味着该程序需要做到以下几点：

• 循环遍历从 os.listdir()得到的文件列表，跳过非 CSV 文件。

• 创建一个 CSV Reader 对象，读取该文件的内容，利用 line\_num 属性确定要跳

过哪一行。

• 创建一个 CSV Writer 对象，将读入的数据写入新文件。

针对这个项目，打开一个新的文件编辑器窗口，并保存为 removeCsvHeader.py。

```python
#! python3

import csv, os

###os.makedirs() 方法用于递归创建目录。
###如果子目录创建失败或者已经存在，会抛出一个 OSError 的异常，Windows上Error 183 即为目录已经存在的异常错误。
###如果第一个参数 path 只有一级，则 mkdir() 函数相同。

os.makedirs('HeaderRemoved',0o777, exist_ok=True)

###循环当前目录，查找csv文件，如果是，则进入
###os.listdir() 方法用于返回指定的文件夹包含的文件或文件夹的名字的列表。
for csvFilename in os.listdir(r'.\\removeCsvHeader'):
    if not csvFilename.endswith('.csv'):
        continue  #skip non-csv file

    print('Removing header from ' + csvFilename + '...')
    ### 开始读取文件，删除第一行的内容
    csvcontent = []
    csvFileObj = open(r'.\\removeCsvHeader\\' + csvFilename)
    readerObj = csv.reader(csvFileObj)
    for row in readerObj:
        if readerObj.line_num == 1:
            continue
        csvcontent.append(row)
    csvFileObj.close()
    ###开始写入文件
    csvFileObj2 = open(os.path.join(r'HeaderRemoved',csvFilename), 'w', newline='')
    csvWriter = csv.writer(csvFileObj2)
    for row in csvcontent:
        csvWriter.writerow(row)
    csvFileObj2.close()
```

#### JSON 和 API

下面是 JSON 格式数据的一个例子：

{“name”: “Zophie”, “isCat”: true,

“miceCaught”: 0, “napsTaken”: 37.5,

“felineIQ”: null}

#### 用 loads()函数读取 JSON

```python
>>> stringOfJsonData = '{"name": "Zophie", "isCat": true, "miceCaught": 0,
"felineIQ": null}'
>>> import json
>>> jsonDataAsPythonValue = json.loads(stringOfJsonData)
>>> jsonDataAsPythonValue
{'isCat': True, 'miceCaught': 0, 'name': 'Zophie', 'felineIQ': None}
```

#### 用 dumps 函数写出 JSON

```python
>>> pythonValue = {'isCat': True, 'miceCaught': 0, 'name': 'Zophie',
'felineIQ': None}
>>> import json
>>> stringOfJsonData = json.dumps(pythonValue)
>>> stringOfJsonData
'{"isCat": true, "felineIQ": null, "miceCaught": 0, "name": "Zophie" }
```

#### 项目：取得当前的天气数据

检查天气似乎相当简单：打开 Web 浏览器，点击地址栏，输入天气网站的 URL

（或搜索一个，然后点击链接），等待页面加载，跳过所有的广告等。

其实，如果有一个程序，下载今后几天的天气预报，并以纯文本打印出来，就可

以跳过很多无聊的步骤。该程序利用第 11 章介绍的 requests 模块，从网站下载数据。

总的来说，该程序将执行以下操作：

• 从命令行读取请求的位置。

• 从 OpenWeatherMap.org 下载 JSON 天气数据。

• 将 JSON 数据字符串转换成 Python 的数据结构。

• 打印今天和未来两天的天气。

因此，代码需要完成以下任务：

• 连接 sys.argv 中的字符串，得到位置。

• 调用 requests.get()，下载天气数据。

• 调用 json.loads()，将 JSON 数据转换为 Python 数据结构。

• 打印天气预报。

针对这个项目，打开一个新的文件编辑器窗口，并保存为 quickWeather.py。

```python
import json, requests, sys

if len(sys.argv) < 2:
    print('Usage:quickWeather.py location')
    sys.exit()

location = ''.join(sys.argv[1:])

### download weather info
### http://api.openweathermap.org/data/2.5/forecast/daily?q=San Francisco, CA&cnt=3
### api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
url ='http://api.openweathermap.org/data/2.5/forecast/daily?q=%s&cnt=3' % (location)
response = requests.get(url)
response.raise_for_status()

### load json data into python variable
### 这里打印一下响应的内容是啥
print(response.text)
weatherDate = json.loads(response.text)
w = weatherDate['list']

print('current weather info in %s:'%(location))
print(w[0]['weather'][0]['main'], '-', w[0]['weather'][0]['description'])
print()
print('Tomorrow:')
print(w[1]['weather'][0]['main'], '-', w[1]['weather'][0]['description'])
print()
print('Day after Tomorrow:')
print(w[2]['weather'][0]['main'], '-', w[2]['weather'][0]['description'])
```

#### 国内数据参考

[https://www.sdk.cn/details/5Oo4L8VEexlEbVMrWv?s=api](https://www.sdk.cn/details/5Oo4L8VEexlEbVMrWv?s=api)

```python
#!/usr/bin/python
# -*- coding: utf-8 -*-

import urllib
import urllib.request as request
import urllib.error as error
import json


# 天气预报查询示例
def main():
    api_url = 'http://apis.juhe.cn/simpleWeather/query'
    params_dict = {
        "city": "北京",  # 查询天气的城市名称，如：北京、苏州、上海
        "key": "xxxxxxxx",  # 您申请的接口API接口请求Key
    }
    ### Python urllib 库用于操作网页 URL，并对网页的内容进行抓取处理。
    ### urllib 包 包含以下几个模块：

    ### urllib.request - 打开和读取 URL。
	### urllib.error - 包含 urllib.request 抛出的异常。
	### urllib.parse - 解析 URL。
	### urllib.robotparser - 解析 robots.txt 文件。
    params = urllib.parse.urlencode(params_dict)
    try:
        ###通过url + params 获取需要查看的城市天气，同时有加密处理。
        req = request.Request(api_url, params.encode())
        response = request.urlopen(req)
        content = response.read()
        if content:
            try:
                result = json.loads(content)
                error_code = result['error_code']
                if (error_code == 0):
                    temperature = result['result']['realtime']['temperature']
                    humidity = result['result']['realtime']['humidity']
                    info = result['result']['realtime']['info']
                    wid = result['result']['realtime']['wid']
                    direct = result['result']['realtime']['direct']
                    power = result['result']['realtime']['power']
                    aqi = result['result']['realtime']['aqi']
                    print("温度：%s\n湿度：%s\n天气：%s\n天气标识：%s\n风向：%s\n风力：%s\n空气质量：%s" % (
                        temperature, humidity, info, wid, direct, power, aqi))
                else:
                    print("请求失败:%s %s" % (result['error_code'], result['reason']))
            except Exception as e:
                print("解析结果异常：%s" % e)
        else:
            # 可能网络异常等问题，无法获取返回内容，请求异常
            print("请求异常")
    except error.HTTPError as err:
        print(err)
    except error.URLError as err:
        # 其他异常
        print(err)


if __name__ == '__main__':
    main()
```
