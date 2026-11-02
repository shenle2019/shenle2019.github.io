---
title: Selenium 3
date: 2022-08-21T21:52:23.000Z
permalink: 2022/08/22/Selenium-3/
categories:
  - 测试
tags:
  - 测试开发
---

# Selenium3 自动化实战

-   预置条件

比较简单，直接百度搜索安装即可。

```python
Python官方网站：https://www.python.org
Selenium 3官方网站：https://www.seleniumhq.org/download
IEDriver驱动下载地址：http://selenium-release.storage.googleapis.com/index.html
Firefox驱动下载地址：https://github.com/mozilla/geckodriver/releases
Chrome驱动下载地址：http://chromedriver.storage.googleapis.com/index.html
HTMLTestRunner.py下载地址：https://pan.baidu.com/s/13XAwyPWAKRxRXUwTZ_jkag
Jenkins官网地址：https://jenkins.io
PyCharm开发集成环境官网地址：https://www.jetbrains.com/pycharm
robot.hpi插件官方下载地址：http://mirrors.jenkins-ci.org/plugins/robot
Charles破解版（V 3.11）工具包地址：https://pan.baidu.com/s/1EhmXykUz94yrlhKatY2SIw
Postman官方下载地址：https://www.getpostman.com/apps
Node.js官网下载地址：http://nodejs.cn/download
32位安装包下载址：https://nodejs.org/dist/v4.4.3/node-v4.4.3-x86.msi
64位安装包下载地址：https://nodejs.org/dist/v11.0.0/node-v11.0.0-x64.msi
Requests库官方地址：https://pypi.org/project/requests/#files
Collections库离线安装包下载：http://robotframework.org/robotframework/latest/libraries/Collections.html
Appium官方下载地址：https://bitbucket.org/appium/appium.app/downloads
Git官方下载地址：https://git-scm.com/download/win
```

-   元素定位实战

```python
####2.3.1  单个元素定位

# 1.通过find_element_by_id定位
# 示例如下：
from selenium import webdriver
from selenium.webdriver.common.by import By  ## 导入By类

driver = webdriver.Chrome()
driver.get('http://www.baidu.com')
driver.find_element(By.ID,'kw').send_keys('大道至简')
driver.find_element(By.ID,'su').click()
###这个写法已经过时不用了
###driver.find_element_by_id("kw").send_keys('大道至简')
```

```python
#2.通过find_element_by_name定位
#示例如下：
from selenium import webdriver
from selenium.webdriver.common.by import By  ## 导入By类
driver = webdriver.Chrome()
driver.get('http://www.baidu.com')
#driver.find_element_by_name("kw").send_keys('大道至简')
driver.find_element(By.NAME,'wd').send_keys('大道至简')
driver.find_element(By.ID,'su').click()
driver.quit()
```

```python
# 3.通过find_element_by_class_name定位
# 示例如下：
from selenium import webdriver
from selenium.webdriver.common.by import By  ## 导入By类
import time

driver = webdriver.Chrome()
driver.get('http://www.baidu.com')
### driver.find_element_by_class_name("s_ipt").send_keys('大道至简')
driver.find_element(By.CLASS_NAME,'s_ipt').send_keys('大道至简')
driver.find_element(By.ID,'su').click()

print('10秒前')
time.sleep(10)
print('10秒后')
driver.quit()
```

```python
### 补充，常用可以用xpath来定位。
### 或者通过css定位器，by css_selector时，注意id简写为'#',class属性简写为'.'，层级关系可以用'>'来表示。
```

```python
# #2.3.2 多个元素定位实战
from selenium import webdriver
from selenium.webdriver.common.by import By  ## 导入By类
driver = webdriver.Chrome()
driver.get('file:///' + os.path.abspath('checkbox.html'))
### driver.find_elements_by_css_selector("input[type='checkbox']")[0].click()
driver.find_element(By.CSS_SELECTOR,"input[type='checkbox']")[0].click(0)
driver.quit()
```

```python
# #2.3.3  多个元素定位，循环获取属性
from selenium import webdriver
from selenium.webdriver.common.by import By  ## 导入By类
from time import sleep
import time

driver = webdriver.Chrome()
driver.get("https://www.baidu.com")
###tag = dr.find_elements_by_tag_name('input')
tag = driver.find_elements(By.TAG_NAME,'input')
for t in tag:
    if t.get_attribute('autocomplete') == 'off':
        t.send_keys('fighter007')
###driver.find_element_by_id('su').click()
tag = driver.find_element(By.ID,'su').click()
print('10秒前')
time.sleep(10)
print('10秒后')
driver.quit()
```

```python
# #2.3.4 js定位
from selenium import webdriver
import time as t
from selenium.webdriver.common.by import By  ## 导入By类

dr = webdriver.Chrome()
dr.get('https://www.jianshu.com/sign_in')
t.sleep(5)
#点击注册按钮
#js_register = 'document.getElementById("js-sign-up-btn").click();'返回单个elements元素定位，
# 其他类型的js元素定位均返回list对象
js_register = 'document.getElementById("js-sign-up-btn").click();'
dr.execute_script(js_register)
t.sleep(2)
```

```python
# #2.3.5 jquery定位
# #定位登录连接
from selenium import webdriver
import time as t
from selenium.webdriver.common.by import By  ## 导入By类
dr = webdriver.Chrome()
dr.get('https://www.jianshu.com/sign_in')
t.sleep(5)

js_class = 'document.getElementsByClassName("active")[0].click();'
dr.execute_script(js_class)
t.sleep(2)
#定位账号文本框  输入username
js_input='document.getElementsByTagName("input")[2].value="username";'
dr.execute_script(js_input)
t.sleep(2)
#定位密码文本框 输入password
js_passwd = 'document.getElementsByTagName("input")[3].value="password";'
dr.execute_script(js_passwd)
t.sleep(2)
#使用css选择器定位 登录按钮，目前跳出验证图片弹窗
css_btn = 'document.querySelectorAll(".sign-in-button")[0].click();'
dr.execute_script(css_btn)
```

-   下拉框实战
    
    ```python

    #2.4.1 下拉框定位  value属性定位
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import Select
    from time import sleep
    dr = webdriver.Chrome()
    url = dr.get("file:///D:/xialakuang.html")
    element = dr.find_element(By.ID,"s4Id")
    ###value属性定位
    Select(element).select_by_value("o1")


    #2.4.2下拉框   index属性定位
    from selenium import webdriver
    from selenium.webdriver.common.by import By #引入By类
    from selenium.webdriver.support.ui import Select  #引入Select类
    from time import sleep
    dr = webdriver.Chrome()
    url = dr.get("file:///D:/xialakuang.html")
    element = dr.find_element(By.ID,"s4Id")
    ###index属性定位
    Select(element).select_by_index(1)


    ###2.4.3  visible_text属性定位
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import Select
    from time import sleep
    dr = webdriver.Chrome()
    url = dr.get("file:///D:/xialakuang.html")
    element = dr.find_element(By.ID,"s4Id")
    ###直接获取属性
    Select(element).select_by_visible_text("o3"）


    # 2.4.4  元素二次定位实战
    from selenium import webdriver
    from time import sleep
    dr = webdriver.Chrome()
    url = dr.get("file:///D:/xialakuang.html")
    ###二次定位，必须用click方法才能生效
    dr.find_element_by_id("s4Id").find_element_by_xpath("//*[@id='id2']").click()
    ```
    
