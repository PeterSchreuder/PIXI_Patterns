import { GameObject } from "../engine/components/GameObject";
import { ObjectTypes } from "../utilities/Enums";

export class ObjectPool {

    private _stage: PIXI.Container;

    private _activeObjects: Array<GameObject>;
    private _nonActiveObjects: Array<GameObject>;

    constructor(_stage: PIXI.Container, _object: GameObject, _amount: number) {

        this._activeObjects = new Array<GameObject>();
        this._nonActiveObjects = new Array<GameObject>();

        this._stage = _stage;
    }

    public CreateObject(_amount: number, _x?: number, _y?: number, _sprite?: PIXI.Sprite, _type?: ObjectTypes): GameObject | Array<GameObject> {

        let _return;


        //- If the non active pool has any objects in it, take the first and reset it
        
        
        function resetObject(_stage: PIXI.Container, _array: Array<GameObject>): GameObject {

            let _object;

            if (_array.length > 0) {

                _object = _array[0];

                if (_object != undefined)
                {
                    _object.x = _x;
                    _object.y = _x;
                    _object.sprite = _sprite;
                    _object.type = _type;
                }
                
    
            } else {
    
                _object = new GameObject(_stage, _x, _y, _sprite, _type);
            } 

            return _object;
        }

        return _return;
    }
}