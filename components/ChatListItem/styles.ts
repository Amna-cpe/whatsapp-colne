import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
   
    },
    leftContainer: {
        flexDirection: 'row',
    },

    middleMsg: {
        flexDirection: 'column',
        marginLeft: 10,
        justifyContent: 'space-evenly'
    },

    img: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    username:{
        fontWeight:'bold'
    },
    time:{
        color:'grey',
        fontSize:14
    }

})

export default styles