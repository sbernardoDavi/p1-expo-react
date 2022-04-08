import { useState } from "react";
import {TextInput, StyleSheet, View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import {Picker} from "@react-native-picker/picker";
import CameraApp from "../Camera";
import TakePicture from "../Camera";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

export default function Form() {
    
    const [selectedValue, setSelectedValue] = useState("default");
    const [bairro, setBairro] = useState(null);
    const [rua, setRua] = useState(null);
    const [numero, setNumero] = useState(null);
    const [descricao, setDescricao] = useState(null);

    const [isOpen, setIsOpen] = useState(false);


    function validar() {
        if(bairro != null && setSelectedValue != "default" && rua != null && numero != null && descricao != null) {
            setIsOpen(true)
        } else {
            Alert.alert('Preencha todos os Campos');
        }
    }

    function salvarDados(){
        
    }

    function confirmarEnvio() {
        setIsOpen(false)
        setBairro(null)
        setRua(null)
        setNumero(null)
        setDescricao(null)
        setSelectedValue("default")
    }
  
    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.text}>Informe a Cidade </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >   
                    <Picker.Item label="          - - - -                                   v" value="default" />
                    <Picker.Item label="Vassouras" value="Vassouras" />
                    <Picker.Item label="Barra do Pirai" value="Barra do Pirai" />
                    <Picker.Item label="Mendes" value="Mendes" />
                    <Picker.Item label="Três Rios" value="Três Rios" />
                    <Picker.Item label="Paraiba do Sul" value="Paraiba do Sul" />
                    <Picker.Item label="Miguel Pereira" value="Miguel Pereira" />
                    <Picker.Item label="Valença" value="Valença" />
                    <Picker.Item label="Rio das Flores" value="Rio das Flores" />
                </Picker>


                <Text style={styles.text}>Informe o Bairro</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={setBairro}
                    value={bairro}
                />
                <Text style={styles.text}>Informe o Rua</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={setRua}
                    value={rua}
                />

                <Text style={styles.text}>Informe o número</Text>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={setNumero}
                    value={numero}
                />

                <Text style={styles.text}>Descrição</Text>
                <TextInput 
                    style={styles.textInputDescricao}
                    onChangeText={setDescricao}
                    value={descricao}
                />

                <TouchableOpacity  style={styles.button} onPress={ () => validar()}>
                    <Text style={styles.buttonText}>Notificar</Text>
                </TouchableOpacity>
            </View>
            <Modal transparent={true} visible={isOpen}>
                <CameraApp
                    bairro={bairro}
                    rua={rua}
                    numero={numero}
                    descricao={descricao}
                    cidade={setSelectedValue}
                    confirmarEnvio = {confirmarEnvio}
                />
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    title: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
    },

    titleText: {
        fontSize: 30,
        color: "#F7E2E2",
        fontWeight: "bold",
    },

    result: {
        alignItems: "center",
        backgroundColor: "#1A132F",
        borderRadius: 50,
    },

    resultText: {
        fontSize: 24,
        color: "#000",
        fontWeight: "bold",
    },

    formContext: {
        width: '100%',
        height: 'auto',
        bottom: 0,
        backgroundColor: '#FFFEFE',
        alignItems: 'center',
        marginTop: 0,
        borderRadius: 50,
    },

    form: {
        width: "100%",
        height: "auto",
        marginTop: 0,
        padding: 15,
    },

    text: {
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: "bold",
        padding: 5,
        color: "#010000",
    },

    textInput: {
        fontSize: 18,
        backgroundColor: "#010000",
        color: "#FFFEFE",
        borderRadius: 4,
        margin: 5,
        padding: 5,
        borderColor: 'pink',
    },

    textInputDescricao: {
        fontSize: 18,
        backgroundColor: "#010000",
        color: "#FFFEFE",
        borderRadius: 4,
        margin: 5,
        padding: 5,
        height: 100,
        borderEndColor: '#FF0101',
    },

    picker: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#010000",
        borderRadius: 4,
        margin: 5,
        padding: 5,
        fontWeight: "bold",
        borderColor: 'pink',
        
    },
    button: {
        margin: 10,
        backgroundColor: '#010000',
        alignItems: "center",
        padding: 10,
        borderRadius: 5,
    },

    buttonText: {
        fontSize: 20,
        color: "#FEFEFE",
    },

    icon: {
        width: "80%",
        height: "80%"
    },
    container: {
        paddingTop: 50,
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row"
    },
    buttonFlip: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61A4BC",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    buttonTake: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61A4BC",
        margin: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    contentPhoto: {
        flex: 1,
        margin: 10,
    },
    contentPhotoButton: {
        flex: 1,
        flexDirection: "row"
    },
    img: {
        width: "100%",
        height: "80%"
    },
    buttonClose: {
        position: "absolute",
        bottom: 50,
        right: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61A4BC",
        margin: 20,
        width: 90,
        height: 50,
        borderRadius: 20,
    },
    buttonConfirm: {
        position: "absolute",
        bottom: 50,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#61A4BC",
        margin: 20,
        width: 90,
        height: 50,
        borderRadius: 20,
    },
    
    scrollView: {
        marginHorizontal: 20,
      },

});