import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import EditorScreen from "../screens/EditorScreen";
import NewLyricScreen from "../screens/NewLyricScreen";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home" component={NewLyricScreen} />
        <Stack.Screen name="Home" component={EditorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
