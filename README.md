# Home unlock Application

Welcome to the Home Unlock App repository! This application allows real estate companies to remotely unlock homes for potential buyers to view. It demonstrates basic React Native skills including state management, API integration, and native device feature usage.

## Features

- **Basic UI/UX**: Clean, responsive design.
- **Authentication**: Login screen.
- **Home List**: Displays homes with address, image, description fetched from mock API.
- **Home Details**: Shows more info about the home and an "Unlock" button visible within 30m of the home.
- **State Management**: Uses Context API for managing app state.
- **Error Handling**: Gracefully manages API call failures and network issues.
- **Local Storage**: AsyncStorage for token management and local data persistence.
- **React Native Geolocation**: Provides precise location services for proximity checks.
- **React Native Push Notifications**: Setup for admin and user notifications.

## Dependencies

- `react-native` (CLI): For React Native project setup.
- `@react-native-async-storage/async-storage`: Handles AsyncStorage for token management.
- `react-native-geolocation-service`: Provides geolocation features for proximity checks.
- `react-native-push-notification`: Integrates push notifications for admin and user alerts.
- `json-server`: Mocks API responses for home listing and unlocking features.
  
## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Link native dependencies:

    ```bash
    react-native link
    ```

5. Start JSON Server for mock APIs:
   
   Install json-server globally if not already installed:

    ```bash
   npm install -g json-server
    
    ```
    
   Start the JSON server with mock data:

     ```bash
     json-server --watch db.json --port 300
    
    ```
 

7. Run the application:

    ```bash
    react-native run-android
    ```

## Usage

- Open the application on your device or emulator.
- Log in using your credentials.
- You will see a list of homes available for viewing.
- Select a home to view its details, including address, image, and description.
- If you are within 30 meters of the home, an "Unlock" button will appear.
- Tap the "Unlock" button to simulate unlocking the home.
- Receive feedback on the success or failure of the unlock attempt.

## Note

- Ensure proper permissions are granted for location access on the device.
- Make sure the device has a stable internet connection for API calls and map functionality.


## Contributor

Muskan Khurana 

For reference, here are some of the screenshots attached:


