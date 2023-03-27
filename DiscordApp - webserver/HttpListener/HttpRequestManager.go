package httplistener

import (
	"fmt"
	"net/http"
	"strconv"
)

func StartHttpServer(port int) {
	handler := http.HandlerFunc(HttpHandler)
	fmt.Println("RequestManager is lintening on", port)
	http.ListenAndServe(":"+strconv.Itoa(port), handler)
}

func HttpHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
		fmt.Fprintln(w, "listener on this port does not support GET")
	} else if r.Method == "POST" {
		PostHandler(w, r)
	}
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/token/get" {
		postNewPlayer(w, r)
	} else if r.URL.Path == "/token/remove" {
		postRemovePlayer(w, r)
	} else if r.URL.Path == "/guild/get" {
		postGetGuild(w, r)
	}
}
