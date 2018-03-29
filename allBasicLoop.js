{
  init: (elevators, floors) => {
    elevators.forEach(e => {
      
      // Whenever the elevator is idle (has no more queued destinations) ...
      e.on("idle", function () {
        if (e.getPressedFloors()[0]) {
          e.goToFloor(e.getPressedFloors()[0]);
        } else {
          // if no queue
          e.goToFloor((e.currentFloor() + 1) % floors.length);
        }
      });
    });

  },
    update: (dt, elevators, floors) => {
      // We normally don't need to do anything here
    }
}