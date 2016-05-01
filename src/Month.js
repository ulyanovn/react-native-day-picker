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

        this.weekDaysLocale = props.weekDaysLocale.slice();

        if (props.startFromMonday) {
            this.weekDaysLocale.push(this.weekDaysLocale.shift());
        }
    }

    render() {
        let {
            days, changeSelection, style, monthsLocale,
            bodyBackColor, bodyTextColor, headerSepColor
        } = this.props;

        var monthHeader = monthsLocale[days[15].date.getMonth()] + ' ' + days[15].date.getFullYear();

        return (
            <View style={[styles.container, style, {backgroundColor: bodyBackColor}]}>
                <Text style={[styles.monthHeader, {color: bodyTextColor}]}>
                    {monthHeader}
                </Text>
                <View style={styles.monthDays}>
                    {this.weekDaysLocale.map((dayName, i) => {
                        return (
                            <View key={i} style={[styles.weekDay, {borderColor: headerSepColor}]}>
                                <Text style={{color: bodyTextColor}}>{dayName}</Text>
                            </View>
                        );
                    })}
                    {days.map((day, i) => {
                        return (
                            <Day
                                key={i}
                                {...this.props}
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
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});