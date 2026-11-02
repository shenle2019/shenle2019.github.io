---
title: Python面试题整理-V1 day3
date: 2022-05-04T22:48:33.000Z
permalink: 2022/05/05/Python面试题整理-V1-day3/
categories:
  - 面试
tags:
  - python
---

### Python面试题整理-V1 day3

-   Filter 列出所有奇数，并构造新列表
    
    ```python
    a = [1,2,3,4,5,6,7,8,9,10]

    def funa(x):
        return x % 2 == 1

    newlist = filter(funa, a)
    print(newlist)
    newlist = [i for i in newlist]
    print(newlist)
    ```
    
-   列表推导式，列出所有奇数。并构造新列表
    
    ```python
    a = [1,2,3,4,5,6,7,8,9,10]

    res = [i for i in a if i%2 == 1]
    print(res)
    ```
    
-   a = (1,),b = (1),c=(“1”)，分别是什么数据类型
    
    ```python
    a = (1,)
    b = (1)
    c = ("1")
    print(type(a))
    print(type(b))
    print(type(c))

    输出：
    <class 'tuple'>
    <class 'int'>
    <class 'str'>
    ```
    
-   合并两个列表 a = \[1,2,3,3,9\] ,b = \[1,4,5,6,7,7\]
    
    ```python
    a = [1,2,3,3,9]
    b = [1,4,5,6,7,7]

    a.extend(b)
    print(a)

    newlist = sorted(a,reverse=False)
    print(newlist)
    ```
    
-   打印时间戳
    
    ```python
    import datetime

    a = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S ')) + '星期：'+ str(datetime.datetime.now().isoweekday())

    print(a)
    ```
    
-   自定义异常
    
    ```python
    def func():
        try:
            for i in range(10):
                if i > 5:
                    raise Exception("the number is bigger than 5")
        except Exception as ret:
            print(ret)

    func()
    ```
    
-   正则中.\* 和 .\*？的区别？
    
    贪婪匹配 以及 非贪婪匹配，注意正则的匹配（ .\*？）带括号与不带括号 .\*？有区别。
    
    ```python
    import re
    s = "<a>呵呵</a><a>哈哈</a>"

    res1 = re.findall("<a>(.*)</a>",s)
    print(res1)
    res2 = re.findall("<a>(.*?)</a>",s)
    print(res2)
    ```
    
    \[‘呵呵哈哈’\]  
    \[‘呵呵’, ‘哈哈’\]
    

​

-   一行代码展开列表a = \[\[1,2\],\[3,4\],\[5,6\]\]
    
    ```python
    a = [[1,2],[3,4],[5,6]]
    x = [j for i in a for j in i]
    print(x)
    ```
    
-   x = “abc”,y = “def”,z = \[“d”,”e”,”f”\] 分别求x.join(y),x.join(z)的结果
    
    ```python
    ###x.join(y)，意思y是可迭代对象，x插入其中。两个结果一样。
    x = "abc"
    y = "def"
    z = ["d","e","f"]

    m = x.join(y)
    print(m)
    ###dabceabcf
    n = x.join(z)
    print(n)
    ####dabceabcf
    ```
    
-   捕获异常的语法。
    
    ```python
    try:
        num = 10
        print(num)
    except NameError as Errormsg:
        print(Errormsg)
    else:
        print("没有报错，打印此行")


    try:
        num = 10
        print(num)
    except NameError as Errormsg:
        print(Errormsg)
    finally:
        print("无论如何，打印此行")
    ```
    
-   Python中交换两个数值
    
    ```python
    a = 3
    b = 4
    (a, b) = (b, a)
    print(a , b)
    ```
    
-   zip函数的用法
    
    ```python
    a = [1 , 3]
    b = [2 , 4]
    m = [i for i in zip(a, b)]
    print(m)

    x = (1 , 3)
    y = (2 , 4)
    n = [i for i in zip(x, y)]
    print(n)

    c = "xy"
    d = "123456"
    o = [i for i in zip(c, d)]
    print(o)
    ```
    
    输出：
    
    \[(1, 2), (3, 4)\]  
    \[(1, 2), (3, 4)\]  
    \[(‘x’, ‘1’), (‘y’, ‘2’)\]
    
