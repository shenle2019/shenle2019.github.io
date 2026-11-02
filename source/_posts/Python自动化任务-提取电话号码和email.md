---
title: Python自动化任务-提取电话号码和email
date: '2021-12-13T00:00:00+00:00'
permalink: 2021/12/13/Python自动化任务-提取电话号码和email/
categories:
  - 测试
tags:
  - python
---

### 说明

本文为《Python编程快速上手-让繁琐工作自动化》的学习笔记。

主要熟悉一下python基础和正则表达式，使用正则表达式从剪贴板来提取电话号码和email。

### Python编程基础

记几个经常要用到的内容：

-   hello world
    
    ```python
    # this program says hello and asks for your name

    print('Hello World!')
    print('What is your name?') #ask for your name
    myName = input()
    print('it is goood to meet you' + myName)
    print('the length of your name is:')
    print(len(myName))
    print('What is your age?') #ask for your age
    myAge = input()
    print('you will be ' + str(int(myAge) + 1) + ' in a year.')
    ```
    
    input()函数在等待用户在键盘上输入一些文本，并按下回车键。
    
-   range()
    
    range(101)是从0到100；
    
    range(12,16)是从12到15；
    
    range(0,10,2)是0,2,4,6,8；
    
-   常用导入模块
    
    import random, sys, os, math;
    
    也可以用from random import \*;
    
-   可使用sys.exit()提前结束程序
    
-   global语句
    
    如果需要在一个函数内修改全局变量，则使用global语句；
    
    ```python
    def spam():
        global eggs
        eggs = 'spam'

    eggs = 'global'
    print(eggs)
    spam()
    print(eggs)
    ```
    
-   异常处理
    
    ```python
    def spam(divideBy):
        try:
            return 42 / divideBy
        except ZeroDivisionError:
            print('Error:Invalid argument.')

    print(spam(2))
    print(spam(12))
    print(spam(0))
    print(spam(1))
    ```
    
-   写一个猜数字的小游戏
    
    ```python
    import random
    actrual_num = random.randint(1, 20)
    print('the number is between 1 and 20')

    # guess 6 times
    for i in range(1, 7):
        print('now you can guess the number from 1 - 20:')
        guess_num = int(input())
        if guess_num > actrual_num:
            print('your guess num is greater than actural num')
        elif guess_num < actrual_num:
            print('your guess num is lesser than actural num')
        else:
            break
    if guess_num == actrual_num:
        print('congratulations!you are right,you guessed in ' + str(i) + ' times!')
    else:
        print('you are wrong,actural num is %',actrual_num)
    ```
    
-   列表使用小技巧
    
    循环列表：for i in range(len(列表名))：
    
    列表赋值：变量1，变量2，变量3 = 列表名。这里注意列表的长度与变量个数一致。
    
    index()方法返回下标。append、insert方法增加值，remove方法删除值。sort方法排序。
    
    字符串和元组同列表类似，区别在于前两者不可变。
    
    list和tuple方法可以让元组和列表互相转换。
    
-   python赋值、浅拷贝、深拷贝
    
    -   **直接赋值：**其实就是对象的引用（别名）。
        
    -   **浅拷贝(copy)：**拷贝父对象，不会拷贝对象的内部的子对象。
        
    -   **深拷贝(deepcopy)：** copy 模块的 deepcopy 方法，完全拷贝了父对象及其子对象。
        
        ```python
        import copy

        a = [1, 2, 3, 4, ['a', 'b']]  # 原始对象

        b = a  # 赋值，传对象的引用
        c = copy.copy(a)  # 对象拷贝，浅拷贝
        d = copy.deepcopy(a)  # 对象拷贝，深拷贝

        a.append(5)  # 修改对象a
        a[4].append('c')  # 修改对象a中的['a', 'b']数组对象

        print('a = ', a)
        print('b = ', b)
        print('c = ', c)
        print('d = ', d)

        # 输出结果为：
        # ('a = ', [1, 2, 3, 4, ['a', 'b', 'c'], 5])
        # ('b = ', [1, 2, 3, 4, ['a', 'b', 'c'], 5])
        # ('c = ', [1, 2, 3, 4, ['a', 'b', 'c']])
        # ('d = ', [1, 2, 3, 4, ['a', 'b']])
        ```
        
-   字典的方法
    
    keys(),values(),items();
    
    get(字典键值，默认值)；获取到则成功，获取失败给默认值，不会报错。
    
    setdefault();如果没有默认值，则设置默认值；如果已经有值，则不会赋默认值。
    
    字典中值也可以是字典。
    
