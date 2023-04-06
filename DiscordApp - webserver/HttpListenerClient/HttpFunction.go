package httplistenerclient

import (
	"encoding/json"
	"io"
	utils "main/Utils"
	"net/http"
)

func postPlayerPause(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	var post utils.PauseJSON
	err = json.Unmarshal(body, &post)
	if err != nil {
		panic(err)
	}

}
