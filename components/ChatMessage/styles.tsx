import { StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
const styles = StyleSheet.create({
    // '#fdfefc'
    msgContainer: {
        padding: 10,
        marginTop: 10,
        marginBottom: 10,

        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        // alignSelf: 'baseline',
        // // height: 100,
        // minHeight: 100

    },
    msgUser: {
        fontWeight: 'bold',
        fontSize: 12,
        color:Colors.light.tint,
        marginBottom:5
    },
    msgContent: {
        
    },
    msgTime: {
        // textAlign: 'right',
        color: 'grey',
        alignSelf:'flex-end'

    },


})

export default styles