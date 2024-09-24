import { Tabs } from "expo-router"

const PagesLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Login",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="pages/signup-page"
                options={{
                    title: "Sign Up",
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="pages/dashboard"
                options={{
                    headerShown: false,
                    tabBarButton: () => null,
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tabs>
    );
};

export default PagesLayout;