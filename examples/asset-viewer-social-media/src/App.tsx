import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { BlueSkyInputMask } from './BlueskyInputMask';
import { BlueskyLogin } from './BlueskyLogin';
import { LogoutButton } from './BlueskyLogout';
import { PostConfirmation } from './ConfirmationScreen';
import { getLoggedInUser, setUserLoggedIn } from './useCase/LogUserIn';
import { createPostWithImage } from './useCase/PostImageOnBluesky';

export const App = () => {
    const appBridge = new AppBridgePlatformApp();
    const [image, setImage] = useState<string | undefined>();


    const [loggedIn, setLoggedIn] = useState(false);
    const [initializing, setInitializing] = useState(true);


    useEffect(() => {
        const initializeAppWithCredentials = async () => {

            const context = appBridge.context().get();
            if (context.surface === "assetViewer") {
                const assetResource = await appBridge.api({ "name": "getAssetResourceInformation", payload: { assetId: context.assetId } })
                setImage(assetResource.previewUrl)
            }


            const credentials = await getLoggedInUser();
            if (credentials) {
                appBridge.state("userState").set({
                    accessJwt: credentials.accessJwt,
                    refreshJwt: credentials.refreshJwt,
                    handle: credentials.handle,
                    did: credentials.did
                })
                setLoggedIn(true)
            }
            setInitializing(false)
        }
        initializeAppWithCredentials();
    }, [])

    const setUserLoggedState = async (identifier: string, password: string) => {
        const { accessJwt, refreshJwt, handle, did } = await setUserLoggedIn({ identifier, password });
        appBridge.state("userState").set({ accessJwt: accessJwt, refreshJwt, handle, did })
    }

    const Router = () => {
        const [showConfirmation, setShowConfirmation] = useState(false);

        if (initializing) {
            return <div className="flex flex-col rounded-xl bg-[#161e27]"></div>
        }

        if (!loggedIn) {
            return <BlueskyLogin onLoginSuccess={(identifier, password) => {
                setUserLoggedState(identifier, password)
                setLoggedIn(true);
            }} />
        }

        if (showConfirmation) {
            return <PostConfirmation onClose={() => setShowConfirmation(false)} />
        }

        return <div className="flex flex-col rounded-xl bg-[#161e27]">
            <BlueSkyInputMask imageSrc={image + "?mod=v1/resize=400"} onSubmit={(input) => {
                setShowConfirmation(true);
                createPostWithImage(input);
            }} />
            <LogoutButton onLogout={() => {
                appBridge.state("userState").set({ identifier: "", password: "" })
                setLoggedIn(false)
            }} />
        </div>
    }

    return (
        <div className="flex h-[100vh] bg-zinc-500 justify-center items-center">
            <Router />
        </div>
    );
};