-   鼠标操作实战
    

```python
###2.5.1 鼠标悬停实战
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains  #导入ActionChains类
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
setting = dr.find_element_by_link_text("设置")
###移动到某个元素上悬停
ActionChains(dr).move_to_element(setting).perform()
sleep(1)
dr.find_element_by_link_text("搜索设置").click()
sleep(5)


##2.5.2  鼠标右键实战
from selenium.webdriver.common.action_chains import ActionChains  #导入ActionChains类
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
sleep(3)
#定位百度一下按钮元素
context = dr.find_element_by_id('su')
#鼠标悬停右键操作
ActionChains(dr).context_click(context).perform()
sleep(5)


##2.5.3  鼠标双击实战

from time import sleep
from selenium.webdriver.common.action_chains import ActionChains  #导入ActionChains类
from selenium import webdriver
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
sleep(3)
dr.find_element_by_id('kw').send_keys('双击一下')
#定位百度按钮元素
double = dr.find_element_by_id('su')
#模拟鼠标双击操作
ActionChains(dr).double_click(double).perform()
sleep(5)
```

-   元素等待实战

```python
#强制等待

from time import sleep
from selenium import webdriver
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
sleep(5)   #强制等待5s
dr.find_element_by_id('kw').send_keys('双击一下')



#隐式等待
from time import sleep
from selenium import webdriver
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
dr.implicitly_wait(30)   #隐式等待设置 30 s
dr.find_element_by_id('kw').send_keys('双击一下')



#显示等待
from selenium import webdriver
from selenium.webdriver.common.by import By   #导入By类
from selenium.webdriver.support.ui import WebDriverWait  #导入WebDriverWait类
from selenium.webdriver.support import expected_conditions as EC  # 导入EC模块
driver = webdriver.Chrome()
driver.get('https://mail.sina.com.cn/')
###显示等待，直到出现了某个元素，才开始执行操作。最长等待5s，每隔0.5s执行一次，如果超过5s则抛异常。
element = WebDriverWait(driver,5,0.5).until(EC.presence_of_element_located((By.ID, 'freename')))
element.send_keys('hello')
driver.quit()
```

-   表单切换实战

```python
###2.7.1表单切换实战
from selenium import webdrvier
driver = webdriver.Chrome()
driver.get('https://mail.qq.com/cgi-bin/loginpage')
time.sleep(2)
###切换标签
driver.switch_to.frame('login_frame')   #切换iframe标签
driver.find_element_by_name("email").send_keys('username')
driver.find_element_by_name("password").send_keys('password')
driver.find_element_by_id("login_button").click()
driver.switch_to.default_content()  #退出iframe标签


###2.7.2 嵌套表单切换 平行表单切换实战

from selenium import webdrvier
driver = webdriver.Chrome()
driver.get('file:///E:/webdriver_api_demo/frame.html')
time.sleep(2)
#先切换到最外层的iframe标签
driver.switch_to.frame('f1')   
#再切换到第二个iframe标签
driver.switch_to.frame('f2')
#定位处在第二个iframe标签中的元素
driver.find_element_by_name("email").send_keys('username')

### 2.7.3 
from selenium import webdrvier
driver = webdriver.Chrome()
driver.get('file:///E:/webdriver_api_demo/frame.html')
time.sleep(2)
#默认在iframe1标签
driver.switch_to.frame('osslog_iframe')   
#退出iframe1标签
driver.switch_to.default_content()  #退出iframe标签
#切换到iframe2标签
driver.switch_to.frame('actionFrame')
#操作iframe2标签下面的元素
driver.find_element_by_name("email").send_keys('username')


###2.7.4 表单特殊情况处理
from selenium import webdrvier
driver = webdriver.Chrome()
driver.get('https://mail.qq.com/cgi-bin/loginpage')
time.sleep(2)
#使用xpath层级定位iframe标签
Xpath=driver.find_element_by_xpath("//div[@id=’QMEditorArea’]/table/tbody/tr[2]/td/iframe")
driver.switch_to.frame(Xpath)   #切换到iframe标签
driver.find_element_by_name("email").send_keys('username')
driver.find_element_by_name("password").send_keys('password')
driver.find_element_by_id("login_button").click()
```

-   窗口切换实战

```python

##2.8  窗口切换实战
from selenium import webdrvier
from time import sleep
driver = webdriver.Chrome()
driver.get('http://www.baidu.com')
driver.find_element_by_id(“kw”).send_keys(“渗透吧”)
driver.find_element_by_id(“su”).click()
#第一个窗口下点击渗透吧链接
driver.find_element_xpath(‘//*[@id="1"]/h3/a’).click()
#使用get获取跳转后的url地址,切换过去
driver.get(‘http://tieba.baidu.com/f?kw=%C9%F8%CD%B8&fr=ala0&tpl=5’)
sleep(3)
#操作跳转后所在窗口的页面元素
driver.find_element_by_link_text(‘进入贴吧’).click()


###2.8.2  SWITCH方法实战
import selenium3
from selenium3 import webdriver
from time import sleep
from selenium3.webdriver.common.by import By
dr = webdriver.Chrome()
url = "https://www.so.com/"
dr.get(url)
sleep(1)
dr.find_element_by_link_text("360导航").click()
sleep(2)
#获取所有窗口的句柄
windows = dr.window_handles
#通过索引切换到第二个窗口
dr.switch_to.window(windows[1])
sleep(0.5)
#在第二个窗口里面文本框内输入 第二个窗口
dr.find_element_by_id("search-kw").send_keys("第二个窗口")
sleep(2)
#切换到第一个窗口
dr.switch_to.window(window[0])
###在第一个窗口的文本框中输入"第一个窗口"
dr.find_element_by_id("input").send_keys("第一个窗口")
```

-   警告框实战

```python
# 2.9  警告框实战

from selenium import webdriver
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains 
from selenium.webdriver.support.select import Select
dr = webdriver.Chrome()
dr.get("https://www.baidu.com")
setting = dr.find_element_by_link_text("设置")
ActionChains(dr).move_to_element(setting).perform()
sleep(1)
dr.find_element_by_link_text("搜索设置").click()
sleep(5)
# 选择简体中文
dr.find_element_by_id("SL_1").click()
sleep(3)
# 下拉框的操作
select = dr.find_element_by_xpath("//select[@id='nr']")
Select(select).select_by_value("20")
sleep(3)
# 保存设置
dr.find_element_by_class_name("prefpanelgo").click()
# 处理警告框
alert = dr.switch_to.alert
# 打印警告信息
print(alert.text)


### 后续有其他操作，如确认操作dr.switch_to.alert.accept(),拒绝警告框dr.switch_to.alert.dismiss()
```

