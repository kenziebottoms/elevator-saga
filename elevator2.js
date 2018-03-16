{
    init: function(elevators, floors) {
        var recentlyPressed = [];
        for (var e=0; e<elevators.length; e++) {
            elevators[e].on("idle", function() {
                if (recentlyPressed.length > 0) {
                    this.goToFloor(recentlyPressed.pop());
                } else {
                    this.goToFloor(0);
                }
            });
            elevators[e].on("floor_button_pressed", function(f) {
                if (this.loadFactor == 1) {
                    if (this.destinationQueue.indexOf(f) != -1) {
                    } else {
                        this.destinationQueue.push(f);
                    }
                } else {
                    if (this.destinationQueue.indexOf(f) != -1) {
                        this.destinationQueue.shift(this.destinationQueue.indexOf(f),1);
                        this.goToFloor(f);
                    } else {
                        this.destinationQueue.push(f);
                    }
                }
                this.goToFloor(this.destinationQueue.pop());
            });
            elevators[e].on("passing_floor", function(f,dir) {
                if (this.loadFactor != 1 && recentlyPressed.indexOf(f) != -1) {
                    this.destinationQueue.unshift(f);
                    recentlyPressed.shift(recentlyPressed.indexOf(f,1));
                }
            });
        }
        
        for (var f=0; f<floors.length; f++) {
            floors[f].on("up_button_pressed", function() {
                if (recentlyPressed.indexOf(f) != -1) {
                    recentlyPressed.shift(recentlyPressed.indexOf(f),1);
                }
                recentlyPressed.push(this.floorNum());
            });
            floors[f].on("down_button_pressed", function() {
                if (recentlyPressed.indexOf(f) != -1) {
                    recentlyPressed.shift(recentlyPressed.indexOf(f),1);
                }
                recentlyPressed.push(this.floorNum());
            });
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}