import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../pages/Home';
import Login from '../../pages/Login';
import AddCattle from '../../pages/AddCattle';
import ListarGados from '../../pages/ListarGados';
import FazendaEdit from '../../pages/FazendaEdit';
import cattleEdit from '../../pages/CattleEdit';
import MeusDados from '../../pages/AtualizarDados';
import ListarPastos from '../../pages/ListarPastos';
import CadastarGados from '../../pages/CadastroGados';
import ManagePasture from '../../pages/ManagePasture';
import GerenciarGados from '../../pages/GerenciarGados';
import CadastroFazenda from '../../pages/CadastroFazenda';
import SelectMapPosition from '../../pages/SelectMapPosition';

import colors from '../../styles/colors';

const { Navigator, Screen } = createBottomTabNavigator();

const Menu: React.FC = () => {

    return (
        <NavigationContainer>
            <Navigator
                tabBarOptions=
                {{
                    style: 
                    {
                        height: "9%",
                        width: "335%",
                        marginLeft : "-16%",
                        backgroundColor: colors.menu,
                        borderTopWidth: 0,
                    },

                    tabStyle: 
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                    },

                    iconStyle: 
                    {
                        flex: 0,
                        width: 20,
                        height: 20,
                    },

                    labelStyle: 
                    {
                        fontSize: 11,
                        marginTop: 5,
                    },

                    inactiveTintColor: colors.fonte,
                    activeTintColor: colors.secondary,
                }}
                
            >

                <Screen
                    name="Login"
                    component={ Login }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",   
                    }}
                />     

                <Screen
                    name="Home"
                    component={ Home }
                    options={{

                        tabBarIcon: ({ size, focused }) => 
                        {
                            return (
                                <Ionicons
                                    name = "md-home"
                                    size = { size }
                                    color = { focused ? colors.secondary : colors.fonte }
                                />
                            );
                        },

                    }}
                
                />

                <Screen
                    name="Gerenciar"
                    component={ GerenciarGados }
                    options= {{

                        tabBarIcon: ({ size, focused }) => 
                        {
                            return (
                                <MaterialCommunityIcons
                                    name = "tractor"
                                    size = { size }
                                    color = { focused ? colors.secondary : colors.fonte }
                                />
                            );
                        },
                        
                    }}
                />

                <Screen
                    name="MeusDados"
                    component={  MeusDados }
                    options={{

                        tabBarIcon: ({ size, focused }) => 
                        {
                            return (
                                <Ionicons
                                    name = "md-person-circle"
                                    size = { size }
                                    color = { focused ? colors.secondary : colors.fonte }
                                />
                            );
                        },

                    }}
                />

                <Screen 
                    name="SelectMapPosition"
                    component={ SelectMapPosition }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",                

                    }}
                />

                <Screen
                    name="CadastroFazenda"
                    component={ CadastroFazenda }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",   

                    }}
                />

                <Screen
                    name="FazendaEdit"
                    component={ FazendaEdit }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",   

                    }}
                />

                <Screen
                    name="CattleEdit"
                    component={ cattleEdit }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",   

                    }}
                />

                <Screen
                    name="ListarGados"
                    component={ ListarGados }
                    options={{

                        tabBarVisible:true,
                        tabBarLabel: "",   

                    }}
                />

                <Screen
                    name="CadastarGados"
                    component={ CadastarGados }
                    options={{

                        tabBarVisible:false,
                        tabBarLabel: "",   

                    }}
                /> 

                <Screen
                    name="ListarPastos"
                    component={ ListarPastos }
                    options={{

                        tabBarVisible:true,
                        tabBarLabel: "",   

                    }}
                />      

                 <Screen
                    name="ManagePasture"
                    component={ ManagePasture }
                    options={{

                        tabBarVisible:true,
                        tabBarLabel: "",   

                    }}
                />  

                <Screen
                    name="AddCattle"
                    component={ AddCattle }
                    options={{

                        tabBarVisible:true,
                        tabBarLabel: "",   

                    }}
                />  

            </Navigator>
        </NavigationContainer>
    );
};

export default Menu;