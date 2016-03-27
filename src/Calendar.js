'use strict';

import React from 'react-native';
const {
    Component,
    ListView,
    StyleSheet,
    PropTypes
} = React;

import Month from './Month';

console.disableYellowBox = true;

export default class Calendar extends Component {
    static defaultProps = {
        monthsCount: 24,

        monthsLocale: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'],
        weekDaysLocale: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    };

    static propTypes = {
        selectionType: PropTypes.string,

        selectFrom: PropTypes.instanceof(Date),
        selectTo: PropTypes.instanceof(Date),

        monthsCount: PropTypes.number,

        monthsLocale: PropTypes.arrayOf(PropTypes.string),
        weekDaysLocale: PropTypes.arrayOf(PropTypes.string),

        onSelectionChange: PropTypes.function
    };


    constructor(props) {
        super(props);

        this.changeSelection = this.changeSelection.bind(this);

        let {selectFrom, selectTo, monthsCount} = this.props;
        this.selectFrom = selectFrom;
        this.selectTo = selectTo;

        var months = [];
        var today = new Date();

        for (var i = 0; i < monthsCount; i++) {
            var month = this.getDates(today);
            months.push(month.map((day) => {
                return {
                    date: day,
                    status: this.getStatus(day, selectFrom, selectTo),
                    disabled: day.getMonth() !== today.getMonth() || day > Date.now()
                }
            }));
            today.setMonth(today.getMonth() - 1);
        }

        this.months = months;

        var dataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});

        this.state = {
            dataSource: dataSource.cloneWithRows(months)
        }
    }

    rowHasChanged(r1, r2) {
        for (var i = 0; i < r1.length; i++) {
            if (r1[i].status !== r2[i].status && !r1[i].disabled) {
                return true;
            }
        }
    }

    getDates(month) {
        month = new Date(month);
        month.setDate(1);

        var delta = month.getDay() - 1;
        if (delta === -1) delta = 6;

        var startDate = new Date(month);
        startDate.setDate(startDate.getDate() - delta);

        month.setMonth(month.getMonth() + 1);
        month.setDate(0);

        delta = 7 - month.getDay();
        if (delta === 7) delta = 0;

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

        this.props.onDateChange(selectFrom, selectTo);

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
        return (
            <ListView
                initialListSize={5}
                scrollRenderAheadDistance={1200}
                style={styles.listViewContainer}
                dataSource={this.state.dataSource}
                renderRow={(month) => {
                    return (
                        <Month
                            monthsLocale={this.props.monthsLocale}
                            weekDaysLocale={this.props.weekDaysLocale}
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