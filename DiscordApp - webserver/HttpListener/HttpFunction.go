package httplistener

import (
	"encoding/json"
	"fmt"
	"io"
	databaseHandler "main/DatabaseHandler"
	utils "main/Utils"
	"net/http"
)

func postGetType(r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	res := string(body)
	fmt.Println(res)
	postType = res
}

func postNewPlayer(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.NewTokenJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}
	fmt.Fprintf(w, "success")
	db := databaseHandler.CreateNewConnection()
}
