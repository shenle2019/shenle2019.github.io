---
title: Python组织文件
date: '2021-12-27T00:00:00+00:00'
permalink: 2021/12/27/Python组织文件/
categories:
  - 测试
tags:
  - python
---

### Python组织文件

#### shutil模块

-   复制文件和文件夹
    
    shutil.copy(source,destination)，这里source处是文件名
    
    -   如果destination是文件夹，则在文件夹下复制粘贴过去
    -   如果destination是文件名，则以最新文件名将内容复制过去
    
    shutil.coptytree(source,destination),这里source处为文件夹，会将整个目录copy一份过去
    
-   文件和文件夹的移动和改名
    
    shutil.move(source,destination)，将
    
    -   source处的文件夹移动到目的地，并返回新位置的绝对路径
        
    -   如果destination是文件夹，source是文件名，则将文件直接剪切过去，文件名不变。
        
    -   如果destination本来想作为目录但没有识别到，但是最后一层目录前的路径可以识别，source是文件名，则将文件重新命名为destination的文件名。
        
    -   如果destination中最后一层目录前的目录没有识别到，则文件夹不存在，会有报错，需要捕获异常。
        
-   永久删除文件和文件夹
    
    -   os.unlink(path)将删除path处的文件
    -   调用os.rmdir(path)将删除path处的文件夹，文件夹必须为空，才能删除
    -   调用shutil.rmtree(path)将删除path处的文件夹，不需要文件夹为空。
-   使用send2trash模块安全地删除
    
    -   send2trash.send2trash()函数可以删除至回收站，可恢复。需要安装send2trash模块。

#### 遍历目录树

-   os.walk()函数
    
    常用方法， for folderName,subfolders,filenames in os.walk(path)：
    
    os.walk()在循环的每次迭代中，返回3个值。
    
    -   当前文件夹名称的字符串
    -   当前文件夹中子文件夹的字符串列表
    -   当前文件夹中文件的字符串列表

#### 用zipfile模块压缩文件

-   读取zipfile，
    
    exampleZip = zipfile.Zipfile(‘example.zip’)
    
    可以用exampleZip.namelist()函数
    
    另外还有getinfo,file\_size,compress\_size等内容。
    
-   解压缩
    
    exampleZip.extractall()
    
    可以使用extract(文件名)解压缩单个文件
    
-   创建和添加到zip文件
    
    ```python
    import zipfile
    newZip = zipfile.Zipfile('new.zip','w')
    newZip.write('spam.txt',compress_type=zipfile.ZIP_DEFLATED)
    newZip.close()
    ```
    

#### 将一个文件夹备份到一个 ZIP 文件

假定你正在做一个项目，它的文件保存在C:\\AlsPythonBook 文件夹中。你担心工作会丢失，所以希望为整个文件夹创建一个ZIP 文件，作为“快照”。你希望保存不同的版本，希望 ZIP 文件的文件名每次创建时都有所变化。例如 AlsPythonBook\_1.zip、AlsPythonBook\_2.zip、AlsPythonBook\_3.zip，等等。你可以手工完成，但这有点烦人，而且可能不小心弄错ZIP 文件的编号。运行一个程序来完成这个烦人的任务会简单得多。针对这个项目，打开一个新的文件编辑器窗口，将它保存为 backupToZip.py。

代码如下：

```python
#! python3
# backupToZip.py - Copies an entire folder and its contents into
# a ZIP file whose filename increments.

import zipfile, os


def backupToZip(folder):
    # Backup the entire contents of "folder" into a ZIP file.

    folder = os.path.abspath(folder)  # make sure folder is absolute

    # Figure out the filename this code should use based on
    # what files already exist.
    number = 1
    while True:
        zipFilename = os.path.basename(folder) + '_' + str(number) + '.zip'
        if not os.path.exists(zipFilename):
            break
        number = number + 1

    # Create the ZIP file.
    print('Creating %s...' % (zipFilename))
    backupZip = zipfile.ZipFile(zipFilename, 'w')

    # Walk the entire folder tree and compress the files in each folder.
    for foldername, subfolders, filenames in os.walk(folder):
        print('Adding files in %s...' % (foldername))
        # Add the current folder to the ZIP file.
        backupZip.write(foldername)

        # Add all the files in this folder to the ZIP file.这里注意缩进为for循环中的循环
        for filename in filenames:
            if filename.startswith(os.path.basename(folder) + '_') and filename.endswith('.zip'):
                continue  # don't backup the backup ZIP files
            backupZip.write(os.path.join(foldername, filename))
    backupZip.close()
    print('Done.')

backupToZip('D:\\testfiles\\测试文档合集1.0')
```

调试结果如下：

```python
D:\pythontest\autowork\venv\Scripts\python.exe D:/pythontest/autowork/venv/backuptoZip.py
Creating 测试文档合集1.0_2.zip...
Adding files in D:\testfiles\测试文档合集1.0...
Adding files in D:\testfiles\测试文档合集1.0\1.面试资料整理...
Adding files in D:\testfiles\测试文档合集1.0\2.功能测试...
Adding files in D:\testfiles\测试文档合集1.0\3.性能测试...
Adding files in D:\testfiles\测试文档合集1.0\4.自动化测试...
Adding files in D:\testfiles\测试文档合集1.0\5.测试相关...
Adding files in D:\testfiles\测试文档合集1.0\5.测试相关\Docker容器管理与Jenkins持续集成...
Adding files in D:\testfiles\测试文档合集1.0\6.编程语言...
Adding files in D:\testfiles\测试文档合集1.0\6.编程语言\python书籍...
Done.

Process finished with exit code 0
```

生成的文件名为：

测试文档合集1.0\_1.zip

测试文档合集1.0\_2.zip

…
