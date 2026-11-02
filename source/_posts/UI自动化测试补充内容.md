---
title: UI自动化测试补充内容
date: '2023-06-20T00:00:00+00:00'
permalink: 2023/06/20/UI自动化测试补充内容/
categories:
  - 测试
tags:
  - 测试开发
---

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
