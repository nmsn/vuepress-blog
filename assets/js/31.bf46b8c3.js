(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{389:function(v,_,t){"use strict";t.r(_);var T=t(19),p=Object(T.a)({},function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("h1",{attrs:{id:"http权威指南"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http权威指南","aria-hidden":"true"}},[v._v("#")]),v._v(" HTTP权威指南")]),v._v(" "),t("h2",{attrs:{id:"第一部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第一部分","aria-hidden":"true"}},[v._v("#")]),v._v(" 第一部分")]),v._v(" "),t("h2",{attrs:{id:"第1章-http概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第1章-http概述","aria-hidden":"true"}},[v._v("#")]),v._v(" 第1章 HTTP概述")]),v._v(" "),t("p",[v._v("1.3.1 媒体类型")]),v._v(" "),t("p",[v._v("MIME（Multipurpose Internet Mail Extension, 多用途因特网邮件拓展）")]),v._v(" "),t("p",[v._v("最初设计是为了解决在不同的电子邮件系统之间搬移报文时存在的问题。MIME在电子邮件系统中工作得非常好，因此HTTP也采纳了它，用它来描述并标记多媒体内容")]),v._v(" "),t("p",[v._v("1.3.2 URI")]),v._v(" "),t("p",[v._v("服务器资源名被称为统一资源标识符（Uniform Resource Identifier， URI）")]),v._v(" "),t("p",[v._v("1.3.3 URL")]),v._v(" "),t("p",[v._v("统一资源定位符（URL）是资源标识符最常见的形式。URL表述了一台特定服务器上的某资源的特定位置。它们可以明确说明如何从一个准确、固定的位置获取资源")]),v._v(" "),t("p",[v._v("大部分URL都遵循一种标准格式，这种格式包含三个部分")]),v._v(" "),t("ul",[t("li",[v._v("方案（scheme）访问资源所使用的协议类型")]),v._v(" "),t("li",[v._v("服务器因特网地址")]),v._v(" "),t("li",[v._v("其余部分指定了Web服务器上的某些资源")])]),v._v(" "),t("p",[v._v("现在，几乎所有URI都是URL")]),v._v(" "),t("p",[v._v("1.3.4 URN")]),v._v(" "),t("p",[v._v("统一资源名（URN）。URN是作为特定内容的唯一名称使用的，与目前的资源所在地无关")]),v._v(" "),t("p",[v._v("URN仍然处于试验阶段，未大范围使用")]),v._v(" "),t("p",[v._v("1.4 事务")]),v._v(" "),t("p",[v._v("一个HTTP事务由一条（从客户端发往服务端地）请求命令和一个（从服务端发回客户端的）响应结果组成。这种通信是通过HTTP报文的格式化数据块进行的")]),v._v(" "),t("p",[v._v("1.5 HTTP报文")]),v._v(" "),t("p",[v._v("HTTP报文都是纯文本，不是二进制代码，所以人们可以很方便地对其进行读写")]),v._v(" "),t("p",[v._v("HTTP报文包括一下三个部分")]),v._v(" "),t("ul",[t("li",[v._v("起始行")]),v._v(" "),t("li",[v._v("首部字段")]),v._v(" "),t("li",[v._v("主体")])]),v._v(" "),t("p",[v._v("1.6 连接")]),v._v(" "),t("p",[v._v("TCP提供了")]),v._v(" "),t("ul",[t("li",[v._v("无差错地数据传输")]),v._v(" "),t("li",[v._v("按序传输（数据总是会按照发送的顺序到达）")]),v._v(" "),t("li",[v._v("未分段的数据流（可以在任意时刻以任意尺寸将数据发送出去）")])]),v._v(" "),t("p",[v._v("1.7 协议版本")]),v._v(" "),t("p",[v._v("1.8 Web的结构组件")]),v._v(" "),t("ul",[t("li",[v._v("代理")]),v._v(" "),t("li",[v._v("缓存")]),v._v(" "),t("li",[v._v("网关*")]),v._v(" "),t("li",[v._v("隧道*")]),v._v(" "),t("li",[v._v("Agent代理")])]),v._v(" "),t("h2",{attrs:{id:"第2章-url与资源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第2章-url与资源","aria-hidden":"true"}},[v._v("#")]),v._v(" 第2章 URL与资源")]),v._v(" "),t("p",[v._v("2.2 URL的语法")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("组件")]),v._v(" "),t("th",[v._v("描述")]),v._v(" "),t("th",[v._v("默认值")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("方案")]),v._v(" "),t("td",[v._v("访问服务器以获取资源时要使用哪种协议")]),v._v(" "),t("td",[v._v("无")])]),v._v(" "),t("tr",[t("td",[v._v("用户")]),v._v(" "),t("td",[v._v("某些方案访问资源时需要的用户名")]),v._v(" "),t("td",[v._v("匿名")])]),v._v(" "),t("tr",[t("td",[v._v("密码")]),v._v(" "),t("td",[v._v("用户名后面可能要包含的密码，中间由冒号分隔")]),v._v(" "),t("td",[v._v("<Email地址>")])]),v._v(" "),t("tr",[t("td",[v._v("主机")]),v._v(" "),t("td",[v._v("资源宿主服务器的主机名或点分IP地址")]),v._v(" "),t("td",[v._v("无")])]),v._v(" "),t("tr",[t("td",[v._v("端口")]),v._v(" "),t("td",[v._v("资源宿主服务器正在监听的端口号。很多方案都有默认端口号（HTTP默认端口号80）")]),v._v(" "),t("td",[v._v("每个方案特有")])]),v._v(" "),t("tr",[t("td",[v._v("路径")]),v._v(" "),t("td",[v._v("服务器上资源的本地名，由一个斜杠（/）将其与前面的URL组件分隔开来。路径组件的语法是与服务器和方案有关的")]),v._v(" "),t("td",[v._v("无")])]),v._v(" "),t("tr",[t("td",[v._v("参数")]),v._v(" "),t("td",[v._v("某些方案会用这个组件来指定输入参数。参数为名/值对。URL中可以包含多个参数字段，它们相互之间以及与路径的其余部分之间用分号（；）分隔")]),v._v(" "),t("td",[v._v("无")])]),v._v(" "),t("tr",[t("td",[v._v("查询")]),v._v(" "),t("td",[v._v("某些方案会用这个组件传递参数以激活应用程序（比如数据库、公告板、搜索引擎以及其他因特网网关）。查询组件的内容没有通用格式。用字符“？”将其与URL的其余部分分隔开来")]),v._v(" "),t("td",[v._v("无")])]),v._v(" "),t("tr",[t("td",[v._v("片段")]),v._v(" "),t("td",[v._v("一小片或一部分资源的名字。引用对象时，不会将frag字段传送给服务器；这个字段是在客户端内部使用的。通过字符“#”将其与URL的其余部分分隔开来")]),v._v(" "),t("td",[v._v("无")])])])]),v._v(" "),t("p",[v._v("2.2.1 方案——使用什么协议")]),v._v(" "),t("p",[v._v("方案名大小写无关 http = HTTP")]),v._v(" "),t("p",[v._v("2.2.3 用户名和密码")]),v._v(" "),t("p",[v._v("eg: "),t("code",[v._v("ftp://anonymous:my_password@ftp.prep.ai.mit.edu/pub/gnu")])]),v._v(" "),t("p",[v._v("如果某应用程序使用的URL方案要求输入用户名和密码，比如FTP，但用户没有提供，它通常会插入一个默认的用户名和密码")]),v._v(" "),t("p",[v._v("2.2.7 片段")]),v._v(" "),t("p",[v._v("HTTP服务器通常只处理整个对象，而不是对象的片段，客户端不能将片段传送给服务器。浏览器从服务器获得了整个资源后，会根据片段来显示你感兴趣的那部分资源\n")]),v._v(" "),t("p",[v._v("2.3 URL快捷方式")]),v._v(" "),t("p",[v._v("2.4 各种令人头疼的字符")]),v._v(" "),t("p",[v._v("URL是可移植的。它要统一地命名因特网上所有地资源，这也就意味着要通过各种不同的协议来传送这些资源。"),t("strong",[v._v("这些协议在传输数据时都会使用不同的机制")])]),v._v(" "),t("p",[v._v("有些协议例如传输电子邮件的简单邮件传输协议SMTP，所使用的传输防范就会剥去一些特定的字符。为了避开这些问题，URL只能使用一些相对较小的、通用的安全字母表中的字符")]),v._v(" "),t("p",[v._v("设计者们还希望URL是可读的。因此，即使不可见、不可打印的字符能够穿过邮件程序，从而成为可移植的，也不能在URL中使用")]),v._v(" "),t("p",[v._v("2.4.1 URL字符集")]),v._v(" "),t("p",[v._v("US-ASCII使用7位二进制码来表示英文打字机提供的大多数按键和少数用于文本格式和硬件通知的不可打印控制字符")]),v._v(" "),t("p",[v._v("但US-ASCII并不支持各种全世界数十亿人使用的数百种非罗马语言中很常见的变体字符和二进制数据")]),v._v(" "),t("p",[v._v("因此将"),t("strong",[v._v("转义序列")]),v._v("集成进去。通过转义序列，就可以使用US-ASCII字符集的有限子集对任意字符值或数据进行编码")]),v._v(" "),t("p",[v._v("这种转义表示法包含一个百分号， 后面跟着两个表示字符ASCII码的十六进制数")]),v._v(" "),t("p",[v._v("2.5 方案的世界")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("方案")]),v._v(" "),t("th",[v._v("描述")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("http")]),v._v(" "),t("td",[v._v("超文本传输协议方案，除了没有用户名和密码外，与通用的URL格式相符。如果省略了端口，就默认为80。基本格式 "),t("code",[v._v("http://<host>:<port>/<path>?<query>#<frag>")])])]),v._v(" "),t("tr",[t("td",[v._v("https")]),v._v(" "),t("td",[v._v("方案https和方案http是一对。唯一的区别在于方案https使用了网景的SSL，SSL为HTTP连接提供了端到端的加密机制。其语法与HTTP的语法相同，默认端口为443。基本格式"),t("code",[v._v("https://<host>:<port>/<path>?<query>#<frag>")])])]),v._v(" "),t("tr",[t("td",[v._v("mailto")]),v._v(" "),t("td",[v._v("Mailto URL指向的是E-mail地址，由于E-mail的行为与其他方案都有所不同（它并不指向任何可以直接访问的对象），所以mailto URL的格式与标准URL的格式也有所不同。因特网E-mail地址的语法记录在RFC822中。基本格式"),t("code",[v._v("mailto:<RFC-822-addr-spec>")])])]),v._v(" "),t("tr",[t("td",[v._v("ftp")]),v._v(" "),t("td",[v._v("文件传输协议URL可以用来从FTP服务器上下载或向其上载文件，并获取FTP服务器上的目录结构内容的列表。在Web和URL出现之前FTP就已经存在了。Web应用程序将FTP作为一种数据访问方案使用。基本格式"),t("code",[v._v("ftp://<user>:<password>@<host>:<port>/<path>;<params>")])])]),v._v(" "),t("tr",[t("td",[v._v("rtsp,rtspu")]),v._v(" "),t("td",[v._v("RTSP URL是可以通过实时流转传输协议解析的音/视频媒体资源的标识符。方案rtspu中的u表示它是使用UDP协议来获取资源的。基本格式"),t("code",[v._v("rtsp://<user>:<password>@<host>:<port>/<path>")])])]),v._v(" "),t("tr",[t("td",[v._v("file")]),v._v(" "),t("td",[v._v("方案file表示一台指定主机（通过本地磁盘、网络文件系统或其他一些文件共享系统）上可直接访问的文件。各字段都遵循通用格式。如果省略了主机名，就默认为正在使用URL的本地主机。基本格式"),t("code",[v._v("file://<host>/<path>")])])]),v._v(" "),t("tr",[t("td",[v._v("news")]),v._v(" "),t("td",[v._v("根据RFC1036的定义，方案news用来访问一些特定的文章或新闻组，它有一个很独特的性质：news URL自身包含的信息不足以对资源进行定位")])]),v._v(" "),t("tr",[t("td",[v._v("telnet")]),v._v(" "),t("td",[v._v("方案telnet用于访问交互式业务。它表示的并不是对象自身，而是可通过telnet协议访问的交互式应用程序。基本格式"),t("code",[v._v("telnet://<user>:<password>@<host>:<port>")])])])])]),v._v(" "),t("h2",{attrs:{id:"第3章-http报文"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第3章-http报文","aria-hidden":"true"}},[v._v("#")]),v._v(" 第3章 HTTP报文")]),v._v(" "),t("p",[v._v("3.2.2 起始行")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("请求行")])]),v._v(" "),t("li",[t("p",[v._v("响应行")])]),v._v(" "),t("li",[t("p",[v._v("方法")]),v._v(" "),t("p",[v._v("常用HTTP方法")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("方法")]),v._v(" "),t("th",[v._v("描述")]),v._v(" "),t("th",[v._v("是否包含主体")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("GET")]),v._v(" "),t("td",[v._v("从服务器获取一份文档")]),v._v(" "),t("td",[v._v("否")])]),v._v(" "),t("tr",[t("td",[v._v("HEAD")]),v._v(" "),t("td",[v._v("只从服务器获取文档的首部")]),v._v(" "),t("td",[v._v("否")])]),v._v(" "),t("tr",[t("td",[v._v("POST")]),v._v(" "),t("td",[v._v("向服务器发送需要处理的数据")]),v._v(" "),t("td",[v._v("是")])]),v._v(" "),t("tr",[t("td",[v._v("PUT")]),v._v(" "),t("td",[v._v("将请求的主体部分存储在服务器上")]),v._v(" "),t("td",[v._v("是")])]),v._v(" "),t("tr",[t("td",[v._v("TRACE")]),v._v(" "),t("td",[v._v("对可能经过代理服务器传送到服务器上去的报文进行追踪")]),v._v(" "),t("td",[v._v("否")])]),v._v(" "),t("tr",[t("td",[v._v("OPTIONS")]),v._v(" "),t("td",[v._v("决定可以在服务器上执行哪些方法")]),v._v(" "),t("td",[v._v("否")])]),v._v(" "),t("tr",[t("td",[v._v("DELETE")]),v._v(" "),t("td",[v._v("从服务器上删除一份文档")]),v._v(" "),t("td",[v._v("否")])])])])]),v._v(" "),t("li",[t("p",[v._v("状态码")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th",[v._v("整体范围")]),v._v(" "),t("th",[v._v("已定义范围")]),v._v(" "),t("th",[v._v("分类")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("100~199")]),v._v(" "),t("td",[v._v("100~101")]),v._v(" "),t("td",[v._v("信息提示")])]),v._v(" "),t("tr",[t("td",[v._v("200~299")]),v._v(" "),t("td",[v._v("200~206")]),v._v(" "),t("td",[v._v("成功")])]),v._v(" "),t("tr",[t("td",[v._v("300~399")]),v._v(" "),t("td",[v._v("300~305")]),v._v(" "),t("td",[v._v("重定向")])]),v._v(" "),t("tr",[t("td",[v._v("400~499")]),v._v(" "),t("td",[v._v("400~415")]),v._v(" "),t("td",[v._v("客户端错误")])]),v._v(" "),t("tr",[t("td",[v._v("500~599")]),v._v(" "),t("td",[v._v("500~505")]),v._v(" "),t("td",[v._v("服务端错误")])])])])]),v._v(" "),t("li",[t("p",[v._v("原因短语")]),v._v(" "),t("p",[v._v("原因短语为状态码提供了文本形式的解释。比如，在行HTTP/1.0 200 OK中，OK就是原因短语")])])]),v._v(" "),t("p",[v._v("3.2.3 首部（header）")]),v._v(" "),t("p",[v._v("HTTP规范定义了几种首部字段。应用程序也可以随意发明自己所用的首部\n3.3 方法")]),v._v(" "),t("p",[v._v("3.3.2 GET")]),v._v(" "),t("p",[v._v("3.3.3 HEAD")]),v._v(" "),t("p",[v._v("HEAD方法与GET方法的行为很类似，但服务器在响应中只返回首部。不会返回实体的主体部分。这就允许客户端在未获取实际资源的情况下，对资源的首部进行检查。使用HEAD可以：")]),v._v(" "),t("ul",[t("li",[v._v("在不获取资源的情况下了解资源的情况（比如，判断其类型）")]),v._v(" "),t("li",[v._v("通过查看响应中的状态码，看看某个对象是否存在")]),v._v(" "),t("li",[v._v("通过查看首部，测试资源是否被修改")])]),v._v(" "),t("p",[v._v("3.3.4 PUT")]),v._v(" "),t("p",[v._v("与GET从服务器读取文档相反，PUT方法会向服务器写入文档。有些发布系统允许用户创建Web页面，并用PUT直接将其安装到Web服务器上去")]),v._v(" "),t("p",[v._v("PUT方法的语义就是让服务器用球球的主体部分来创建一个由所请求的URL命名的新文档，或者，如果那个URL已经存在的话，就用这个主体来替代它")]),v._v(" "),t("p",[v._v("因为PUT允许用户对内容进行修改，所以很多Web服务器都要求在执行PUT之前，用密码登录")]),v._v(" "),t("p",[v._v("3.3.5 POST")]),v._v(" "),t("p",[v._v("POST法国法起初是用来向服务器输入数据的。实际上，通常会用它来支持HTML的表单")]),v._v(" "),t("p",[v._v("3.3.6 TRACE")]),v._v(" "),t("p",[v._v("客户端发起一个请求时，这个请求可能要穿过防火墙、代理、网关或其他一些应用程序。每个中间节点都可能会修改原始的HTTP请求。TRACE方法允许客户端在最终将请求发送给服务器时，看看它变成了什么样子")]),v._v(" "),t("p",[v._v("TRACE请求会在目的服务器端发起一个“环回”诊断。行程的最后一站的服务器会弹回一条TRACE响应，并在响应主体中携带它受到的原始请求报文。这样客户端就可以查看在所有中间HTTP应用程序组成得到请求/响应链上，原始报文是否，以及如何被毁坏或修改过")]),v._v(" "),t("p",[v._v("TRACE方法主要用于诊断")]),v._v(" "),t("p",[v._v("TRACE嘉定中间应用程对各种不同类型请求的处理是相同的。但很多HTTP应用程序会根据方法大的不同做出不同的事情。TRACE并不提供区分这些方法的机制。通常，中间应用程序会自行决定对TRACE请求的处理方式")]),v._v(" "),t("p",[v._v("3.3.7 OPTIONS")]),v._v(" "),t("p",[v._v("OPTIONS方法请求Web服务器告知其支持的各种共呢个。可以询问服务器通常支持哪些方法")]),v._v(" "),t("p",[v._v("这为客户端应用程序提供了一种手段，使其不用实际访问那些资源就能判定访问各种资源的最优方式")]),v._v(" "),t("p",[v._v("3.3.8 DELETE")]),v._v(" "),t("p",[v._v("DELETE方法所作的事情就是请服务器删除请求URL所指定的资源。但是客户应用程序无法保证删除擦欧总一定会被执行。因为HTTP规范允许服务器在不通知客户端的情况下撤销请求")]),v._v(" "),t("p",[v._v("3.4 状态码")]),v._v(" "),t("p",[v._v("3.4.1 100~199 信息性状态码")]),v._v(" "),t("p",[v._v("HTTP/1.1向协议中引入了信息性状态码")]),v._v(" "),t("p",[v._v("3.4.2 200~299 成功状态码")]),v._v(" "),t("p",[v._v("3.4.3 300~399 重定向状态码")]),v._v(" "),t("p",[v._v("当HTTP/1.0客户端发起一个POST请求，并在响应中收到302重定向状态码时，它会接受Location首部的重定向URL，并向那个URL发起一个GET请求（而不会像原始请求中那样发起POST请求）")]),v._v(" "),t("p",[v._v("HTTP/1.0服务器希望HTTP/1.0客户端这么做——如果HTTP/1.0服务器收到来自HTTP/1.0客户端的POST请求之后发送了302状态码，服务器就期望客户端能够接受重定向URL，并向重定向的URL发送一个GET请求")]),v._v(" "),t("p",[v._v("问题出在HTTP/1.1。HTTP/1.1规范使用303状态码来实现同样的行为（服务器发送303状态码来重定向客户端的POST请求，在它后面跟上一个GET请求）")]),v._v(" "),t("p",[v._v("为了避开这个问题，HTTP/1.1规范指出，对于HTTP/1.1客户端，用307状态码取代302状态码来进行临时重定向。这样服务器就可以将302状态码保存起来，为HTTP/1.0客户端使用了")]),v._v(" "),t("p",[v._v("3.4.4 400~499 客户端错误状态码")]),v._v(" "),t("p",[v._v("3.4.5 500~599 服务器错误状态码")]),v._v(" "),t("p",[v._v("3.5 首部（header）")]),v._v(" "),t("h2",{attrs:{id:"第4章-连接管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第4章-连接管理","aria-hidden":"true"}},[v._v("#")]),v._v(" 第4章 连接管理")]),v._v(" "),t("p",[v._v("4.1.2 TCP流是分段的、由IP分组传送")]),v._v(" "),t("p",[v._v("TCP的数据是通过名为IP分组（或IP数据报）的小数据块来发送的。")]),v._v(" "),t("table",[t("thead",[t("tr",[t("th"),v._v(" "),t("th",[v._v("HTTP")]),v._v(" "),t("th",[v._v("HTTPS")])])]),v._v(" "),t("tbody",[t("tr",[t("td",[v._v("应用层")]),v._v(" "),t("td",[v._v("HTTP")]),v._v(" "),t("td",[v._v("HTTP")])]),v._v(" "),t("tr",[t("td",[v._v("安全层")]),v._v(" "),t("td"),v._v(" "),t("td",[v._v("TSL or SSL")])]),v._v(" "),t("tr",[t("td",[v._v("传输层")]),v._v(" "),t("td",[v._v("TCP")]),v._v(" "),t("td",[v._v("TCP")])]),v._v(" "),t("tr",[t("td",[v._v("网络层")]),v._v(" "),t("td",[v._v("IP")]),v._v(" "),t("td",[v._v("IP")])]),v._v(" "),t("tr",[t("td",[v._v("数据链路层")]),v._v(" "),t("td",[v._v("网络接口")]),v._v(" "),t("td",[v._v("网络接口")])])])]),v._v(" "),t("p",[v._v("HTTP要传送一条报文时，会以流的形式将报文数据的内容通过一条打开的TCP连接按序传输。TCP接到数据流之后，会将数据流堪称被称作段的小数据块，并将段封装在IP分组中，通过因特网进行传输。所有这些工作都是由TCP/IP软件来处理的，HTTP程序员什么都看不到")]),v._v(" "),t("p",[v._v("每个TCP段都是由IP分组承载，从一个IP地址发送到另一个IP地址的。每个IP分组中都包括：")]),v._v(" "),t("ul",[t("li",[v._v("一个IP分组首部（通常20字节）")]),v._v(" "),t("li",[v._v("一个TCP段首部（通常20字节）")]),v._v(" "),t("li",[v._v("一个TCP数据块（0个或多个字节）")])]),v._v(" "),t("p",[v._v("IP首部包含了源和目的IP地址、长度和其他一些标记。TCP段的首部包含了TCP端口号、TCP控制标记，以及用于数据排序和完整性检查的一些数字值")]),v._v(" "),t("p",[v._v("4.1.3 保持TCP连接的正确运行")]),v._v(" "),t("p",[v._v("在任何时刻计算机都可以有几条TCP连接处于打开状态。TCP是通过"),t("strong",[v._v("端口号")]),v._v("来保持所有这些连接的正确运行的")]),v._v(" "),t("p",[v._v("TCP连接是通过4个值来识别的"),t("code",[v._v("<源IP地址、源端口号、目的IP地址、目的端口号>")]),v._v("这4个值一起唯一地定义了一条连接。")]),v._v(" "),t("p",[v._v("4.2 对TCP性能的考虑")]),v._v(" "),t("p",[v._v("4.2.1 HTTP事务的时延")]),v._v(" "),t("p",[v._v("与建立TCP连接，以及传输请求和响应报文的时间相比，事务处理时间可能是很短的。除非客户端或服务器超载，或正在处理复杂的动态资源，否则HTTP时延就是由TCP网络时延构成的")]),v._v(" "),t("p",[v._v("HTTP事务的时延有以下几种主要原因")]),v._v(" "),t("ul",[t("li",[v._v("客户端首先需要根据URI确定Web服务器的IP地址与端口号。如果没有对URI中的主机名进行访问，通过DNS解析系统将URI中的主机名转换成一个IP地址可能要花费数十秒的时间")]),v._v(" "),t("li",[v._v("接下来，客户端会向服务器发送一条TCP连接请求，并等待服务器回送一个请求接受应答。每条新的TCP连接都会有连接建立时延。这个值通常最多只有一两秒钟，但如果有数百个HTTP事务的话，这个值会很快叠加上去")]),v._v(" "),t("li",[v._v("一旦连接建立起来了，客户端就会通过新建立的TCP管道来发送HTTP请求。数据到达时，Web服务器会从TCP连接中读取请求报文，并对其进行处理。因特网传输请求报文，以及服务器处理请求报文都需要时间")]),v._v(" "),t("li",[v._v("然后，Web服务器会回送HTTP请求，这也需要花费时间")])]),v._v(" "),t("p",[v._v("4.2.2 性能聚焦区域")]),v._v(" "),t("p",[v._v("最常见的TCP相关时延，其中包括：")]),v._v(" "),t("ul",[t("li",[v._v("TCP连接建立握手")]),v._v(" "),t("li",[v._v("TCP慢启动拥塞控制")]),v._v(" "),t("li",[v._v("数据聚集的Nagle算法")]),v._v(" "),t("li",[v._v("用于捎带确认的TCP延迟确认算法")]),v._v(" "),t("li",[v._v("TIME_WAIT时延及端口耗尽")])]),v._v(" "),t("p",[v._v("4.2.3 TCP连接的握手时延")]),v._v(" "),t("p",[v._v("建立一条新的TCP连接时，甚至是在发送任意数据之前，TCP软件之间会交换一系列的IP分组，对连接的有关参数进行沟通。如果连接只用来传送少量数据，这些交换过程就会严重降低HTTP的性能")]),v._v(" "),t("p",[v._v("建立连接3握手，关闭连接4次握手")]),v._v(" "),t("p",[v._v("4.2.4 延迟确认")]),v._v(" "),t("p",[v._v("由于因特网自身无法确保可靠的分组数据（因特网路由器超负荷的话，可以随意丢弃分组），所以TCP实现了自己的确认机制来确保数据的成功传输")]),v._v(" "),t("p",[v._v("每个TCP段都有一个序列号和数据完整性校验和。每个段的接收者收到完好的段时，都会向发送者回送小的确认分组。如果发送者没有在指定的窗口时间内收到确认信息，发送者就认为分组已被破坏或损毁，并重发数据")]),v._v(" "),t("p",[v._v("由于确认报文很小，所以TCP允许在发往相同方向的输出数据分组中对其进行“捎带”。因此很多TCP栈都实现了一种“延迟确认”算法。延迟确认算法会在一个特定的窗口时间（通常是100-200毫秒）内将输出确认放在缓冲区中，以寻找能够捎带它的数据分组。如果在哪个时间段内没有输出数据分组，就将取人信息放在段都的分组中传送")]),v._v(" "),t("p",[v._v("4.2.5 TCP慢启动")]),v._v(" "),t("p",[v._v("TCP数据传输的性能还取决于TCP连接的试用期，起初会限制连接的最大速度，如果数据传输成功，会随着时间的推移提高传输的速度，用于防止因特网的突然过载和拥塞")]),v._v(" "),t("p",[v._v("4.4 并行连接")]),v._v(" "),t("p",[v._v("HTTP允许客户端打开多条连接，并行地执行多个HTTP事务")]),v._v(" "),t("p",[v._v("并行连接缺点")]),v._v(" "),t("ul",[t("li",[v._v("每个事务都会打开/关闭一条新的连接，会耗费时间和带宽")]),v._v(" "),t("li",[v._v("由于TCP慢启动特性的存在，每条新连接的性能都会有所降低")]),v._v(" "),t("li",[v._v("可打开的并行连接数量实际上是有限的")])]),v._v(" "),t("p",[v._v("4.4.2 并行连接不一定更快")]),v._v(" "),t("p",[v._v("如果并行加载多个对象，每个对象都会区竞争有限的带宽，每个对象都会以较慢的速度按比例加载，这样带来的性能提升就很小，甚至没什么提升")]),v._v(" "),t("p",[v._v("而且，打开大量连接会消耗很多内存资源，从而引发自身的性能问题")]),v._v(" "),t("p",[v._v("4.4.3 并行连接可能让人“感觉”更快一些")]),v._v(" "),t("p",[v._v("并行连接通常会让用户觉得页面加载得更快，因为多个组件对象同时出现在屏幕上时，用户能够看到加载的进展")]),v._v(" "),t("p",[v._v("4.5 持久连接")]),v._v(" "),t("p",[v._v("HTTP/1.1（以及HTTP/1.0的各种增强版本）允许HTTP设备在事务处理结束之后将TCP连接保持在打开状态，以便为未来的HTT请求重用现存的连接")]),v._v(" "),t("p",[v._v("持久连接会在不同事务之间保持打开状态，直到客户端或服务器决定将其关闭为止")]),v._v(" "),t("p",[v._v("持久连接与并行连接配合使用可能是最高效的方式")]),v._v(" "),t("p",[v._v("持久连接有两种类型，比较老的HTTP/1.0+ “keep-alive”连接，以及现代的HTTP/1.1“persistent”连接")]),v._v(" "),t("p",[v._v("4.5.2 Keep-alive操作")]),v._v(" "),t("p",[v._v("keep-alive已经不再使用了，而且在当前的HTTP/1.1规范中也没有对它的说明了。但浏览器与服务器对keep-alive握手的使用依然相当广泛")]),v._v(" "),t("p",[v._v("实现HTTP/1.0 keep-alive连接的客户端可以通过包含Connection:Keep-Alive首部请求将一条连接保持在打开状态，如果服务器愿意为下一条请求将连接保持在打开状态，就在响应中包含相同的首部。如果响应中没有该首部，客户端就认为服务器不支持keep-alive，发回响应报文后关闭连接")]),v._v(" "),t("p",[v._v("4.5.8 HTTP/1.1持久连接")]),v._v(" "),t("p",[v._v("HTTP/1.1逐渐停止了对keep-alive连接的支持，用一种名为持久连接的改进型设计取代了它。改进连接的目的与keep-alive连接的目的相同，但工作机制更优一些")]),v._v(" "),t("p",[v._v("与HTTP/1.0+的keep-alive连接不同，HTTP/1.1持久连接在默认情况下是激活的")]),v._v(" "),t("p",[v._v("要在事务处理结束之后将连接关闭，HTTP/1.1应用程序必须向报文中显式添加一个Connection:close首部")]),v._v(" "),t("p",[v._v("4.6 管道化连接")]),v._v(" "),t("p",[v._v("HTTP/1.1允许在持久连接上可选地使用请求管道，这是在keep-alive连接上的进一步性能优化。在响应到达之前，可以将多条请求放入队列。当第一条请求通过网络流向地球另一端的服务器时，第二条和第二条请求也可以开始发送了。在高时延网络条件下，这样做可以降低网络的环回时间，提高性能")]),v._v(" "),t("p",[v._v("管道化连接的限制:")]),v._v(" "),t("ul",[t("li",[v._v("如果HTTP客户端无法确认连接是持久的，就不应该使用管道")]),v._v(" "),t("li",[v._v("必须按照与请求相同的顺序回送HTTP响应")]),v._v(" "),t("li",[v._v("HTTP客户端必须做好连接会在任意时刻关闭的转杯，还要准备好重发所有未完成的管道化请求")]),v._v(" "),t("li",[v._v("HTTP客户端不应该用管道化的方式发送会产生副作用的请求（如POST）")])]),v._v(" "),t("p",[v._v("4.7 关闭链接的奥秘")]),v._v(" "),t("p",[v._v("4.7.3 连接关闭容限、重试以及幂等性")]),v._v(" "),t("p",[v._v("如果一个事务，不管是执行一次还是很多次，得到的结果都相等，这个事务就是幂等的")]),v._v(" "),t("p",[v._v("客户端不应该以管道化方式传送非幂等请求（比如POST），否则，传输连接的过早终止就会造成一些不确定的后果。要发送一条非幂等请求，就需要等待来自前一条请求的响应状态")]),v._v(" "),t("p",[v._v("4.7.4 正常关闭连接")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("完全关闭与半关闭")]),v._v(" "),t("p",[v._v("应用程序可以关闭TCP输入和输出信道中的任意一个，或者将两者都关闭")])]),v._v(" "),t("li",[t("p",[v._v("TCP关闭及错误重置")]),v._v(" "),t("p",[v._v("当应用程序开始与很多类型的HTTP客户端、服务器和代理进行对话且开始使用管道化持久连接时，使用半关闭来防止对等实体受到非预期的写入错误就变得很重要了")]),v._v(" "),t("p",[v._v("总之，关闭连接的输出信道总是很安全的。连接另一端的对等实体会在从其缓冲区中读出所有数据之后收到一条通知，说明流结束了，这样它就知道你将连接关闭了")]),v._v(" "),t("p",[v._v("关闭连接的输入信道比较危险。除非你知道另一端不打算再发送数据了。")]),v._v(" "),t("p",[v._v("大部分操作系统都会将这种情况作为很严重的错误来处理，删除对端还未读取的所有缓存数据，对管道化来说，这是非常糟糕的事情")])]),v._v(" "),t("li",[t("p",[v._v("正常关闭")]),v._v(" "),t("p",[v._v("正常关闭的应用程序首先应该关闭它们的输出信道，然后等待另一端的对等实体关闭它的输出信道。当两端都告诉对方它们不会再发送任何数据之后，连接就会被完全关闭，而不会再有重置的危险")])])]),v._v(" "),t("h2",{attrs:{id:"第二部分-http结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第二部分-http结构","aria-hidden":"true"}},[v._v("#")]),v._v(" 第二部分 HTTP结构")]),v._v(" "),t("h2",{attrs:{id:"第5章-web服务器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第5章-web服务器","aria-hidden":"true"}},[v._v("#")]),v._v(" 第5章 Web服务器")]),v._v(" "),t("p",[v._v("5.3 实际的Web服务器会做些什么")]),v._v(" "),t("p",[v._v("（1）建立连接\n（2）接受请求\n（3）处理请求\n（4）访问资源\n（5）构建响应\n（6）发送响应\n（7）记录事务处理构成")]),v._v(" "),t("p",[v._v("5.4 第一步 接受客户端请求")]),v._v(" "),t("p",[v._v("5.4.1 处理新连接")]),v._v(" "),t("p",[v._v("客户端请求一条到Web服务器的TCP连接时，Web服务器会建立连接，判断连接的另一端是哪个客户端，从TCP连接中将IP地址解析出来")]),v._v(" "),t("p",[v._v("5.4.2 客户端主机名识别")]),v._v(" "),t("p",[v._v("可以用“反向DNS”对大部分Web服务器进行配置，一边将客户端IP地址转换成客户端主机名")]),v._v(" "),t("p",[v._v("5.5 第二步 接受请求报文")]),v._v(" "),t("p",[v._v("解析请求报文时，Web服务器会:")]),v._v(" "),t("ul",[t("li",[v._v("解析请求行，查找请求方法、指定的资源标识符（URI）以及版本号，各项之间由一个空格分隔，并以一个回车换行（CRLF）序列作为行的结束")]),v._v(" "),t("li",[v._v("读取以CRLF结尾的报文首部")]),v._v(" "),t("li",[v._v("检测以CRLF结尾的、标识首部结束的空行（如果有）")]),v._v(" "),t("li",[v._v("长度由Content-Length首部指定的请求主体（如果有）")])]),v._v(" "),t("p",[v._v("5.5.2 连接的输入/输出处理结构")]),v._v(" "),t("p",[v._v("不同的Web服务器:")]),v._v(" "),t("ul",[t("li",[v._v("单线程Web服务器")]),v._v(" "),t("li",[v._v("多进程及多线程Web服务器")]),v._v(" "),t("li",[v._v("复用I/O的服务器")]),v._v(" "),t("li",[v._v("复用的多线程web服务器")])]),v._v(" "),t("p",[v._v("5.6 第三步 处理请求")]),v._v(" "),t("p",[v._v("5.7 第四步 对资源的映射及访问")]),v._v(" "),t("p",[v._v("5.8 第五步 构建响应")]),v._v(" "),t("p",[v._v("5.8.1 响应实体")]),v._v(" "),t("p",[v._v("如果有响应主体的话，响应报文中通常包括:")]),v._v(" "),t("ul",[t("li",[v._v("描述了响应主体MIME类型的Content-Type首部")]),v._v(" "),t("li",[v._v("描述了相应主体长度的Content-Length首部")]),v._v(" "),t("li",[v._v("实际报文的主体内容")])]),v._v(" "),t("h2",{attrs:{id:"第6章-代理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第6章-代理","aria-hidden":"true"}},[v._v("#")]),v._v(" 第6章 代理")]),v._v(" "),t("p",[v._v("6.1.2 代理与网关的对比")]),v._v(" "),t("p",[v._v("严格来说，代理连接的是两个或多个使用相同协议的应用程序，而网关连接的则是两个或多个使用不同协议的端点。网关扮演的是“协议转换器”的角色")]),v._v(" "),t("p",[v._v("6.5 与代理请求有关的一些棘手问题")]),v._v(" "),t("p",[v._v("6.5.1 代理URI与服务器URI的不同")]),v._v(" "),t("p",[v._v("客户端向服务器 而不是代理发送请求时，HTTP请求报文中的URI会有所不同")]),v._v(" "),t("p",[v._v("客户端向Web服务器发送请求-部分URI\n客户端向代理发送请求-完整URI")]),v._v(" "),t("p",[v._v("6.5.4 代理既可以处理代理请求，也可以处理服务器请求")]),v._v(" "),t("p",[v._v("使用完整和部分URI的规则如下:")]),v._v(" "),t("ul",[t("li",[v._v("如果提供的是完整的URI，代理就应该使用这个完整URI")]),v._v(" "),t("li",[v._v("如果提供的是部分URI，而且有Host首部，就应该用Host首部来确定原始服务器的名字和端口号")]),v._v(" "),t("li",[v._v("如果提供的是部分URI，没有Host，就要用其他方法来确定原始服务器\n"),t("ul",[t("li",[v._v("如果代理是代表原始服务器的替代物，可以用真实服务器的地址和端口号来配置代理")]),v._v(" "),t("li",[v._v("如果流量被拦截了，而且拦截者也可以提供原始IP地址和端口，代理就可以使用拦截技术提供的IP地址和端口号")]),v._v(" "),t("li",[v._v("如果所有方法都失败了，代理没有足够的信息来确定原始服务器，就必须返回一条错误报文（通常是建议用户升级到支持Host首部的现代浏览器）")])])])]),v._v(" "),t("p",[v._v("6.6 追踪报文")]),v._v(" "),t("p",[v._v("6.6.1 Via首部")]),v._v(" "),t("p",[v._v("Via首部字段列出了与报文途径的每个中间节点（代理或网关）有关的信息。报文每经过一个节点，都必须将这个中间节点添加到Via列表的末尾")]),v._v(" "),t("p",[v._v("每个Via路标中最多包含4个组件：一个可选的协议名（默认HTTP），一个必选的协议版本，一个必选的节点名和一个可选的描述性注释")]),v._v(" "),t("p",[v._v("6.8.2 OPTIONS")]),v._v(" "),t("p",[v._v("通过HTTP OPTIONS方法，客户端可以发现Web服务器或者其上某个特定资源所支持的功能。在与服务器进行交互钱，确定服务器的能力")]),v._v(" "),t("p",[v._v("6.8.3 Allow首部")]),v._v(" "),t("p",[v._v("Allow实体首部字段列出了请求URI标识的资源所支持的方法列表")]),v._v(" "),t("p",[v._v("例如 Allow: GET,HEAD,PUT")]),v._v(" "),t("h2",{attrs:{id:"第7章-缓存"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第7章-缓存","aria-hidden":"true"}},[v._v("#")]),v._v(" 第7章 缓存")]),v._v(" "),t("p",[v._v("使用缓存的优点")]),v._v(" "),t("ul",[t("li",[v._v("缓存减少了冗余的数据传输，节省了你的网络费用")]),v._v(" "),t("li",[v._v("缓存缓解了网络瓶颈的问题。不需要更多的带宽就能够更快的加载页面")]),v._v(" "),t("li",[v._v("缓存降低了对原始服务器的要求。服务器可以更快地相应，避免过载地出现")]),v._v(" "),t("li",[v._v("缓存降低了距离时延，因为从较远地地方加载页面会更慢一些")])]),v._v(" "),t("p",[v._v("7.7 缓存地处理步骤")]),v._v(" "),t("ol",[t("li",[v._v("接收 - 缓存从网络中读取抵达地请求报文")]),v._v(" "),t("li",[v._v("解析 - 缓存对报文进行解析，提取出URL和各种首部")]),v._v(" "),t("li",[v._v("查询 - 缓存查看是否有本地副本可用，如果没有，就获取一份副本")]),v._v(" "),t("li",[v._v("新鲜度检测 - 缓存查看已缓存副本是否足够新鲜，如果不是，就询问服务器是否有任何更新")]),v._v(" "),t("li",[v._v("创建响应 - 缓存会用新的首部和已缓存的主体来构建一条响应报文")]),v._v(" "),t("li",[v._v("发送 - 缓存通过网络发回给客户端")]),v._v(" "),t("li",[v._v("日志 - 缓存可选地创建一个日志文件条目来描述这个事务")])]),v._v(" "),t("p",[v._v("7.9 控制缓存的能力")]),v._v(" "),t("p",[v._v("服务器可以通过HTTP定义的几种方式来指定在文档过期之前可以将其缓存多长时间。按照优先级递减的顺序，服务器可以：")]),v._v(" "),t("ol",[t("li",[v._v("Cache-Control: no-store")]),v._v(" "),t("li",[v._v("Cache-Control: no-cache")]),v._v(" "),t("li",[v._v("Cache-Control: must-revalidate")]),v._v(" "),t("li",[v._v("Cache-Control: max-age")]),v._v(" "),t("li",[v._v("Expires")]),v._v(" "),t("li",[v._v("不附加过期信息，让缓存确定自己的过期日期")])]),v._v(" "),t("p",[v._v("7.9.1 no-store和no-cache")]),v._v(" "),t("p",[v._v("标识位no-store的响应会禁止缓对响应进行复制。缓存通常会像非缓存代理服务器一样，向客户端转发一条no-store响应，然后删除对象")]),v._v(" "),t("p",[v._v("标识位no-cache的响应实际上是可以存储在本地缓存区中的。只是在与原始服务器进行新鲜度再验证之前，缓存不能将其提供给客户端使用")]),v._v(" "),t("p",[v._v("HTTP/1.1中提供Pragma:no-cache首部是为了兼容HTTP/1.0+。除了与只理解Pragma:no-cache的HTTP/1.0应用程序进行交互时，HTTP/1.1应用程序都应该使用Cache-Control:no-cache")]),v._v(" "),t("h2",{attrs:{id:"第三部分"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第三部分","aria-hidden":"true"}},[v._v("#")]),v._v(" 第三部分")]),v._v(" "),t("h3",{attrs:{id:"第11章-客户端识别与cookie机制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第11章-客户端识别与cookie机制","aria-hidden":"true"}},[v._v("#")]),v._v(" 第11章 客户端识别与cookie机制")]),v._v(" "),t("p",[v._v("11.6 cookie")]),v._v(" "),t("p",[v._v("11.6.1 cookie的类型")]),v._v(" "),t("p",[v._v("会话cookie和持久cookie")]),v._v(" "),t("p",[v._v("唯一区别就是它们的过期时间")]),v._v(" "),t("p",[v._v("11.6.4 不同站点使用不同的cookie")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("cookie的域属性")]),v._v(" "),t("p",[v._v("产生cookie的服务器可以向Set-cookie响应首部添加一个Domain属性来控制哪些站点可以看到那个cookie")])]),v._v(" "),t("li",[t("p",[v._v("cookie路径属性")]),v._v(" "),t("p",[v._v("cookie规范甚至允许用户将cookie与部分Web站点关联起来。可以通过Path属性来实现这一功能，在这个属性列出的URL路径前缀下所有的cookie都是有效的")])])]),v._v(" "),t("h2",{attrs:{id:"第13章-摘要认证"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第13章-摘要认证","aria-hidden":"true"}},[v._v("#")]),v._v(" 第13章 摘要认证")]),v._v(" "),t("p",[v._v("13.1 摘要认证的改进")]),v._v(" "),t("p",[v._v("摘要认证试图修复基本认证协议的严重缺陷，进行了如下改进")]),v._v(" "),t("ul",[t("li",[v._v("永远不会以明文方式在网络上发送密码")]),v._v(" "),t("li",[v._v("可以防止恶意用户捕获并重放认证的握手过程")]),v._v(" "),t("li",[v._v("可以有选择地方志对报文内容的篡改")]),v._v(" "),t("li",[v._v("放慢其他几种常见的攻击方式")])]),v._v(" "),t("p",[v._v("13.1.2 单向摘要")]),v._v(" "),t("p",[v._v("摘要是一种单向函数，主要用于将无线的输入值转换为有限的浓缩输出值。常见的摘要函数MD5，会将任意长度的字节序列转换为一个128位的摘要")]),v._v(" "),t("p",[v._v("13.1.3 用随机数防止重放攻击")]),v._v(" "),t("p",[v._v("为防止重放攻击的发生，服务器可以向客户端发送一个称为随机数的特殊令牌，这个数会经常发生变化（可能是每毫秒，或者是每次认证都变化）。客户端在计算摘要之前要先将这个随机数令牌附加到密码上去")]),v._v(" "),t("p",[v._v("随机数是在WWW-Authenticate质询中从服务器传送给客户端的")]),v._v(" "),t("h2",{attrs:{id:"第14章-安全http"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第14章-安全http","aria-hidden":"true"}},[v._v("#")]),v._v(" 第14章 安全HTTP")]),v._v(" "),t("p",[v._v("14.1 保护HTTP的安全")]),v._v(" "),t("p",[v._v("HTTPS是位于安全层之上的HTTP，这个安全层位于TCP之上")]),v._v(" "),t("p",[v._v("可以使用SSL，也可以使用其后继者TLS")]),v._v(" "),t("p",[v._v("14.6.3 用证书对服务器进行认证")]),v._v(" "),t("p",[v._v("通过HTTPS建立了一个安全Web事务之后，现代的浏览器都会自动获取所连接服务器的数字证书。如果服务器没有证书，安全连接就会失败。服务器证书中包含很多字段，其中包括：")]),v._v(" "),t("ul",[t("li",[v._v("Web站点的名称和主机名")]),v._v(" "),t("li",[v._v("Web站点的公开密钥")]),v._v(" "),t("li",[v._v("签名颁发机构的名称")]),v._v(" "),t("li",[v._v("来自签名颁发机构的签名")])]),v._v(" "),t("p",[v._v("14.7 HTTPS————细节介绍")]),v._v(" "),t("p",[v._v("14.7.1 HTTPS概述")]),v._v(" "),t("p",[v._v("HTTPS将HTTP协议与一组强大的对称，非对称和基于证书的加密技术结合在一起，使得HTTPS不仅很安全，而且很灵活，很容易在处于无序状态的、分散的全球互联网上进行管理")]),v._v(" "),t("p",[v._v("HTTPS在将HTTP报文发送给TCP之前，先将其发送给一个安全层，对其进行加密")]),v._v(" "),t("p",[v._v("现在，HTTP安全层是通过SSL及其现代替代协议TLS来实现的。我们遵循常见的用法，用术语SSL来表示SSL或者TLS")]),v._v(" "),t("p",[v._v("14.7.2 HTTPS方案")]),v._v(" "),t("p",[v._v("请求一个客户端（比如Web浏览器）对某Web资源执行某事务时，它回去检查URL的方案")]),v._v(" "),t("ul",[t("li",[v._v("如果URL方案为http，客户端就会打开一条到服务器端口80（默认情况下）的连接，并想起发送老的HTTP命令")]),v._v(" "),t("li",[v._v("如果URL方案为https，客户端就会打开一条到服务器端口443（默认情况下）的连接，然后与服务器“握手”，以二进制格式与服务器交换一些SSL安全参数，附上加密的HTTP命令")])]),v._v(" "),t("p",[v._v("SSL是一个二进制协议，与HTTP完全不同，其流量是承载在另一个端口上的（SSL通常是由端口443承载的）。如果SSL和HTTP流量都从80端口到达，大部分Web服务器会将二进制SSL流量理解为错误的HTTP并关闭连接。将安全服务进一步整合到HTTP层中去就无需使用多个目的端口了，在实际中这样不会引发严重的问题")]),v._v(" "),t("p",[v._v("14.7.3 建立安全传输")]),v._v(" "),t("p",[v._v("由于SSL安全层的存在，HTTPS中这个过程会略微复杂一些。在HTTPS中，客户端首先打开一条到Web服务器端口443（安全HTTP的默认端口）的连接。一旦建立了TCP连接，客户端和服务器就会初始化SSL层，对加密参数进行沟通，并交换密钥。握手完成之后，SSL初始化就完成了，客户端就可以将请求报文发送给安全层了。将这些报文发送给TCP之前，要先对其进行加密")]),v._v(" "),t("p",[v._v("14.7.4 SSL握手")]),v._v(" "),t("p",[v._v("握手过程中，要完成的工作:")]),v._v(" "),t("ul",[t("li",[v._v("交换协议版本号")]),v._v(" "),t("li",[v._v("选择一个两端都了解的密码")]),v._v(" "),t("li",[v._v("对两端的身份进行认证")]),v._v(" "),t("li",[v._v("生成临时的会话密钥，以便加密信道")])]),v._v(" "),t("p",[v._v("握手基本思想")]),v._v(" "),t("ol",[t("li",[v._v("客户端发送可供选择的密码并请求证书")]),v._v(" "),t("li",[v._v("服务器发送选中的密码和证书")]),v._v(" "),t("li",[v._v("客户端发送保密信息，客户端和服务器生成密钥")]),v._v(" "),t("li",[v._v("客户端和服务器互相告知，开始加密过程")])]),v._v(" "),t("p",[v._v("14.9 通过代理以隧道形式传输安全流量")]),v._v(" "),t("p",[v._v("客户端开始用服务器的公开密钥对发往服务器的数据进行加密，代理就再也不能读取HTTP首部了，代理不能堆区HTTP首部，就无法知道应该将请求转向何处")]),v._v(" "),t("p",[v._v("为了使HTTPS与代理配合工作，要进行几处修改以告知代理连接到何处。一种常见的技术就是HTTPS SSL隧道协议。使用HTTPS隧道协议，客户端首先要告知dialing，它想要连接的安全主机和端口。这是在开始加密之前，以明文形式告知的，所以代理可以理解这条信息")]),v._v(" "),t("h2",{attrs:{id:"第15章-实体和编码"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第15章-实体和编码","aria-hidden":"true"}},[v._v("#")]),v._v(" 第15章 实体和编码")]),v._v(" "),t("p",[v._v("15.5 内容编码")]),v._v(" "),t("p",[v._v("15.5.1 内容编码过程")]),v._v(" "),t("ol",[t("li",[v._v("网站服务器生成原始响应报文，其中有原始的Content-Type和Content-Langth首部")]),v._v(" "),t("li",[v._v("内容编码服务器（也可能就是原始的服务器或下行的代理）创建编码后的报文。编码后的报文有同样的Content-Type但Content-Langth可能不同（比如主体被压缩了）。内容编码服务器在编码后的报文中增加Content-Encoding首部，这样接收的应用程序就可以进行解码了")]),v._v(" "),t("li",[v._v("接收程序得到的编码后的报文，进行解码，获得原始报文")])]),v._v(" "),t("p",[v._v("15.6 传输编码和分块编码")]),v._v(" "),t("p",[v._v("经过内容编码的报文，只是对报文的实体部分进行了编码。而对于经过传输编码的报文来说，编码作用在整个报文上，报文自身的结构发生了改变")]),v._v(" "),t("p",[v._v("15.6.2 Transfer-Encoding首部")]),v._v(" "),t("p",[v._v("HTTP协议只定义了下面两个首部来描述和控制传输编码")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("Transfer-Encoding\n告知接收方为了可靠地传输报文，已经对其进行了何种编码")])]),v._v(" "),t("li",[t("p",[v._v("TE\n用在请求首部中，告知服务器可以使用哪些传输编码拓展")])])]),v._v(" "),t("p",[v._v("最新的HTTP规范只定义了一种传输编码-分块编码")]),v._v(" "),t("p",[v._v("15.6.3 分块编码")]),v._v(" "),t("p",[v._v("分块编码把报文分割成若干个大小已知的块。块之间是紧挨着发送的，这样就不需要再发送之前知道整个报文的大小了")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("分块与持久连接")]),v._v(" "),t("p",[v._v("当使用持久连接时，在服务器写主体之前，必须知道它的大小并在Content-Length首部中发送。如果服务器动态创建内容，就可能在发送之前无法知道主体的长度")]),v._v(" "),t("p",[v._v("分块编码为这种困难提供了解决方法")])]),v._v(" "),t("li",[t("p",[v._v("分块报文的拖挂")]),v._v(" "),t("p",[v._v("如果客户端大的TE首部中说明它可以接收拖挂的话，就可以在分块的报文最后加上拖挂。产生原始响应的服务器也可以在分块的报文最后加上拖挂。拖挂的内容时可选的元数据。客户端不一定需要理解和使用")]),v._v(" "),t("p",[v._v("拖挂中可以包含附带的首部字段，除了Transfer-Encoding、Trailer以及Content-Length首部之外，其他HTTP首部都可以作为拖挂发送")])])]),v._v(" "),t("p",[v._v("15.6.5 传输编码的规则")]),v._v(" "),t("p",[v._v("对报文主体使用传输编码时，必须遵守以下规则")]),v._v(" "),t("ul",[t("li",[v._v("传输编码集合中必须包括“分块”。唯一的例外时只用关闭连接来结束报文")]),v._v(" "),t("li",[v._v("当使用分块传输编码时，它必须是最后一个作用到报文主体之上的")]),v._v(" "),t("li",[v._v("分款传输编码不能多次作用在一个报文主体上")])]),v._v(" "),t("p",[v._v("15.8 验证码与新鲜度")]),v._v(" "),t("p",[v._v("客户端和服务器为了能正确使用Expires首部，它们的时钟必须同步。这并不总是很容易的，因为它们可能都没有运行像Network Time Protocol（网络时间协议，NTP）这样的时钟同步协议")]),v._v(" "),t("p",[v._v("Cache-Control首部可以用秒数来规定文档最长使用期——从文档离开服务器之后算起的总计时间")]),v._v(" "),t("p",[v._v("Cache-Control首部的指令")]),v._v(" "),t("p",[v._v("|指令|报文类型|描述|\n|no-cache|请求|在重新向服务器验证之前，不要返回文档的缓存副本|\n|no-store|请求|不要返回文档的缓存副本，不要保存服务器的响应|\n|max-age|请求|缓存中的文档不能超过指定的使用期|\n|max-stale|请求|文档允许过期（根据服务器提供的过期信息计算），但不能超过指令中指定的过期值|\n|min-fresh|请求|文档的使用期不能小于这个指定的时间与它的当前存活时间之和。换句话说，响应必须至少在指定的这段时间之间保持新鲜|\n|no-transform|请求|文档在发送之前不允许被转换|\n|only-if-cached|请求|只有当文档在缓存中才发送，不要联系原始服务器|\n|public|响应|响应应该可以被任何服务器缓存|\n|private|响应可以被缓存，但只能被单个客户端访问|\n|no-cache|响应|如果该之林通过伴随一个首部列表的话，那么内容可以被缓存并提供给客户端，但必须先删除所列出的首部。如果没有指定首部，缓存中的副本在没有重新向服务器验证之前不能提供给客户端|\n|no-store|响应|响应不允许被缓存|\n|no-transform|响应|响应在提供给客户端之前不能做任何形式的修改|\n|must-revalidate|响应|响应在提供给客户端之前必须重新向服务器验证|\n|proxy-revalidate|响应|共享的缓存在提供给客户端之前必须重新向原始服务器验证，私有的缓存可以忽略这条指令|\n|max-age|响应|指定文档可以被缓存的时间以及新鲜度的最长时间|\n|s-max-age|响应|指定文档作为共享缓存时的最长使用时间（如果有max-age指令的话，以本指令为准）。私有的缓存可以忽略本指令|")]),v._v(" "),t("p",[v._v("15.8.2 有条件的请求与验证码")]),v._v(" "),t("p",[v._v("有条件的请求类型")]),v._v(" "),t("p",[v._v("|请求类型|验证码|描述|\n|If-Modified-Since|Last-Modified|如果在前一条响应的Last-Modified首部中说明的时间之后，资源的版本发生变化，就发送其副本|\n|If-Unmodified-Since|Last-Modified|仅在前一条响应的Last-Modified首部中说明的时间之后，资源的版本没有变化，才发送其副本|\n|If-Match|ETag|如果实体的标记与前一次响应首部中的ETag相同，就发送该资源的副本|\n|If-None-Match|ETag|如果实体的标记与前一次响应首部中的ETag不同，就发送该资源的副本|")]),v._v(" "),t("p",[v._v("修改时间被当作弱验证码，因为尽管它说明了资源最后被修改的时间，但它的描述精度最大就是1秒。因为资源在1秒内可以改变很多次。而且服务器每秒可以处理数千个请求，最后修改日期时间并不总能反应变化情况")]),v._v(" "),t("p",[v._v("ETag首部被当作强验证码，因为每当资源内容改变时，服务器都可以在ETag首部放置不同的值")]),v._v(" "),t("p",[v._v("16.1 国际化")]),v._v(" "),t("p",[v._v("16.3.6 字符编码方案")]),v._v(" "),t("ul",[t("li",[v._v("固定宽度")]),v._v(" "),t("li",[v._v("可变宽度（无模态）")]),v._v(" "),t("li",[v._v("可变宽度（有模态）")])]),v._v(" "),t("p",[v._v("常见编码方案")]),v._v(" "),t("ol",[t("li",[t("p",[v._v("8位")]),v._v(" "),t("p",[v._v("8位固定宽度恒等编码把每个字符代码编码为响应的8位二进制值。它只能支持有256个字符代码范围的字符集。iso-8859字符集家族系列使用的就是8位恒等编码")])]),v._v(" "),t("li",[t("p",[v._v("UTF-8")]),v._v(" "),t("p",[v._v("UTF-8为字符代码值使用的是无模态的变宽编码，第一字节的高位表示编码后的字符所使用的字节数，所需的每个后续字节都含有6位的代码值")]),v._v(" "),t("p",[v._v("UTF-8 最大的一个特点，就是它是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。")]),v._v(" "),t("p",[v._v("UTF-8 的编码规则很简单，只有二条：")]),v._v(" "),t("p",[v._v("1）对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。")]),v._v(" "),t("p",[v._v("2）对于n字节的符号（n > 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。")]),v._v(" "),t("p",[t("code",[v._v("我们知道，计算机内部，所有信息最终都是一个二进制值。每一个二进制位（bit）有0和1两种状态，因此八个二进制位就可以组合出256种状态，这被称为一个字节（byte）。也就是说，一个字节一共可以用来表示256种不同的状态，每一个状态对应一个符号，就是256个符号，从00000000到11111111。 上个世纪60年代，美国制定了一套字符编码，对英语字符与二进制位之间的关系，做了统一规定。这被称为 ASCII 码，一直沿用至今。 ASCII 码一共规定了128个字符的编码，比如空格SPACE是32（二进制00100000），大写的字母A是65（二进制01000001）。这128个符号（包括32个不能打印出来的控制符号），只占用了一个字节的后面7位，最前面的一位统一规定为0。")])]),v._v(" "),t("p",[t("code",[v._v("可以想象，如果有一种编码，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码，那么乱码问题就会消失。这就是 Unicode，就像它的名字都表示的，这是一种所有符号的编码。")])])])]),v._v(" "),t("p",[v._v("16.5.2 URI字符集合")]),v._v(" "),t("p",[v._v("URI中允许出现的US-ASCII字符的子集，可以被分成保留，未保留以及转义字符这几类。未保留的字符可用于URI允许其出现的任何部分。保留的字符在很多URI中都有特殊的含义，因此一般来说不能使用它们")]),v._v(" "),t("p",[v._v("16.5.3 转义和反转义")]),v._v(" "),t("p",[v._v("URI转义提供了一种安全的方式，可以在URI内部插入保留字符以及原本不支持的字符（比如各种空白）。每个转义是一组3字符序列，由百分号（%）后面跟上两个十六进制数字的字符。这两个十六进制数字就表示一个US-ASCII字符的代码")]),v._v(" "),t("h2",{attrs:{id:"第18章-web主机托管"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第18章-web主机托管","aria-hidden":"true"}},[v._v("#")]),v._v(" 第18章 Web主机托管")]),v._v(" "),t("p",[v._v("18.2.1 虚拟服务器请求缺乏主机信息")]),v._v(" "),t("p",[v._v("HTTP/1.0中的一个设计缺陷会使虚拟主机托管者抓狂。HTTP/1.0规范中没有为共享的Web服务器提供任何方法来识别要访问的是哪一个托管的网站")]),v._v(" "),t("p",[v._v("HTTP/1.0请求在报文中只发送了URL的路径部分，没有提到主机名，如果服务器虚拟托管了多个站点，就没有足够的信息能指出要访问的是哪个虚拟网站")]),v._v(" "),t("p",[v._v("18.2.2 设法让虚拟主机托管正常工作")]),v._v(" "),t("ul",[t("li",[t("p",[v._v("通过URL路径进行虚拟主机托管")]),v._v(" "),t("p",[v._v("在URL中增添专门的路径部分，以便服务器判断是哪个网站")])]),v._v(" "),t("li",[t("p",[v._v("通过端口号进行主机托管")]),v._v(" "),t("p",[v._v("为每个站点分配不同的端口号，这样请求就由Web服务器的单独实例来处理")])]),v._v(" "),t("li",[t("p",[v._v("通过IP地址进行主机托管")]),v._v(" "),t("p",[v._v("为不同的虚拟站点分配专门的I地址，把这些地址都绑定到一台单独的机器上")])]),v._v(" "),t("li",[t("p",[v._v("通过HOST首部进行主体托管")]),v._v(" "),t("p",[v._v("很多Web托管者向HT设计者施压，要求解决这个问题。HTTP/1.0的增强版和HTTP/1.1的正式版定义了HOST请求首部来携带网站名称。Web服务器可以通过HOST首部识别虚拟站点")])])]),v._v(" "),t("p",[v._v("18.2.3 HTTP/1.1的HOST首部")]),v._v(" "),t("ul",[t("li",[v._v("如果HOST首部不包含端口，就使用地址方案中默认的端口")]),v._v(" "),t("li",[v._v("如果URL中包含IP地址，HOST首部就应当包含同样的地址")]),v._v(" "),t("li",[v._v("如果URL中包含主机名，HOST首部就必须包含同样的名字")]),v._v(" "),t("li",[v._v("如果URL中包含主机名，HOST首部就不应当包含URL中这个主机名对应的IP地址")]),v._v(" "),t("li",[v._v("如果URL包含主机命名，HOST首部就不应当包含这个主机的其他别名")]),v._v(" "),t("li",[v._v("如果客户端显式地使用代理服务器，客户端就必须把原始服务器，而不是代理服务器地名字和端口放在HOST首部中")]),v._v(" "),t("li",[v._v("Web客户端必须在所有请求报文中包含HOST首部")]),v._v(" "),t("li",[v._v("Web代理必须在转发请求报文之前，添加HOST首部")]),v._v(" "),t("li",[v._v("HTTP/1.1地Web服务器必须用400状态码来响应所有缺少HOST首部字段的HTTP/1.1请求报文")])]),v._v(" "),t("p",[v._v("对于没有进行主机托管，而且不允许资源随请求主机的不同而变化的原始服务器来说，可以忽略HOST首部字段的值，但资源会随主机名的不同而变化的原始服务器，都必须在一条HTTP/1.1请求判断其所请求的资源时使用下列规则")]),v._v(" "),t("ol",[t("li",[v._v("如果HTTP请求报文中的URL是绝对的（也就是说包含方案和主机部分），就忽略HOST首部的值")]),v._v(" "),t("li",[v._v("如果HTTP请求报文中的URL没有主机部分，而该请求带有HOST首部，则主机/端口的值就从HOST首部中取")]),v._v(" "),t("li",[v._v("如果1或2都无法获得有效的主机，就向客户端返回400 Bad Request响应")])]),v._v(" "),t("p",[v._v("18.3 使网站更可靠")]),v._v(" "),t("p",[v._v("18.3.1 镜像的服务器集群")]),v._v(" "),t("p",[v._v("服务器集群是一排配置相同的Web服务器，互相可以替换。每个服务器上的内容可以通过镜像复制，这样当某个服务器出问题的时候，其他可以顶上")]),v._v(" "),t("h2",{attrs:{id:"第20章-重定向与负载均衡"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第20章-重定向与负载均衡","aria-hidden":"true"}},[v._v("#")]),v._v(" 第20章 重定向与负载均衡")]),v._v(" "),t("p",[v._v("20.4 通用的重定向方法")]),v._v(" "),t("p",[v._v("20.4.1 HTTP重定向")]),v._v(" "),t("p",[v._v("Web服务器可以将短的重定向报文发回客户端，告诉它们其他地方")]),v._v(" "),t("p",[v._v("有些Web站点会将HTTP重定向作为一种简单的负载均衡形式来使用。处理重定向的服务器找到可用的负载最小的内容服务器，并将浏览器重定向到那台服务器上去")]),v._v(" "),t("p",[v._v("HTTP重定向的优点之一就是重定向服务器知道客户端的IP地址")]),v._v(" "),t("p",[v._v("缺点:")]),v._v(" "),t("ul",[t("li",[v._v("需要原始服务器进行大量处理来判断要重定向到哪台服务器上去。有时，发布重定向所需的处理量几乎与提供页面本身所需的处理量一样")]),v._v(" "),t("li",[v._v("增加了用户时延，因为访问页面时要进行两次往返")]),v._v(" "),t("li",[v._v("如果重定向服务器出故障，站点就会瘫痪")])]),v._v(" "),t("p",[v._v("由于存在这些弱点，HTTP重定向通常会和其他一种或多种重定向技术结合使用")]),v._v(" "),t("p",[v._v("20.4.2 DNS重定向")]),v._v(" "),t("p",[v._v("DNS解析程序可能是客户端自己的操作系统，可能是客户端网络中的一台DNS服务器，或者是一台远距离的DNS服务器。DNS允许将几个IP地址关联到一个域中，可以配置DNS解析程序，或对其进行编程，以返回可变的IP地址。解析程序返回IP地址时所基于的原则可以很简单（轮转），也可以很复杂（比如查看几台服务器上的负载，并返回负载最轻的服务器的IP地址）")]),v._v(" "),t("ol",[t("li",[v._v("轮转")])]),v._v(" "),t("p",[v._v("最常见的重定向技术之一也是最简单的重定向技术之一。DNS轮转使用了DNS主机名解析中的一项特征，在Web服务器集群中平衡负载")]),v._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[v._v("多个地址及轮转地址的循环")])]),v._v(" "),t("p",[v._v("大多数DNS客户端只会使用多地址集中的第一个地址。为了均衡负载，大多数DNS服务器都会在每次完成查询之后对地址进行轮转。这种地址轮转通常称作DNS轮转")]),v._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[v._v("用来平衡负载的DNS轮转")])]),v._v(" "),t("p",[v._v("由于大多数DNS客户端只使用第一个地址，所以DNS轮转可以在多台服务器间提供负载均衡。如果DNS没有对地址进行轮转，大部分客户端就总是会将负载发送给第一台服务器")]),v._v(" "),t("ol",{attrs:{start:"4"}},[t("li",[v._v("DNS缓存带来的影响")])]),v._v(" "),t("p",[v._v("DNS对服务器的每次查询得到不同的服务器地址序列，所以DNS地址轮转会将负载分摊。但这种负载均衡并不完美，因为DNS查找的结果可能会被记住，并被各种应用程序、操作系统和一些简易的子DNS服务器重用")]),v._v(" "),t("ol",{attrs:{start:"5"}},[t("li",[t("p",[v._v("其他基于DNS的重定向算法")]),v._v(" "),t("ul",[t("li",[v._v("负载均衡算法")]),v._v(" "),t("li",[v._v("邻接路由算法")]),v._v(" "),t("li",[v._v("故障屏蔽算法")])])])]),v._v(" "),t("p",[v._v("30.4.3 任播寻址")]),v._v(" "),t("p",[v._v("在任播寻址中，几个地理上分散的Web服务器拥有完全相同的IP地址，而且会通过骨干路由起的“最短路径”路由功能将客户端的请求发送给离它最近的服务器")]),v._v(" "),t("p",[v._v("20.4.4 IP MAC转发")]),v._v(" "),t("p",[v._v("20.4.5 IP地址转发")]),v._v(" "),t("p",[v._v("20.4.6 网元控制协议")]),v._v(" "),t("p",[v._v("20.5 代理的重定向方法")]),v._v(" "),t("p",[v._v("20.5.1 显示浏览器配置")]),v._v(" "),t("p",[v._v("显示浏览器配置有以下两个主要的缺点")]),v._v(" "),t("ul",[t("li",[v._v("配置为使用代理的浏览器，即使在代理无法响应的情况下，也不会去联系原始服务器。如果代理崩溃了，或者没有正确配置浏览器，用户就会遇到连接方面的问题")]),v._v(" "),t("li",[v._v("对网络架构进修改，并将这些修改通知给所有的终端用户都是困难的。如果服务提供上要添加更多的代理服务器，或者使其中一些推出服务，用户都要修浏览器代理设置")])]),v._v(" "),t("p",[v._v("20.5.2 代理自动配置")]),v._v(" "),t("p",[v._v("代理自动配置（PAC）协议")]),v._v(" "),t("p",[v._v("PAC的基本思想是让浏览器去获取一个称为PAC的特殊文件，这个文件说明了每个URL所关联的代理。必须配置浏览器，为这个PAC文件关联一个特定的服务器。这样，浏览器每次重启的时候都可以获取这个PAC文件了")]),v._v(" "),t("p",[v._v("20.5.3 Web代理自动发现协议")]),v._v(" "),t("p",[v._v("WPAD（Web代理自动发现协议）的目标是在不要求终端用户手工配置代理设置，而且不依赖透明流量拦截的情况下，为Web浏览器提供一种发现并使用附近代理的方式")])])},[],!1,null,null,null);_.default=p.exports}}]);