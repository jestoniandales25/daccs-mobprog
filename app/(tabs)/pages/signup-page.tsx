import { router } from "expo-router";
import { useState, useContext, useMemo } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import signupStyles from "../../styles/signup_styles";
import { AuthContext } from "./AuthContext";

const SignUpPage = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  
    const isPasswordValid = useMemo(() => {
      return password.length >= 6; // Example: Consider a valid password to be at least 6 characters long
  }, [password]);

    const handleSignUp = async () => {
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields!');
        return;
      }
    
      if (password !== confirmPassword) {
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
          body: `username=${username}&email=${email}&password=${password}`,
        });
    
        const result = await response.json();
        if (result.status === 'success') {
          Alert.alert('Success', result.message);
          login({ username, email });  
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
            onChangeText={setUsername}
          />
          <TextInput
            style={signupStyles.signupInput}
            placeholder='Email'
            onChangeText={setEmail}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[signupStyles.signupInput]}
              placeholder='Password'
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={{ position: 'absolute', right: 30 }}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ?  'eye-outline' : 'eye-off-outline'}
                size={24} 
                color="black" 
              />
            </TouchableOpacity>
          </View>
    
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={[signupStyles.signupInput]}
              placeholder='Confirm Password'
              secureTextEntry={!showConfirmPassword}
              onChangeText={setConfirmPassword}
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