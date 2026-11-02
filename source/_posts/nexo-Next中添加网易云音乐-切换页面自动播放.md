---
title: nexo-Next中添加网易云音乐+切换页面自动播放
date: 2021-11-28T22:56:33.000Z
permalink: 2021/11/29/nexo-Next中添加网易云音乐-切换页面自动播放/
categories:
  - 部署
tags:
  - hexo
  - github pages
  - next
  - 网易云
---

### 网易云音乐歌单生成外链播放器

参考  
[https://www.cnblogs.com/yuan2333/p/7244380.html](https://www.cnblogs.com/yuan2333/p/7244380.html)

-   注意网页版网易云看的比较清楚
-   创建歌单
-   点击分享
-   查看【朋友】-【我的动态】
-   点进歌单-【生成外链播放器】

### 在网页中添加网易云音乐歌单

参考：  
[https://otakurice.github.io/2018/07/20/hexo%20%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E6%AD%8C%E5%8D%95/](https://otakurice.github.io/2018/07/20/hexo%20%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E6%AD%8C%E5%8D%95/)

-   基本操作，如果只需要加一首歌或者主页面加歌单列表，手动播放，则只需要  
    修改主题文件夹下layout\_macro\\sidebar.swig文件(这是侧边栏路径)，将上述代码贴入到想放的位置。
    
    ```html
    <div id="music163player">
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=86 src="//music.163.com/outchain/player?type=2&id=28885472&auto=1&height=66">
        </iframe>
    </div><div id="music163player">
        <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=280 height=86 src="//music.163.com/outchain/player?type=2&id=28885472&auto=1&height=66">
        </iframe>
    </div>
    ```
    

### 想全局播放+切网页自动播放

参考：  
[https://blog.csdn.net/qq\_39720594/article/details/105401774https://blog.csdn.net/qq\_39720594/article/details/105401774](https://blog.csdn.net/qq_39720594/article/details/105401774https://blog.csdn.net/qq_39720594/article/details/105401774)

git cmd 安装：  
npm install aplayer –save

使用Aplayer + MetingJS插件  
打开我们主题文件：themes\\next\\layout\_macro\\sidebar.swig找到sidebar-inner，复制下面代码粘贴到此

标签后即可。

```html
<!-- require APlayer -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
<!-- require MetingJS-->
<script src="https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js"></script> 
<!--网易云-->   
<meting-js
server="netease"
id="7091778006"
type="playlist"
mini="true"
fixed="true"
list-folded="true"
autoplay="true"
volume="0.5"
theme="#FADFA3"
order="random"
loop="all"
preload="auto"
mutex="true">
</meting-js>
```

这里面注意修改id为自己的歌单id即可。

其他配置项参考：  
[MetingJS配置](https://github.com/metowolf/MetingJS)

全局播放背景音乐（使用 Pajx 实现）  
即实现页面跳转刷新后音乐不间断播放

打开themes\\next\\layout文件夹找到\_layout.swig

在<\\head>标签前添加下面代码，并保存。

```html
<head>   //粘贴到这里
    
  <!--pjax：防止跳转页面音乐暂停-->
  <script src="https://cdn.jsdelivr.net/npm/pjax@0.2.8/pjax.js"></script> 
</head>
```

在主题的配置文件中找到pajx，将它设置为true，并保存。

```html
# Easily enable fast Ajax navigation on your website.
# Dependencies: https://github.com/theme-next/theme-next-pjax
pjax: true
```

在博客文件夹打开GitBash执行hexo clean、hexo g、hexo s，跳转页面时即可看到效果。

-   <strong>本文作者：</strong> General usopp
-   <strong>本文链接：</strong> [https://shenle2019.github.io/2021/11/29/nexo-Next%E4%B8%AD%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90-%E5%88%87%E6%8D%A2%E9%A1%B5%E9%9D%A2%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE/](https://shenle2019.github.io/2021/11/29/nexo-Next%E4%B8%AD%E6%B7%BB%E5%8A%A0%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90-%E5%88%87%E6%8D%A2%E9%A1%B5%E9%9D%A2%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE/ "nexo-Next中添加网易云音乐+切换页面自动播放")
-   <strong>版权声明：</strong> 本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 3.0](https://creativecommons.org/licenses/by-nc-sa/3.0/) 许可协议。转载请注明出处！

[\# hexo](/tags/hexo/) [\# github pages](/tags/github-pages/) [\# next](/tags/next/) [\# 网易云](/tags/%E7%BD%91%E6%98%93%E4%BA%91/)

[markdown语法](/2021/11/29/markdown%E8%AF%AD%E6%B3%95/ "markdown语法")

[问题解决：年龄的焦虑](/2021/11/29/%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3%EF%BC%9A%E5%B9%B4%E9%BE%84%E7%9A%84%E7%84%A6%E8%99%91/ "问题解决：年龄的焦虑")
