package httplistener

import (
	"fmt"
	"net/http"
	"strconv"
)

var postType = ""

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
	if postType == "" {
		postGetType(r)
		fmt.Fprintf(w, "success")
	} else if postType == "newToken" {
		postNewPlayer(w, r)
	} else if postType == "deleteToken" {
		postRemovePlayer(w, r)
	}
}
