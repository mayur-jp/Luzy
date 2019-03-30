import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, Platform, ImageBackground } from 'react-native'
const { height, width } = Dimensions.get('window')
import * as Progress from 'react-native-progress';


export default class SplashScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            indeterminate: true,
        }
    }

    componentDidMount() {
        this.animate();
      }
    
      animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
          this.setState({ indeterminate: false });
          setInterval(() => {
            progress += Math.random() / 5;
            if (progress > 1) {
              progress = 1;
              this.props.navigation.navigate("LoginScreen")
            }
            this.setState({ progress });    
          }, 500);
        }, 1500);
      }

    render() {
        return (
            <ImageBackground resizeMode="stretch" source={require('../../Assets/splash_screen.png')} style={styles.container}>
                <Progress.Bar progress={this.state.progress} width={250} height={5} color="#67b70a" unfilledColor="#ffffff" borderColor="#ffffff" borderRadius={8} borderWidth={2} />
                <Text style={styles.textView}>Vestibulum et metus egestas, frementum libero.</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width : '100%',
        alignItems:'center',
        justifyContent:'center'
        // marginTop: Platform.OS === 'ios' ? 500 : 0.11,
    },
    textView:{
        position : 'absolute',
        top:height/1.2,
        color:'#ffffff',
    }
})