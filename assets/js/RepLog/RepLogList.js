import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'


export default function RepLogList(props) {

    const {
        highlightedRowId,
        isLoaded,
        onDeleteRepLog,
        onRowClick,
        repLogs,
    } = props;

    const handleDeleteClick = function (event, repLogId) {
        event.preventDefault();

        onDeleteRepLog(repLogId);
    };

    if (!isLoaded) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center">
                        <FontAwesomeIcon icon={faSpinner} size="2x" spin />
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {repLogs.map((repLogs) => (
                <tr
                    key={repLogs.id}
                    className={highlightedRowId === repLogs.id ? 'bg-info text-white font-weight-bold' : ''}
                    onClick={() => onRowClick(repLogs.id)}
                >
                    <td>{repLogs.itemLabel}</td>
                    <td>{repLogs.reps}</td>
                    <td>{repLogs.totalWeightLifted}</td>
                    <td>
                        <a href="#" onClick={(event) => handleDeleteClick(event, repLogs.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </td>
                </tr>
            ))
            }

        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};