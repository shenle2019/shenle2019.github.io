---
title: 处理PDF和Word文档
date: '2022-01-18T00:00:00+00:00'
permalink: 2022/01/18/处理PDF和Word文档/
categories:
  - 测试
tags:
  - python
---

### 处理PDF和Word文档

安装模块pip install PyPDF2

#### PDF文档的相关操作

-   从 PDF 提取文本
    
    ```python
    >>> import PyPDF2
    >>> pdfFileObj = open('meetingminutes.pdf', 'rb')
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    FileNotFoundError: [Errno 2] No such file or directory: 'meetingminutes.pdf'
    >>> pdfFileObj = open('meetingminutes.pdf', 'rb')
    >>>  pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
      File "<stdin>", line 1
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    IndentationError: unexpected indent
    >>> pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
    >>> pdfReader.numPages
    19
    >>> pageObj = pdfReader.getPage(0)
    >>> pageObj.extractText()
    'OOFFFFIICCIIAALL  BBOOAARRDD  MMIINNUUTTEESS   Meeting of \nMarch 7\n, 2014\n        \n     The Board of Elementary and Secondary Education shall provide leadership and \ncreate policies for education that expand opportunities for chi
    ldren, empower \nfamilies and communities, and advance Louisiana in an increasingly \ncompetitive glob\nal market.\n BOARD \n of ELEMENTARY\n and \n SECONDARY\n EDUCATION\n  '
    ```
    
-   解密PDF,比如已经用口令rosebud加密了，则使用对应口令解密即可。
    
    ```python
    >>> import PyPDF2
    >>> pdfReader = PyPDF2.PdfFileReader(open('encrypted.pdf', 'rb'))
     >>> pdfReader.isEncrypted
    True
    >>> pdfReader.getPage(0)
     Traceback (most recent call last):
    File "<pyshell#173>", line 1, in <module>
    pdfReader.getPage()
    --snip--
    File "C:\Python34\lib\site-packages\PyPDF2\pdf.py", line 1173, in getObject
    raise utils.PdfReadError("file has not been decrypted")
    PyPDF2.utils.PdfReadError: file has not been decrypted
     >>> pdfReader.decrypt('rosebud')
    1
    >>> pageObj = pdfReader.getPage(0)
    ```
    
-   创建PDF
    
    1．打开一个或多个已有的 PDF（源 PDF），得到 PdfFileReader 对象。
    
    2．创建一个新的 PdfFileWriter 对象。
    
    3．将页面从 PdfFileReader 对象拷贝到 PdfFileWriter 对象中。
    
    4．最后，利用 PdfFileWriter 对象写入输出的 PDF。
    
-   拷贝页面
    
    ```python
    >>> import PyPDF2
    >>> pdf1File = open('meetingminutes.pdf', 'rb')
    >>> pdf2File = open('meetingminutes2.pdf', 'rb')
    >>> pdf1Reader = PyPDF2.PdfFileReader(pdf1File)
    >>> pdf2Reader = PyPDF2.PdfFileReader(pdf2File)
    >>> pdfWriter = PyPDF2.PdfFileWriter()
    >>> for pageNum in range(pdf1Reader.numPages):
    		pageObj = pdf1Reader.getPage(pageNum)
    		pdfWriter.addPage(pageObj)
    >>> for pageNum in range(pdf2Reader.numPages):
    		pageObj = pdf2Reader.getPage(pageNum)
    		pdfWriter.addPage(pageObj)
    >>> pdfOutputFile = open('combinedminutes.pdf', 'wb')
    >>> pdfWriter.write(pdfOutputFile)
    >>> pdfOutputFile.close()
    >>> pdf1File.close()
    >>> pdf2File.close()
    ```
    