-   字符串
    
    一般字符串前加r来保证其成为原始字符串。
    
    ‘’’ ‘’’多行字符串
    
    “”‘’
    
    中间是多行注释
    
    “””
    
    常用方法：
    
    isX：比如islower(),isupper(),isalpha(),isalnum(),isdecimal(),isspace(),istitle()等返回布尔值。
    
    startswith、endswith也都是返回布尔值。
    
    ‘,’.join(要处理的内容),如连接列表中的内容为字符串，
    
    要处理的内容.split(‘\\n’)，与上面相反，分割字符串为列表；
    
    用rjust，ljust，center等方法来对齐文本；
    
    用strip，rstrip，lstrip等方法来删除空白字符；
    
    用pyperclip模块拷贝粘贴字符串：
    
    ```python
    import pyperclip
    pyperclip.copy('hello world')
    pyperclip.paste()
    ```
    

### 模式匹配与正则表达式

-   用正则表达式匹配的一般步骤
    
    -   用import re导入正则表达式模块
        
    -   用re.compile()函数创建一个Regex对象（记得使用原始字符串）
        
    -   向Regex对象的search()方法传入想查找的字符串。它返回一个Match对象。
        
    -   调用Match对象的group方法，返回实际匹配文本的字符串。
        
        ```python
        import re
        phoneNumRegex = re.compile(r'\d\d\d-\d\d\d-\d\d\d\d')
        mo = phoneNumRegex.search('My number is 415-555-4242.')
        print('Phone number found: ' + mo.group())
        ```
        
-   用正则表达式匹配更多模式
    
    -   利用括号分组
    
    ```python
    import re
    phoneNumRegex = re.compile(r'(\d\d\d)-(\d\d\d-\d\d\d\d)')
    mo = phoneNumRegex.search('My number is 415-555-4242.')
    print('Phone number found: ' + mo.group())
    print('mo.group(1): ' + mo.group(1))
    print('mo.group(2): ' + mo.group(2))
    print('mo.group(0): ' + mo.group(0))
    print('mo.group(): ' + mo.group())
    ```
    
    -   用管道符|匹配多个分组
    -   用问号？实现可选匹配
    -   用星号\*匹配零次或多次
    -   用加号匹配一次或多次
    -   用花括号匹配特定次数
    -   re.compile(r’(ha){3,5}’)贪心算法，匹配5次;re.compile(r’(ha){3,5}?’)非贪心匹配，匹配3次。
    -   findall()方法，返回全部匹配对象。因为search只返回一次。
    -   字符分类，常用\\d数字\\D非数字\\w单词\\W非单词\\s空白\\S非空白；
    -   可自定义字符分类\[aeiouAEIOU\]等，取非则前面加上\[尖括号aeiouAEIOU\]，这里markdown语法有其他含义，就不写出来了^.；
    -   ^匹配开始，$匹配结尾。
    -   通配字符.
    -   .\*匹配所有字符
    -   newlineRegex = re.compile(‘.\*’, re.DOTALL)使用 re.DOTALL作为第二个参数，让点匹配所有字符，包括换行符。
    -   re.compile传入第二个参数re.IGNORECASE或者re.I来忽略大小写；
    -   sub方法替换字符串；
    -   管理复杂的正则表达式： re.compile传入第二个参数re.VERBOSE();
    -   组合使用可以用|串联起来，re.IGNORECASE()|re.DOTALL()|re.VERBOSE()；

### 项目实战：电话号码和email提取程序

-   需要完成的任务：
    
    -   从剪贴板获取文本
        
    -   找到文本中的所有电话和email
        
    -   将他们粘贴到剪贴板
        
-   代码需要做的事情：
    
    -   使用pyperclip模块复制和粘贴字符串
    -   使用两个正则表达式，一个匹配电话号码，一个匹配email
    -   将两个正则表达式找到所有匹配，而不是第一次匹配
    -   将匹配的字符串整理好格式，放在一个字符串中，用于粘贴
    -   如果没有找到匹配项，给出错误提示。
