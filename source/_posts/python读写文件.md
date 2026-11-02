---
title: python读写文件
date: '2021-12-20T00:00:00+00:00'
permalink: 2021/12/20/python读写文件/
categories:
  - 测试
tags:
  - python
---

#### OS模块的常用方法

-   os.path.join()
    
    不同操作系统路径之间的分隔符不统一，就用此函数来做这件事。
    
    ```python
    import os
    print(os.path.join('usr','bin','spam'))
    # print(os.path.join('usr',filename))常用
    ```
    
-   获取当前目录
    
    os.getcwd()获取当前目录
    
    os.chdir()修改为其他目录，这里注意，如果没有要转过去的目录，会有报错。
    
-   用os.makedirs()创建新的文件夹目录
    
-   处理绝对路径和相对路径
    
    获取绝对路径 os.path.abspath(path)
    
    获得布尔值 os.path.isabs(path)
    
    获取相对路径 os.path.relpath(path,start)
    
    获取目录名称 os.path.dirname(path)
    
    获取基本名称 os.path.basename(path)
    
    同时获取以上两个内容 os.path.split(path)
    
    path.split(os.path.sep)，这里os.path.sep变量会根据操作系统自动匹配分隔符，如\\\\或者/等。
    
-   查看文件大小 os.path.getsize(path)
    
-   查看文件名列表 os.listdir(path)
    
-   检查路径有效性
    
    os.path.exists(path)检查path是否存在
    
    os.path.isfile(path)检查path正确且是一个文件
    
    os.path.isdir(path)检查path正确且是一个目录
    

#### 文件读写过程

-   用open函数打开文件
    
-   读取文件内容，如read()
    
-   写入文件
    
    testfile = open(filepath,’w’)
    
    testfile.write(‘hello word!\\n’)
    

#### 用shelve模块保存变量

-   需要再搜索，使用如字典
    
    ```python
    import shelve
    shelfFile = shelve.open('mydata')
    cats = ['a','b','c']
    shelfFile['cats'] = cats
    shelfFile.close()
    ```
    
    为变量保存到文件的最佳方式。
    

#### 用pprint.pformat()函数保存变量

-   理解：如列表变量中的内容，可以使用pprint.pformat()来存储其变量中的字符串内容，写到py文件中去
-   后续可使用import上面存储的py文件，来应用后面的值。

#### 实战项目：生成随机的测试试卷文件

假如你是一位地理老师，班上有 35 名学生，你希望进行美国各州首府的一个小测验。不妙的是，班里有几个坏蛋，你无法确信学生不会作弊。你希望随机调整问题的次序，这样每份试卷都是独一无二的，这让任何人都不能从其他人那里抄袭答案。当然，手工完成这件事又费时又无聊。好在，你懂一些 Python。  
下面是程序所做的事：  
• 创建 35 份不同的测验试卷。  
• 为每份试卷创建 9 个多重选择题，次序随机。  
• 为每个问题提供一个正确答案和 3 个随机的错误答案，次序随机。  
• 将测验试卷写到 35 个文本文件中。  
• 将答案写到 35 个文本文件中。  
这意味着代码需要做下面的事：  
• 将州和它们的首府保存在一个字典中。  
• 针对测验文本文件和答案文本文件，调用 open()、write()和 close()。  
• 利用 random.shuffle()随机调整问题和多重选项的次序。

实际写成脚本内容，实际生成9个问题来测试：

```python
#! python3
import random

# 将美国各州首府数据存储在一个字典中
capitals = {'Alabama': 'Montgomery', 'Alaska': 'Juneau', 'Arizona': 'Phoenix',
            'Arkansas': 'Little Rock', 'California': 'Sacramento', 'Colorado': 'Denver',
            'Connecticut': 'Hartford', 'Delaware': 'Dover', 'Florida': 'Tallahassee'}

for quizNum in range(35):

    # 创建试卷和答案文件
    quizFile = open('capitalsquiz%s.txt' % (quizNum + 1), 'w')
    answerKeyFile = open('capitalsquiz_answers%s.txt' % (quizNum + 1), 'w')

    # 写标题和开头
    quizFile.write('Name:\n\nDate:\n\nPeriod:\n\n')
    quizFile.write((' ' * 20) + 'State Capitals Quiz (Form %s)' % (quizNum + 1))
    quizFile.write('\n\n')

    # 打乱capital字典
    states = list(capitals.keys())
    random.shuffle(states)

    # 循环states，制造9个问题
    for questionNum in range(9):
        correctAnswer = capitals[states[questionNum]]
        wrongAnswers = list(capitals.values())
        del wrongAnswers[wrongAnswers.index(correctAnswer)]  # 删除列表中的正确答案
        # random.sample()函数使得这种选择很容易，它的第一个参数是你希望选择的列表，第二个参数是你希望选择的值的个数。
        wrongAnswers = random.sample(wrongAnswers, 3)
        answerOptions = wrongAnswers + [correctAnswer]
        random.shuffle(answerOptions)

        quizFile.write('%s. What is the caption of %s\n' % (questionNum + 1, states[questionNum]))
        for i in range(4):
            quizFile.write(' %s. %s\n' % ('ABCD'[i], answerOptions[i]))
        quizFile.write('\n')

        answerKeyFile.write('%s. %s\n' % (questionNum + 1, 'ABCD'[answerOptions.index(correctAnswer)]))
    quizFile.close()
    answerKeyFile.close()
```

结果类似如下，试卷文件：

```python
Name:

Date:

Period:

                    State Capitals Quiz (Form 1)

1. What is the caption of California
 A. Tallahassee
 B. Montgomery
 C. Hartford
 D. Sacramento

2. What is the caption of Arizona
 A. Montgomery
 B. Little Rock
 C. Dover
 D. Phoenix

3. What is the caption of Colorado
 A. Phoenix
 B. Dover
 C. Denver
 D. Little Rock

4. What is the caption of Florida
 A. Tallahassee
 B. Denver
 C. Phoenix
 D. Little Rock

5. What is the caption of Connecticut
 A. Sacramento
 B. Juneau
 C. Hartford
 D. Denver

6. What is the caption of Alabama
 A. Montgomery
 B. Denver
 C. Juneau
 D. Little Rock

7. What is the caption of Delaware
 A. Juneau
 B. Little Rock
 C. Dover
 D. Tallahassee

8. What is the caption of Arkansas
 A. Sacramento
 B. Little Rock
 C. Denver
 D. Montgomery

9. What is the caption of Alaska
 A. Juneau
 B. Tallahassee
 C. Sacramento
 D. Denver
```

答案文件：

```python
1. D
2. D
3. C
4. A
5. C
6. A
7. C
8. B
9. A
```
