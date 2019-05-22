import React, { Component } from "react";
import RepLogs from './Replogs';
import PropTypes from "prop-types";
import { getRepLogs, deleteRepLog, createRepLog } from '../Api/rep_log_api';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 1,
            isLoaded: false,
        };

        this.handleRowClick = this.handleRowClick.bind(this);
        this.handleAddReplog = this.handleAddReplog.bind(this);
        this.handleHeartChange = this.handleHeartChange.bind(this);
        this.handleDeleteRepLog = this.handleDeleteRepLog.bind(this);
    }

    componentDidMount() {
        getRepLogs()
            .then(data => {
                this.setState({
                    repLogs: data,
                    isLoaded: true,
                });
            });
    }

    handleRowClick(repLogsId) {
        this.setState({ highlightedRowId: repLogsId });
    }

    handleAddReplog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        }

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    return {repLogs: newRepLogs};
                });
            });

        //Ch21 : Don't mutate my state. Using callback 
        // this.setState(prevState => {
        //     const newRepLogs = [...prevState.repLogs, newRep];

        //     return { repLogs: newRepLogs };
        // });
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount,
        });
    }

    handleDeleteRepLog(id) {
        deleteRepLog(id);
        
        this.setState((setState) => {
            return {
                repLogs: this.state.repLogs.filter(repLogs => repLogs.id !== id)
            };
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
                onDeleteRepLog={this.handleDeleteRepLog}
            />
        );
    }
}

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
};