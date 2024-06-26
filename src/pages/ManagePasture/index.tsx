import { Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import {  useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import styles from "./styles";
interface DetailsRouteParams 
{
    id: string;
}

interface PickedUsed
{
    id: string;
    dateEntryPicket: String,
    dateExitPicket: String,
    picketID : string,
    cattleID : string,
    occupancyRate : number,
}

interface Cattle
{
    id: string;
    name: string;
    breed: string; 
    status: boolean;
    initialWeight: number; 
    weight: number;  
    dateOfBirth: Date;  
    sexo: string;
}

interface Farms 
{
    id: string;
    name: string;
    size: number;
    countFood: number;
    latitude: number;
    longitude: number;
}

const ManagePasture: React.FC = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const dataKey = '@appIF:PicketUsed';

    const [ picketUsed , setPicketUsed ] = useState<PickedUsed[]>([]);
    const [ cattle , setCattle ] = useState<Cattle[]>([]);
    const [ farms , setFarms ] = useState<Farms[]>([]);

    const params = route.params as DetailsRouteParams;
    const now = new Date();

    let count = 0;

    useEffect(() => 
    {
  
      async function loadPiket() 
      {
         const responseFarm = await AsyncStorage.getItem( '@appIF:Farm' );

         const responseFormattedFarm = responseFarm ? JSON.parse( responseFarm ) : [];
         const expensivesFarm = responseFormattedFarm;

         setFarms( expensivesFarm );  
      }

      async function loadCattle() 
      {
         const responseCattle = await AsyncStorage.getItem( '@appIF:Cattle' );

         const responseFormattedCattle = responseCattle ? JSON.parse( responseCattle ) : [];
         const expensivesCattle = responseFormattedCattle;

         setCattle( expensivesCattle );
      }

      async function loadPicketUsed() 
      {
         const responsePicketUsed = await AsyncStorage.getItem( '@appIF:PicketUsed' );

         const responseFormattedPicketUsed = responsePicketUsed ? JSON.parse( responsePicketUsed ) : [];
         const expensivesPicketUsed = responseFormattedPicketUsed;

         setPicketUsed( expensivesPicketUsed );
      }
  
      loadPicketUsed();
      loadCattle();
      loadPiket();
  
    }, [ picketUsed ]);

    function handleNavigatCattleList( id: string )
    {
        navigation.navigate("AddCattle", { id } );
    }

    async function handleDeletCattleList( id: string )
    {
        const data = await AsyncStorage.getItem( dataKey );
        const currentData = data ? JSON.parse( data ) : [];
        AsyncStorage.removeItem( dataKey );
        
        let newData = [{}];
        let dataFormatted = [];
        let i = 0;
    
        try 
        {
          currentData.forEach( ( element: { id: string; }) => {
    
            if( element.id != id )  
            {  
               newData[i] = element;  
               i++;
            }
            
          });
    
          dataFormatted = [
            ...newData,
          ];
         
          var idPasture = params.id;

          await AsyncStorage.setItem( dataKey, JSON.stringify( dataFormatted ) ); 
          navigation.navigate("ManagePasture", { idPasture } );  
           
        } 
        catch ( error ) 
        {
            
            console.log( error );

        }

    }


    return (
        <View style = { styles.container } >
    
            <Text style = { styles.title }>Gerenciar Pasto</Text>

            <ScrollView style= { styles.scroll } >

                { picketUsed.map(( picket ) => 
                {
                    if( picket.picketID ===  params.id )
                    {
                        count++; 
                        const cattkeObj =  cattle.find( cattle => cattle.id === picket.cattleID );
                        const picketObj =  farms.find( farms =>   farms.id  === picket.picketID );

                        return( 
                            <View key = { picket.id } style = { styles.card } >
                                <View style = { styles.iconCard }>
                                    <MaterialCommunityIcons name = "cow" size={50} color="#000" /> 
                                </View>

                                <View style = { styles.cardBory }>   
                                    <Text style = { styles.textCard }> Nome : { cattkeObj?.name } </Text>  
                                    <Text style = { styles.textCard }> Sexo : { cattkeObj?.sexo  == "m" ? "Macho" : "Femea" } </Text>         
                                    <Text style = { styles.textCard }> Raça : { cattkeObj?.breed } </Text>    
                                    <Text style = { styles.textCard }> Peso : { cattkeObj?.weight } ( kg ) </Text>      
                                    <Text style = { styles.textCard }> data : { picket?.dateEntryPicket }  </Text>                            
                                </View>

                                <RectButton style = { styles.btnCard } onPress={() => handleDeletCattleList( String( picket?.id ) )} >
                                    <Text style = { styles.btnCardTxt }> Remover </Text>
                                </RectButton>

                            </View>
                        );   
                    }
                })}

            </ScrollView>

            <View style = { styles.footer }>

                <Text style = { styles.footerText }>
                    { count } Gados(s) encontrado(s)
                </Text>

                <RectButton
                    style = { styles.addButton }
                    onPress = { () => handleNavigatCattleList( params.id ) }
                >
                    <Feather name="plus" size={20} color="#fff" />

                </RectButton>

            </View>

        </View>            
    );
};

export default ManagePasture;
    