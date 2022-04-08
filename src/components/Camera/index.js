import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function CameraApp(props) {

  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
        const { statusLoc } = await Location.requestForegroundPermissionsAsync();
        if (statusLoc !== 'granted') {
            setErrorMsg('Permissão negada!');
      }
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>sem acesso à câmera</Text>;
  }

  async function saveLocation() {
    
    let actualLocation = await Location.getCurrentPositionAsync({});
    setLocation(actualLocation.coords);
    console.log(actualLocation.coords);
    
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  }

  async function take() {
    if (ref) {
      const opt = {
        quality: 0.8,
        base64: true,
        flexOrientation: true,
        forceUpOrientation: true,
      }
      saveLocation();
      const data = await ref.current.takePictureAsync(opt);
      setCaptured(data.uri)
      setOpen(true)
      await MediaLibrary.saveToLibraryAsync(data.uri);
      console.log(data) 
    
    }
}

 return (
   <SafeAreaView>
       <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTake}
            onPress={take}>
            <Text style={styles.text}> Take </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open}>
        <View style={styles.contentPhoto}>
            <View style={styles.botoes}>
                <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
                    <Text style={styles.text}> OK </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonVoltar} onPress={() => props.confirmarEnvio()}>
                    <Text style={styles.text}> Voltar </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mensagemView}>
                    <Text style={styles.mensagem}>OBRIGADO PELA SUA CONTRIBUIÇÃO</Text>    
            </View>
          <Image style={styles.img} source={{uri: captured}} />
        </View>
      </Modal>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    text: {
        color: '#FFF'
    },

    camera: {
        width: '100%',
        height: '100%',
    }, 

    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
    },

    buttonFlip: {
        position: 'absolute',
        bottom: 50,
        left: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    buttonTake: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },

    contentPhoto: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },

    img: {
        width: '75%',
        height: '65%',
    },

    buttonClose: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'pink',
    },

    buttonVoltar:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'green',
      },
    
    botoes:{
        flexDirection: 'row',

    },

    mensagemView:{
        backgroundColor:'white',
        padding: 10,
    },

    mensagem:{
        fontWeight: 'bold',
        padding: 10,

    }
});