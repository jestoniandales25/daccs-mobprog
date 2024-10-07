import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Clock: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Clear interval on component unmount
    }, []);

    // Formatting time and date
    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    return (
        <View style={styles.clockContainer}>
            <Text style={styles.timeText}>{formattedTime}</Text>
            <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    clockContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    timeText: {
        fontSize: 48, // Adjust font size for the clock
        fontWeight: 'bold',
        color: '#000', // You can customize the text color
    },
    dateText: {
        fontSize: 24, // Adjust font size for the date
        marginTop: 10,
        color: '#555', // You can customize the text color
    },
});

export default Clock;
