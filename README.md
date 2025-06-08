# 💰 Expense Tracker - React Native App

A comprehensive mobile expense tracking application built with React Native and Expo, demonstrating all core concepts from the React Native tutorial.

## 📱 App Overview

The Expense Tracker helps users manage their personal finances by tracking expenses across different categories with a clean, intuitive interface.

## ✨ Features Implemented

### 🔐 1. Authentication Flow
- User registration and login
- Form validation with error handling
- Secure session management with AsyncStorage
- Protected routes (authenticated users only)

### 🎨 2. Native Components & Styling
- Custom styled components using React Native Paper
- Responsive design for different screen sizes
- Material Design UI components
- Consistent theming throughout the app

### 🧭 3. Navigation System
- Bottom tab navigation for main app sections
- Stack navigation for authentication flow
- Smooth screen transitions
- Icon-based navigation with visual feedback

### 📝 4. Forms & User Input
- Expense creation form with validation
- Dropdown category selection
- Real-time input validation
- Error handling and user feedback

### 💾 5. Database Integration (AsyncStorage)
- CRUD operations for expenses
- Real-time data updates
- Data persistence across app sessions
- User-specific data storage

## 🏗️ Project Structure

\`\`\`
expense-tracker/
├── App.js                          # Main app component
├── package.json                    # Dependencies
├── app.json                        # Expo configuration
├── assets/                         # Images and icons
├── src/
│   ├── components/
│   │   ├── ExpenseCard.js          # Reusable expense card component
│   │   └── StatCard.js             # Statistics display component
│   ├── screens/
│   │   ├── LoginScreen.js          # User login
│   │   ├── RegisterScreen.js       # User registration
│   │   ├── DashboardScreen.js      # Main dashboard with analytics
│   │   ├── AddExpenseScreen.js     # Add new expenses
│   │   ├── ExpenseListScreen.js    # View and manage expenses
│   │   └── ProfileScreen.js        # User profile and statistics
│   ├── navigation/
│   │   └── AppNavigator.js         # Navigation configuration
│   └── services/
│       ├── AuthContext.js          # Authentication state management
│       └── ExpenseContext.js       # Expense data management
├── docs/
│   └── screenshots/                # App screenshots
└── README.md
\`\`\`

## 🚀 Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **React Navigation** - Navigation library
- **React Native Paper** - Material Design components
- **AsyncStorage** - Local data persistence
- **React Native Chart Kit** - Data visualization
- **Context API** - State management

## 📦 Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone [your-repo-url]
   cd expense-tracker
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   expo start
   \`\`\`

4. **Run on device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or use iOS Simulator / Android Emulator

## 📱 QR Code for Testing

[Generate QR code by running `expo start` and include screenshot here]

## 📸 Screenshots

### Authentication Screens
- Login screen with form validation
- Registration screen with user creation

### Main App Screens
- Dashboard with expense analytics and pie chart
- Add expense form with category selection
- Expense list with search and filter functionality
- User profile with statistics

## 🎯 Core Functionality

### User Authentication
- Secure login/logout functionality
- User registration with validation
- Session persistence

### Expense Management
- Add new expenses with title, amount, category, and description
- View all expenses in a searchable, filterable list
- Delete expenses with confirmation
- Real-time expense calculations

### Data Visualization
- Pie chart showing expenses by category
- Total expense tracking
- Average expense calculations
- Category-wise breakdowns

### User Experience
- Responsive design for all screen sizes
- Intuitive navigation between screens
- Form validation with helpful error messages
- Loading states and user feedback

## 🔧 Technical Implementation

### State Management
- React Context API for global state
- Separate contexts for authentication and expense data
- Efficient re-rendering with proper context structure

### Data Persistence
- AsyncStorage for local data storage
- User-specific data separation
- Automatic data loading on app startup

### Form Handling
- Real-time validation
- Error state management
- User-friendly error messages

## 🎨 Design Features

- Material Design principles
- Consistent color scheme and typography
- Smooth animations and transitions
- Accessible UI components

## 🚧 Challenges Faced & Solutions

1. **State Management Complexity**
   - Challenge: Managing authentication and expense data across multiple screens
   - Solution: Implemented React Context API with separate contexts for different data types

2. **Data Persistence**
   - Challenge: Storing user data locally without a backend
   - Solution: Used AsyncStorage with proper data structure for multi-user support

3. **Form Validation**
   - Challenge: Real-time validation with good UX
   - Solution: Implemented custom validation logic with immediate feedback

4. **Navigation Flow**
   - Challenge: Seamless navigation between authenticated and non-authenticated states
   - Solution: Conditional navigation based on authentication status

## 🔮 Future Enhancements

- Export expenses to CSV
- Budget setting and tracking
- Expense categories customization
- Cloud sync with Firebase
- Push notifications for budget alerts
- Dark mode support

## 👨‍💻 Developer Notes

This app demonstrates proficiency in:
- React Native fundamentals
- Mobile UI/UX design
- State management patterns
- Form handling and validation
- Data persistence strategies
- Navigation patterns
- Component architecture

Built as part of the React Native Weekend Assignment to showcase practical application of tutorial concepts in a real-world mobile application.
┌─────────────────────────────────────────────────┐
│                  Mobile App                     │
│                                                 │
│  ┌─────────────┐    ┌─────────────────────────┐ │
│  │   UI Layer  │    │     Business Logic      │ │
│  │  (Screens)  │◄──►│     (Context APIs)      │ │
│  └─────────────┘    └──────────┬──────────────┘ │
│                               │                 │
│                     ┌─────────▼──────────┐      │
│                     │   Local Storage    │      │
│                     │   (AsyncStorage)   │      │
│                     └────────────────────┘      │
└─────────────────────────────────────────────────┘
![Screenshot 2025-06-08 010611](https://github.com/user-attachments/assets/004657b3-5d7e-4191-b801-978b879d567d)

