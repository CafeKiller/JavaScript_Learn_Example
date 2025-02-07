// 1 ԭʼ resolve д��
new Promise(function(resolve){
    resolve(42);
});
// 1 ��Ӧ resolv �﷨��д��
Promise.resolve(42).then(function(value){
    console.log(value);
});    

// 2 Promise.resolve ������һ�����þ��ǽ� thenable ����ת��Ϊpromise����
// jQuery.ajax()�����ķ���ֵ����thenable�ġ� 
// jQuery.ajax() �ķ���ֵ�� jqXHR Object �������������� .then ������
var promise = Promise.resolve($.ajax('/json/comment.json'));// => promise����
promise.then(function(value){
   console.log(value);
});



// 3 ԭʼ reject д��
new Promise(function(resolve,reject){
    reject(new Error("������"));
});
// 3 ��Ӧ reject �﷨��д��
Promise.reject(new Error("BOOM!")).catch(function(error){
    console.error(error);
});


// 4 promise chain
function taskA() {
    console.log("Task A");
    throw new Error("throw Error @ Task A")
}
function taskB() {
    console.log("Task B");// ���ᱻ����
}
function onRejected(error) {
    console.log(error);// => "throw Error @ Task A"
}
function finalTask() {
    console.log("Final Task");
}
var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskB)
    .catch(onRejected)
    .then(finalTask);


// 4 then �� catch ��ÿ�ε��ú󶼻᷵��һ�� �µ� promise ����
function doubleUp(value) {
    return value * 2;
}
function increment(value) {
    return value + 1;
}
function output(value) {
    console.log(value);// => (1 + 1) * 2
}
var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output)
    .catch(function(error){
        // promise chain�г����쳣��ʱ��ᱻ����
        console.error(error);
    });


// 5 �� IE8 ��ʹ�� catch �ᱨ��. ͨ�������ķ�ʽ�Ϳ��Թ��
// promise#catch �ı����� Promise(undefined, onReject) ���﷨��
var promise = Promise.reject(new Error("message"));
promise["catch"](function (error) {
    console.error(error);
});


