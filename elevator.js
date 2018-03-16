{
    init: function(elevators, floors) {
        // define recentlyPressed
        var recentlyPressed = [];

        // recently pressed
        for (var j=0; j<floors.length; j++) {
            floors[j].on("up_button_pressed", function() {
                if (this.floorNum() != recentlyPressed[recentlyPressed.length - 1]) {
                    var closest = 0;
                    for (var k=1; k<elevators.length; k++) {
                        if (elevators[k].currentFloor() - this.floorNum() < 
                            elevators[k-1].currentFloor() - this.floorNum()) {
                            closest = k;
                        }
                    }
                    console.log(closest);
                    elevators[closest].destinationQueue.unshift(this.floorNum());
                    console.log(elevators[closest].destinationQueue);
                }
            });
            floors[j].on("down_button_pressed", function() {
                if (this.floorNum() != recentlyPressed[recentlyPressed.length - 1]) {
                    recentlyPressed.push(this.floorNum());
                }
            });
        }

        // elevator's default autonomous behavior
        for (var i=0; i<elevators.length; i++) {
            // when idle
            elevators[i].on("idle", function() {
                if (recentlyPressed.length > 0) {
                    this.goToFloor(recentlyPressed.pop());
                } else {
                    this.goToFloor(0);
                }
            });
            // when somebody presses a button in the elevator
            elevators[i].on("floor_button_pressed", function(floorNum) {
                console.log("dQ: "+this.destinationQueue+"   rP: "+recentlyPressed);
                if (Math.abs(this.currentFloor() - this.destinationQueue[0]) <
                    Math.abs(this.currentFloor() - floorNum)) {
                    this.goToFloor(this.destinationQueue[0]);
                    this.goToFloor(floorNum);
                } else {
                    this.goToFloor(floorNum);
                }
            });
        }
    },
        update: function(dt, elevators, floors) {
        }
}