import { router } from "expo-router";
import React, { useCallback, useContext, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import loginStyles from "../styles/login_styles";
import { AuthContext } from './pages/AuthContext';

const LoginPage: React.FC = () => {
    const { login, formFields, setFormField, resetFormFields } = useContext(AuthContext)!;
    const [showPassword, setShowPassword] = useState(false);

    useFocusEffect(
        useCallback(() => {
            resetFormFields();  // Reset all fields when the screen is focused
        }, [])
    );

    const isUsernameValid = formFields.username.length > 0;
    const isPasswordValid = formFields.password.length >= 6;

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
                body: `username=${formFields.username}&password=${formFields.password}`,
            });

            const result = await response.json();
            if (result.status === 'success') {
                Alert.alert('Success', result.message);
                login({ username: formFields.username, email: result.email });
                router.replace("pages/dashboard");  // Navigate to the dashboard
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
                value={formFields.username}  // Controlled input from AuthContext
                onChangeText={(value) => setFormField('username', value)}  // Update username in context
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={loginStyles.userInput}
                    placeholder='Password'
                    value={formFields.password}  // Controlled input from AuthContext
                    onChangeText={(value) => setFormField('password', value)}  // Update password in context
                    secureTextEntry={!showPassword}  // Toggle password visibility
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30 }}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}  // Toggle icon
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
                <Text style={loginStyles.text}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginPage;
