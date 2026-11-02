---
title: web测试及UI自动化面试模拟题
date: 2023-08-30T20:30:30.000Z
permalink: 2023/08/31/web测试及UI自动化面试模拟题/
categories:
  - 测试
tags:
  - 测试开发
---

# web测试及UI自动化面试模拟题

### web测试相关：

1.  web系统测试策略
2.  用户界面测试包含哪些内容
3.  功能测试包含哪些内容
4.  web兼容性测试包含哪些内容
5.  web性能测试关注点（已有）
6.  web安全测试方法（已有）

### 自动化相关：

1.  分层的自动化测试，从底往上一般分为哪几层？
2.  什么样的项目适合自动化测试？
3.  自动化测试需要熟悉的一些基础要素有哪些？
4.  WebDriver API 相关有哪些操作？
5.  常用自动化测试框架模型有哪些？
6.  unittest单元测试框架相关的内容有哪些？
7.  Page Object设计模式理解
8.  测试固件分离思路
9.  数据驱动测试如何做？
10.  从零到一搭建一个自动化测试框架的思路？

### 其他补充问题：

Q:如何让selenium自动下载driver，一次代码即可永久使用？  
Q:元素定位中的难点问题，比如日期控件中的时间如何选择？  
Q:POM分层设计思想的本质理解  
Q:pytest框架的使用方法。  
Q:selenium grid 分布式的原理思路。  
…

web测试需要掌握内容：

自动化相关问题：

1.  分层的自动化测试，从底往上一般分为哪几层？

Unit（数据处理层），一般用白盒单元测试，CodeReview  
Service（业务逻辑层），一般用模块接口测试或者Web接口测试  
UI（UI界面层），一般用UI自动化测试或者JS自动化测试

2.  什么样的项目适合自动化测试：  
    软件需求变动不频繁  
    项目周期较长  
    自动化测试脚本可以重复使用
    
3.  自动化测试需要熟悉的一些基础要素有哪些？
    

Selenium工具  
前端三件套，html+css+Js  
Chrome浏览器的话，会用F12，定位元素，查看xpath之类  
Python基础+selenium包下载安装+Pycharm使用等

4.  WebDriver API 相关有哪些操作？

从定位元素开始，八大定位元素。  
随便百度参考一个：selenium八大元素定位方法  
常用的就是id，name，css，xpath等定位方法。  
其他操作，如控制浏览器大小，后退、前进、刷新页面、  
元素操作，清除文本，按键输入，单击元素；接口操作表单提交；  
鼠标事件：右击、悬停、双击、拖放等；  
常用验证信息：title，URL，和text；  
设置元素等待，显示等待，隐式等待（较为简单）。sleep 休眠；  
定位一组元素，element改为elements；  
多表单切换；多窗口切换；  
警告框处理、上传下载文件；  
操作cookies；调用JS，处理HTML5视频播放、窗口截图、关闭窗口、验证码处理等；

5.  常用自动化测试框架模型有哪些？

线性测试  
模块化驱动测试  
数据驱动测试（常用读取文件txt、csv、xml等）  
关键字驱动测试

6.  unittest单元测试框架相关的内容有哪些？

-   提供用例组织和执行：  
    setup（） + 用例 +teardown（）
-   提供丰富的比较方法
-   提供丰富的日志

unittest中的几个概念理解：

-   test case 测试用例
-   test suite 多个用例的集合，可以组装test case，比如用addTest加载用例到testsuite中
-   test runner提供run（）方法来执行test case，test suite
-   test fixture对测试用例环境的搭建setup（）和销毁teardown（）
-   TestLoader类加载测试用例，可不需创建实例，因unittest提供了可以共享的defaultTestLoader类，  
    可以用其子类和方法来创建实例。常用discover方法。  
    discover(start\_dir, pattern=’test\*.py’, top\_level\_dir=None)  
    runner.run(discover)

断言方法  
断言,自动判断测试用例的测试结果是否成功：assert()  
是预期结果和实际结果的比较，是继承了testcase的方法

* * *

