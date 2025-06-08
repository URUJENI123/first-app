import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

import AppNavigator from "../src/navigation/AppNavigator";

import { AuthProvider } from "../src/services/AuthContext";
import { ExpenseProvider } from "../src/services/ExpenseContext";

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <ExpenseProvider>
            <AppNavigator />
          <StatusBar style="auto" />
        </ExpenseProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