-   JavaScript实战

```python
##2.10.1 JavaScript实战
from selenium import webdriver
from time import sleep
driver=webdriver.Chrome()
driver.get(“http://localhost:8080”)
#定位富文本 并向富文本输入内容 A
js="document.getElementById('content_ifr').contentWindow.document.body.innerHTML='%s'" %(A)
driver.execute_script(js)


##2.10.2  处理隐藏元素实战

from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from time import sleep
dr = webdriver.Chrome()
dr.get('file:///E:/webdriver_api_demo/frame.html')
sleep(2)
#设置元素为可见，强制设置
js = 'document.querySelectorAll("select")[0].style.display="block";'
dr.execute_script(js)
sleep(3)
element = dr.find_element(By.ID,"s3")
Select(element).select_by_visible_text("po设计模式")


##2.10.3  处理readonly属性实战
from selenium import webdriver
from time import sleep
dr = webdriver.Chrome()
dr.get('https://kyfw.12306.cn/otn/leftTicket/init')
sleep(2)
###强制移除属性
js1 = "document.getElementById('train_date').removeAttribute('readonly');"  #移除readonly属性
dr.execute_script(js1)
sleep(2)
dr.find_element_by_id('train_date').clear()   #清空日期
dr.find_element_by_id('train_date').send_keys('2018-12-10')  #输入最新日期

##2.10.4  处理浏览器滚动条实战

from selenium import webdriver
from time import sleep
driver=webdriver.Chrome()
driver.get("http://www.baidu.com")  #访问百度搜索
driver.find_element_by_id("kw").send_keys("selenium")
driver.find_element_by_id("su").click()
sleep(3)
driver.execute_script("window.scrollTo(0,10000);") #将页面滚动条拖到底部
sleep(3)
driver.execute_script("window.scrollTo(10000,0);")  #将滚动条移动到页面的顶部
sleep(3)
driver.quit()


from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys   #引入键盘类
driver=webdriver.Chrome()
driver.maximize_window()
driver.get("http://www.baidu.com")  #访问百度搜索
driver.find_element_by_id("kw").send_keys("好奇心日报")
driver.find_element_by_id("su").click()
sleep(5)
#将页面滚动条拖到底部
driver.find_element_by_xpath('//*[@id="page"]/a[10]').send_keys(Keys.DOWN)
sleep(5)
#将滚动条移动到页面的顶部
driver.find_element_by_xpath('//*[@id="s_tab"]/div/a[9]').send_keys(Keys.UP)
sleep(5)
driver.quit()
```

-   unittest单元测试框架

```python

##2.11.1  unittest简介
import unittest
class TestStrSample(unittest.TestCase):
    def test_strendswich(self):
        self.assertEqual('foo'.endswith('o'),False)
    def test_split(self):
        s = 'my name is Fighter'
        self.assertEqual(s.split(), ['my', 'name','is','Fighter'])
if __name__ == '__main__':
    unittest.main()

##2.11.2  前置和后置
import unittest
class TestStringMethods(unittest.TestCase):
    def setUp(self):
        print('每条测试用例开始执行前做的操作.....')
    def test_isupper(self):
        self.assertTrue('FOO'.endswith('O'))
        self.assertFalse('Foo'.isupper())
        print('第一条测试用例')
    def test_strendswich(self):
        self.assertEqual('foo'.endswith('o'), True)
        print('第二条测试用例')
    def tearDown(self):
        print('每条测试用例执行完毕后做的操作.....')
if __name__ == '__main__':
    unittest.main()



##2.11.3  常用断言方法
import unittest
from selenium import webdriver
from time import sleep
class TestWebUI(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
    def tearDown(self):
        self.driver.quit()
    def test_QQLogin(self):
        self.driver.get('https://mail.qq.com/cgi-bin/loginpage')
        self.assertEqual(self.driver.title,'登录QQ邮箱',’页面跳转失败，请重新检查！’)
    def test_MaoyanMovie(self):
        self.driver.get('https://maoyan.com/')
        self.assertEqual(self.driver.title,'猫眼电影 - 一网打尽好电影',’页面跳转失败,请重新检查！’)
if __name__ == '__main__':
    unittest.main()


##2.11.4  setUpClass和tearDownClass
import unittest
from selenium import webdriver
from time import sleep
class TestWebUI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome()
    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
    def test_QQLogin(self):
        self.driver.get('https://mail.qq.com/cgi-bin/loginpage')
        self.assertEqual(self.driver.title,'登录QQ邮箱')
    def test_MaoyanMovie(self):
        self.driver.get('https://maoyan.com/')
        self.assertEqual(self.driver.title,'猫眼电影 - 一网打尽好电影')
if __name__ == '__main__':
    unittest.main()
```

```python

常用断言：

1.assertEqual(self, first, second, msg=None)

--判断两个参数相等：first == second

2.assertNotEqual(self, first, second, msg=None)

--判断两个参数不相等：first ！= second

3.assertIn(self, member, container, msg=None)

--判断是字符串是否包含：member in container

4.assertNotIn(self, member, container, msg=None)

--判断是字符串是否不包含：member not in container

5.assertTrue(self, expr, msg=None)

--判断是否为真：expr is True

6.assertFalse(self, expr, msg=None)

--判断是否为假：expr is False

7.assertIsNone(self, obj, msg=None)

--判断是否为None：obj is None

8.assertIsNotNone(self, obj, msg=None)
--判断是否不为None：obj is not None
```

##测试固件分离

对测试项目来说，一遍用例跟通用测试步骤分离。比如测试地址、实例化浏览器、关闭浏览器等操作固定，可以单独搞个py文件，然后测试用例执行时，  
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
```

testUnit.py

```python
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

allTest.py

```python
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

-   数据驱动测试实战

DDT 安装：pip install ddt

##2.12.2 DDT在自动化测试中的应用

```plaintext
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

```python
###2.12.3  Excel自动化测试实战

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

```python
###2.12.4  Excel整合DDT自动化测试实战

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

```python
####2.12.5  YAML自动化测试实战,需要pip install pyyaml
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

```python
####2.12.6  Parameterized参数化实战,需要pip install parameterized
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
上述代码，对搜狐邮箱登录、css元素定位、登录后的验证信息功能进行二次封装。封装后的方法分别是souhuLogin()、by_css()、getassertText()。
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

-   发送邮件实战

```python
###2.13.1  纯文本的邮件实战
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

-   自动化封装实战1

```python
###2.14.1  自动化封装实战-第一部

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

-   自动化封装实战2

