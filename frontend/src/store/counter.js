import { makeAutoObservable } from "mobx";
import axios from 'axios';

class Counter {
    count = 0;
    users = [];

    constructor() {
        makeAutoObservable(this);
    }

    get res() {
        return this.count + 100;
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    async getUsers() {
        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data;
    }
}

let counter = new Counter();

export default counter;
