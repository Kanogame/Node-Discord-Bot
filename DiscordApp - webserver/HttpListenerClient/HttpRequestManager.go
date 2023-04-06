package httplistenerclient

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/rs/cors"
)

var postType = ""

func StartHttpServer(port int) {
	var c = cors.New(cors.Options{
		AllowedOrigins: []string{"http://127.0.0.1:3000"},
	})
	handler := http.HandlerFunc(HttpHandler)
	fmt.Println("RequestManager is lintening on", port)
	http.ListenAndServe(":"+strconv.Itoa(port), c.Handler(handler))
}

func HttpHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "GET" {
	} else if r.Method == "POST" {
		PostHandler(w, r)
	}
}

func PostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL.Path)
	if r.URL.Path == "/player/pause" {
		fmt.Println("player pause")
		postPlayerPause(w, r)
	}
}
