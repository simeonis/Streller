import { StyleSheet } from 'react-native';

const general = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28143b',
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
  title: {
    fontSize: 50,
    color: "#FF88FF",
  },
  subtext: {
    fontSize: 25,
    color: "#5f7cf9",
  },
  alertTitle: {
    fontSize: 36,
    color: "#ff6961",
  },
  alertMessage: {
    fontSize: 18,
    color: "#eee",
    backgroundColor: "#422161",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width:'100%',
  },
});

export { general };