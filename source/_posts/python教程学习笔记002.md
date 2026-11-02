---
title: python教程学习笔记002
date: 2023-01-24T18:53:31.000Z
permalink: 2023/01/25/python教程学习笔记002/
categories:
  - python
tags:
  - 测试开发
---

1.  模块

每一个包目录下面都会有一个\_\_init\_\_.py的文件，这个文件是必须存在的，否则，Python就把这个目录当成普通目录，而不是一个包。<strong>init</strong>.py可以是空文件，也可以有Python代码，因为\_\_init\_\_.py本身就是一个模块  
自己创建模块时要注意命名，不能和Python自带的模块名称冲突。例如，系统自带了sys模块，自己的模块就不可命名为sys.py，否则将无法导入系统自带的sys模块。  
我们以内建的sys模块为例，编写一个hello的模块：

```python

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

' a test module '

__author__ = 'Michael Liao'

import sys

def test():
    args = sys.argv
    if len(args)==1:
        print('Hello, world!')
    elif len(args)==2:
        print('Hello, %s!' % args[1])
    else:
        print('Too many arguments!')

if __name__=='__main__':
    test()
```

当我们在命令行运行hello模块文件时，Python解释器把一个特殊变量\_\_name\_\_置为\_\_main\_\_，而如果在其他地方导入该hello模块时，if判断将失败，因此，这种if测试可以让一个模块通过命令行运行时执行一些额外的代码，最常见的就是运行测试。

我们可以用命令行运行hello.py看看效果：

```python

$ python3 hello.py
Hello, world!
$ python hello.py Michael
Hello, Michael!
```

2.  作用域

在Python中，是通过\_前缀来实现的。

正常的函数和变量名是公开的（public），可以被直接引用，比如：abc，x123，PI等；

类似\_\_xxx\_\_这样的变量是特殊变量，可以被直接引用，但是有特殊用途，比如上面的\_\_author\_\_，\_\_name\_\_就是特殊变量，hello模块定义的文档注释也可以用特殊变量\_\_doc\_\_访问，我们自己的变量一般不要用这种变量名；

类似\_xxx和\_\_xxx这样的函数或变量就是非公开的（private），不应该被直接引用，比如\_abc，\_\_abc等；

之所以我们说，private函数和变量“不应该”被直接引用，而不是“不能”被直接引用，是因为Python并没有一种方法可以完全限制访问private函数或变量，但是，从编程习惯上不应该引用private函数或变量。

3.  面向对象编程

类（Class）和实例（Instance）的概念是很自然的。Class是一种抽象概念，比如我们定义的Class——Student，是指学生这个概念，而实例（Instance）则是一个个具体的Student，比如，Bart Simpson和Lisa Simpson是两个具体的Student。  
所以，面向对象的设计思想是抽象出Class，根据Class创建Instance。  
面向对象的抽象程度又比函数要高，因为一个Class既包含数据，又包含操作数据的方法。

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score
```

注意：特殊方法“\_\_init\_\_”前后分别有两个下划线！！！  
注意到\_\_init\_\_方法的第一个参数永远是self，表示创建的实例本身，因此，在\_\_init\_\_方法内部，就可以把各种属性绑定到self，因为self就指向创建的实例本身。

有了\_\_init\_\_方法，在创建实例的时候，就不能传入空的参数了，必须传入与\_\_init\_\_方法匹配的参数，但self不需要传，Python解释器自己会把实例变量传进去  
和普通的函数相比，在类中定义的函数只有一点不同，就是第一个参数永远是实例变量self，并且，调用时，不用传递该参数。除此之外，类的方法和普通函数没有什么区别，所以，你仍然可以用默认参数、可变参数、关键字参数和命名关键字参数。

原先那种直接通过bart.score = 99也可以修改啊，为什么要定义一个方法大费周折？因为在方法中，可以对参数做检查，避免传入无效的参数：

```python
class Student(object):
    ...

    def set_score(self, score):
        if 0 <= score <= 100:
            self.__score = score
        else:
            raise ValueError('bad score')
