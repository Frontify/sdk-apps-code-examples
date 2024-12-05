import { useEffect, useState } from 'react';
import { Router } from "./Router.tsx";
import { getUserCredentials } from './useCase/Authentication.ts';

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [init, setInit] = useState(true);


    useEffect(() => {
        const initializeAppWithCredentials = async () => {
            const credentials = await getUserCredentials();
            if (credentials) {
                setLoggedIn(true)
            }
            setInit(false)
        }

        initializeAppWithCredentials();
    }, [])



    return (
        <div className="flex h-[100vh] bg-zinc-500 justify-center items-center">
            <Router init={init} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
    );
};


