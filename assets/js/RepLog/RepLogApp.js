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
            newRepLogValidationErrorMessage: '',
            numberOfHearts: 1,
            isLoaded: false,
            isSavingNewReplog: false,
            successMessage: '',
        };

        this.successMessageTimeoutHandle = 0;

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

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle);
    }

    handleRowClick(repLogsId) {
        this.setState({ highlightedRowId: repLogsId });
    }

    handleAddReplog(item, reps) {
        const newRep = {
            reps: reps,
            item: item,
        }

        this.setState({
            isSavingNewReplog: true,
        });

        const newState = {
            isSavingNewReplog: false,
        };

        createRepLog(newRep)
            .then(repLog => {
                this.setState(prevState => {
                    const newRepLogs = [...prevState.repLogs, repLog];

                    this.setSuccessMessage('Rep Log Saved!');

                    return {
                        ...newState,
                        repLogs: newRepLogs,
                        newRepLogValidationErrorMessage: '',
                    };
                });
            })
            .catch(error => {
                error.response.json().then(errorsData => {
                    const errors = errorsData.errors;
                    const firstError = errors[Object.keys(errors)[0]];

                    // Methode normale
                    // this.setState(Object.assign({
                    //     newRepLogValidationErrorMessage: firstError,
                    // }, newState));

                    //Methode swag expérimentale avec plugin @babel/plugin-proposal-object-rest-spread
                    this.setState({
                        ...newState,
                        newRepLogValidationErrorMessage: firstError,
                    });
                });
            });

        //Ch21 : Don't mutate my state. Using callback 
        // this.setState(prevState => {
        //     const newRepLogs = [...prevState.repLogs, newRep];

        //     return { repLogs: newRepLogs };
        // });
    }

    setSuccessMessage(message) {
        this.setState({
            successMessage: message,
        });

        clearTimeout(this.successMessageTimeoutHandle);
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({
                successMessage: '',
            });

            this.successMessageTimeoutHandle = 0;
        }, 3000);
    }

    handleHeartChange(heartCount) {
        this.setState({
            numberOfHearts: heartCount,
        });
    }

    handleDeleteRepLog(id) {
        this.setState((prevState) => {
            return {
                repLogs: prevState.repLogs.map(repLog => {
                    if (repLog.id !== id) {
                        return repLog;
                    }
                    // Object.assign => arraymerge PHP (+ voir Create method)
                    //return Object.assign({}, repLog, { isDeleting: true });
                    return { ...repLog, isDeleting: true };
                })
            };
        });

        deleteRepLog(id)
            .then(() => {
                this.setSuccessMessage('Item was Un-lifted!')
            });

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
    itemOptions: PropTypes.array,
    withHeart: PropTypes.bool,
};

RepLogApp.defaultProps = {
    itemOptions: [],
}