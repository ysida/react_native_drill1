# A Drill in React Native


Below are the details and requirements for the demo app we would like you to develop.

Technology Stack Requirements:

- Typescript
- React Navigation https://github.com/react-navigation/react-navigation
- Redux Toolkit https://github.com/reduxjs/redux-toolkit
- Axios https://github.com/axios/axios
- All UI elements (cards, buttons, text fields, modals, etc) should be implemented using
only core React Native components, no UI libraries allowed.

## App Structure:
1. Redux Store
- Auth Slice
State consists of a single field userProfile that can be either null or object.
Has actions for login/logout.

- Content Slice
State consists of a single field data that can be either null or [].
Has asyncThunk for requesting data, actions for handling the pending/fulfilled
state of that thunk, and action for deleting a single element from existing data.


2. Root Navigator: Stack Navigator with two isolated routes 
- Login Navigator 
- Authorized Navigator

If userProfile is null the app uses Login Navigator, otherwise Authorized Navigator.


3. Login Navigator (Stack):
- Welcome Screen
Text component with welcome message and button that will
navigate the user to Login Screen.

- Login Screen
Text fields for login/password and login button. On button press,
the app should dispatch action and create a user profile (with any arbitrary data).

After the user profile is created Root Navigator should automatically transition to
Authorized Navigator without an explicit “navigate” command.

4. Authorized Navigator: Bottom Tabs Navigator with Content Navigator on the first tab,
Content Management Screen on the second, and User Profile Screen on the third.

5. Content Navigator (Stack):
- Content Screen: Hit any API of your choice (or pick from the list
https://github.com/public-apis/public-apis) via asynThunk from Content Slice and
display the result as a vertical list of cards. During fetching the list should display
ActivityIndicator component. The card component should have a combination of
an image and several properly spaced text components. Card press should
navigate to Content Details Screen.
- Content Details Screen: Displays detailed information about the item. Button in
the top left corner will navigate the user back to Content Screen.

6. Content Management Screen: vertical list with data from Content Slice. The list item
consists of the item title and delete button. On button press display a confirmation modal
with a warning that the item will be deleted and confirm/cancel buttons. Modal should be
rendered as a white card in the center of the screen with a semi-transparent dark
backdrop. On “confirm” button press the app dispatches the action and deletes the
chosen item. On “cancel” button press or backdrop press the modal closes without
modifying data.

7. User Profile Screen: single “logout” button in the center of the screen. On press,
userProfile is set to null and Root Navigator should automatically transition to Login
Navigator without an explicit “navigate” command.

## UI Requirements:
- UI should have a consistent style across the app (e.g., colors, spacing, border-radius, etc).
- UI should respect safe area zones.