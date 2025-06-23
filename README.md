# React Native Privy Embedded Wallet Template

This is a wallet template which uses Expo, React Native, Monad and Privy Embedded Wallet.

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Prerequisites

- Node.js
- NPM
- Expo CLI (Install using the following command: `npm i -g expo-cli`)
- Privy Account

For Android:
- [Android Studio](https://developer.android.com/studio) (API version 35 and above)
  - Guide to setup Android Studio for Expo is available [here](https://docs.expo.dev/workflow/android-studio-emulator/)

For iOS:
- [XCode](https://apps.apple.com/in/app/xcode/id497799835?mt=12)
  - Guide to setup iOS Simulator for Expo is available [here](https://docs.expo.dev/workflow/ios-simulator/)


### Setting up the Privy account

#### Create App

![create app](/assets/readme/privy_create_app.png)

![nameing app](/assets/readme/privy_naming_app.png)

#### Set up login methods

![set up login methods](/assets/readme/set_up_login_methods.png)

#### Enable email

![enable email](/assets/readme/enable_email.png)

#### Enable  "Automatically create embedded wallets on login" and select "EVM Wallets"

![create wallets automatically](/assets/readme/create_wallet_automatically.png)

#### Disable everything in Socials

#### Go to "Advanced" and Make sure only "Web2: Email, SMS, and socials" under "Prioritize options displayed" is enabled.

![prioritize web2 methods](/assets/readme/prioritize_web2_methods.png)

#### Tip: You can enable "Test Accounts" for testing purposes.

![test wallets](/assets/readme/test_wallets.png)

A few more steps are required but we will continue once the dependencies for the project are installed.

## Get started

### Install dependencies

```bash
npm install
```

### Set up the environment variables

- Create a copy of `.env.example`

```bash
cp .env.example .env
```

- Add the following environment variables to it

```
EXPO_PUBLIC_PRIVY_APP_ID=
EXPO_PUBLIC_PRIVY_CLIENT_ID=
```

#### `EXPO_PUBLIC_PRIVY_APP_ID`

1. Go to your Privy Dashboard and click on `Home` for your Privy app and click on `Retrieve API keys`.

![retrieve api keys](/assets/readme/retrieve_api_keys.png)

2. You will find `App ID` under `API keys`.

![api key](/assets/readme/api_keys.png)

#### `EXPO_PUBLIC_PRIVY_CLIENT_ID`

1. Go to your Privy Dashboard and click on "Home" for your Privy app and click on `Retrieve API keys`.

![retrieve api keys](/assets/readme/retrieve_api_keys.png)

2. Click on the `Clients` tab at the top and click on `Edit`.

![clients](/assets/readme/clients.png)

3. Under `Allowed app identifiers` paste the name of the app bundle and click `Add`

You can find the app bundle name in `app.json` for Android it is `package` property and iOS it is the `bundleIdentifier` property

![allowed identifiers](/assets/readme/allowed_identifiers.png)

4. You can copy the `Client ID` and use as the value for `EXPO_PUBLIC_PRIVY_CLIENT_ID`.

![client_id](/assets/readme/client_id.png)

### Start the app

The below commands will start the app in Expo Go app on respective devices.

For iOS:

```bash
npm run ios
```

For Android:

```bash
npm run android
```

For native app builds use the following commands:

For iOS:

```bash
npm run expo:ios
```

For Android:

```bash
npm run expo:android
```

## Folder structure

```
react-native-privy-embedded-wallet-template/
  ├── app/
  │   ├── _layout.tsx <--- Root layout of the project
  │   ├── +not-found.tsx
  │   ├── demo/ <--- This is entrypoint for the Wallet related code.
  │   │   ├── _layout.tsx
  │   │   ├── app/ <--- If Authenticated the user can access route /app
  │   │   │   ├── _layout.tsx
  │   │   │   └── index.tsx
  │   │   └── sign-in/ <--- Unauthenticated user gets redirected to /sign-in
  │   └── index.tsx <--- This is the landing page
  ├── assets/
  │   ├── fonts/ <--- Custom fonts go here
  │   │   └── SF_Pro_Rounded/ <--- Custom Font example
  │   └── images/
  │       ├── adaptive-icon.png
  │       ├── favicon.png
  │       ├── icon.png
  │       ├── monad-icon.png
  │       ├── monad-logo-inverted.png
  │       ├── monad-logo.png
  │       ├── partial-react-logo.png
  │       └── splash-icon.png
  ├── components/
  │   ├── sheets/ <--- All the bottom sheets are here
  │   └── ui/
  ├── config/
  │   ├── privyConfig.ts <--- Privy related config
  │   ├── providers.tsx 
  │   └── wagmiConfig.ts <--- Monad Testnet related config
  ├── constants/
  ├── context/
  │   ├── AuthContext.tsx
  │   └── WalletContext.tsx <--- Wallet actions implementations are here
  ├── hooks/
  ├── screens/
  │   ├── Email/ <--- Screen that asks for Email
  │   ├── Home/ <--- Wallet Home screen (Authenticated users only)
  │   ├── Landing/ <--- Screen with info on how to use the template
  │   └── OTP/ <--- Screen that asks for the OTP code sent to email
  ├── scripts/
  │   └── reset-project.js <--- Script to reset the project and remove all screens
  ├── types/
  ├── utils.ts
  ├── entrypoint.ts
  ├── app.json
  ├── babel.config.js
  ├── eas.json
  ├── eslint.config.js
  ├── metro.config.js
  ├── package.json
  ├── package-lock.json
  ├── README.md
  ├── tsconfig.json
```

## Modifying the app name

<table width="100%">
  <tr>
    <th width="50%">iOS</th>
    <th width="50%">Android</th>
  </tr>
  <tr>
    <td align="center">
      <img src="/assets/readme/icon_ios.png" width="300"/>
    </td>
    <td align="center">
      <img src="/assets/readme/icon_android.png" width="300"/>
    </td>
  </tr>
</table>

Edit the `name` property in the `app.json` file.

```json
{
   "expo": {
      "name": "wallet-app", <--- Edit this
      ...
   }
}  
```

## Modifying the App Icon & Splash Screen

### App Icon

<table width="100%">
  <tr>
    <th width="50%">iOS</th>
    <th width="50%">Android</th>
  </tr>
  <tr>
    <td align="center">
      <img src="/assets/readme/icon_ios.png" width="300"/>
    </td>
    <td align="center">
      <img src="/assets/readme/icon_android.png" width="300"/>
    </td>
  </tr>
</table>

You can edit the app icon by replacing the `assets/images/icon.png` file.

Recommended App Icon size is `1024x1024`.

If you name the icon file something else then edit the `icon` property in `app.json` accordingly.

```json
{
   "expo": {
      "name": "rn-wallet-app",
      ...
      "icon": "./assets/images/icon.png", <--- Change this
      ...
   }
}
```

### Splash Screen

<table width="100%">
  <tr>
    <th width="50%">iOS</th>
    <th width="50%">Android</th>
  </tr>
  <tr>
    <td align="center">
      <img src="/assets/readme/splash_ios.png" width="300"/>
    </td>
    <td align="center">
      <img src="/assets/readme/splash_android.png" width="300"/>
    </td>
  </tr>
</table>

Edit the `splash` object in `app.json` to modify the splash screen.

```json
{
   "expo": {
      "name": "rn-wallet-app",
      ...
      "splash": { <--- Edit this object
         "image": "./assets/images/icon.png",
         "backgroundColor": "#ffffff"
      }
   }  
}
```

## Modifying fonts for the app

## Modifying the deeplinking scheme

Edit the `scheme` property in `app.json` file, for your custom deeplinking scheme.

```json
{
  "expo": {
    ...
    "scheme": "rnwalletapp",
    ...
  }
}
```

For example, if you set this to `rnwalletapp`, then `rnwalletapp://` URLs would open your app when tapped.

This is a build-time configuration, it has no effect in Expo Go.

## Editing the landing screen

<table width="100%">
  <tr>
    <th width="50%">iOS</th>
    <th width="50%">Android</th>
  </tr>
  <tr>
    <td align="center">
      <img src="/assets/readme/landing_screen_ios.png" width="300"/>
    </td>
    <td align="center">
      <img src="/assets/readme/landing_screen_android.png" width="300"/>
    </td>
  </tr>
</table>

You can edit the landing page by editing the code in the file `app/index.tsx`.

## Wallet Actions

The template has example code for the following Wallet Actions:

- [Send USDC](https://github.com/monad-developers/react-native-privy-embedded-wallet-template/blob/main/components/sheets/SendSheet.tsx) 
- [Sign Message](https://github.com/monad-developers/react-native-privy-embedded-wallet-template/blob/main/components/sheets/SignSheet.tsx)


## Modifying the package/bundle identifier

When publishing app to the app store you need to have a unique package/bundle identifier you can change it in in `app.json`.

> [!NOTE]
> Don't forget to the change the identifier in Privy dashboard

```json
{
  "expo": {
    "name": "rn-wallet-app",
    ...
    "ios": {
      "bundleIdentifier": "com.anonymous.rn-wallet-app", <--- Edit this
      ...
    },
    "android": {
      ...
      "package": "com.anonymous.rnwalletapp" <--- Edit this
    },
  }
}
```

## Get a fresh project

If you want start a fresh with just the Privy configuration and no screens run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, Privy, and Monad look at the following resources:

- [Expo documentation](https://docs.expo.dev/)
- [Expo guides](https://docs.expo.dev/guides)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Creating embedded wallet on the client side](https://docs.privy.io/wallets/wallets/create/from-my-client)
- [Sending transactions using embedded wallet](https://docs.privy.io/wallets/using-wallets/ethereum/send-a-transaction)
- [Signing transactions using embedded wallet](https://docs.privy.io/wallets/using-wallets/ethereum/sign-a-transaction)
- [Tooling and infra options on Monad](https://docs.monad.xyz/tooling-and-infra/)

## Join the community

- [Discord community](https://discord.com/invite/monaddev): Chat with fellow Monad developers and ask questions.

Facing issues? report [here](https://github.com/monad-developers/react-native-privy-embedded-wallet-template/issues).