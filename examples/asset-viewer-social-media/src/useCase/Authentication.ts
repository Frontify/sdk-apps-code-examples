import AtpAgent from "@atproto/api";
import { AppBridgePlatformApp } from "@frontify/app-bridge-app";

export const AuthorizeUser = async ({ identifier, password }: { identifier: string, password: string }) => {

    const appBridge = new AppBridgePlatformApp();
    const agent = new AtpAgent({
        service: 'https://bsky.social'
    })

    const { data } = await agent.login({
        identifier: identifier,
        password: password
    })

    appBridge.state("userState").set({ accessJwt: data.accessJwt, refreshJwt: data.refreshJwt, handle: data.handle, did: data.did })
}


export const getUserCredentials = async () => {

    const appBridge = new AppBridgePlatformApp();
    const userState = appBridge.state("userState").get();
    if (userState && userState.accessJwt) {
        const { success, agent, data } = await refreshAccessToken(userState);
        if (success) {
            appBridge.state("userState").set({
                accessJwt: userState.accessJwt,
                refreshJwt: userState.refreshJwt,
                handle: data.handle,
                did: data.did
            })
            return { agent, accessJwt: userState.accessJwt, refreshJwt: userState.refreshJwt, handle: data.handle, did: data.did }
        } else {
            return null
        }
    } else {
        return null
    }
}

const refreshAccessToken = async ({ accessJwt, refreshJwt, handle, did }: { refreshJwt: string, handle: string, did: string, accessJwt: string }) => {

    const agent = new AtpAgent({
        service: 'https://bsky.social'
    })
    const { success, data } = await agent.resumeSession({ accessJwt, refreshJwt, handle, did, active: true })
    return { success, agent, data }
}

export const logoutUser = () => {
    const appBridge = new AppBridgePlatformApp();
    appBridge.state("userState").set({ accessJwt: "", refreshJwt: "", handle: "", did: "" })
}

