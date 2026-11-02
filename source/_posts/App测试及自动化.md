---
title: App测试及自动化
date: 2023-09-20T22:53:55.000Z
permalink: 2023/09/21/App测试及自动化/
categories:
  - 测试
tags:
  - 测试开发
---

# 1：ADB相关内容

ADB（Android Debug Bridge）是一种用于与Android设备进行通信和控制的命令行工具。它在Android应用程序开发和测试中起着重要作用。以下是关于ADB的详细解释：  
通信工具  
：ADB允许开发人员与连接到计算机的Android设备进行通信。这些设备可以是物理设备，也可以是模拟器。  
调试功能  
：ADB的主要目的之一是帮助开发人员进行调试。它可以用于安装、卸载和管理应用程序，查看设备日志，复制文件到和从设备，以及执行各种调试命令。  
应用程序安装和卸载  
：使用ADB，您可以轻松地将应用程序安装到Android设备上，也可以卸载已安装的应用程序。这对于测试新版本的应用程序或卸载不再需要的应用程序非常有用。  
文件传输  
：ADB使您能够将文件从计算机复制到设备，或将设备上的文件复制到计算机。这对于传输测试数据或收集应用程序日志文件非常有用。  
查看设备日志  
：通过ADB，您可以查看与Android设备相关的日志信息。这对于识别应用程序崩溃或性能问题非常有帮助。  
模拟操作  
：ADB还允许模拟用户操作，如触摸、滑动和按键事件。这对于自动化测试和执行UI测试非常有用。  
安全性  
：ADB可以通过网络连接到设备，但通常需要设备授权。这有助于确保设备上的敏感数据不会被未经授权的访问。  
总之，ADB是Android开发和测试的关键工具，可帮助开发人员与Android设备进行通信、调试应用程序以及执行各种与应用程序开发和测试相关的操作。

# 2\. ADB包含哪些组件？

以下是ADB的三个主要组件：  
客户端（Client）  
：ADB客户端是运行在开发人员的计算机上的命令行工具。它负责向服务器发送命令并接收来自服务器的响应，使开发人员可以与Android设备进行交互。  
服务器（Server）  
：ADB服务器是一个后台进程，运行在开发人员的计算机上。它充当客户端和设备之间的中介，负责将命令从客户端传输到相应的设备上的守护程序（adbd），并将设备的响应传回客户端。  
守护程序（adbd）  
：adbd是Android设备上的守护程序，它在设备上运行。它监听来自ADB服务器的命令，并执行这些命令，例如安装应用程序、管理文件系统和日志等。adbd确保ADB客户端可以与Android设备进行通信和控制。  
这三个组件共同协作，使开发人员能够通过ADB与Android设备进行交互、调试和测试应用程序。

# 3\. ADB是怎么安装的，需要哪些前置条件？有了前置条件后ADB如何安装，如何确认已经安装成功？adb常用命令有哪些？

-   01 ADB概述  
    什么是ADB？  
    ADB全称为Android Debug Bridge，是Android SDK（安卓的开发工具）中的一个  
    工具，  
    起到调试桥的作用，是一个客户端-服务器端程序。其中客户端是用来操作的电脑，服  
    务端是Android设备。  
    可以直接操作管理Android模拟器或者真实的Android设备（真机）。  
    括以下三个组件：  
    客户端：用于发送命令。客户端在开发计算机上运行。您可以通过发出 adb 命令从命  
    令行终端（cmd）调用客户端。  
    守护程序 (adbd)：用于在设备上运行命令。守护程序在每个设备上作为后台进程运  
    行。  
    服务器：用于管理客户端与守护程序之间的通信。服务器在开发机器上作为后台进程  
    运行。

* * *

-   02 环境部署  
    环境安装及使用的三个步骤：  
    安装JDK环境  
    安装SDK环境  
    （ADB是Android SDK自带的命令行工具，我们前面装好了Android SDK,所以在  
    这只需要验证ADB能否使用就OK）

3.  连接真机或者模拟器执行命令  
    问题：版本不一致；电脑当中有手机助手的启动；最好关闭。不然端口会被占用  
    模拟器：（安装电脑）  
    打开模拟器；  
    进入到设置-开发者选项-打开USB调试  
    当没有开发者选项- 进入到关于平板电脑-点击版本号多次（5次）-提示【您已处于  
    开发者模式】  
    手机：  
    连接手机和模拟器唯一的区别即是手机一定要连接数据线，并且授权，  
    授权页面可以选择的传输方式：非【仅充电】，其它都可。

* * *

-   03 ADB命令详解  
    adb devices ：显示当前的已经连接的设备  
    如果当前的服务是关闭的状态，它会自动去重启  
    adb version ：显示当前adb的版本  
    adb help：显示当前adb的帮助信息  
    adb kill-server ：关掉进程  
    adb start-server ：启动进程，也可直接用adb devices ，当重启之后一定需要重新连  
    接对应的设备；  
    adb shell  
    shell 它是安卓系统的内核，同时它也是一个简单的linux系统，能够支持linux命令  
    权限的指令：模拟可以，真机手机不一定  
    adb root ：获取安卓管理员的权限  
    adb remount：获取系统（System）分区的可写权限  
    对手机去进行测试 ？  
    包名 ：是每个应用都存在的一个名字，而且必须是唯一性 。–人的身份证一样  
    获取包名的命令：  
    adb shell pm list packages 显示所有的包名  
    adb shell pm list packages -s 系统包名  
    adb shell pm list packages -3 对应第三应用包名  
    安装包都是安装在手机当中，在shell当中运行  
    ls /data/data 显示所有的包名  
    adb shell ls /data/data  
    当有多个设备的时候应该怎么去连接：  
    adb -s 设备号 命令  
    adb -s 127.0.0.1:62001 shell pm list packages -查看所有的包名  
    安装应用apk  
    adb install 路径 -手机没有该应用，可以正常安装  
    adb install -r 路径 -覆盖安装（推荐）  
    卸载应用  
    adb uninstall 包名 -卸载apk  
    adb -s 127.0.0.1:62001 uninstall com.tencent.mobileqq  
    adb uninstall -k 包名 -卸载apk，保留文件，当此命令使用不行，课参考以下最新命  
    令  
    adb -s 127.0.0.1:62001 shell cmd package uninstall -k com.tencent.mobileqq  
    出现错误、日志-手机：  
    怎么去把我们本地文件放到手机当中  
    adb push 本地路径 手机路径(也可以带上文件名)  
    手机拉到电脑当中 ：  
    adb pull 手机路径 本地路径(也可以带上文件名)  
    注意： 1. 尽量文件存放的路径不要是根目录，新建一个文件夹去进行存在文件  
    日志 ：保存路径，必须带文件名  
    adb logcat 抓取日志  
    退出 ：ctrl+c  
    清空日志：重新定位  
    adb logcat -c  
    日志保存到本地路径  
    adb logcat >保存路径，必须带文件名  
    是不是实时在写？是的。  
    adb bugreport  
    使用命令：adb bugreport >d:\\ bugreport.log 输出日志，保存在本地文件  
    通过pull命令，把对应的zip文件拉下来：比如：adb pull  
    /data/user\_de/0/com.android.shell/files/bugreports/bugreport-LIO-AN00-2021-11-  
    05-21-54-56.zip D:\\app

3.  通过对应的文档去定位出错信息，通过对应的关键字：FATAL EXCEPTION
4.  然后把对应的错误日志确定之后，直接发给我们的开发（或者提BUG为附件或者备注  
    信息上传）

# 4\. APP稳定性测试及MONKEY实操

稳定性测试就是指软件长时间的持续运行，系统版本是否稳定，是否能否持续的为用户提供服务。  
自动化测试：工具或者代码来代替人工操作行为  
人工测试：人亲力亲为

* * *

App的稳定性测试如何实施？  
首选Monkey  
Monkey是向系统发送随机的用户事件流（如按键输入、触摸屏输入和手势输入等），实现对正在开发的应用程序进行稳定性测试。可以更好的模拟用户操作，确保App的稳定性。  
你想去固定测试流程 ？  
通过adb的命令调用monkey.shell文件，再执行monkey.jar文件，调用安卓守护进程，在设备上进行随机性测试。  
命令：adb shell monkey  
monkey.shell 路径：/system/bin/monkey  
monkey.jar 路径：/system/framework/monkey.jar

