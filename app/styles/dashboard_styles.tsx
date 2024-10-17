import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    welcomeText: {
        fontSize: 24,
        color: '#000000',
    },
    logoutButton: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 4,
        backgroundColor: 'black',
        width: 250,
        height: 50,
    },
    logoutButtonText: {
        color: '#ffffff',
        fontSize: 18,
    },
    clockContainer: {
        marginTop: 20,  // Adjust the margin as per your layout
        alignItems: 'center',
    },
    transparentContainer: {
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',  // Transparent background
        padding: 20,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    zodiacText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
});

export default dashboardStyles;
