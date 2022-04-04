import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

import MapView, { Callout , Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import * as Progress from 'react-native-progress';
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import mapMaker from "../../images/map-marker.png";

import styles from "./styles";
import api from "../../services/axios";

interface Farms 
{
  id: number;
  name: string;
  size: number;
  countFood: number;
  latitude: number;
  longitude: number;
}

interface User
{
  id: string;
  name: string,
  password: number,
  email: string,
  isAdmin: number,
  avatar: string,
  token: string,
}

interface PickedUsed
{
  dateEntryPicket: String,
  dateExitPicket: String,
  picketID : number,
  cattleID : string,
  occupancyRate : number,
}

export default function Map() 
{
    const navigation = useNavigation();

    const [ initialPosition, setInitialPosition ] = useState({ latitude: 0, longitude: 0, });
    const [ backupEf , setBackupEf ] = useState( false );
    const dataKey = '@appIF:Farm';
    let count = 0;

    const [ user , setUser ] = useState<User[]>([]);
    const [ farms , setFarms ] = useState<Farms[]>([]);
    const [ pickedUsed , setPicketUsed ] = useState<PickedUsed[]>([]);
     

    useEffect(() => 
    {
      
      async function loadPosition() 
      {
          const { status } = await Location.requestForegroundPermissionsAsync();

          if ( status !== "granted" ) 
          {
              Alert.alert(
                "Ops!",
                "Precisamos de sua permissão para obter a localização."
              );

              return;
          }

          const location = await Location.getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;

          setInitialPosition( { latitude, longitude } );

      }

      async function loadPicketUsed() 
      {
          const responsePickedUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );

          const responseFormattedPickedUsed = responsePickedUsed ? JSON.parse( responsePickedUsed ) : [];
          const expensivesPickedUsed = responseFormattedPickedUsed;

          setPicketUsed( expensivesPickedUsed );
      }

      async function loadUser() 
      {
    
         const responseUser = await AsyncStorage.getItem( "@appIF:User" );

         const responseUserFormatted = responseUser ? JSON.parse( responseUser ) : [];
         const expensivesUser = responseUserFormatted;

         setUser( expensivesUser );   

      }

      async function loadFarms() 
      {
    
         const response = await AsyncStorage.getItem( dataKey );

         const responseFormatted = response ? JSON.parse( response ) : [];
         const expensives = responseFormatted;

         setFarms( expensives );   

      }

      async function delet( )
      {
         await AsyncStorage.removeItem('@appIF:Cattle');
         await AsyncStorage.removeItem('@appIF:Farm');
         await AsyncStorage.removeItem('@appIF:PicketUsed');
         await AsyncStorage.removeItem('@appIF:User');
      }

      //delet();
      loadUser();
      loadFarms();
      loadPosition();
      loadPicketUsed();

    }, [ farms ]);

    async function backup() 
    {
       const responseFarm = await AsyncStorage.getItem( '@appIF:Farm' );
       const responseCattle = await AsyncStorage.getItem( '@appIF:Cattle');
       const responsePicketUsed = await AsyncStorage.getItem( '@appIF:PicketUsed');

       const responseFormattedFarm = responseFarm ? JSON.parse( responseFarm ) : [];
       const expensivesFarm = responseFormattedFarm;

       const responseFormattedCattle = responseCattle ? JSON.parse( responseCattle ) : [];
       const expensivesCattle = responseFormattedCattle;

       const responseFormattedPicketUsed = responsePicketUsed ? JSON.parse( responsePicketUsed ) : [];
       const expensivesPicketUsed = responseFormattedPicketUsed;

       if( backupEf === false && expensivesFarm != null )     
          await api.post( "farms/backup", { expensivesFarm } );

       if( backupEf === false && expensivesCattle != null )   
          await api.post( "cow/backup", { expensivesCattle });

       if( backupEf === false && expensivesPicketUsed != null )   
          await api.post( "picketUsed/backup", { expensivesPicketUsed });
    }

    NetInfo.fetch().then( state => 
    {
       if( state.isConnected  ) 
       {
           backup();    
           setBackupEf( true );    
       }
       else
       {
          navigation.navigate("Gerenciar");
       }
                        
    });

    function handleNavigatFarmDetails( id: number ) 
    {
       navigation.navigate("FazendaEdit", { id } );
    }
      
    function handleNavigateToCreateFarms() 
    {
       navigation.navigate("SelectMapPosition", { initialPosition });
    }

  return (
    <View style={styles.container}>
      {initialPosition.latitude !== 0 && (

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          loadingEnabled={initialPosition.latitude === 0}
          initialRegion={{
            latitude: Number( initialPosition.latitude ),
            longitude: Number( initialPosition.longitude ),
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
          }}
        >
          { farms.map(( farm ) => 
          { 

            { count = 0 }
            return (
              <Marker
                key={ farm.id }
                icon={mapMaker}

                calloutAnchor={{
                  x: 0.75,
                  y: -0.1,
                }}

                coordinate={{
                    latitude: Number( farm.latitude ),
                    longitude: Number( farm.longitude ),
                }}
              >
                <Callout
                    tooltip
                    onPress={() => handleNavigatFarmDetails( farm.id )}
                >
    
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutText}> Nome : { farm.name }</Text>
                      <Text style={styles.calloutText}> Hectares Ocupados </Text>
                      <Text style={styles.calloutText}>       
                        { pickedUsed.map(( picket ) => { picket.picketID === farm.id ? count = count + ( 1 / picket.occupancyRate ) : 0 } ) } 
                        { count != 0 ? count.toFixed( 1 ) : 0 } de { "" } 
                        { farm.size }
                      </Text>
                      <Progress.Bar progress = { count != 0 ? ( ( count / farm.size ) * 100 ) /100 : 0 } width = { 180 } color = { count <= farm.size ? "#3FC71D" : "#FA2B22" } />
                      <Text style = { styles.calloutText } > { ( count != 0 ? (  count / farm.size ) * 100 : 0 ).toFixed( 1 ) } % </Text> 
                    </View>

                </Callout>
              </Marker>
            );

          })}

        </MapView>

      )}

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          { farms.length } Pasto(s) encontrado(s)
        </Text>

      

        <RectButton
          style={styles.createOrphanageButton}
          onPress={ handleNavigateToCreateFarms }
        >
          <Feather name="plus" size={20} color="#fff" />

        </RectButton>

      </View>

    </View>

  );
}