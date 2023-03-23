package main

import (
	httplistener "main/HttpListener"
	httplistenerclient "main/HttpListenerClient"
)

func main() {
	go httplistener.StartHttpServer(4319)
	httplistenerclient.StartHttpServer(4320)
}
