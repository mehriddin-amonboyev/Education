document.querySelector('#text').addEventListener('focusout', myText);
document.querySelector('#password').addEventListener('focusout', myPass);

document.querySelector('#btn').addEventListener('click', function () {
    myText();
    myPass();
});

function myText() {
    let message, text;
    let errElement = document.getElementById('text');
    message = document.getElementById('user_err');
    text = document.getElementById('text').value;

    try {
        if (text == "") {
            errElement.classList.remove('valid');
            errElement.classList.add('user_err');
            throw 'Error';
        }
        if (text.length > 0) {
            errElement.classList.remove('user_err');
            errElement.classList.add('valid');
            message.innerHTML = ''
        }
    } catch (err) {
        message.innerHTML = err;
    }
}
function myPass() {
    let message, pass;
    let errElement = document.getElementById('password');
    message = document.getElementById('pass_err');
    pass = document.getElementById('password').value;

    try {
        if (pass == "") {
            errElement.classList.remove('valid');
            errElement.classList.add('pass_err');
            throw 'Error';
        }
        if (pass.length > 0) {
            errElement.classList.remove('pass_err');
            errElement.classList.add('valid');
            message.innerHTML = ''
        }
    } catch (err) {
        message.innerHTML = err;
    }
}