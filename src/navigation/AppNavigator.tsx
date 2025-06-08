import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EditorScreen from "../screens/EditorScreen";
import NewLyricScreen from "../screens/NewLyricScreen";
import { RootStackParamList } from "../types/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewLyric" component={NewLyricScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
