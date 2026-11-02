---
title: python教程学习笔记001
date: '2023-01-24T00:00:00+00:00'
permalink: 2023/01/24/python教程学习笔记001/
categories:
  - python
tags:
  - 测试开发
---

-   廖雪峰的官方网站-Python教程学习笔记

1.  关于字符集的全部知识  
    [https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896](https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896)

2.  当Python解释器读取源代码时，为了让它按UTF-8编码读取，我们通常在文件开头写上这两行：
    
    ```python
    #!/usr/bin/env python3
    # -*- coding: utf-8 -*-

    name = input()
    print('Hello,', name)
    ```
    
3.  格式化相关内容
    

如果你不太确定应该用什么，%s永远起作用，它会把任何数据类型转换为字符串：

```python
>>> 'Age: %s. Gender: %s' % (25, True)
'Age: 25. Gender: True'
```

format()：  
另一种格式化字符串的方法是使用字符串的format()方法，它会用传入的参数依次替换字符串内的占位符{0}、{1}……，不过这种方式写起来比%要麻烦得多：

```python
>>> 'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)
'Hello, 小明, 成绩提升了 17.1%'
```

f-string：  
最后一种格式化字符串的方法是使用以f开头的字符串，称之为f-string，它和普通字符串不同之处在于，字符串如果包含{xxx}，就会以对应的变量替换：

```python
>>> r = 2.5
>>> s = 3.14 * r ** 2
>>> print(f'The area of a circle with radius {r} is {s:.2f}')
The area of a circle with radius 2.5 is 19.62
```

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

s = 'Python-中文'
print(s)
b = s.encode('utf-8')
print(b)
print(b.decode('utf-8'))
```

4.  list 和 tuple

tuple：  
另一种有序列表叫元组：tuple。tuple和list非常类似，但是tuple一旦初始化就不能修改，比如同样是列出同学的名字：

> > > classmates = (‘Michael’, ‘Bob’, ‘Tracy’)  
> > > 现在，classmates这个tuple不能变了，它也没有append()，insert()这样的方法。其他获取元素的方法和list是一样的，你可以正常地使用classmates\[0\]，classmates\[-1\]，但不能赋值成另外的元素。  
> > > 不可变的tuple有什么意义？因为tuple不可变，所以代码更安全。如果可能，能用tuple代替list就尽量用tuple。

tuple中有list时，更改list中的值，tuple的元素确实变了，但其实变的不是tuple的元素，而是list的元素。tuple一开始指向的list并没有改成别的list，所以，tuple所谓的“不变”是说，tuple的每个元素，指向永远不变。  
即指向’a’，就不能改成指向’b’，指向一个list，就不能改成指向其他对象，但指向的这个list本身是可变的！

5.  函数

空函数：  
如果想定义一个什么事也不做的空函数，可以用pass语句：  
def nop():  
pass  
pass语句什么都不做，那有什么用？实际上pass可以用来作为占位符，比如现在还没想好怎么写函数的代码，就可以先放一个pass，让代码能运行起来。

定义函数时，需要确定函数名和参数个数；  
如果有必要，可以先对参数的数据类型做检查；  
函数体内部可以用return随时返回函数结果；  
函数执行完毕也没有return语句时，自动return None。  
函数可以同时返回多个值，但其实就是一个tuple。

函数参数：  
除了正常定义的必选参数外，还可以使用默认参数、可变参数和关键字参数，使得函数定义出来的接口，不但能处理复杂的参数，还可以简化调用者的代码。

参数组合  
在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，这5种参数都可以组合使用。但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。  
比如定义一个函数，包含上述若干种参数：

```python
def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)

