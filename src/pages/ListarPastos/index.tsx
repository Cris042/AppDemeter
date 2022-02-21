import { Text, View, ScrollView } from "react-native";
import React, { useEffect,useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import {  useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import api from "../../services/axios";
import styles from "./styles";

interface Farms 
{
    id: number;
    name: string;
    size: number;
    countFood: number;
    latitude: number;
    longitude: number;
    type: string;
}
 
const CatleList: React.FC = () => {

    const navigation = useNavigation();
    const [ farms , setFarms ] = useState<Farms[]>([]);

    useEffect(() => 
    {

      async function load() 
      {
        const dataKey = '@appIF:Farm';
        const response = await AsyncStorage.getItem( dataKey );
 
        const responseFormatted = response ? JSON.parse( response ) : [];
        const expensives = responseFormatted;
  
        setFarms( expensives );
      }
  
      load();

    });

    const [ initialPosition, setInitialPosition ] = useState({
        latitude: -16.81508090497519,
        longitude: -48.02909970297907,
    });

    function handleNavigat()
    {
        navigation.navigate("SelectMapPosition", { initialPosition });
    }

    function handleNavigatFarmDetails( id: number ) 
    {
        navigation.navigate("FazendaEdit", { id } );
    }


    return (
        <View style = { styles.container } >
    
            <Text style = { styles.title }>Pastos</Text>

            <ScrollView style= { styles.scroll } >

                { farms.map(( farm ) => 
                {
                    return( 
                        <View key = { farm.id } style = { styles.card } >
                            <View style = { styles.iconCard }>
                                <MaterialCommunityIcons name = "tractor-variant" size={50} color="#000" /> 
                            </View>

                            <View style = { styles.cardBory }>
                                <Text style = { styles.textCard }> { farm.name } </Text> 
                                <Text style = { styles.textCard }> Tamanho : { farm.size } </Text>                  
                                <Text style = { styles.textCard }> Tipo : { farm.type } </Text> 
                                <Text style = { styles.textCard }> Forragem : { farm.countFood  * farm.size } </Text>        
                            </View>

                            <Text style = { styles.btnCard } onPress={() => handleNavigatFarmDetails( farm.id )} > Editar Pasto </Text>   
                        </View> 
                    );
                })}

            </ScrollView>

            <View style={styles.footer}>

                <Text style={styles.footerText}>
                    { farms.length } Pasto(s) encontrado(s)
                </Text>

                <RectButton
                    style = {styles.addButton}
                    onPress = { handleNavigat }
                >
                    <Feather name="plus" size={20} color="#fff" />

                </RectButton>

            </View>

        </View>            
    );
};

export default CatleList;
    