方法 检查  
assertEqual(a, b） a == b  
assertNotEqual(a, b） a != b  
assertTrue(x） bool(x）is True  
assertFalse(x） bool(x）is False  
assertIs(a, b） a is b  
assertIsNot(a, b） a is not b  
assertIsNone(x） x is None  
assertIsNotNone(x） x is not None  
assertIn(a, b） a in b  
assertNotIn(a, b） a not in b  
assertIsInstance(a, b） isinstance(a, b）  
assertNotIsInstance(a, b） not isinstance(a, b）  
HTMLTestRunner模块，生成HTML测试报告

* * *

7.  Page Object设计模式理解：
    
    Page Object 模式主要是将每个页面设计为一个class，其中包含页面中的需要测试的元素（按钮，输入框，标题等），这样在Selenium测试页面中可以通过调取页面类来获取页面元素，这样避免当页面元素id或者位置变化后，需要改测试代码。当元素ID变化时，只需要改测试页面Class中的页面属性即可。将页面定位与和业务分开，分离测试对象（元素对象）和测试脚本（用例脚本），提高可维护性。  
    　　Page Object模式是一种自动化测试设计模式，将页面定位和业务操作分开，分离测试对象（元素对象）和测试脚本（用例脚本），提高用例的可维护性。  
    unittest是一种单元测试框架，用于设计各式各样的测试用例，可调用PageObject设计的页面类（对象），设计出更加可维护的用例。它提供用例组织与执行，提供丰富的比较（断言）方法，提供丰富的日志，统一适用于web自动化用例的开发与执行。  
    　　UI自动化最核心的问题定位是，跟业务层解耦出来，单独处理定位的问题，然后在实现业务层。所使用到的方法是对一个UI页面做测试我们抽取为三层，举例为BasePage+LoginPage+Unittest。 　  
    　　后续示例中，PO模型的基本思路：  
    login\_page(查找页面元素类) —>login\_handle(操作层，将查找到的元素位置上传递数据) —> login\_business(业务层：调用操作层，根据操作层的传递的结果进行判断场景，如邮箱错误场景等) —> first\_case(封装调用业务层，进行测试用例的场景组装)
    

具体各个层级要做的事情：  
查找页面元素类：把定位页面元素的方法都封装在相应的一个相应页面中，此页面的元素定位方式都可以在这个文件中找到  
操作层：编写注册过程中需要的方法，比如输入用户名、密码等页面操作,工具类-保存页面操作的所有方法。  
业务层：把操作层组装起来  
查找页面元素类：loginPage.py  
操作层：loginrHandle.py  
业务层：loginbusiness.py  
下面以126邮箱web登录页面为例展示编写PO模型

定位页面元素类：  
示例代码：loginPage.py

```python
from selenium import webdriver

#定位页面元素
class LoginPage:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.get('https://www.126.com/')
        self.driver.maximize_window()
        self.driver.implicitly_wait(20)
        # 切换到表单中
        self.driver.switch_to.frame(0)

    #定位邮箱输入框
    def get_email_element(self):
        return self.driver.find_element_by_css_selector('input[name="email"]')

    #定位密码输入框
    def get_password_element(self):
        return self.driver.find_element_by_css_selector('input[name="password"]')

    #定义 登录 按钮
    def get_loginbutton_element(self):
        return self.driver.find_element_by_id('dologin')
```

## 操作层

示例代码：loginrHandle.py

```python
#操作层
class loginHandle(LoginPage):

    def __init__(self):
        LoginPage.__init__(self)

    #输入邮箱
    def send_user_email(self):
        self.get_email_element().send_keys('Augus')

    #输入密码
    def send_user_password(self):
        self.get_password_element().send_keys("1234")

    #点击登录按钮
    def click_loginbutton(self):
        self.get_loginbutton_element().click()
```

## 业务层

示例代码：loginbusiness.py

```python
#业务层
class LoginBusiness(loginHandle):
    def __init__(self):
        loginHandle.__init__(self)
    #登录功能
    def login_case(self):
        self.send_user_email()
        self.send_user_password()
        self.click_loginbutton()

if __name__ == '__main__':
    l = LoginBusiness()
    l.login_case()
```

8.  测试固件分离思路  
    对测试项目来说，一般用例跟通用测试步骤分离。比如测试地址、实例化浏览器、关闭浏览器等操作固定，可以单独搞个py文件，然后测试用例执行时，  
    只需要导入这些setup、teardonw类即可。  
    Myunit.py

```python
import unittest
from selenium import webdriver
class TestWebUI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

testUnit.py
from Myunit import *
class TestModle(TestWebUI):
    def test_QQLogin(self):
        self.driver.get('https://mail.qq.com/cgi-bin/loginpage')
        self.assertEqual(self.driver.title,'登录QQ邮箱')
    def test_MaoyanMovie(self):
        self.driver.get('https://maoyan.com/')
        self.assertEqual(self.driver.title,'猫眼电影 - 一网打尽好电影')
```

##生成HTML测试报告

```python
allTest.py
import os,time,unittest
from HTMLTestRunner import HTMLTestRunner
def getAllCases():
   '''获取tesTcase下面的所有测试模块'''
   Testsuite = unittest.defaultTestLoader.discover(
      start_dir=os.path.join(os.path.dirname(__file__),'TestCases'),
      pattern='test*.py')
   return Testsuite
def RunMain():
'''生成测试报告写入指定Reports目录'''
   fp=open(os.path.join(os.path.dirname(__file__),'Reports',
time.strftime("%Y_%m_%d_%H_%M_%S")+ 'report.html'),'wb')
   HTMLTestRunner(stream=fp,title='Python+Selenium自动化测试实战',
                   description='基于python语言UI自动化测试').run(getAllCases())
if __name__ == '__main__':
   RunMain()
```

9.  数据驱动测试如何做？  
    DDT 安装：pip install ddt  
    ##2.12.2 DDT在自动化测试中的应用

```python
import ddt
import unittest
Data = [{'name':"keep learing"},
        {'age':18},
        {'address':"深圳地区"}]
@ddt.ddt
class TestModules(unittest.TestCase):
    def setUp(self):
        print('testcase beaning....')
    def tearDown(self):
        print('testcase ending.....')
    @ddt.data(*Data)
    def test_DataDriver(self,Data):
        print('DDT数据驱动实战演示：',Data)
if __name__ == '__main__':
    unittest.main()
```

###2.12.3 Excel自动化测试实战

```python
import xlrd
import ddt,unittest
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait   #导入WebDriverWait类
from selenium.webdriver.support import expected_conditions as EC  # 导入EC模块
def readUserName(row):
    '''读取用户名'''
    book  = xlrd.open_workbook('datainfo.xlsx','r')
    table = book.sheet_by_index(0)
    return table.row_values(row)[0]
def readPasswd(row):
    '''读取用户名'''
    book  = xlrd.open_workbook('datainfo.xlsx','r')
    table = book.sheet_by_index(0)
    return table.row_values(row)[1]
def readAssertText(row):
    '''读取预期结果'''
    book  = xlrd.open_workbook('datainfo.xlsx','r')
    table = book.sheet_by_index(0)
    return table.row_values(row)[2]
 class TestSouHuLogin(unittest.TestCase):
    def  setUp(self):
        self.driver = webdriver.Chrome()
        self.testUrl = "https://mail.sohu.com/fe/#/login"
    def  tearDown(self):
        self.driver.quit()
    def  by_css(self,usernameloc):
        '''重写css定位'''
        return self.driver.find_element_by_css_selector(usernameloc)
    def  getassertText(self):
        '''获取验证信息'''
        try:
            sleep(2)
            loctor = (By.CSS_SELECTOR,'.tipHolder.ng-binding')
            WebDriverWait(self.driver, 5, 0.5).until(EC.presence_of_element_located((loctor)))
            return self.by_css('.tipHolder.ng-binding').text
        except Exception as message:
            print('元素定位报错!报错原因是：{}'.format(message))
    def  souhuLogin(self,user,passwd):
        '''封装登录功能'''
        self.by_css('.addFocus.ipt-account.ng-pristine.ng-valid').send_keys(user)
        self.by_css('.addFocus.ng-pristine.ng-valid').send_keys(passwd)
        self.by_css('.btn-login.fontFamily').click()
    def  test_souHuLogin_001(self):
        '''账号和密码为空：登录失败'''
        self.driver.get(self.testUrl)
        sleep(3)
        self.souhuLogin(readUserName(1),readPasswd(1))
        self.assertEqual(self.getassertText(), readAssertText(1))
    def  test_souHuLogin_002(self):
        '''账号正确和密码为空：登录失败'''
        self.driver.get(self.testUrl)
        self.souhuLogin(readUserName(2), readPasswd(2))
        self.assertEqual(self.getassertText(), readAssertText(2))
    def  test_souHuLogin_003(self):
        '''账号错误和密码为空：登录失败'''
        self.driver.get(self.testUrl)
        self.souhuLogin(readUserName(3), readPasswd(3))
        self.assertEqual(self.getassertText(), readAssertText(3))
    def  test_souHuLogin_004(self):
        '''账号为空和密码正确：登录失败'''
        self.driver.get(self.testUrl)
        self.souhuLogin(readUserName(4), readPasswd(4))
        self.assertEqual(self.getassertText(), readAssertText(4))
if __name__ == '__main__':
    unittest.main()
```

###2.12.4 Excel整合DDT自动化测试实战

```python

import xlrd
import ddt,unittest
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait      #导入WebDriverWait类
from selenium.webdriver.support import expected_conditions as EC  #导入EC模块
def readData():
    book  = xlrd.open_workbook('datainfo.xlsx','r')  #读取datainfo.xlsx表
    table = book.sheet_by_index(0)               #获取第一个sheet
    newRows=[]                  
    for rowValue in range(1,table.nrows):
        newRows.append(table.row_values(rowValue,0,table.ncols))
    return newRows             #返回新的newRows
@ddt.ddt
class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.testUrl = "https://mail.sohu.com/fe/#/login"
    def tearDown(self):
        self.driver.quit()
    def by_css(self,usernameloc):
        '''重写css定位'''
        return self.driver.find_element_by_css_selector(usernameloc)
    def getassertText(self):
        '''获取验证信息'''
        try:
            sleep(2)
            loctor = (By.CSS_SELECTOR,'.tipHolder.ng-binding')
            WebDriverWait(self.driver, 5, 0.5).until(EC.presence_of_element_located((loctor)))
            return self.by_css('.tipHolder.ng-binding').text
        except Exception as message:
            print('元素定位报错!报错原因是：{}'.format(message))
    @ddt.data(*readData())
    @ddt.unpack
    def test_souhuLogin(self,user,passwd,text):
        self.driver.get(self.testUrl)
        sleep(3)
        self.by_css('.addFocus.ipt-account.ng-pristine.ng-valid').send_keys(user)
        self.by_css('.addFocus.ng-pristine.ng-valid').send_keys(passwd)
        self.by_css('.btn-login.fontFamily').click()
        self.assertEqual(self.getassertText(),text)
if __name__ == '__main__':
    unittest.main()
```

####2.12.5 YAML自动化测试实战,需要pip install pyyaml

```python
import unittest,yaml
from time import sleep
from selenium import webdriver
def readYaml():
   '''获取所有yaml所有数据'''
   f = open('data.yaml', 'r', encoding='utf-8')
   data = yaml.load(f)
   f.close()
   return data
class TestLogin(unittest.TestCase):
   def setUp(self):
      self.driver = webdriver.Chrome()
      self.testUrl = "https://mail.sohu.com/fe/#/login"
   def tearDown(self):
      self.driver.quit()
   def by_css(self,usernameloc):
      '''重写css定位'''
      return self.driver.find_element_by_css_selector(usernameloc)
   def getassertText(self):
      '''获取验证信息'''
      try:
         return self.by_css('.tipHolder.ng-binding').text
      except Exception as message:
         print('元素定位报错!报错原因是：{}'.format(message))
   def souhuLogin(self,user,passwd):
      '''封装登录功能'''
      self.by_css('.addFocus.ipt-account.ng-pristine.ng-valid').send_keys(user)
      self.by_css('.addFocus.ng-pristine.ng-valid').send_keys(passwd)
      self.by_css('.btn-login.fontFamily').click()
   def test_souHuLogin_001(self):
      '''账号正确和密码为空：登录失败'''
      self.driver.get(self.testUrl)
      sleep(3)
      self.souhuLogin(readYaml()['userNull']['username'],readYaml()['userNull']['password'])
      self.assertEqual(self.getassertText(), readYaml()['userNull']['assertText'])
   def test_souHuLogin_002(self):
      '''账号错误和密码为空：登录失败'''
      self.driver.get(self.testUrl)
      sleep(3)
      self.souhuLogin(readYaml()['passNull']['username1'],readYaml()['passNull']['password1'])
      self.assertEqual(self.getassertText(), readYaml()['passNull']['assertText1'])
if __name__ == '__main__':
   unittest.main()
```

####2.12.6 Parameterized参数化实战,需要pip install parameterized

```python
import unittest
from selenium import webdriver
from time import sleep
from parameterized import parameterized  #导入参数化模块
class LoginTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
        cls.testUrl = 'https://mail.sohu.com/fe/#/login'
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
    def by_css(self, usernameloc):
        '''重写css定位'''
        return self.driver.find_element_by_css_selector(usernameloc)
    def getassertText(self):
        '''获取验证信息'''
        try:
            return self.by_css('.tipHolder.ng-binding').text
        except Exception as message:
            print('元素定位报错!报错原因是：{}'.format(message))
    def souhuLogin(self, user, passwd):
        '''封装登录功能'''
        self.by_css('.addFocus.ipt-account.ng-pristine.ng-valid').send_keys(user)
        self.by_css('.addFocus.ng-pristine.ng-valid').send_keys(passwd)
        self.by_css('.btn-login.fontFamily').click()
```

上述代码，对搜狐邮箱登录、css元素定位、登录后的验证信息功能进行二次封装。封装后的方法分别是souhuLogin()、by\_css()、getassertText()。

```python
@parameterized.expand([
        ('', '', '请输入账号密码'),
        ('admin111@sohu.com', '', '请输入账号密码'),
('', 'a123456789', '请输入账号密码')])
    def test_login(self,username, password, assert_text):
        #登录系统
        self.driver.get(self.testUrl)
        sleep(3)
        self.souhuLogin(username,password)
        self.assertEqual(self.getassertText(), assert_text)
if __name__ == '__main__':
    unittest.main(verbosity=2)
```

发送邮件实战  
###2.13.1 纯文本的邮件实战

```python

import smtplib     #调用smtp发件服务
from email.mime.text import MIMEText    #导入做纯文本的邮件模板类
smtpsever='smtp.qq.com'                #QQ邮箱服务器
sender='qq邮箱账号@qq.com'           #发送者邮箱
psw="hcygozfxeassddhhb"              #配置邮箱客户端生成的QQ邮箱授权码
receiver='126邮箱账号@126.com'       #接收者邮箱
port=465   #QQ邮箱服务器默认端口号
msg=MIMEText(body,'html','utf-8')     #邮件正文内容
msg['from']=qq邮箱账号@qq.com'     #发送者账号
msg['to']='126邮箱账号@qq.com'      #接收者账号
msg['subject'] = "这个是纯文本发送的邮件示例"
smtp = smtplib.SMTP_SSL(smtpsever,port)  #调用发件服务
smtp.login(sender,psw)   #通过发送者的邮箱账号和授权码登录邮箱
smtp.sendmail(sender,receiver,msg.as_string())  #发送邮件，信息以字符串方式保存
smtp.quit()                                   #关闭邮件服务
###2.13.2  带附件的邮件实战
import smtplib
from email.mime.text import MIMEText           #导入做纯文本的邮件模板类
from email.mime.multipart import MIMEMultipart   #导入MIMEMultipart类
#发邮件相关参数
smtpsever='smtp.qq.com'       #QQ邮箱服务器
sender='239xxxxx@qq.com'    #发送者邮箱
psw="xxxxxxxxxxxxxxxx"      #qq邮箱授权码
receiver='xxxxx@126.com'    #接收者邮箱账号
port=465                   #QQ邮箱服务器默认端口号
filepath=r"./readme.txt"  #编辑邮件的内容
with open(filepath,'rb') as fp:    #读文件
    mail_body=fp.read()
#主题
msg=MIMEMultipart()
msg["from"]=sender
msg["to"]=receiver
msg["subject"]="带附件的邮件发送模版主题"
body=MIMEText(mail_body,"html","utf-8")
msg.attach(body)
att = MIMEText(mail_body,"base64","utf-8")
att["Content-Type"] = "application/octet-stream"
att["Content-Disposition"] = 'attachment; filename="test_report.html"'
msg.attach(att)
try:
    smtp=smtplib.SMTP()
    smtp.connect(smtpsever)                     #连接QQ邮箱服务器
    smtp.login(sender,psw)                       #调用发件服务
except:
    smtp=smtplib.SMTP_SSL(smtpsever,port)
    smtp.login(sender,psw)                       #登录邮箱
smtp.sendmail(sender,receiver,msg.as_string())     #发送邮件
smtp.quit()
```

自动化整体封装步骤：

自动化封装实战1  
###2.14.1 自动化封装实战-第一部

```python
from selenium import webdriver
from selenium.webdriver.common.by import By             #导入By类
from selenium.webdriver.support.ui import WebDriverWait   #导入WebDriverWait类
from selenium.webdriver.support import expected_conditions as EC  #导入EC模块
import time
def Element_Locator(*new_loctor):
    '''重写find_element定位方法'''
    return driver.find_element(*new_loctor)
def input_username(username,*userLoctor):
    '''输入用户名'''
    return Element_Locator(*userLoctor).send_keys(username)
def input_password(password,*passwdLoctor):
    '''输入密码'''
    return Element_Locator(*passwdLoctor).send_keys(password)
def click_btn(*clickLoctor):
    '''点击登录按钮'''
    return Element_Locator(*clickLoctor).click()
def assert_Login_text(*assertText):
'''获取登录成功后的验证信息'''
    return Element_Locator(*assertText).text
if __name__ == '__main__':
    #定位器
    user_loc = (By.ID, 'mobilePhone')
    passwd_loc = (By.ID, 'password')
    click_loc = (By.ID, 'loginBtn')
    successLogin_loc = (By.CSS_SELECTOR,'a.fc-blue.mr-5')
    driver = webdriver.Chrome()  # 获取驱动
    driver.get('https://www.gjfax.com/toLogin')  # 获取测试网址
    driver.maximize_window()  # 最大化窗口
    time.sleep(3)
    driver.refresh()
    input_username('18513600235',*user_loc)     #输入账号
    input_password('a123456',*passwd_loc)       #输入密码
    click_btn(*click_loc)                         #点击登录按钮
    time.sleep(3)
    # 断言
    if assert_Login_text(*successLogin_loc) == '安全退出':
        print('测试用例通过！')
    else:
        print('测试用例失败！')
```

自动化封装实战2  
###2.14.2 自动化封装实战-第二部

```python

from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By  #二次定位的By类
class GJsProject(object):
   def __init__(self):
      self.driver = webdriver.Chrome()   #定义驱动
   def openbrowser(self,url):            #定义基础操作
      self.driver.get(url)
      self.driver.maximize_window()
      sleep(2)
   def by_css(self,loc):
      '''重写css定位'''
      return self.driver.find_element(By.CSS_SELECTOR,loc)
   def click_login_btn(self,loc):             #点击登录按钮
      self.by_css(loc).click()
   def input_username_Text(self,loc,text):  #输入账号
      self.by_css(loc).send_keys(text)
   def input_password_Text(self,loc,text):  #输入密码
      self.by_css(loc).send_keys(text)
   def click_login_button(self,loc):        #点击登录按钮
      self.by_css(loc).click()
   def assert_success_text(self,loc):     #获取验证信息
      return self.by_css(loc).text    
   def logsys_gjs_action(self,loc):       #退出系统
      self.by_css(loc).click()
      sleep(2)
      self.driver.quit()
# 登录流程
   def login_gjs(self,url,loc1,loc2,username,loc3,password,loc4,loc5,exceptText,loc6):
      self.openbrowser(url)
      sleep(1)
      self.click_login_btn(loc1)
      sleep(1)
      self.input_username_Text(loc2,username)
      sleep(1)
      self.input_password_Text(loc3,password)
      sleep(1)
      self.click_login_button(loc4)
      sleep(1)
      if self.assert_success_text(loc5) == exceptText:  #断言登录是否成功
         print('pass')
      else:
         print('fail')
      self.logsys_gjs_action(loc6)
if __name__ == '__main__':
   t = GJs()
   url = 'https://www.gjfax.com/'           #打开项目地址
   loc1 = "span.menubar-btn .fc-white"    #定位器
   loc2 = "#mobilePhone"
   username = '18513600235'
   loc3 = "#password"
   password = 'a123456'
   loc4 = "#loginBtn"
   loc5 = "a.fc-blue.mr-5" 
   exceptText = '安全退出'
   loc6 = "a.fc-blue.mr-5"
   t.login_gjs(url,loc1,loc2,username,loc3,password,loc4,loc5,exceptText,loc6)  #调用登录方法
```

集合全量测试用例，alltest.py

```python
#-*- coding=utf-8 -*-
__author__ = 'Le.shen'
import time,os,unittest,sys
sys.path.append('./common')
sys.path.append('./basepage')
sys.path.append('./page')
from HTMLTestRunner import HTMLTestRunner  #导入生成邮件测试模版
from homePage import *     #导入基础类
from loginpage import *    #导入页面类
import smtplib  #邮箱服务器
from email.mime.text import MIMEText  #邮件模版类
from email.mime.multipart import MIMEMultipart #邮件附件类
from email.header import Header  #邮件头部模版
#发送带邮件的函数 动作
def send_mail(file_new):
    f = open(file_new,'rb')
    mail_body = f.read()
    f.close()
    #基本信息
    smtpserver = 'smtp.126.com'
    ## pwd = "MDTFMYZKLYOCDGFR" #126邮箱授权码
    pwd = "JFOVESRKWSRPEGIU"  # 126邮箱授权码
    #定义邮件主题
    msg=MIMEMultipart()
    msg['subject'] = Header(u'Page Object自动化测试报告','utf-8')
    msg['from'] = "emptymiss@126.com"    #必须加 不加报错  发送者的邮箱
    msg['to'] =  "305030951@qq.com"     #必须加 不加报错  接收者的邮箱
    #不加msg['to'] msg['from']报错原因，是因为“发件人和收件人参数没有进行定义
    #HTML邮件正文 直接发送附件的代码片段
    body=MIMEText(mail_body,"html","utf-8")
    msg.attach(body)
    att = MIMEText(mail_body,"base64","utf-8")
    att["Content-Type"] = "application/octet-stream"
    att["Content-Disposition"] = 'attachment; filename="test_report.html"'
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
    file_path = os.path.join(result_dir,file[-1])     #找到测试报告目录下面最新的测试报告
    return file_path  #返回最新的测试报告
if __name__=='__main__':
    base_dir = os.path.dirname(os.path.realpath(__file__))  #获取文件所在路径
    test_dir = os.path.join(base_dir,'TestCases')  #测试用例所在目录
    test_report = os.path.join(base_dir,'report')  #测试报告所在目录
    testlist = unittest.defaultTestLoader.discover(test_dir,pattern = 'test*.py')
    now = time.strftime("%Y-%m-%d %H_%M_%S")
    filename = test_report + "/" + now + 'result.html'
    fp = open(filename,'wb')
    runner = HTMLTestRunner(stream = fp,
                            title = u'PageObject自动化测试报告',
                            description = u'系统环境:mac m1 浏览器:Chrome 用例执行情况:')
    runner.run(testlist)
    fp.close()
    new_report = new_file(test_report)   #获取最新报告文件
    send_mail(new_report)                #发送最新的测试报告
```

#实现的逻辑  
#1.先生成测试报告  
#2.查找最新的测试报告 通过new\_file函数 找到最新的测试报告 作为一个结果返回 file\_path  
#3.把new\_file函数 找到最新的测试报告 file\_path (最新的测试报告) 以邮件附件的形式加载到邮件模版中 设置参数 连接邮箱服务器发送最新的测试报告

生成html的测试报告：

```python

#-*- coding=utf-8 -*-
__author__ = 'Le.shen'
import sys,os,time,unittest
sys.path.append('./common')
sys.path.append('./basepage')
sys.path.append('./page')
from HTMLTestRunner import HTMLTestRunner
def getAllCases():
    '''获取tesTcase下面的所有测试模块'''
    Testsuite = unittest.defaultTestLoader.discover(
        start_dir=os.path.join(os.path.dirname(__file__),'TestCases'),
        pattern='test*.py')
    return Testsuite
def RunMain():
    '''生成测试报告写入指定Reports目录'''
    fp=open(os.path.join(os.path.dirname(__file__),'report',time.strftime("%Y_%m_%d_%H_%M_%S")+ 'report.html'),'wb')
    HTMLTestRunner(stream=fp,title='Python+Selenium自动化测试实战',
                   description='基于python语言PO自动化测试').run(getAllCases())
if __name__ == '__main__':
   RunMain()
# import  unittest,os,time
# from PO.common.HTMLTestRunner import HTMLTestRunner
#
# def  allTest():
#     '''获取testCases下面的所有测试用例'''
#     case = os.path.join(os.path.dirname(__file__),'TestCases')
#     suite = unittest.defaultTestLoader.discover(case,pattern='test*.py')
#     return suite
#
# def getTime():
#     '''获取当前系统时间'''
#     return time.strftime("%Y_%m_%d_%H_%M_%S")
#
# def run():
#     '''主函数入口'''
#     report = os.path.join(os.path.dirname(__file__),'report',getTime())  +  '_report.html'
#     HTMLTestRunner(stream=open(report,'wb'),title='po自动化测试设计模式',description='window10 chrome67').run(allTest())
#
#
# if __name__ == '__main__':
#     run()
```

基本骨架如下：  
test\_po\_jenkins:  
目录：  
basepage(homePage.py etc)  
common(getImage.py,helper.py,HTMLTestRunner.py,ownUnit.py)  
data(info.xlsx etc)  
Image(截图保存)  
page（loginpage.py）  
report  
testCases(test\_Login.py etc)  
主函数，py脚本：  
allTests.py  
runALLCases.py

多线程的调用  
##2.16.3 多线程调用浏览器运行实战

```python

from selenium import webdriver
from time import sleep
import threading    #导入多线程模块
from selenium import webdriver
from selenium.webdriver.chrome.options import Options  
def  test_baidu_search(browser,url):
    if   browser == "FireFox":
        # 创建的新实例驱动
        options = webdriver.FirefoxOptions()
        # 火狐无头模式
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        executable_path = r'C:\Python36\geckodriver.exe'
        driver = webdriver.Firefox(firefox_options=options, executable_path=executable_path)
        # driver = webdriver.Firefox()
    elif browser == "Chrome":
        # 创建的新实例驱动
        chrome_options = Options()
        # 谷歌无头模式
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(chrome_options=chrome_options)
        # driver = webdriver.Chrome()
    elif browser == 'Ie':
        driver = webdriver.Ie()
    #搜索脚本
    driver.get(url)
    sleep(3)
    driver.find_element_by_id("kw").send_keys(u"多线程启动不同浏览器")
    driver.find_element_by_id("su").click()
    sleep(3)
    driver.quit()
if __name__ == "__main__":
    data = {"FireFox": "http://www.baidu.com","Chrome": "http://www.baidu.com",
            "Ie":"http://www.baidu.com"}
    #构建线程
    threads = [ ]
    for browser, url in data.items():
        t = threading.Thread(target=test_baidu_search, args=(browser, url))
        threads.append(t)
    #启动所有线程
    for thr in threads:
        thr.start()
```

### UI自动化测试补充内容：

Q:如何让selenium自动下载driver，一次代码即可永久使用？  
A:你可以使用webdriver\_manager库来自动下载Chrome的driver，并且该库可以确保每次调用时都使用最新版本的driver。  
以下是一个示例代码，使用webdriver\_manager库来下载和管理Chrome驱动器：

```python
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager

# 下载并安装Chrome驱动程序
driver = webdriver.Chrome(ChromeDriverManager().install())

# 执行你的Selenium代码...
```

这将在第一次运行代码时自动下载最新版本的Chrome驱动程序，并在后续的调用中重复使用已下载的驱动程序。

Q:元素定位中的难点问题，比如日期控件中的时间如何选择？

A:日期控件是Selenium中常见的难点之一，因为日期控件通常包含不同的HTML元素和JavaScript代码。以下是一些可以帮助你定位和选择日期控件中的时间的方法：  
使用JavaScript执行点击操作：如果日期控件是通过JavaScript实现的，你可以使用Selenium的execute\_script()方法来模拟JavaScript点击事件。例如：

```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.example.com/")

# 点击日期控件中的某个日期
date_input = driver.find_element_by_xpath("//input[@id='date-picker']")
driver.execute_script("arguments[0].click();", date_input)

date_picker = driver.find_element_by_xpath("//div[@class='date-picker-container']")
selected_date = date_picker.find_element_by_xpath("//td[@class='selected']//span")
print(selected_date.text)
```

在上面的示例中，我们使用execute\_script()方法单击日期控件，并在控件弹出窗口中选择了选定的日期。  
直接发送日期值：对于某些日期控件，可以直接将日期文本值输入到文本框中。例如：

```python
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://www.example.com/")

# 输入日期并提交表单
date_input = driver.find_element_by_xpath("//input[@id='date-picker']")
date_input.send_keys("2022-12-31")
submit_button = driver.find_element_by_xpath("//button[@type='submit']")
submit_button.click()
```

在上面的示例中，我们直接将日期文本值输入到日期输入框中，并单击提交按钮。  
使用第三方库：有一些第三方Python库可以帮助你定位和选择日期控件。例如，如果你使用的是jQuery UI DatePicker控件，则可以使用dateutil库来解析日期字符串并设置日期值。例如：

```python
from selenium import webdriver
from dateutil.parser import parse

driver = webdriver.Chrome()
driver.get("https://www.example.com/")

# 输入日期并提交表单
date_input = driver.find_element_by_xpath("//input[@id='date-picker']")
date_input.click()

date_picker = driver.find_element_by_xpath("//div[@class='date-picker-container']")
selected_date = date_picker.find_element_by_xpath("//td[@class='selected']//span")
date_str = selected_date.text + " 2022"
date_value = parse(date_str, fuzzy=True)

date_input.clear()
date_input.send_keys(date_value.strftime('%m/%d/%Y'))

submit_button = driver.find_element_by_xpath("//button[@type='submit']")
submit_button.click()
```

在上面的示例中，我们使用dateutil库来解析日期字符串，并将其转换为datetime对象。然后，我们清除了日期输入框中的任何现有文本，并发送格式化的日期值。

Q:POM分层设计思想的理解。  
A:本质，面向对象编程，而不是面向过程编程。  
每一个页面，定义一个类，分为数据以及方法两个层面。  
基础的内容可以放到basepage中，然后继承这个page的属性，比如初始化一个drivier，geturl，点击跳转，退出等等操作。

POM（Page Object Model）分层设计思想是一种将页面元素和操作分离的设计模式，  
通过创建一个与页面相关的类，来管理页面上的所有元素和操作。  
这种设计模式使得测试用例更加清晰、可维护、可扩展，并且提高了测试脚本的可重用性。  
POM分层设计通常包括以下三个层次：  
页面层：这一层主要负责页面元素的封装和页面操作的实现，将页面中的元素和操作封装到一个Page类中，提供给业务层使用。

业务层：这一层主要负责业务逻辑的实现，将测试用例中的步骤分解成具体的业务操作，并调用页面层的方法来实现。

测试用例层：这一层主要负责编写测试用例，调用业务层的方法来实现具体的测试场景。

下面是一个简单的示例：  
页面层：

```python
from selenium.webdriver.common.by import By

class LoginPage:
    url = 'https://www.example.com/login'

    username_input = (By.ID, 'username')
    password_input = (By.ID, 'password')
    login_button = (By.XPATH, '//button[contains(text(), "Login")]')

    def __init__(self, driver):
        self.driver = driver

    def open(self):
        self.driver.get(self.url)

    def input_username(self, username):
        self.driver.find_element(*self.username_input).send_keys(username)

    def input_password(self, password):
        self.driver.find_element(*self.password_input).send_keys(password)

    def click_login_button(self):
        self.driver.find_element(*self.login_button).click()
```

业务层：

```python
class LoginService:
    def __init__(self, driver):
        self.login_page = LoginPage(driver)

    def login(self, username, password):
        self.login_page.open()
        self.login_page.input_username(username)
        self.login_page.input_password(password)
        self.login_page.click_login_button()
```

测试用例层：

```python
from selenium import webdriver
import unittest

class TestLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.login_service = LoginService(self.driver)

    def test_login_success(self):
        self.login_service.login('testuser', 'testpassword')
        # 断言登录成功后的页面跳转或页面元素

    def tearDown(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()
```

通过以上示例，我们可以看到，POM分层设计将页面元素和操作封装到了Page类中，将具体的业务操作封装到了Service类中，并且使得测试用例更加清晰、可维护、可扩展。

Q:pytest框架的使用方法。  
A:pytest是一个流行的Python测试框架，它提供了简单易用、灵活的测试用例编写方式和丰富的插件机制。pytest可以用于各种类型的测试，包括单元测试、功能测试、端到端测试等。  
使用pytest的原理是基于Python标准库中的unittest模块，并扩展了更多的功能和特性。  
pytest支持自动发现测试用例，不需要继承TestCase类，而是通过函数定义来编写测试用例，  
测试函数的名称必须以test\_开头，pytest会自动执行这些函数并生成测试报告。

下面是一个简单的pytest测试用例示例：  
def test\_add():  
assert 1 + 2 == 3

def test\_subtract():  
assert 5 - 3 == 2

上述代码中，我们定义了两个测试函数，分别用于测试加法和减法操作。在函数中使用assert语句来进行断言，如果断言失败，则测试用例会失败。  
在终端中运行pytest命令即可执行这些测试用例：  
$ pytest test\_sample.py

pytest还提供了许多内置插件和第三方插件，可以扩展其功能，例如：  
pytest-html：生成漂亮的HTML测试报告  
pytest-xdist：多进程并行执行测试用例  
pytest-selenium：集成selenium WebDriver来进行Web应用程序的测试  
下面是一个使用pytest+selenium的测试用例示例：

```python
import pytest
from selenium import webdriver

@pytest.fixture(scope='session')
def browser():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_login_success(browser):
    browser.get('https://www.example.com/login')
    username_input = browser.find_element_by_id('username')
    password_input = browser.find_element_by_id('password')
    login_button = browser.find_element_by_xpath('//button[contains(text(), "Login")]')

    username_input.send_keys('testuser')
    password_input.send_keys('testpassword')
    login_button.click()

    assert browser.current_url == 'https://www.example.com/home'
```

上述代码中，我们使用pytest的fixture机制来管理WebDriver对象的生命周期，在测试用例中通过browser参数来访问WebDriver对象。这个测试用例使用selenium WebDriver来模拟用户登录行为，并进行断言验证。  
综上所述，pytest是一个简单易用、灵活的测试框架，通过函数定义来编写测试用例，支持自动发现测试用例和丰富的插件机制。同时，结合selenium WebDriver可以方便地进行Web应用程序的测试。

Q:selenium grid 分布式的原理思路。  
A:分布式，不同于进程、线程那些概念，分布式是多台机器协同完成一个工作。

什么是分布式系统？  
分布式系统是一种由多台计算机组成的系统，它们可以通过网络连接在一起，共同完成某项任务。它们可以共享资源，允许计算机之间的通信，并且可以提高系统的可靠性和可扩展性。  
分布式系统一般跟什么系统来作比较？  
分布式系统通常与集中式系统进行比较。集中式系统是一种由单台计算机组成的系统，它可以独立完成某项任务，但是它的可靠性和可扩展性较低？  
分布式系统相比较集中式系统的优缺点有哪些？  
分布式系统相比集中式系统的优点有：  
更高的可靠性，更高的可扩展性，更高的可用性，更低的成本，更高的安全性，更高的可管理性等。  
缺点是：更复杂的系统结构，更复杂的网络管理，更复杂的数据同步，更复杂的安全管理等。

理解：多台机器完成一项任务。

Selenium Grid是Selenium的一个组件，它允许将测试用例分发到不同的机器和浏览器上并行运行。Selenium Grid有两个主要组成部分：Hub和Node。  
Hub是中心节点，负责管理所有的测试请求和分发给各个Node进行执行。而Node则是实际执行测试的节点，每个Node可以同时运行多个浏览器实例，根据测试需求来决定使用哪种浏览器。  
下面以一个简单的示例来说明Python+Selenium Grid的使用方法：  
启动Hub  
在终端输入以下命令启动Hub：  
java -jar selenium-server-standalone-3.x.x.jar -role hub

其中selenium-server-standalone-3.x.x.jar为Selenium Server的JAR包路径，可以从官网下载。  
启动Node  
在另一个终端窗口中输入以下命令启动Node：  
java -jar selenium-server-standalone-3.x.x.jar -role node -hub [http://localhost:4444/grid/register](http://localhost:4444/grid/register) -browser browserName=chrome,maxInstances=5 -browser browserName=firefox,maxInstances=5

其中[http://localhost:4444/grid/register为Hub的地址，-browser参数指定了Node所支持的浏览器及最大实例数。](http://localhost:4444/grid/register%E4%B8%BAHub%E7%9A%84%E5%9C%B0%E5%9D%80%EF%BC%8C-browser%E5%8F%82%E6%95%B0%E6%8C%87%E5%AE%9A%E4%BA%86Node%E6%89%80%E6%94%AF%E6%8C%81%E7%9A%84%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8F%8A%E6%9C%80%E5%A4%A7%E5%AE%9E%E4%BE%8B%E6%95%B0%E3%80%82)  
编写测试脚本  
假设我们有一个测试用例，需要在Chrome和Firefox上分别打开百度首页，并搜索关键字“selenium”。

```python
from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

# 定义浏览器配置
chrome_caps = DesiredCapabilities.CHROME.copy()
chrome_caps['platform'] = 'WINDOWS'
chrome_caps['version'] = '10'

firefox_caps = DesiredCapabilities.FIREFOX.copy()
firefox_caps['platform'] = 'WINDOWS'
firefox_caps['version'] = '10'

# 启动远程浏览器
chrome_driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    desired_capabilities=chrome_caps)

firefox_driver = webdriver.Remote(
    command_executor='http://localhost:4444/wd/hub',
    desired_capabilities=firefox_caps)

# 打开百度首页
chrome_driver.get('https://www.baidu.com')
firefox_driver.get('https://www.baidu.com')

# 搜索关键字
chrome_input = chrome_driver.find_element_by_css_selector('#kw')
chrome_input.send_keys('selenium')
chrome_input.submit()

firefox_input = firefox_driver.find_element_by_css_selector('#kw')
firefox_input.send_keys('selenium')
firefox_input.submit()

# 关闭浏览器
chrome_driver.quit()
firefox_driver.quit()
```

在代码中，我们使用DesiredCapabilities类来定义不同浏览器的配置信息，  
然后通过webdriver.Remote()方法启动远程浏览器，并指定执行测试的Hub地址。  
最后，分别在Chrome和Firefox上打开百度首页，并搜索关键字“selenium”。  
运行测试脚本  
在终端中输入以下命令运行测试脚本：  
python test.py

此时，测试脚本会向Hub发送请求，将测试任务分配给可用的Node进行执行。  
如果有多个Node可用，则测试会在多个浏览器实例上并行运行，从而提高测试效率。  
以上就是Python+Selenium Grid的使用方法，通过启动Hub和Node来实现分布式测试，  
并在测试脚本中指定远程浏览器的配置和执行地址，从而实现对不同浏览器和操作系统的并行测试。
