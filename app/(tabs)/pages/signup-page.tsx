import { router } from "expo-router";
import React, { useContext, useState, useMemo } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import signupStyles from "../../styles/signup_styles";
import { AuthContext } from "./AuthContext";

const SignUpPage: React.FC = () => {
    const { login, formFields, setFormField, resetFormFields } = useContext(AuthContext)!;
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isPasswordValid = useMemo(() => {
        return formFields.password.length >= 6;  // Password validation
    }, [formFields.password]);

    const handleSignUp = async () => {
        if (!formFields.username || !formFields.email || !formFields.password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields!');
            return;
        }

        if (formFields.password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        if (!isPasswordValid) {
            Alert.alert('Error', 'Password must be at least 6 characters long!');
            return;
        }

        try {
            const response = await fetch('http://192.168.56.1/signup_api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${formFields.username}&email=${formFields.email}&password=${formFields.password}`,
            });

            const result = await response.json();
            if (result.status === 'success') {
                Alert.alert('Success', result.message);
                login({ username: formFields.username, email: formFields.email });  // Save user to AuthContext
                router.replace("pages/dashboard");
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server!');
        }
    };

    return (
        <View style={signupStyles.container}>
            <Text style={signupStyles.textHeader}>Sign Up</Text>

            <TextInput
                style={signupStyles.signupInput}
                placeholder='Username'
                value={formFields.username}  // Controlled input from AuthContext
                onChangeText={(value) => setFormField('username', value)}  // Update username in context
            />

            <TextInput
                style={signupStyles.signupInput}
                placeholder='Email'
                value={formFields.email}  // Controlled input from AuthContext
                onChangeText={(value) => setFormField('email', value)}  // Update email in context
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={signupStyles.signupInput}
                    placeholder='Password'
                    value={formFields.password}  // Controlled input from AuthContext
                    onChangeText={(value) => setFormField('password', value)}  // Update password in context
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

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={signupStyles.signupInput}
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity style={{ position: 'absolute', right: 30 }}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                        name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'}
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={signupStyles.button} onPress={handleSignUp}>
                <Text style={signupStyles.text}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpPage;
