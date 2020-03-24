import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

export default function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            setCurrentRegion({
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.04,
                longitudeDelta: 0.04
            });
        }

        loadInitialPosition()
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView
            style={styles.map}
            initialRegion={currentRegion}>
            <Marker coordinate={{
                latitude: 37.78825,
                longitude: -122.4324
            }} >
                <Image style={styles.avatar} source={{ uri: 'https://avatars3.githubusercontent.com/u/35570019?s=460&v=4' }} />
                <Callout
                    onPress={
                        () => { navigation.navigate('Profile', { github_username: 'murilosilvani' }) }
                    }>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>nome</Text>
                        <Text style={styles.devBio}>bio</Text>
                        <Text style={styles.devTechs}>techs, techs, techs</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    }
})