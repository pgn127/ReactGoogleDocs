//Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  editorContianer:{
    border: '1px solid black',
    height: '400px',
    width: '400px',
  },
  loginContainer: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    alignItems:'flex-start'

  },
  layer1:{
    flexDirection: 'row',
    flex:1,
    width: 80,
    height: 80,
  },
  map: {
    height: 100,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  item: {
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  },
  textBox: {
    flex: 0,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  textBoxWrong: {
    flex: 0,
    borderColor: 'red',
    borderWidth: 1,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  topButton: {
    alignSelf: 'stretch',
    paddingTop: 40,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  pwdbutton: {
    alignSelf: 'flex-end',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#C92B67',
  },
  buttonBlue: {
    backgroundColor: '#5FA3F4',
  },
  buttonGreen: {
    backgroundColor: '#8DC93C'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  smallButtonLabel: {
    textAlign: 'center',
    fontSize: 10,
    color: 'black'
  },
  icon: {
    width: 26,
    height: 26,
  },
  camera: {
    flex: 1
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  big_icon: {
    width: 120,
    height: 120,
  },
  tabsContainer: {
    flexDirection: 'row',               // Arrange tabs in a row
    paddingTop: 30,                     // Top padding
  },
  designRow: {
    flex: 1
  }
};

export default styles;
