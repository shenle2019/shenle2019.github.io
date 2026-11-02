---
title: python interview 4
date: '2022-08-22T00:00:00+00:00'
permalink: 2022/08/22/python-interview-4/
categories:
  - 面试
tags:
  - python
---

## Python面试题整理-V1 day4

-   根据键对字典排序，使用zip
    
    ```python

    ### 根据键对字典排序，使用zip

    dic = {'name':'zhangsan','sex':'man','age':17}
    print(dic.keys(),dic.values())

    ### 字典转列表，再转元组。
    foo = zip(dic.keys(),dic.values())
    print(foo)

    ### 排序。
    foo = [i for i in foo]
    print(foo)

    b = sorted(foo,key = lambda x:x[0])
    print('根据键排序',b)

    newdic = {i[0]:i[1] for i in b}
    print(newdic.keys(),newdic.values())
    ```
    
-   根据键对字典排序，不使用zip
    

```python
### 根据键对字典排序，不使用zip

dic = {'name':'zhangsan','sex':'man','age':17}
print(dic.keys(),dic.values())

b = sorted(dic.items(),key = lambda x:x[0])
print('根据键排序',b)

newdic = {i[0]:i[1] for i in b}
print(newdic.keys(),newdic.values())
```

-   列表推导式、字典推导式、生成器

```python
###  列表推导式、字典推导式、生成器

import random
td_list = [i for i in range(10)]
print(td_list)

td_dic = {key:random.randint(1, 9) for key in ['a','b','c','d']}
print(td_dic.keys(),td_dic.values())

td_generator = (i for i in range(10))
print(td_generator)
```

输出为：

\[0, 1, 2, 3, 4, 5, 6, 7, 8, 9\]  
dict\_keys(\[‘a’, ‘b’, ‘c’, ‘d’\]) dict\_values(\[4, 6, 2, 5\])  
<generator object at 0x108b6b270>

-   根据字符串的长度排序
    
    ```python
    ### 根据字符串的长度排序

    s = ['abc','a','casdg','dsfsdf','dsfs','nooh','sdfds','zcfasfd','df','fd','dfd']
    b = sorted(s,key = lambda x:len(x))
    ### sorted返回值给b，没有改变原来的字符串 s。
    print(b,s)

    ### 直接sorted不赋值，则
    s.sort(key=len)
    print(s)
    ```
    

输出结果：  
\[‘a’, ‘df’, ‘fd’, ‘abc’, ‘dfd’, ‘dsfs’, ‘nooh’, ‘casdg’, ‘sdfds’, ‘dsfsdf’, ‘zcfasfd’\] \[‘abc’, ‘a’, ‘casdg’, ‘dsfsdf’, ‘dsfs’, ‘nooh’, ‘sdfds’, ‘zcfasfd’, ‘df’, ‘fd’, ‘dfd’\]  
\[‘a’, ‘df’, ‘fd’, ‘abc’, ‘dfd’, ‘dsfs’, ‘nooh’, ‘casdg’, ‘sdfds’, ‘dsfsdf’, ‘zcfasfd’\]

-   举例说明sql注入的例子和解法。

```sql
### 举例说明sql注入的例子和解法。

正常sql：select * from table1 where table1.name = 'zs'；
输入'zs'；
sql注入：select * from table1 where table1.name = 'zs'；drop database demo;
实际输入'zs'；drop database demo;
解法：只传参数，不传大段的完整的sql；特别是DDL的sql
将name = 后面的内容用参数化解决。比如用params = [input_name],传入sql为
count = cs1.execute('select * from table1 where table1.name = %s',params)

sql注入详解：
https://blog.csdn.net/huangyongkang666/article/details/123624015

几个常见实例：
select * from 表名 where id=1。组合出来的sql注入语句为：select * from news where id=1 and 1=1
select * from 表名 where name='admin'注意多了引号。组合出来的sql注入语句为：select * from news where chr='admin' and 1=1 ' '
select * from 表名 where 字段 like '%关键字%'`。
组合出来的sql注入语句为：
select * from news where search like '%测试 %' and '%1%'='%1%'
测试%' union select 1,2,3,4 and '%'='

