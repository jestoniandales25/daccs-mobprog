import { router } from "expo-router";
import React, { useContext, useState, useMemo } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import signupStyles from "../../styles/signup_styles";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com'];


const SignUpPage: React.FC = () => {
    const { formFields, setFormField } = useContext(AuthContext)!;
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    

    const isPasswordValid = useMemo(() => {
        return formFields.password.length >= 6;  
    }, [formFields.password]);

    const isEmailValid = (email: string) => {
        const emailParts = email.split('@');
        if (emailParts.length !== 2) return false;
        const domain = emailParts[1];
        return allowedDomains.includes(domain);
    };

    const handleSignUp = async () => {
        if (!formFields.email || !formFields.password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields!');
            return;
        }

        if (!isEmailValid(formFields.email)) {
            Alert.alert('Error', 'Invalid email domain! Please use a valid email like @gmail.com, @yahoo.com, or @outlook.com.');
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
            await createUserWithEmailAndPassword(auth, formFields.email, formFields.password);
            Alert.alert('Success', 'Sign up successful!');
            router.replace('/pages/dashboard');
        } catch (error) {
            Alert.alert('Error', 'Failed to sign up. Please try again.');
        }
    };

    return (
        <View style={signupStyles.container}>
            <Text style={signupStyles.textHeader}>Sign Up</Text>
            <TextInput
                style={signupStyles.signupInput}
                placeholder='Email'
                value={formFields.email} 
                onChangeText={(value) => setFormField('email', value)}  
            />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={signupStyles.signupInput}
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
