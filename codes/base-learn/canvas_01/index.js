class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

const H_STEP = 70 // ����������, �û��زĴ���
const V_STEP = 92 // ����߶�����, �����زĴ���
const MOVE_STEP = 10 // ÿ֡�ƶ�����
const TIMESTAMP_THRESHOLD = 80 // ʱ����ֵ
const FRAMES_LENGTH = 8

const canvas = document.querySelector('#canvasCont')
const ctx = canvas.getContext('2d')

const image = new Image()
image.src = 'walking.jpeg'

let index = 0 // ����,ÿ��Ⱦһ�� +1
let lastTime = 0
let currentPost = new Position(0, 0) // ��ǰλ��
let targerPost = new Position(0, 0) // Ŀ��λ��
let angle = 0
let movingAngleType = 2 // �ƶ�ʱ�Ƕ�����
let xMoveStep // x��ÿ���ƶ�����
let yMoveStep // y��ÿ���ƶ�����

image.onload = () => {
    window.requestAnimationFrame(walking)
}

/**
 * ���������ת��Ϊ canvas �����ڵ�����
 * */
function windowToCanvas(canvas, x, y) {
    console.log(x, y);
    // getBoundingClientRect link: https://juejin.cn/post/7046586981601509390
    let bbox = canvas.getBoundingClientRect()
    // ��ȡ canvas Ԫ�����ϵ� CSS ��ʽ
    let style = window.getComputedStyle(canvas)

    return {
        x: (x - bbox.left - parseInt(style.paddingLeft) - parseInt(style.borderLeft))
            * (canvas.width / parseInt(style.width)),
        y: (y - bbox.left - parseInt(style.paddingTop) - parseInt(style.borderTop))
            * (canvas.height / parseInt(style.height)),
    }
}

/**
 * �ƶ�
 * */ 
function walking(timeStamp) {
    if (timeStamp - lastTime > TIMESTAMP_THRESHOLD) {
        timeStamp = lastTime
        if (Math.abs(targerPost.x - currentPost.x) > Math.abs(xMoveStep)) {
            currentPost.x += xMoveStep
        } else {
            currentPost.x = targerPost.x
        }

        if (Math.abs(targerPost.y - currentPost.y) > Math.abs(yMoveStep)) {
            currentPost.y += yMoveStep
        } else {
            currentPost.y = targerPost.y
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(image, H_STEP * (index++ % FRAMES_LENGTH), V_STEP * movingAngleType, H_STEP, V_STEP, currentPost.x, currentPost.y, H_STEP, V_STEP)
    }
    window.requestAnimationFrame(walking)
}

canvas.addEventListener('click', (e) => {
    const position = windowToCanvas(canvas, e.clientX, e.clientY)
    targerPost.x = position.x - H_STEP / 2
    targerPost.y = position.y - V_STEP / 2 

    angle = Math.asin((targerPost.y - currentPost.y) / Math.sqrt(Math.pow(targerPost.y - currentPost.y, 2)
            + Math.pow(targerPost.x - currentPost.x, 2)))

    if(targerPost.x < currentPost.x) angle = Math.PI - angle

    xMoveStep = MOVE_STEP * Math.cos(angle)
    yMoveStep = MOVE_STEP * Math.sin(angle)
    
    if(angle > -5 * Math.PI / 12 && angle < -Math.PI / 12) {
        movingAngleType = 7 // ����
    } else if(angle >= -Math.PI / 12 && angle <= Math.PI / 12 ) {
        movingAngleType = 2 // ��
    } else if(angle > Math.PI / 12 && angle < 5 * Math.PI / 12) {
        movingAngleType = 5 // ����
    } else if(angle >= 5 * Math.PI / 12 && angle <= 7 * Math.PI / 12) {
        movingAngleType = 0 // ��
    } else if(angle > 7 * Math.PI / 12 && angle  < 11 * Math.PI / 12) {
        movingAngleType = 4 // ����
    } else if(angle >= 11 * Math.PI / 12 && angle <= 13 * Math.PI / 12) {
        movingAngleType = 1 // ��
    } else if(angle > 13 * Math.PI / 12 && angle < 17 * Math.PI / 12) {
        movingAngleType = 6 // ����
    } else {
        movingAngleType = 3 // ��
    }
})


