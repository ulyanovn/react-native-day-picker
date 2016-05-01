'use strict';

import React from 'react-native';
const {
    Component,
    ListView,
    StyleSheet,
} = React;

import Month from './Month';

console.disableYellowBox = true;

export default class Calendar extends Component {
    static defaultProps = {
        monthsCount: 24,
        onSelectionChange: () => {
        },

        monthsLocale: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        weekDaysLocale: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

        width: 280,

        bodyBackColor: 'white',
        bodyTextColor: 'black',
        headerSepColor: 'grey',

        dayCommonBackColor: 'white',
        dayCommonTextColor: 'black',

        dayDisabledBackColor: 'white',
        dayDisabledTextColor: 'grey',

        daySelectedBackColor: '#4169e1',
        daySelectedTextColor: 'white',

        dayInRangeBackColor: '#87cefa',
        dayInRangeTextColor: 'black'
    };

    static propTypes = {
        selectFrom: React.PropTypes.instanceOf(Date),
        selectTo: React.PropTypes.instanceOf(Date),

        monthsCount: React.PropTypes.number,

        monthsLocale: React.PropTypes.arrayOf(React.PropTypes.string),
        weekDaysLocale: React.PropTypes.arrayOf(React.PropTypes.string),
        startFromMonday: React.PropTypes.bool,

        onSelectionChange: React.PropTypes.func,
        
        width: React.PropTypes.number,

        bodyBackColor: React.PropTypes.string,
        bodyTextColor: React.PropTypes.string,
        headerSepColor: React.PropTypes.string,

        dayCommonBackColor: React.PropTypes.string,
        dayCommonTextColor: React.PropTypes.string,

        dayDisabledBackColor: React.PropTypes.string,
        dayDisabledTextColor: React.PropTypes.string,

        daySelectedBackColor: React.PropTypes.string,
        daySelectedTextColor: React.PropTypes.string,

        dayInRangeBackColor: React.PropTypes.string,
        dayInRangeTextColor: React.PropTypes.string
    };

    constructor(props) {
        super(props);

        this.changeSelection = this.changeSelection.bind(this);
        this.generateMonths = this.generateMonths.bind(this);

        let {selectFrom, selectTo, monthsCount} = this.props;

        this.selectFrom = selectFrom;
        this.selectTo = selectTo;
        this.months = this.generateMonths(monthsCount);

        var dataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});

        this.state = {
            dataSource: dataSource.cloneWithRows(this.months)
        }
    }

    rowHasChanged(r1, r2) {
        for (var i = 0; i < r1.length; i++) {
            if (r1[i].status !== r2[i].status && !r1[i].disabled) {
                return true;
            }
        }
    }

    generateMonths(count) {
        var months = [];
        var monthIterator = new Date();

        for (var i = 0; i < count; i++) {
            var month = this.getDates(monthIterator, this.props.startFromMonday);

            months.push(month.map((day) => {
                return {
                    date: day,
                    status: this.getStatus(day, this.selectFrom, this.selectTo),
                    disabled: day.getMonth() !== monthIterator.getMonth() || day > Date.now()
                }
            }));

            monthIterator.setMonth(monthIterator.getMonth() - 1);
        }

        return months;
    }

    getDates(month, startFromMonday) {
        month = new Date(month);
        month.setDate(1);

        var delta = month.getDay();
        if (startFromMonday) {
            delta--;
            if (delta === -1) delta = 6;
        }

        var startDate = new Date(month);
        startDate.setDate(startDate.getDate() - delta);

        month.setMonth(month.getMonth() + 1);
        month.setDate(0);

        delta = 6 - month.getDay();
        if (startFromMonday) {
            delta++;
            if (delta === 7) delta = 0;
        }

        var lastDate = new Date(month);
        lastDate.setDate(lastDate.getDate() + delta);

        var allDates = [];
        while (startDate <= lastDate) {
            allDates.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return allDates;
    }

    changeSelection(value) {
        var {selectFrom, selectTo, months} = this;

        if (!selectFrom) {
            selectFrom = value;
        } else if (!selectTo) {
            if (value > selectFrom) {
                selectTo = value;
            } else {
                selectFrom = value;
            }
        } else if (selectFrom && selectTo) {
            selectFrom = value;
            selectTo = null;
        }

        months = months.map((month) => {
            return month.map((day) => {
                return {
                    date: day.date,
                    status: this.getStatus(day.date, selectFrom, selectTo),
                    disabled: day.disabled
                }
            })
        });

        this.selectFrom = selectFrom;
        this.selectTo = selectTo;
        this.months = months;

        this.props.onSelectionChange(value, this.prevValue);
        this.prevValue = value;

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(months)
        })
    }

    getStatus(date, selectFrom, selectTo) {
        if (selectFrom) {
            if (selectFrom.toDateString() === date.toDateString()) {
                return 'selected';
            }
        }
        if (selectTo) {
            if (selectTo.toDateString() === date.toDateString()) {
                return 'selected';
            }
        }
        if (selectFrom && selectTo) {
            if (selectFrom < date && date < selectTo) {
                return 'inRange';
            }
        }
        return 'common';
    }

    render() {
        let {style} = this.props;

        return (
            <ListView
                initialListSize={5}
                scrollRenderAheadDistance={1200}
                style={[styles.listViewContainer, style]}
                dataSource={this.state.dataSource}
                renderRow={(month) => {
                    return (
                        <Month
                            {...this.props}
                            days={month}
                            style={styles.month}
                            changeSelection={this.changeSelection}
                        />
                    );
                }}
            />
        );
    }
}

const styles = StyleSheet.create({
    listViewContainer: {
        backgroundColor: 'white',
        alignSelf: 'center',
        transform: [{scaleY: -1}]
    },
    month: {
        transform: [{scaleY: -1}]
    }
});