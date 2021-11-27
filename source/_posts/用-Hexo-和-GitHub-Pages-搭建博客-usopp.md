---
title: 用 Hexo 和 GitHub Pages 搭建博客 - usopp
date: 2021-11-21 12:53:12
tags: 
	- hexo
	- github pages
	- next
	- blog
categories:
	- 运维部署
---

- 说明：本博客基于知乎回答来做的，因搭建过程遇到一些问题，所以直接转载过来，在此基础上提供自己的注意点+NEXT主题下的一些基本配置工作。

- 知乎：如何用github page搭建博客？ - 工匠羅的回答 - 知乎 https://www.zhihu.com/question/59088760/answer/265741938

- <p align="left">原文出处：https://ryanluoxu.github.io/2017/11/24/%E7%94%A8-Hexo-%E5%92%8C-GitHub-Pages-%E6%90%AD%E5%BB%BA%E5%8D%9A%E5%AE%A2</p>


# 日常常用命令

- hexo new "文章名"
- 手动编辑source的_posts下生成的md文件
- hexo g -d部署即可

## 步骤

搭建这个博客走了许多弯路。在这里分享总结之后的思路和简化步骤。

- Github Pages
- Hexo 博客框架
- 部署
- Next 主题

## Github Pages

Github Pages 其实本身就是 Github 提供的博客服务。 我们在 Github 中创建一个特定格式的 Repository，Github Pages 就会将里面的信息生成一个网页，展示出来。

**操作如下：**

1. 注册 Github 账号，然后在 Github 中创建一个以 .github.io 结尾的 Repository。
   1. Repository name: ryanluoxu.github.io
   2. 勾选 Initialize this repository with a README
   3. Create repository

2. 简单地编辑一下 README.md 这个文档。 比如添加：I am trying to create my own blog.. 保存(Commit changes)。
3. 打开网页：ryanluoxu.github.io 这里就可以看到 README.md 里的内容了。

如果没有太多的要求，其实直接用 README.md 来写博客也是不错的。
这个生成好的 Repository 就是用来存放博客内容的地方，也只有这个仓库里的内容，才会被 ryanluoxu.github.io 这个网页显示出来。


**Usopp这里说明一下：**

- 比如我的github路径是https://github.com/shenle2019，那么这里配置的必须是shenle2019.github.io，否则不会生成页面。

- 默认创建的分支，以前是master，现在是main。而我需要在main下创建一个gh-pages的分支才能使用shenle2019.github.io来访问博客网页。

- 参考：如何用github page搭建博客？ - 我是蛋蛋的回答 - 知乎 https://www.zhihu.com/question/59088760/answer/161640592


## Hexo

Hexo 是一个博客框架。它把本地文件里的信息生成一个网页。如果不需要放在网上给别人看，就没 Github Pages 什么事了。

使用 Hexo 之前，需要先安装 Node.js 和 Git。

**操作如下：**

1. 安装 Node.js

   - 前往 https://nodejs.org/en/

   - 点击 8.9.1 LTS 下载

   - 安装

   - 打开 Command Prompt， 输入 `node -v`

   - 得到：v8.9.1

     安装成功

2. 安装 Git

   - 前往 https://git-scm.com/

   - 点击 Downloads

   - 点击 Windows

   - 一般情况，下载会自动开始。如果没有，就点击 click here to download manually

   - 安装

   - 打开 Command Prompt， 输入 `git --version`

   - 得到：git version 2.15.0.windows.1

     安装成功

     额外说明：如果 Git –version 指令不管用，可能需要到 Environment Variable 那里添加 Path。

3. 安装 Hexo

- 打开 Command Prompt

- 输入 `npm install -g hexo-cli`

- 回车开始安装

- 输入 `hexo -v`

- 得到 hexo-cli: 1.0.4 等一串数据

  安装成功

  4. 创建本地博客

- 在D盘下创建文件夹 blog

