# Todo App

**Lizzy** is a simple yet powerful Todo app built with **React Native**, **TypeScript**, and **Expo**. It acts as your personal virtual notebook, helping you organize and track tasks while providing reminders to keep you on top of your goals.

---

## Features

- **Create New Todos**: Easily add new tasks to your todo list.
- **Mark Todos as Completed**: Check off completed tasks to track progress.
- **Delete Todos**: Remove completed tasks or clear all tasks at once.
- **Persistent Data Storage**: Todos are saved using **AsyncStorage**, ensuring they persist between app restarts.
- **Selectable Todos**: Use checkboxes to select multiple tasks and delete them in bulk.
- **Responsive Design**: Fully optimized for both mobile and web platforms.

---

## Installation

To set up the Todo app locally, follow the instructions below:

1. **Install Expo CLI** (if you haven't already):
   ```bash
   npm install -g expo-cli
   ```

2. **Install Dependencies**:
   ```bash
   npm install react-hook-form @hookform/resolvers zod jotai @react-native-async-storage/async-storage expo-checkbox
   npm install expo-router
   npm install @types/react-native --save-dev
   npx expo install react-native-web
   ```

---

## Running the App

### Development Mode

1. **Start the development server**:
   - For **iOS** or **Android** device/emulator:
     ```bash
     npx expo start
     ```
   - For **Web**:
     ```bash
     npx expo start --web
     ```

2. **Scan the QR code** displayed in your terminal or browser using the **Expo Go** app on your mobile device to view the app.

3. The app will load on your device. You can also run it in an emulator or simulator.

---

## Usage

Once the app is running:

- **Create Todos**: Enter your tasks in the input field and click "Add Todo" to add them to your list.
- **Update Todos**: Tap a todo item to edit its text.
- **Select Todos**: Use checkboxes to select tasks for deletion.
- **Delete Todos**: Click "Delete Selected" to remove checked tasks or "Clear All Todos" to remove all tasks from the list.

---

## Tech Stack

- **React Native**: To build cross-platform mobile apps.
- **Expo**: For an easy-to-use platform to build, run, and test React Native apps.
- **TypeScript**: Ensures type safety and better maintainability.
- **AsyncStorage**: Provides persistent local storage for todos.
- **Jotai**: State management library for managing todos and selected tasks.
- **React Hook Form**: Simplifies form handling and validation.
- **Zod**: Schema validation for input fields.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
