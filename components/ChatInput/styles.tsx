import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 30
    },
    voice: {
        marginLeft: 10,
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginRight: 10
    }



})

export default styles