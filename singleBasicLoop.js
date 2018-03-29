{
  init: (elevators, floors) => {
    let elevator = elevators[0]; // Let's use the first elevator

    // Whenever the elevator is idle (has no more queued destinations) ...
    elevator.on("idle", function () {
      if (this.getPressedFloors()[0]) {
        this.goToFloor(this.getPressedFloors()[0]);
      } else {
        // if no queue
        this.goToFloor((this.currentFloor() + 1) % floors.length);
      }
    });

  },
  update: (dt, elevators, floors) => {
    // We normally don't need to do anything here
  }
}