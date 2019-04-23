import React, { Component } from "react";

export default class RepLogList extends Component {

    render() {

        const { highlightedRowId } = this.props;

        const repLogs = [
            { id: 1, reps: 25, itemLabel: 'Big Fat Cat', totalWeightLifted: 102 },
            { id: 8, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 220 },
            { id: 12, reps: 45, itemLabel: 'Car', totalWeightLifted: 550 },
        ];
    
        return (<tbody>
            {repLogs.map((repLogs) => (
                <tr
                    key={repLogs.id}
                    className={highlightedRowId === repLogs.id ? 'bg-info text-white font-weight-bold' : ''}
                    onClick={(event) => this.handleRowClick(repLogs.id, event)}
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
}