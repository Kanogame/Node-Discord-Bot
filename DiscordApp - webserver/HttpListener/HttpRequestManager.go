package httplistener

import (
	"fmt"
	dbutils "main/DButils"
	utils "main/utils"
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
			user.token = token
			user.passhash = pass
			dbutils.GetQueueByToken(dbutils.CreateNewConnection(), user)
			fmt.Println(token)
		}
	}
}
