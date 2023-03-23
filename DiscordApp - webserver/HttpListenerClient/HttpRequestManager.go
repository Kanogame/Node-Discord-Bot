package httplistenerclient

import (
	"fmt"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
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
		path := r.URL.Path

		if path == "/tracks" {
			token := r.URL.Query().Get("token")
			pass := r.URL.Query().Get("pass")
			var user utils.User
			user.Token = token
			user.Passhash = pass
			databaseHandler.GetQueueByToken(databaseHandler.CreateNewConnection(), user)
			fmt.Println(token)
		}
	} else if r.Method == "POST" {
		PostHandler(w, r)
	}
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	if postType == "" {
		postGetType(r)
		fmt.Fprintf(w, "success")
	} else {
		postNewPlayer(w, r)
	}
}
