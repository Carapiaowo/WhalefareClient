function validar_datosr(a, b, c) {
    //A -> Password, B -> Correo, C -> Usuario
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (b.length === 0 || a.length === 0 || c.length === 0) {
        alert("¡Llena todos los campos!")
    } else if (c.length === 0) {
        alert("¡Ingresa tu nombre de usuario!");
    } else if (b.length === 0) {
        alert("¡Ingresa tu correo electrónico!");
    } else if (a.length === 0) {
        alert("¡Crea una contraseña!");
    } else if (!emailRegex.test(b)) {
        alert("¡Ingresa un correo válido!");
    } else if (c.length < 5 || c.length > 20) {
        alert("¡Ingresa un nombre de usuario de  5 - 10 caracteres!");
    } else if (!passRegex.test(a)) {
        alert("¡Ingresa una contraseña de al menos 8 caracteres, una mayúscula, una minúscula y un número !");
    }
    else {
        window.location.href = 'registro_exitoso.html';
    }
}

function validar_datosr2(a, b, c) {
    //A -> Password, B -> Correo, C -> Usuario
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (b.length === 0 || a.length === 0 || c.length === 0) {
        alert("¡Llena todos los campos!")
    } else if (c.length === 0) {
        alert("¡Ingresa tu nombre de usuario!");
    } else if (b.length === 0) {
        alert("¡Ingresa tu correo electrónico!");
    } else if (a.length === 0) {
        alert("¡Crea una contraseña!");
    } else if (!emailRegex.test(b)) {
        alert("¡Ingresa un correo válido!");
    } else if (c.length < 5 || c.length > 20) {
        alert("¡Ingresa un nombre de usuario de  5 - 10 caracteres!");
    } else if (!passRegex.test(a)) {
        alert("¡Ingresa una contraseña de al menos 8 caracteres, una mayúscula, una minúscula y un número !");
    }
    else {

    }
}

function validar_pass(a, b, c) {
    //A -> url, B -> Usuario, C -> Nombre
    let urlRegex = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/;

    if (b.length === 0 || a.length === 0 || c.length === 0) {
        alert("¡Llena todos los campos!");
    } else if (b.length === 0) {
        alert("¡Ingresa el usuario que corresponde a tu contraseña!");
    } else if (a.length === 0) {
        alert("¡Ingresa el dominio!");
    } else if (c.length === 0) {
        alert("¡Ingresa el nombre!");
    } else if (!urlRegex.test(a)) {
        alert("¡Ingresa un dominio válido!");
    }
    else {

    }

}

const formVal = (e) => {
    if (e) {
        const title = e.Title
        const password = e.Password
        const website = e.Website
        const user = e.User

        var expression = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
        let urlRegex = new RegExp(expression);
        if (!title || !password || !website || !user) {
            return ('emptyform');
        } else if (!title) {
            return ('title')
        } else if (!password) {
            return ('password')
        } else if (!website) {
            return ('website')
        } else if (!user) {
            return ('user')
        } else if (title.length < 5) {
            return ('title')
        } else if (password.length < 5) {
            return ('password')
        } else if (website.length < 5) {
            return ('website')
        } else if (user.length < 5) {
            return ('user')
        } else if (!urlRegex.test(website)) {
            return ('website')
        } else {
            return (true)
        }
    } else {
        return ('emptyform');
    }
}

const loginVal = (e) => {
    const password = e.Password
    const email = e.Email
    let expression = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let urlRegex = new RegExp(expression);

    if (!password || !email) {
        return ('emptyform')
    } else if (!password) {
        return ('password')
    } else if (!email) {
        return ('email')
    } else if (!urlRegex.test(email)) {
        return ('email')
    } else {
        return (true)
    }

}

const signupVal = (e) => {
    const password = e.Password
    const email = e.Email
    const user = e.User
    let expression = /^[-\w.%+]{3,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let mediumPassword = new RegExp('(?=.*[A-Z])(?=.*[0-9]).{6}');
    let emailRegex = new RegExp(expression);

    if (!password || !email || !user) {
        return ('emptyform')
    } else if (!password) {
        return ('password')
    } else if (!email) {
        return ('email');
    } else if (!user) {
        return ('user')
    } else if (password.length < 5) {
        return ('password')
    } else if (email.length < 5) {
        return ('email')
    } else if (user.length < 5) {
        return ('user')
    } else if (!emailRegex.test(email)) {
        return ('email')
    } else if (!mediumPassword.test(password)) {
        return ('safepassword')
    } else {
        return (true)
    }

}

const safetyPass = (e) => {
    let strongPassword = new RegExp('(?=.*[A-Z])(?=.*[@$!%*#?&"<>.,:;]).{8}');
    let mediumPassword = new RegExp('(?=.*[A-Z])(?=.*[0-9]).{6}');
    let passwordSafety
    if (strongPassword.test(e)) {
        document.getElementById("Password").className = "form-control is-valid";
        document.getElementById("p1").innerHTML = "Tu contraseña es fuerte";
        passwordSafety = true
        return passwordSafety;
    } else if (mediumPassword.test(e)) {
        document.getElementById("Password").className = "form-control is-valid";
        document.getElementById("p1").innerHTML = "Tu contraseña puede mejorar";
        passwordSafety = false
        return passwordSafety;
    } else {
        document.getElementById("Password").className = "form-control is-invalid";
        document.getElementById("p1").innerHTML = "Tu contraseña es débil";
        passwordSafety = false
        return passwordSafety;
    }
}

module.exports = { formVal, loginVal, signupVal, validar_datosr, validar_datosr2, validar_pass, safetyPass }