-   a = “张明 98 分” 用re.sub 替换98为100
    
    ```python
    import re
    a = "张明 98 分"
    ret = re.sub(r'\d+','100',a)
    print(ret)
    ```
    
-   a=”hello”和b=”你好”编码成bytes类型
    
    ```python
    a="hello"
    b="你好"
    m = b"hello"
    ###将str编码成bytes
    n = b.encode()
    print(m)
    print(n)
    ###将bytes解码成str
    p = m.decode()
    print(p)
    ```
    
-   提高python运行效率的方法
    
    ```python
    1、使用局部变量
    尽量使用局部变量代替全局变量：便于维护，提高性能并节省内存。
    一方面可以提高程序性能，局部变量查找速度更快;另一方面可用简短标识符替代冗长的模块变量，提高可读性。

    2、使用较新的Python版本
    Python已经更新了很多个版本，每个版本的Python都会包含优化内容，使其运行速度优于之前的版本，所以大家记得经常更新版本哦！

    3、先编译后调用
    使用eval()、exec()函数执行代码时，最好调用代码对象(提前通过compile()函数编译成字节码)，而不是直接调用str，可以避免多次执行重复编译过程，提高程序性能。

    正则表达式模式匹配也类似，也最好先将正则表达式模式编译成regex对象(通过re.complie()函数)，然后再执行比较和匹配。

    4、采用生成器表达式替代列表解析
    列表解析会产生整个列表，对大量数据的迭代会产生负面效应。而生成器表达式则不会，其不会真正创建列表，而是返回一个生成器，在需要时产生一个值(延迟计算)，对内存更加友好。

    5、关键代码使用外部功能包

    使用 C/C++ 或机器语言的外部功能包处理时间敏感任务，可以有效提高应用的运行效率。这些功能包往往依附于特定的平台，因此你要根据自己所用的平台选择合适的功能包 。比如下面四个功能包：Cython、Pylnlne、PyPy、Pyrex 。

    6、在排序时使用键

    Python 含有许多古老的排序规则，这些规则在你创建定制的排序方法时会占用很多时间，而这些排序方法运行时也会拖延程序实际的运行速度。最佳的排序方法其实是尽可能多地使用键和内置的 sort() 方法。

    7、优化算法时间

    算法的时间复杂度对程序的执行效率影响最大，在Python中可以通过选择合适的数据结构来优化时间复杂度，如list和set查找某一个元素的时间复杂度分别是O(n)和O(1)。不同的场景有不同的优化方式，总得来说，一般有分治，分支界限，贪心，动态规划等思想。

    例如：set的用法

    set的union，intersection，difference操作要比list的迭代要快。因此如果涉及到求list交集，并集或者差的问题可以转换为set来操作。

    8、循环优化

    每种编程语言都会强调需要优化循环。当使用Python的时候，你可以依靠大量的技巧使得循环运行得更快。

    技巧 1：减少循环内部不必要的计算

    技巧 2：嵌套循环中，尽量减少内层循环的计算

    技巧 3：尽量使用局部变量

    技巧 4：使用 join() 连接字符串

    9、交叉编译你的应用

    计算机其实并不理解用来创建现代应用程序的编程语言，计算机理解的是机器语言。所以我们可以用Python语言编写应用，再以C++这样的语言运行你的应用，这在运行的角度来说，是可行的。

    Nuitka是一款有趣的交叉编译器，能将你的Python代码转化成C++代码。这样，你就可以在native模式下执行自己的应用，而无需依赖于解释器程序。你会发现自己的应用运行效率有了较大的提高，但是这会因平台和任务的差异而有所不同。

    10、充分利用多核CPU的优势

    因为GIL的存在，Python很难充分利用多核CPU的优势。但是，可以通过内置的模块multiprocessing实现下面几种并行模式：

    1、 多进程并行编程

    对于CPU密集型的程序，可以使用multiprocessing的Process,Pool等封装好的类，通过多进程的方式实现并行计算。但是因为进程中的通信成本比较大，对于进程之间需要大量数据交互的程序效率未必有大的提高。

    2、 多线程并行编程

    对于IO密集型的程序，multiprocessing.dummy模块使用multiprocessing的接口封装threading，使得多线程编程也变得非常轻松(比如可以使用Pool的map接口，简洁高效)。分布式：multiprocessing中的Managers类提供了可以在不同进程之共享数据的方式，可以在此基础上开发出分布式的程序。 不同的业务场景可以选择其中的一种或几种的组合实现程序性能的优化。
    ```
    