```python
###2.14.2  自动化封装实战-第二部


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

-   测试框架的封装和脚本的分层设计

### 基础类

homePage.py

```python
#-*- coding=utf-8 -*-
__author__ = 'Le.shen'


from selenium.webdriver.support.wait import WebDriverWait   #显示等待
from selenium.webdriver.support import expected_conditions as EC  #判断元素是否被定位到


#页面的基础类
class HomePage():
	#构造方法
	def __init__(self,url,dr):
		self.url = url
		self.dr = dr

	#封装元素定位方式
	###如果找不到元素就抛出except异常，HomePage类用于所有页面的继承。
	def find_element(self,*loc):
		try:
			WebDriverWait(self.dr,20).until(EC.visibility_of_element_located(loc))
			return self.dr.find_element(*loc)
		except Exception as message:
			print('元素定位在页面中无法找到！{}'.format(message))
```

loginpage.py

```python
#-*- coding=utf-8 -*-
__author__ = 'Le.shen'

import sys
sys.path.append('../basePage')
from homePage import HomePage   #导入基础类
from selenium.webdriver.common.by import By #定位方式
from time import sleep


#登录的页面类
class LoginPage(HomePage):
	#定位器
	#用户名
	username_loc = (By.ID,'mobilePhone')
	#密码
	password_loc = (By.ID,'password')
	#登录按钮
	loginBtn_loc = (By.ID,'loginBtn')
	#退出连接
	logoutBtn_loc = (By.CSS_SELECTOR,'a.fc-blue.mr-5')
	#用户名为空
	userNull_loc = (By.CSS_SELECTOR,'#error > span.error')
	#密码为空
	passWordNull_loc = (By.CSS_SELECTOR,'#error > span.error')

	#打开登陆页面
	def openLoginPage(self):
		self.dr.get(self.url)
		self.dr.refresh()
		self.dr.maximize_window()
		sleep(0.5)

	#输入用户名
	def input_userName(self,userName):
		self.find_element(*self.username_loc).send_keys(userName)

	#输入密码
	def input_passWord(self,password):
		self.find_element(*self.password_loc).send_keys(password)

	#点击登录按钮
	def click_loginBtn(self):
		self.find_element(*self.loginBtn_loc).click()

	#获取登录成功后的提示信息
	def get_assertText(self):
		sleep(3)
		return self.find_element(*self.logoutBtn_loc).text

	#用户名为空的提示
	def get_userNullText(self):
		return self.find_element(*self.userNull_loc).text

	#密码为空的提示
	def get_passwordNullText(self):
		return self.find_element(*self.passWordNull_loc).text

	#组装成登录流程
	def login_gjs_pro(self,username,password):
		self.input_userName(username)
		self.input_passWord(password)
		self.click_loginBtn()
```

test\_Login.py

```python
#-*- coding=utf-8 -*-
__author__ = 'Le.shen'

import sys,unittest
sys.path.append('../common')
sys.path.append('../page')
from ownUnit import MyunitTests  #导入测试关键所在类
from helper import Helper        #新增Helper类
from time import sleep

from getImage import SaveImage  #导入截图功能
import logging  #导入日志模块


class TestLogin(MyunitTests,Helper):

	# def  test_login(self):
	# 	'''正确的用户名和密码'''
	# 	self.loginpage.openLoginPage()
	# 	self.log('PO-gjs：打开浏览器进入到项目首页')
	# 	self.loginpage.login_gjs_pro(self.readusername(1),self.readpassword(1))
	# 	self.log('PO-gjs：输入正确的用户名和密码')
	# 	sleep(5)
	# 	self.assertEqual(self.loginpage.get_assertText(),self.exceptText(1))  #断言
	# 	self.log('PO-gjs：登录成功获取信息进行断言')
	# 	SaveImage(self.dr,'login_success.png')
	# 	self.log('PO-gjs：登录成功后获取截图信息')
	# 	self.log('PO-gjs：第4条用例执行结束.....')


	def test_user_null(self):
		'''测试密码为空'''
		self.loginpage.openLoginPage()
		self.log('PO-gjs：打开浏览器进入到项目首页')
		self.loginpage.login_gjs_pro(self.readusername(2),self.readpassword(2))
		self.log('PO-gjs：输入正确用户名和密码为空')
		self.assertEqual(self.loginpage.get_passwordNullText(),self.exceptText(2))  #断言
		self.log('PO-gjs：登录失败获取信息进行断言')
		SaveImage(self.dr,'loginpasswdNull.png')
		self.log('PO-gjs：登录失败后获取截图信息')
		self.log('PO-gjs：第1条用例执行结束.....')

	def test_username_null(self):
		'''测试用户名为空'''
		self.loginpage.openLoginPage()
		self.log('PO-gjs：打开浏览器进入到项目首页')
		self.loginpage.login_gjs_pro(self.readusername(3),self.readpassword(3))
		self.log('PO-gjs：输入用户名为空和正确密码')
		self.assertEqual(self.loginpage.get_userNullText(),self.exceptText(3))
		self.log('PO-gjs：登录失败获取信息进行断言')
		SaveImage(self.dr,'loginuserNull.png')
		self.log('PO-gjs：登录失败后获取截图信息')
		self.log('PO-gjs：第3条用例执行结束.....')


	def test_user_passwd_null(self):
		'''测试用户名/密码为空'''
		self.loginpage.openLoginPage()
		self.log('PO-gjs：打开浏览器进入到项目首页')
		self.loginpage.login_gjs_pro(self.readusername(4),self.readpassword(4))
		self.log('PO-gjs：输入用户名为空和正确为空')
		self.assertEqual(self.loginpage.get_passwordNullText(),self.exceptText(4))
		self.log('PO-gjs：登录失败获取信息进行断言')
		SaveImage(self.dr,'loginuserAndpasswd.png')
		self.log('PO-gjs：登录失败后获取截图信息')
		self.log('PO-gjs：第2条用例执行结束.....')


if __name__ == '__main__':
    unittest.main(verbosity=2)




# self.loginpage.openLoginPage()
# self.log('测试正常的登录：po自动化测试-->打开登录页面')
# # 输入账号
# self.loginpage.input_userName(self.readusername(1))
# self.log('测试正常的登录：po自动化测试-->输入账号')
# # 输入密码
# self.loginpage.input_passWord(self.readpassword(1))
# self.log('测试正常的登录：po自动化测试-->输入密码')
# # 点击登录
# self.loginpage.click_loginBtn()
# self.log('测试正常的登录：po自动化测试-->点击登录按钮')
# # 断言
# self.assertEqual(self.loginpage.get_assertText(), self.exceptText(1))
# self.log('测试正常的登录：po自动化测试-->验证登录是否成功！')


