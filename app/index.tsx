// import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

// Import navigation
import AppNavigator from "../src/navigation/AppNavigator";

// Import providers
import { AuthProvider } from "../src/services/AuthContext";
import { ExpenseProvider } from "../src/services/ExpenseContext";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <ExpenseProvider>
          {/* <NavigationContainer> */}
            <AppNavigator />
          {/* </NavigationContainer> */}
          <StatusBar style="auto" />
        </ExpenseProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
