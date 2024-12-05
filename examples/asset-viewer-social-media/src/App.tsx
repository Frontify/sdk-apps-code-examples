import { useEffect, useState } from 'react';
import { Router } from './Router.tsx';
import { getUserCredentials } from './useCase/Authentication.ts';

export const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [init, setInit] = useState(true);

    useEffect(() => {
        const initializeAppWithCredentials = async () => {
            const credentials = await getUserCredentials();
            if (credentials) {
                setLoggedIn(true);
            }
            setInit(false);
        };

        initializeAppWithCredentials();
    }, []);

    return (
        <div className="flex h-[100vh] bg-zinc-500 justify-center items-center">
            <div className="flex flex-col rounded-xl bg-[#161e27]">
                <Router init={init} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </div>
        </div>
    );
};
