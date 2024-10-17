import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        color: '#00ffff',  // Electric blue color for the font
        textAlign: 'center',
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 4,
        backgroundColor: '#333333',  // Darker button to match the theme
        width: 250,
        height: 50,
    },
    logoutButtonText: {
        color: '#00ffff',  // Electric blue for contrast
        fontSize: 18,
    },
    clockContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    transparentContainer: {
        width: '80%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',  // Slight transparency over dark background
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: '#00ffff',  // Electric blue border color
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#00ffff',  // Electric blue text color
    },
    zodiacText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00ffff',  // Electric blue for the zodiac text
        marginTop: 10,
    },
});

export default dashboardStyles;
