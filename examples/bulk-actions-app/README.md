# Hello World
This is a basic example of an App using the Bulk actions Surface.
## Information

This app is the basic example to get you started with our platform. Even though it's simple, it comes pre-configured with our platform fonts, design system components, and styles. This ensures that you have a consistent look and feel across the application, adhering to our design standards right from the start.

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

The `manifest.json` file is a crucial part of your app setup. It allows your app to control where it surfaces within the platform. Your app can appear in various location, this app for example is only visible for the asset Bulk Actions.

Additionally, the `manifest.json` file enables you to specify the types of files your app can work with formats like jpg, png, and more.

For detailed information on configuring the `manifest.json` file, please refer to our [documentation](https://developer.frontify.com/).
