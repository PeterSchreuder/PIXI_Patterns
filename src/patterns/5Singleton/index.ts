import { BehaviorSubject } from 'rxjs';

interface Action {
    type: string;
}

class ActionBus {
    private static instance: ActionBus;
    private actionSubject = new BehaviorSubject<Action>(null);

    get actions$() {
        return this.actionSubject.asObservable();
    }

    private constructor() {
    }

    static getInstance(): ActionBus {
        if (!ActionBus.instance) {
            ActionBus.instance = new ActionBus();
        }

        return ActionBus.instance;
    }

    dispatch(action: Action) {
        this.actionSubject.next(action);
    }
}



//- Illegal since the constructor is private
const illegalActionsBus = new ActionBus();

const firstActionsBus = ActionBus.getInstance();
const secondActionsBus = ActionBus.getInstance();

//- Both constants reference the same object
console.log(firstActionsBus === secondActionsBus);

firstActionsBus.actions$.subscribe(console.log);
secondActionsBus.dispatch({ type: 'Fetch news' });
