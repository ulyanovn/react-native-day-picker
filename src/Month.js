'use strict';

import React from 'react-native';
const {
  Component,
  View,
  StyleSheet,
  Text
  } = React;

import moment from 'moment';
import Day from './Day'

export default class Month extends Component {
  constructor(props) {
    super(props);
    this.weekDays = moment.weekdaysMin();
    this.weekDays.push(this.weekDays.shift());
  }

  render() {
    let {days, changeSelection, style} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.monthHeader}>
          {moment(days[15].date).format('MMMM YYYY')}
        </Text>
        <View style={styles.monthDays}>
          {this.weekDays.map((dayName, i) => {
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