import { Link } from "react-router-dom"
import { useState} from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios"

function Registrar() {

    /*Creamos el useState para saber el estado de cambio de los input's, el useState se usa cuando tenemos un evento y este cambia*/
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmarPassword, setConfirmarPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{
        e.preventDefault();
        if([nombre, email, password, confirmarPassword].includes('')){
            setAlerta({msg:"hay campos vacios", error:true})
            return;
        }
        if(password != confirmarPassword){
            setAlerta({msg:"Las contraseñas no coinciden", error:true})
            return;
        }
        if( password.length < 8 ){
            setAlerta({msg: "los pasword deven de ser mayor o igual a 8 caracteres", error:true})
            return;
        }
        setAlerta({})

        //Crear el usuario en la api
        try {
            await clienteAxios.post('/veterinarios',{nombre,email,password})
            setAlerta({msg: 'Creado Correctamente, Revisa tu Email', error:false})
            setNombre('')
            setEmail('');
            setPassword('')
            setConfirmarPassword('')
            setInterval(()=>{
                setAlerta({})
            },5000)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error:true})
        }
    }
    const {msg} = alerta

return (
        <>
            <div className="mb-20 md:mb-0">
            <h1 className="text-indigo-600 font-black text-center text-6xl">Crea tu Cuenta  y Administra tus <span className="text-black">Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-white">
                {msg && <Alerta estaEsmiAlerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre:</label>
                        <input type="input" placeholder="Ingresa tu Nombre" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={nombre}
                        onChange={ e => setNombre(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                        <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={email}
                        onChange={ e => setEmail(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Ingresa tu Password:</label>
                        <input type="password" placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password}
                        onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <div className="my-5">
                        <label className="uppercase text-gray-600 block text-xl font-bold">Confirmar tu Password:</label>
                        <input type="password" placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={confirmarPassword}
                        onChange={ e => setConfirmarPassword(e.target.value)}/>
                    </div>
                    <input type="submit" name="enviar" id="enviar" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value="Crear Cuenta"/>
                </form>
                <nav className="mt-10 lg:flex lg:justify-between">
                    <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta? Inicia Session</Link>
                    <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi Password</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar