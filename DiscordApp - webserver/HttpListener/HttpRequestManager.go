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
	fmt.Println(r.URL.Path)
	if r.URL.Path == "/token/new" {
		fmt.Println("postNewPlayer")
		postNewPlayer(w, r)
	} else if r.URL.Path == "/token/remove" {
		fmt.Println("postRemovePlayer")
		postRemovePlayer(w, r)
	} else if r.URL.Path == "/token/get" {
		postGetPlayer(w, r)
	} else if r.URL.Path == "/guild/get" {
		fmt.Println("postGetGuild")
		postGetGuild(w, r)
	}
}
