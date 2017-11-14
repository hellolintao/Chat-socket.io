//获取http服务
var app=require("http").createServer();
//取得io实例，并且转化成app的类型
var io=require("socket.io")(app)
//设置端口号变量
var port =3000

var userCount=0
//设置服务监听
app.listen(port);
//当io发生连接的时候 connection
io.on("connection",function(socket){
	userCount++
	socket.nikeName="user"+userCount
	//使用io发送广播，类型是enter
	io.emit("enter",socket.nikeName+"进入房间");
	//socket是当前的连接，当当前的连接收到消息的时候怎么做，这个message是固定的
	socket.on("message",function(str){
		//使用io发送广播，类型是message
		io.emit("message",socket.nikeName+":"+str)
	})
	//当前的连接，发生了断开操作的时候，进行的操作
	socket.on("disconnect",function(){
		//使用io发送广播，类型是leave
		io.emit("leave",socket.nikeName+"离开房间")
	})
})

//总结 打开好多窗口的时候，每个窗口都对应着一个socket  但是只有一个io  
//所以之后io发送消息的时候,所有的窗口都可以收到