```

需要注意的是，在Python中，变量名类似\_\_xxx\_\_的，也就是以双下划线开头，并且以双下划线结尾的，是特殊变量，特殊变量是可以直接访问的，不是private变量，所以，不能用\_\_name\_\_、\_\_score\_\_这样的变量名。

继承与多态：  
继承可以把父类的所有功能都直接拿过来，这样就不必重零做起，子类只需要新增自己特有的方法，也可以把父类不适合的方法覆盖重写。  
动态语言的鸭子类型特点决定了继承不像静态语言那样是必须的。

获取对象信息：  
当我们拿到一个对象的引用时，如何知道这个对象是什么类型、有哪些方法呢？  
使用type()  
首先，我们来判断对象类型，使用type()函数  
基本类型都可以用type()判断  
如果一个变量指向函数或者类，也可以用type()判断  
判断基本数据类型可以直接写int，str等，但如果要判断一个对象是否是函数怎么办？可以使用types模块中定义的常量  
对于class的继承关系来说，使用type()就很不方便。我们要判断class的类型，可以使用isinstance()函数。  
如果要获得一个对象的所有属性和方法，可以使用dir()函数，它返回一个包含字符串的list

4.  面向对象高级编程

使用\_\_slots\_\_ ：  
如果我们想要限制实例的属性怎么办？比如，只允许对Student实例添加name和age属性。  
为了达到限制的目的，Python允许在定义class的时候，定义一个特殊的\_\_slots\_\_变量，来限制该class实例能添加的属性：  
class Student(object):  
<strong>slots</strong> = (‘name’, ‘age’) # 用tuple定义允许绑定的属性名称  
然后，我们试试：

> > > s = Student() # 创建新的实例  
> > > s.name = ‘Michael’ # 绑定属性’name’  
> > > s.age = 25 # 绑定属性’age’  
> > > s.score = 99 # 绑定属性’score’  
> > > Traceback (most recent call last):  
> > > File ““, line 1, in  
> > > AttributeError: ‘Student’ object has no attribute ‘score’  
> > > 由于’score’没有被放到\_\_slots\_\_中，所以不能绑定score属性，试图绑定score将得到AttributeError的错误。  
> > > 使用\_\_slots\_\_要注意，\_\_slots\_\_定义的属性仅对当前类实例起作用，对继承的子类是不起作用的

使用@property ：

在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检查参数，导致可以把成绩随便改：

s = Student()  
s.score = 9999  
这显然不合逻辑。为了限制score的范围，可以通过一个set\_score()方法来设置成绩，再通过一个get\_score()来获取成绩，这样，在set\_score()方法里，就可以检查参数：

```python
class Student(object):

    def get_score(self):
         return self._score

    def set_score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```

对于类的方法，装饰器一样起作用。Python内置的@property装饰器就是负责把一个方法变成属性调用的：

````python
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```		

@property的实现比较复杂，我们先考察如何使用。把一个getter方法变成属性，只需要加上@property就可以了，此时，@property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值，于是，我们就拥有一个可控的属性操作：


>>> s = Student()
>>> s.score = 60 # OK，实际转化为s.set_score(60)
>>> s.score # OK，实际转化为s.get_score()
60
>>> s.score = 9999
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
注意到这个神奇的@property，我们在对实例属性操作的时候，就知道该属性很可能不是直接暴露的，而是通过getter和setter方法来实现的。
		

多重继承：
对于需要Runnable功能的动物，就多继承一个Runnable，例如Dog：

class Dog(Mammal, Runnable):
    pass
对于需要Flyable功能的动物，就多继承一个Flyable，例如Bat：

class Bat(Mammal, Flyable):
    pass
通过多重继承，一个子类就可以同时获得多个父类的所有功能。


MixIn：
在设计类的继承关系时，通常，主线都是单一继承下来的，例如，Ostrich继承自Bird。但是，如果需要“混入”额外的功能，通过多重继承就可以实现，比如，让Ostrich除了继承自Bird外，再同时继承Runnable。这种设计通常称之为MixIn。
为了更好地看出继承关系，我们把Runnable和Flyable改为RunnableMixIn和FlyableMixIn。类似的，你还可以定义出肉食动物CarnivorousMixIn和植食动物HerbivoresMixIn，让某个动物同时拥有好几个MixIn：
class Dog(Mammal, RunnableMixIn, CarnivorousMixIn):
    pass
MixIn的目的就是给一个类增加多个功能，这样，在设计类的时候，我们优先考虑通过多重继承来组合多个MixIn的功能，而不是设计多层次的复杂的继承关系。
Python自带的很多库也使用了MixIn。举个例子，Python自带了TCPServer和UDPServer这两类网络服务，而要同时服务多个用户就必须使用多进程或多线程模型，这两种模型由ForkingMixIn和ThreadingMixIn提供。通过组合，我们就可以创造出合适的服务来。
比如，编写一个多进程模式的TCP服务，定义如下：
class MyTCPServer(TCPServer, ForkingMixIn):
    pass
编写一个多线程模式的UDP服务，定义如下：
class MyUDPServer(UDPServer, ThreadingMixIn):
    pass
如果你打算搞一个更先进的协程模型，可以编写一个CoroutineMixIn：
class MyTCPServer(TCPServer, CoroutineMixIn):
    pass
这样一来，我们不需要复杂而庞大的继承链，只要选择组合不同的类的功能，就可以快速构造出所需的子类。


定制类：
看到类似__slots__这种形如__xxx__的变量或者函数名就要注意，这些在Python中是有特殊用途的。
__slots__我们已经知道怎么用了，__len__()方法我们也知道是为了能让class作用于len()函数。

通常__str__()和__repr__()代码都是一样的，所以，有个偷懒的写法：
```python
class Student(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return 'Student object (name=%s)' % self.name
    __repr__ = __str__
````

<strong>iter</strong>  
如果一个类想被用于for … in循环，类似list或tuple那样，就必须实现一个\_\_iter\_\_()方法，该方法返回一个迭代对象，然后，Python的for循环就会不断调用该迭代对象的\_\_next\_\_()方法拿到循环的下一个值，直到遇到StopIteration错误时退出循环。

<strong>getitem</strong>  
要表现得像list那样按照下标取出元素，需要实现\_\_getitem\_\_()方法

Python还有另一个机制，那就是写一个\_\_getattr\_\_()方法，动态返回一个属性。修改如下：

```python
class Student(object):

    def __init__(self):
        self.name = 'Michael'

    def __getattr__(self, attr):
        if attr=='score':
            return 99
