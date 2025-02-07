// 1: ��ͬһ��promise����ͬʱ���� `then` ����
var aPromise = new Promise(function (resolve) {
    resolve(100);
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    return value * 2;
});
aPromise.then(function (value) {
    console.log("1: " + value); // => 100
})

// vs

// 2: �� `then` ���� promise chain ��ʽ���е���
var bPromise = new Promise(function (resolve) {
    resolve(100);
});
bPromise.then(function (value) {
    return value * 2;
}).then(function (value) {
    return value * 2;
}).then(function (value) {
    console.log("2: " + value); // => 100 * 2 * 2
});


// then �� ����ʹ�÷���
function badAsyncCall() {
    var promise = Promise.resolve();
    promise.then(function() {
        // ���⴦��
        return newVar;
    });
    return promise;
}