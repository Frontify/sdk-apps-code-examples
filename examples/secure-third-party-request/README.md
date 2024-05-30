# Secure Requests Example
This example app demonstrates the use of our Secure Request feature, built with React and styled using Tailwind CSS.

## Information

Similar to our Hello World example, this app comes pre-configured with our platform fonts, design system components, and styles. This ensures that you have a consistent look and feel across the application, adhering to our design standards right from the start.

- **Platform Fonts:** The app is set up to use our standard fonts, ensuring typography consistency.
- **Design System Components and Styles:** The app includes [Fondue](https://fondue-components.frontify.com/), Frontify design system, making it easy to build complex UIs with a unified design language.

For more details on how to customize and extend this app, please refer to the [documentation](https://developer.frontify.com/).

### Requirements:

-   Node 20
-   Access to a Frontify Instance.

### Setup
1. Install the dependencies
    ```
    npm install
    ```
   Or
    ```
    pnpm install
    ```
2. Serve the app
    ```
    npm run serve
    ```
    Or
    ```
    pnpm serve
    ```
3. Go to your Frontify Instance

## Manifest Configuration

The `manifest.json` file is a crucial part of your app setup. It allows your app to control where it surfaces within the platform. Your app can appear in various locations such as the asset creation menu or the asset action menu.

Additionally, the `manifest.json` file enables you to specify the types of files your app can work with, such as images, audio files, specific formats like jpg, png, and more.

For detailed information on configuring the `manifest.json` file, please refer to our [documentation](https://developer.frontify.com/).

## Secure Request Feature

To use the Secure Request feature, you need to add two key configurations to the `manifest.json` file:

1. **Secrets Definition**: This section contains an array of secrets that your application will use. Each secret has a key (the identifier) and a label (displayed in the frontend).
2. **Network Endpoints**: This section defines the network endpoints your application will use to retrieve the secret values. Each endpoint has a name, a resource URL, and options such as headers, method, and body. These endpoints allow the application to access the secret values defined by admins in the marketplace settings.

### Example Manifest Configuration

Here is an example configuration to be added in the `manifest.json`:

```json
{
  "secrets": [
    { "key": "THIRD_PARTY_API_KEY", "label": "Example Service" }
  ],
  "network": {
    "endpoints": [
      {
        "name": "body-endpoint-id",
        "resource": "https://jsonplaceholder.typicode.com/posts",
        "options": {
          "headers": {
            "Content-type": "application/json"
          },
          "method": "POST",
          "body": {
            "title": "$$title$$",
            "body": "%%THIRD_PARTY_API_KEY%%"
          }
        }
      }
    ]
  }
}
```

### Using the Secure Request in Your App
To retrieve the secret values in your application, use the getSecretRequest method from appBridge.api. Here is an example:

```javascript
const appBridge = usePlatformAppBridge();

const response = await appBridge?.api({
  name: 'getSecretRequest',
  payload: { id: 'body-endpoint-id', requestParams: { title: "title" } },
});
```
This example shows how to call the secure request to retrieve an API token value. The id in the payload (id: 'body-endpoint-id') corresponds to the endpoint name defined in the manifest.json. The requestParams object allows you to pass any additional parameters required by the endpoint.

By configuring these settings in the manifest.json and using the getSecretRequest method, your application can securely access and use sensitive information, such as API keys, defined by the admins in the marketplace settings.

For more detailed information, please refer to our [documentation](https://developer.frontify.com/).