# import xlrd,logging
# from PO.common.helper import *           ,Helper  继承

	# #测试密码为空
	# def test_user_null(self):
	# 	#打开登录页面
	# 	self.loginpage.openLoginPage()
	# 	self.log('测试密码为空：po自动化测试-->打开登录页面')
	# 	#输入账号
	# 	self.loginpage.input_userName(self.readusername(2))
	# 	self.log('测试密码为空：po自动化测试-->输入账号')
	# 	#输入密码
	# 	self.loginpage.input_passWord(self.readpassword(2))
	# 	self.log('测试密码为空：po自动化测试-->输入密码')
	# 	#点击登录
	# 	self.loginpage.click_loginBtn()
	# 	self.log('测试密码为空：po自动化测试-->点击登录按钮')
	# 	#断言
	# 	self.assertEqual(self.loginpage.get_passwordNullText(),self.exceptText(2))
	# 	self.log('测试密码为空：po自动化测试-->验证登录是否成功！')
    #
	# #测试用户名为空
	# def test_password_null(self):
	# 	#打开登录页面
	# 	self.loginpage.openLoginPage()
	# 	#输入账号
	# 	self.loginpage.input_userName(self.readusername(3))
	# 	#输入密码
	# 	self.loginpage.input_passWord(self.readpassword(3))
	# 	#点击登录
	# 	self.loginpage.click_loginBtn()
	# 	#断言
	# 	self.assertEqual(self.loginpage.get_userNullText(),self.exceptText(3))
```

common测试固件下，ownUnit.py

```python



import sys
sys.path.append('../basepage')
sys.path.append('../page')
from homePage import *
from loginpage import *
from selenium import webdriver
import unittest
from time import sleep

class MyunitTests(unittest.TestCase):

	def setUp(self):
		### 广金所登录页地址有更新 self.url = 'https://www.gjfax.com/toLogin'
		### https://qhfles.gjfax.com/toLogin
		self.url = 'https://qhfles.gjfax.com/toLogin'
		self.dr = webdriver.Chrome()
		self.dr.implicitly_wait(30)
		#实例化一个loginpage对象
		self.loginpage = LoginPage(self.url,self.dr)

	def tearDown(self):
		self.dr.quit()
```

helper.py

```python
#-*- coding=utf-8 -*-
__author__ = 'Le.shen'

import xlrd
import logging,os

class Helper(object):

	def readExcles(self,rowx):
		'''
		rowx是行数
		:param rowx:
		:return: 返回的每一个行的行数
		'''
		book = xlrd.open_workbook(r'/Users/shenle/PycharmProjects/pythontest100/test_po_jenkins/data/info.xlsx', 'r')
		table = book.sheet_by_index(0)
		return table.row_values(rowx)

	def readusername(self,rowx):
		'''
		rowx返回的是第几行的用户名
		:param rowx:
		:return:
		'''
		return str(self.readExcles(rowx)[0])

	def readpassword(self,rowx):
		'''
		rowx返回的是第几行的密码
		:param rowx:
		:return:
		'''
		return self.readExcles(rowx)[1]

	def exceptText(self,rowx):
		'''
		rowx返回的第几行的预期结果
		:param rowx:
		:return:
		'''
		return self.readExcles(rowx)[2]

	def  dirname(self,filename,filepath='data'):
		'''
		:param filename:文件名字
		:param filepath: 文件路径
		:return:
		'''
		return os.path.join(os.path.dirname(os.path.dirname(__file__)),filepath,filename)


	def log(self,log_content):
		'''定义log日志级别'''
		# 定义文件
		logFile = logging.FileHandler(self.dirname('logData.txt'), 'a',encoding='utf-8')
		# log格式
		fmt = logging.Formatter(fmt='%(asctime)s-%(name)s-%(levelname)s-%(module)s:%(message)s')
		logFile.setFormatter(fmt)
		# 定义日志
		logger1 = logging.Logger('logTest',level=logging.DEBUG)
		logger1.addHandler(logFile)
		logger1.info(log_content)
		logFile.close()
```

info.xlsx单独放在data目录下。

用户名 密码 预期结果  
xxxxxxxxxx a123456 安全退出  
xxxxxxxxxx 请输入密码  
a123456 请输入用户名/手机号  
请输入用户名/手机号

获取截图getImage.py

```python


import os,time

def  SaveImage(driver,errorImage):
    '''用例失败截图功能'''
    Rawpath =  os.path.join(os.path.dirname(os.path.dirname(__file__)),'Image')
    # start_dir=os.path.join(os.path.dirname(__file__),'TestCases')
    #Rawpath = os.path.join(os.path.dirname(__file__),'Image')
    NewPicture  =  Rawpath + '/' + time.strftime('%Y_%y_%d_%H_%M_%S') + '_' + errorImage
    driver.get_screenshot_as_file(NewPicture)
```

HTMLTestRunner.py

```python
"""
A TestRunner for use with the Python unit testing framework. It
generates a HTML report to show the result at a glance.

The simplest way to use this is to invoke its main method. E.g.

    import unittest
    import HTMLTestRunner

    ... define your tests ...

    if __name__ == '__main__':
        HTMLTestRunner.main()


For more customization options, instantiates a HTMLTestRunner object.
HTMLTestRunner is a counterpart to unittest's TextTestRunner. E.g.

    # output to a file
    fp = file('my_report.html', 'wb')
    runner = HTMLTestRunner.HTMLTestRunner(
                stream=fp,
                title='My unit test',
                description='This demonstrates the report output by HTMLTestRunner.'
                )

    # Use an external stylesheet.
    # See the Template_mixin class for more customizable options
    runner.STYLESHEET_TMPL = '<link rel="stylesheet" href="my_stylesheet.css" type="text/css">'

    # run the test
    runner.run(my_test_suite)


------------------------------------------------------------------------
Copyright (c) 2004-2007, Wai Yip Tung
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright
  notice, this list of conditions and the following disclaimer in the
  documentation and/or other materials provided with the distribution.
* Neither the name Wai Yip Tung nor the names of its contributors may be
  used to endorse or promote products derived from this software without
  specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""

# URL: http://tungwaiyip.info/software/HTMLTestRunner.html

__author__ = "Wai Yip Tung"
__version__ = "0.8.2"


"""
Change History

Version 0.8.2
* Show output inline instead of popup window (Viorel Lupu).

Version in 0.8.1
* Validated XHTML (Wolfgang Borgert).
* Added description of test classes and test cases.

Version in 0.8.0
* Define Template_mixin class for customization.
* Workaround a IE 6 bug that it does not treat <script> block as CDATA.