* * *

之前安装的adb环境即可；真机或者模拟器。  
真机：通过USB或者wifi（拔掉USB数据线也能运行）  
wifi连接的方法：

1.  设置–开发者选项–打开USB调试
2.  连接USB线，文件传输的选择（文件、图片），并允许权限操作
3.  确定手机和电脑是同一个局域网之中
4.  输入：adb devices，回车，确定设备连接
5.  再输入：adb tcpip 5555  
    把手机默认的连接方式是USB，通过此命令是把USB连接方式改为tcpip方式
6.  拔掉数据线，输入：adb connect ip:5555  
    比如：adb connect 192.168.2.217:5555
7.  连接成功之后，执行相应的monkey操作。

* * *

monkey操作：

1.  连接设备  
    设备：开启USB调试选项  
    通过在命令行输入adb devices来进行连接
2.  输入命令：adb shell monkey ，查看Monkey支持的所有命令

* * *

必选的命令  
COUNT：事件数（运行事件的时间延迟时间）通过事件数量来测试稳定性比如：你需要测试一个应用的时长是1个小时；一个事件的时间是1秒；那么你想要1个小时的事件数：1（小时） 60（分钟）\* 60（秒）=3600 ,也就是要指定3600事件

* * *

Monkey选项主要分为3大类：  
基本配置选项，如设置只对单独的一个包进行测试，设置等待时间等。  
事件类型和频率  
调试选项  
\-p \[-p \]  
用此参数指定一个或多个包。指定包之后，Monkey将只允许系统启动指定的APP。如果无指定包， Monkey将允许系统启动设备中的所有APP。  
例1：对58同城进行稳定性测试，执行100次事件  
adb shell monkey -p com.wuba 100  
获取包名  
adb shell dumpsys window windows | findstr mFocusedApp  
查看当前打开的应用包名和界面

* * *

–throttle  
在事件之间插入固定延迟。通过这个选项可以控制Monkey发送事件的频率。时间单位是毫秒（ms）  
例2：发送10个事件，持续执行时间1分钟  
adb shell monkey –throttle 6000 10  
例3：模拟用户操作，持续执行时间1分钟  
adb shell monkey –throttle 500 120

* * *

在日志分为三个等级：  
\-v Level 0 除启动提示、测试完成和最终结果之外，提供较少信息  
\-v-v Level 1 提供较为详细的测试信息，如逐个发送到Activity（页面）的事件  
\-v-v-v Level 2 提供更加详细的设置信息，如测试中被选中的或未被选中的Activity。  
例4：对58同城进行稳定性测试，执行100次事件，分别查看不同日志级别记录的信息情况  
adb shell monkey -p com.wuba -v 100  
adb shell monkey -p com.wuba -v-v 100  
adb shell monkey -p com.wuba -v -v -v 100  
日志导出到本地  
adb shell monkey -p com.wuba -v-v-v 100 >d:\\wuba.txt

* * *

在Monkey运行过程中，肯定会发现异常、奔溃、无响应等问题，对于此类问题如何进行复现呢？  
\-s 伪随机数生成器的seed值。如果用相同的seed值再次运行Monkey，它将生成相同的事件序列。  
使用场景：  
复现bug，回归测试（验证的问题的时候）  
adb shell monkey -s 1593077384911 -p com.wuba -v-v-v 100 >d:\\wuba4.txt

* * *

在Monkey运行过程中，一般拔掉数据线，也会在持续运行。其中有如下几种原因造成Monkey停止：  
当命令运行完毕  
结束进程的方式来终止Monkey的执行  
运行过程中遇到异常、奔溃等情况Monkey也会停止  
–ignore-crashes 忽略在应用程序出现crash时导致的monkey停止  
–ignore-timeouts 忽略在应用程序出现ANR问题时导致monkey停止  
–ignore-security-exceptions 忽略应用程序发生许可错误时导致monkey停止  
–kill-process-after-error 当应用程序发生错误时，应用程序停止运行并保持在当前状态

* * *

例：对58同城进行稳定性测试，执行50次事件，忽略过程中遇到的异常，直到50次事件完成  
adb shell monkey -p com.wuba –throttle 500 –ignore-crashes –ignore-timeouts –ignore-security-exceptions –kill-process-after-error -v-v-v 50  
id事件事件名称事件描述0–pct-touch触摸事件百分比实际操作类似于点击1–pct-motion滑动事件百分比实际操作是一个没有拐弯的直线滑动操作2–pct-pinchzoom缩放事件百分比智能机上的放大缩小手势操作3–pct-trackball轨迹球事件百分比一系列的曲线滑动操作（目前很少用）4–pct-rotation手机屏幕在横竖屏之间不断地切换5–pct-permission权限替换掉了老版本中的–pct-rotation 屏幕旋转6–pct-nav基本导航事件百分比设备上、下、左、右键（目前很少用）7–pct-majornav主要导航事件百分比键盘的中间键、回退按键、菜单按键8–pct-syskeys系统事件百分比点击Home键、返回键、音量调节键等9–pct-appswitchActivity启动事件百分比 某个页面切换事件10–pct-flip 键盘翻转事件百分比点击输入框、键盘弹起、点击输入框以外区域、键盘收回等11–pct-anyevent其他事件百分比除了上面的一些其他事件，如按键、其他不常用的设备上的按钮等（目前很少用）

* * *

对考研帮apk进行稳定性测试，要求：模拟用户的随机操作，执行时间10-12小时，并出具相关稳定性测试报告  
考研帮apk——>包名  
模拟用户  
执行时间10-12小时——>确定间隔时间、 执行次数  
忽略在执行过程中因为crashes,anr等导致异常终止  
保存日志  
实现一：不指定事件的比例产生日志  
adb shell monkey -p com.tal.kaoyan –throttle 1000 –ignore-crashes –ignore-timeouts -v-v-v 36000 >d:\\kaoyan.log  
实现二：指定事件的比例产生日志  
adb shell monkey -p com.tal.kaoyan -s 100 –pct-touch 30 –pct-motion 30 –pct-appswitch 10 –pct-rotation 5 –throttle 1000 –ignore-crashes –ignore-timeouts -v-v-v 36000 >d:\\kaoyan2.log  
注：将对应的命令写到.bat文件中，双击即可运行。

* * *

在Android中有很多异常，其中Crash Exception 在Android 中经常会遇到。比如：NullPointerException 空指针、ClassCastException 类型转换异常、IndexOutOfBoundsException 下标越界异常；那么通过Monkey测试出现后，需要去查看日志信息，检查在运行过程中是否有对应的错误出现。  
从文首看到Monkey日志包含：  
① 该次monkey的seed值  
② 执行次数（count）  
③ 执行的对应包名（AllowPackage）  
④ 执行的类别（IncludeCategory  
⑤ 每种事件执行的百分比

* * *

一般的操作步骤为以下几步：  
在日志中找有哪些错误  
找到错误后再定位是哪些APP或者哪些事件出错  
提交bug，并附上日志信息  
开发修复bug后，进行回归验证。使用之前的monkey命令再执行一遍，注意seed值要一样

* * *

一般测试结果分析通过搜索关键字：  
程序无响应，ANR问题：在日志中搜索“ANR”  
崩溃问题：在日志中搜索“CRASH”  
其他问题:在日志中搜索“Exception、FATAL” 搜索到这段log

* * *

（1）ANR（Application Not Responding） ：程序无响应  
只要搜索ANR就可以搜索到这段log，如下图中标注的APK应用名称。这个ANR发生在com.android.music(音乐)模块。  
（2）CRASH：程序崩溃或异常  
只要搜索Crash就可以找到这段log，如下图中标注的APK应用名称。这个crash发生在com.hcedu.hcdeom模块。  
注意：  
手机端设置“保持唤醒状态”，运行Monkey。  
测试完成，如果发现手机锁屏，解锁长按Home键，若没有后台程序运行，则说明手机重启。  
如果确定是否重启，可以在：设置—>关于手机—>状态信息—>已开机时间进行查看。

