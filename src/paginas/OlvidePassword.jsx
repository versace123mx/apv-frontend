import { Link } from "react-router-dom"
import { useState} from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios"

function OlvidePassword() {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{
        e.preventDefault();

        if(email == ''){
            setAlerta({msg:"El email es obligatorio", error:true})
            return;
        }

        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password',{ email });
            setAlerta({msg:data.msg, error:false})
            setEmail('')
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error:true})
            return;
        }
    }
    const { msg } = alerta
return (
        <>
            <div className="mb-20 md:mb-0">
            <h1 className="text-indigo-600 font-black text-center text-6xl">Recupera tu Cuenta  y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-white">
                {msg && <Alerta estaEsmiAlerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                        <input type="email" placeholder="Ingresa tu Email registrado" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input type="submit" name="enviar" id="enviar" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value="Recuperar Cuenta"/>
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia Session</Link>
                    <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword