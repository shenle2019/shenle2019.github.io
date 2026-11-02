---
title: Interface auto test
date: '2022-09-13T00:00:00+00:00'
permalink: 2022/09/13/Interface-auto-test/
categories:
  - 测试
tags:
  - 测试开发
---

## Python接口自动化实战

接口自动化常用，python + requests

requests常用实例，get、post、json、requests headers、response 等结合cookie 、session、token等操作。  
最后整合DDT 数据驱动进行接口自动化实战。

### 安装request库

pip install requests

### requests 发送请求和参数传递

```python
#6.2.2  发送get请求
import requests
response = requests.get('http://www.baidu.com')
print(r.url)

#6.2.2  发送get请求 带参数
import requests
r = requests.get('http://www.baidu.com/s?',params={'wd':'python'})
print(r.url)


#6.2.3  发送form表单
import requests
payload = {'account':'admin',
           'password':"123456",
           'referer':"http://192.168.0.162:4444/zentao/www/my/"}
r = requests.post('http://192.168.1.116:8011/zentao/www/user-login.html',data=payload,
                  headers={"Content-Type":"application/x-www-form-urlencoded"})
print(r.text)

#6.2.4  发送xml数据
import requests
url  =  'http://ws.webxml.com.cn/WebServices/WeatherWS.asmx'
payload = '''<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <getSupportCityString xmlns="http://WebXml.com.cn/">
      <theRegionCode>3114</theRegionCode>
    </getSupportCityString>
  </soap:Body>
</soap:Envelope>'''
r = requests.post(url=url, data=payload, headers={"Content-Type":"text/xml"})
print(r.text)


####6.2.5  发送json请求

import requests,json

url  = 'http://183.62.166.42:11125/CyzgMobileConfigService/GetDataInfo'
payload = {'CommandCode': 'GetAllCityData',
           'Marker': '1482638389646', "TransferData": "{\'CityId\':4565110}"}
r = requests.post(url=url, json=payload, headers={'Content-Type': 'application/json'})
print(r.text)
```

### 处理cookie、session以及 token

```python
####6.3  处理 token 

import requests
url = 'http://212.123.456.123:1112/login'
data = {'username':'admin','password':'admin'}
response = requests.post(url=url,json=data,
                         headers={'Content-Type':"application/json"})
print(response.json())

### 把上述内容封装成写token文件输出，
with open('token.md','w') as f:
	f.write(response.json()['token'])

### 再补充一个读取token文件函数：
def read_token(self):
	with open('token.md','r') as f:
		return f.read()

### 后续response中requests.get函数中可以带上headers=self.read_token()参数即可

###6.4  处理 cookie

def login():
   '''登录禅道获取登录后的session'''
   r=requests.post('url=http://192.168.0.162:4444/zentao/www/user-login.html',
                   data={'account':'admin',
                    'password':'123456',
                    'referer':"http://192.168.0.162:4444/zentao/www/my/"})
   return r.cookies
   
def ViewBug():
   '''查看bug单'''
   r = requests.get(url='http://192.168.0.162:4444/zentao/www/my-bug.html',cookies=login())
   return r.text
print(ViewBug())


###6.5  处理 session
import requests

data = {
    "email":"18513600xxx",
    "icode":"",
    "origURL":"http://www.renren.com/home",
    "domain":"renren.com",
    "key_id":1,
    "captcha_type":"web_login",
    "password":"403ebf9eelri59d8df30669206e8885236klaece4884c0cca4642365b0e4096a",
    "rkey":"41602f6afc3b0686fd38866f4cd6d5c8",
    "f":""}
url = 'http://www.renren.com/ajaxLogin/login?1=1&uniqueTimestamp=20181131458439'
def  RenrenLogin():
    '''登陆接口'''
    s = requests.Session()
    r = s.post(url=url,data=data)
    return  s
```

后续的请求r = RenrenLogin().post(url=url,data=data)，这个就带上了cookie信息了  
return r.text

### 处理超时等待

```python
import requests  #导入requests库

response = requests.get(url='http://www.baidu.com',timeout=0.001)
print(response.text)
```

### response对象解析

```python

###7.7  Response对象解析
import requests 
r = requests.get('http://httpbin.org/get')

print('HTTP状态码:',r.status_code)  #响应状态码 常见 200 301 302 404 500 
print('返回原始响应体',r.raw)
print('请求的响应体',r.content)  #字节方式的响应体，会自动解码gzip和deflate 压缩
print('响应内容',r.text)         #字符串方式的响应体，会自动根据响应头部的字符编码进行解码
print('获取headers',r.headers)  #以字典对象存储服务器响应头
print(r.json())    #Requests中内置的 Json 解码器 将响应结果转换为JSON字符串
print(r.raise_for_status())   #失败请求(非200 响应)抛出异常
```

### 文件上传实战

```python
#####7.8  Requests文件上传实战

def zentaoLogin():
"""登录请求"""
   data = {
      'account': 'admin',
      'password': '123456',
      'referer': 'http://192.168.1.106:8011/zentao/www/doc-browse-product-0-59-0.html'}
   return data

def login():
"""获取登录后返回cookie"""
   r = requests.post(
      url='http://192.168.1.106:8011/zentao/www/user-login.html',
      data=zentaoLogin(),
      headers={'Content-Type': 'application/x-www-form-urlencoded'})
   return r.cookies

def uploadData():
"""接口参数"""
   data = {
       "product": "59",
       "module":  "0",
       'type': 'file',
       "title": 'looking1',
       'url': '',
       'content': '',
       'keywords': '',
       'digest':'',
       'labels[]':'',
       'lib':'product'
   }
   return data


def uploadFile():
"""上传文件接口"""
   r = requests.post(
      url= 'http://192.168.1.106:8011/zentao/www/doc-create-product-0-0-0-doc.html',
      data=uploadData(),
      headers={'Conteny-Type': 'multipart/form-data'},
      files={"file": ("1.jpg", open(r"C:/1.jpg", "rb"), "image/jpeg", {})},
      cookies=login())
   print(r.status_code)
   print(r.text)
uploadFile()
```

### 序列化与反序列化

```python
import json  #导入json库
#定义字典
dict1={'name':"fighter",
      'age':28,
      'address':'shenzhen'}
print ('未序列化前的数据类型为:',type(dict1))
print ('未序列化前的数据:',dict1)
#对python对象进行序列化操作
print ('begin对python对象进行序列化操作------------>')
str1 = json.dumps(dict1)
print ('序列化后的数据类型为:',type(str1))
print ('序列化后的数据为:',str1)
#对str1进行反序列化操作
print ('begin对str1对象进行反序列化操作------------>')
dict2 = json.loads(str1)
print ('反序列化后的数据类型:',type(dict2))
print ('反序列化后的数据:',dict2)
```

### XML与JSON数据之间的转换

```python
#7.11  XML与JSON数据之间的转换

import json
import xmltodict
#定义xml转json的函数
def xmltojson(xmlstr):
  xmlparse = xmltodict.parse(xmlstr)    #parse是的xml解析器
  jsonstr = json.dumps(xmlparse,indent=2,sort_keys=True)
  print(jsonstr)

if __name__ == '__main__':
  xmlinfo = """<student>
    <bokeid>fighter006</bokeid>
    <bokeinfo>
      <cnbologsname>laolu</cnbologsname>
      <page>230</page>
    </bokeinfo>
    <date>
      <address>http://www.baidu.com</address>
      <title>python+ddt+requests</title>
    </date>
  </student>
    """
  xmltojson(xmlinfo)
```

### 接口测试框架设计和开发

测试框架  
Config：  
**init**.py  
config.ini  
HTMLTestRunner.py  
readConfig.py  
Data：  
**init**.py  
data.xlsx  
taskID  
Token.md  
Log：  
**init**.py  
log.txt  
Reports：  
2019-01-04 14\_05\_59result.html  
2019-01-08 22\_29\_59result.html  
2019-01-08 22\_30\_45result.html  
2019-02-12 20\_22\_39result.html  
2019-02-15 21\_03\_33result.html  
2019-03-07 20\_52\_13result.html  
**init**.py  
TestCases：  
**init**.py  
test\_tasks.py  
Utils：  
**init**.py  
excles.py  
page.py