-   \[1,2,3\] + \[4,5,6\]的结果是多少？
    
    ```python
    print([1,2,3] + [4,5,6])

    # [1, 2, 3, 4, 5, 6]
    ```
    
-   正则匹配，匹配日期2018-03-20？
    
    ```python
    import re
    url='https://sycm.taobao.com/bda/tradinganaly/overview/get_summary.json?dateRange=2018-03-20%7C2018-03-20&dateType=recent1&device=1&token=ff25b109b&_=1521595613462'

    m = re.findall(r'\d+\-\d+\-\d+',url)
    print(m)

    ret = re.findall(r"dateRange=(.+?)%7C(.+?)&", url)
    print(ret)
    ```
    
-   list = \[2,3,5,4,9,6\] 不用sort排序，输出\[2,3,4,5,6,9\]
    
    ```python
    list = [2,3,5,4,9,6]
    list1 = sorted(list)
    print(list1)


    ### 妙啊
    list2 = []
    for i in range(100):
        if i in list:
            list2.append(i)
    print(list2)
    ```
    
-   写一个单例模式
    
    单例模式是一个软件的设计模式，为了保证一个类，无论调用多少次产生的实例对象，都是指向同一个内存地址，仅仅只有一个实例（只有一个对象）。
    
    实现单例模式的手段有很多种，但总的原则是保证一个类只要实例化一个对象，下一次再实例的时候就直接返回这个对象，不再做实例化的操作。所以这里面的关键一点就是，如何判断这个类是否实例化过一个对象。
    
    这里介绍两类方式：
    
    一类是通过模块导入的方式；  
    一类是通过魔法方法判断的方式；
    
    基本原理：
    
    -   第一类通过模块导入的方式，借用了模块导入时的底层原理实现。
        
    -   当一个模块（py文件）被导入时，首先会执行这个模块的代码，然后将这个模块的名称空间加载到内存。
        
    -   当这个模块第二次再被导入时，不会再执行该文件，而是直接在内存中找。
        
    -   于是，如果第一次导入模块，执行文件源代码时实例化了一个类，那再次导入的时候，就不会再实例化。
        
    -   第二类主要是基于类和元类实现，在’对象’的魔法方法中判断是否已经实例化过一个对象
        
    -   这类方式，根据实现的手法不同，又分为不同的方法，如：
        
    -   通过类的绑定方法；通过元类；通过类下的\_\_new\_\_；通过装饰器（函数装饰器，类装饰器）实现等。
        
    
    ```python
    # cls_singleton.py
    class Foo(object):
      pass

    instance = Foo()

    # test.py
    import cls_singleton

    obj1 = cls_singleton.instance
    obj2 = cls_singleton.instance
    print(obj1 is obj2)

    # 原理：模块第二次导入从内存找的机制
    打印结果：true
    ```
    

```python
class Student:
  _instance = None	# 记录实例化对象

  def __init__(self, name, age):
    self.name = name
    self.age = age

  @classmethod
  def get_singleton(cls, *args, **kwargs):
    if not cls._instance:
      cls._instance = cls(*args, **kwargs)
    return cls._instance

stu1 = Student.get_singleton('jack', 18)
stu2 = Student.get_singleton('jack', 18)
print(stu1 is stu2)
print(stu1.__dict__, stu2.__dict__)

# 原理：类的绑定方法是第二种实例化对象的方式，
# 第一次实例化的对象保存成类的数据属性 _instance，
# 第二次再实例化时，在get_singleton中判断已经有了实例对象，直接返回类的数据属性 _instance
### 补充：这种方式实现的单例模式有一个明显的bug；bug的根源在于如果用户不通过绑定类的方法实例化对象，而是直接通过类名加括号实例化对象，那这样不再是单例模式了。
```

