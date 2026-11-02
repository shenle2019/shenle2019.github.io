---
title: 复盘 - Python自动生成试卷和答案
date: '2022-01-09T00:00:00+00:00'
permalink: 2022/01/09/复盘-Python自动生成试卷和答案/
categories:
  - 测试
tags:
  - python
---

#### 复盘 - 自动生成试卷和答案

首先知道这个问题要做啥，然后分解每一个步骤。  
每一个步骤，使用到的基础知识，具体细化出来。

关键点记录：

1.  大循环35次写试卷，然后写入试卷的标题内容，再小循环9次写题目，  
    一样的操作单独拎出来，即需要重复的，就用循环来写。import random即可
2.  文件名要根据变化参数i来一起变化，需要加入到用户名，就用字符串拼接；同时注意路径需要加r，不加r有转义问题。
3.  需要用到的字典，单独定义，过程中不要修改它
4.  创建文件和开始写入testfile = open(filepath,’w’)，file\_handle.write(‘hello word 你好 ‘)写入内容，  
    写完后记得关闭文件 exam\_file.close()
5.  打乱capitals的次序,shuffle()是不能直接访问的，需要导入 random 模块，然后通过 random 静态对象调用该方法。  
    random.shuffle (lst ),lst为列表，这里注意直接使用方法打乱次序即可，**shuffle不返回任何值**，所以不要用变量接收。
6.  字典.keys()，字典.values()分别获取键和值。如果不知道具体怎么获取值，直接打印出来看。
7.  list中随机取几个数random.sample(list, k)

```plaintext
# 假如你是一位地理老师，班上有 35 名学生，你希望进行美国各州首府的一个小测验。不妙的是，班里有几个坏蛋，你无法确信学生不会作弊。你希望随机调整问题的次序，这样每份试卷都是独一无二的，这让任何人都不能从其他人那里抄袭答案。当然，手工完成这件事又费时又无聊。好在，你懂一些 Python。
# 下面是程序所做的事：
# • 创建 35 份不同的测验试卷。
# • 为每份试卷创建 9 个多重选择题，次序随机。
# • 为每个问题提供一个正确答案和 3 个随机的错误答案，次序随机。
# • 将测验试卷写到 35 个文本文件中。
# • 将答案写到 35 个文本文件中。
# 这意味着代码需要做下面的事：
# • 将州和它们的首府保存在一个字典中。
# • 针对测验文本文件和答案文本文件，调用 open()、write()和 close()。
# • 利用 random.shuffle()随机调整问题和多重选项的次序。

# # 将美国各州首府数据存储在一个字典中
# capitals = {'Alabama': 'Montgomery', 'Alaska': 'Juneau', 'Arizona': 'Phoenix',
#             'Arkansas': 'Little Rock', 'California': 'Sacramento', 'Colorado': 'Denver',
#             'Connecticut': 'Hartford', 'Delaware': 'Dover', 'Florida': 'Tallahassee'}

#！ python3
import random

capitals = {'Alabama': 'Montgomery', 'Alaska': 'Juneau', 'Arizona': 'Phoenix',
            'Arkansas': 'Little Rock', 'California': 'Sacramento', 'Colorado': 'Denver',
            'Connecticut': 'Hartford', 'Delaware': 'Dover', 'Florida': 'Tallahassee'}

###循环35次
for i in range(35):
    ### 创建试卷和试卷对应的答案txt文件
    ### 这里的知识点是，创建文件和开始写入testfile = open(filepath,’w’)
    ### 问题，这里的路径怎么写？windows写绝对路径好了，如果是linux可以写/
    ### 不加r有转义问题。

    ### 还有个问题，文件名要根据i来变化
    exam_file_name = r'C:\Users\Administrator\PycharmProjects\testpython100\exam_file'+str(i+1)+'.txt'
    answer_file_name = r'C:\Users\Administrator\PycharmProjects\testpython100\answer_file'+str(i+1)+'.txt'
    exam_file = open(exam_file_name,'w')
    answer_file = open(answer_file_name,'w')

    ### 开始从试卷的标题、姓名、班级等内容写入,file_handle.write('hello word 你好 ')
    exam_file.write('exam for capitals\n')
    exam_file.write('enter your name:__________\n')
    exam_file.write('enter your class:__________\n')

    ### 打乱capitals的次序,shuffle()是不能直接访问的，需要导入 random 模块，然后通过 random 静态对象调用该方法。
    ### random.shuffle (lst ),lst为列表，这里注意直接使用方法打乱次序即可，shuffle不返回任何值。
    capitalkey  = list(capitals.keys())
    random.shuffle(capitalkey)

    ### 循环9次
    for j in range(9):
        ### 写入captitals的问题
        exam_file.write('what is the key of capital:' + capitalkey[j] + '?\n')

        ### 依次写入ABCD，其中一项是正确答案，其他是错误答案。
        correctanswer = capitals[capitalkey[j]]
        # print(correctanswer)
        # print(type(correctanswer))
        allanswer = list(capitals.values())
        # print(allanswer)
        # print(type(allanswer))
        allanswer.remove(str(correctanswer))
        otheranswers = allanswer
        # print(otheranswers)
        ### list中随机取几个数random.sample(list, k)
        # print(random.sample(otheranswers, 3))
        optionanswers = random.sample(otheranswers,3)
        optionanswers.append(correctanswer)
        # print(optionanswers)
        random.shuffle(optionanswers)
        for m in range(4):
              exam_file.write('ABCD'[m] + ':' + optionanswers[m] + '\n')

        ### 写入答案内容
        # print(optionanswers.index(correctanswer))
        numindex = optionanswers.index(correctanswer)
        answer_file.write('correct answer:' + ['A','B','C','D'][numindex] + '\n')

    exam_file.close()
    answer_file.close()
```
