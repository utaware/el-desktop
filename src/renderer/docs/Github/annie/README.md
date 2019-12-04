# annie

[resource](https://github.com/iawia002/annie)

## guide

> Go 编写的快速、简单、干净的视频下载程序。支持哔哩哔哩、YouTube 视频网站

## install

1. [ffmpeg](http://ffmpeg.org/)
2. [go](https://golang.google.cn/dl/)
3. `go get github.com/iawia002/annie`
4. chrome 插件 `editthiscookie`

::: card warning 注意

go get 可能存在部分问题

- git clone 配置问题
- golang.org 下载问题(x模块)
- cookie 格式(json x)

:::

## usage

```js
//annie [OPTIONS] URL [URL...]
```

### options

```
  -i	Information only 列举视频所有清晰度，但不下载
  -F string 指定文件读取路径下载
    	URLs file path
  -d	Debug mode
  -j	Print extracted data
  -v	Show version
```

### Download

```
  -f string 选取特定清晰度下载 16(360) 32(480) 64(720) 80(1080) 112(1080+)
    	Select specific stream to download
  -p	Download playlist 多集下载
  -n int 下载线程数
    	The number of download thread (only works for multiple-parts video) (default 10)
  -c string 加载cookie (可以是文件或者字符串)
    	Cookie
  -r string 使用特殊的referrer
    	Use specified Referrer
  -cs int 用于下载的HTTP块大小（以MB为单位）（默认为0）
    	HTTP chunk size for downloading (in MB) (default 0)
```

### Network

```
 -s string
    	SOCKS5 proxy
  -x string
    	HTTP proxy
  -retry int
    	How many times to retry when the download failed (default 10)
```

### Playlist

```
-start int
  	Playlist video to start at (default 1)
-end int
  	Playlist video to end at
-items string
  	Playlist video items to download. Separated by commas like: 1,5,6,8-10
```

### Filesystem

```
-o string 输出到其他路径
  	Specify the output path
-O string 输出的文件名
  	Specify the output file name
```

### Subtitle

```
-C	Download captions 
```

### Youku

```
-ccode string 可能会变动
  	Youku ccode (default "0590")
-ckey string
  	Youku ckey (default "7B19C0AB12633B22E7FE81271162026020570708D6CC189E4924503C49D243A0DE6CD84A766832C2C99898FC5ED31F3709BB3CDD82C96492E721BDD381735026")
-password string
  	Youku password
```

### YouTube

```
-ytb-stream2
  	Use data in url_encoded_fmt_stream_map
```

### aria2

> Note: If you use aria2 to download, you need to merge the multi-part videos yourself.

```
-aria2
  	Use Aria2 RPC to download
-aria2addr string
  	Aria2 Address (default "localhost:6800")
-aria2method string
  	Aria2 Method (default "http")
-aria2token string
  	Aria2 RPC Token
```

## example

```shell
# b站可以只用av或者ep号
annie -i av45654043
# -f 根据 -i 信息指定下载的清晰度
annie -f 80 https://www.bilibili.com/video/av45654043
# 修改输出目录 默认当前执行目录 -o
annie -o C:\Users\Rats\Desktop -f 80 https://www.bilibili.com/video/av45654043
# 多集下载 -p 可以通过 -start 1 -end 20 选择开始到结束的范围 (B, youtube)
annie -f 80 -p -start 1 -end 20 https://www.bilibili.com/bangumi/play/ep133269
#列出所有链接信息
annie -F /root/bz.txt -i
#下载1080p视频
annie -f 80 -F /root/bz.txt
#获取视频格式列表
annie -i -c cookie.txt https://v.youku.com/v_show/id_*.html
#根据自己需求下载指定清晰度视频
annie -f mp4hd3v2-guoyu -c cookie.txt https://v.youku.com/v_show/id_*.html
```

## Supported Sites

| 门户 | 地址 | 视频 | 图片 | 番剧 | VIP |
| :-: | :-: | :-: | :-: | :-: |
| 抖音 | <https://www.douyin.com> | ✓ | | | |
| 哔哩哔哩 | <https://www.bilibili.com> | ✓ | | ✓ | ✓ |
| 半次元 | <https://bcy.net> | | ✓ | | |
| pixivision | <https://www.pixivision.net> | | ✓ | | |
| 优酷 | <https://www.youku.com> | ✓ | | | ✓ |
| YouTube | <https://www.youtube.com> | ✓ | | ✓ | |
| 爱奇艺 | <https://www.iqiyi.com> | ✓ | | | |
| 芒果TV | <https://www.mgtv.com> | ✓ | | | |
| 糖豆广场舞 | <http://www.tangdou.com> | ✓ | | ✓ | |
| Tumblr | <https://www.tumblr.com> | ✓ | ✓ | | |
| Vimeo | <https://vimeo.com> | ✓ | | | |
| Facebook | <https://facebook.com> | ✓ | | | |
| 斗鱼视频 | <https://v.douyu.com> | ✓ | | | |
| 秒拍 | <https://www.miaopai.com> | ✓ | | | |
| 微博 | <https://weibo.com> | ✓ | | | |
| Instagram | <https://www.instagram.com> | ✓ | ✓ | | |
| Twitter | <https://twitter.com> | ✓ | | | |
| 腾讯视频 | <https://v.qq.com> | ✓ | | | |
| 网易云音乐 | <https://music.163.com> | ✓ | | | |
| 音悦台 | <https://yinyuetai.com> | ✓ | | | |
| 极客时间 | <https://time.geekbang.org> | ✓ | | | |
| Pornhub | <https://pornhub.com> | ✓ | | | |
| XVIDEOS | <https://xvideos.com> | ✓ | | | |
| 聯合新聞網 | <https://udn.com> | ✓ | | | |

## Similar projects

* youtube-dl
* you-get
* ytdl