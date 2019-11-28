# 内联元素

## 链接（link、autolink）

Markdown 支持两种链接形式: 内联 和 引用.

这两种形式下链接文本的定界符都是 `[href]`.

### 内联

[简书](http://jianshu.com "简书地址")

```
[简书](http://jianshu.com)
```

### 引用

[baidu]: http://baidu.com "百度一下"

[baidu]

```
[baidu]: http://baidu.com "百度一下"

[百度] [baidu]
```

```
以下三个链接的定义是等价的:
[foo]: http://example.com/  "Optional Title Here"
[foo]: http://example.com/  'Optional Title Here'
[foo]: http://example.com/  (Optional Title Here)
```

引用连接的意义不在于更容易书写, 而在于使得文档更易于阅读

使用 Markdown 的引用链接, 源码更接近与最终的输出, 就像浏览器中呈现的样子.

## 强调, 删除 (emphasis, strikethrough)

Markdown 将星号 (*) 和下划线 (_) 作为强调标记. 用 * 或者 _ 包裹的文本将会用 HTML `<em>` 标签包裹; 双 * 或者 _ 将会用 HTML `<strong>` 标签包裹. 

**这是加粗的文字**
__这是加粗的文字__
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~

```markup
**这是加粗的文字**
__这是加粗的文字__
*这是倾斜的文字*`
***这是斜体加粗的文字***
~~这是加删除线的文字~~
```

## 代码（code）

要输出一个代码片段, 需要使用重音符号 (`). 不同于预格式的代码块, 代码片段只是在普通段落中标识出代码. 

`code`

```
`这是一段代码`
```

## 图片（image）

语法: `![alt](src title)`

同样包含内联和引用2种使用

用法除了感叹号(!)外与链接相同

![掘金](https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg "图片title")

![掘金][juejin]

[juejin]: https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg "掘金"