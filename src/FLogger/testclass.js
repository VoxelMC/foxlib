class TestPlayerFrame {
    NewPlayer(name, health) {
        return new TestPlayer(name, health);
    }
}

class TestPlayer extends TestPlayerFrame {
    constructor(name, health) {
        super(name, health);
        this.name = name;
        this.health = health;
    }

    GetName() {
        return this.name;
    }

    SetName(name) {
        this.name = name;
        return this.name;
    }

    GetHealth() {
        return this.health;
    }

    SetHealth(health) {
        if (typeof health === "function") { return health(this.health) }
        else this.health = health; return health;
    }
}

const TP = new TestPlayerFrame();
var Billy = TP.NewPlayer("Billy", 92);
console.log(Billy.GetName());
console.log(Billy.SetName("new name"));
console.log(Billy.GetHealth());
console.log(Billy.SetHealth(1000));
console.log(Billy.SetHealth(h => {
    return h += 69;
}));