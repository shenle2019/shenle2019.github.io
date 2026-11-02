---
title: Python面试题整理-V1 day2
date: '2022-04-25T00:00:00+00:00'
permalink: 2022/04/25/Python面试题整理-V1-day2/
categories:
  - 面试
tags:
  - python
---

### Python面试题整理-V1 day2

-   Python实现列表去重
    
    ```python
    list = [1,2,4,5654,765,3453,1,2,3,4,5]
    result = set(list)
    print(list)
    print(result)
    ```
    

-   Python 函数的参数传递\*args和\*\*kwargs
    
    ```python
    ###Python 函数的参数传递*args和**kwargs

    def f(a,*args):
        print(args)

    f(1,2,3,4)
    ###输出为：(2, 3, 4)
    def f(a,b,*args):
        print(a)
        print(args)
    f(1,2,[1,2,3,4,5])
    # 1
    # ([1, 2, 3, 4, 5],)
    def f(**kargs):
        print(kargs)
    f(a=1, b=2)  # 实际传入参数是两个,但是给包裹在一起
    # {'a': 1, 'b': 2}
    def person(name,age,**kw):
        print('name:',name,'age:',age,'other:',kw)
    # 传入4个参数，自动将后两位  拼接到成字典
    person('Adam', 45, gender='M', job='Engineer')
    # name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}
    def h(a,*args,**kwargs):
        print(a,args,kwargs)
    h(1,2,3,x=4,y=5)
    # 丢进去不确定参数的包裹：1,2,3，x=4,y=5
    # 解包：1                    -a
    # 解包：（2,3）           -*args
    # 解包：{'x': 4, 'y': 5}    -**kwargs
    # 1 (2, 3) {'x': 4, 'y': 5}
    ```
    
-   一句话解释，什么样的语言能够使用装饰器
    
    函数可以作为参数传递的语言，可以使用装饰器。
    
-   Python的内建数据类型
    
    整型int 字符串str 布尔bool 列表list 元组tuple 字典dict
    
-   简述面向对象中，**new** 和\_\_init\_\_的区别
    
    -   init是初始化方法，创建后就会被默认调用，可接收参数。
        
    -   new至少有一个参数cls，代表当前类，此参数在实例化时由Python自动识别
        
    -   new必须有返回值，返回实例化出来的实例，可以return父类new出来的实例
        
    -   init有一个参数self，就是new出来的实例（即new返回值跟init的self是同一个东西），所以init可以在new的基础上完成一些其他的初始化的动作，init不需要返回值。
        
    -   如何new创建的是当前类的实例，会自动init。通过return语句中new函数第一个参数cls来保证是当前类实例。（cls创建的实例类）
        
    -   如果是其他类的类名，则实际返回其他类的实例。不会调用当前类的init，也不会调用其他类的init。
        
-   简述with方法在打开处理文件时，帮我们做了什么？
    
    ```python
    # -- with/as环境管理器:作为常见的try/finally用法模式的替代方案
    ## with expression[as variable], expression[as variable]:
    # 例子:
    with open('./test.txt') as myfile:
        for line in myfile: print(line)
    # 等同于:
    myfile = open('./test.txt')
    try:
        for line in myfile: print(line)
    finally:
        myfile.close()
    ```
    
-   \[1,2,3,4,5\] 通过map得出\[1,4,9,16,25\],再取出大于10的数字\[16,25\]
    
    ```python
    list = [1,2,3,4,5]
    def funca(i):
        return  i**2
    res = map(funca,list)
    result = [i for i in res if i >10]
    print(result)
    ```
    

-   Python中生成随机整数，随机小数和0-1之间数字的方法。
    
    ```python
    #### Python中生成随机整数，随机小数和0-1之间数字的方法。

    import random
    ###随机整数,1-100之间。
    print(random.randint(1,100))

    #随机大于0 且小于1 之间的小数
    print(random.random())

    #随机大于0 且小于9 之间的小数
    print(random.uniform(0,9))

    ###随机返回选择值。
    print(random.choice([1,2,3,5]))
    ```
    
-   避免转义字符串，加哪个字母表示原始字符串。
    
    r，表示需要原始字符串，不转义特殊字符。
    
-   正则匹配
    
    中国
    
    中的中国，class name不固定。
    
    ```python
    import re
    string111 = r'<div class = "name"> 中国<div>'
    res = re.findall(r'<div class = ".*"> (.*?)<div>',string111)
    print(res)
    ```
    
-   Python中断言方法举例
    
    ```python
    a = 3
    assert(a > 1)
    print("success，continue")

    b = 3
    assert(b < 1)
    print("fail，not continue")
    ```
    
    输出：
    
    success，continue  
    Traceback (most recent call last):  
    File “C:\\Users\\Administrator\\PycharmProjects\\testpython100\\pythontest001.py”, line 154, in
    
    ```
    assert(b < 1)
    ```
    
    AssertionError
    
-   任意给一个字符串”asfhfgosdjhfgodnklrtjhwejhsdklaskljdhfqwkhrjklwqehfsdjklfgjcoivuo”,先去重，再由a-z排序
    
    ```python

    stringtest = "asfhfgosdjhfgodnklrtjhwejhsdklaskljdhfqwkhrjklwqehfsdjklfgjcoivuo"
    s = set(stringtest)
    ###set转换为集合了。
    print(s)

    s = list(s)
    print(s)

    s.sort(reverse=False)
    print(s)

    ###列表转换为字符串
    result = "".join(s)
    print(result)
    ```
    
-   用lamda函数实现两个数字相乘
    
    ```python
    funmuti = lambda a,b:a*b
    result = funmuti(5,6)
    print(result)
    ```
    
-   字典根据键从小到大排序
    
    ```python
    dict = {"name":"zs","age":18,"city":"深圳","tel":18665975236}

    print(dict.items())
    ###用法。dict.items()返回的是list，list中的元素是元组，元组中的元素分别为键和值
    ###list = sorted(__iterable=,key,reverse=)
    list = sorted(dict.items(),key = lambda i:i[0],reverse=False)
    print(list)

    print(list[0][0])
    newdict = {}
    # for i in range(len(list)):
    #     keys = list[i][0]
    #     newdict[keys] = dict[keys]
    #
    # print(newdict)

    ###更好的写法：
    for i in list:
        newdict[i[0]] = dict[i[0]]

    print(newdict)
    ```
    
-   统计字符串每个单词出现的次数
    
    ```python
    from collections import Counter
    string222 = "adfasdb;fsdfsdafsadfsjl;yhrtyh;dfgds;dfgwege;ffsddsfsd;rtyrt;po;nm;bn;f;"
    res = Counter(string222)
    print(res)
    ```
    
-   字符串为 a = “not 404 found 张三 99 深圳”，字符串中单词之间有空格，用正则去掉带英文或数字的，最后输出 张三、深圳。
    
    ```python
    import re

    a = "not 404 found 张三 99 深圳"
    list = a.split(" ")

    print(list)
    listmatch = re.findall('\d+|[a-zA-Z]+',a)

    for i in listmatch:
        if i in list:
            list.remove(i)

    newstring = "".join(list)
    print(newstring)
    ```
