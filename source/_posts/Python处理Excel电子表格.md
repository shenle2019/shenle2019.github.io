---
title: Python处理Excel电子表格
date: '2022-01-11T00:00:00+00:00'
permalink: 2022/01/11/Python处理Excel电子表格/
categories:
  - 测试
tags:
  - python
---

### Python处理Excel电子表格

#### Excel文档的几个概念

-   一个Excel电子表格文档，一般称为一个工作簿
-   工作簿中可以包含多个sheet页，为工作表
-   工作表中列从A开始，行从1开始，行和列相交的部分，为单元格。
-   单元格中存储的内容，为value值。

1．导入 openpyxl 模块。

2．调用 openpyxl.load\_workbook()函数。

3．取得 Workbook 对象。

4．调用 get\_active\_sheet()或 get\_sheet\_by\_name()工作簿方法。

5．取得 Worksheet 对象。

6．使用索引或工作表的 cell()方法，带上 row 和 column 关键字参数。

7．取得 Cell 对象。

8．读取 Cell 对象的 value 属性。

#### 安装openpyxl模块

import openpyxl

如果有报错，没有对应模块，则使用命令导入**pip install openpyxl**

#### 读取Excel文档

从[http://nostarch.com/automatestuff/下载书中所有例子文档，在Automate\_the\_Boring\_Stuff\_2e\_onlinematerials.zip文档中](http://nostarch.com/automatestuff/%E4%B8%8B%E8%BD%BD%E4%B9%A6%E4%B8%AD%E6%89%80%E6%9C%89%E4%BE%8B%E5%AD%90%E6%96%87%E6%A1%A3%EF%BC%8C%E5%9C%A8Automate_the_Boring_Stuff_2e_onlinematerials.zip%E6%96%87%E6%A1%A3%E4%B8%AD)

获取example.xlsx文件。

-   用openpyxl模块打开Excel文档
    
    ```python
    import openpyxl

    wb = openpyxl.load_workbook('example.xlsx')
    print(type(wb))
    ```
    
    输出：
    
    <class ‘openpyxl.workbook.workbook.Workbook’>
    
-   从工作簿中取得工作表
    
    ```python
    import openpyxl

    wb = openpyxl.load_workbook('example.xlsx')
    # print(type(wb))
    print('1.' + str(wb.get_sheet_names()))
    print('2.' + str(wb.sheetnames))
    #print('x.' + str())
    sheet = wb.get_sheet_by_name('Sheet3')
    print('3.' + str(sheet))
    print('4.' + str(type(sheet)))
    print('5.' + str(sheet.title))

    # 'Workbook' object has no attribute 'get_active_sheet',有报错，无此属性
    # anotherSheet = wb.get_active_sheet()
    # print('6.' + str(anotherSheet))
    ```
    
    输出：
    
    1.\[‘Sheet1’, ‘Sheet2’, ‘Sheet3’\]  
    2.\[‘Sheet1’, ‘Sheet2’, ‘Sheet3’\]  
    3.<Worksheet “Sheet3”>  
    4.<class ‘openpyxl.worksheet.worksheet.Worksheet’>  
    5.Sheet3
    
-   从表中取得单元格
    
    ```python
    import openpyxl
    wb = openpyxl.load_workbook('example.xlsx')
    sheet = wb.get_sheet_by_name('Sheet1')
    print('1.' + str(sheet['A1']))
    print('2.' + str(sheet['A1'].value))
    c = sheet['B1']
    print('3.' + str(c.value))
    print('4.' + 'Row ' + str(c.row) + ', Column ' + str(c.column) + ' is ' + str(c.value))
    ###B1是单元格，coordinate属性提供位置信息
    print('5.' + 'Cell ' + c.coordinate + ' is ' + c.value)
    print('6.' + str(sheet['C1'].value))

    ###另一种实现方法，直接通过给ceil传递行和列的值
    print('7.' + str(sheet.cell(row=1, column=2)))
    print('8.' + str(sheet.cell(row=1, column=2).value))

    for i in range(1, 8, 2):
        print('9.',i, sheet.cell(row=i, column=2).value)

    ##无此属性'Worksheet' object has no attribute 'get_highest_column'
    # print('10.' + str(sheet.get_highest_row()))
    # print('11.' + str(sheet.get_highest_column()))

    ###输出：
    1.<Cell 'Sheet1'.A1>
    2.2015-04-05 13:34:02
    3.Apples
    4.Row 1, Column 2 is Apples
    5.Cell B1 is Apples
    6.73
    7.<Cell 'Sheet1'.B1>
    8.Apples
    9. 1 Apples
    10. 3 Pears
    11. 5 Apples
    12. 7 Strawberries
    ```
    
-   从表中获取行和列
    
    ```python
    import openpyxl
    wb = openpyxl.load_workbook('example.xlsx')
    sheet = wb.get_sheet_by_name('Sheet1')
    print('1.' + str(tuple(sheet['A1':'C3'])))

    for rowOfCellObjects in sheet['A1':'C3']:
        for cellObj in rowOfCellObjects:
    	    print(cellObj.coordinate, cellObj.value)
        print('--- END OF ROW ---')
            
    ###输出：
    1.((<Cell 'Sheet1'.A1>, <Cell 'Sheet1'.B1>, <Cell 'Sheet1'.C1>), (<Cell 'Sheet1'.A2>, <Cell 'Sheet1'.B2>, <Cell 'Sheet1'.C2>), (<Cell 'Sheet1'.A3>, <Cell 'Sheet1'.B3>, <Cell 'Sheet1'.C3>))
    A1 2015-04-05 13:34:02
    B1 Apples
    C1 73
    --- END OF ROW ---
    A2 2015-04-05 03:41:23
    B2 Cherries
    C2 85
    --- END OF ROW ---
    A3 2015-04-06 12:46:51
    B3 Pears
    C3 14
    --- END OF ROW ---
    ```
    
-   项目实战：从电子表格中读取数据
    
    假定你有一张电子表格的数据，来自于 2010 年美国人口普查。你有一个无聊的任
    
    务，要遍历表中的几千行，计算总的人口，以及每个县的普查区的数目（普查区就是一
    
    个地理区域，是为人口普查而定义的）。每行表示一个人口普查区。我们将这个电子表格
    
    文件命名为 censuspopdata.xlsx，可以从 [http://nostarch.com/automatestuff/下载它。](http://nostarch.com/automatestuff/%E4%B8%8B%E8%BD%BD%E5%AE%83%E3%80%82)
    
    尽管 Excel 是要能够计算多个选中单元格的和，你仍然需要选中 3000 个以上县
    
    的单元格。即使手工计算一个县的人口只需要几秒钟，整张电子表格也需要几个小
    
    时时间。
    
    在这个项目中，你要编写一个脚本，从人口普查电子表格文件中读取数据，并
    
    在几秒钟内计算出每个县的统计值。
    
    下面是程序要做的事：
    
    • 从 Excel 电子表格中读取数据。
    
    • 计算每个县中普查区的数目。
    
    • 计算每个县的总人口。
    
    • 打印结果。
    
    这意味着代码需要完成下列任务：
    
    • 用 openpyxl 模块打开 Excel 文档并读取单元格。
    
    • 计算所有普查区和人口数据，将它保存到一个数据结构中。
    
    • 利用 pprint 模块，将该数据结构写入一个扩展名为.py 的文本文件。
    
    ```python
    #! python3
    # readCensusExcel.py - Tabulates population and number of census tracts for
    # each county.

    import openpyxl, pprint
    print('Opening workbook...')
    wb = openpyxl.load_workbook('censuspopdata.xlsx')
    sheet = wb.get_sheet_by_name('Population by Census Tract')
    countyData = {}
    # Fill in countyData with each county's population and tracts.
    print('Reading rows...')
    rownummax = sheet.max_row + 1
    print(rownummax)
    for row in range(2,rownummax):
        # Each row in the spreadsheet has data for one census tract.
        state  = sheet['B' + str(row)].value
        county = sheet['C' + str(row)].value
        pop    = sheet['D' + str(row)].value

        # Make sure the key for this state exists.
        countyData.setdefault(state, {})
        # Make sure the key for this county in this state exists.
        countyData[state].setdefault(county, {'tracts': 0, 'pop': 0})

        # Each row represents one census tract, so increment by one.
        countyData[state][county]['tracts'] += 1
        # Increase the county pop by the pop in this census tract.
        countyData[state][county]['pop'] += int(pop)

    # Open a new text file and write the contents of countyData to it.
    print('Writing results...')
    resultFile = open('census2020.py', 'w')
    resultFile.write('allData = ' + pprint.pformat(countyData))
    resultFile.close()
    print('Done.')

    ###使用方法：
    >>> import os
    >>> os.chdir('C:\\Python34')
    >>> import census2020
    >>> census2020.allData['AK']['Anchorage']
    {'pop': 291826, 'tracts': 55}
    >>> anchoragePop = census2020.allData['AK']['Anchorage']['pop']
    >>> print('The 2010 population of Anchorage was ' + str(anchoragePop))
    The 2010 population of Anchorage was 291826
    ```
    
    #### 写入Excel文档
    
    -   创建并保存Excel对象
        
        ```python
        import openpyxl
        wb = openpyxl.Workbook()
        print('1.' + str(wb.sheetnames))
        sheet = wb.active
        print('2.' + str(sheet.title))
        sheet.title = 'Spam Bacon Eggs Sheet'
        print('3.' + str(wb.sheetnames))
        ```
        
    -   创建和删除工作表
        
        ```python
        import openpyxl
        wb = openpyxl.Workbook()
        print('1.' + str(wb.sheetnames))

        wb.create_sheet()
        print('2.' + str(wb.sheetnames))

        wb.create_sheet(index=0, title='First Sheet')
        print('3.' + str(wb.sheetnames))

        wb.create_sheet(index=2, title='Middle Sheet')
        print('4.' + str(wb.sheetnames))

        # wb.remove_sheet(wb.get_sheet_by_name('Middle Sheet'))
        # wb.remove_sheet(wb.get_sheet_by_name('Sheet1'))
        del wb['Middle Sheet']
        del wb['Sheet1']
        print('5.' + str(wb.sheetnames))

        ####结果：
        1.['Sheet']
        2.['Sheet', 'Sheet1']
        3.['First Sheet', 'Sheet', 'Sheet1']
        4.['First Sheet', 'Sheet', 'Middle Sheet', 'Sheet1']
        5.['First Sheet', 'Sheet']
        ```
        
    -   将值写入单元格
        
        ```python
        import openpyxl
        wb = openpyxl.Workbook()
        sheet = wb['Sheet']
        sheet['A1'] = 'Hello world!'
        print('1.' + str(sheet['A1'].value))
        ```
        
-   项目实战
    

这个项目需要编写一个程序，更新产品销售电子表格中的单元格。程序将遍历这个电子表格，找到特定类型的产品，并更新它们的价格。每一行代表一次单独的销售。列分别是销售产品的类型（A）、产品每磅的价格（B）、销售的磅数（C），以及这次销售的总收入。TOTAL 列设置为 Excel 公式，将每磅的成本乘以销售的磅数，并将结果取整到分。有了这个公式，如果列 B 或 C 发 生变化，TOTAL 列中的单元格将自动更新。

现在假设 Garlic、Celery 和 Lemons 的价格输入的不正确。这让你面对一项无聊的任务：遍历这个电子表格中的几千行，更新所有 garlic、celery 和 lemon 行中每磅的价格。你不能简单地对价格查找替换，因为可能有其他的产品价格一样，你不希望错误地“更正”。对于几千行数据，手工操作可能要几小时。但你可以编写程序，几秒钟内完成这个任务。

你的程序做下面的事情：

• 循环遍历所有行。

• 如果该行是 Garlic、Celery 或 Lemons，更新价格。

这意味着代码需要做下面的事情：

• 打开电子表格文件。

• 针对每一行，检查列 A 的值是不是 Celery、Garlic 或 Lemon。

• 如果是，更新列 B 中的价格。

• 将该电子表格保存为一个新文件（这样就不会丢失原来的电子表格，以防万一）

```python
#! python3
# updateProduce.py - Corrects costs in produce sales spreadsheet.
import openpyxl
wb = openpyxl.load_workbook('produceSales.xlsx')
sheet = wb['Sheet']

# The produce types and their updated prices
###注意，这里用字典比用if else判断比较好，因为后续只需要修改字典值即可，不用修改代码，解耦合
PRICE_UPDATES = {'Garlic': 3.08,
'Celery': 1.29,
'Lemon': 1.37}
# Loop through the rows and update the prices.
for rowNum in range(2, sheet.max_row + 1): # skip the first row
    produceName = sheet.cell(row=rowNum, column=1).value
    if produceName in PRICE_UPDATES:
        sheet.cell(row=rowNum, column=2).value = PRICE_UPDATES[produceName]
wb.save('updatedProduceSales.xlsx')
```

#### 设置单元格的字体风格

from openpyxl.styles import Font, Style

```python
>>> import openpyxl
>>> from openpyxl.styles import Font, Style
>>> wb = openpyxl.Workbook()
>>> sheet = wb.get_sheet_by_name('Sheet')
 >>> italic24Font = Font(size=24, italic=True)
 >>> styleObj = Style(font=italic24Font)
 >>> sheet['A'].style/styleObj
>>> sheet['A1'] = 'Hello world!'
>>> wb.save('styled.xlsx')
```

#### Font对象

Font style 属性的关键字参数

关键字参数

数据类型

描述

name

字符串

字体名称，诸如’Calibri’

或’Times New Roman’

size

整型

大小点数

bold

布尔型

True 表示粗体

italic

布尔型

True 表示斜体

可以调用 Font()来创建一个 Font 对象，并将这个 Font 对象保存在一个变量中。

然后将它传递给 Style()，得到 的 Style 对象保存在一个变量中，并将该变量赋给 Cell

对象的 style 属性。

```python
>>> import openpyxl
>>> from openpyxl.styles import Font, Style
>>> wb = openpyxl.Workbook()
>>> sheet = wb.get_sheet_by_name('Sheet')
>>> fontObj1 = Font(name='Times New Roman', bold=True)
>>> styleObj1 = Style(font=fontObj1)
>>> sheet['A1'].style/styleObj
>>> sheet['A1'] = 'Bold Times New Roman'
>>> fontObj2 = Font(size=24, italic=True)
>>> styleObj2 = Style(font=fontObj2)
>>> sheet['B3'].style/styleObj
>>> sheet['B3'] = '24 pt Italic'
>>> wb.save('styles.xlsx')
```

#### 公式

```python
>>> import openpyxl
>>> wb = openpyxl.Workbook()
>>> sheet = wb.get_active_sheet()
>>> sheet['A1'] = 200
>>> sheet['A2'] = 300
>>> sheet['A3'] = '=SUM(A1:A2)'
>>> wb.save('writeFormula.xlsx')

>>> import openpyxl
>>> wbFormulas = openpyxl.load_workbook('writeFormula.xlsx')
>>> sheet = wbFormulas.get_active_sheet()
>>> sheet['A3'].value
'=SUM(A1:A2)'
###如果你希望看到该公式的计算结果，而不是原来的公式，就必须将 load_workbook()的 data_only 关键字参数设置为 True。
>>> wbDataOnly = openpyxl.load_workbook('writeFormula.xlsx', data_only=True)
>>> sheet = wbDataOnly.get_active_sheet()
>>> sheet['A3'].value
500
```

#### 调整行与列

-   设置行高与列宽
    
    ```python
    >>> import openpyxl
    >>> wb = openpyxl.Workbook()
    >>> sheet = wb.get_active_sheet()
    >>> sheet['A1'] = 'Tall row'
    >>> sheet['B2'] = 'Wide column'
    >>> sheet.row_dimensions[1].height = 70
    >>> sheet.column_dimensions['B'].width = 20
    >>> wb.save('dimensions.xlsx')
    ```
    
-   合并和拆分单元格
    
    ```python
    >>> import openpyxl
    >>> wb = openpyxl.Workbook()
    >>> sheet = wb.get_active_sheet()
    >>> sheet.merge_cells('A1:D3')
    >>> sheet['A1'] = 'Twelve cells merged together.'
    >>> sheet.merge_cells('C5:D5')
    >>> sheet['C5'] = 'Two merged cells.'
    >>> wb.save('merged.xlsx')

    >>> import openpyxl
    >>> wb = openpyxl.load_workbook('merged.xlsx')
    >>> sheet = wb.get_active_sheet()
    >>> sheet.unmerge_cells('A1:D3')
    >>> sheet.unmerge_cells('C5:D5')
    >>> wb.save('merged.xlsx')
    ```
    
-   冻结窗口
    
    ```python
    freeze_panes 的设置 冻结的行和列
    sheet.freeze_panes = 'A2' 行 1
    sheet.freeze_panes = 'B1' 列 A
    sheet.freeze_panes = 'C1' 列 A 和列 B
    sheet.freeze_panes = 'C2' 行 1 和列 A 和列 B
    sheet.freeze_panes = 'A1'或
    sheet.freeze_panes = None


    >>> import openpyxl
    >>> wb = openpyxl.load_workbook('produceSales.xlsx')
    >>> sheet = wb.get_active_sheet()
    >>> sheet.freeze_panes = 'A2'
    >>> wb.save('freezeExample.xlsx')
    ```
    
-   图标
    
    openpyxl 支持利用工作表中单元格的数据，创建条形图、折线图、散点图和饼
    
    图。要创建图表，需要做下列事情：
    
    1．从一个矩形区域选择的单元格，创建一个 Reference 对象。
    
    2．通过传入 Reference 对象，创建一个 Series 对象。
    
    3．创建一个 Chart 对象。
    
    4．将 Series 对象添加到 Chart 对象。
    
    5．可选地设置Chart 对象的drawing.top、drawing.left、drawing.width 和drawing.height
    
    变量。
    
    6．将 Chart 对象添加到 Worksheet 对象。
    
    Reference 对象需要一些解释。Reference 对象是通过调用 openpyxl.charts. Reference()
    
    函数并传入 3 个参数创建的：
    
    1．包含图表数据的 Worksheet 对象。
    
    2．两个整数的元组，代表矩形选择区域的左上角单元格，该区域包含图表数
    
    据：元组中第一个整数是行，第二个整数是列。请注意第一行是 1，不是 0。
    
    3．两个整数的元组，代表矩形选择区域的右下角单元格，该区域包含图表数
    
    据：元组中第一个整数是行，第二个整数是列。
    
    ```python
    >>> import openpyxl
    >>> wb = openpyxl.Workbook()
    >>> sheet = wb.get_active_sheet()
    >>> for i in range(1, 11): # create some data in column A
    sheet['A' + str(i)] = i
    >>> refObj = openpyxl.charts.Reference(sheet, (1, 1), (10, 1))
    >>> seriesObj = openpyxl.charts.Series(refObj, title='First series')
    >>> chartObj = openpyxl.charts.BarChart()
    >>> chartObj.append(seriesObj)
    >>> chartObj.drawing.top = 50 # set the position
    >>> chartObj.drawing.left = 100
    >>> chartObj.drawing.width = 300 # set the size
    >>> chartObj.drawing.height = 200
    >>> sheet.add_chart(chartObj)
    >>> wb.save('sampleChart.xlsx')
    ```
