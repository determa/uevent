import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import counter from "./store/counter";

const Counter = observer(() => {
    return (
        <div>
            <h1>Count: {counter.res}</h1>
            <button onClick={() => counter.increment()}>Increment</button>
            <button onClick={() => counter.decrement()}>Decrement</button>
            <br />
            <div>
                <button onClick={() => counter.getUsers()}>Get Users</button>
                <h1>Users:</h1>
                {counter.users.map((user) => (
                    <div key={user.id.value}>
                        {/* <p>Name: {user.name}</p> */}
                        <p>Email: {user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Counter;
