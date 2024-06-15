import MapView, { Marker, Polyline ,PROVIDER_GOOGLE } from "react-native-maps"
import { MaterialIcons } from "../../Assets/icon"
export const Map = ({
  lat,
  lng,
  delta,
  coordinates,
  coordinatesEnd
}) => (
  lat && lng && (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        latitude: lat,
        longitude: lng,
        latitudeDelta: delta,
        longitudeDelta: delta,
      }}

    >
      { coordinates && 
      <Polyline
        coordinates={coordinates}
        strokeColor="blue"
        strokeWidth={5}
      />
      }
      <Marker 
      coordinate={{
        latitude: lat,
        longitude: lng
      }} 
        icon={Platform.OS === 'ios' ? require('../../Assets/Image/delivery-man.png') : null}
      />
      <Marker
          coordinate={coordinatesEnd}
          title="End"
      />
    </MapView>
  )
)