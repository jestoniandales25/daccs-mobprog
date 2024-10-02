import { router } from "expo-router";
import { useRef, useEffect, useContext, useMemo } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import dashboardStyles from "../../styles/dashboard_styles";
import { AuthContext } from "./AuthContext";


const Dashboard: React.FC = () => {
    const { logout, user } = useContext(AuthContext)!;
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(30)).current;

    const fadeAnimButton = useRef(new Animated.Value(0)).current;
    const floatAnimButton = useRef(new Animated.Value(30)).current;

    const greetingMessage = useMemo(() => {
        return `Welcome to our project, ${user?.username || "Guest"}!`;
    }, [user]);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(floatAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnimButton, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnimButton, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, [fadeAnim, floatAnim, fadeAnimButton, floatAnimButton]);

    const handleLogout = () => {
        logout();
        router.replace("/");
    };

    return (
        <View style={dashboardStyles.container}>
            <Animated.View
                style={{
                    opacity: fadeAnim,
                    transform: [{ translateY: floatAnim }],
                }}
            >
                <Text style={dashboardStyles.welcomeText}>{greetingMessage}</Text>
            </Animated.View>
            <Animated.View
                style={{
                    opacity: fadeAnimButton,
                    transform: [{ translateY: floatAnimButton }],
                }}
            >
                <TouchableOpacity style={dashboardStyles.logoutButton} onPress={handleLogout}>
                    <Text style={dashboardStyles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default Dashboard;