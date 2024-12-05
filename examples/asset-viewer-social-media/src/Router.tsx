import { AppBridgePlatformApp } from "@frontify/app-bridge-app";
import { useEffect, useState } from "react";
import { InputMask } from "./BlueskyComponents/InputMask.tsx";
import { Login } from "./BlueskyComponents/Login.tsx";
import { Logout } from "./BlueskyComponents/Logout.tsx";
import { PostConfirmation } from "./BlueskyComponents/PostConfirmation.tsx";
import { AuthorizeUser, logoutUser } from "./useCase/Authentication.ts";
import { createPostWithImage } from "./useCase/CreatePostWithImage.ts";

export const Router = ({ init, loggedIn, setLoggedIn }: {
    init: boolean,
    loggedIn: boolean,
    setLoggedIn: (state: boolean) => void
}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [image, setImage] = useState<string | undefined>();

    useEffect(() => {
        const initializeImage = async () => {
            const appBridge = new AppBridgePlatformApp();
            const context = appBridge.context().get();
            if (context.surface === "assetViewer") {
                const assetResource = await appBridge.api({
                    "name": "getAssetResourceInformation",
                    payload: { assetId: context.assetId }
                })
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
        return <Login onLoginSuccess={(identifier, password) => {
            loginUser(identifier, password)
            setLoggedIn(true);
        }} />
    }

    if (showConfirmation) {
        return <PostConfirmation onClose={() => setShowConfirmation(false)} />
    }

    return <div className="flex flex-col rounded-xl bg-[#161e27]">
        <InputMask imageSrc={image + "?mod=v1/resize=400"} onSubmit={(input) => {
            setShowConfirmation(true);
            createPostWithImage(input);
        }} />
        <Logout onLogout={() => {
            logoutUser();
            setLoggedIn(false)
        }} />
    </div>
}
