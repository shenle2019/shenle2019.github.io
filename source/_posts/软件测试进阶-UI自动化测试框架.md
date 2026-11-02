---
title: 软件测试进阶-UI自动化测试框架
date: '2021-12-06T00:00:00+00:00'
permalink: 2021/12/06/软件测试进阶-UI自动化测试框架/
categories:
  - 软件测试
tags:
  - UI自动化测试框架
---

### Python+selenium实现自动化测试框架

-   基于虫师《Selenium2自动化测试实战-基于Python语言》的学习笔记
    
-   自动化测试基础部分
    
    **分层的自动化测试，从底往上一般分为**：
    
    1.  Unit（数据处理层），一般用白盒单元测试，CodeReview
        
    2.  Service（业务逻辑层），一般用模块接口测试或者Web接口测试
        
    3.  UI（UI界面层），一般用UI自动化测试或者JS自动化测试
        
    
    **什么样的项目适合自动化测试**：
    
    1.  软件需求变动不频繁
        
    2.  项目周期较长
        
    3.  自动化测试脚本可以重复使用
        
-   其他基础
    
    1.  Selenium工具
    2.  前端三件套，html+css+Js
    3.  Chrome浏览器的话，会用F12，定位元素，查看xpath之类
    4.  Python基础+selenium包下载安装+Pycharm使用等