常见，get注入，post注入，cookie注入，http头部注入等等。
```

-   s=”info:xiaoZhang 33 shandong”,⽤正则切分字符串输出\[‘info’, ‘xiaoZhang’, ‘33’, ‘shandong’\]

```python
### 正则表达式，切割字符串
### s="info:xiaoZhang 33 shandong",⽤正则切分字符串输出['info', 'xiaoZhang', '33', 'shandong']
import re
s="info:xiaoZhang 33 shandong"
res = re.split(r":| ", s)
print(res)
```

-   正则匹配以@163.com结尾的邮箱。
    
    ```python
    ### 正则匹配以@163.com结尾的邮箱。
    import re
    email_list = ['xiaowang@163.com','xiaowang@163.comheiheihei','.com.xiaowang@qq.com']

    for email in email_list:
        ret = re.match("[\w]{4,20}@163.com$", email)
        if ret:
            print('{} 是符合要求的email地址，匹配后的结果是，{}'.format(email, ret.group()))
        else:
            print('{} 不符合要求'.format(email))
    ```
    

-   递归求和

```python
def sum_fun(num):
    if num >=1:
        ret = num + sum_fun(num - 1)
    else:
        ret = 0

    return ret

print(sum_fun(5))
```

-   python字典与json字符串相互转换法。

```python

import json
dict = {'name':'zhangsan'}

ret = json.dumps(dict)
print(ret,type(ret))

ret2 = json.loads(ret)
print(ret2,type(ret2))
```

-   MyISAM 与 InnoDB的区别

```sql

区别：1. InnoDB 支持事务，MyISAM 不支持事务。这是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一；

2. InnoDB 支持外键，而 MyISAM 不支持。对一个包含外键的 InnoDB 表转为 MYISAM 会失败； 

3. InnoDB 是聚集索引，MyISAM 是非聚集索引。聚簇索引的文件存放在主键索引的叶子节点上，因此 InnoDB 必须要有主键，通过主键索引效率很高。但是辅助索引需要两次查询，先查询到主键，然后再通过主键查询到数据。因此，主键不应该过大，因为主键太大，其他索引也都会很大。而 MyISAM 是非聚集索引，数据文件是分离的，索引保存的是数据文件的指针。主键索引和辅助索引是独立的。 

4. InnoDB 不保存表的具体行数，执行 select count(*) from table 时需要全表扫描。而MyISAM 用一个变量保存了整个表的行数，执行上述语句时只需要读出该变量即可，速度很快；    

5. InnoDB 最小的锁粒度是行锁，MyISAM 最小的锁粒度是表锁。一个更新语句会锁住整张表，导致其他查询和更新都会被阻塞，因此并发访问受限。这也是 MySQL 将默认存储引擎从 MyISAM 变成 InnoDB 的重要原因之一；

如何选择：
1. 是否要支持事务，如果要请选择 InnoDB，如果不需要可以考虑 MyISAM；
2. 如果表中绝大多数都只是读查询，可以考虑 MyISAM，如果既有读写也挺频繁，请使用InnoDB。
3. 系统奔溃后，MyISAM恢复起来更困难，能否接受，不能接受就选 InnoDB； 
4. MySQL5.5版本开始Innodb已经成为Mysql的默认引擎(之前是MyISAM)，说明其优势是有目共睹的。
如果你不知道用什么存储引擎，那就用InnoDB，至少不会差。
```

-   统计字符串中，某个字符出现的次数。

```python
str = "中国，china，中国，日本，澳大利亚，美国，日本，中国"
ret = str.count("中国")

print(ret)
```

-   字符串转换大小写

```python
str = "HHHuuuaaBBB"
str1 = str.upper()
str2 = str.lower()

print(str1,str2)
```

-   去除空格的方法。

```python
str = "hello abc hh  hh  aaa"
ret1 = str.replace(" ","")
print(ret1)

list2 = str.split(" ")
ret2 = "".join(list2)

print(ret2)
```

-   正则匹配不是以4和7结尾的手机号

```python
import re
tel_list = ['18665975275','15690876574','10086','18619823487']

for telphone in tel_list:
    ret = re.match("1\d{9}[0-3,5-6,8-9]",telphone)
    if ret:
        print("想要的结果{}".format(ret.group()))
    else:
        print("错误的结果{}".format(telphone))
```
