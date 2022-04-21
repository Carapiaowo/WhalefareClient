import { NavLink } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container-footer-all">
                <div className="container-body">
                    <div className="colum1">
                        <h1 className='h1footer'>Deberías leer</h1>
                        <div className="row2">
                            <NavLink to="/politicas" aria-label="Deberías leer la política de privacidad.">
                                <p>Política de privacidad</p>
                            </NavLink>
                            <br />
                            <NavLink to="/terminos" aria-label="Deberías leer los términos y condiciones.">
                                <p>Términos y condiciones</p>
                            </NavLink>
                        </div>
                        <h1 class="h1footer">Deberías notificar</h1>
                     <div ><a class="rownot" aria-label="Deberías notificar quejas y sugerencias." href="https://forms.gle/EVkKuce3fE9NEhYh8"><p>Quejas y sugerencias</p></a></div>
                    </div>

                    <div className="colum2">
                        <h1>Deberías ver</h1>
                        <div className="row2_ft">
                            <a href={"https://github.com/Marmolejo1489/Whalefare_"} target="_blank" rel="noreferrer"
                                aria-label="Deberías ver el repositorio para entender el proyecto.">
                                <img className='github' src="assets/img/GitHub-Mark-Light-120px-plus.png" alt="Logo de GitHub." />
                            </a>

                        </div>
                    </div>

                    <div className="colum3">
                        <h1>Deberías acudir</h1>
                        <div className="row2">
                            <p>Mar Mediterráneo 227, Popotla, 11400 (Ciudad de México)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="copyright"> © Tecnología Krishna, 2022.</div>

        </footer>

    );
}

export default Footer;