```python
class Student:

  _instance = None

  def __init__(self, name, age):
    self.name = name
    self.age = age

  def __new__(cls, *args, **kwargs):
    # if cls._instance:
    #   return cls._instance	        # 有实例则直接返回
    # else:
    #   cls._instance = super().__new__(cls)	# 没有实例则new一个并保存
    #   return cls._instance	        # 这个返回是给是给init，再实例化一次，也没有关系

    if not cls._instance:	            # 这是简化的写法，上面注释的写法更容易提现判断思路
      cls._instance = super().__new__(cls)
    return cls._instance


stu1 = Student('jack', 18)
stu2 = Student('jack', 18)
print(stu1 is stu2)
print(stu1.__dict__, stu2.__dict__)

stu3 = Student('mick', 19)
print(stu1 is stu3)
print(stu1.__dict__, stu3.__dict__)

print(stu2.__dict__)

# 原理：和方法2类似，将判断的实现方式，从类的绑定方法中转移到类的__new__中
# 归根结底都是 判断类有没有实例，有则直接返回，无则实例化并保存到_instance中。
```

##通过元类\*\*

```python
class Mymeta(type):

  def __init__(cls, name, bases, dic):
    super().__init__(name, bases, dic)
    cls._instance = None		         # 将记录类的实例对象的数据属性放在元类中自动定义了

  def __call__(cls, *args, **kwargs):	         # 此call会在类被调用（即实例化时触发）
    if cls._instance:				 # 判断类有没有实例化对象
      return cls._instance
    else:						 # 没有实例化对象时，控制类造空对象并初始化
      obj = cls.__new__(cls, *args, **kwargs)
      obj.__init__(*args, **kwargs)
      cls._instance = obj			     # 保存对象，下一次再实例化可以直接返回而不用再造对象
      return obj


class Student(metaclass=Mymeta):
  def __init__(self, name, age):
    self.name = name
    self.age = age


stu1 = Student('jack', 18)
stu2 = Student('jack', 18)
print(stu1 is stu2)
print(stu1.__dict__, stu2.__dict__)

# 原理：类定义时会调用元类下的__init__，类调用(实例化对象)时会触发元类下的__call__方法
# 类定义时，给类新增一个空的数据属性，
# 第一次实例化时，实例化之后就将这个对象赋值给类的数据属性；第二次再实例化时，直接返回类的这个数据属性
# 和方式3的不同之处1：类的这个数据属性是放在元类中自动定义的，而不是在类中显示的定义的。
# 和方式3的不同之处2：类调用时触发元类__call__方法判断是否有实例化对象，而不是在类的绑定方法中判断
```

##函数装饰器

```python
def singleton(cls):
  _instance_dict = {}		         # 采用字典，可以装饰多个类，控制多个类实现单例模式
 
  def inner(*args, **kwargs):
    if cls not in _instance_dict:
      _instance_dict[cls] = cls(*args, **kwargs)
    return _instance_dict.get(cls)
  return inner


@singleton
class Student:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  # def __new__(cls, *args, **kwargs):	 # 将方法3的这部分代码搬到了函数装饰器中
  #   if not cls._instance:
  #     cls._instance = super().__new__(cls)
  #   return cls._instan
  
stu1 = Student('jack', 18)
stu2 = Student('jack', 18)
print(stu1 is stu2)
print(stu1.__dict__, stu2.__dict__)
```

##类装饰器