def f2(a, b, c=0, *, d, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
```

在函数调用的时候，Python解释器自动按照参数位置和参数名把对应的参数传进去。

```python
>>> f1(1, 2)
a = 1 b = 2 c = 0 args = () kw = {}
>>> f1(1, 2, c=3)
a = 1 b = 2 c = 3 args = () kw = {}
>>> f1(1, 2, 3, 'a', 'b')
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {}
>>> f1(1, 2, 3, 'a', 'b', x=99)
a = 1 b = 2 c = 3 args = ('a', 'b') kw = {'x': 99}
>>> f2(1, 2, d=99, ext=None)
a = 1 b = 2 c = 0 d = 99 kw = {'ext': None}
```

Python的函数具有非常灵活的参数形态，既可以实现简单的调用，又可以传入非常复杂的参数。  
默认参数一定要用不可变对象，如果是可变对象，程序运行时会有逻辑错误！  
要注意定义可变参数和关键字参数的语法：  
*args是可变参数，args接收的是一个tuple；  
**kw是关键字参数，kw接收的是一个dict。  
以及调用函数时如何传入可变参数和关键字参数的语法：  
可变参数既可以直接传入：func(1, 2, 3)，又可以先组装list或tuple，再通过*args传入：func(*(1, 2, 3))；  
关键字参数既可以直接传入：func(a=1, b=2)，又可以先组装dict，再通过**kw传入：func(\*\*{‘a’: 1, ‘b’: 2})。  
使用*args和\**kw是Python的习惯写法，当然也可以用其他参数名，但最好使用习惯用法。  
命名的关键字参数是为了限制调用者可以传入的参数名，同时可以提供默认值。  
定义命名的关键字参数在没有可变参数的情况下不要忘了写分隔符*，否则定义的将是位置参数。

递归函数：

```python
def fact(n):
    if n==1:
        return 1
    return n * fact(n - 1)
```

练习  
汉诺塔的移动可以用递归函数非常简单地实现。  
请编写move(n, a, b, c)函数，它接收参数n，表示3个柱子A、B、C中第1个柱子A的盘子数量，然后打印出把所有盘子从A借助B移动到C的方法，例如：

```python
def move(n,a,b,c):
    if n == 1 :
        print(a, '---->' ,c)
    else :
        move(n-1,a,c,b)
        move(1,a,b,c)
        move(n-1,b,a,c)
```

6.  迭代、列表生成器、生成器、迭代器。

当我们使用for循环时，只要作用于一个可迭代对象，for循环就可以正常运行，而我们不太关心该对象究竟是list还是其他数据类型。  
那么，如何判断一个对象是可迭代对象呢？方法是通过collections.abc模块的Iterable类型判断：

```python
>>> from collections.abc import Iterable
>>> isinstance('abc', Iterable) # str是否可迭代
True
>>> isinstance([1,2,3], Iterable) # list是否可迭代
True
>>> isinstance(123, Iterable) # 整数是否可迭代
False
```

要对list实现类似Java那样的下标循环怎么办？Python内置的enumerate函数可以把一个list变成索引-元素对，这样就可以在for循环中同时迭代索引和元素本身：

```python
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C
```

上面的for循环里，同时引用了两个变量，在Python里是很常见的，比如下面的代码：

```python
>>> for x, y in [(1, 1), (2, 4), (3, 9)]:
...     print(x, y)
...
1 1
2 4
3 9
```

for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方：

> > > \[x \* x for x in range(1, 11) if x % 2 == 0\]  
> > > \[4, 16, 36, 64, 100\]  
> > > 还可以使用两层循环，可以生成全排列：

> > > \[m + n for m in ‘ABC’ for n in ‘XYZ’\]  
> > > \[‘AX’, ‘AY’, ‘AZ’, ‘BX’, ‘BY’, ‘BZ’, ‘CX’, ‘CY’, ‘CZ’\]

> > > \[x if x % 2 == 0 else -x for x in range(1, 11)\]  
> > > \[-1, 2, -3, 4, -5, 6, -7, 8, -9, 10\]  
> > > 上述for前面的表达式x if x % 2 == 0 else -x才能根据x计算出确定的结果。

可见，在一个列表生成式中，for前面的if … else是表达式，而for后面的if是过滤条件，不能带else。

斐波拉契数列（Fibonacci）：  
比如，著名的斐波拉契数列（Fibonacci），除第一个和第二个数外，任意一个数都可由前两个数相加得到：  
1, 1, 2, 3, 5, 8, 13, 21, 34, …  
斐波拉契数列用列表生成式写不出来，但是，用函数把它打印出来却很容易：

```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        print(b)
        a, b = b, a + b
        n = n + 1
    return 'done'
```

注意，赋值语句：

a, b = b, a + b  
相当于：

t = (b, a + b) # t是一个tuple  
a = t\[0\]  
b = t\[1\]  
但不必显式写出临时变量t就可以赋值。

要把fib函数变成generator函数，只需要把print(b)改为yield b就可以了：

```python
def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'
```

这就是定义generator的另一种方法。如果一个函数定义中包含yield关键字，那么这个函数就不再是一个普通函数，而是一个generator函数，调用一个generator函数将返回一个generator：

> > > f = fib(6)  
> > > f  
> > > <generator object fib at 0x104feaaa0>  
> > > 这里，最难理解的就是generator函数和普通函数的执行流程不一样。普通函数是顺序执行，遇到return语句或者最后一行函数语句就返回。而变成generator的函数，在每次调用next()的时候执行，遇到yield语句返回，再次执行时从上次返回的yield语句处继续执行。

迭代器：  
我们已经知道，可以直接作用于for循环的数据类型有以下几种：

一类是集合数据类型，如list、tuple、dict、set、str等；

一类是generator，包括生成器和带yield的generator function。

这些可以直接作用于for循环的对象统称为可迭代对象：Iterable。

可以使用isinstance()判断一个对象是否是Iterable对象：

> > > from collections.abc import Iterable  
> > > isinstance(\[\], Iterable)  
> > > True  
> > > isinstance({}, Iterable)  
> > > True  
> > > isinstance(‘abc’, Iterable)  
> > > True  
> > > isinstance((x for x in range(10)), Iterable)  
> > > True  
> > > isinstance(100, Iterable)  
> > > False

而生成器不但可以作用于for循环，还可以被next()函数不断调用并返回下一个值，直到最后抛出StopIteration错误表示无法继续返回下一个值了。

可以被next()函数调用并不断返回下一个值的对象称为迭代器：Iterator。

可以使用isinstance()判断一个对象是否是Iterator对象：

> > > from collections.abc import Iterator  
> > > isinstance((x for x in range(10)), Iterator)  
> > > True  
> > > isinstance(\[\], Iterator)  
> > > False  
> > > isinstance({}, Iterator)  
> > > False  
> > > isinstance(‘abc’, Iterator)  
> > > False  
> > > 生成器都是Iterator对象，但list、dict、str虽然是Iterable，却不是Iterator。

把list、dict、str等Iterable变成Iterator可以使用iter()函数：

> > > isinstance(iter(\[\]), Iterator)  
> > > True  
> > > isinstance(iter(‘abc’), Iterator)  
> > > True  
> > > 你可能会问，为什么list、dict、str等数据类型不是Iterator？

这是因为Python的Iterator对象表示的是一个数据流，Iterator对象可以被next()函数调用并不断返回下一个数据，直到没有数据时抛出StopIteration错误。可以把这个数据流看做是一个有序序列，但我们却不能提前知道序列的长度，只能不断通过next()函数实现按需计算下一个数据，所以Iterator的计算是惰性的，只有在需要返回下一个数据时它才会计算。

Iterator甚至可以表示一个无限大的数据流，例如全体自然数。而使用list是永远不可能存储全体自然数的。

7.  函数式编程

高阶函数：  
函数本身也可以赋值给变量，即：变量可以指向函数。

如果一个变量指向了一个函数，那么，可否通过该变量来调用这个函数？用代码验证一下：

> > > f = abs  
> > > f(-10)  
> > > 10  
> > > 成功！说明变量f现在已经指向了abs函数本身。直接调用abs()函数和调用变量f()完全相同。

map函数：

> > > def f(x):  
> > > … return x \* x  
> > > …  
> > > r = map(f, \[1, 2, 3, 4, 5, 6, 7, 8, 9\])  
> > > list(r)  
> > > \[1, 4, 9, 16, 25, 36, 49, 64, 81\]  
> > > map()传入的第一个参数是f，即函数对象本身。由于结果r是一个Iterator，Iterator是惰性序列，因此通过list()函数让它把整个序列都计算出来并返回一个list。

filter函数：  
Python内建的filter()函数用于过滤序列。  
和map()类似，filter()也接收一个函数和一个序列。和map()不同的是，filter()把传入的函数依次作用于每个元素，然后根据返回值是True还是False决定保留还是丢弃该元素。  
例如，在一个list中，删掉偶数，只保留奇数，可以这么写：  
def is\_odd(n):  
return n % 2 == 1

list(filter(is\_odd, \[1, 2, 4, 5, 6, 9, 10, 15\]))

# 结果: \[1, 5, 9, 15\]

sorted函数：  
sorted传入key函数，即可实现忽略大小写的排序：

> > > sorted(\[‘bob’, ‘about’, ‘Zoo’, ‘Credit’\], key=str.lower)  
> > > \[‘about’, ‘bob’, ‘Credit’, ‘Zoo’\]  
> > > 要进行反向排序，不必改动key函数，可以传入第三个参数reverse=True：

> > > sorted(\[‘bob’, ‘about’, ‘Zoo’, ‘Credit’\], key=str.lower, reverse=True)  
> > > \[‘Zoo’, ‘Credit’, ‘bob’, ‘about’\]

闭包：

```python
def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum
```

当我们调用lazy\_sum()时，返回的并不是求和结果，而是求和函数：

> > > f = lazy\_sum(1, 3, 5, 7, 9)  
> > > f  
> > > <function lazy\_sum..sum at 0x101c6ed90>  
> > > 调用函数f时，才真正计算求和的结果：  
> > > f()  
> > > 25  
> > > 在这个例子中，我们在函数lazy\_sum中又定义了函数sum，并且，内部函数sum可以引用外部函数lazy\_sum的参数和局部变量，当lazy\_sum返回函数sum时，相关参数和变量都保存在返回的函数中，这种称为“闭包（Closure）”的程序结构拥有极大的威力。

闭包注意事项：  
返回闭包时牢记一点：返回函数不要引用任何循环变量，或者后续会发生变化的变量。  
使用闭包时，对外层变量赋值前，需要先使用nonlocal声明该变量不是当前函数的局部变量。

匿名函数：

> > > list(map(lambda x: x \* x, \[1, 2, 3, 4, 5, 6, 7, 8, 9\]))  
> > > \[1, 4, 9, 16, 25, 36, 49, 64, 81\]  
> > > 通过对比可以看出，匿名函数lambda x: x \* x实际上就是：

def f(x):  
return x \* x  
关键字lambda表示匿名函数，冒号前面的x表示函数参数。

装饰器decorator：  
decorator就是一个返回函数的高阶函数。所以，我们要定义一个能打印日志的decorator，可以定义如下：

```python
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

观察上面的log，因为它是一个decorator，所以接受一个函数作为参数，并返回一个函数。我们要借助Python的@语法，把decorator置于函数的定义处：

```python
@log
def now():
    print('2015-3-25')
```

调用now()函数，不仅会运行now()函数本身，还会在运行now()函数前打印一行日志：

> > > now()  
> > > call now():  
> > > 2015-3-25  
> > > 把@log放到now()函数的定义处，相当于执行了语句：  
> > > now = log(now)  
> > > 一个完整的decorator的写法如下：

```python
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper
```

或者针对带参数的decorator：

```python
import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator
```

import functools是导入functools模块。现在，只需记住在定义wrapper()的前面加上@functools.wraps(func)即可。

偏函数：  
functools.partial就是帮助我们创建一个偏函数的，不需要我们自己定义int2()，可以直接使用下面的代码创建一个新的函数int2：

> > > import functools  
> > > int2 = functools.partial(int, base=2)  
> > > int2(‘1000000’)  
> > > 64  
> > > int2(‘1010101’)  
> > > 85  
> > > 所以，简单总结functools.partial的作用就是，把一个函数的某些参数给固定住（也就是设置默认值），返回一个新的函数，调用这个新函数会更简单。

偏函数可以简化参数操作。  
当函数的某个参数是我们可以提前获知的，那我们就可以将它固定住！  
举个例子

```python
# 定义一个取余函数，默认和2取余；
def mod(x,y=2):
  # 返回 True 或 False
  return x % y == 0

# 假设我们要计算和3取余，如果不使用partial()函数，那么我们每次调用mod()函数时，都要写y=3
mod(4,y=3)
mod(6,y=3)

# 使用partial()函数
from functools import partial
mod_3 = partial(mod,y=3)
mod_3(4)
mod_3(6)
```

使用偏函数可以让我们减少填写参数的步骤，也可以使代码更加简洁。  
有的人说那我重新定义一个不也可以吗？使用Ctrl C & Ctrl V无视函数体代码量多少，再定义一个。  
当然可以，但是这样你的源码就会显得很臃肿，试想一下有两个函数，它俩的不同点就是默认参数值不一样，源码看起来就繁琐，读起来更是！  
总之，使用偏函数，可以使你的代码和操作更加简洁！
