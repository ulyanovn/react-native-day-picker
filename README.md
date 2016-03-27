# react-native-day-picker

react-native-day-picker is a simple calendar which allows you to select date range. 
Suites for android and ios. 
 
![Demo gif](https://github.com/ivanchenko/react-native-day-picker/blob/master/example-day-picker.gif?raw=true)

## Getting Started

```sh
$ npm install react-native-day-picker --save
```

> **Important:** When you build app in release mode, calendar works smooth without any lags.

## Usage

```javascript
'use strict';

import React, {
    Component,
    View,
    StyleSheet,
    AppRegistry
} from 'react-native';

import Calendar from 'react-native-day-picker';

class DayPicker extends Component {
    render() {
        var from = new Date();
        from.setDate(from.getDate() - 16);
        var to = new Date();

        return (
            <View style={styles.container}>
                <Calendar
                    monthsCount={24}
                    startFormMonday={true}
                    selectFrom={from}
                    selectTo={to}
                    onSelectionChange={(current, previous) => {
                        console.log(current, previous);
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    }
});
```
## Properties

All properties are optional

- **`onSelectionChange`** _(func)_
- **`selectFrom`** _(Date)_ - first day in range that will be selected from start  
- **`selectTo`** _(Date)_ - last day in range that will be selected from start

- **`monthsCount`** _(number)_ - count of dates from current months to the last   
- **`startFromMonday`** _(bool)_ - if true than months will started from monday

- **`monthsLocale`** _(arrayOf(string))_ - array of strings for localization, which will be displayed in month header started from January
- **`weekDaysLocale`** _(arrayOf(string))_ - array of strings for localization, which will be displayed in week day header, started from sunday
 

## Support

Email vlm.ivanchenko@gmail.com for support.