import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createNativeStackNavigator<{
    Home: { name: string };
    Details: { title: string };
}>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Skoovin'" }} />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={({ route }) => ({ title: route.params.title })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