```

当调用不存在的属性时，比如score，Python解释器会试图调用\_\_getattr\_\_(self, ‘score’)来尝试获得属性，这样，我们就有机会返回score的值

<strong>call</strong>  
一个对象实例可以有自己的属性和方法，当我们调用实例方法时，我们用instance.method()来调用。能不能直接在实例本身上调用呢？在Python中，答案是肯定的。  
任何类，只需要定义一个\_\_call\_\_()方法，就可以直接对实例进行调用。

```python
class Student(object):
    def __init__(self, name):
        self.name = name

    def __call__(self):
        print('My name is %s.' % self.name)
```

调用方式如下：

> > > s = Student(‘Michael’)  
> > > s() # self参数不要传入  
> > > My name is Michael.

通过callable()函数，我们就可以判断一个对象是否是“可调用”对象。

更多方法参考：[https://docs.python.org/3/reference/datamodel.html#special-method-names](https://docs.python.org/3/reference/datamodel.html#special-method-names)

枚举类：

为这样的枚举类型定义一个class类型，然后，每个常量都是class的一个唯一实例。Python提供了Enum类来实现这个功能：

from enum import Enum  
Month = Enum(‘Month’, (‘Jan’, ‘Feb’, ‘Mar’, ‘Apr’, ‘May’, ‘Jun’, ‘Jul’, ‘Aug’, ‘Sep’, ‘Oct’, ‘Nov’, ‘Dec’))

如果需要更精确地控制枚举类型，可以从Enum派生出自定义类：

```python
from enum import Enum, unique

@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
```

@unique装饰器可以帮助我们检查保证没有重复值。

使用元类：  
type()  
动态语言和静态语言最大的不同，就是函数和类的定义，不是编译时定义的，而是运行时动态创建的。

比方说我们要定义一个Hello的class，就写一个hello.py模块：

```python
class Hello(object):
    def hello(self, name='world'):
        print('Hello, %s.' % name)
```

当Python解释器载入hello模块时，就会依次执行该模块的所有语句，执行结果就是动态创建出一个Hello的class对象，测试如下：

> > > from hello import Hello  
> > > h = Hello()  
> > > h.hello()  
> > > Hello, world.  
> > > print(type(Hello))  
> > > <class ‘type’>  
> > > print(type(h))  
> > > <class ‘hello.Hello’>  
> > > type()函数可以查看一个类型或变量的类型，Hello是一个class，它的类型就是type，而h是一个实例，它的类型就是class Hello。

我们说class的定义是运行时动态创建的，而创建class的方法就是使用type()函数。

type()函数既可以返回一个对象的类型，又可以创建出新的类型，比如，我们可以通过type()函数创建出Hello类，而无需通过class Hello(object)…的定义：

> > > def fn(self, name=’world’): # 先定义函数  
> > > … print(‘Hello, %s.’ % name)  
> > > …  
> > > Hello = type(‘Hello’, (object,), dict(hello=fn)) # 创建Hello class  
> > > h = Hello()  
> > > h.hello()  
> > > Hello, world.  
> > > print(type(Hello))  
> > > <class ‘type’>  
> > > print(type(h))  
> > > <class ‘\_\_main\_\_.Hello’>  
> > > 要创建一个class对象，type()函数依次传入3个参数：

class的名称；  
继承的父类集合，注意Python支持多重继承，如果只有一个父类，别忘了tuple的单元素写法；  
class的方法名称与函数绑定，这里我们把函数fn绑定到方法名hello上。  
通过type()函数创建的类和直接写class是完全一样的，因为Python解释器遇到class定义时，仅仅是扫描一下class定义的语法，然后调用type()函数创建出class。

正常情况下，我们都用class Xxx…来定义类，但是，type()函数也允许我们动态创建出类来，也就是说，动态语言本身支持运行期动态创建类，这和静态语言有非常大的不同，要在静态语言运行期创建类，必须构造源代码字符串再调用编译器，或者借助一些工具生成字节码实现，本质上都是动态编译，会非常复杂。

metaclass（了解即可，较为复杂，不常用。可用于ORM）：  
除了使用type()动态创建类以外，要控制类的创建行为，还可以使用metaclass。  
metaclass，直译为元类，简单的解释就是：  
当我们定义了类以后，就可以根据这个类创建出实例，所以：先定义类，然后创建实例。  
但是如果我们想创建出类呢？那就必须根据metaclass创建出类，所以：先定义metaclass，然后创建类。  
连接起来就是：先定义metaclass，就可以创建类，最后创建实例。  
所以，metaclass允许你创建类或者修改类。换句话说，你可以把类看成是metaclass创建出来的“实例”。
