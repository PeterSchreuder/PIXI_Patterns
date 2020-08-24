import * as PIXI from "pixi.js"
import { isContext } from "vm";

export class Context {

    private strategy: Strategy;

    constructor(_strategy: Strategy) {
        this.strategy = _strategy;
    }

    public setStrategy(_strategy: Strategy) {
        this.strategy = this.strategy;
    }

    public doSOmeBusinessLogic(): void {

        console.log("COntext: Sorting data using the strategy");
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}

interface Strategy {
    doAlgorithm(_data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
    public doAlgorithm(_data: string[]): string[] {
        return _data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(_data: string[]): string[] {
        return _data.reverse();
    }
}




const _context = new Context(new ConcreteStrategyA());
console.log("Client: Strategy is set to normal sorting.");
_context.doSOmeBusinessLogic();

console.log("");

console.log("Clinet: Strategy is set to reverse sorting.");
_context.setStrategy(new ConcreteStrategyB());
_context.doSOmeBusinessLogic();
