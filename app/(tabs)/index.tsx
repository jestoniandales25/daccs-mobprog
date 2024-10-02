import { router } from "expo-router";
import React, { useState, useCallback, useContext, useMemo } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import loginStyles from "../styles/login_styles";
import { AuthContext } from './pages/AuthContext';

const LoginPage: React.FC = () => {
    const { login } = useContext(AuthContext)!;
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    

    useFocusEffect(
        useCallback(() => {
            setUsername("");
            setPassword("");
            setUsernameError("");
            setPasswordError("");
        }, [])
    );

    const isUsernameValid = useMemo(() => {
        return username.length > 0; // Example validation
    }, [username]);

    const isPasswordValid = useMemo(() => {
        return password.length >= 6; // Example: Consider valid password to be at least 6 characters long
    }, [password]);

    const handleLogin = async () => {
        if (!isUsernameValid || !isPasswordValid) {
            Alert.alert('Error', 'Invalid Credential!');
            return;
        }

        try {
            const response = await fetch('http://192.168.56.1/api/log_in_api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${username}&password=${password}`,
            });

            const result = await response.json();
            if (result.status === 'success') {
                Alert.alert('Success', result.message);
                login({ username, email: result.email });
                router.replace("pages/dashboard"); // Navigate to the dashboard on success
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server!');
        }
    };

    return (
        <View style={loginStyles.container}>
            <Text style={loginStyles.textHeader}>Log In</Text>

            <TextInput
                style={loginStyles.userInput}
                placeholder='Username'
                onChangeText={(val) => setUsername(val)}
            />

            {usernameError ? <Text style={loginStyles.uerrorText}>{usernameError}</Text> : null}

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={[loginStyles.userInput]} // Take up available space
                    placeholder='Password'
                    onChangeText={(val) => setPassword(val)}
                    secureTextEntry={!showPassword} // Toggle password visibility
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30 }}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'} // Toggle icon
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {passwordError ? <Text style={loginStyles.perrorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
                <Text style={loginStyles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginPage;