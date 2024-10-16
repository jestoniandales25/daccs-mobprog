
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
            resetFormFields(); 
        }, [])
    );

    const isEmailValid = formFields.email.length > 0;
    const isPasswordValid = formFields.password.length >= 6;

    const handleLogin = async () => {
        if (!isEmailValid || !isPasswordValid) {
            Alert.alert('Error', 'Please enter a valid email and password.');
            return;
        }
        try {
            await login();

        } catch (error) {
            Alert.alert('Error', 'Failed to log in. Please check your credentials.');
        }
    };

    return (
        <View style={loginStyles.container}>
            <Text style={loginStyles.textHeader}>Log In</Text>

            <TextInput
                style={loginStyles.userInput}
                placeholder='Email'
                value={formFields.email}  
                onChangeText={(value) => setFormField('email', value)}  
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={loginStyles.userInput}
                    placeholder='Password'
                    value={formFields.password}  
                    onChangeText={(value) => setFormField('password', value)}  
                    secureTextEntry={!showPassword}  
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30 }}
                    onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
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