**init**.py  
runMain.py

config.ini:

\[EMAIL\]  
mail\_host = smtp.126.com  
mail\_user = [luruifeng@126.com](mailto:luruifeng@126.com)  
mail\_pass = qq123456789  
sender = [luruifengx@126.com](mailto:luruifengx@126.com)  
receiver = [luruifengx@126.com](mailto:luruifengx@126.com)  
subject = 接口自动化测试报告

readConfig.py:

```python

创建configParser对象cf
cf = configparser.ConfigParser()
# read(filename) 读文件内容
filename = cf.read("config.ini",encoding='utf-8')
print(filename)
# sections() 得到所有的section，以列表形式返回
sec = cf.sections()
print(sec)
# options(section) 得到section下的所有option
opt = cf.options("EMAIL")
print(opt)
# items 得到section的所有键值对
value = cf.items("EMAIL")
print(value)
# get(section,option) 得到section中的option值，返回string/int类型的结果
email_host = cf.get("EMAIL","mail_host")
email_password = cf.get("EMAIL","mail_pass")
email_sender = cf.get('EMAIL','sender')
email_user = cf.get('EMAIL','mail_user')
```

data下放  
xlsx：  
请求地址 是否携带请求数据 是否携带token 请求方式 参数依赖  
[http://211.149.163.145:3000/register](http://211.149.163.145:3000/register) {“username”:”jackLu”,”password”:”jackLu”,”password\_confirmation”:”jackLu”} “无” post “无”  
[http://211.149.163.145:3000/login](http://211.149.163.145:3000/login) {“username”: “jackLu”, “password”:”jackLu”} “无” post “无”  
[http://211.149.163.145:3000/api/tasks](http://211.149.163.145:3000/api/tasks) 否 {“token”:”asdfasdfsdfssfdsafdsafds”} get “无”  
[http://211.149.163.145:3000/api/tasks](http://211.149.163.145:3000/api/tasks) {“title”:”[https://www.cnblogs.co/fighter007","desc":"接口描述"}](https://www.cnblogs.co/fighter007","desc":"%E6%8E%A5%E5%8F%A3%E6%8F%8F%E8%BF%B0"%7D) {“token”:”dsfsdsdfsdccxzvzcxttryu”} post “无”  
[http://211.149.163.145:3000/api/tasks/](http://211.149.163.145:3000/api/tasks/): 否 {“token”:”ryrtyrtytreytryretryngfng”} delete 有

taskID  
Token.md

LOG下放日志

Reports下放测试报告文件

测试用例，test\_tasks.py:

```python
#coding=utf-8

import unittest
from testAPI.Utils.page import  *   #导入Helper工具类
from testAPI.Utils.excles import *  #导入Excels工具类

class Totasks(unittest.TestCase,Helper,Excels):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def test_register(self):
        '''注册接口'''
        r = self.post(self.readUrl(1),self.readData(1))
        self.assertEqual(r.json()['username'],'jackLu')
        self.Makelog('接口断言：注册接口响应数据检验jackLu')
        self.assertEqual(r.status_code,200)
        self.Makelog('接口断言：注册接口响应状态码检验200')

    def test_login(self):
        '''登录接口'''
        r = self.post(self.readUrl(2),self.readData(2))
        self.assertEqual(r.status_code,200)
        self.Makelog('接口断言：登陆接口响应状态码检验200')
        self.assertEqual(r.json()['username'],'jackLu')
        self.Makelog('接口断言：登陆接口响应数据检验jackLu')

    def test_writeToken(self):
        '''将token写入到Token.md文件中'''
        r = requests.post(self.readUrl(2),self.readData(2))
        with open(self.dirname('Token.md'),'w') as  f:
            self.Makelog('日志跟踪：将token写入到Token.md文件中')
            return f.write(r.json()['token'])

    def read_Token(self):
        '''读取Token.md文件中的token值'''
        with open(self.dirname('Token.md'),'r') as f:
            self.Makelog('日志跟踪：读取Token.md文件中的token')
            return  f.read()

    def setToken(self,rx):
        '''对动态参数token赋值'''
        dinfo = self.readToken(rx)
        self.Makelog('动态参数处理：读取Excel表中的Token值')
        dinfo['token'] = self.read_Token()
        self.Makelog('动态参数处理：对token重新赋值为最新服务器生成的token值')
        return {"Authorization":"Bearer " + dinfo['token']}

    def test_getApiTask(self):
        '''获取所有文章'''
        r = self.get(self.readUrl(3),self.setToken(3))
        self.assertEqual(r.status_code,200)
        self.Makelog('接口断言：获取所有文章响应状态码检验200')

    def test_postApiTasks(self):
        '''创建文章接口'''
        r = self.post(self.readUrl(4),self.readData(4),self.setToken(4))
        self.assertEqual(r.json()['desc'],'接口描述')
        self.Makelog('接口断言：创建文章响应数据断言[接口描述]')
        self.assertEqual(r.status_code, 200)
        self.Makelog('接口断言：创建文章响应状态码检验200')

    def writeTaskId(self):
        '''写入Token到taskID文件中'''
        r = requests.post(self.readUrl(4),self.readData(4),self.setToken(5))
        with open(self.dirname('taskID'),'w') as f:
            f.write(str(r.json()['id']))
            self.Makelog('接口业务：将创建后的文章ID写入到taskID文件中')

    def getTaskID(self):
        '''读取taskID'''
        with open(self.dirname('taskID'),'r') as f:
            self.Makelog('接口业务：读取创建文章后的文章ID')
            return  f.read()

    def test_deleteApiTasks(self):
        '''删除文章接口'''
        r = self.delete(self.readUrl(5) + self.getTaskID(),self.setToken(5))
        self.assertEqual(r.status_code,200)
        self.Makelog('接口断言:删除文章响应状态码检验200')


if __name__ == '__main__':
    unittest.main(verbosity=2)
```

excels.py:

```python
#coding=utf-8


import xlrd,json

class Excels(object):

    '''构造 Excel 工具类'''

    def readExcelData(self,rowx):
        '''读取rowx行数'''
        book  = xlrd.open_workbook(r'D:\project\testAPI\Data\data.xlsx')
        table = book.sheet_by_index(0)
        return table.row_values(rowx)

    def readUrl(self,rowx):
        '''读取接口地址'''
        return self.readExcelData(rowx)[0]

    def readData(self,rowx):
        '''读取请求参数'''
        return json.loads(self.readExcelData(rowx)[1])

    def readToken(self,rowx):
        '''读取Token'''
        return json.loads(self.readExcelData(rowx)[2])


# e = Excels()
# print(e.readUrl(1))
# print(e.readData(1),type(e.readData(1)))
#
#
```

page.py:

```python

#coding=utf-8

import logging
import os,requests
import configparser #导入configparser模块

class Helper(object):

    def dirname(self,fileName='',filepath='Data'):
        '''
        :param fileName: 文件名字
        :param filepath: 写入指定目录
        :return:
        '''
        return os.path.join(os.path.dirname(os.path.dirname(__file__)),filepath,fileName)

    def get(self,url,headers=''):
        '''重构GET请求'''
        if url:
            r = requests.get(url=url,headers=headers)
            return r
        else:
            try:
                print('接口地址有误！')
            except Exception as M:
                print('错误原因：%s'%M)

    def post(self,url,data,headers=''):
        '''重构POST请求'''
        if url:
            r = requests.post(url=url,json=data,headers=headers)
            return r
        else:
            try:
                print('接口地址有误！')
            except Exception as M:
                print('错误原因：%s'%M)

    def delete(self,url,headers=''):
        '''重构DELETE请求'''
        if url:
            r = requests.delete(url=url,headers=headers)
            return r
        else:
            try:
                print('接口地址有误！')
            except Exception as M:
                print('错误原因：%s'%M)

    def Makelog(self,log_content):
       '''定义log日志级别'''
       #定义日志文件
       logFile = logging.FileHandler(self.dirname('log.txt','Log'), 'a',encoding='utf-8')
       # 设置log格式
       fmt=logging.Formatter(fmt='%(asctime)s-%(name)s-%(levelname)s-%(module)s:%(message)s')
       logFile.setFormatter(fmt)
       logger1 = logging.Logger('logTest',level=logging.DEBUG)   #定义日志
       logger1.addHandler(logFile)
       logger1.info(log_content)
       logFile.close()

    def readConfig(self):
        '''读取配置文件中的内容'''
        l = []
        config = configparser.ConfigParser()
        config.read(self.dirname('config.ini','Config'),encoding='utf-8')
        email_host = config.get("EMAIL","mail_host")
        email_password = config.get("EMAIL","mail_pass")
        email_sender = config.get('EMAIL','sender')
        email_user = config.get('EMAIL','mail_user')
        email_receiver = config.get('EMAIL','receiver')
        email_subject = config.get('EMAIL','subject')
        l.append(email_host)
        l.append(email_password)
        l.append(email_sender)
        l.append(email_user)
        l.append(email_receiver)
        l.append(email_subject)
        return  l

p = Helper()
print(p.readConfig())
# print(per.dirname('token'))
```

runMain.py:

```python

#coding=utf-8

import smtplib  #邮箱服务器
from email.mime.text import MIMEText  #邮件模版类
import unittest
from testAPI.Config.HTMLTestRunner import HTMLTestRunner
import time,os
from email.mime.multipart import MIMEMultipart #邮件附件类
from email.header import Header  #邮件头部模版
import configparser  #导入configparser模块
from testAPI.Utils.page import *


#发送带邮件的函数 动作
def send_mail(file_new):
    f = open(file_new,'rb')
    mail_body = f.read()
    f.close()

    #基本信息
    smtpserver = Helper().readConfig()[0]
    pwd = Helper().readConfig()[1] #126邮箱授权码

    #定义邮件主题
    msg=MIMEMultipart()
    msg['subject'] = Header(Helper().readConfig()[-1],'utf-8')
    msg['from'] = Helper().readConfig()[2]   #必须加 不加报错  发送者的邮箱
    msg['to'] =  Helper().readConfig()[3]     #必须加 不加报错  接收者的邮箱

    #不加msg['to'] msg['from']报错原因，是因为“发件人和收件人参数没有进行定义

    #HTML邮件正文 直接发送附件的代码片段
    body=MIMEText(mail_body,"html","utf-8")
    msg.attach(body)
    att = MIMEText(mail_body,"base64","utf-8")
    att["Content-Type"] = "application/octet-stream"
    att["Content-Disposition"] = 'attachment; filename="Interface_report.html"'
    msg.attach(att)

    #链接邮箱服务器发送邮件
    smtp = smtplib.SMTP()
    smtp.connect(smtpserver)
    smtp.login(msg['from'],pwd)
    smtp.sendmail(msg['from'],msg['to'],msg.as_string())
    print ("邮件发送成功")


#查找最新邮件
def new_file(test_dir):
    result_dir = test_dir
    lists = os.listdir(result_dir)  #print(lists)  #列出测试报告目录下面所有的文件
    lists.sort()   #从小到大排序 文件
    file = [x for x in lists if x.endswith('.html')]  #for循环遍历以.html格式的测试报告
    file_path = os.path.join(result_dir,file[-1])  #找到测试报告目录下面最新的测试报告
    return file_path  #返回最新的测试报告


if __name__=='__main__':

    base_dir = os.path.dirname(os.path.realpath(__file__))  #获取文件当前路径 D:\project\PO\
    test_dir = os.path.join(base_dir,'TestCases')  #D:\project\PO\testCases
    test_report = os.path.join(base_dir,'Reports')  #D:\project\PO\report
    testlist = unittest.defaultTestLoader.discover(test_dir,pattern = 'test*.py')
    now = time.strftime("%Y-%m-%d %H_%M_%S")
    filename = test_report + "\\" + now + 'result.html'
    fp = open(filename,'wb')
    runner = HTMLTestRunner(stream = fp,
                            title = u'接口自动化测试框架设计报告',
                            description = u'系统环境:Win10 用例执行情况:')
    runner.run(testlist)
    fp.close()
    new_report = new_file(test_report)   #获取最新报告文件
    send_mail(new_report)                #发送最新的测试报告
```
