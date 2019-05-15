import React from "react";
import RepLogList from "./RepLogList";
import PropTypes from "prop-types";
import RepLogForm from "./RepLogForm";
//import RepLogForm from "./RepLogFormControlledComponent";

function calculateTotalWeightLifted(repLogs) {
    let total = 0;

    for (let repLog of repLogs) {
        total += repLog.totalWeightLifted;
    }

    return total;
}

const calculateTotalWeightFancier = repLogs => repLogs.reduce((total, repLog) => total + repLog.totalWeightLifted, 0);

export default function Replogs(props) {
    const {
        withHeart,
        highlightedRowId,
        onRowClick,
        repLogs,
        onAddReplog,
        numberOfHearts,
        onHeartChange,
    } = props;

    let heart = '';
    if (withHeart) {
        heart = <span>{'❤️'.repeat(numberOfHearts)}</span>;
    }

    return (
        <div className="row">
            <div className="col-md-7">
                <h2>Lift History {heart}</h2>
                <input
                    type='range'
                    value={numberOfHearts}
                    onChange={(e) => {
                        onHeartChange(+e.target.value)
                    }}
                />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>What</th>
                            <th>How many times?</th>
                            <th>Weight</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <RepLogList
                        highlightedRowId={highlightedRowId}
                        // On passe la fonction (callback)
                        onRowClick={onRowClick}
                        repLogs={repLogs}
                    />
                    <tfoot>
                        <tr>
                            <td>&nbsp;</td>
                            <th>Total</th>
                            <th>{calculateTotalWeightFancier(repLogs)}</th>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </table>
                <div className='row'>
                    <div className='col-md-12'>
                        <RepLogForm
                            onAddReplog={onAddReplog}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

Replogs.propTypes = {
    highlightedRowId: PropTypes.any,
    numberOfHearts: PropTypes.number.isRequired,
    onAddReplog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    withHeart: PropTypes.bool
};