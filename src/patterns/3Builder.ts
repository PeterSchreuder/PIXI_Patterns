import * as PIXI from "pixi.js"

import { House } from "./_house";

export class HouseBuilder {

    private readonly _address: string;
    private _floorNumber: number = 0;
    private _isHavingParking: boolean = false;
    private _isHavingGarden: boolean = false;
    
    constructor(_address: string) {
        this._address = _address;
    }

    setFloor(_floor: number): HouseBuilder {
        this._floorNumber = _floor;
        return this;
    }

    makeParking(): HouseBuilder {
        this._isHavingParking = true;
        return this;
    }

    makeGarden(): HouseBuilder {
        this._isHavingParking = true;
        return this;
    }

    build() {
        return new House(this);
    }

    get address(): string  {
		return this._address;
    }

    get floorNumber(): number  {
		return this._floorNumber;
    }
    
    get isHavingParking(): boolean  {
        return this._isHavingParking;
    }

    get isHavingGarden(): boolean  {
        return this._isHavingGarden;
    }
    
    // import { HouseBuilder } from "./3Builder";
    // const myHouse = new HouseBuilder("Adder")
    // .setFloor(5)
    // .makeGarden()
    // .makeParking()
    // .build();
}