-   旋转页面
    
    利用 rotateClockwise()和 rotateCounterClockwise()方法，PDF 文档的页面也可以
    
    旋转 90 度的整数倍。向这些方法传入整数 90、180 或 270 就可以了。
    
    ```python
    >>> import PyPDF2
    >>> minutesFile = open('meetingminutes.pdf', 'rb')
    >>> pdfReader = PyPDF2.PdfFileReader(minutesFile)
    >>> page = pdfReader.getPage(0)
    >>> page.rotateClockwise(90)
    {'/Contents': [IndirectObject(961, 0), IndirectObject(962, 0),
    --snip--
    }
    >>> pdfWriter = PyPDF2.PdfFileWriter()
    >>> pdfWriter.addPage(page)
    >>> resultPdfFile = open('rotatedPage.pdf', 'wb')
    >>> pdfWriter.write(resultPdfFile)
    >>> resultPdfFile.close()
    >>> minutesFile.close()
    ```
    
-   叠加页面，使用mergePage()方法添加水印。使用addPage方法往后添加PDF页面
    
    ```python
    >>> import PyPDF2
    >>> minutesFile = open('meetingminutes.pdf', 'rb')
    >>> pdfReader = PyPDF2.PdfFileReader(minutesFile)
    >>> minutesFirstPage = pdfReader.getPage(0)
    >>> pdfWatermarkReader = PyPDF2.PdfFileReader(open('watermark.pdf', 'rb'))
    >>> minutesFirstPage.mergePage(pdfWatermarkReader.getPage(0))
    >>> pdfWriter = PyPDF2.PdfFileWriter()
    >>> pdfWriter.addPage(minutesFirstPage)
    >>> for pageNum in range(1, pdfReader.numPages):
    		pageObj = pdfReader.getPage(pageNum)
    		pdfWriter.addPage(pageObj)
    >>> resultPdfFile = open('watermarkedCover.pdf', 'wb')
    >>> pdfWriter.write(resultPdfFile)
    >>> minutesFile.close()
    >>> resultPdfFile.close()
    ```
    
-   加密PDF文件,加密时同样使用加密口令
    
    ```python
    >>> import PyPDF2
    >>> pdfFile = open('meetingminutes.pdf', 'rb')
    >>> pdfReader = PyPDF2.PdfFileReader(pdfFile)
    >>> pdfWriter = PyPDF2.PdfFileWriter()
    >>> for pageNum in range(pdfReader.numPages):
    		pdfWriter.addPage(pdfReader.getPage(pageNum))
    >>> pdfWriter.encrypt('swordfish')
    >>> resultPdf = open('encryptedminutes.pdf', 'wb')
    >>> pdfWriter.write(resultPdf)
    >>> resultPdf.close()
    ```
    
    #### 项目：从多个PDF中合并选择的页面
    
    假定你有一个很无聊的任务，需要将几十个 PDF 文件合并成一个 PDF 文件。每一个文件都有一个封面作为第一页，但你不希望合并后的文件中重复出现这些封面。即使有许多免费的程序可以合并 PDF，很多也只是简单的将文件合并在一起。让我们来写一个 Python 程序，定制需要合并到 PDF 中的页面。
    
    总的来说，该程序需要完成：
    
     找到当前工作目录中所有 PDF 文件。
    
     按文件名排序，这样就能有序地添加这些 PDF。
    
     除了第一页之外，将每个 PDF 的所有页面写入输出的文件。
    
    从实现的角度来看，代码需要完成下列任务：
    
     调用 os.listdir()，找到当前工作目录中的所有文件，去除掉非 PDF 文件。
    
     调用 Python 的 sort()列表方法，对文件名按字母排序。
    
     为输出的 PDF 文件创建 PdfFileWriter 对象。
    
     循环遍历每个 PDF 文件，为它创建 PdfFileReader 对象。
    
     针对每个 PDF 文件，循环遍历每一页，第一页除外。
    
     将页面添加到输出的 PDF。
    
     将输出的 PDF 写入一个文件，名为 *allminutes.pdf*。
    
    针对这个项目，打开一个新的文件编辑器窗口，将它保存为 combinePdfs.py。
    
    ```python
    #! python3
    # combinePdfs.py - Combines all the PDFs in the current working directory into
    # a single PDF.

    import PyPDF2, os

    # Get all the PDF filenames.
    file_names = []
    for filename in os.listdir(r"D:\pythontest\autowork\venv"):
        # 获取filename的后缀，使用的是endswith
        if filename.endswith('.pdf'):
            file_names.append(filename)

    # 获取到的文件名，按照字典顺序排序
    file_names.sort(key=str.lower)

    # 创建PdfFileWriter对象,这里方法名后有括号
    pdfWriter = PyPDF2.PdfFileWriter()

    # 循环pdf对象，获取reader对象
    for filename in file_names:
        pdfFileObj = open(filename, 'rb')
        pdfReader =  PyPDF2.PdfFileReader(pdfFileObj)
        #在pdfWriter中添加打开的pdf内容，从第二页开始
        for pageNum in range(1, pdfReader.numPages):
            pageObj = pdfReader.getPage(pageNum)
            pdfWriter.addPage(pageObj)

    # 保存结果，关闭文件
    pdfOutput = open('allminutestest.pdf', 'wb')
    pdfWriter.write(pdfOutput)
    pdfOutput.close()
    ```
    

