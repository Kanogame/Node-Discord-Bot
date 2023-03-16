package httplistener

import (
	"fmt"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
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
	}
}
