package main

import (
	"fmt"
	"math/rand"
	"time"
)

type SystemCheck struct {
	ID        int
	Status    string
	Timestamp int64
}

func worker(id int, jobs <-chan int, results chan<- SystemCheck) {
	for j := range jobs {
		// Simulating heavy processing
		time.Sleep(time.Millisecond * 100)
		status := "OK"
		if rand.Intn(10) > 8 {
			status = "ERROR"
		}
		results <- SystemCheck{ID: j, Status: status, Timestamp: time.Now().Unix()}
		fmt.Printf("Worker %d finished job %d\n", id, j)
	}
}

func main() {
	jobs := make(chan int, 100)
	results := make(chan SystemCheck, 100)

	// Launching 5 workers (Concurrency simulation)
	for w := 1; w <= 5; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 50; j++ {
		jobs <- j
	}
	close(jobs)

	for a := 1; a <= 50; a++ {
		<-results
	}
	fmt.Println("All system checks completed successfully.")
}
