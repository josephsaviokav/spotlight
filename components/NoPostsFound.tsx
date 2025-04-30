import React from 'react';
import { View, Text } from 'react-native';

export function NoPostsFound() {
  
    return (
        <View 
        style={{
          flex:1,
          justifyContent:"center",
          alignItems:"center",
          backgroundColor:"black",
        }}>
          <Text style={{fontSize:20,color:"white"}}>No Posts Found</Text>
          </View>
    )
      };
  