```python
class SingleTon:
  _instance_dict = {}

  def __init__(self, cls_name):
    self.cls_name = cls_name

  def __call__(self, *args, **kwargs):
    if self.cls_name not in SingleTon._instance_dict:
      SingleTon._instance_dict[self.cls_name] = self.cls_name(*args, **kwargs)
    return SingleTon._instance_dict.get(self.cls_name)


@SingleTon		               # 这个语法糖相当于Student = SingleTon(Student),即Student是SingleTon的实例对象
class Student:
  def __init__(self, name, age):
    self.name = name
    self.age = age

stu1 = Student('jack', 18)
stu2 = Student('jack', 18)
print(stu1 is stu2)
print(stu1.__dict__, stu2.__dict__)

# 原理：在函数装饰器的思路上，将装饰器封装成类。
# 程序执行到与语法糖时，会实例化一个Student对象，这个对象是SingleTon的对象。
# 后面使用的Student本质上使用的是SingleTon的对象。
# 所以使用Student('jack', 18)来实例化对象，其实是在调用SingleTon的对象，会触发其__call__的执行
# 所以就在__call__中，判断Student类有没有实例对象了。
```

本部分主要是补充介绍多线程并发情况下，多线程高并发时，如果同时有多个线程同一时刻（极端条件下）事例化对象，那么就会出现多个对象，这就不再是单例模式了。  
解决这个多线程并发带来的竞争问题，第一个想到的是加互斥锁，于是我们就用互斥锁的原理来解决这个问题。  
解决的关键点，无非就是将具体示例化操作的部分加一把锁，这样同时来的多个线程就需要排队。  
这样一来只有第一个抢到锁的线程实例化一个对象并保存在\_instance中，同一时刻抢锁的其他线程再抢到锁后，不会进入这个判断if not cls.\_instance，直接把保存在\_instance的对象返回了。这样就实现了多线程下的单例模式。  
此时还有一个问题需要解决，后面所有再事例对象时都需要再次抢锁，这会大大降低执行效率。解决这个问题也很简单，直接在抢锁前，判断下是否有单例对象了，如果有就不再往下抢锁了（代码第11行判断存在的意义）。

```python
import threading


class Student:

  _instance = None				# 保存单例对象
  _lock = threading.RLock()		    # 锁

  def __new__(cls, *args, **kwargs):
    
    if cls._instance:			# 如果已经有单例了就不再去抢锁，避免IO等待
      return cls._instance
    
    with cls._lock:				# 使用with语法，方便抢锁释放锁
      if not cls._instance:	
        cls._instance = super().__new__(cls, *args, **kwargs)
      return cls._instance
```

-   保留两位小数,几种方法
    
    ```python
    a = 1.3333333333
    b = round(a,2)
    print(b)

    print('%.2f'%a)

    print('{:.2f}'.format(a))
    ```
    
