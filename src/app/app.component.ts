import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  seatsRequired: number = 0;
  seatingArrangement: string[][] = [];
  recentlyBookedSeats: string[] = [];

  constructor() {
    this.initializeCoach();
  }

  // Function to initialize the coach seating arrangement
  initializeCoach() {
    // 'A' denotes available seats, 'R' denotes reserved seats
    for (let i = 0; i < 10; i++) {
      this.seatingArrangement.push(Array(7).fill('A')); // 10 rows, 7 seats each
    }
    this.seatingArrangement.push(Array(3).fill('A')); // Last row with 3 seats

    // Pre-booked (reserved) seats
    this.seatingArrangement[0][2] = 'R';
    this.seatingArrangement[2][5] = 'R';
    this.seatingArrangement[4][1] = 'R';
  }

  // Function to handle seat allocation based on the requested number
  allocateSeats() {
    if (this.seatsRequired < 1 || this.seatsRequired > 7) {
      alert('Please enter a number between 1 and 7.');
      return;
    }

    let seatsToBook = this.seatsRequired;
    this.recentlyBookedSeats = [];

    // First priority is to try and book seats in one row
    for (
      let rowIndex = 0;
      rowIndex < this.seatingArrangement.length;
      rowIndex++
    ) {
      const availableSeatsInRow = this.seatingArrangement[rowIndex].filter(
        (seat) => seat === 'A'
      ).length;

      if (availableSeatsInRow >= seatsToBook) {
        this.bookSeatsFromRow(rowIndex, seatsToBook);
        return;
      }
    }

    // If no single row can accommodate, try booking in the closest rows
    for (
      let rowIndex = 0;
      rowIndex < this.seatingArrangement.length && seatsToBook > 0;
      rowIndex++
    ) {
      for (
        let seatIndex = 0;
        seatIndex < this.seatingArrangement[rowIndex].length && seatsToBook > 0;
        seatIndex++
      ) {
        if (this.seatingArrangement[rowIndex][seatIndex] === 'A') {
          this.seatingArrangement[rowIndex][seatIndex] = 'R';
          this.recentlyBookedSeats.push(
            `Row ${rowIndex + 1}, Seat ${seatIndex + 1}`
          );
          seatsToBook--;
        }
      }
    }

    // If there are not enough seats, notify the user
    if (seatsToBook > 0) {
      alert('Sorry, there are not enough seats available.');
    }
  }

  // Helper function to book a specific number of seats in a given row
  bookSeatsFromRow(rowIndex: number, seatsToBook: number) {
    let seatsBooked = 0;

    for (
      let seatIndex = 0;
      seatIndex < this.seatingArrangement[rowIndex].length &&
      seatsBooked < seatsToBook;
      seatIndex++
    ) {
      if (this.seatingArrangement[rowIndex][seatIndex] === 'A') {
        this.seatingArrangement[rowIndex][seatIndex] = 'R';
        this.recentlyBookedSeats.push(
          `Row ${rowIndex + 1}, Seat ${seatIndex + 1}`
        );
        seatsBooked++;
      }
    }
  }
}
