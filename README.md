# GloboAI 🌏

## The Ultimate AI Guided Trip Planner ⛺

This project is created using React JS, Google Places API, Google Gemini API, Firebase, Tailwind CSS, and Shadcn UI.

### Features

- AI-guided trip planning
- Integration with Google Places API and Gemini API
- Real-time data handling with Firebase
- Responsive design using Tailwind CSS and Shadcn UI

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Steps

1. **Clone the Repository**

    ```sh
    git clone https://github.com/SHERLOCKx90/GloboAI.git
    cd GloboAI
    ```

2. **Install Dependencies**

    ```sh
    npm install
    # or
    yarn install
    ```

3. **Run the Application**

    ```sh
    npm run dev
    # or
    yarn dev
    ```

## Firebase Setup

1. **Create a Firebase Project**

    - Go to the [Firebase Console](https://console.firebase.google.com/)
    - Click on "Add project" and follow the instructions

2. **Add Firebase to Your Web App**

    - Navigate to Project Settings > General
    - Under "Your apps", click on the Firebase SDK snippet for your web app
    - Copy the Firebase config object

3. **Configure Firebase in Your Project**

    - Create a `.env` file in the root of your project
    - Add your Firebase config:

    ```env
    VITE_FIREBASE_API_KEY=your-api-key
    VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
    VITE_FIREBASE_PROJECT_ID=your-project-id
    VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    VITE_FIREBASE_APP_ID=your-app-id
    ```

4. **Initialize Firebase in Your App**

    - Modify the `src/firebase.js` file to include your Firebase configuration:

    ```javascript
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';

    const firebaseConfig = {
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    export { db };
    ```

## React OAuth Google Setup

1. **Install the Package**

    ```sh
    npm install react-oauth/google
    # or
    yarn add react-oauth/google
    ```

2. **Configure Google OAuth**

    - Go to the [Google Cloud Console](https://console.cloud.google.com/)
    - Create a new project or select an existing one
    - Navigate to APIs & Services > Credentials
    - Create OAuth 2.0 Client IDs for your application

3. **Set Up Environment Variables**

    - Add the following to your `.env` file:

    ```env
    VITE_GOOGLE_CLIENT_ID=your-google-client-id
    ```

4. **Implement Google OAuth in Your App**

    - Add the following code to your main application file, e.g., `src/App.js`:

    ```javascript
    import React from 'react';
    import { GoogleOAuthProvider } from '@react-oauth/google';
    import YourComponent from './YourComponent';

    const App = () => {
      return (
        <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID}>
          <YourComponent />
        </GoogleOAuthProvider>
      );
    };

    export default App;
    ```

    - In `YourComponent.js`:

    ```javascript
    import React from 'react';
    import { GoogleLogin } from '@react-oauth/google';

    const YourComponent = () => {
      const handleSuccess = (response) => {
        console.log('Login Success:', response);
      };

      const handleError = () => {
        console.log('Login Failed');
      };

      return (
        <div>
          <GoogleLogin onSuccess={handleSuccess} onFailure={handleError} />
        </div>
      );
    };

    export default YourComponent;
    ```

For more details and updates, refer to the [GloboAI GitHub Repository](https://github.com/SHERLOCKx90/GloboAI).