#### Word文档

在最高一层，Document 对象表示整个文档。Document 对象包含一个 Paragraph 对象的列表，表示文档中的段落（用户在 Word 文档中输入时，如

果按下回车，新的段落就开始了）。每个 Paragraph 对象都包含一个 Run 对象的列表。————Word文档组织方式

**pip install python-docx**

-   读取 Word 文档
    
    ```python
    >>> import docx
    >>> doc = docx.Document('demo.docx')
    >>> len(doc.paragraphs)
    7 
    >>> doc.paragraphs[0].text
    'Document Title'
    >>> doc.paragraphs[1].text
    'A plain paragraph with some bold and some italic'
    >>> len(doc.paragraphs[1].runs)
    4
    >>> doc.paragraphs[1].runs[0].text
    'A plain paragraph with some '
    >>> doc.paragraphs[1].runs[1].text
    'bold'
    >>> doc.paragraphs[1].runs[2].text
    ' and some '
    >>> doc.paragraphs[1].runs[3].text
    'italic'
    ```
    
-   从.docx 文件中取得完整的文本
    
    ```python
    #! python3
    ### readDocx.py：
    import docx
    def getText(filename):
    doc = docx.Document(filename)
    fullText = []
    for para in doc.paragraphs:
    fullText.append(para.text)
    return '\n'.join(fullText)
    ```
    
    ```python
    >>> import readDocx
    >>> print(readDocx.getText('demo.docx'))
    Document Title
    A plain paragraph with some bold and some italic
    Heading, level 1
    Intense quote
    first item in unordered list
    first item in ordered list
    ```
    
    注意添加缩进：
    
    fullText.append(**‘ ‘ +** para.text)
    
    添加空行：
    
    return ‘\\n**\\n**‘.join(fullText)
    
-   设置 Paragraph 和 Run 对象的样式
    
    对于 Word 文档，有 3 种类型的样式：段落样式可以应用于 Paragraph 对象，字
    
    符样式可以应用于 Run 对象，链接的样式可以应用于这两种对象。可以将 Paragraph 和
    
    Run 对象的 style 属性设置为一个字符串，从而设置样式。这个字符串应该是一种样
    
    式的名称。如果 style 被设置为 None，就没有样式与 Paragraph 或 Run 对象关联。
    
-   创建带有非默认样式的 Word 文档
    
    打开“Creat New Style from Formatting”对话框，在这里可以输入新样式。
    
    然后，回到交互式环境，用 docx.Document()打开这个空白 Word 文档，利用它作为
    
    Word 文档的基础。这种样式的名称现在就可以被 python-docx 使用了。
    
