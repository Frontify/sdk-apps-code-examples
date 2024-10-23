export const getAssetsByIds = (assetIds: string[]) => `
    query Assets {
        assets(ids: [${assetIds.map((id) => `"${id}"`)}]) {
            id
            title
            ... on Image {
                previewUrl
                extension
            }
        }
    }
`;
