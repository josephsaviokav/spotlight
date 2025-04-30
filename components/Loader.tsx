import {COLORS} from "@/constants/theme";
import { ActivityIndicator,View } from "react-native";

export  function Loader() {
  return (
    
    <View 
    style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"black",


  
}}>

        <ActivityIndicator size="large" color={COLORS.grey} />
        </View>
    );
    }
