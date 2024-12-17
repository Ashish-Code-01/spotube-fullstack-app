import { Tabs, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const TabsLayout = () => {
    const segments = useSegments();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs
                screenOptions={{
                    headerShadowVisible: false,
                    headerShown: false,
                    tabBarStyle: {
                        display: segments[2] === '[id]' ? 'none' : 'flex',
                    }
                }}
            >
            </Tabs>
        </GestureHandlerRootView>
    );
};

export default TabsLayout;
