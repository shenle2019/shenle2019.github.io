---
title: linux 命令
date: 2023-11-12T23:53:35.000Z
permalink: 2023/11/13/linux-命令/
categories:
  - 测试
tags:
  - 测试开发
---

一、 测试人员掌握Linux的理由  
1.拓宽你的技能栈  
对于软件测试人员来说，测试的任何产品都基于操作系统，如常见的Windows、Android、Ios、Linux系统等。熟练使用操作系统本身就是测试人员的基本功。而随着对操作系统内核的深入理解和掌握，对提高测试能力大有帮助，也有利于测试得更加深入。  
Linux系统是与windows系统截然不同的操作系统，它们的设计理念、内核原理有着巨大的差异。一种内核原理对应着它独有的一片天地，掌握一种操作系统，就掌握了该操作系统下的那片天地：处理器管理、存储器管理、文件管理、设备管理、安全性、内核结构、系统特性等。掌握这些内容，不仅增长学识，也是你测试能力向深层次提高的关键一步。  
unix和Linux的家族足够庞大，就连移动端操作系统IOS和Android，也分别是基于Unix和Linux而衍生出来的作品。掌握了Linux，也就自然而然地熟知Android、Ios、Mac OS X等系统。熟悉了Linux系统的命令行操作，对Android的shell，adb shell命令、Mac OS X的shell的熟悉自然不在话下。Linux还是最佳的也是应用最多的服务器端操作系统。  
所以，掌握了它，相当于get了一堆技能。

2.改变你的操作和思维习惯  
windows的图形化操作深深地影响了测试人员，尤其是功能测试人员。从我们第一次接触电脑开始，一直到现在，windows的图形化操作已经变成我们潜意识中的思维习惯。  
习惯甚至安逸于图形化的操作，长远看，对于测试人员自身素质的培养是有阻力的。  
Linux的命令行操作会改变你的操作习惯和思维习惯。它使你的双手能够更加密切地配合和协作，更好更快地完成各项工作。  
图形化界面虽然好看易用，但解决问题还得靠命令行。

3.编程捷径  
想要成为一个有“钱途”的测试人员，不会编程是硬伤。熟悉了Linux的命令行操作，你将会对所有的命令行操作有着天然的喜欢和自通，哪怕是windows的dos命令。  
Linux的几乎每个命令（工具）都很好用，有些甚至很强大，如awk、sed、vim、sar等等，就拿awk来说，它在许多场合下被称作是编程语言——处理文本数据的编程语言。  
尤其是功能测试人员，掌握了Linux命令，可谓是以最便捷、最低成本的方式打开了编程的大门，因为会使用Linux命令离会shell编程仅半步之遥。

二、 Linux常用命令的实际使用

一般运维同学会对Linux操作系统比较熟悉，面试中问到测试同学，很多只会基本目录操作的一些命令和看打印日志的命令等，没有更深入的理解和使用。  
现在我们来介绍一下Linux常用命令在日常中的使用，帮助大家巩固下基础。

1.怎么使一个命令在后台运行?

一般都是使用 & 在命令结尾来让程序自动运行。(命令后可以不追加空格)  
经常应用于后台执行脚本，不需要一直在前台打印或者等待的任务。  
sleep 100&

2.哪个命令专门用来查看后台任务?  
jobs \[-lrs\]  
\-l：除了列出job number与命令串之外，同时列出PID的号码  
\-r：仅列出正在后台run的工作  
\-s：仅列出正在后台当中暂停（stop）的工作

3.终止进程用什么命令? 带什么参数?

kill \[-s <信息名称或编号>\]\[程序\] 或 kill \[-l <信息编号>\]  
kill-9 pid  
其中pid可以根据ps -ef|grep 进程名得到

4.搜索文件用什么命令? 格式是怎么样的?

find <指定目录> <指定条件> <指定动作>  
whereis 加参数与文件名  
locate 只加文件名

find 直接搜索磁盘，较慢。  
find ./ -name “string\*”

5.查看当前谁在使用该主机用什么命令? 查找自己所在的终端信息用什么命令?

查找自己所在的终端信息：who am i

查看当前谁在使用该主机：who

6.使用什么命令查看用过的命令列表?  
history # 查看历史命令 保留1000个历史命令，超出会将最老的删除  
！951 # 可以根据查得命名编号直接在其前个感叹号执行这个编号对应的命令

7.使用什么命令查看磁盘使用空间？ 空闲空间呢?  
df -hl  
文件系统 容量 已用 可用 已用% 挂载点  
Filesystem Size Used Avail Use% Mounted on /dev/hda2 45G 19G 24G 44% /  
/dev/hda1 494M 19M 450M 4% /boot

