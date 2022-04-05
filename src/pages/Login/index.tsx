import React,{ useState, useEffect } from 'react';

import { Wrapper, BoxLogin, Input, Button, Card, Image, Gif} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

import GifImage from "../../images/loading.gif";
import Logo from "../../../assets/iconnn.png";

import api from "../../services/axios";

export default function Login() 
{

  const navigation = useNavigation();
  const [ email, setEmail] = useState("");
  const [ senha, setSenha] = useState("");
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


  async function Logar()
  { 
    const data = new FormData();

    data.append("email", email);
    data.append("senha", senha);


    if( reg.test( email ) != true )
      alert("Email invalido");

    const resp = await api.post("authenticate/sessions", { data } );

    if( resp.data.token )
    {
       const dataKey = '@appIF:User';

       const obj = 
       {
         id: resp.data.id,
         name: resp.data.name,
         password: resp.data.password,
         email: resp.data.email,
         isAdmin: resp.data.isAdmin,
         avatar: resp.data.avatar,
         token: resp.data.token,
       }

       const data = await AsyncStorage.getItem( dataKey );
       const currentData = data ? JSON.parse( data ) : [];

       const dataFormatted = [
         ...currentData,
         obj
       ];

       await AsyncStorage.setItem( dataKey, JSON.stringify( dataFormatted ) );           
       navigation.navigate("Home");
    }
    else
      alert("Usuario não encontrado");

    
  }

  const [ isLoading, setLoading ] = useState( true );

  useEffect(() => 
  {
    setTimeout(() => 
    {
      setLoading( false );
    }, 2000);

  }, []);  
  
  
  return (
    <Wrapper> 

          { isLoading ? 
          (
             <Image source={ GifImage } />
          ) : 
          
          (

            <BoxLogin>

              <Card>
                  <Image source={ Logo } />
              </Card>

              <Input
                  placeholder={'Digite seu E-mail'}
                  onChangeText={setEmail} 
              />

              <Input
                  placeholder={'Digite sua senha'}
                  onChangeText={setSenha} 
                  secureTextEntry={true}
              />


              <Button
                onPress={Logar}
                title="Continuar"
                color="#27b844"
              >
              </Button>

            </BoxLogin>

          )}

    </Wrapper>
  );
};
