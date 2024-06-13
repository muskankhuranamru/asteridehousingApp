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

<img width="325" alt="Screenshot 2024-06-13 at 3 27 26 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/7c03895d-db94-4fa8-8fcd-70e208aa5b25">
<img width="340" alt="Screenshot 2024-06-13 at 3 27 35 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/0c4bd9eb-0ce6-49c7-8898-ab608ad65d37">

<img width="336" alt="Screenshot 2024-06-13 at 3 27 59 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/ed194793-79b9-4893-8e75-dc137299971c">
<img width="340" alt="Screenshot 2024-06-13 at 3 30 56 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/c3585a35-4e66-4d2f-b548-823d99f1dca3">
<img width="335" alt="Screenshot 2024-06-13 at 3 31 06 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/7abd823a-335d-4f33-9a00-7b9e5b5cf7d3">
<img width="339" alt="Screenshot 2024-06-13 at 3 31 55 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/4298e112-e525-4916-9fb7-489c7b55cffb">

<img width="336" alt="Screenshot 2024-06-13 at 3 32 06 PM" src="https://github.com/muskankhuranamru/asteridehousingApp/assets/60090164/d7d5cf98-7087-4766-8a35-39a579926b23">






Also adding drive link for the screen recording of the app : 
https://drive.google.com/file/d/14TgAR91UArAOp9MgjJDLxN2ix5GEzH1-/view?usp=sharing
