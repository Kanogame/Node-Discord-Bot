package Utils

import "fmt"

func ServerErrorHandler(err error) {
	if err != nil {
		panic(err)
	}
}

func ClientErrorHandler(err error) {
	if err != nil {
		fmt.Println(err)
	}
}