- 鼠标右键 blog，选择 Git Bash Here。 如果没有安装 Git，就不会有这个选项。

- Git Bash 打开之后，所在的位置就是 blog 这个文件夹的位置。（/d/blog）

- 输入 `hexo init` 将 blog 文件夹初始化成一个博客文件夹。

- 输入 `npm install` 安装依赖包。

- 输入 `hexo g` 生成（generate）网页。 由于我们还没创建任何博客，生成的网页会展示 Hexo 里面自带了一个 Hello World 的博客。

- 输入 `hexo s` 将生成的网页放在了本地服务器（server）。

- 浏览器里输入 http://localhost:4000/ 。 就可以看到刚才的成果了。

- 回到 Git Bash，按 Ctrl+C 结束。

  此时再看 http://localhost:4000/ 就是无法访问了。

1. 发布一篇博客
   - 继续在 Git Bash 里，所在路径还是 /d/blog。输入 `hexo new "My First Post"`
   - 在 D:\blog\source_posts 路径下，会有一个 My-First-Post.md 的文件。 编辑这个文件，然后保存。
   - 回到 Git Bash，输入 `hexo g`
   - 输入 `hexo s`
   - 前往 http://localhost:4000/ 查看成果。
   - 回到 Git Bash，按 Ctrl+C 结束。

## 将本地 Hexo 博客部署在 Github 上

前面两个部分，我们已经有了本地博客，和一个能托管这些资料的线上仓库。只要把本地博客部署（deploy）在我们的 Github 对应的 Repository 就可以了。

**操作如下：**

1. 获取 Github 对应的 Repository 的链接。

   - 登陆 Github，进入到 ryanluoxu.github.io

   - 点击 Clone or download

   - 复制 URL 待用

     我的是 `https://github.com/Ryanluoxu/ryanluoxu.github.io.git`

2. 修改博客的配置文件

   - 打开配置文件 /d/blog/_config.yml （使用 bash 里的 vi 或者 notepad++）

   - 找到

      

     ```
     #Deployment
     ```

     ，填入以下内容：

     ```
     deploy:  
     	  type: git  
     	  repository: https://github.com/Ryanluoxu/ryanluoxu.github.io.git  
     	  branch: master
     ```

3. 部署

   - 回到 Git Bash

   - 输入 `npm install hexo-deployer-git --save` 安装 hexo-deployer-git 此步骤只需要做一次。

   - 输入 `hexo d`

   - 得到 `INFO Deploy done: git` 即为部署成功

     之前我们创建的 ReadMe.md 会被自动覆盖掉。

   **Usopp这里说明一下**

   - hexo d指令中会有要求本地直连github，以前是配置github的ssh免密码登录配置，现在是要tooken来登录
   - github获取tooken的方法，随便贴一个https://blog.csdn.net/u014175572/article/details/55510825
   - deploy的名称，这里branch也改了的，master改为main了。自己用的是 branch: main,gh-pages，如果设置main则向主干推送
   - 常用为gh-pages，因目前这个分支可以用来展示博客主页shenle2019.github.io

4. 查看成果

   前往 ryanluoxu.github.io 即可。

## 使用 Next 主题

