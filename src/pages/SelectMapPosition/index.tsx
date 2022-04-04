import { View, Text } from "react-native";
import React, { useState } from "react";

import { useNavigation, useRoute } from "@react-navigation/native";
import MapView, { MapEvent, Marker } from "react-native-maps";
import { RectButton } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";

import mapMarkerImg from "../../images/map-marker.png";
import styles from "./styles";

interface SelectMapPositionRouteParams 
{
  initialPosition: {
    latitude: number;
    longitude: number;
  };
}

export default function SelectMapPosition() 
{
  const route = useRoute();
  const params = route.params as SelectMapPositionRouteParams;

  const navigation = useNavigation();
  const [ position, setPostition ] = useState({ latitude: 0, longitude: 0 });

  function handleNextStep() 
  {
    navigation.navigate("CadastroFazenda", { position });
  }

  function handleSelectedMapPosition( event: MapEvent ) 
  {
    setPostition( event.nativeEvent.coordinate );
  }

  NetInfo.fetch().then( state => 
  {
      if( !state.isConnected ) 
      {        
        alert("Ops! nao foi possivel encontrar conexão com a internet");
        navigation.navigate("Gerenciar");
      }

  });

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: params.initialPosition.latitude,
          longitude: params.initialPosition.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={ handleSelectedMapPosition }
      >

          {position.latitude !== 0 && (
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: position.latitude,
                longitude: position.longitude,
              }}
            />
          )}

      </MapView>

      {position.latitude !== 0 && (
        <RectButton style={styles.nextButton} onPress={ handleNextStep }>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}

    </View>
  );
}
