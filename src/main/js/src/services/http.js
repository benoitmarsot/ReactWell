const devRoot=(window.location.port==="5173")?'http://localhost:8080':'';

export default {
    toJSON: function(data) {
        var koj = JSON.stringify(data);
        return koj;
    },get : (url) => {
        return fetch(devRoot+url).then(
          (response) => response.json()
        );
    },post : (url, data) => {
        return fetch(devRoot+url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            }).then((response) => response.json());
    },put : (url, data) => {
        return fetch(devRoot+url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) => response.json());
    },delete: (url) => {
        return fetch(devRoot+url, { method: 'DELETE' }).then(
            (response) => response.json()
        );
    }
};