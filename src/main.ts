import * as PIXI from "pixi.js"

import {GameProperties} from "./utilities/GameProperties";
import {GameLoop} from "./GameLoop";

window.onload = () => onLoad();

/* Pattern Sources:
Strategy: https://refactoring.guru/design-patterns/strategy/typescript/example#:~:text=Patterns%20%2F%20Strategy%20%2F%20TypeScript-,Strategy%20in%20TypeScript,delegates%20it%20executing%20the%20behavior.
Factory: https://refactoring.guru/design-patterns/factory-method/typescript/example
Builder: https://medium.com/@itayelgazar/the-builder-pattern-in-node-js-typescript-4b81a70b2ea5
Object Pool (Own experience) But i still read the page: https://sourcemaking.com/design_patterns/object_pool
Singleton: https://medium.com/javascript-everyday/singleton-made-easy-with-typescript-6ad55a7ba7ff
Adepter: https://refactoring.guru/design-patterns/adapter/typescript/example
Facade: https://refactoring.guru/design-patterns/facade/typescript/example
Observer: https://refactoring.guru/design-patterns/observer/typescript/example
State: https://refactoring.guru/design-patterns/state/typescript/example
*/

function onLoad(): void {

    //- Pre- load the Sprites
    let loader = PIXI.Loader.shared;
    let app: PIXI.Application;
    let _gameLoop: GameLoop;

    loader
        .add("body", "body.png")
        .add("bodyEnd", "bodyEnd.png")
        .add("player", "player.png")
        .add("tile", "tile.png")
        .add("pickup", "pickup.png");
        
    loader.onProgress.add(showLoaderProgress);
    loader.onError.add(reportLoaderError);
    loader.onComplete.add(setup);

    let spriteResources = loader.resources;

    loader.load((loader, resources) => {
        
        console.log("Loaded Resources: ", resources);
    });

    //- Setup the game
    function setup(): void {
        
        app = new PIXI.Application({
            width: GameProperties.levelWidth,
            height: GameProperties.levelHeight,
            backgroundColor: 0xAAAAAA
        });

        let mainGameDiv = document.querySelector("#display");

        if (mainGameDiv != null)
            mainGameDiv.appendChild(app.view);
        else
            console.error("No 'display' div found in html");

        // Start the game
        _gameLoop = new GameLoop(app);

        _gameLoop.setupGame();
        gameLoop(_gameLoop);
    }

    function gameLoop(game: GameLoop): void {

        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

function showLoaderProgress(e: any): void {

    console.log(e.progress);
}

function reportLoaderError(e: any): void {

    console.error("ERROR: " + e.message);
}

