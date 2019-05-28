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
        isSavingNewReplog,
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
            {repLogs.map((repLog) => (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'bg-info text-white font-weight-bold' : ''}
                    onClick={() => onRowClick(repLog.id)}
                    style={{
                        opacity: repLog.isDeleting ? .3 : 1
                    }}
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>
                        <a href="#" onClick={(event) => handleDeleteClick(event, repLog.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </a>
                    </td>
                </tr>
            ))
            }
            {isSavingNewReplog && (
                <tr>
                    {/* style => entering JS then creating an object */}
                    <td
                        colSpan="4"
                        className="text-center"
                        style={{
                            opacity: .5
                        }}
                    >
                        <FontAwesomeIcon icon={faSpinner} spin />
                    </td>
                </tr>
            )}
        </tbody>
    )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewReplog: PropTypes.bool.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};