-   WebDriver API
    
    1.  从定位元素开始，八大定位元素。
        
        随便百度参考一个[selenium八大元素定位方法](https://www.cnblogs.com/renshengruxi/p/12511654.html)
        
        常用的就是id，name，css，xpath等定位方法。
        
    2.  其他操作，如控制浏览器大小，后退、前进、刷新页面、
        
        元素操作，清除文本，按键输入，单击元素；接口操作表单提交；
        
        鼠标事件：右击、悬停、双击、拖放等；
        
        **常用验证信息：title，URL，和text；**
        
        设置元素等待，显示等待，隐式等待（较为简单）。sleep 休眠；
        
        定位一组元素，element改为elements；
        
        多表单切换；多窗口切换；
        
        警告框处理、上传下载文件；
        
        操作cookies；调用JS，处理HTML5视频播放、窗口截图、关闭窗口、验证码处理等；
        
-   常用自动化测试框架模型
    
    1.  线性测试
    2.  模块化驱动测试
    3.  数据驱动测试（常用读取文件txt、csv、xml等）
    4.  关键字驱动测试
-   Selenium IDE，可结合浏览器提供脚本录制、回放以及编辑等功能。
    
-   unittest单元测试框架
    
    1.  提供用例组织和执行
        
        setup（） + 用例 +teardown（）
        
    2.  提供丰富的比较方法
        
    3.  提供丰富的日志
        
-   unittest中的几个概念理解
    
    1.  test case 测试用例
        
    2.  test suite 多个用例的集合，可以组装test case，比如用addTest加载用例到testsuite中
        
    3.  test runner提供run（）方法来执行test case，test suite
        
    4.  test fixture对测试用例环境的搭建setup（）和销毁teardown（）
        
    5.  TestLoader类加载测试用例，可不需创建实例，因unittest提供了可以共享的defaultTestLoader类，
        
        可以用其子类和方法来创建实例。常用discover方法。
        
        discover(start\_dir, pattern=’test\*.py’, top\_level\_dir=None)
        
        runner.run(discover)
        
-   **断言方法**
    
    断言,自动判断测试用例的测试结果是否成功：assert()  
    是预期结果和实际结果的比较，是继承了testcase的方法
    
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
    
-   HTMLTestRunner模块，生成HTML测试报告
    
-   Page Object设计模式
    
    1.  po模型设计思想
    
    * * *
    
    　　Page Object 模式主要是将每个页面设计为一个class，其中包含页面中的需要测试的元素（按钮，输入框，标题等），这样在Selenium测试页面中可以通过调取页面类来获取页面元素，这样避免当页面元素id或者位置变化后，需要改测试代码。当元素ID变化时，只需要改测试页面Class中的页面属性即可。将页面定位与和业务分开，分离测试对象（元素对象）和测试脚本（用例脚本），提高可维护性。
    
    　　Page Object模式是一种自动化测试设计模式，将页面定位和业务操作分开，分离测试对象（元素对象）和测试脚本（用例脚本），提高用例的可维护性。
    
    ```
    unittest是一种单元测试框架，用于设计各式各样的测试用例，可调用PageObject设计的页面类（对象），设计出更加可维护的用例。它提供用例组织与执行，提供丰富的比较（断言）方法，提供丰富的日志，统一适用于web自动化用例的开发与执行。
    ```
    
    　　UI自动化最核心的问题定位是，跟业务层解耦出来，单独处理定位的问题，然后在实现业务层。所使用到的方法是对一个UI页面做测试我们抽取为三层，举例为BasePage+LoginPage+Unittest。 　
    
    　　后续示例中，PO模型的基本思路：login\_page(查找页面元素类) —>login\_handle(操作层，将查找到的元素位置上传递数据) —> login\_business(业务层：调用操作层，根据操作层的传递的结果进行判断场景，如邮箱错误场景等) —> first\_case(封装调用业务层，进行测试用例的场景组装)
    
    2.  po模型之如何设计操作层
    
    * * *
    
    查找页面元素类：把定位页面元素的方法都封装在相应的一个相应页面中，此页面的元素定位方式都可以在这个文件中找到
    
    操作层：编写注册过程中需要的方法，比如输入用户名、密码等页面操作,工具类-保存页面操作的所有方法。
    
    业务层：把操作层组装起来
    
    查找页面元素类：loginPage.py
    
    操作层：loginrHandle.py
    
    业务层：loginbusiness.py
    
    下面以126邮箱web登录页面为例展示编写PO模型
    
    3.  定位页面元素类
    
    * * *
    
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
    
    4.  操作层
    
    * * *
    
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
    
    5.  业务层
    
    * * *
    
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
    
-   BBS项目实战：
    
    目录
    
    ![mztestpro](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC9UExURVlZWdPT07KysmRkZIWFhfT09JmZmWZmZm9vb39/fxkZGUxMTDMzM3p6epCQkKamppubm729venp6cjIyN7e3tbW1s/Pz8LCwnx8fLS0tFZWVoiIiI+Pj6GhoeTk5Glpabu7u93d3evr66CgoJSUlKqqqsnJyeDg4Hd3d8PDw+Xl5bi4uNHR0dvb26Ojo6urq+fn51hYWDg4OCgoKHBwcK2traenp0FBQe7u7vHx8U5OTre3t8zMzHV1df///7GrnpQAAAA/dFJOU///////////////////////////////////////////////////////////////////////////////////AI4mfBcAAAUGSURBVHja7NoJb6M4GMZxY0NCD64kve/pMZ2d3Z297+X7f6zFNmBAMUXa6URl/q9UJSWPUPzrizFWRUlNLgEBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYYIEFAVhggQUWWGBBABZYYIEFFlgQgAUWWGCBBRYEYIEFFlhggQUBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYn6cCIcRXgvX/h9qcIVBqDdbEM8RCxGCB9QqXYRwHYDHBgwXWl8eKZKiESHI3Ba1kWs3fKixcaJUl1YyeBm7Ocq+yLItUiVBGnXxenSHJolIKEcwHq6ikbOX1YGVzQCTN8LPmSLreghUl9sN4Uw7yajMrLC0TZ1ImzqY6FEop0+pIaEN5HaoOxVuwEqFyc4I46uSlzOLqgxlh6UaR9l3VYWl9Fdoxb1Q90KJtu41pwwFW/WHhTtW8i7TafLCqRsk6bsGw63L9qurXRmuIlbT9lDQnlXU+nBFW1Q2qnZbDprWa2tjR90LZFqx1/+Td/HpGWLlrLDvIwTcx6dQ1Vrntbig68cDms3JwbA5Y1azs1ger6sNV/bbIw1jU81MvNAGrl58RVn8ozW+btF08iGFoAlYvP3csfVur1gJBEIA1uBmue5dhZDOyO2epbmgCVi8/I6x0MMHH9pjsTfBhNzQBq5uPZoQlB0uH3DZG4EZqQ26fL3sZq5uf09Ih6qw3i/pm6BZO0qZX7rrUS68Xsbr5ZE4rePMk08pk9aUZugfqppvs6AM1Acvlo/StP+6EbW06z8hJqxbYp2BZPQUnFsLsKuhQdaHqn5ewbF7KXIn0jWO5MqOQ7RaNLPtbNMmmhimj0GUmYLl8Gs0Lq4wyPbTu1l2QKqHSouzs3OlDIslW5SQsnY/NXmFplyNvEuuLV/Tau9BzwiraDUSwXmysztYWWNtL1psXeumgIrDGaqXvBfUuvtqUYI3V2t1wk1e2msFluJJm6zDJXv/fIfjPP7DAAgsssCiwwAILLLDAosACCyywwAKLAgsssMACC6zt9fDz/v75tyOB+98PD2+ORgKffjw4OP1uJPDxl+Xy8v1I4MPF3t7VNyOB4/vF4uzdzrG+39f1kz/w66Guv/yBvw90KX/gZKkr8Qf+2dOV+gNHC12/7RxrabD2/a31bLAO/a11YbAO/K21MFhLf2s9Gqw9f2vdGqzFu11jnVusE2/gxmI9eQOnFuvYG7i0WH7uK4t15w2cWazrXWP9a7H8f/bQYvm/6IPF+sF/pVssf19Ii/WH/0K2WH/uGuvEWC39gSdj9Twy+Rqri5EZx1gt/IE7Y/XoD1wbq9vd3w1PlufnD2OBp+ebm/uxwPHF6emnscDR4vLy41jg7vHq6sNY4Pr27OyYdRaLUrDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssL6u+k+AAQCR9eHtLKvLfwAAAABJRU5ErkJggg==)
    

关键脚本:

1.  编写公共模块,driver.py
    
    ```python
    # coding:utf-8
    # from selenium.webdriver import Remote
    from selenium import webdriver
    from selenium.webdriver.support.ui import WebDriverWait

    #启动浏览器
    def browser():
        option = webdriver.ChromeOptions()  # 加载浏览器配置
        option.add_argument('disable-infobars')  # 浏览器不显示受自动测试软件控制
        option.add_argument('-kiosk')

        driver = webdriver.Chrome(chrome_options=option)
        # host = "127.0.0.1:4444"
        # dc = {'browserName':'chrome'}
        # driver = Remote(command_executor ='http://' + host + '/wd/hub' ,desired_capabilities=dc)

        # 本地启动一个主hub和一个node节点（主机端口4444，node节点5555）的方法,本机ip172.16.10.66
        # java -jar selenium-server-standalone-2.48.2.jar -role hub
        # java -jar selenium-server-standalone-2.48.2.jar -role node port 5555
        # 启动一个远程node ，如172.16.10.34:6666
        # java -jar selenium-server-standalone-2.48.2.jar -role node port 6666 -hub http://172.16.10.66:4444/grid/register
        return driver


    if __name__ == "__main__":
        print(__file__)
        dr = browser()
        dr.get("http://www.baidu.com")
        dr.quit()
    ```
    
2.  自定义测试框架myunit.py
    
    ```python
    from selenium import webdriver
    from .driver import browser
    import unittest
    import os

    class MyTest(unittest.TestCase):
    	def setUp(self):
    		self.driver = browser()
    		self.driver.implicitly_wait(30)
    		self.driver.maximize_window()
    		
    	def tearDown(self):
    		self.driver.quit()
    ```
    
3.  定义截图功能funtion.py
    
    ```python
    # coding:utf-8
    from selenium import webdriver
    import sys
    import os

    #截屏
    def insert_img(driver,file_name):
    	base_dir = os.path.dirname(os.path.dirname(__file__))
    	#base_dir = str(base_dir)
    	base_dir = base_dir.replace("\\","/")
    	base_dir = base_dir.split('/test_case')[0]
    	file_path = base_dir + "/report/image/" + file_name
    	driver.get_screenshot_as_file(file_path)
    	
    # #获取最新的测试报告，用于发送测试报告邮件
    # def new_report(file_path):
    # 	files = os.listdir(file_path)
    # 	f_times = []
    # 	for f in files:
    # 		if os.path.splitext(file_path + f)[1] == '.html':
    # 			f_time = os.path.getmtime(file_path + f)
    # 			f_times.append((f_time, f))
    #
    # 	return sorted(f_times)[-1][1]

    	
    if __name__ == '__main__':
    	sys.path.append("D:\pythontest\mztestpro\mztestpro-master\bbs\test_case\models")
    	print(sys.path)
    	import driver
    	driver = driver.browser()
    	driver.get("http://www.baidu.com")
    	insert_img(driver,"baidu.png")
    	driver.quit()
    ```
    
4.  编写pageObject，page基础类base.py
    
    ```python
    # coding:utf-8

    class Page(object):
        '''
        基础页面，供所有的页面对象继承
        '''
        # bbs_url = "http://10.200.12.8:8099"
        # bbs_url = "https://bbs.meizu.cn"
        bbs_url = "http://www.broadview.com.cn/"

        def __init__(self, selenium_driver, base_url=bbs_url, parent=None):
            self.base_url = base_url
            self.driver = selenium_driver
            self.timeout = 30
            self.parent = parent

        def _open(self, url):
            url = self.base_url + url
            self.driver.get(url)
            # 这里初始化会判断当前页的ip，然后打印出来，如果不一致则会报错
            assert self.on_page(), 'Did not land on %s' % url

        def on_page(self):
            print('当前登录页ip：%s' % self.driver.current_url)
            return self.driver.current_url == (self.base_url + self.url)

        def open(self):
            self._open(self.url)

        def script(self, src):
            self.driver.execute_script(src)

        def find_element(self, *loc):
            return self.driver.find_element(*loc)

        def find_elements(self, *loc):
            return self.driver.find_elements(*loc)

        # 获取弹出框内的文案
        def alert_info(self):
            return self.driver.switch_to_alert()
    ```
    
5.  创建BBS对象登录类loginPage.py
    
    ```python
    # coding:utf-8

    from selenium.webdriver.common.action_chains import ActionChains
    from selenium.webdriver.common.by import By
    from selenium.webdriver.remote.webelement import WebElement

    from .base import Page
    from time import sleep, time


    class Login(Page):
        '''
        用户登录页面
        '''
        # url = '/baobeipc/html/login.html'
        url = ''
        # bbs_login_user_loc = (By.XPATH,".//*[@id='mzCust']/div/div[1]/img[1]")
        # bbs_login_button_loc = (By.ID,"mzLogin")
        # /html/body/div/div[2]/div/div/div/div/div/a[2]
        bbs_login_button_loc = (By.XPATH, '/html/body/div/div[2]/div/div/div/div/div/a[2]')
        # bbs_login_button_loc = (By.XPATH, '//*[@id="loginLink"]')

        # 鼠标悬停
        # def hover(self, by, value):
        #     element = self.findbyElement(by, value)
        #     ActionChains(self.driver).move_to_element(element).perform()
        #
        # # ## 通过不同的方式查找界面元素
        # def findbyElement(self, by, value):
        #     if (by == "id"):
        #         element = self.driver.find_element_by_id(value)
        #         return element
        #     elif (by == "name"):
        #         element = self.driver.find_element_by_name(value)
        #         return element
        #     elif (by == "XPATH"):
        #         element = self.driver.find_element_by_xpath(value)
        #         return element
        #     elif (by == "classname"):
        #         element = self.driver.find_element_by_class_name(value)
        #         return element
        #     elif (by == "css"):
        #         element = self.driver.find_element_by_css_selector(value)
        #         return element
        #     elif (by == "link_text"):
        #         element = self.driver.find_element_by_link_text(value)
        #         return element
        #     else:
        #         print("无对应方法，请检查")
        #         return None

        def bbs_login(self):
            self.find_element(*self.bbs_login_button_loc).click()
            #self.find_element(*self.bbs_login_user_loc).click()
            # 获取登录头像，获取后移动到弹窗，然后点击登录
            # above = self.find_element(*self.bbs_my_link_loc)
            # ActionChains(self.driver).move_to_element(above).perform()
            # element = self.find_element(*self.bbs_login_button_loc)
            # print("---------找到登录按钮----------" + element.get_attribute(id))
            # self.find_element(*self.bbs_my_link_loc).click()

            # //*[@id="loginLink"]
            # self.hover(by='XPATH', value='//*[@id="loginLink"]')
            # loginbutton = self.driver.findElement(by='XPATH', value='//*[@id="loginLink"]')
            # print("---------loginbutton----------" + loginbutton)
            #
            # if loginbutton != None:
            #     self.assertEqual(1, 1)
            # else:
            #     self.assertEqual(1, 0)
            #     time.sleep(3)

        # login_username_loc = (By.CSS_SELECTOR,"ipt-account inp-focus")
        # login_password_loc = (By.CSS_SELECTOR,"inp-focus")
        # login_button_loc = (By.CLASS_NAME,"tipInfo")

        login_username_loc = (By.XPATH, '//*[@id="Email"]')
        login_password_loc = (By.XPATH, '//*[@id="Password"]')
        # /html/body/div/div[3]/div/div/div/div/div/div[1]/form/div[5]/button
        login_button_loc = (By.XPATH, "/html/body/div/div[3]/div/div/div/div/div/div[1]/form/div[5]/button")

        #登陆用户名

        def login_username(self,username):
            self.find_element(*self.login_username_loc).clear()
            self.find_element(*self.login_username_loc).send_keys(username)

        #登录密码

        def login_password(self,password):
            self.find_element(*self.login_password_loc).clear()
            self.find_element(*self.login_password_loc).send_keys(password)


        #登录按钮

        def login_botton(self):
            self.find_element(*self.login_button_loc).click()


        #定义统一的登录入口

        def user_login(self,username="username",password="1111"):
            """获取的用户名登录"""
            self.open()
            print("---------base open验证完毕----------" )
            self.bbs_login()
            print("---------bbs login验证完毕----------" )
            self.login_username(username)
            print("---------用户名 验证完毕----------" )
            self.login_password(password)
            print("---------密码 验证完毕----------" )
            self.login_botton()
            print("---------点击登录按钮 验证完毕----------" )
            sleep(3)

        # #登录断言
        # username_erro_loc = (By.XPATH,"//span[@for='account']")
        # password_erro_loc = (By.XPATH,"//span[@for='password']")
        user_login_sucess_loc = (By.XPATH, "/html/body/div/div[2]/div/div/div/div[1]/div/a[1]")
        #
        # #用户名错误
        # def username_erro(self):
        #     return self.find_element(*self.username_erro_loc).text
        #
        # #密码错误
        # def password_erro(self):
        #     return self.find_element(*self.password_erro_loc).text
        #
        #登录成功
        # def user_login_success(self):
        #     return self.find_element(*self.user_login_sucess_loc).text
    ```
    
6.  编写测试用例login\_sta.py
    
    ```python
    # coding:utf-8
    import unittest, sys, random

    sys.path.append("./models")
    sys.path.append("./page_obj")
    from models import myunit, function
    from page_obj.loginPage import Login
    from time import sleep
    from selenium.webdriver.common.by import By


    class LoginTest(myunit.MyTest):
        '''社区登录'''

        # 测试用户登录
        def user_login_verify(self, username="", password=""):
            Login(self.driver).user_login(username, password)

        def test_login1(self):
            '''用户名和密码都为空'''
            print("---------用户名密码开始验证----------" )
            self.user_login_verify()
            print("---------用户名密码验证完成----------" )
            po = Login(self.driver)
            # alert = po.alert_info()
            # print(alert)
            # username_mes = alert.text
            username_mes = po.find_element(By.ID, "Email-error").text
            print(username_mes)
            self.assertEqual(username_mes, '请输入邮箱')
            # alert.accept()
            sleep(1)
            function.insert_img(self.driver, 'username_pass_kong.jpg')

        def test_login2(self):
            #     '''用户名正确，密码为空'''
            print("---------用户名密码开始验证2----------" )
            self.user_login_verify(username='305030951@qq.com')
            print("---------用户名密码验证完成2----------" )
            po = Login(self.driver)
            # alert = po.alert_info()
            # print(alert)
            # username_mes = alert.text
            password_mes = po.find_element(By.ID, "Password-error").text
            print(password_mes)
            self.assertEqual(password_mes, '请输入密码')
            # alert.accept()
            sleep(1)
            function.insert_img(self.driver, 'password_pass_kong.jpg')


        # def test_login2(self):
        #     '''用户名正确，密码为空'''
        #     self.user_login_verify(username='18565660212')
        #     po = Login(self.driver)
        #     alert = po.alert_info()
        #     username_mes = alert.text
        #     print(username_mes)
        #     self.assertEqual(username_mes, '账号或密码不能为空！')
        #     alert.accept()
        #     sleep(1)
        #     function.insert_img(self.driver, 'password_kong.jpg')


        def test_login3(self):
            #     '''用户名或者密码错误'''
            print("---------用户名密码开始验证3----------" )
            self.user_login_verify(username='305030952@qq.com',password='Change_Me123')
            print("---------用户名密码验证完成3---------" )
            po = Login(self.driver)
            # alert = po.alert_info()
            # print(alert)
            # username_mes = alert.text

            # / html / body / div / div[3] / div / div / div / div / div / div[1] / form / div[5] / ul / li

            error_message = po.find_element(By.XPATH, "/html/body/div/div[3]/div/div/div/div/div/div[1]/form/div[5]/ul/li").text
            print(error_message)
            self.assertEqual(error_message, '账号或密码错误')
            # alert.accept()
            sleep(1)
            function.insert_img(self.driver, 'username_or_password_error.jpg')

        def test_login4(self):
            #     '''用户名或者密码正确'''
            print("---------用户名密码开始验证4----------" )
            self.user_login_verify(username='305030951@qq.com',password='Change_Me123')
            print("---------用户名密码验证完成4---------" )
            po = Login(self.driver)
            success_message = po.find_element(By.XPATH, "/html/body/div/div[2]/div/div/div/div[1]/div/a[1]").text
            print(success_message)
            success_message2 = '您好，shenle！'
            self.assertEqual(success_message, success_message2)
            sleep(1)
            function.insert_img(self.driver, 'username_or_password_correct.jpg')

    if __name__ == '__main__':
        unittest.main()
    ```
    
7.  执行用例总入口run\_bbs\_test.py
    
    ```python
    # coding:utf-8
    from HTMLTestRunner import HTMLTestRunner
    from email.mime.text import MIMEText
    from email.header import Header
    import smtplib
    import unittest
    import time, sys, os

    sys.path.append('./package')
    sys.path.append('./bbs/test_case/models')
    sys.path.append('./bbs/test_case/report')


    # from package import email_send

    # ==================定义发送邮件==========================
    def send_mail(file_new):
        f = open(file_new, 'rb')
        mail_body = f.read()
        f.close()

        msg = MIMEText(mail_body, 'html', 'utf-8')
        msg['Subject'] = Header("python+selenium 自动化测试报告", 'utf-8')
        msg['from'] = 'emptymiss@126.com'
        msg['to'] = '305030951@qq.com'

        smtp = smtplib.SMTP()
        smtp.connect("smtp.126.com")
        smtp.login("emptymiss@126.com", "MDTFMYZKLYOCDGFR")
        smtp.sendmail("emptymiss@126.com", "305030951@qq.com", msg.as_string())
        smtp.quit()
        print('email has send out')


    # ==========获取最新的测试报告，用于发送测试报告邮件=========
    def new_report(testreport):
        lists = os.listdir(testreport)
        lists.sort(key=lambda fn: os.path.getmtime(testreport + "\\" + fn))
        file_new = os.path.join(testreport, lists[-1])
        print(file_new)
        return file_new


    if __name__ == "__main__":
        # 生成测试报告
        now = time.strftime("%Y-%m-%d %H_%M_%S")
        # filename = "./bbs/report/result" + str(time.time()) + ".html"
        filename = "./bbs/report/" + now + 'result.html'

        # with open(filename, "w", encoding="utf-8") as fp:
        #     runner = HTMLTestRunner.HTMLTestRunner(stream=fp,
        #                                            title="login测试报告",
        #                                            description="登录测试")

        with open(filename, 'w', encoding="utf-8") as fp:
            runner = HTMLTestRunner.HTMLTestRunner(stream=fp,
                                                   title='博文视点测试报告',
                                                   description='win10+Chrome+用例执行情况')
            test_dir = './bbs/test_case'
            discover = unittest.defaultTestLoader.discover(test_dir, pattern='login*.py')
            # runner = unittest.TextTestRunner()
            runner.run(discover)
            fp.close()  # 关闭生成的报告

        # 获取最新的测试报告

        # file_path = os.path.dirname(__file__) + '/bbs/report/'
        # new_file = new_report(file_path)
        # file_name = file_path + new_file
            file_path = new_report('./bbs/report/')

        # 发送邮件
            send_mail(file_path)
    ```
    

项目源码：[https://github.com/shenle2019/pythontest100/tree/master/mztestpro](https://github.com/shenle2019/pythontest100/tree/master/mztestpro)
