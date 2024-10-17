import { router } from "expo-router";
import { useRef, useEffect, useContext, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, TextInput } from 'react-native';
import dashboardStyles from "../../styles/dashboard_styles";
import { AuthContext } from "./AuthContext";
import { LinearGradient } from 'expo-linear-gradient';
import Clock from "../../components/Clock";  // Import the Clock component

const Dashboard: React.FC = () => {
    const [ birthdate, setBirthdate ] = useState('');
    const [ zodiacSign, setZodiacSign ] = useState('');

    const { logout, user } = useContext(AuthContext)!;

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(30)).current;

    const fadeAnimButton = useRef(new Animated.Value(0)).current;
    const floatAnimButton = useRef(new Animated.Value(30)).current;

    const greetingMessage = useMemo(() => {
        return `Welcome to our project, ${user?.email || "Guest"}!`;
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

    const calculateZodiac = (date: string) => {
        const [month, day] = date.split('/').map(Number);
        if (!month || !day) return '';

        // Simple zodiac determination based on date
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";

        return '';
    };

    const handleBirthdateChange = (text: string) => {
        setBirthdate(text);
        const zodiac = calculateZodiac(text);
        setZodiacSign(zodiac);
    };

    return (
        <LinearGradient
            // Apply the darker radiant background colors
            colors={['#1e3c72', '#2a5298']}  // Dark blue gradient
            style={dashboardStyles.container}
        >
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
                    opacity: fadeAnim, 
                    transform: [{ translateY: floatAnim }]
                }}
            >
                {/* Clock Component for displaying real-time time and date */}
                <View style={dashboardStyles.clockContainer}>
                    <Clock />
                </View>
            </Animated.View>
            <Animated.View
                style={{
                    opacity: fadeAnim, 
                    transform: [{ translateY: floatAnim }]
                }}
            >
                <View style={dashboardStyles.transparentContainer}>
                <TextInput
                        style={dashboardStyles.textInput}
                        placeholder="Enter your birthdate (MM/DD)"
                        value={birthdate}
                        placeholderTextColor="#00ffff" 
                        onChangeText={handleBirthdateChange}
                    />
                    {zodiacSign ? (
                        <Text style={dashboardStyles.zodiacText}>
                            Your Zodiac Sign: {zodiacSign}
                        </Text>
                    ) : null}
                </View>
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
        </LinearGradient>
    );
};



export default Dashboard;