8.使用什么命令查看网络是否连通?

netstat，常用查看端口是否被占用 netstat -anp|grep 端口号  
显示详细的网络状况：# netstat -a  
详解：[https://www.runoob.com/linux/linux-comm-netstat.html](https://www.runoob.com/linux/linux-comm-netstat.html)

使用什么命令查看 ip 地址及接口信息？  
ifconfig 详解：[https://www.runoob.com/linux/linux-comm-ifconfig.html](https://www.runoob.com/linux/linux-comm-ifconfig.html)

9.怎么对命令进行取别名？  
alias la=’ls -a’

10.du 和 df 的定义，以及区别？  
du 显示目录或文件的大小

df 显示每个<文件>所在的文件系统的信息，默认是显示所有文件系统。  
（文件系统分配其中的一些磁盘块用来记录它自身的一些数据，如 i 节点，磁盘分布图，间接块，超级块等。这些数据对大多数用户级的程序来说是不可见的，通常称为 Meta Data。） du 命令是用户级的程序，它不考虑 Meta Data，而 df 命令则查看文件系统的磁盘分配图并考虑 Meta Data。  
df 命令获得真正的文件系统数据，而 du 命令只查看文件系统的部分情况。

常用du -sh \*|sort -nr，du -sh \* 2>/dev/null|sort -nr,du -sh \* 2>/dev/null|grep M|sort -nr

11.如果一个linux新手想要知道当前系统支持的所有命令的列表，他需要怎么做？  
使用命令compgen -c，可以打印出所有支持的命令列表。

12.远程登录linux主机：ssh

ssh \[-l login\_name\] \[-p port\] \[user@\]hostname  
ssh 192.168.0.11  
ssh -l root 192.168.0.11 或 ssh [root@192.168.0.11](mailto:root@192.168.0.11) //指定用户  
ssh -l root -p 12333 216.230.230.114

13.远程拷贝：scp  
scp -r /home/administrator/test/ [root@192.168.1.100](mailto:root@192.168.1.100):/root/ //拷贝本机/home/administrator/test整个目录至远程主机192.168.1.100的/root目录下  
scp /home/administrator/Desktop/old/driver/test/test.txt [root@192.168.1.100](mailto:root@192.168.1.100):/root/ //拷贝单个文件至远程主机  
scp -r [root@192.168.62.10](mailto:root@192.168.62.10):/root/ /home/administrator/Desktop/new/ //远程文件/文件夹下载

14.查看系统与内核相关信息：uname  
uname \[-asrmpi\]  
\-a：所有系统相关的信息

15.查看内存使用情况：free  
free \[-b|-k|-m|-g\] \[-t\]  
\-b：直接输入free时，显示的是KB ，我们可以使用b（bytes）、m（MB），k（KB）及g（GB）来显示单位  
\-t：在输出的最终结果中显示物理内存与swap的总量

16.文件比较工具：diff

diff \[-bBi\] from-filr to-file

17.sed  
[https://www.runoob.com/linux/linux-comm-sed.html](https://www.runoob.com/linux/linux-comm-sed.html)  
Linux sed 命令是利用脚本来处理文本文件。  
sed 可依照脚本的指令来处理、编辑文本文件。  
Sed 主要用来自动编辑一个或多个文件、简化对文件的反复操作、编写转换程序等。

常用：sed -i ‘s/要被取代的字串/新的字串/g’

18.awk  
[https://www.runoob.com/linux/linux-comm-awk.html](https://www.runoob.com/linux/linux-comm-awk.html)  
常用：awk ‘{\[pattern\] action}’ {filenames} # 行匹配语句 awk ‘’ 只能用单引号  
awk ‘{print $1,$4}’ log.txt

19.source  
source命令是一个内置的shell命令，用于从当前shell会话中的文件读取和执行命令。source命令通常用于保留、更改当前shell中的环境变量。简而言之，source一个脚本，将会在当前shell中运行execute命令。  
source FILENAME \[ARGUMENTS\]  
. FILENAME \[ARGUMENTS\]  
常用：source /etc/profile

系统性能的常用命令，单独列出：  
1.如何看当前Linux系统有几颗物理CPU和每颗CPU的核数？  
\[root@centos6 ~ 10:55 #35\]# cat /proc/cpuinfo|grep -c ‘physical id’  
4  
\[root@centos6 ~ 10:56 #36\]# cat /proc/cpuinfo|grep -c ‘processor’  
4  
2.查看系统负载有两个常用的命令，是哪两个？这三个数值表示什么含义呢？  
\[root@centos6 ~ 10:56 #37\]# w  
10:57:38 up 14 min, 1 user, load average: 0.00, 0.00, 0.00  
USER TTY FROM LOGIN@ IDLE JCPU PCPU WHAT  
root pts/0 192.168.147.1 18:44 0.00s 0.10s 0.00s w  
\[root@centos6 ~ 10:57 #38\]# uptime  
10:57:47 up 14 min, 1 user, load average: 0.00, 0.00, 0.00  
其中load average即系统负载，三个数值分别表示一分钟、五分钟、十五分钟内系统的平均负载，即平均任务数。

3.vmstat r, b, si, so, bi, bo 这几列表示什么含义呢？  
\[root@centos6 ~ 10:57 #39\]# vmstat  
procs ———–memory———- —swap– —–io—- –system– —–cpu—–  
r b swpd free buff cache si so bi bo in cs us sy id wa st  
0 0 0 1783964 13172 106056 0 0 29 7 15 11 0 0 99 0 0

r即running，表示正在跑的任务数  
b即blocked，表示被阻塞的任务数  
si表示有多少数据从交换分区读入内存  
so表示有多少数据从内存写入交换分区  
bi表示有多少数据从磁盘读入内存  
bo表示有多少数据从内存写入磁盘

简记：  
i –input，进入内存  
o –output，从内存出去  
s –swap，交换分区  
b –block，块设备，磁盘  
单位都是KB

补充：yum install sysstat  
iostat  
iostat -d -x -k 1 1 # 【-d 显示磁盘使用情况，-x 显示详细信息】

补充知识：  
1.计算机系统中的数据采用二进制存储的，8位构成1字节。

即 1byte(简写B) = 8bit  
1kB = 1024B = 2^10B  
1MB = 1024KB = 2^20B  
1GB = 1024MB = 2^30B  
1TB = 1024GB = 2^40B  
1PB = 1024TB = 2^50B  
1EB = 1024PB = 2^60B  
1ZB = 1024EB = 2^70B  
1YB = 1024ZB = 2^80B  
1BB = 1024YB = 2^90B  
1NB = 1024BB = 2^100B  
1DB = 1024NB = 2^110B

2.而我们使用的硬盘的是采用十进制计算磁盘空间，  
    1TB=1000GB  
    1GB=1000MB  
    1MB=1000KB  
     所以我们所购买的硬盘格式化后会有空间会变小，因为采用两种不同的计量方法，例如硬盘厂商标注1TB硬盘，格式化后实际容量只有1000\*1000^3/1024^3=931GB.

4.linux系统里，您知道buffer和cache如何区分吗？

buffer和cache都是内存中的一块区域，当CPU需要写数据到磁盘时，由于磁盘速度比较慢，所以CPU先把数据存进buffer，然后CPU去执行其他任务，buffer中的数据会定期写入磁盘；当CPU需要从磁盘读入数据时，由于磁盘速度比较慢，可以把即将用到的数据提前存入cache，CPU直接从Cache中拿数据要快的多。

5.使用top查看系统资源占用情况时，哪一列表示内存占用呢？  
PID USER PR NI VIRT RES SHR S %CPU %MEM TIME+ COMMAND  
301 root 20 0 0 0 0 S 0.3 0.0 0:00.08 jbd2/sda3-8  
1 root 20 0 2900 1428 1216 S 0.0 0.1 0:01.28 init  
2 root 20 0 0 0 0 S 0.0 0.0 0:00.00 kthreadd  
3 root RT 0 0 0 0 S 0.0 0.0 0:00.00 migration/0

VIRT虚拟内存用量  
RES物理内存用量  
SHR共享内存用量  
%MEM内存用量

6.如何实时查看网卡流量为多少？如何查看历史网卡流量？  
安装sysstat包，使用sar命令查看。  
yum install -y sysstat#安装sysstat包，获得sar命令  
sar -n DEV#查看网卡流量，默认10分钟更新一次  
sar -n DEV 1 10#一秒显示一次，一共显示10次  
sar -n DEV -f /var/log/sa/sa22#查看指定日期的流量日志

7.如何查看当前系统都有哪些进程？

ps -aux 或者ps -elf

\[root@centos6 ~ 13:20 #56\]# ps -aux  
Warning: bad syntax, perhaps a bogus ‘-‘? See /usr/share/doc/procps-3.2.8/FAQ  
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND  
root 1 0.0 0.0 2900 1428 ? Ss 10:43 0:01 /sbin/init  
root 2 0.0 0.0 0 0 ? S 10:43 0:00 \[kthreadd\]  
root 3 0.0 0.0 0 0 ? S 10:43 0:00 \[migration/0\]  
root 4 0.0 0.0 0 0 ? S 10:43 0:00 \[ksoftirqd/0\]  
……  
\[root@centos6 ~ 13:21 #57\]# ps -elf  
F S UID PID PPID C PRI NI ADDR SZ WCHAN STIME TTY TIME CMD  
4 S root 1 0 0 80 0 - 725 - 10:43 ? 00:00:01 /sbin/init  
1 S root 2 0 0 80 0 - 0 - 10:43 ? 00:00:00 \[kthreadd\]  
1 S root 3 2 0 -40 - - 0 - 10:43 ? 00:00:00 \[migration/0\]  
1 S root 4 2 0 80 0 - 0 - 10:43 ? 00:00:00 \[ksoftirqd/0\]  
1 S root 5 2 0 -40 - - 0 - 10:43 ? 00:00:00 \[migration/0\]

8.ps 查看系统进程时，有一列为STAT， 如果当前进程的stat为Ss 表示什么含义？如果为Z表示什么含义？  
S表示正在休眠；s表示主进程；Z表示僵尸进程。

9.如何查看系统都开启了哪些端口？  
\[root@centos6 ~ 13:20 #55\]# netstat -lnp  
Active Internet connections (only servers)  
Proto Recv-Q Send-Q Local Address Foreign Address State PID/Program name  
tcp 0 0 0.0.0.0:22 0.0.0.0:\* LISTEN 1035/sshd  
tcp 0 0 :::22 :::\* LISTEN 1035/sshd  
udp 0 0 0.0.0.0:68 0.0.0.0:\* 931/dhclient  
Active UNIX domain sockets (only servers)  
Proto RefCnt Flags Type State I-Node PID/Program name Path  
unix 2 \[ ACC \] STREAM LISTENING 6825 1/init @/com/ubuntu/upstart  
unix 2 \[ ACC \] STREAM LISTENING 8429 1003/dbus-daemon /var/run/dbus/system\_bus\_socket

10.如何查看网络连接状况？  
\[root@centos6 ~ 13:22 #58\]# netstat -an  
Active Internet connections (servers and established)  
Proto Recv-Q Send-Q Local Address Foreign Address State  
tcp 0 0 0.0.0.0:22 0.0.0.0:\* LISTEN  
tcp 0 0 192.168.147.130:22 192.168.147.1:23893 ESTABLISHED  
tcp 0 0 :::22 :::\* LISTEN  
udp 0 0 0.0.0.0:68 0.0.0.0:\*  
……

11.想修改ip，需要编辑哪个配置文件，修改完配置文件后，如何重启网卡，使配置生效？  
使用vi或者vim编辑器编辑网卡配置文件/etc/sysconfig/network-scripts/ifcft-eth0（如果是eth1文件名为ifcft-eth1），内容如下：  
DEVICE=eth0  
HWADDR=00:0C:29:06:37:BA  
TYPE=Ethernet  
UUID=0eea1820-1fe8-4a80-a6f0-39b3d314f8da  
ONBOOT=yes  
NM\_CONTROLLED=yes  
BOOTPROTO=static  
IPADDR=192.168.147.130  
NETMASK=255.255.255.0  
GATEWAY=192.168.147.2  
DNS1=192.168.147.2  
DNS2=8.8.8.8

修改网卡后，可以使用命令重启网卡：  
ifdown eth0  
ifup eth0

也可以重启网络服务：  
service network restart

12.用户的任务计划 [https://www.runoob.com/linux/linux-comm-crontab.html](https://www.runoob.com/linux/linux-comm-crontab.html)

Linux crontab是用来定期执行程序的命令。

当安装完成操作系统之后，默认便会启动此任务调度命令。

crond 命令每分锺会定期检查是否有要执行的工作，如果有要执行的工作便会自动执行该工作。

注意：新创建的 cron 任务，不会马上执行，至少要过 2 分钟后才可以，当然你可以重启 cron 来马上执行。

而 linux 任务调度的工作主要分为以下两类：

1、系统执行的工作：系统周期性所要执行的工作，如备份系统数据、清理缓存  
2、个人执行的工作：某个用户定期要做的工作，例如每隔10分钟检查邮件服务器是否有新信，这些工作可由每个用户自行设置

crontab \[ -u user \] { -l | -r | -e }

-   -   -   -   -   program

* * *

| | | | |  
| | | | +—– 星期中星期几 (0 - 6) (星期天 为0)  
| | | +———- 月份 (1 - 12)  
| | +————— 一个月中的第几天 (1 - 31)  
| +——————– 小时 (0 - 23)  
+————————- 分钟 (0 - 59)

13.某个账号登陆linux后，系统会在哪些日志文件中记录相关信息？  
用户身份验证过程记录在/var/log/secure中，登录成功的信息记录在/var/log/wtmp。

14.网卡或者硬盘有问题时，我们可以通过使用哪个命令查看相关信息？  
使用命令dmesg

15.分别使用xargs和exec实现这样的需求，把当前目录下所有后缀名为.txt的文件的权限修改为777  
（1）find ./ -type f -name “*.txt” |xargs chmod 777  
（2）find ./ -type f -name “*.txt” -exec chmod 777 {} ;

16.在Linux系统下如何按照下面要求抓包：只过滤出访问http服务的，目标ip为192.168.0.111，一共抓1000个包，并且保存到1.cap文件中？  
tcpdump -nn -s0 host 192.168.0.111 and port 80 -c 1000 -w 1.cap

17.想在Linux命令行下访问某个网站，并且该网站域名还没有解析，如何做？  
在/etc/hosts文件中增加一条从该网站域名到其IP的解析记录即可，或者使用curl -x

18.自定义解析域名的时候，我们可以编辑哪个文件？是否可以一个ip对应多个域名？是否一个域名对应多个ip？  
编辑 /etc/hosts ,可以一个ip对应多个域名，不可以一个域名对多个ip

19.有一天你突然发现公司网站访问速度变的很慢很慢，你该怎么办呢？  
（服务器可以登陆，提示：你可以从系统负载和网卡流量入手）  
可以从两个方面入手分析：分析系统负载，使用w命令或者uptime命令查看系统负载，如果负载很高，则使用top命令查看CPU，MEM等占用情况，要么是CPU繁忙，要么是内存不够，如果这二者都正常，再去使用sar命令分析网卡流量，分析是不是遭到了攻击。一旦分析出问题的原因，采取对应的措施解决，如决定要不要杀死一些进程，或者禁止一些访问等。

附录1：补充一些Linux操作系统的基础知识Linux是一类Unix计算机操作系统的统称。Linux操作系统是自由软件和开放源代码发展中最著名的例子。严格来讲，Linux这个词本身只表示Linux内核，但在实际上人们已经习惯了用Linux来形容整个基于Linux内核，并且使用GNU 工程各种工具和数据库的操作系统。当前最常用的linux操作系统就是redhat linux。特定用途的Linux发行版，CenterOS（基于Red Hat）和Ubuntu较为常见

Linux的组成及内核

1.Linux的组成  
Linux内核  
GNU实用程序  
图形桌面环境  
应用软件  
2.Linux内核  
内核主要功能：系统内存管理；软件程序管理；硬件管理；文件系统管理

Linux文件系统  
Linux继承了Unix操作系统结构清晰的特点。在linux下的文件结构非常有条理。但是，上述的优点只有在对linux相当熟悉时，才能体会到。  
　　linux下一些主要目录的功用:

/bin 二进制可执行命令/dev 设备特殊文件/etc 系统管理和配置文件/etc/rc.d 启动的配置文件和脚本/home 用户主目录的基点，比如用户user的主目录就是/home/user，可以用~user表示/lib 标准程序设计库，又叫动态链接共享库，作用类似windows里的.dll文件/sbin 系统管理命令，这里存放的是系统管理员使用的管理程序  
/tmp 公用的临时文件存储点/root 系统管理员的主目录（呵呵，特权阶级）/mnt 系统提供这个目录是让用户临时挂载其他的文件系统。/lost+found 这个目录平时是空的，系统非正常关机而留下“无家可归”的文件（windows下叫什么.chk）就在这里/proc 虚拟的目录，是系统内存的映射。可直接访问这个目录来获取系统信息。  
/var 某些大文件的溢出区，比方说各种服务的日志文件  
/usr 最庞大的目录，要用到的应用程序和文件几乎都在这个目录。其中包含：/usr/X11R6 存放X window的目录/usr/bin 众多的应用程序/usr/sbin 超级用户的一些管理程序/usr/doc linux文档/usr/include linux下开发和编译应用程序所需要的头文件/usr/lib 常用的动态链接库和软件包的配置文件/usr/man 帮助文档/usr/src 源代码，linux内核的源代码就放在/usr/src/linux里/usr/local/bin 本地增加的命令/usr/local/lib 本地增加的库

下面列举的一些常用命令，如果不会的，请自行练习熟悉。参考[https://www.runoob.com/linux/linux-command-manual.html](https://www.runoob.com/linux/linux-command-manual.html)

# 关机/重启/注销

常用命令

作用

shutdown -h now

即刻关机

shutdown -h 10

10分钟后关机

shutdown -h 11:00

11：00关机

shutdown -h +10

预定时间关机（10分钟后）

shutdown -c

取消指定时间关机

shutdown -r now

重启

shutdown -r 10

10分钟之后重启

shutdown -r 11:00

定时重启

reboot

重启

init 6

重启

init 0

⽴刻关机

telinit 0

关机

poweroff

⽴刻关机

halt

关机

sync

buff数据同步到磁盘

logout

退出登录Shell

# 系统信息和性能查看

常用命令

作用

uname -a

查看内核/OS/CPU信息

uname -r

查看内核版本

uname -m

查看处理器架构

arch

查看处理器架构

hostname

查看计算机名

who

显示当前登录系统的⽤户

who am i

显示登录时的⽤户名

whoami

显示当前⽤户名

cat /proc/version

查看linux版本信息

cat /proc/cpuinfo

查看CPU信息

cat /proc/interrupts

查看中断

cat /proc/loadavg

查看系统负载

uptime

查看系统运⾏时间、⽤户数、负载

env

查看系统的环境变量

lsusb -tv

查看系统USB设备信息

lspci -tv

查看系统PCI设备信息

lsmod

查看已加载的系统模块

grep MemTotal /proc/meminfo

查看内存总量

grep MemFree /proc/meminfo

查看空闲内存量

free -m

查看内存⽤量和交换区⽤量

date

显示系统⽇期时间

cal 2021

显示2021⽇历表

top

动态显示cpu/内存/进程等情况

vmstat 1 20

每1秒采⼀次系统状态，采20次

iostat

查看io读写/cpu使⽤情况

查看io读写/cpu使⽤情况

查询cpu使⽤情况（1秒⼀次，共10次）

sar -d 1 10

查询磁盘性能

# 磁盘和分区

常用命令

作用

fdisk -l

查看所有磁盘分区

swapon -s

查看所有交换分区

df -h

查看磁盘使⽤情况及挂载点

df -hl

同上

du -sh /dir

查看指定某个⽬录的⼤⼩

du -sk \* | sort -rn

从⾼到低依次显示⽂件和⽬录⼤⼩

mount /dev/hda2 /mnt/hda2

挂载hda2盘

mount -t ntfs /dev/sdc1 /mnt/usbhd1

指定⽂件系统类型挂载（如ntfs）

mount -o loop xxx.iso /mnt/cdrom

挂 载 iso ⽂ 件

umount -v /dev/sda1

通过设备名卸载

umount -v /mnt/mymnt

通过挂载点卸载

fuser -km /mnt/hda1

强制卸载(慎⽤)

# ⽤户和⽤户组

常用命令

作用

useradd codesheep

创建⽤户

userdel -r codesheep

删除⽤户

usermod -g group\_name user\_name

修改⽤户的组

usermod -aG group\_name user\_name

将⽤户添加到组

usermod -s /bin/ksh -d /home/codepig –g dev codesheep

修改⽤户codesheep的登录Shell、主⽬录以及⽤户组

groups test

查看test⽤户所在的组

groupadd group\_name

创建⽤户组

groupdel group\_name

删除⽤户组

groupmod -n new\_name old\_name

重命名⽤户组

su - user\_name

su - user\_name

passwd

修改⼝令

passwd codesheep

修改某⽤户的⼝令

w

查看活动⽤户

id codesheep

查看指定⽤户codesheep信息

last

查看⽤户登录⽇志

crontab -l

查看当前⽤户的计划任务

cut -d: -f1 /etc/passwd

查看系统所有⽤户

cut -d: -f1 /etc/group

查看系统所有组

# ⽹络和进程管理

常用命令

作用

ifconfig

查看⽹络接⼝属性

ifconfig eth0

查看某⽹卡的配置

route -n

查看路由表

netstat -lntp

查看所有监听端⼝

netstat -antp

查看已经建⽴的TCP连接

netstat -lutp

查看TCP/UDP的状态信息

ifup eth0

启⽤eth0⽹络设备

ifdown eth0

禁⽤eth0⽹络设备

iptables -L

查看iptables规则

ifconfig eth0 192.168.1.1 netmask 255.255.255.0

配置ip地址

dhclient eth0

以dhcp模式启⽤eth0

route add -net 0/0 gw Gateway\_IP

配置默认⽹关

route add -net 192.168.0.0 netmask 255.255.0.0 gw 192.168.1.1

配置静态路由到达⽹络’192.168.0.0/16’

route del 0/0 gw Gateway\_IP

删除静态路由

hostname

查看主机名

host [www.baidu.com](http://www.baidu.com/)

解析主机名

nslookup [www.baidu.com](http://www.baidu.com/)

查询DNS记录，查看域名解析是否正常

ps -ef

查看所有进程

ps -ef | grep codesheep

过滤出你需要的进程

kill -s name

kill指定名称的进程

kill -s pid

kill指定pid的进程

top

实时显示进程状态

vmstat 1 20

每1秒采⼀次系统状态，采20次

iostat

iostat

sar -u 1 10

查询cpu使⽤情况（1秒⼀次，共10次）

sar -d 1 10

查询磁盘性能

# 常⻅系统服务命令

常用命令

作用

chkconfig –list

列出系统服务

service <服务名> status

查看某个服务

service <服务名> start

启动某个服务

service <服务名> stop

终⽌某个服务

service <服务名> restart

重启某个服务

systemctl status <服务名>

查看某个服务

systemctl start <服务名>

启动某个服务

systemctl stop <服务名>

终⽌某个服务

systemctl restart <服务名>

重启某个服务

systemctl enable <服务名>

关闭⾃启动

systemctl disable <服务名>

关闭⾃启动

# ⽂件和⽬录操作

常用命令

作用

cd <⽬录名>

进⼊某个⽬录

cd ..

回上级⽬录

cd ../..

回上两级⽬录

cd

进个⼈主⽬录

cd -

回上⼀步所在⽬录

pwd

显示当前路径

ls

查看⽂件⽬录列表

ls -F

查看⽬录中内容（显示是⽂件还是⽬录）

ls -l

查看⽂件和⽬录的详情列表

ls -a

查看隐藏⽂件

ls -lh

查看⽂件和⽬录的详情列表（增强⽂件⼤⼩易读性）

ls -lSr

查看⽂件和⽬录列表（以⽂件⼤⼩升序查看）

tree

查看⽂件和⽬录的树形结构

mkdir <⽬录名>

创建⽬录

mkdir dir1 dir2

同时创建两个⽬录

mkdir -p /tmp/dir1/dir2

创建⽬录树

rm -f file1

删除’file1’⽂件

rmdir dir1

删除’dir1’⽬录

rm -rf dir1

删除’dir1’⽬录和其内容

rm -rf dir1 dir2

同时删除两个⽬录及其内容

mv old\_dir new\_dir

重命名/移动⽬录

cp file1 file2

复制⽂件

cp dir/\* .

复制某⽬录下的所有⽂件⾄当前⽬录

cp -a dir1 dir2

复制⽬录

cp -a /tmp/dir1 .

复制⼀个⽬录⾄当前⽬录

ln -s file1 link1

创建指向⽂件/⽬录的软链接

ln file1 lnk1

创建指向⽂件/⽬录的物理链接

find / -name file1

从跟⽬录开始搜索⽂件/⽬录

find / -user user1

搜索⽤户user1的⽂件/⽬录

find /dir -name \*.bin

在⽬录/dir中搜带有.bin后缀的⽂件

locate <关键词>

快速定位⽂件

locate \*.mp4

寻找.mp4结尾的⽂件

whereis <关键词>

显示某⼆进制⽂件/可执⾏⽂件的路径

which <关键词>

查找系统⽬录下某的⼆进制⽂件

chmod ugo+rwx dir1

设置⽬录所有者(u)、群组(g)及其他⼈(o)的读（r）写(w)执⾏(x)权限

chmod go-rwx dir1

移除群组(g)与其他⼈(o)对⽬录的读写执⾏权限

chown user1 file1

改变⽂件的所有者属性

chown -R user1 dir1

改变⽬录的所有者属性

chgrp group1 file1

改变⽂件群组

chown user1:group1 file1

改变⽂件的所有⼈和群组

# ⽂件查看和处理

常用命令

作用

cat file1

查看⽂件内容

cat -n file1

查看内容并标示⾏数

tac file1

从最后⼀⾏开始反看⽂件内容

more file1

more file1

less file1

类似more命令，但允许反向操作

head -2 file1

查看⽂件前两⾏

tail -2 file1

查看⽂件后两⾏

tail -f /log/msg

实时查看添加到⽂件中的内容

grep codesheep hello.txt

在⽂件hello.txt中查找关键词codesheep

grep ^sheep hello.txt

在⽂件hello.txt中查找以sheep开头的内容

grep \[0-9\] hello.txt

选择hello.txt⽂件中所有包含数字的⾏

sed ‘s/s1/s2/g’ hello.txt

将hello.txt⽂件中的s1替换成s2

sed ‘/^$/d’ hello.txt

从hello.txt⽂件中删除所有空⽩⾏

sed ‘/ \*#/d; /^$/d’ hello.txt

从hello.txt⽂件中删除所有注释和空⽩⾏

sed -e ‘1d’ hello.txt

从⽂件hello.txt 中排除第⼀⾏

sed -n ‘/s1/p’ hello.txt

查看只包含关键词”s1”的⾏

sed -e ‘s/ \*$//‘ hello.txt

删除每⼀⾏最后的空⽩字符

sed -e ‘s/s1//g’ hello.txt

从⽂档中只删除词汇s1并保留剩余全部

sed -n ‘1,5p;5q’ hello.txt

查看从第⼀⾏到第5⾏内容

sed -n ‘5p;5q’ hello.txt

查看第5⾏

paste file1 file2

合并两个⽂件或两栏的内容

paste -d ‘+’ file1 file2

合并两个⽂件或两栏的内容，中间⽤”+”区分

sort file1 file2

排序两个⽂件的内容

comm -1 file1 file2

⽐较两个⽂件的内容(去除’file1’所含内容)

comm -2 file1 file2

⽐较两个⽂件的内容(去除’file2’所含内容

comm -3 file1 file2

⽐较两个⽂件的内容(去除两⽂件共有部分)

# 打包和解压

常用命令

作用

zip xxx.zip file

压缩⾄zip包

zip -r xxx.zip file1 file2 dir1

将多个⽂件+⽬录压成zip包

unzip xxx.zip

解压zip包

tar -cvf xxx.tar file

创建⾮压缩tar包

tar -cvf xxx.tar file1 file2 dir1

将多个⽂件+⽬录打tar包

tar -tf xxx.tar

查看tar包的内容

tar -xvf xxx.tar

解压tar包

tar -xvf xxx.tar -C /dir

将tar包解压⾄指定⽬录

tar -cvfj xxx.tar.bz2 dir

创建bz2压缩包

tar -jxvf xxx.tar.bz2

解压bz2压缩包

tar -cvfz xxx.tar.gz dir

创建gzip压缩包

tar -zxvf xxx.tar.gz

解压gzip压缩包

bunzip2 xxx.bz2

解压bz2压缩包

bzip2 filename

压缩⽂件

gunzip xxx.gz

解压gzip压缩包

gzip filename

压缩⽂件

gzip -9 filename

最⼤程度压缩

# RPM包管理命令

常用命令

作用

rpm -qa

查看已安装的rpm包

rpm -q pkg\_name

查询某个rpm包

rpm -q –whatprovides xxx

显示xxx功能是由哪个包提供的

rpm -q –whatrequires xxx

显示xxx功能被哪个程序包依赖的

rpm -q –changelog xxx

显示xxx包的更改记录

rpm -qi pkg\_name

查看⼀个包的详细信息

rpm -qd pkg\_name

查询⼀个包所提供的⽂档

rpm -qc pkg\_name

查看已安装rpm包提供的配置⽂件

rpm -ql pkg\_name

查看⼀个包安装了哪些⽂件

rpm -qf filename

查看某个⽂件属于哪个包

rpm -qR pkg\_name

查询包的依赖关系

rpm -ivh xxx.rpm

安装rpm包

rpm -ivh –test xxx.rpm

测试安装rpm包

rpm -ivh –nodeps xxx.rpm

安装rpm包时忽略依赖关系

rpm -e xxx

卸载程序包

rpm -Fvh pkg\_name

升级确定已安装的rpm包

rpm -Uvh pkg\_name

升级rpm包(若未安装则会安装)

rpm -V pkg\_name

RPM包详细信息校验

# YUM包管理命令

常用命令

作用

yum repolist enabled

显示可⽤的源仓库

yum search pkg\_name

搜索软件包

yum install pkg\_name

下载并安装软件包

yum install –downloadonly pkg\_name

只 下 载 不 安 装

yum list

显示所有程序包

yum list installed

查看当前系统已安装包

yum list updates

查看可以更新的包列表

yum check-update

查看可升级的软件包

yum update

更新所有软件包

yum update pkg\_name

升级指定软件包

yum deplist pkg\_name

列出软件包依赖关系

yum remove pkg\_name

删除软件包

yum clean all

清除缓存

yum clean packages

清除缓存的软件包

yum clean headers

清除缓存的header

# DPKG包管理命令

常用命令

作用

dpkg -c xxx.deb

列出deb包的内容

dpkg -i xxx.deb

安装/更新deb包

dpkg -r pkg\_name

移除deb包

dpkg -P pkg\_name

移除deb包(不保留配置)

dpkg -l

查看系统中已安装deb包

dpkg -l pkg\_name

显示包的⼤致信息

dpkg -L pkg\_name

查看deb包安装的⽂件

dpkg -s pkg\_name

查看包的详细信息

dpkg –unpack xxx.deb

解开deb包的内容

# APT软件⼯具

常用命令

作用

apt-cache search pkg\_name

搜索程序包

apt-cache show pkg\_name

获取包的概览信息

apt-get install pkg\_name

安装/升级软件包

apt-get purge pkg\_name

卸载软件（包括配置）

apt-get remove pkg\_name

卸载软件（不包括配置）

apt-get update

更新包索引信息

apt-get upgrade

更新已安装软件包

apt-get clean

清理缓存
