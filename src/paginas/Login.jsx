import { Link, useNavigate } from "react-router-dom"
import { useState} from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alerta, setAlerta] = useState({})

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if([email, password].includes('')){
      setAlerta({msg:"Los campos no deben de estar vacios",error: true})
      return;
    }

    if( password.length < 8){
      setAlerta({msg:"Contraseña Invalida", error: true})
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login',{email, password});
      localStorage.setItem('token', data.token);
      setAuth(data)
      navigate('/admin')//navigate es la parte de la redireccion
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error: true})
    }
  }
  const { msg } = alerta;

  return (
    <>
        <div>
          <h1 className="text-indigo-600 font-black text-center text-6xl">Inicia Sesion  y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-white">
          {msg && <Alerta estaEsmiAlerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
              <input type="email" placeholder="Email de registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Password:</label>
              <input type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
              placeholder="Ingresa tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" />
            </div>
            <div className="mt-10 lg:flex lg:justify-between">
              <input type="submit" name="enviar" id="enviar" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value="Iniciar Sesion"/>
              <button type="button" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
              onClick={toggleShowPassword}>{showPassword ? "Hide" : "Show"} Password</button>
            </div>

          </form>
          <nav className="mt-10 lg:flex lg:justify-between">
            <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta? Registrate</Link>
            <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi Password</Link>
          </nav>
        </div>
    </>
  )
}

export default Login