Version in 0.7.1
* Back port to Python 2.3 (Frank Horowitz).
* Fix missing scroll bars in detail log (Podi).
"""

# TODO: color stderr
# TODO: simplify javascript using ,ore than 1 class in the class attribute?

import datetime
import io
import sys
import time
import unittest
from xml.sax import saxutils


# ------------------------------------------------------------------------
# The redirectors below are used to capture output during testing. Output
# sent to sys.stdout and sys.stderr are automatically captured. However
# in some cases sys.stdout is already cached before HTMLTestRunner is
# invoked (e.g. calling logging.basicConfig). In order to capture those
# output, use the redirectors for the cached stream.
#
# e.g.
#   >>> logging.basicConfig(stream=HTMLTestRunner.stdout_redirector)
#   >>>

class OutputRedirector(object):
    """ Wrapper to redirect stdout or stderr """
    def __init__(self, fp):
        self.fp = fp

    def write(self, s):
        self.fp.write(s)

    def writelines(self, lines):
        self.fp.writelines(lines)

    def flush(self):
        self.fp.flush()

stdout_redirector = OutputRedirector(sys.stdout)
stderr_redirector = OutputRedirector(sys.stderr)



# ----------------------------------------------------------------------
# Template

class Template_mixin(object):
    """
    Define a HTML template for report customerization and generation.

    Overall structure of an HTML report

    HTML
    +------------------------+
    |<html>                  |
    |  <head>                |
    |                        |
    |   STYLESHEET           |
    |   +----------------+   |
    |   |                |   |
    |   +----------------+   |
    |                        |
    |  </head>               |
    |                        |
    |  <body>                |
    |                        |
    |   HEADING              |
    |   +----------------+   |
    |   |                |   |
    |   +----------------+   |
    |                        |
    |   REPORT               |
    |   +----------------+   |
    |   |                |   |
    |   +----------------+   |
    |                        |
    |   ENDING               |
    |   +----------------+   |
    |   |                |   |
    |   +----------------+   |
    |                        |
    |  </body>               |
    |</html>                 |
    +------------------------+
    """

    STATUS = {
    0: 'pass',
    1: 'fail',
    2: 'error',
    }

    DEFAULT_TITLE = 'Unit Test Report'
    DEFAULT_DESCRIPTION = ''

    # ------------------------------------------------------------------------
    # HTML Template

    HTML_TMPL = r"""<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>%(title)s</title>
    <meta name="generator" content="%(generator)s"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    %(stylesheet)s
</head>
<body>
<script language="javascript" type="text/javascript"><!--
output_list = Array();

/* level - 0:Summary; 1:Failed; 2:All */
function showCase(level) {
    trs = document.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
        tr = trs[i];
        id = tr.id;
        if (id.substr(0,2) == 'ft') {
            if (level < 1) {
                tr.className = 'hiddenRow';
            }
            else {
                tr.className = '';
            }
        }
        if (id.substr(0,2) == 'pt') {
            if (level > 1) {
                tr.className = '';
            }
            else {
                tr.className = 'hiddenRow';
            }
        }
    }
}


function showClassDetail(cid, count) {
    var id_list = Array(count);
    var toHide = 1;
    for (var i = 0; i < count; i++) {
        tid0 = 't' + cid.substr(1) + '.' + (i+1);
        tid = 'f' + tid0;
        tr = document.getElementById(tid);
        if (!tr) {
            tid = 'p' + tid0;
            tr = document.getElementById(tid);
        }
        id_list[i] = tid;
        if (tr.className) {
            toHide = 0;
        }
    }
    for (var i = 0; i < count; i++) {
        tid = id_list[i];
        if (toHide) {
            document.getElementById('div_'+tid).style.display = 'none'
            document.getElementById(tid).className = 'hiddenRow';
        }
        else {
            document.getElementById(tid).className = '';
        }
    }
}


function showTestDetail(div_id){
    var details_div = document.getElementById(div_id)
    var displayState = details_div.style.display
    // alert(displayState)
    if (displayState != 'block' ) {
        displayState = 'block'
        details_div.style.display = 'block'
    }
    else {
        details_div.style.display = 'none'
    }
}


function html_escape(s) {
    s = s.replace(/&/g,'&amp;');
    s = s.replace(/</g,'&lt;');
    s = s.replace(/>/g,'&gt;');
    return s;
}

/* obsoleted by detail in <div>
function showOutput(id, name) {
    var w = window.open("", //url
                    name,
                    "resizable,scrollbars,status,width=800,height=450");
    d = w.document;
    d.write("<pre>");
    d.write(html_escape(output_list[id]));
    d.write("\n");
    d.write("<a href='javascript:window.close()'>close</a>\n");
    d.write("</pre>\n");
    d.close();
}
*/
--></script>

%(heading)s
%(report)s
%(ending)s

</body>
</html>
"""
    # variables: (title, generator, stylesheet, heading, report, ending)


    # ------------------------------------------------------------------------
    # Stylesheet
    #
    # alternatively use a <link> for external style sheet, e.g.
    #   <link rel="stylesheet" href="$url" type="text/css">

    STYLESHEET_TMPL = """
<style type="text/css" media="screen">
body        { font-family: verdana, arial, helvetica, sans-serif; font-size: 80%; }
table       { font-size: 100%; }
pre         { }

/* -- heading ---------------------------------------------------------------------- */
h1 {
	font-size: 16pt;
	color: gray;
}
.heading {
    margin-top: 0ex;
    margin-bottom: 1ex;
}

.heading .attribute {
    margin-top: 1ex;
    margin-bottom: 0;
}

.heading .description {
    margin-top: 4ex;
    margin-bottom: 6ex;
}

/* -- css div popup ------------------------------------------------------------------------ */
a.popup_link {
}

a.popup_link:hover {
    color: red;
}