# 5\. fiddler补充内容：

web ：  
fiddler 是能够默认去抓取http 协议的请求  
如果说需要抓取https ？  
设置 -htpps 选项以及证书安装好  
app ：  
fiddler 是能够默认去抓取http 协议的请求  
如果说需要抓取https ？  
设置代理：电脑的ip:8888  
通过自带的浏览器打开：ip:8888网站进入到下载证书的页面  
安装设置对应的密码即可  
如果刚刚那个页面，用户都显示null

* * *

思考 ？到底是前端没有获取到数据，还是接口就是显示的名称是null ？

1.  fiddler == 到底是前端的问题 还是 后端
2.  直接用postman去发送一个这个接口去看接口返回数据  
    怎么去过滤数据 ：加过滤参数？ctrl + F  
    断点  
    可以修改请求参数；- 10 20 30 40 ….  
    可以修改响应数据；XXXXX xxxxxxx…  
    可以修改请求头；  
    开发说断点：  
    发现一个问题，但是开发不知道是哪里出现问题了。  
    开发 ：你使用开发环境，我等下打个断点看看 — 调试  
    [https://h5.oschina.net/apiv3/projectAuthors?size=10](https://h5.oschina.net/apiv3/projectAuthors?size=10)

# 6\. 移动端测试补充内容：

## 一、ADB命令

## 1\. Android生态环境

老版本，不是android studio

```plaintext
1.创建新的环境变量
ANDROID_HOME
值为sdk包解压目录 E:\tools\androidsdk

2.path配置环境变量，加入 adb所在目录
E:\tools\androidsdk\platform-tools
```

注意：是 添加 该目录到环境变量PATH中， ！！！不是替换！！！ ，否则会导致系统命令都找不到的严重后果

## 2\. 命令

操作设备需要android开发环境（命令）

工具：Android SDK Tools

```plaintext
adb 命令不知道的先打开cmd 输入一下adb 如果path环境配置正确就会出现很多adb 的命令提示。。
接下来就是一些简单的连接方法：
夜神模拟器：adb connect 127.0.0.1:62001
逍遥安卓模拟器： adb connect 127.0.0.1:21503
天天模拟器：adb connect 127.0.0.1:6555
海马玩模拟器 ：adb connect 127.0.0.1:53001
网易MUMU模拟器：adb connect 127.0.0.1:7555
```

```python
1.查看adb命令版本
adb version

2.连接逍遥模拟器
adb connect 127.0.0.1:21503


3.查看已连接的设备/模拟器列表
adb devices

4.进入设备
adb shell

5.选择一个设备
adb -s 模拟器编号
adb -s 127.0.0.1:21503

6.查看所有应用
adb shell pm list packages

7.查看系统应用，显示的是app的包名（包名就类似人的身份证，可以唯一的确定身份）
adb shell pm list packages -s

8.查看第三方应用
adb shell pm list packages -3

9.安装应用程序
adb install -r D:\Downloads\cn.gov.tax.its_1.5.4_10504.apk
    
10.卸载应用程序
adb uninstall cn.gov.tax.its

11.清除应用数据与缓存
adb shell pm clear 包名

12.查看安卓系统的版本
adb shell getprop ro.build.version.release

13.查看安卓手机的mac地址
adb shell cat /sys/class/net/wlan0/address

14.查看包含包含某字符串的应用，比如huawei
adb shell pm list packages huawei

15.查看已经安装的包
adb shell pm list packages | findstr tax
--包含tax的包
--findstr是windows命令，类似于linux的grep

16.查看应用的详细信息
adb shell pm path 包名

17.启动app
adb shell am start -n cn.gov.tax.its/cn.gov.tax.its.MainActivity

18.关闭app
adb shell am force-stop cn.gov.tax.its
```

### 二、移动端自动化

## 1\. Appium

```plaintext
安装第三方库
pip install Appium-Python-client

pip install Appium-Python-client -i https://mirrors.aliyun.com/pypi/simple
```

### appium工作原理

```plaintext
client、appiumserver、app

client运行脚本时，调用appiumAPI,向Appium Server端发送一条json格式数据的HTTP请求（请求内容就是根据Json Wire Protocol协议规定的一条JSON格式的数据；）

开启appium服务器的同时开启了监听端口（例如4724），Appium Server端收到请求后，解析出json数据并发送到手机端的中间件AndroidBootstrap.jar(iOS为BootStrip.js)

手机端接收到对应的请求后，通过AndroidBootstrap.jar翻译成UIAutomator能执行的命令，然后通过UIAutomator处理并操作APP完成测试

执行完成后将结果以json格式返回给Appniu Server,Appium Server又将结果返回给client。
```

![appium工作原理3](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC9UExURVlZWdPT07KysmRkZIWFhfT09JmZmWZmZm9vb39/fxkZGUxMTDMzM3p6epCQkKamppubm729venp6cjIyN7e3tbW1s/Pz8LCwnx8fLS0tFZWVoiIiI+Pj6GhoeTk5Glpabu7u93d3evr66CgoJSUlKqqqsnJyeDg4Hd3d8PDw+Xl5bi4uNHR0dvb26Ojo6urq+fn51hYWDg4OCgoKHBwcK2traenp0FBQe7u7vHx8U5OTre3t8zMzHV1df///7GrnpQAAAA/dFJOU///////////////////////////////////////////////////////////////////////////////////AI4mfBcAAAUGSURBVHja7NoJb6M4GMZxY0NCD64kve/pMZ2d3Z297+X7f6zFNmBAMUXa6URl/q9UJSWPUPzrizFWRUlNLgEBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYYIEFAVhggQUWWGBBABZYYIEFFlgQgAUWWGCBBRYEYIEFFlhggQUBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYn6cCIcRXgvX/h9qcIVBqDdbEM8RCxGCB9QqXYRwHYDHBgwXWl8eKZKiESHI3Ba1kWs3fKixcaJUl1YyeBm7Ocq+yLItUiVBGnXxenSHJolIKEcwHq6ikbOX1YGVzQCTN8LPmSLreghUl9sN4Uw7yajMrLC0TZ1ImzqY6FEop0+pIaEN5HaoOxVuwEqFyc4I46uSlzOLqgxlh6UaR9l3VYWl9Fdoxb1Q90KJtu41pwwFW/WHhTtW8i7TafLCqRsk6bsGw63L9qurXRmuIlbT9lDQnlXU+nBFW1Q2qnZbDprWa2tjR90LZFqx1/+Td/HpGWLlrLDvIwTcx6dQ1Vrntbig68cDms3JwbA5Y1azs1ger6sNV/bbIw1jU81MvNAGrl58RVn8ozW+btF08iGFoAlYvP3csfVur1gJBEIA1uBmue5dhZDOyO2epbmgCVi8/I6x0MMHH9pjsTfBhNzQBq5uPZoQlB0uH3DZG4EZqQ26fL3sZq5uf09Ih6qw3i/pm6BZO0qZX7rrUS68Xsbr5ZE4rePMk08pk9aUZugfqppvs6AM1Acvlo/StP+6EbW06z8hJqxbYp2BZPQUnFsLsKuhQdaHqn5ewbF7KXIn0jWO5MqOQ7RaNLPtbNMmmhimj0GUmYLl8Gs0Lq4wyPbTu1l2QKqHSouzs3OlDIslW5SQsnY/NXmFplyNvEuuLV/Tau9BzwiraDUSwXmysztYWWNtL1psXeumgIrDGaqXvBfUuvtqUYI3V2t1wk1e2msFluJJm6zDJXv/fIfjPP7DAAgsssCiwwAILLLDAosACCyywwAKLAgsssMACC6zt9fDz/v75tyOB+98PD2+ORgKffjw4OP1uJPDxl+Xy8v1I4MPF3t7VNyOB4/vF4uzdzrG+39f1kz/w66Guv/yBvw90KX/gZKkr8Qf+2dOV+gNHC12/7RxrabD2/a31bLAO/a11YbAO/K21MFhLf2s9Gqw9f2vdGqzFu11jnVusE2/gxmI9eQOnFuvYG7i0WH7uK4t15w2cWazrXWP9a7H8f/bQYvm/6IPF+sF/pVssf19Ii/WH/0K2WH/uGuvEWC39gSdj9Twy+Rqri5EZx1gt/IE7Y/XoD1wbq9vd3w1PlufnD2OBp+ebm/uxwPHF6emnscDR4vLy41jg7vHq6sNY4Pr27OyYdRaLUrDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssL6u+k+AAQCR9eHtLKvLfwAAAABJRU5ErkJggg==)

![appium工作原理2](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC9UExURVlZWdPT07KysmRkZIWFhfT09JmZmWZmZm9vb39/fxkZGUxMTDMzM3p6epCQkKamppubm729venp6cjIyN7e3tbW1s/Pz8LCwnx8fLS0tFZWVoiIiI+Pj6GhoeTk5Glpabu7u93d3evr66CgoJSUlKqqqsnJyeDg4Hd3d8PDw+Xl5bi4uNHR0dvb26Ojo6urq+fn51hYWDg4OCgoKHBwcK2traenp0FBQe7u7vHx8U5OTre3t8zMzHV1df///7GrnpQAAAA/dFJOU///////////////////////////////////////////////////////////////////////////////////AI4mfBcAAAUGSURBVHja7NoJb6M4GMZxY0NCD64kve/pMZ2d3Z297+X7f6zFNmBAMUXa6URl/q9UJSWPUPzrizFWRUlNLgEBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYYIEFAVhggQUWWGBBABZYYIEFFlgQgAUWWGCBBRYEYIEFFlhggQUBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYn6cCIcRXgvX/h9qcIVBqDdbEM8RCxGCB9QqXYRwHYDHBgwXWl8eKZKiESHI3Ba1kWs3fKixcaJUl1YyeBm7Ocq+yLItUiVBGnXxenSHJolIKEcwHq6ikbOX1YGVzQCTN8LPmSLreghUl9sN4Uw7yajMrLC0TZ1ImzqY6FEop0+pIaEN5HaoOxVuwEqFyc4I46uSlzOLqgxlh6UaR9l3VYWl9Fdoxb1Q90KJtu41pwwFW/WHhTtW8i7TafLCqRsk6bsGw63L9qurXRmuIlbT9lDQnlXU+nBFW1Q2qnZbDprWa2tjR90LZFqx1/+Td/HpGWLlrLDvIwTcx6dQ1Vrntbig68cDms3JwbA5Y1azs1ger6sNV/bbIw1jU81MvNAGrl58RVn8ozW+btF08iGFoAlYvP3csfVur1gJBEIA1uBmue5dhZDOyO2epbmgCVi8/I6x0MMHH9pjsTfBhNzQBq5uPZoQlB0uH3DZG4EZqQ26fL3sZq5uf09Ih6qw3i/pm6BZO0qZX7rrUS68Xsbr5ZE4rePMk08pk9aUZugfqppvs6AM1Acvlo/StP+6EbW06z8hJqxbYp2BZPQUnFsLsKuhQdaHqn5ewbF7KXIn0jWO5MqOQ7RaNLPtbNMmmhimj0GUmYLl8Gs0Lq4wyPbTu1l2QKqHSouzs3OlDIslW5SQsnY/NXmFplyNvEuuLV/Tau9BzwiraDUSwXmysztYWWNtL1psXeumgIrDGaqXvBfUuvtqUYI3V2t1wk1e2msFluJJm6zDJXv/fIfjPP7DAAgsssCiwwAILLLDAosACCyywwAKLAgsssMACC6zt9fDz/v75tyOB+98PD2+ORgKffjw4OP1uJPDxl+Xy8v1I4MPF3t7VNyOB4/vF4uzdzrG+39f1kz/w66Guv/yBvw90KX/gZKkr8Qf+2dOV+gNHC12/7RxrabD2/a31bLAO/a11YbAO/K21MFhLf2s9Gqw9f2vdGqzFu11jnVusE2/gxmI9eQOnFuvYG7i0WH7uK4t15w2cWazrXWP9a7H8f/bQYvm/6IPF+sF/pVssf19Ii/WH/0K2WH/uGuvEWC39gSdj9Twy+Rqri5EZx1gt/IE7Y/XoD1wbq9vd3w1PlufnD2OBp+ebm/uxwPHF6emnscDR4vLy41jg7vHq6sNY4Pr27OyYdRaLUrDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssL6u+k+AAQCR9eHtLKvLfwAAAABJRU5ErkJggg==)

## 2\. Package

什么是 Package？其实就是包名，可以认为是 Android 应用的一个唯一标识。如何确定你的设备上是否装了某一款应用？就是通过包名来判断。在使用 Appium 进行 app 自动化的时候呢，必须要通过包名告诉 Appium 我们要测的应用是什么，这样 Appium 才知道要去哪里操作了。

### 1.获取包名

#### 没有apk

直接安装到了手机上

```plaintext
注意需要先打开需要查找的apk后，再敲入以下命令，任选其一

adb shell dumpsys window w | findstr \/ | findstr name=
或
adb shell dumpsys window w| findstr mCurrentFocus
或
adb shell "dumpsys window w|grep \/|grep name=|sed 's/mSurface=Surface(name=//g'|sed 's/)//g'|sed 's/ //g'"
```

#### 有apk

使用aapt工具 ,适合给程序自动获取 apk 的相关信息，非常实用，aapt是sdk自带的一个工具，在sdk\\builds-tools\\目录下  
1.以b站为例，命令行中切换到aapt.exe目录执行输入以下命令

```plaintext
E:\tools\androidsdk\build-tools\29.0.3\aapt.exe dump badging E:\testtool\iBiliPlayer-bili.apk
```

2.运行后的结果中有应用包名package和入口activity名称，另外可看到应用使用的权限、支持的语言等信息

#### 给apk后面加.zip

apk说白了都是.zip文件，给apk后面加.zip后里面有个AndroidManifest.xml文件，在里面找package，后面紧跟着就是包名，需要人工删除空格。

## 3\. Activity

### 获取名字

```plaintext
E:\tools\androidsdk\build-tools\29.0.3\aapt.exe dump badging E:\testtool\iBiliPlayer-bili.apk
```

```plaintext
aapt dump badging *.apk | findstr "package launchable-activity"
```

## 4\. 元素定位

### 1.填写参数

```python
1.启动检查器会话

2.设定所需功能，例如
{
  "platformName": "Android",
  "platformVersion": "7",
  "deviceName": "deviceName",
  "appPackage": "com.mobivans.onestrokecharge",
  "appActivity": "com.mobivans.onestrokecharge.activitys.MainActivity",
  "unicodeKeyboard": true,
  "resetKeyboard": true,
  "noReset": true,
  "newCommandTimeout": 6000,
  "automationName": "UiAutomator2"
}
```

```python
desired_caps = {
  'platformName': 'Android', # 被测手机是安卓
  'platformVersion': '7', # 手机安卓版本
  'deviceName': 'deviceName', # 设备名，安卓手机可以随意填写
  'appPackage': 'com.mobivans.onestrokecharge', # 启动APP Package名称
  'appActivity': 'com.mobivans.onestrokecharge.activitys.MainActivity', # 启动Activity名称
  'unicodeKeyboard': True, # 使用自带输入法，输入中文时填True
  'resetKeyboard': True, # 执行完程序恢复原来输入法
  'noReset': True,       # 不要重置App
  'newCommandTimeout': 6000,
  'automationName': 'UiAutomator2'
}
```

### 2.界面元素查看工具

做 Selenium Web 自动化的时候，要找到元素，我们是通过浏览器的开发者工具栏来查看元素的特性，根据这些特性（属性和位置），来定位元素，Appium 要自动化手机应用，同样需要工具查看界面元素的特征。常用的查看工具是： Android Sdk包中的 `uiautomateviewer` 和 Appium Desktop 中的 `Appium Inspector`

#### uiautomateviewer

安卓查看APP界面元素，最常用的就是 Android SDK 中的工具 `uiautomateviewer` ，它在SDK目录目录 的 tools\\bin 目录中

和Selenium一样，我们要定位选择元素，也是根据元素的特征，包括

-   元素的属性
-   元素的相对位置（相对父元素、兄弟元素等）

#### Appium Inspector

Appium Desktop 中的 `Appium Inspector` 也可以查看元素。它的一个优点是可以直接验证 选择表达式是否能定位到元素

## 5\. 定位元素的方法

### ID

在Selenium Web自动化教程里，我们说过，如果能根据ID选择定位元素，最好根据ID，因为通常来说ID是唯一的，所以根据ID选择 效率高。在安卓应用自动化的时候，同样可以根据ID查找。但是这个ID ，是安卓应用元素的 `resource-id` 属性

使用如下代码

```plaintext
driver.find_element_by_id('expand_search')
```

### CLASS NAME

安卓界面元素的 class属性 其实就是根据元素的类型，类似web里面的tagname， 所以通常不是唯一的。通常，我们根据class 属性来选择元素， 是要选择多个而不是一个。如果你确定 要查找的 界面元素的类型 在当前界面中只有一个，就可以根据class 来唯一选择。

使用如下代码

```plaintext
driver.find_elements_by_class_name('android.widget.TextView')
```

### ACCESSIBILITY ID

元素的 content-desc 属性是用来描述该元素的作用的。如果要查询的界面元素有 content-desc属性，我们可以通过它来定位选择元素。

使用如下代码

```plaintext
driver.find_element_by_accessibility_id('找人')
```

### text

```plaintext
driver.find_element_by_xpath("//*[@text='自动化测试']")
```

```plaintext
driver.find_element_by_xpath("//*[contains(@text,'自动化测试')]")
```

### Xpath

Appium 也支持通过 Xpath选择元素。但是其可靠性和性能不如 Selenium Web自动化。Web自动化对Xpath的支持是由浏览器实现的，而Appium Xpath的支持是 Appium Server实现的。浏览器产品的成熟度比Appium要高很多。Xpath是标准语法，表达式的语法规则和 以前Selenium里面Xpath的语法是一样的，比如

```plaintext
driver.find_element_by_xpath('//ele1/ele2[@attr="value"]')
```

注意：  
selenium自动化中， xpath表达式中每个节点名是html的tagname。但是在appium中， xpath表达式中 每个节点名 是元素的class属性值。比如：要选择所有的文本节点，就使用如下代码

```plaintext
driver.find_element_by_xpath('//android.widget.TextView')
```

```python
--定位需要使用双引号

文本定位
//*[@text="text文本属性"]。text不加括号。

id定位
//*[@resource-id="id属性"]

class定位
第一种：//class属性
第二种；//*[@class="class属性"] 

content-desc属性定位
//*[@content-desc=’desc的文本’]

contains模糊定位
--对于一个元素的id或者text不是固定的，但有一部分是固定的，这种就可以模糊匹配。
//[contains(@content-desc, ‘帮助’)]

下标定位
//android.widget.Image[2]
```

### 安卓 UIAutomator

根据id，classname， accessibilityid，xpath，这些方法选择元素，其实底层都是利用了安卓 uiautomator框架的API功能实现的。参考 这里的谷歌安卓官方文档介绍： [https://developer.android.google.cn/training/testing/ui-automator](https://developer.android.google.cn/training/testing/ui-automator)

也就是说，程序的这些定位请求，被Appium server转发给手机自动化代理程序，就转化为为uiautomator里面相应的定位函数调用。其实，我们的自动化程序，可以直接告诉 手机上的自动化代理程序，让它 调用UI Automator API的java代码，实现最为直接的自动化控制。

主要是通过 UiSelector 这个类里面的方法实现元素定位的，比如

```python
--必须是双引号
text("String text") 文本
textContains("String text") 文本包含
textMatches("String text") 文本正则
textStartsWith("String text") 文本开始字符

driver.find_element_by_android_uiautomator('new UiSelector().text("手机号")')
```

```python
通过 text 属性 和 className的属性 两个条件 来定位元素。

code = 'new UiSelector().text("热门").className("android.widget.TextView")'
ele = driver.find_element_by_android_uiautomator(code)
ele.click()
```

```python
# 通过resourceId
test = driver.find_element_by_android_uiautomator('new UiSelector().resourceId("com.hpbr.bosszhipin:id/tv_tab_label")')
print(test.text)

# 通过text
test = driver.find_element_by_android_uiautomator('new UiSelector().text("附近")')
print(test.text)

# 通过className
test = driver.find_element_by_android_uiautomator('new UiSelector().className("android.widget.TextView")')
print(test.text)
```

## 6\. python用法

```plaintext
测试环境：一笔记账
```

```python
from appium import webdriver
import time

desired_caps = {
  'platformName': 'Android', # 被测手机是安卓
  'platformVersion': '7', # 手机安卓版本
  'deviceName': 'deviceName', # 设备名，安卓手机可以随意填写
  'appPackage': 'com.mobivans.onestrokecharge', # 启动APP Package名称
  'appActivity': 'com.mobivans.onestrokecharge.activitys.MainActivity', # 启动Activity名称
  'unicodeKeyboard': True, # 使用自带输入法，输入中文时填True
  'resetKeyboard': True, # 执行完程序恢复原来输入法
  'noReset': True,       # 不要重置App
  'newCommandTimeout': 6000,
  'automationName': 'UiAutomator2'
}

# 连接Appium Server，初始化自动化环境
driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

# 设置缺省等待时间
driver.implicitly_wait(5)

#点击 + 号
# driver.find_element_by_id('com.mobivans.onestrokecharge:id/main_write1').click()
driver.find_element_by_xpath(
    '//android.widget.LinearLayout[@resource-id="com.mobivans.onestrokecharge:id/main_write1"]').click()

#点击 交通
driver.find_element_by_xpath("//android.support.v7.widget.RecyclerView[@resource-id='com.mobivans.onestrokecharge:id/add_rv_cateGrid']/android.widget.LinearLayout[5]").click()

#选择 备注
driver.find_element_by_id('com.mobivans.onestrokecharge:id/add_et_remark').send_keys("工具出行")

#输入金额
#输入 2
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_2').click()
#输入5
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_5').click()
#输入8
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_8').click()

#点击完成 按钮
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_finish').click()


#获取添加的记录文本信息
yibijizhangtext = driver.find_element_by_xpath("//android.support.v7.widget.RecyclerView[@resource-id='com.mobivans.onestrokecharge:id/main_rv_list']/android.widget.LinearLayout[2]//android.widget.TextView[@resource-id='com.mobivans.onestrokecharge:id/account_item_txt_remark']").text

print(yibijizhangtext)
```

```python
from appium import webdriver
import time

desired_caps = {
  'platformName': 'Android', # 被测手机是安卓
  'platformVersion': '7', # 手机安卓版本
  'deviceName': 'deviceName', # 设备名，安卓手机可以随意填写
  'appPackage': 'com.mobivans.onestrokecharge', # 启动APP Package名称
  'appActivity': 'com.mobivans.onestrokecharge.activitys.MainActivity', # 启动Activity名称
  'unicodeKeyboard': True, # 使用自带输入法，输入中文时填True
  'resetKeyboard': True, # 执行完程序恢复原来输入法
  'noReset': True,       # 不要重置App
  'newCommandTimeout': 6000,
  'automationName': 'UiAutomator2'
}

# 连接Appium Server，初始化自动化环境
driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)

# 设置缺省等待时间
driver.implicitly_wait(5)

#点击设置
driver.find_element_by_id("com.mobivans.onestrokecharge:id/mybtn_setting").click()
#点击类别管理
driver.find_element_by_id("com.mobivans.onestrokecharge:id/myjump_type").click()
#点击添加类别
driver.find_element_by_id("com.mobivans.onestrokecharge:id/txt_addCates").click()

#添加新类别
driver.find_element_by_class_name("android.widget.EditText").send_keys("话费")

#点击确定
driver.find_element_by_id("android:id/button1").click()
#点击左上角箭头退出
driver.find_element_by_id("com.mobivans.onestrokecharge:id/img_tm_back").click()



#点击 + 号
# driver.find_element_by_id('com.mobivans.onestrokecharge:id/main_write1').click()
driver.find_element_by_xpath(
    '//android.widget.LinearLayout[@resource-id="com.mobivans.onestrokecharge:id/main_write1"]').click()

#点击 话费。文本必须是双引号
driver.find_element_by_xpath('//android.widget.TextView[@text="话费"]').click()

#选择 备注
driver.find_element_by_id('com.mobivans.onestrokecharge:id/add_et_remark').send_keys("本月话费")

#输入金额
#输入 2
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_2').click()
#输入5
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_5').click()
#输入8
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_8').click()

#点击完成 按钮
driver.find_element_by_id('com.mobivans.onestrokecharge:id/keyb_btn_finish').click()

# #弹出登录窗口，点x。有时候没有
# driver.find_element_by_id("com.mobivans.onestrokecharge:id/guide_img_close").click()

#获取添加的记录文本信息
# yibijizhangtext = driver.find_element_by_xpath("//android.support.v7.widget.RecyclerView[@resource-id='com.mobivans.onestrokecharge:id/main_rv_list']/android.widget.LinearLayout[2]//android.widget.TextView[@resource-id='com.mobivans.onestrokecharge:id/account_item_txt_remark']").text
yibijizhangtext = driver.find_element_by_xpath("//*[@text='本月话费']").text

print(yibijizhangtext)
```

# 7\. 移动端测试补充内容2

## 一、移动端的生态

## 1.移动端系统的测试

对移动设备的软硬件作为一个整体去测试。

## 2.移动端应用的测试

对一款具体的应用进行测试。

## 二、移动端测试的类型

## 1.按系统来分

### Android

-   Java
-   Kotlin

### IOS

-   Objective-C（OS）
    
    C语言主体上加入面向对象的特性。
    
-   Swift
    
    苹果公司员工觉得Objective-C使用不便而设计的
    

## 2.按照架构来分

-   单机应用
-   C/S架构应用

## 3.按照设计方式来分

### Native App

`也叫本地应用`

-   优点
    -   原生语言开发，应用功能丰富，运行流畅，用户体验绝佳
    -   可以调用本地所有的资源
    -   可以与移动设备上所承载的全部硬件进行良好的交互

-   缺点
    
    -   开发成本高
        
    -   应用更新难
        
    -   应用发布难
        
        Android：应用商店应用众多，造成应用打包、发布、测试工作量暴涨，非常麻烦；
        
        IOS：应用市场就一个。应用审核流程非常慢
        

### Web App

-   优点
    
    -   几乎不用安装，大大节约了移动设备的存储空间
    -   应用更新不再是问题，服务商自己更新服务器即可
    -   天然跨平台
    -   轻量级、开发成本低
-   缺点
    
    -   对于网络重度依赖  
        断网会打不开网页；网速慢会加载图片缓慢。
    -   安全性不高
    -   能够实现的功能极其有限，很多移动设备上的硬件，可能无法操作

### Hybrid App

-   优点
    -   混合应用由于整合了Web App的部分，所以应用的体积变小了，能够节省存储空间。
    -   混合式应用可以利用Web App的部分来动态更新内容，达到新服务可以迅速推向用户的目的，从而避免了原来应用更新了，但是用户就是不更新的尴尬。
    -   混合式应用可以利用本地的部分去解决Web应用原有网络问题，以及无法使用系统本地软硬件资源的问题。
    -   混合式应用体验相对来说较好。不是指的用户体验，而是开发和用户共同的体验。
    -   开发成本相对可控。

## 三、移动端应用测试

## 1.功能测试

移动应用测试和Web应用测试没有分毫区别

## 2.易用性测试

-   显示布局是否适合移动端设备的屏幕
-   操作上是否适合移动端设备

## 3.兼容性测试

### 软件

-   IOS
-   Android
    -   版本碎片化
    -   国内厂商定制的Android

### 硬件

#### 屏幕

-   测试屏幕尺寸
-   测试屏幕分辨率
-   屏幕开孔。不同屏幕开孔不一样

#### 按键

-   物理按键：应用在有按键的手机是否能操作
-   虚拟按键

#### 网络

-   wifi
    
-   数据
    
-   蓝牙
    
    有通过蓝牙来聊天的应用
    
-   无线通信
    
    -   2G
        
        -   GSM
        -   CDMA/CDMA1X
    -   3G
        
        -   WCDMA
        -   TD-CDMA
        -   CDMA2000
    -   4G
        
        -   FDD-LTE
            
        -   TDD-LTE
            
    -   5G
        
        -   New Radio
        
        5G网络
        
        -   NSD
            
        -   SD
            

#### 传感器

-   定位
    -   GPS
    -   北斗
-   红外
-   NFC
-   陀螺仪
-   指纹
-   摄像头

## 4.可靠性测试

-   消息推送
-   <strong>中断测试</strong>

## 5.安全性测试

-   资金操作
-   <strong>权限测试</strong>

## 6.性能测试

### CPU

### 内存

### 电量

-   应用的低电测试
-   应用的耗电测试

### 存储

### 网络

-   一方面
    
    -   不同网络
    -   不同制式
-   另一方面
    
    -   弱网测试
        
        <strong>弱网指的是网络信号强度弱。</strong>不是网上所说的网络速度测试，这是网速快慢的测试。
        
        需要有设备测试：标准的屏蔽室、屏蔽室有无线信号发生仪。
        
        <strong>没仪器去找高楼大厦或地下停车库。</strong>
        
    -   没网测试
        

## 7.安装、卸载、更新

## 四、移动端系统测试

## 1.系统测试和应用测试区别

### 相同

测试要考虑的点是一样的

### 不同

就是测试时对于上述诸点测试的关注角度不同

## 五、小程序测试

## 六、构建移动云测平台

## 1.为什么需要云测平台

### 原因

-   多操作系统
-   国内各厂家定制版系统
-   设备硬件规格众多
-   系统碎片化严重

`用于移动端兼容性测试`

## 2.做怎样的移动云测平台

-   商业云测平台
-   企业内部云测平台

## 3.云测平台如何搭建

### 硬件准备

-   工业级USB HUB

### 软件准备

-   Appium

## 4.Appium工作原理

```plaintext
client运行脚本时，调用appiumAPI,向Appium Server端发送一条json格式数据的HTTP请求（请求内容就是根据Json Wire Protocol协议规定的一条JSON格式的数据；）

开启appium服务器的同时开启了监听端口（例如4724），Appium Server端收到请求后，解析出json数据并发送到手机端的中间件AndroidBootstrap.jar(iOS为BootStrip.js)

手机端接收到对应的请求后，通过AndroidBootstrap.jar翻译成UIAutomator能执行的命令，然后通过UIAutomator处理并操作APP完成测试

执行完成后将结果以json格式返回给Appniu Server,Appium Server又将结果返回给client。
```

![appium工作原理2](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC9UExURVlZWdPT07KysmRkZIWFhfT09JmZmWZmZm9vb39/fxkZGUxMTDMzM3p6epCQkKamppubm729venp6cjIyN7e3tbW1s/Pz8LCwnx8fLS0tFZWVoiIiI+Pj6GhoeTk5Glpabu7u93d3evr66CgoJSUlKqqqsnJyeDg4Hd3d8PDw+Xl5bi4uNHR0dvb26Ojo6urq+fn51hYWDg4OCgoKHBwcK2traenp0FBQe7u7vHx8U5OTre3t8zMzHV1df///7GrnpQAAAA/dFJOU///////////////////////////////////////////////////////////////////////////////////AI4mfBcAAAUGSURBVHja7NoJb6M4GMZxY0NCD64kve/pMZ2d3Z297+X7f6zFNmBAMUXa6URl/q9UJSWPUPzrizFWRUlNLgEBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYYIEFAVhggQUWWGBBABZYYIEFFlgQgAUWWGCBBRYEYIEFFlhggQUBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYn6cCIcRXgvX/h9qcIVBqDdbEM8RCxGCB9QqXYRwHYDHBgwXWl8eKZKiESHI3Ba1kWs3fKixcaJUl1YyeBm7Ocq+yLItUiVBGnXxenSHJolIKEcwHq6ikbOX1YGVzQCTN8LPmSLreghUl9sN4Uw7yajMrLC0TZ1ImzqY6FEop0+pIaEN5HaoOxVuwEqFyc4I46uSlzOLqgxlh6UaR9l3VYWl9Fdoxb1Q90KJtu41pwwFW/WHhTtW8i7TafLCqRsk6bsGw63L9qurXRmuIlbT9lDQnlXU+nBFW1Q2qnZbDprWa2tjR90LZFqx1/+Td/HpGWLlrLDvIwTcx6dQ1Vrntbig68cDms3JwbA5Y1azs1ger6sNV/bbIw1jU81MvNAGrl58RVn8ozW+btF08iGFoAlYvP3csfVur1gJBEIA1uBmue5dhZDOyO2epbmgCVi8/I6x0MMHH9pjsTfBhNzQBq5uPZoQlB0uH3DZG4EZqQ26fL3sZq5uf09Ih6qw3i/pm6BZO0qZX7rrUS68Xsbr5ZE4rePMk08pk9aUZugfqppvs6AM1Acvlo/StP+6EbW06z8hJqxbYp2BZPQUnFsLsKuhQdaHqn5ewbF7KXIn0jWO5MqOQ7RaNLPtbNMmmhimj0GUmYLl8Gs0Lq4wyPbTu1l2QKqHSouzs3OlDIslW5SQsnY/NXmFplyNvEuuLV/Tau9BzwiraDUSwXmysztYWWNtL1psXeumgIrDGaqXvBfUuvtqUYI3V2t1wk1e2msFluJJm6zDJXv/fIfjPP7DAAgsssCiwwAILLLDAosACCyywwAKLAgsssMACC6zt9fDz/v75tyOB+98PD2+ORgKffjw4OP1uJPDxl+Xy8v1I4MPF3t7VNyOB4/vF4uzdzrG+39f1kz/w66Guv/yBvw90KX/gZKkr8Qf+2dOV+gNHC12/7RxrabD2/a31bLAO/a11YbAO/K21MFhLf2s9Gqw9f2vdGqzFu11jnVusE2/gxmI9eQOnFuvYG7i0WH7uK4t15w2cWazrXWP9a7H8f/bQYvm/6IPF+sF/pVssf19Ii/WH/0K2WH/uGuvEWC39gSdj9Twy+Rqri5EZx1gt/IE7Y/XoD1wbq9vd3w1PlufnD2OBp+ebm/uxwPHF6emnscDR4vLy41jg7vHq6sNY4Pr27OyYdRaLUrDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssL6u+k+AAQCR9eHtLKvLfwAAAABJRU5ErkJggg==)

### Appium如何多机测试

-   一部手机，需要在一台电脑上启动2个线程，准备2个可用的通信端口。这2个线程一个用来运行测试脚本，一个用来运行Appium Server,最后电脑和手机通过usb线连接其中利用了adb来控制手机动起来。
-   那么3部手机，就需要6个线程，6个可用的通信端口

![Appium多机原理2](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC9UExURVlZWdPT07KysmRkZIWFhfT09JmZmWZmZm9vb39/fxkZGUxMTDMzM3p6epCQkKamppubm729venp6cjIyN7e3tbW1s/Pz8LCwnx8fLS0tFZWVoiIiI+Pj6GhoeTk5Glpabu7u93d3evr66CgoJSUlKqqqsnJyeDg4Hd3d8PDw+Xl5bi4uNHR0dvb26Ojo6urq+fn51hYWDg4OCgoKHBwcK2traenp0FBQe7u7vHx8U5OTre3t8zMzHV1df///7GrnpQAAAA/dFJOU///////////////////////////////////////////////////////////////////////////////////AI4mfBcAAAUGSURBVHja7NoJb6M4GMZxY0NCD64kve/pMZ2d3Z297+X7f6zFNmBAMUXa6URl/q9UJSWPUPzrizFWRUlNLgEBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYYIEFAVhggQUWWGBBABZYYIEFFlgQgAUWWGCBBRYEYIEFFlhggQUBWGCBBRZYYEEAFlhggQUWWBCABRZYYIEFFgRggQUWWGCBBQFYYIEFFlhgQQAWWGCBBRZYEIAFFlhggQUWBGCBBRZYn6cCIcRXgvX/h9qcIVBqDdbEM8RCxGCB9QqXYRwHYDHBgwXWl8eKZKiESHI3Ba1kWs3fKixcaJUl1YyeBm7Ocq+yLItUiVBGnXxenSHJolIKEcwHq6ikbOX1YGVzQCTN8LPmSLreghUl9sN4Uw7yajMrLC0TZ1ImzqY6FEop0+pIaEN5HaoOxVuwEqFyc4I46uSlzOLqgxlh6UaR9l3VYWl9Fdoxb1Q90KJtu41pwwFW/WHhTtW8i7TafLCqRsk6bsGw63L9qurXRmuIlbT9lDQnlXU+nBFW1Q2qnZbDprWa2tjR90LZFqx1/+Td/HpGWLlrLDvIwTcx6dQ1Vrntbig68cDms3JwbA5Y1azs1ger6sNV/bbIw1jU81MvNAGrl58RVn8ozW+btF08iGFoAlYvP3csfVur1gJBEIA1uBmue5dhZDOyO2epbmgCVi8/I6x0MMHH9pjsTfBhNzQBq5uPZoQlB0uH3DZG4EZqQ26fL3sZq5uf09Ih6qw3i/pm6BZO0qZX7rrUS68Xsbr5ZE4rePMk08pk9aUZugfqppvs6AM1Acvlo/StP+6EbW06z8hJqxbYp2BZPQUnFsLsKuhQdaHqn5ewbF7KXIn0jWO5MqOQ7RaNLPtbNMmmhimj0GUmYLl8Gs0Lq4wyPbTu1l2QKqHSouzs3OlDIslW5SQsnY/NXmFplyNvEuuLV/Tau9BzwiraDUSwXmysztYWWNtL1psXeumgIrDGaqXvBfUuvtqUYI3V2t1wk1e2msFluJJm6zDJXv/fIfjPP7DAAgsssCiwwAILLLDAosACCyywwAKLAgsssMACC6zt9fDz/v75tyOB+98PD2+ORgKffjw4OP1uJPDxl+Xy8v1I4MPF3t7VNyOB4/vF4uzdzrG+39f1kz/w66Guv/yBvw90KX/gZKkr8Qf+2dOV+gNHC12/7RxrabD2/a31bLAO/a11YbAO/K21MFhLf2s9Gqw9f2vdGqzFu11jnVusE2/gxmI9eQOnFuvYG7i0WH7uK4t15w2cWazrXWP9a7H8f/bQYvm/6IPF+sF/pVssf19Ii/WH/0K2WH/uGuvEWC39gSdj9Twy+Rqri5EZx1gt/IE7Y/XoD1wbq9vd3w1PlufnD2OBp+ebm/uxwPHF6emnscDR4vLy41jg7vHq6sNY4Pr27OyYdRaLUrDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssMCiwAILLLDAAosCCyywwAILLAossMACCyywKLDAAgsssL6u+k+AAQCR9eHtLKvLfwAAAABJRU5ErkJggg==)

## 5.云测平台搭建步骤

### 设计测试脚本

> 首先在利用一台手机，先去设计编写被测应用的测试脚本，并且确保调试通过。

-   获取来安装的指定apk包名和activity名字的方法
    
    -   直接从apk获取
        
        apk后缀添加.zip后解压，找AndroidManifest.xml文件，在里面找package，后面就是包名，需要人工删除空格
        
    -   aapt命令
        
        ```plaintext
        aapt dump badging *.apk | findstr "package launchable-activity"
        ```
        

### adb获取当前设备信息

-   利用adb devices命令获取当前系统连接的手机台数
    
-   通过adb devices还有可以获得设备名
    

### 查看系统版本号

```plaintext
#语法
adb -s 设备名shell getprop ro.build.version.release

#例子
adb -s emulator-5556 shell getprop ro.build.version.release
```

### 为每一台设备准备两个端口号port和bp-port

-   每一台手机需要在PC端启动2个线程，每个线程都需要1个端口。
    
-   端口号前提没被占用，建议指定1000以上端口号。
    

### 检测端口是否被占用

对于上面的端口号可以利用socket连接来检测是否被其他占用。如果我们的检测程序`顺利建立连接，意味着该端口有系统其他程序占用`；如果检测程序`无法建立连接，报错，这意味着该端口无人使用`，我们拿来`备用`

### 利用多线程去分别为每一台设备启动2个线程

-   一个线程用于运行测试脚本，一个线程用于运行Appium Server。
-   先启动Appium Server最后再运行脚本。由于Appium Server启动慢，所以待该线程启动一段时间后，方可启动测试脚本。

```plaintext
#Appium Server启动命令
appium -p port -bp bp_port --device-name device_name --platform-version platform-version
```

### 测试脚本中要有异常捕获和处理

对于错误能够保存错误信息，能够有错误现场图片，最好还能有测试脚本的运行日志。

```plaintext
appium --log-level info --log-timestamp
```

```plaintext
#可以和appium server拼接
appium -p port -bp bp_port --device-name device_name --platform-version platform-version --log-level info --log-timestamp
```

### 测试完毕能够生成完备的测试报告

## 6.脚本

### 单机

onestroketest.py

```python
#! /usr/bin/env python
# -*- coding: utf-8 -*-

from appium import webdriver
import os
import time


class OneStrokeTest:

    def __init__(self, device_name, platform_version, port):
        app_path = os.path.join(os.getcwd(), 'yibijizhang.apk')
        self.device_name = device_name
        self.deseried_caps = {
            'automationName': 'uiAutomator1',
            'platformName': 'Android',
            'platformVersion': platform_version,
            'deviceName': self.device_name,
            'appPackage': 'com.mobivans.onestrokecharge',
            'appActivity': 'com.stub.stub01.Stub01',
            'app': app_path,
            'unicodeKeyboard': 'true'
        }
        self.url = f'http://127.0.0.1:{port}/wd/hub'

    def start_test(self):
        driver = webdriver.Remote(self.url, self.deseried_caps)
        driver.implicitly_wait(60)
        try:
            # 注意text属性本来应该用find_element_by_name，但是现在版本的appium这个方法支持有问题，不可用
            # 所以我们使用find_element_by_android_uiautomator方法，其中写的是android内置测试框架uiAutomator
            # 的java代码，所以这里必须注意引号的用法外单内双，不能反过来。
            driver.find_element_by_android_uiautomator('text("记一笔")').click()
            driver.scroll(driver.find_element_by_android_uiautomator('text("医疗")'),
                          driver.find_element_by_android_uiautomator('text("餐饮")'),
                          1000)
            driver.find_element_by_android_uiautomator('text("书籍")').click()
            editor = driver.find_element_by_id('add_et_remark')
            editor.clear()
            editor.send_keys('购买学习书籍。')
            driver.find_element_by_id('keyb_btn_2').click()
            driver.find_element_by_id('keyb_btn_3').click()
            driver.find_element_by_id('keyb_btn_9').click()
            driver.find_element_by_id('keyb_btn_finish').click()
            driver.find_element_by_android_uiautomator('text("长按记录可删除")').click()
            remarks = driver.find_elements_by_id('account_item_txt_remark')
            money = driver.find_elements_by_id('account_item_txt_money')
            if remarks[0].text == '购买学习书籍。' and money[0].text == '-239':
                print('test success.')
            else:
                print('test fail.')
        except Exception as e:
            with open(f'./report/{self.device_name}_error.log', 'w') as f:
                f.write(str(e))
            # now = time.strftime('%Y%m%d%H%M%S')
            now = int(time.time())
            driver.get_screenshot_as_file(f'./report/{self.device_name}_{now}.png')
        finally:
            driver.quit()
        print('script over.')


if __name__ == '__main__':
    OneStrokeTest('emulator-5554', '5.0.2', 4723).start_test()
```

### 多机

mobile\_cloud.py

调用

```python
#! /usr/bin/env python
# -*- coding: utf-8 -*-

import os
import time
import socket
import threading

from training.class43.CBT.CloudTest.onestroketest import OneStrokeTest


class MobileCloud:

    # 获取当前系统的设备信息
    def get_device_info(self):
        port = 5000
        bp_port = 8000
        # 利用adb devices命令获取当前系统的设备列表
        devices = os.popen('adb devices').read().strip().splitlines()
        # 剔除首行的无用信息
        devices.pop(0)
        infors = []
        for device in devices:
            device_name = device.split('\t')[0].strip()
            # 利用adb -s 设备名 shell getprop ro.build.version.release命令获取指定设备的版本号
            platform_version = os.popen(f'adb -s {device_name} shell getprop'
                                        f' ro.build.version.release').read().strip()
            # 分别查找当前系统可用的端口号
            port = self.find_port(port)
            bp_port = self.find_port(bp_port)
            # 把已经准备好的设备信息以元组的形式添加到设备列表中
            infors.append((device_name, platform_version, port, bp_port))
            # 这里切记不可漏掉下面的加1动作
            port += 1
            bp_port += 1
        return infors

    # 定义一个查找当前系统可用端口的方法。
    def find_port(self, port):
        while self.check_port(port):
            port += 1
        return port

    # 定义一个检查指定端口是否占用的方法，占用返回True，否则返回Flase。
    def check_port(self, port):
        # 构造一个socket连接对象，注意使用的是tcp连接方式
        con = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            # connectex和connect方法一样都是去连接指定ip端口，但是前者是有返回值的，而后者没有返回值
            # connectex返回值是0，代表连接成功，如果不是0，代表连接错误
            # connect方法没有返回值，如果连接不成功就会抛出socket.error的错误，否则就不会有错误抛出。
            con.connect(('127.0.0.1', port))
            con.shutdown(socket.SHUT_RDWR)
            return True
        except socket.error:
            return False

    # 构造appium server启动的命令
    # appium -p port -bp bp_port --device-name device_name --platform-version platform_version
    #  --log log_file --log-level info --log-timestamp
    def start_appium(self, device_name, platform_version, port, bp_port):
        log_file = os.path.join(os.getcwd(), f'report/{device_name}_appium.log')
        cmd = f'appium -p {port} -bp {bp_port} --device-name {device_name}' \
              f' --platform-version {platform_version} --log {log_file} --log-level info' \
              f' --log-timestamp'
        os.system(cmd)

    def start_test(self):
        devices = self.get_device_info()
        threads = []
        for index, device in enumerate(devices):
            ost = OneStrokeTest(*device[:3])
            # 注意这里一定不要掉错了方法，client线程要调用测试脚本的测试方法
            # server线程要调用appium server启动的方法
            client_thread = threading.Thread(target=ost.start_test, name=f'client-{index}')
            server_thread = threading.Thread(target=self.start_appium, args=(*device,),
                                             name=f'server-{index}')
            threads.append(server_thread)
            threads.append(client_thread)
        # 当前的线程顺序是
        # server-0, client-0, server-1, client-1, ……, server-n, client-n
        # 想要把线程顺序调整为
        # server-0, server-1, ……, server-n, client-0, client-1, ……, client-n
        threads.sort(key=lambda t: t.getName()[:1], reverse=True)
        # 优先启动appium server的线程，确保测试脚本线程后启动
        # 设置appium server线程为守护线程的目的是在主线程执行结束的时候，能跟随主线程一起结束
        for t in threads:
            if t.getName() == 'client-0':
                time.sleep(30)
            # 设置守护线程，只要主线程运行结束，这个线程就可以结束了。
            t.setDaemon(True)
            t.start()
        # 设置测试脚本线程阻塞的目的是要保证所有的测试脚本线程执行完毕，主线程才可以结束。
        for t in threads:
            if t.getName().startswith('client'):
                # 设置线程阻塞，目的是确保主线程必须等待所有的测试脚本线程执行完毕方可结束
                t.join()
        # 杀掉可能存在的node.exe进程，避免下次运行appium server不能正常启动。
        os.system('taskkill /f /im node.exe')
        print('************ 全部测试完成 *************')


if __name__ == '__main__':
    MobileCloud().start_test()
```
