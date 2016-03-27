'use strict';

import React from 'react-native';
const {
    Component,
    View,
    StyleSheet,
    Text
} = React;

import Day from './Day'

export default class Month extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        let {
            days, changeSelection, style,
            weekDaysLocale, monthLocale
        } = this.props;

        var monthHeader = monthLocale[days[15].getMonth()] + ' ' + days[15].getFullYear();

        return (
            <View style={[styles.container, style]}>
                <Text style={styles.monthHeader}>
                    {monthHeader}
                </Text>
                <View style={styles.monthDays}>
                    {weekDaysLocale.map((dayName, i) => {
                        return (
                            <View key={i} style={styles.weekDay}>
                                <Text>{dayName}</Text>
                            </View>
                        );
                    })}
                    {days.map((day, i) => {
                        return (
                            <Day
                                key={i}
                                disabled={day.disabled}
                                status={day.status}
                                date={day.date}
                                onDayPress={changeSelection}
                            />
                        );
                    })}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 7 * 40
    },
    monthHeader: {
        marginTop: 15,
        marginBottom: 5,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    monthDays: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    weekDay: {
        width: 40,
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});