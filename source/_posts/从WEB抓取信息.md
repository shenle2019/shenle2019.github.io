---
title: 从WEB抓取信息
date: '2022-01-03T00:00:00+00:00'
permalink: 2022/01/03/从WEB抓取信息/
categories:
  - 测试
tags:
  - python
---

#### 利用webbrowser模块的mapIt.py

-   交互环境输入

import webbrowser

webbrowser.open(‘[http://inventwithpython.com'](http://inventwithpython.com&/#39;))

-   写一个脚本，利用剪贴板的内容或者输入参数，在浏览器打开对应的地图

```python
#！python 3
#！mapIt.py - Launches a map in the browser using an address  from the command line or clipboard.

import webbrowser, sys, pyperclip
if len(sys.argv) > 1:
    address = ' '.join(sys.argv[1:])  # Get address from command line.
else:
    address = pyperclip.paste()       # Get address from clipboard.

webbrowser.open('https://www.google.com/map/place/'+ address)
```

#### 用requests模块，从web下载文件

下载并保存到文件的步骤：

①调用requests.get()下载该文件

②用’wb’调用open()，以写二进制的方式打开一个新文件

③利用Respose对象的iter\_content()方法循环

④在每次迭代中调用write()，将内容写入该文件

⑤调用close()关闭该文件

```python
import requests
res = requests.get('http://www.gutenberg.org/cache/epub/1112/pg1112.txt')
res.raise_for_status()     # 确保程序在下载失败时停止
playFile = open('RomeoAndJuliet.txt', 'wb')
for chunk in res.iter_content(100000):
    playFile.write(chunk)

100000
78981

playFile.close()
```

#### Beautiful Soup——解析HTML

1.  bs4.BeautufulSoup() 返回一个BeautifulSoup对象
    
2.  soup.select() 方法返回一个Tag对象的列表，是BeautifulSoup表示一个HTML元素的方式
    

​ CSS选择器（网络上有各个示例）

3.  getText() 方法返回该元素文本，或内部HTML
    
4.  get() 方法返回属性值
    

-   从sys.argv中读取命令行参数
    
-   用requests模块取得查询结果页面
    
-   找到每个查询结果的链接
    
-   调用 webbrowser.open()函数打开web浏览器
    

```python
#! python3
# lucky.py - Open several Google search results.

import requests, sys, webbrowser, bs4

print('Googling... ')   # display text while downloading the Google page
res = requests.get('http://google.com/search?q=' + ' '.join(sys.argv[1: ]))
res.raise_for_status()

soup = bs4.BeautifulSoup(res.text)  # Retrieve top search result links.
linkElems = soup.select('.r a')     # Open a browser tab for each result.
numOpen = min(5, len(linkElems))
for i in range(numOpen):
    webbrowser.open('http://google.com' + linkElems[i].get('href'))
```

#### 用selenium模块控制浏览器

-   操作浏览器

打开浏览器并加载网页

```python
import webbrowser
webbrowser.open('https://github.com/ChelseaMah')
```

-   用selenium模块控制浏览器

导入有点特殊，需要用  
from selenium import webdriver  
来使用selenium的webdriver，而不是Python自带的。

-   启动浏览器

```python
from selenium import webdriver
browser = webdriver.Safari()
browser.get('https://github.com/ChelseaMah')
```

-   在页面中寻找元素

WebDriver对象有很多方法在页面中寻找元素，分为findelement和findelements方法。  
findelemen 返回一个WebElement对象，是匹配查询的第一个元素。  
findelements 返回一个列表，包含所有匹配元素。

方法

return

browser.find\_element\_by\_class\_name(name) browser.find\_elements\_by\_class\_name(name)

使用CSS类name的元素

browser.find\_element\_by\_css\_selector(selector) browser.find\_elements\_by\_css\_selector(selector)

匹配CSSselector的元素

browser.find\_element\_by\_id(id) browser.find\_elements\_by\_id(id)

匹配id属性值的元素

browser.find\_element\_by\_link\_text(text) browser.find\_elements\_by\_link\_text(text)

完全匹配提供的text的元素

browser.find\_element\_by\_partial\_link\_text(text) browser.find\_elements\_by\_partial\_link\_text(text)

包含提供的text的元素

browser.find\_element\_by\_name(name) browser.find\_elements\_by\_name(name)

匹配name属性值的元素

browser.find\_element\_by\_tag\_name(name) browser.find\_elements\_by\_tag\_name(name)

匹配标签name的元素(大小写无关，元素匹配’a’和’A’)

-   WebElement的属性和方法：

属性或方法

描述

tag\_name

标签名，例如’a’表示元素

get\_attribute(name)

该元素name属性的值

text

该元素内的文本，例如hello中的’hello’

clear()

对于文本字段或文本区域元素，清除其中输入的文本

is\_displayed()

如果该元素可见，返回True，否则返回False

is\_enabled()

对于输入元素，如果该元素启用，返回True，否则返回False

is\_selected()

对于复选框或单选框元素，如果该元素被选中，选择True，否则返回False

location

一个字典，包含键’x’和’y’，表示该元素在页面上的位置

-   页面点击

findelement或findelements方法找到该WebElement对象

调用该元素的click()方法。

```python
from selenium import webdriver
browser = webdriver.Safari()
browser.get('https://github.com/ChelseaMah')
publicElement = browser.find_element_by_link_text('Public')
publicElement.click()
```

-   填写并提交表单

```python
from selenium import webdriver
browser = webdriver.Safari()
browser.get('http://gmail.com') 
emailElem = browser.find_element_by_id('Email')
emailElem.send_keys('not_my_real_email@gmail.com')
passwordElem = browser.find_element_by_id('Passwd')
passwordElem.send_keys('12345')
passwordElem.submit()
```

在任何元素上调用submit()，都等同于该元素所在表单的submit。

发送特殊键

针对不能用字符串值输入的键盘击键，如Shift、F1、Home等，使用send\_keys()方法时，传入selenium.webdriver.common.keys模块的常量：

属性

含义

Keys.DOWN,Keys.UP,Keys.LEFT,Keys.RIGHT

键盘箭头键

Keys.ENTER,Keys.RETURN

回车和换行键

Keys.HOME,Keys.END,Keys.PAGE\_DOWN,Keys.PAGE\_UP

Home键、End键、PageUp键和PageDown键

Keys.ESCAPE,Keys.BACK\_SPACE,Keys.DELETE

Esc、Backspace和字母键

Keys.F1,Keys.F2,…,Keys.F12

键盘顶部的F1到F12键Keys.TABTab键

点击浏览器按钮

-   browe.back() 点击”返回”
-   browe.forword() 点击”前进”
-   browe.refresh() 点击”刷新”