[更多 Hexo 的主题看这里](https://hexo.io/themes/)

这里以 Next 为例。 大概思路就是把整个主题的文件克隆到我们的主题文件夹中。在配置文件中注明使用该主题。

**操作如下：**

1. 还是回到 Git Bash。 输入 `git clone https://github.com/iissnan/hexo-theme-next themes/next`

   这样，该主题的文件就全部克隆到 D:\blog\themes\next 下面。

2. 修改博客配置文件

   - 打开 D:\blog下的_config.yml

   - 找到 `theme:`

   - 把 Hexo 默认的 lanscape 修改成 next。 即 `theme: next`

   - 找到 `# Site`，添加博客名称，作者名字等。

   - 在 `language` 后面填入 en 或者 zh-Hans，选择英文或者中文。

   - 找到 `# URL`, 填入 url。比如 `url: https://ryanluoxu.github.io`

     填入名字后会有很风骚的 © 2017 Ryan Luo Xu 的字样出现在博客底部。

3. 重新生成部署即可

   - 回到 Git Bash。输入 `hexo g -d`就可以了。

     先把修改的内容生成网页，再部署。

4. 查看成果

   前往 ryanluoxu.github.io 即可。


**Usopp这里说明一下**

- language: zh-Hans，这个找到对应路径看一下具体的名字，否则可能解码失败，路径在D:\blog\themes\next\languages

- 其他常见报错或者html解析失败，直接复制关键字搜索解决，后续这里或评论区可以补充

- hexo-next 实用主题优化，参考https://blog.csdn.net/bsp_mpu6050/article/details/107886524

- 如果有配置不生效的情况，可以先尝试hexo clean清除缓存，再hexo g -d来解决

- yml文件中变量配置冒号后有空格，如custom_text: 乌索普大将的个人博客

- 部分配置||前又需要去掉空格，否则无法解析路径或者链接，如  
	tags: /tags/|| tags
    categories: /categories/|| th
	
- yml文件怀疑配置有问题时，可以使用https://codebeautify.org/yaml-validator这个来验证一下，有问题会直接提示。


### 附 Hexo常用指令

作者：雪上行者_
链接：https://www.jianshu.com/p/7b8faf77d1af

## 简写指令:

```
hexo n "我的第一篇文章"`       等价于        `hexo new "我的第一篇文章"`  还等价于       `hexo new post "我的第一篇文章"`    
 `hexo p` 等价于 `hexo publish`
 `hexo g` 等价于 `hexo generate`  
 `hexo s`等价于 `hexo server`     
 `hexo d` 等价于 `hexo deploy`
 `hexo deploy -g`  等价于 `hexo deploy --generate`
 `hexo generate -d`等价于`hexo generate --deploy
```

**注: hexo  clean 没有 简写,  git --version 没有简写**

## 指令说明:

`hexo server`        #Hexo 会监视文件变动并自动更新，除修改**站点配置文件**外,无须重启服务器,直接刷新网页即可生效。
 `hexo server -s` #以静态模式启动
 `hexo server -p 5000` #更改访问端口   (默认端口为4000，'ctrl + c'关闭server)
 `hexo server -i IP地址` #自定义 IP
 `hexo clean` #清除缓存  ,网页正常情况下可以忽略此条命令,执行该指令后,会删掉站点根目录下的public文件夹
 `hexo g` #生成静态网页  (执行 `$ hexo g`后会在站点根目录下生成public文件夹, hexo会将"/blog/source/"   下面的.md后缀的文件编译为.html后缀的文件,存放在"/blog/public/ "   路径下)
 `hexo d` #将本地数据部署到远端服务器(如github)
 `hexo init 文件夹名称` #初始化XX文件夹名称
 `npm update hexo -g`#升级
 `npm install hexo -g`#安装
 `node-v`          #查看node.js版本号
 `npm -v`        #查看npm版本号
 `git --version`  #查看git版本号
 `hexo -v`      #查看hexo版本号

`hexo publish [layout] <title>`   #通过 `publish` 命令将草稿移动到 `source/_posts` 文件夹,如:`$ hexo publish [layout] <title>`,草稿默认是不会显示在页面中的，可在执行时加上 `--draft` 参数，或是把 `render_drafts` 参数设为 `true`来预览草稿。

`hexo new aaa "bbb"`  # 新建一篇文章,文章名称和标题分别为bbb.md 和 bbb.   文章采用aaa布局,  此时会在站点根目录下的---->source----->_post文件夹下生成bbb.md文件,  bbb.md文件的顶部(-----分割线上方区域,也称作Front matter区),生成

```
layout : aaa`
 `title:`
 `date:
```
