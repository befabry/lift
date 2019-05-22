function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin'
    }, options))
        .then(response => {
            return response.json();
        });
}

/**
 * Returns a Promise object with the rep logs data
 * 
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetchJson('/reps')
        .then(data => data.items);

    // return fetch('/reps', {
    //     credentials: 'same-origin',
    // })
    //     .then(response => {
    //         return response.json().then((data) => data.items);
    //     });
}

/**
 * Delete a rep log
 * 
 * @return {Promise<Response>}
 */
export function deleteRepLog(id) {
    return fetchJson(`/reps/${id}`, {
        method: 'DELETE',
    });
}

export function createRepLog(repLog){
    return fetchJson('/reps', {
        method: 'POST',
        body: JSON.stringify(repLog),
        header: {
            'Content-Type': 'application/json',
        }
    })
}