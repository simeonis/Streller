import { StyleSheet } from 'react-native';

const general = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shelf: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    topTab: {
      position: 'absolute',
      top: 0,
      flexDirection: 'column',
      padding: 10,
    },
    bottomTab: {
      flexDirection: 'column',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      padding: 10,
      width: '100%',
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
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 4,
    },
});

const button = StyleSheet.create({
    round: {
      width: 125,
      height: 125,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 25,
      borderRadius: 100,
      backgroundColor: '#815fc0',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
});

export { general, button };