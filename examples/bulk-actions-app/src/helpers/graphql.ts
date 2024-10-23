export const getAssetIds = (assetIds: string[]) => `
    query assetIds {
        assets(ids: [${assetIds.map((id) => `"${id}"`)}]) {
            title
            ... on Image {
                previewUrl
                extension
            }
        }
    }
`;
