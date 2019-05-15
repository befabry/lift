import React, { Component } from "react";
import RepLogs from './Replogs';
import PropTypes from "prop-types";
import uuid from 'uuid/v4';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [
                { id: uuid(), reps: 25, itemLabel: 'Big Fat Cat', totalWeightLifted: 102 },
                { id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 220 },
                { id: uuid(), reps: 45, itemLabel: 'Car', totalWeightLifted: 550 },
            ],
            numberOfHearts: 1,
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddReplog = this.handleAddReplog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
    }

    handleRowClick(repLogsId) {
        this.setState({ highlightedRowId: repLogsId });
    }

    handleAddReplog(itemLabel, reps) {
        const newRep = {
            id: uuid(),
            reps: reps,
            itemLabel: itemLabel,
            totalWeightLifted: Math.floor(Math.random() * 50),
        }
        
        //Ch21 : Don't mutate my state. Using callback 
        this.setState(prevState => {
            const newRepLogs = [...prevState.repLogs, newRep];

            return {repLogs: newRepLogs};
        });

        const newRepLogs = [...this.state.repLogs, newRep];
        this.setState({repLogs: newRepLogs});
    }

    handleHeartChange(heartCount){
        this.setState({
            numberOfHearts: heartCount,
        });
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                onRowClick={this.handleRowClick}
                onAddReplog={this.handleAddReplog}
                onHeartChange={this.handleHeartChange}
            />
        );
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
};