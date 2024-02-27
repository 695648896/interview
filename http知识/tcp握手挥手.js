// TCP位码,有6种标示:SYN(synchronous建立联机) ACK(acknowledgement 确认) PSH(push传送) FIN(finish结束) RST(reset重置) URG(urgent紧急)

// Sequence number(顺序号码) Acknowledge number(确认号码)

// 三次握手

// 第一次握手：主机A发送位码为syn＝1,随机产生seq number=x的数据包到服务器，客户端进入SYN_SEND状态，等待服务器的确认；主机B由SYN=1知道，A要求建立联机；

// 第二次握手：主机B收到请求后要确认联机信息，向A发送ack number(主机A的seq+1),syn=1,ack=1,随机产生seq=y的包,此时服务器进入SYN_RECV状态;

// 第三次握手：主机A收到后检查ack number是否正确，即第一次发送的seq number+1,以及位码ack是否为1，若正确，主机A会再发送ack number(主机B的seq+1),ack=1，主机B收到后确认seq值与ack=1则连接建立成功。客户端和服务器端都进入ESTABLISHED状

// 态，完成TCP三次握手。



// 四次挥手

// 第一次挥手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；

// 第二次挥手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我也没有数据要发送了，可以进行关闭连接了；

// 第三次挥手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入CLOSE_WAIT状态；

// 第四次挥手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。