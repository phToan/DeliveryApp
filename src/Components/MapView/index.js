import MapView, { Marker } from "react-native-maps"
export const Map = ({
    lat,
    lng
}) => (
    lat && lng && (
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            }}
            region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
        >
            <Marker coordinate={{
                latitude: lat,
                longitude: lng
            }} />
        </MapView>
    )
)