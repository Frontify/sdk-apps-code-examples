import { AppBridgePlatformApp } from '@frontify/app-bridge-app';
import { useEffect, useState } from 'react';
import { BlueSkyInputMask } from './BlueskyInputMask';
import { BlueskyLogin } from './BlueskyLogin';
import { LogoutButton } from './BlueskyLogout';
import { PostConfirmation } from './ConfirmationScreen';
import { AuthorizeUser, getUserCredentials, logoutUser } from './useCase/LogUserIn';
import { createPostWithImage } from './useCase/PostImageOnBluesky';

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

const Router = ({ init, loggedIn, setLoggedIn }: { init: boolean, loggedIn: boolean, setLoggedIn: (state: boolean) => void }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        const initializeImage = async () => {
            const appBridge = new AppBridgePlatformApp();
            const context = appBridge.context().get();
            if (context.surface === "assetViewer") {
                const assetResource = await appBridge.api({ "name": "getAssetResourceInformation", payload: { assetId: context.assetId } })
                setImage(assetResource.previewUrl)
            }
        }

        initializeImage()
    }, [])

    const loginUser = async (identifier: string, password: string) => {
        await AuthorizeUser({ identifier, password });
    }

    if (init) {
        return <div className="flex flex-col rounded-xl bg-[#161e27]"></div>
    }

    if (!loggedIn) {
        return <BlueskyLogin onLoginSuccess={(identifier, password) => {
            loginUser(identifier, password)
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
            logoutUser();
            setLoggedIn(false)
        }} />
    </div>
}
