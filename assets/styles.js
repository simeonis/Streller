import { StyleSheet } from 'react-native';

const general = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title :{
      fontSize:50,
      color:"#FF88FF",
    },
    textinput :{
      backgroundColor:"#98c1d9",
      width:"80%",
      height:20
    },
    controller: {
      flex: 1,
      flexDirection:"row",
      backgroundColor: 'white',
      justifyContent: "space-evenly"
    },
    smallButton: {
      justifyContent:'center',
      backgroundColor: '#DDDDDD',
      width: 64,
      height: 64,
      margin: 10,
      borderRadius: 10,
      padding: 10
    },
    mediumButton: {
      justifyContent:'center',
      backgroundColor: '#DDDDDD',
      width: 128,
      height: 64,
      margin: 10,
      borderRadius: 10,
      padding: 10
    },
    largeButton: {
      justifyContent:'center',
      backgroundColor: '#DDDDDD',
      width: 128,
      height: 128,
      margin: 10,
      borderRadius: 10,
      padding: 10
    },
});

export { general };