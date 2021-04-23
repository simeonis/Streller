import { StyleSheet } from 'react-native';

const general = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  topTab: {
    position: 'absolute',
    top: 16,
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
  topRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'column',
    marginTop: '8%',
    marginRight: '2%',
  },
  title: {
    fontSize: 50,
    color: "#f8d568",
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
    backgroundColor: "#0004",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: '100%',
  },
});

export { general };