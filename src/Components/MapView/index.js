import MapView, { Marker } from "react-native-maps"
export const Map = ({
    lat,
    lng,
    delta,
}) => (
    lat && lng && (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: delta,
                longitudeDelta: delta,
            }}
        >
            <Marker coordinate={{
                latitude: lat,
                longitude: lng
            }} />
        </MapView>
    )
)