-   求三种方法打印结果
    
    fn(“one”,1）直接将键值对传给字典；
    
    fn(“two”,2)因为字典在内存中是可变数据类型，所以指向同一个地址，传了新的额参数后，会相当于给字典增加键值对
    
    fn(“three”,3,{})因为传了一个新字典，所以不再是原先默认参数的字典
    
    ```python
    def fn(k,v,dic={}):
        dic[k] = v
        print(dic)
        
    fn("one",1)
    fn("two",2)
    fn("three",3,{})
    ```
    
    输出：  
    {‘one’: 1}  
    {‘one’: 1, ‘two’: 2}  
    {‘three’: 3}
    
-   列出常见的状态码和意义
    
    200 OK
    
    请求正常处理完毕
    
    204 No Content
    
    请求成功处理，没有实体的主体返回
    
    206 Partial Content
    
    GET范围请求已成功处理
    
    301 Moved Permanently
    
    永久重定向，资源已永久分配新URI
    
    302 Found
    
    临时重定向，资源已临时分配新URI
    
    303 See Other
    
    临时重定向，期望使用GET定向获取
    
    304 Not Modified
    
    发送的附带条件请求未满足
    
    307 Temporary Redirect
    
    临时重定向，POST不会变成GET
    
    400 Bad Request
    
    请求报文语法错误或参数错误
    
    401 Unauthorized
    
    需要通过HTTP认证，或认证失败
    
    403 Forbidden
    
    请求资源被拒绝
    
    404 Not Found
    
    无法找到请求资源（服务器无理由拒绝）
    
    500 Internal Server Error
    
    服务器故障或Web应用故障
    
    503 Service Unavailable
    
    服务器超负载或停机维护
    
-   分别从前端、后端、数据库阐述web项目的性能优化
    
    前端优化：
    
    1、减少http请求、例如制作精灵图
    
    2、html和CSS放在页面上部，javascript放在页面下面，因为js加载比HTML和Css加载慢，所以要优先加载html和css,以防页面显示不全，性能差，也影响用户体验差
    
    后端优化：
    
    1、缓存存储读写次数高，变化少的数据，比如网站首页的信息、商品的信息等。应用程序读取数据时，一般是先从缓存中读取，如果读取不到或数据已失效，再访问磁盘数据库，并将数据再次写入缓存。
    
    2、异步方式，如果有耗时操作，可以采用异步，比如celery
    
    3、代码优化，避免循环和判断次数太多，如果多个if else判断，优先判断最有可能先发生的情况
    
    数据库优化：
    
    1、如有条件，数据可以存放于redis，读取速度快
    
    2、建立索引、外键等
    
-   dict = {“name”:”zhangsan”,”age”:18} 删除name的kv
    
    ```python
    dict = {"name":"zhangsan","age":18}
    del dict["name"]
    print(dict)

    dict2 = {"name":"zhangsan","age":18}
    dict2.pop("name")
    print(dict2)
    ```
    
-   A =zip((“a”,”b”,”c”,”d”,”e”),(1,2,3,4,5)) 转化为字典
    
    ```python
    A =zip(("a","b","c","d","e"),(1,2,3,4,5))
    print(A)
    A0 = dict(A)
    print(A0)

    A1 = range(10)
    A2 = [i for i in A1 if i in A0]
    print(A2)

    ### s in A0 即a，b，c，d，e  然后获取A0[a-z]的值
    A3 = [A0[s] for s in A0]
    print(A3)

    for s in A0:
        print(s)

    ### dict 创建字典的方法
    s1 = dict([["name","zhangsan"],["age",18]])
    print(s1)

    s2 = dict([("name","zhangsan"),("age",18)])
    print(s2)
    ```
    
-   简述同源策略
    

同源策略需要同时满足以下三点要求：

1）协议相同

2）域名相同

3）端口相同

http:[www.test.com与https:www.test.com](http://www.test.com与https:www.test.com) 不同源——协议不同

http:[www.test.com与http:www.admin.com](http://www.test.com与http:www.admin.com) 不同源——域名不同

http:[www.test.com与http:www.test.com:8081](http://www.test.com与http:www.test.com:8081) 不同源——端口不同

只要不满足其中任意一个要求，就不符合同源策略，就会出现“跨域”

-   简述cookie和session的区别
    
    1，session 在服务器端，cookie 在客户端（浏览器）
    
    2、session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效，存储Session时，键与Cookie中的sessionid相同，值是开发人员设置的键值对信息，进行了base64编码，过期时间由开发人员设置
    
    3、cookie安全性比session差
    
-   简述多线程、多进程
    
    进程：
    
    1、操作系统进行资源分配和调度的基本单位，多个进程之间相互独立
    
    2、稳定性好，如果一个进程崩溃，不影响其他进程，但是进程消耗资源大，开启的进程数量有限制
    
    线程：
    
    1、CPU进行资源分配和调度的基本单位，线程是进程的一部分，是比进程更小的能独立运行的基本单位，一个进程下的多个线程可以共享该进程的所有资源
    
    2、如果IO操作密集，则可以多线程运行效率高，缺点是如果一个线程崩溃，都会造成进程的崩溃
    
    应用：
    
    IO密集的用多线程，在用户输入，sleep 时候，可以切换到其他线程执行，减少等待的时间
    
    CPU密集的用多进程，因为假如IO操作少，用多线程的话，因为线程共享一个全局解释器锁，当前运行的线程会霸占GIL，其他线程没有GIL，就不能充分利用多核CPU的优势
    
-   简述any()和all()方法
    
    any():只要迭代器中有一个元素为真就为真
    
    all():迭代器中所有的判断项返回都是真，结果才为真
    
    python中什么元素为假？
    
    答案：（0，空字符串，空列表、空字典、空元组、None, False）
    
-   IOError、AttributeError、ImportError、IndentationError、IndexError、KeyError、SyntaxError、NameError分别代表什么异常
    
    IOError：输入输出异常
    
    AttributeError：试图访问一个对象没有的属性
    
    ImportError：无法引入模块或包，基本是路径问题
    
    IndentationError：语法错误，代码没有正确的对齐
    
    IndexError：下标索引超出序列边界
    
    KeyError:试图访问你字典里不存在的键
    
    SyntaxError:Python代码逻辑语法出错，不能执行
    
    NameError:使用一个还未赋予对象的变量
    
-   列出几种魔法方法并简要介绍用途
    
    <strong>init</strong>:对象初始化方法
    
    <strong>new</strong>:创建对象时候执行的方法，单列模式会用到
    
    <strong>str</strong>:当使用print输出对象的时候，只要自己定义了\_\_str\_\_(self)方法，那么就会打印从在这个方法中return的数据
    
    <strong>del</strong>:删除对象执行的方法
    
-   python 1.py 22 33命令行启动程序并传参，print(sys.argv)会输出什么数据？
    
    文件名和参数构成的列表,\[‘1.py’ , ‘22’ ,’33’\]
    
-   将\[i for i in range(3)\]迭代器改成生成器
    
    ```python
    list = [i for i in range(3)]

    print(list)
    print(type(list))

    ### 待研究
    tuple = (i for i in range(3))
    print(tuple)
    print(type(tuple))
    ```
    
-   去掉字符串的空格，a = ‘hehehad ‘
    
    ```python
    a = 'hehehad    '
    b = a.strip()
    print(b)
    print(len(b))
    ```
    
-   举例sort 和 sorted 来对列表处理结果 a = \[-1,0,2,-10,200,3,5\]
    
    ```python
    a = [-1,0,2,-10,200,3,5]
    a.sort(reverse=False)

    print(a)

    b = sorted(a,reverse=False)
    print(b)
    ```
    
-   对list使用lamada函数进行排序，list = \[1,0,-2,-30,-6,5,-7,16,88,-89\]
    
    ```python
    list = [1,0,-2,-30,-6,5,-7,16,88,-89]
    a = sorted(list,key = lambda x:x)
    print(a)
    ```
    
    输出结果：\[-89, -30, -7, -6, -2, 0, 1, 5, 16, 88\]
    
-   对list使用lamada函数进行排序，list = \[1,0,-2,-30,-6,5,-7,16,88,-89\],正数小到大，负数大到小。
    
    ```python
    list2 = [1,0,-2,-30,-6,5,-7,16,88,-89]
    b = sorted(list2,key = lambda x:(x<0,abs(x)))
    print(b)
    ```
    
    输出结果：\[0, 1, 5, 16, 88, -2, -6, -7, -30, -89\]
    
-   列表嵌套字典的排序，分别根据年龄和姓名排序。
    
    ```python
    list = [{"name":"zs","age":19},{"name":"ls","age":17}
        ,{"name":"ww","age":25},{"name":"zl","age":21}]

    ### 按姓名排序
    b = sorted(list,key = lambda x:x["name"],reverse=False)
    print(b)

    ### 按年龄排序，从大到小。
    c = sorted(list,key = lambda x:x["age"],reverse=True)
    print(c)
    ```
    
-   列表嵌套元组的排序，分别根据年龄和姓名排序。
    
    ```python
    list = [("age",18),("name",19),("lll",15),("xxx",25)]

    ### 按姓名排序
    b = sorted(list,key = lambda x:x[0],reverse=False)
    print(b)

    ### 按年龄排序，从大到小。
    c = sorted(list,key = lambda x:x[1],reverse=True)
    print(c)
    ```
    
-   列表嵌套列表的排序，分别根据年龄和姓名排序。年龄有相同？
    
    ```python
    list = [["age",18],["name",19],["lll",15],["xxx",25],["zzz",25]]

    ### 按姓名排序
    b = sorted(list,key = lambda x:x[0],reverse=False)
    print(b)

    ### 按年龄排序，从大到小。有相同年龄，可以再加一个字段，来排序姓名。
    c = sorted(list,key = lambda x:(x[1],x[0]),reverse=True)
    print(c)
    ```
