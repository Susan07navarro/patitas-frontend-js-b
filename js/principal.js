window.addEventListener('load', function () {

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');
    const msgError = this.document.getElementById('msgError');
    
    
    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}
function cerrarAlertSuccess(mensaje){
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'none';
}
const mostrarAlertError = (mensaje) => {
    msgError.innerHTML = mensaje;
    msgError.style.display = 'block';
}

const idButtonLogout = document.getElementById('logout');

idButtonLogout.addEventListener('click', () => {
    const userAutenticado = localStorage.getItem('result');
    if (!userAutenticado) return;
    logout();
});

const logout = async () => {
    const url = 'http://localhost:8082/login/logout';
    const userAutenticado = JSON.parse(localStorage.getItem('result'));

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userAutenticado.nombreUsuario
        });
        console.log("RESPONSE STATUS: ", response.status);
        if (response.status === 200) {
            localStorage.clear();
            window.location.replace('index.html');
        } else {
            cerrarAlertSuccess()
            mostrarAlertError('Error: Ocurrio un de tiempo')
        }
    } catch (error) {
        console.log("Error: ", error);
    }
}
