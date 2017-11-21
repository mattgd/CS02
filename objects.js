function Flight(to, from, price, duration) {
    this.toLocation = to;
    this.fromLocation = from;
    this.price = price;
    this.duration = duration;
}

function GameState(stateId, stateName) {
    this.id = stateId;
    this.name = stateName;
}