.popup_window {
    display: none;
    position: relative;
    left: 0px;
    top: 0px;
    /*border: solid #627173 1px; */
    padding: 10px;
    background-color: #E6E6D6;
    font-family: "Lucida Console", "Courier New", Courier, monospace;
    text-align: left;
    font-size: 8pt;
    width: 500px;
}

}
/* -- report ------------------------------------------------------------------------ */
#show_detail_line {
    margin-top: 3ex;
    margin-bottom: 1ex;
}
#result_table {
    width: 80%;
    border-collapse: collapse;
    border: 1px solid #777;
}
#header_row {
    font-weight: bold;
    color: white;
    background-color: #777;
}
#result_table td {
    border: 1px solid #777;
    padding: 2px;
}
#total_row  { font-weight: bold; }
.passClass  { background-color: #6c6; }
.failClass  { background-color: #c60; }
.errorClass { background-color: #c00; }
.passCase   { color: #6c6; }
.failCase   { color: #c60; font-weight: bold; }
.errorCase  { color: #c00; font-weight: bold; }
.hiddenRow  { display: none; }
.testcase   { margin-left: 2em; }


/* -- ending ---------------------------------------------------------------------- */
#ending {
}

</style>
"""



    # ------------------------------------------------------------------------
    # Heading
    #

    HEADING_TMPL = """<div class='heading'>
<h1>%(title)s</h1>
%(parameters)s
<p class='description'>%(description)s</p>
</div>

""" # variables: (title, parameters, description)

    HEADING_ATTRIBUTE_TMPL = """<p class='attribute'><strong>%(name)s:</strong> %(value)s</p>
""" # variables: (name, value)



    # ------------------------------------------------------------------------
    # Report
    #

    REPORT_TMPL = """
<p id='show_detail_line'>Show
<a href='javascript:showCase(0)'>Summary</a>
<a href='javascript:showCase(1)'>Failed</a>
<a href='javascript:showCase(2)'>All</a>
</p>
<table id='result_table'>
<colgroup>
<col align='left' />
<col align='right' />
<col align='right' />
<col align='right' />
<col align='right' />
<col align='right' />
</colgroup>
<tr id='header_row'>
    <td>Test Group/Test case</td>
    <td>Count</td>
    <td>Pass</td>
    <td>Fail</td>
    <td>Error</td>
    <td>View</td>
</tr>
%(test_list)s
<tr id='total_row'>
    <td>Total</td>
    <td>%(count)s</td>
    <td>%(Pass)s</td>
    <td>%(fail)s</td>
    <td>%(error)s</td>
    <td>&nbsp;</td>
</tr>
</table>
""" # variables: (test_list, count, Pass, fail, error)

    REPORT_CLASS_TMPL = r"""
<tr class='%(style)s'>
    <td>%(desc)s</td>
    <td>%(count)s</td>
    <td>%(Pass)s</td>
    <td>%(fail)s</td>
    <td>%(error)s</td>
    <td><a href="javascript:showClassDetail('%(cid)s',%(count)s)">Detail</a></td>
</tr>
""" # variables: (style, desc, count, Pass, fail, error, cid)


    REPORT_TEST_WITH_OUTPUT_TMPL = r"""
<tr id='%(tid)s' class='%(Class)s'>
    <td class='%(style)s'><div class='testcase'>%(desc)s</div></td>
    <td colspan='5' align='center'>

    <!--css div popup start-->
    <a class="popup_link" onfocus='this.blur();' href="javascript:showTestDetail('div_%(tid)s')" >
        %(status)s</a>

    <div id='div_%(tid)s' class="popup_window">
        <div style='text-align: right; color:red;cursor:pointer'>
        <a onfocus='this.blur();' onclick="document.getElementById('div_%(tid)s').style.display = 'none' " >
           [x]</a>
        </div>
        <pre>
        %(script)s
        </pre>
    </div>
    <!--css div popup end-->

    </td>
</tr>
""" # variables: (tid, Class, style, desc, status)


    REPORT_TEST_NO_OUTPUT_TMPL = r"""
<tr id='%(tid)s' class='%(Class)s'>
    <td class='%(style)s'><div class='testcase'>%(desc)s</div></td>
    <td colspan='5' align='center'>%(status)s</td>
</tr>
""" # variables: (tid, Class, style, desc, status)


    REPORT_TEST_OUTPUT_TMPL = r"""
%(id)s: %(output)s
""" # variables: (id, output)



    # ------------------------------------------------------------------------
    # ENDING
    #

    ENDING_TMPL = """<div id='ending'>&nbsp;</div>"""

# -------------------- The end of the Template class -------------------


TestResult = unittest.TestResult

class _TestResult(TestResult):
    # note: _TestResult is a pure representation of results.
    # It lacks the output and reporting ability compares to unittest._TextTestResult.

    def __init__(self, verbosity=1):
        TestResult.__init__(self)
        self.stdout0 = None
        self.stderr0 = None
        self.success_count = 0
        self.failure_count = 0
        self.error_count = 0
        self.verbosity = verbosity

        # result is a list of result in 4 tuple
        # (
        #   result code (0: success; 1: fail; 2: error),
        #   TestCase object,
        #   Test output (byte string),
        #   stack trace,
        # )
        self.result = []


    def startTest(self, test):
        TestResult.startTest(self, test)
        # just one buffer for both stdout and stderr
        self.outputBuffer = io.StringIO()
        stdout_redirector.fp = self.outputBuffer
        stderr_redirector.fp = self.outputBuffer
        self.stdout0 = sys.stdout
        self.stderr0 = sys.stderr
        sys.stdout = stdout_redirector
        sys.stderr = stderr_redirector


    def complete_output(self):
        """
        Disconnect output redirection and return buffer.
        Safe to call multiple times.
        """
        if self.stdout0:
            sys.stdout = self.stdout0
            sys.stderr = self.stderr0
            self.stdout0 = None
            self.stderr0 = None
        return self.outputBuffer.getvalue()


    def stopTest(self, test):
        # Usually one of addSuccess, addError or addFailure would have been called.
        # But there are some path in unittest that would bypass this.
        # We must disconnect stdout in stopTest(), which is guaranteed to be called.
        self.complete_output()


    def addSuccess(self, test):
        self.success_count += 1
        TestResult.addSuccess(self, test)
        output = self.complete_output()
        self.result.append((0, test, output, ''))
        if self.verbosity > 1:
            sys.stderr.write('ok ')
            sys.stderr.write(str(test))
            sys.stderr.write('\n')
        else:
            sys.stderr.write('.')

    def addError(self, test, err):
        self.error_count += 1
        TestResult.addError(self, test, err)
        _, _exc_str = self.errors[-1]
        output = self.complete_output()
        self.result.append((2, test, output, _exc_str))
        if self.verbosity > 1:
            sys.stderr.write('E  ')
            sys.stderr.write(str(test))
            sys.stderr.write('\n')
        else:
            sys.stderr.write('E')

    def addFailure(self, test, err):
        self.failure_count += 1
        TestResult.addFailure(self, test, err)
        _, _exc_str = self.failures[-1]
        output = self.complete_output()
        self.result.append((1, test, output, _exc_str))
        if self.verbosity > 1:
            sys.stderr.write('F  ')
            sys.stderr.write(str(test))
            sys.stderr.write('\n')
        else:
            sys.stderr.write('F')


class HTMLTestRunner(Template_mixin):
    """
    """
    def __init__(self, stream=sys.stdout, verbosity=1, title=None, description=None):
        self.stream = stream
        self.verbosity = verbosity
        if title is None:
            self.title = self.DEFAULT_TITLE
        else:
            self.title = title
        if description is None:
            self.description = self.DEFAULT_DESCRIPTION
        else:
            self.description = description

        self.startTime = datetime.datetime.now()


    def run(self, test):
        "Run the given test case or test suite."
        result = _TestResult(self.verbosity)
        test(result)
        self.stopTime = datetime.datetime.now()
        self.generateReport(test, result)
        # print >> sys.stderr, '\nTime Elapsed: %s' % (self.stopTime-self.startTime)
        print(sys.stderr, '\nTime Elapsed: %s' % (self.stopTime-self.startTime))
        return result


    def sortResult(self, result_list):
        # unittest does not seems to run in any particular order.
        # Here at least we want to group them together by class.
        rmap = {}
        classes = []
        for n,t,o,e in result_list:
            cls = t.__class__
            if not cls in rmap:
                rmap[cls] = []
                classes.append(cls)
            rmap[cls].append((n,t,o,e))
        r = [(cls, rmap[cls]) for cls in classes]
        return r


    def getReportAttributes(self, result):
        """
        Return report attributes as a list of (name, value).
        Override this to add custom attributes.
        """
        startTime = str(self.startTime)[:19]
        duration = str(self.stopTime - self.startTime)
        status = []
        if result.success_count: status.append('Pass %s'    % result.success_count)
        if result.failure_count: status.append('Failure %s' % result.failure_count)
        if result.error_count:   status.append('Error %s'   % result.error_count  )
        if status:
            status = ' '.join(status)
        else:
            status = 'none'
        return [
            ('Start Time', startTime),
            ('Duration', duration),
            ('Status', status),
        ]


    def generateReport(self, test, result):
        report_attrs = self.getReportAttributes(result)
        generator = 'HTMLTestRunner %s' % __version__
        stylesheet = self._generate_stylesheet()
        heading = self._generate_heading(report_attrs)
        report = self._generate_report(result)
        ending = self._generate_ending()
        output = self.HTML_TMPL % dict(
            title = saxutils.escape(self.title),
            generator = generator,
            stylesheet = stylesheet,
            heading = heading,
            report = report,
            ending = ending,
        )
        self.stream.write(output.encode('utf8'))


    def _generate_stylesheet(self):
        return self.STYLESHEET_TMPL


    def _generate_heading(self, report_attrs):
        a_lines = []
        for name, value in report_attrs:
            line = self.HEADING_ATTRIBUTE_TMPL % dict(
                    name = saxutils.escape(name),
                    value = saxutils.escape(value),
                )
            a_lines.append(line)
        heading = self.HEADING_TMPL % dict(
            title = saxutils.escape(self.title),
            parameters = ''.join(a_lines),
            description = saxutils.escape(self.description),
        )
        return heading


    def _generate_report(self, result):
        rows = []
        sortedResult = self.sortResult(result.result)
        for cid, (cls, cls_results) in enumerate(sortedResult):
            # subtotal for a class
            np = nf = ne = 0
            for n,t,o,e in cls_results:
                if n == 0: np += 1
                elif n == 1: nf += 1
                else: ne += 1

            # format class description
            if cls.__module__ == "__main__":
                name = cls.__name__
            else:
                name = "%s.%s" % (cls.__module__, cls.__name__)
            doc = cls.__doc__ and cls.__doc__.split("\n")[0] or ""
            desc = doc and '%s: %s' % (name, doc) or name

            row = self.REPORT_CLASS_TMPL % dict(
                style = ne > 0 and 'errorClass' or nf > 0 and 'failClass' or 'passClass',
                desc = desc,
                count = np+nf+ne,
                Pass = np,
                fail = nf,
                error = ne,
                cid = 'c%s' % (cid+1),
            )
            rows.append(row)

            for tid, (n,t,o,e) in enumerate(cls_results):
                self._generate_report_test(rows, cid, tid, n, t, o, e)

        report = self.REPORT_TMPL % dict(
            test_list = ''.join(rows),
            count = str(result.success_count+result.failure_count+result.error_count),
            Pass = str(result.success_count),
            fail = str(result.failure_count),
            error = str(result.error_count),
        )
        return report


    def _generate_report_test(self, rows, cid, tid, n, t, o, e):
        # e.g. 'pt1.1', 'ft1.1', etc
        has_output = bool(o or e)
        tid = (n == 0 and 'p' or 'f') + 't%s.%s' % (cid+1,tid+1)
        name = t.id().split('.')[-1]
        doc = t.shortDescription() or ""
        desc = doc and ('%s: %s' % (name, doc)) or name
        tmpl = has_output and self.REPORT_TEST_WITH_OUTPUT_TMPL or self.REPORT_TEST_NO_OUTPUT_TMPL

        # o and e should be byte string because they are collected from stdout and stderr?
        if isinstance(o,str):
            # TODO: some problem with 'string_escape': it escape \n and mess up formating
            # uo = unicode(o.encode('string_escape'))
            # uo = o.decode('latin-1')
            uo = e
        else:
            uo = o
        if isinstance(e,str):
            # TODO: some problem with 'string_escape': it escape \n and mess up formating
            # ue = unicode(e.encode('string_escape'))
            # ue = e.decode('latin-1')
            ue = e
        else:
            ue = e

        script = self.REPORT_TEST_OUTPUT_TMPL % dict(
            id = tid,
            output = saxutils.escape(str(uo)+ue),
        )

        row = tmpl % dict(
            tid = tid,
            Class = (n == 0 and 'hiddenRow' or 'none'),
            style = n == 2 and 'errorCase' or (n == 1 and 'failCase' or 'none'),
            desc = desc,
            script = script,
            status = self.STATUS[n],
        )
        rows.append(row)
        if not has_output:
            return

    def _generate_ending(self):
        return self.ENDING_TMPL


##############################################################################
# Facilities for running tests from the command line
##############################################################################

# Note: Reuse unittest.TestProgram to launch test. In the future we may
# build our own launcher to support more specific command line
# parameters like test title, CSS, etc.
class TestProgram(unittest.TestProgram):
    """
    A variation of the unittest.TestProgram. Please refer to the base
    class for command line parameters.
    """
    def runTests(self):
        # Pick HTMLTestRunner as the default test runner.
        # base class's testRunner parameter is not useful because it means
        # we have to instantiate HTMLTestRunner before we know self.verbosity.
        if self.testRunner is None:
            self.testRunner = HTMLTestRunner(verbosity=self.verbosity)
        unittest.TestProgram.runTests(self)

main = TestProgram

##############################################################################
# Executing this module from the command line
##############################################################################

if __name__ == "__main__":
    main(module=None)
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


#实现的逻辑
#1.先生成测试报告
#2.查找最新的测试报告 通过new_file函数 找到最新的测试报告 作为一个结果返回 file_path
#3.把new_file函数 找到最新的测试报告 file_path (最新的测试报告) 以邮件附件的形式加载到邮件模版中 设置参数  连接邮箱服务器发送最新的测试报告
```

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
# 	'''获取testCases下面的所有测试用例'''
# 	case = os.path.join(os.path.dirname(__file__),'TestCases')
# 	suite = unittest.defaultTestLoader.discover(case,pattern='test*.py')
# 	return suite
#
# def getTime():
# 	'''获取当前系统时间'''
# 	return time.strftime("%Y_%m_%d_%H_%M_%S")
#
# def run():
# 	'''主函数入口'''
# 	report = os.path.join(os.path.dirname(__file__),'report',getTime())  +  '_report.html'
# 	HTMLTestRunner(stream=open(report,'wb'),title='po自动化测试设计模式',description='window10 chrome67').run(allTest())
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

-   多线程的调用

```python
##2.16.3  多线程调用浏览器运行实战

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