-   Run 属性
    
    bold
    
    文本以粗体出现
    
    italic
    
    文本以斜体出现
    
    underline
    
    文本带下划线
    
    strike
    
    文本带删除线
    
    double\_strike
    
    文本带双删除线
    
    all\_caps
    
    文本以大写首字母出现
    
    small\_caps
    
    文本以大写首字母出现，小写字母小两个点
    
    shadow
    
    文本带阴影
    
    outline
    
    文本以轮廓线出现，而不是实心
    
    rtl
    
    文本从右至左书写
    
    imprint
    
    文本以刻入页面的方式出现
    
    emboss
    
    文本以凸出页面的方式出现
    
    ```python
    >>> doc = docx.Document('demo.docx')
    >>> doc.paragraphs[0].text
    'Document Title'
    >>> doc.paragraphs[0].style
    'Title'
    >>> doc.paragraphs[0].style = 'Normal'
    >>> doc.paragraphs[1].text
    'A plain paragraph with some bold and some italic'
    >>> (doc.paragraphs[1].runs[0].text, doc.paragraphs[1].runs[1].text, doc.
    paragraphs[1].runs[2].text, doc.paragraphs[1].runs[3].text)
    ('A plain paragraph with some ', 'bold', ' and some ', 'italic')
    >>> doc.paragraphs[1].runs[0].style = 'QuoteChar'
    >>> doc.paragraphs[1].runs[1].underline = True
    >>> doc.paragraphs[1].runs[3].underline = True
    >>> doc.save('restyled.docx')
    ```
    
-   写入 Word 文档
    
    ```python
    >>> import docx
    >>> doc = docx.Document()
    >>> doc.add_paragraph('Hello world!')
    <docx.text.Paragraph object at 0x0000000003B56F60>
    >>> doc.save('helloworld.docx')
    ```
    
    ```python
    >>> import docx
    >>> doc = docx.Document()
    >>> doc.add_paragraph('Hello world!')
    <docx.text.Paragraph object at 0x000000000366AD30>
    >>> paraObj1 = doc.add_paragraph('This is a second paragraph.')
    >>> paraObj2 = doc.add_paragraph('This is a yet another paragraph.')
    ###add_run方法在已有段落后添加文字
    >>> paraObj1.add_run(' This text is being added to the second paragraph.')
    <docx.text.Run object at 0x0000000003A2C860>
    >>> doc.save('multipleParagraphs.docx')
    ```
    
    add\_paragraph()和 add\_run()都接受可选的第二个参数，它是表示 Paragraph 或Run 对象样式的字符串。
    

​ 如 **doc.add**\*\*\_\*\*\*\*paragraph(‘Hello world!’, ‘Title’)\*\*，样式就是Title

-   添加标题
    
    ```python
    >>> doc = docx.Document()
    >>> doc.add_heading('Header 0', 0)
    <docx.text.Paragraph object at 0x00000000036CB3C8>
    >>> doc.add_heading('Header 1', 1)
    <docx.text.Paragraph object at 0x00000000036CB630>
    >>> doc.add_heading('Header 2', 2)
    <docx.text.Paragraph object at 0x00000000036CB828>
    >>> doc.add_heading('Header 3', 3)
    <docx.text.Paragraph object at 0x00000000036CB2E8>
    >>> doc.add_heading('Header 4', 4)
    <docx.text.Paragraph object at 0x00000000036CB3C8>
    >>> doc.save('headings.docx')
    ```
    
-   添加换行符和换页符
    
    ```python
    >>> doc = docx.Document()
    >>> doc.add_paragraph('This is on the first page!')
    <docx.text.Paragraph object at 0x0000000003785518>
    >>> doc.paragraphs[0].runs[0].add_break(docx.text.WD_BREAK.PAGE)
    >>> doc.add_paragraph('This is on the second page!')
    <docx.text.Paragraph object at 0x00000000037855F8>
    >>> doc.save('twoPage.docx')
    ```
    
-   添加图像
    
    ```python
    >>> doc.add_picture('zophie.png', width=docx.shared.Inches(1),
    height=docx.shared.Cm(4))
    <docx.shape.InlineShape object at 0x00000000036C7D30>
    ```
