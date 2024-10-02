import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textHeader: {
        fontSize: 25,
        lineHeight: 30,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginBottom: 30,
    },
    userInput: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 16,
        width: 250,
        borderRadius: 8,
        height: 48
    },
    uerrorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 15,
        position: 'absolute',
    },
    perrorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 145,
        position: 'absolute',
    },
    button: {
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'black',
        width: 250,
        height: 50,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default loginStyles;