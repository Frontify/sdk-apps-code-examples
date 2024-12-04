import AtpAgent from "@atproto/api";
import { AppBridgePlatformApp } from "@frontify/app-bridge-app";

export const setUserLoggedIn = async ({ identifier, password }: { identifier: string, password: string }) => {

    const agent = new AtpAgent({
        service: 'https://bsky.social'
    })

    const { data } = await agent.login({
        identifier: identifier,
        password: password
    })

    return { accessJwt: data.accessJwt, refreshJwt: data.refreshJwt, handle: data.handle, did: data.did };
}


export const getLoggedInUser = async () => {

    const appBridge = new AppBridgePlatformApp();
    const userState = appBridge.state("userState").get();
    if (userState && userState.accessJwt) {
        const { success, agent, data } = await refreshAccessToken(userState);
        if (success) {
            return { agent, accessJwt: data.accessJwt, refreshJwt: data.refreshJwt, handle: data.handle, did: data.did }
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

