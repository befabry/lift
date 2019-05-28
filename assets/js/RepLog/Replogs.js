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
        highlightedRowId,
        isLoaded,
        isSavingNewReplog,
        newRepLogValidationErrorMessage,
        numberOfHearts,
        onAddReplog,
        onDeleteRepLog,
        onHeartChange,
        onRowClick,
        repLogs,
        successMessage,
        withHeart,
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

                {successMessage && (
                    <div className='alert alert-success text-center'>
                        {successMessage}
                    </div>
                )}

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
                        onDeleteRepLog={onDeleteRepLog}
                        isLoaded={isLoaded}
                        isSavingNewReplog={isSavingNewReplog}
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
                            validationErrorMessage={newRepLogValidationErrorMessage}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

Replogs.propTypes = {
    highlightedRowId: PropTypes.any,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewReplog: PropTypes.bool.isRequired,
    newRepLogValidationErrorMessage: PropTypes.string.isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    onAddReplog: PropTypes.func.isRequired,
    onDeleteRepLog: PropTypes.func.isRequired,
    onHeartChange: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
    repLogs: PropTypes.array.isRequired,
    successMessage: PropTypes.string.isRequired,
    withHeart: PropTypes.bool,
};