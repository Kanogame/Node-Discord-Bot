package httplistener

import (
	"encoding/json"
	"fmt"
	"io"
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
	} else if r.Method == "POST" {
		PostHandler(w, r)
	}
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(postGetType(w, r))
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.NewTokenJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, "success")
	fmt.Println(post)
}

func postGetType(w http.ResponseWriter, r *http.Request) string {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
	res := string(body)
	if res == "" {
		panic("NOT SUPPORTED FORMAT")
	}
	fmt.Fprintf(w, "success")
	return res
}
