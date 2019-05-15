import React from "react";
import PropTypes from "prop-types";

export default function RepLogList(props) {

        const { highlightedRowId, onRowClick, repLogs } = props;
    
        return (<tbody>
            {repLogs.map((repLogs) => (
                <tr
                    key={repLogs.id}
                    className={highlightedRowId === repLogs.id ? 'bg-info text-white font-weight-bold' : ''}
                    onClick={() => onRowClick(repLogs.id)}
                >
                    <td>{repLogs.itemLabel}</td>
                    <td>{repLogs.reps}</td>
                    <td>{repLogs.totalWeightLifted}</td>
                    <td>&nbsp;</td>
                </tr>
            ))
            }
        </tbody>
        )
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
};