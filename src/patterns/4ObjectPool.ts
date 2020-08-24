import { GameObject } from "../engine/components/GameObject";
import { ObjectTypes } from "../utilities/Enums";

export class ObjectPool {

    private _stage: PIXI.Container;

    public _activeObjects: Array<GameObject>;
    public _nonActiveObjects: Array<GameObject>;

    constructor(_stage: PIXI.Container, _object: GameObject, _amount: number) {

        this._activeObjects = new Array<GameObject>();
        this._nonActiveObjects = new Array<GameObject>();

        this._stage = _stage;
    }

    public CreateObject(_amount: number, _x: number, _y: number, _sprite?: PIXI.Sprite, _type?: ObjectTypes): GameObject | undefined {

        let _return = undefined;

        //- If the non active pool has any objects in it, take the first and reset it
        const resetObject = (_stage: PIXI.Container, _array: Array<GameObject>): GameObject | undefined => {

            let _object;

            //- Get the object first in the list
            if (_array.length > 0) {

                _object = _array[0];

                if (_object != undefined)
                {
                    _object.x = _x;
                    _object.y = _x;

                    if (_sprite)
                        _object.sprite = _sprite;

                    _object.type = _type;
                }

                //- Remove it from the Active list
                _array.splice(0, 1);
                
            //- Else create a new object and put it in the Active list
            } else {

                _object = new GameObject(_stage, _x, _y, _sprite, _type);
            } 

            this._activeObjects.push(_object);

            _return = _object;
            return _object;
        }

        const disableObject = (_object: GameObject) => {

            let _obj = this._activeObjects.findIndex(_object);
            console.log("id", _obj);

            console.log("Before")
            console.log("Non Active", this._nonActiveObjects.length)
            console.log("Active", this._activeObjects.length)


            //- Add it to the NonAeactive list and Remove it from the Active list
            this._nonActiveObjects.push(_object);
            this._activeObjects.splice(_obj, 1);

            console.log("After")
            console.log("Non Active", this._nonActiveObjects.length)
            console.log("Active", this._activeObjects.length)
        }

        return _return;
    }
}