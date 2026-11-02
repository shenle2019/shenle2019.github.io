---
title: Python面试题整理-V1 day1
date: 2022-04-19T21:57:15.000Z
permalink: 2022/04/20/Python面试题整理-V1-day1/
categories:
  - 面试
tags:
  - python
---

### Python面试题整理-V1 day1

-   Python 的特点和优点是什么?

面向对象  
简洁  
入门门槛低

参考答案：

1.  解释性
    
2.  动态 特性
    
3.  面向对象
    
4.  语法简洁
    
5.  开源
    
6.  丰富的社区资源
    

-   列出5个python标准库

os 操作系统相关联的函数  
sys 命令行参数  
re 正则匹配  
math 数学运算  
datetime 处理日期时间  
random 随机数生成模块  
pymysql 连接mysql数据库，类似jdbc

-   列表和元组有什么不同？

列表\[\]可变，元组()不可变。  
应用场景，确定的不会变化的，用元组，一般来说，性能较列表更好。

参考答案：  
1\.  
相同点：  
列表和元组是Python中最常用的两种数据结构，字典是第三种。

都是序列  
都可以存储任何数据类型  
可以通过索引访问  
list和tuple都支持负索引  
list和tuple都支持切片操作  
list和tuple都可以随意嵌套

2\.  
写法上不同  
列表使用list1 = \[“1”, “2”\], 元组使用()  
t = (“[https://china-testing.github.io/"](https://china-testing.github.io/"), “[https://www.oscobo.com/"](https://www.oscobo.com/"))

3\.  
是否可变  
列表是可变的，而元组是不可变的，这标志着两者之间的关键差异。  
我们可以修改列表的值，但是不修改元组的值。  
列表是动态的，长度大小不固定，可以随意的增加、删除、修改元素  
元组是静态的，长度在初始化的时候就已经确定不能更改，更无法增加、删除、修改元素  
由于列表是可变的，我们不能将列表用作字典中的key。 但可以使用元组作为字典key  
list1 = \[1, 2, “ceshi”\]  
list1\[0\] = “change list value1”  
print(list1)

t1 = (“1”, “ceshi”)  
t1\[0\] = “change tuple value”  
‘’’  
TypeError: ‘tuple’ object does not support item assignment’’’

4.大小差异  
Python将低开销的较大的块分配给元组，因为它们是不可变的。 对于列表则分配小内存块。 与列表相比，元组的内存更小。 当你拥有大量元素时，元组比列表快。列表的长度是可变的。

> > > l = \[“[https://china-testing.github.io/"](https://china-testing.github.io/"), “[https://www.oscobo.com/"\]](https://www.oscobo.com/"])  
> > > t = (“[https://china-testing.github.io/"](https://china-testing.github.io/"), “[https://www.oscobo.com/"](https://www.oscobo.com/"))  
> > > print(l.<strong>sizeof</strong>())  
> > > 56  
> > > print(t.<strong>sizeof</strong>())  
> > > 40

-   深拷贝和浅拷贝的区别是什么？

浅拷贝：拷贝值的引用，源数据更改，目标数据也会更改。  
深拷贝：内存新开辟一个空间，拷贝的是对象的结构。但源数据更改，目标数据不会更改。

参考答案：  
深拷贝是将对象本身复制给另一个对象。这意味着如果对对象的副本进行更改时不会影响原对象。在 Python 中，我们使用 deepcopy（）函数进行深拷贝；  
浅拷贝是将对象的引用复制给另一个对象。因此，如果我们在副本中进行更改，则会影响原对象。使用 copy（）函数进行浅拷贝。

-   解释 Python 中的三元表达式

if xxx？ A: B  
如果条件成立，则执行A，否则不成立，执行B。

参考答案：

> > > x = 4  
> > > y = 99 if x > 3 else 999  
> > > y  
> > > 三种写法：  
> > > erroStr = “More” if a > b else “Less”  
> > > print(erroStr) # 运行结果为：Less

print({True: “More”, False: “Less”}\[a > b\]) # 运行结果为：Less

print((“FalseValue”, “TrueValue”)\[a > b\]) # 运行结果为：FalseValue

-   解释继承

一个类继承自另一个类，也可以说是一个孩子类/派生类/子类，继承自父类/基类/超类，同时获取所有的类成员（属性和方法）。

继承使我们可以重用代码，并且还可以更方便地创建和维护代码。Python 支持以下类型的继承：

1.  单继承- 一个子类类继承自单个基类
    
2.  多重继承- 一个子类继承自多个基类
    
3.  多级继承- 一个子类继承自一个基类，而基类继承自另一个基类
    
4.  分层继承- 多个子类继承自同一个基类
    
5.  混合继承- 两种或两种以上继承类型的组合
    

-   解释 Python 中的 help() 函数和 dir() 函数。

help() 函数返回帮助文档和参数说明：

help(dir)的结果如下

```python
dir(...)
    dir([object]) -> list of strings

    If called without an argument, return the names in the current scope.
    Else, return an alphabetized list of names comprising (some of) the attributes
    of the given object, and of attributes reachable from it.
    If the object supplies a method named __dir__, it will be used; otherwise
    the default dir() logic is used and returns:
      for a module object: the module's attributes.
      for a class object:  its attributes, and recursively the attributes
        of its bases.
      for any other object: its attributes, its class's attributes, and
        recursively the attributes of its class's base classes.
```

dir() 函数返回对象中的所有成员 (任何类型)

```python
>>> dir(help)
['__call__', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__']
```

-   编程实现计算字符串中的大写字母数

```python
#### 编程实现计算字符串中的大写字母数

teststring = 'sdfjsaoujweonkfdngdafjhfalDSHJFAJHFOSADJFOASJjlsdfjsdsfjsadlfjELJFOSDJjldsjfs1324654awsdrfw' \
             '  sdfjowdjfasljfwasf AAAwerfwefhajfj245r7792347 !@#$#@%$@#$#@  sdfsdfgo0ugosdugfaSDUFOIEWRUG  SDFJSD';
countn = 0
for i in teststring:
    if i.isupper():
        countn+=1
print(countn)
```

-   求1-100的和
    
    ```python
    result = 0
    for i in range(1,101):
        result = result + i
    print('问题1:{}'.format(result))
    ```
    
    使用一行代码实现：
    
    ```python
    print('问题2:{}'.format(sum(range(0,101))))
    ```
    
-   如何在一个函数内部修改全局变量
    
    ```python
    a = 100

    def func1():
        global a
        a = 50
        print(a)

    func1()
    print(a)
    ```
    
-   字典如何删除键和合并两个字典
    
    ```python
    #### 字典如何删除键和合并两个字典

    dict1 = {"name":"zs","age":18}
    dict2 = {"name":"ls","age":20}

    del dict1["name"]
    print(dict1)

    #### update主要用于keys值不同时的合并，如果有相同，则为更新
    dict1.update(dict2)
    print(dict1)
    dict2 = {"name":"ww","age":22}
    dict1.update(dict2)
    print(dict1)

    #### 使用字典生成表达式
    dict3 = {"name":"ww","age":22}
    print({key: [dict1[key] ,dict3[key]] for key in dict1})
    ###如果本身对应的值为列表则可以直接相加。###
    ###print({key: dict1[key] + dict3[key] for key in dict1})
    ```
    
-   谈一下Python的GIL
    

GIL详解  
GIL全称global interpreter lock，全局解释器锁，是 Python 解释器中的一个布尔值，受到互斥保护。这个锁被 CPython中的核心字节码用来评估循环，并调节用来执行语句的当前线程。  
每个线程在执行的时候都需要先获取GIL，保证同一时刻只有一个线程可以执行代码，即同一时刻只有一个线程使用CPU。  
执行单线程程序的开发人员看不到GIL的影响，但它可能是CPU绑定多线程代码中的性能瓶颈。  
由于即使在具有多个CPU核心的多线程体系结构中，GIL一次只允许一个线程执行，因此GIL已经称为Python的“臭名昭著”的特性。

GIL为Python解决了什么问题？  
Python使用引用计数来进行内存管理。这意味着在Python中创建的对象具有引用计数变量，该变量用于跟踪指向  
该对象的引用数。当此技术达到0的时候，释放对象占用的内存

```python
import  sys
a = []
b = a
sys.getrefcount(a) # 查看空列表的引用次数。
```

在上面的示例中，空列表对象的引用计数为3，a和b参数引用各一次，在调用sys.getrefcount()的时候也引用一次。

回到GIL：  
问题是这个引用计数变量需要防止竞争条件，如果其中两个线程同时增加或减少其值。发生这种情况，它可能导致  
从未释放的内存泄漏，或者更糟糕的是，在对该对象的引用仍然存在时错误地释放内存。这可能会导致Python程  
序中出现崩溃或其他“怪异”错误。  
通过向跨线程共享的所有数据结构添加锁，可以保持此引用计数变量的安全性，从而保证不会对它们进行不一致的修改。  
但是为每个对象或对象组添加一个锁意味着将存在多个锁，这可能导致另一个问题 - 死锁（死锁只有在有多个锁时  
才会发生）。另一个问题是由于重复获取和释放锁而导致的性能下降。

GIL是解释器本身的一个锁，它增加了一条规则，即执行任何Python字节码都需要获取解释器锁。这可以防止死锁  
（因为只有一个锁）并且不会引入太多的性能开销。但它也让任何受CPU限制的Python程序都是单线程的。  
GIL虽然被解释器用于其他语言（如Ruby），但并不是解决此问题的唯一方法。有些语言通过使用除引用计数之外  
的方法（例如垃圾收集）来避免需要GIL对线程安全内存管理。  
另一方面，这意味着这些语言通常需要通过添加其他性能提升特性（如 JIT编译器 ）来弥补GIL单线程性能优势的损失。

为什么选择GIL作为解决方案?  
那么为什么要在Python中使用GIL呢？  
自从操作系统没有线程概念以来，Python就已存在。Python的设计易于使用，以便更快地开发，越来越多的开发人员开始使用它。  
有许多扩展正在为那些Python中需要其特性的C语言库而编写、服务。为了防止不一致的更改，这些C扩展需要  
GIL提供的线程安全内存管理。  
GIL易于实现，很容易添加到Python中。它为单线程程序提供了性能提升，因为只需要管理一个锁。  
非线程安全的C库变得更容易集成。这些C扩展成为不同社区容易采用Python的原因之一。  
正如您所看到的，GIL是一个实用的解决方案，可以解决CPython开发人员在Python生命中早期面临的一个难题。

对多线程的Python程序影响  
当你在查看一个典型的Python程序——或任何计算机程序时，它们在性能上受CPU限制与受I / O限制是存在区别  
的。(这里的意思是说，不同的程序，限制它们的性能的原因是不一定相同的，有可能受到CPU限制，有可能受到  
I/O限制)  
CPU绑定程序是那些将CPU推向极限的程序。这包括进行数学计算的程序，如矩阵乘法，搜索，图像处理等。  
I / O绑定程序是花费时间等待输入/输出的程序，它可以来自用户，文件，数据库，网络等.I / O绑定程序有时需要  
等待很长时间才能从源头获取他们需要的东西，因为源可能需要在输入/输出准备好之前进行自己的处理，例如，  
用户考虑输入什么，或者在运行的数据库查询的过程。  
让我们来看一个执行倒计时的简单CPU绑定程序：

```python
import time
from threading import Thread

COUNT = 50000000
def countdown(n):
    while n>0:
        n -= 1
        
start = time.time()
countdown(COUNT)
end = time.time()
print('Time taken in seconds -',end-start)
```

运行这段代码输出Time taken in seconds - 3.368496894836426  
现在使用两个并行线程将代码修改为相同的倒计时：

```python
import time
from threading import Thread

COUNT = 50000000

def countdown(n):
    while n>0:
        n -= 1

t1 = Thread(target=countdown, args=(COUNT//2,))
t2 = Thread(target=countdown, args=(COUNT//2,))
start = time.time()
t1.start()
t2.start()
t1.join()
t2.join()
end = time.time()
print('Time taken in seconds -', end - start)
```

再次运行：Time taken in seconds - 3.0929627418518066  
可以看出，两个版本的完成时间几乎相同。在多线程版本中，GIL防止了CPU所绑定的线程并行执行  
GIL对I / O绑定的多线程程序的性能影响不大，因为线程在等待I / O时是共享锁的。  
但是线程完全受CPU约束的程序，例如，使用线程处理部分图像的程序，不仅会因锁而成为单线程，而且与编写为  
完全单线程的场景相比，还会导致执行时间的增加，如上例所示。  
这种增加是锁的获取和释放开销的结果。

为什么还没有删除GIL？  
Python有许多的由C语言编写的扩展库，这些扩展库在很大程度上依赖于由GIL提供的解决方案，如果删除GIL，会导致现有的C扩展被破坏，许多地方需要重写甚至完全重写。  
当然，还有其他解决方案可以解决GIL解决的问题，但有些解决方案是会降低单线程和多线程或者I/O绑定的程序的性能的。

Python3中对GIL的改进  
Python 3为现有的GIL带来了重大改进 -  
GIL会对 “仅CPU限制” 和 “仅I / O绑定” 的多线程程序造成影响，但是如果一个多线程程序，其中有些线程受I / O约束和有些线程受CPU约束会怎么样呢？  
在这样的程序中，已知Python的GIL会使I / O绑定的线程匮乏，因为它们没有机会从CPU绑定的线程中获取GIL。  
这是因为Python内置了一种机制，强制线程在连续使用固定间隔后释放GIL <strong>，</strong>如果没有其他人获得GIL，则相同的线程可以继续使用它。

```python
>>>import sys
>>>sys.getchectinterval() # 返回检查间隔值
100
```

这种机制的问题在于，大多数情况下，CPU绑定的线程会在其他线程获取GIL之前重新获取GIL。  
在Python3.2中修复了这个问题，并且添加了一种机制，可以查看被删除的其他线程的GIL获取请求数，并且在其他线程有机会运行之前不允许当前线程重新获取GIL。

如何处理Python的GIL  
<strong>多进程与多线程：</strong>最流行的方法是使用多进程方法，使用多个进程而不是线程。每个Python进程都有自己的Python解释器和内存空间，因此GIL不会成为问题。Python有一个multiprocessing模块，可以轻松地创建进程：

```python
from multiprocessing import Pool
import time
COUNT = 50000000
def countdown(n):
    while n>0:
        n -= 1
if __name__ == '__main__':
    pool = Pool(processes=2)
    start = time.time()
    r1 = pool.apply_async(countdown, [COUNT//2])
    r2 = pool.apply_async(countdown, [COUNT//2])
    pool.close()
    pool.join()
    end = time.time()
    print('Time taken in seconds -', end - start)
```

运行结果:Time taken in seconds - 2.558570623397827  
与多线程版本相比，性能有了不错的提升。

耗费时间没有下降到上面看到的一半，是因为流程管理有自己的开销。多进程要比多线程的开销更多，这也可能会成为一个扩展瓶颈。  
替代Python解释器： Python有多个解释器实现。分别用C，Java，C＃和Python编写的CPython，Jython，IronPython和PyPy是最受欢迎的。GIL仅存在于CPython的原始Python实现中。如果程序及其库可用于其他实现之一，那么也可以尝试其他的Python解释器。

参考链接：[https://blog.csdn.net/weixin\_42239402/article/details/95375147](https://blog.csdn.net/weixin_42239402/article/details/95375147)

-   Python 中如何实现多线程？

```python
### 方法一：创建threading.Thread对象
import threading

def testthread(args):
    print('{} is started'.format(args))

if __name__ == '__main__':
    ###分别实例化线程threading
    thread1 = threading.Thread(target=testthread , args=('this is threading 1 ',))
    thread2 = threading.Thread(target=testthread , args=('this is threading 2 ',))
    ###启动线程，调佣同一个函数，接收不同参数。
    thread1.start()
    thread2.start()
    print('\ndone...')
```

```python
### 方法二：继承于threading.Thread，重写方法run()
import threading
import time

# 重写一个类，继承于threading.Thread
class MyThread(threading.Thread):
    def __init__(self, jobName):
        super(MyThread, self).__init__()
        self.jobName = jobName

    # 重写run方法， 实现多线程， 因为start方法执行时， 调用的是run方法;
    # run方法里面编写的内容就是你要执行的任务；
    def run(self):
        print("这是一个需要执行的任务%s。。。。。" %(self.jobName))
        print("当前线程的个数:", threading.active_count() )
        time.sleep(1)
        print("当前线程的信息:", threading.current_thread())
if __name__ == '__main__':
    t1 = MyThread("name1")
    t2 = MyThread("name2")
    t1.start()
    t2.start()
    ###join()方法可以等待所有的子线程执行结束之后， 再执行主线程。
    t1.join()
    t2.join()
    print("程序执行结束.....")
```

```python
import threading
import time
import _thread
def job():
    print("这是一个需要执行的任务。。。。。")
    print("当前线程的个数:", threading.active_count() )
    print("当前线程的信息:", threading.current_thread())
    time.sleep(5)
if __name__ == '__main__':
    # 创建多线程时， 需要制定该线程执行的任务
    _thread.start_new_thread(job, ())
    _thread.start_new_thread(job, ())
    job()
    
输出：
这是一个需要执行的任务。。。。。
当前线程的个数: 1
当前线程的信息: <_MainThread(MainThread, started 11300)>
这是一个需要执行的任务。。。。。
当前线程的个数: 1
当前线程的信息: <_DummyThread(Dummy-1, started daemon 6620)>这是一个需要执行的任务。。。。。

当前线程的个数: 2
当前线程的信息: <_DummyThread(Dummy-2, started daemon 6360)>
```

```python
###普通函数：希望获取十个ip的城市和国家
import time
from urllib.request import urlopen

# 记录时间的装饰器
def timeit(f):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        res = f(*args, **kwargs)
        end_time = time.time()
        print("%s函数运行时间:%.2f" % (f.__name__, end_time - start_time))
        return res

    return wrapper


def get_addr(ip):
    url = "http://ip-api.com/json/%s" % (ip)
    urlObj = urlopen(url)
    # 服务端返回的页面信息, 此处为字符串类型
    pageContent = urlObj.read().decode('utf-8')
    # 2. 处理Json数据
    import json
    # 解码: 将json数据格式解码为python可以识别的对象;
    dict_data = json.loads(pageContent)
    print("""
                        %s
    所在城市: %s
    所在国家: %s

    """ % (ip, dict_data['city'], dict_data['country']))

###这里应用装饰器
@timeit
def main():
    ips = ['12.13.14.%s' % (i + 1) for i in range(10)]
    for ip in ips:
        get_addr(ip)


if __name__ == '__main__':
    main()
```

```python
import threading
import time
from urllib.request import urlopen


def timeit(f):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        res = f(*args, **kwargs)
        end_time = time.time()
        print("%s函数运行时间:%.2f" % (f.__name__, end_time - start_time))
        return res

    return wrapper


def get_addr(ip):
    url = "http://ip-api.com/json/%s" % (ip)
    urlObj = urlopen(url)
    # 服务端返回的页面信息, 此处为字符串类型
    pageContent = urlObj.read().decode('utf-8')
    # 2. 处理Json数据
    import json
    # 解码: 将json数据格式解码为python可以识别的对象;
    dict_data = json.loads(pageContent)
    print("""
                        %s
    所在城市: %s
    所在国家: %s

    """ % (ip, dict_data['city'], dict_data['country']))


@timeit
def main():
    ips = ['12.13.14.%s' % (i + 1) for i in range(10)]
    threads = []
    for ip in ips:
        # 实例化10个对象，target=目标函数名，args=目标函数参数(元组格式)
        t = threading.Thread(target=get_addr, args=(ip,))
        threads.append(t)
        t.start()

    # 等待所有子线程结束再运行主线程
    [thread.join() for thread in threads]


if __name__ == '__main__':
    main()
```

```python
#### 重写run方法实现刚才爬虫多线程案例

import threading
import time
from urllib.request import urlopen


def timeit(f):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        res = f(*args, **kwargs)
        end_time = time.time()
        print("%s函数运行时间:%.2f" % (f.__name__, end_time - start_time))
        return res

    return wrapper


class MyThread(threading.Thread):
    def __init__(self, ip):
        super(MyThread, self).__init__()
        self.ip = ip

    def run(self):
        url = "http://ip-api.com/json/%s" % (self.ip)
        urlObj = urlopen(url)
        # 服务端返回的页面信息, 此处为字符串类型
        pageContent = urlObj.read().decode('utf-8')
        # 2. 处理Json数据
        import json
        # 解码: 将json数据格式解码为python可以识别的对象;
        dict_data = json.loads(pageContent)
        print("""
                            %s
        所在城市: %s
        所在国家: %s

        """ % (self.ip, dict_data['city'], dict_data['country']))


@timeit
def main():
    ips = ['12.13.14.%s' % (i + 1) for i in range(10)]
    threads = []
    for ip in ips:
        # 实例化自己重写的类
        t = MyThread(ip)
        threads.append(t)
        t.start()
    [thread.join() for thread in threads]


if __name__ == '__main__':
    main()
```
