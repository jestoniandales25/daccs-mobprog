import { Tabs } from "expo-router"
import { AuthProvider } from "./pages/AuthContext";

const PagesLayout = () => {
    return (
        <AuthProvider>
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
        </AuthProvider>
    );
    
};

export default PagesLayout;