export const getAssetsByIds = (assetIds: string[]) => `
    query GetAssetsByIds {
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

export const updateAssetTitle = (assetId: string, newTitle: string) => `
    mutation UpdateAssetTitle {
        updateAsset(input: {id: "${assetId}", data: {title: "${newTitle}"}}) {
            asset {
                id
                title
                ... on Image {
                    previewUrl
                    extension
                }
            }
        }
    }
`;
