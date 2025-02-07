function getURLCallback (URL, callback) {
    const req = new XMLHttpRequest()
    req.open("GET", URL, true)
    req.onload = function (){
        if (req.status === 200) {
            callback(null, req.responseText)
        } else {
            callback(new Error(req.responseText), req.response)
        }
    }
    req.onerror = function() {
        callback(new Error(req.statusText))
    }
    req.send()
}


// ��ȫ�Ľ��� JSON
function jsonParse (callback, error, value) {
    if (error) {
        callback(error, value)
    } else {
        try {
            let result = JSON.parse(value)
            callback(null, result)
        } catch (e) {
            callback(e, value)
        }
    }
}

// ����
const requestObj = {
    comment: (callback) => {
        return getURLCallback(
            'https://jsonplaceholder.typicode.com/todos/100',
            jsonParse.bind(null, callback))
    },
    people: (callback) => {
        return getURLCallback(
            'https://jsonplaceholder.typicode.com/users',
            jsonParse.bind(null, callback))
    },
}

// ������ XHR ����
function allRequest (requests, callback, results) {
    if (requests.length === 0) {
        return callback(null, results)
    }
    const req = requests.shift()
    req( (error, value) => {
        if (error) {
            callback(error, value)
        } else {
            results.push(value)
            allRequest(requests, callback, results)
        }
    } )
}


// ����
function run (callback) {
    allRequest([requestObj.comment, requestObj.people], callback, [])
}

run( (error, results) => {
    if (error) {
        return console.error(error);
    }
    console.log(results);
} )