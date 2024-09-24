import { router } from "expo-router";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import loginStyles from "../styles/login_styles";

const LoginPage = () => {
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

    const handleLogin = () => {
        let isValid = true;

        setUsernameError('');
        setPasswordError('');

        if (username === '') {
            setUsernameError('Please Enter a Username');
            isValid = false;
        } else if (username !== "123") {
            setUsernameError('Invalid Username');
            isValid = false;
        }

        if (password === '') {
            setPasswordError('Please Enter a Password');
            isValid = false;
        } else if (password !== "123") {
            setPasswordError('Invalid Password');
            isValid = false;
        }

        if (isValid) {
            setUsername("");
            setPassword("");
            router.replace("pages/dashboard");
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