-   分步步骤：
    
    1.  为电话号码创建一个正则表达式
    
    ```python
    #!python3
    #phoneAndEmail.py - Finds phone numbers and email addresses on the clipboard

    import pyperclip, re

    phoneRegex = re.compile(r'''(
        (\d{3}|\(\d{3}\))?  # area code
        (\s|-|\.)?           # separator
        (\d{3})             # first 3 digits
        (\s|-|\.)            # separator
        (\d{4})             # last 4 digits
        (\s*(ext|x|ext.)\s*(\d{2,5}))? # extension
        )''', re.VERBOSE)

    ### TODO: Create email regex

    ### TODO：Find matches in cliboard text

    ### TODO: Copy results to the clipboard
    ```
    
    2.  为email地址创建一个正则表达式
    
    ```python
    ### Create email regex
    emailRegex = re.compile(r'''(
        [a-zA-Z0-9._%+-]+       #username
        @                       #@ symbol
        [a-zA-Z0-9.-]+          #domain name    
        (\.[a-zA-Z]{2,4})                      #dot-something
        )''', re.VERBOSE)
    ```
    
    3.  在剪贴板文本中找到所有匹配
    
    ```python
    ### Find matches in cliboard text
    text = str(pyperclip.paste())
    matches = []
    for groups in phoneRegex.findall(text):
        pythonNum = '-'.join([groups[1],groups[3],groups[5]])
        if groups[8] != '':
            pythonNum += ' x' + groups[8]
        matches.append(pythonNum)
    for groups in emailRegex.findall(text):
        matches.append(groups[0])
    ```
    
    4.  所有匹配连成一个字符串，复制到粘贴板上。
        
        ```python
        ### Copy results to the clipboard
        if len(matches) > 0:
            pyperclip.copy('\n'.join(matches))
            print('copied to the clipboard: ')
            print('\n'.join(matches))
        else:
            print('No phone numbers or email found.')
        ```
        
    5.  完整程序及运行结果
        
        ```plaintext
        #!python3
        #phoneAndEmail.py - Finds phone numbers and email addresses on the clipboard

        import pyperclip, re

        phoneRegex = re.compile(r'''(
            (\d{3}|\(\d{3}\))?  # area code
            (\s|-\.)?           # separator
            (\d{3})             # first 3 digits
            (\s|-\.)            # separator
            (\d{4})             # last 4 digits
            (\s*(ext|x|ext.)\s*(\d{2,5}))? # extension
            )''', re.VERBOSE)

        ### Create email regex
        emailRegex = re.compile(r'''(
            [a-zA-Z0-9._%+-]+       #username
            @                       #@ symbol
            [a-zA-Z0-9.-]+          #domain name    
            (\.[a-zA-Z]{2,4})                      #dot-something
            )''', re.VERBOSE)

        ### Find matches in cliboard text
        text = str(pyperclip.paste())
        matches = []
        for groups in phoneRegex.findall(text):
            pythonNum = '-'.join([groups[1],groups[3],groups[5]])
            if groups[8] != '':
                pythonNum += ' x' + groups[8]
            matches.append(pythonNum)
        for groups in emailRegex.findall(text):
            matches.append(groups[0])

        ### Copy results to the clipboard
        if len(matches) > 0:
            pyperclip.copy('\n'.join(matches))
            print('copied to the clipboard: ')
            print('\n'.join(matches))
        else:
            print('No phone numbers or email found.')
        ```
        
        复制内容：
        
        > Contact Us
        > 
        > No Starch Press, Inc.  
        > 245 8th Street  
        > San Francisco, CA 94103 USA  
        > Phone: 800.420.7240 or +1 415.863.9900 (9 a.m. to 5 p.m., M-F, PST)  
        > Fax: +1 415.863.9950
        > 
        > Reach Us by Email
        > 
        > -   General inquiries: [info@nostarch.com](mailto:info@nostarch.com)
        > -   Media requests: [media@nostarch.com](mailto:media@nostarch.com)
        > -   Academic requests: [academic@nostarch.com](mailto:academic@nostarch.com) ([Further information](https://nostarch.com/academic.htm))
        > -   Conference and Events: [conferences@nostarch.com](mailto:conferences@nostarch.com)
        > -   Help with your order: [info@nostarch.com](mailto:info@nostarch.com)
        > 
        > Reach Us on Social Media  
        > [Twitter](https://twitter.com/nostarch/)  
        > [Facebook](https://www.facebook.com/NoStarchPress)  
        > [Instagram](https://www.instagram.com/nostarchpress/)  
        > [Linkedin](https://www.linkedin.com/company/no-starch-press/)  
        > [Pinterest](https://in.pinterest.com/nostarchpress)
        
        CTRL+ A 全选上面内容，然后CTRL+C放到剪贴板，运行程序，结果如下：
        
        ```python
        D:\pythontest\autowork\venv\Scripts\python.exe D:/pythontest/autowork/venv/phoneAndEmail.py
        copied to the clipboard: 
        800-420-7240
        415-863-9900
        415-863-9950
        info@nostarch.com
        media@nostarch.com
        academic@nostarch.com
        conferences@nostarch.com
        info@nostarch.com

        Process finished with exit code 0
        ```
        

​
