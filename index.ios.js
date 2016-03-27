'use strict';

import React, {
    Component,
    View,
    StyleSheet,
    AppRegistry
} from 'react-native';

import Calendar from './src/Calendar';


class day_picker extends Component {
    render() {
        var from = new Date();
        from.setDate(from.getDate() - 7);
        var to = new Date();

        return (
            <View style={styles.container}>
                <Calendar
                    selectionType={"day, range"}
                    selectFrom={from}
                    selectTo={to}
                    monthsCount={24}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

AppRegistry.registerComponent('day_picker', () => day_picker);
