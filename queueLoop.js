{
  init: (elevators, floors) => {
    elevators.forEach((e, index) => {
      e.goToFloor(index);
      // Whenever the elevator is idle (has no more queued destinations) ...
      e.on("idle", () => {
        e.goToFloor((e.currentFloor() + 1) % floors.length);
      });
      e.on("floor_button_pressed", floorNum => {
        if (e.loadFactor < .25) {
          // cycle upwards
          e.goToFloor((e.currentFloor() + 1) % floors.length);
        } else {
          e.goToFloor(floorNum);
        }
      });
    });

  },
    update: (dt, elevators, floors) => {
      // We normally don't need to do anything here
    }
}