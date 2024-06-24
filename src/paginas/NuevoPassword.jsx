import { useParams, Link } from "react-router-dom" //para leer los parametros de la url
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios"
import { useState, useEffect } from "react"

function NuevoPassword() {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams()
  const { token } = params  //Este parametro biene de la url

  //El useEffect se ejecuta en cuanto carga la aplicacion, en este caso va a comprobar que el token de la url es valido
  useEffect(()=>{
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({msg: 'Ingresa tu Nuevo Password', error: false})
        setTokenValido(true)
      } catch (error) {
        setAlerta({msg:"Hubo un error con el enlace", error:true})
        return;
      }
    }
    comprobarToken();
  }, [])
  //const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();
    if( password.length < 8){
      setAlerta({msg: 'El password debe tener al menos 8 caracteres', error:true})
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password});
      setAlerta({msg: data.msg, error:false})
      setPasswordModificado(true)
      setTokenValido(false)
    } catch (error) {
      setAlerta({msg: error.response.data.msg, error:true})
      setTokenValido(false)
      setPassword('')
      setPasswordModificado(false)
    }
  }

    const { msg } = alerta
  return (
    <>
      <div className="mb-20 md:mb-0">
        <h1 className="text-indigo-600 font-black text-center text-6xl">Reestablece tu password y no Pierdas Accesso a <span className="text-black">tus Pacientes</span></h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-white">
        {msg && <Alerta estaEsmiAlerta={alerta} />}
        {tokenValido && (
          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password:</label>
              <input type="password" placeholder="Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password}
                onChange={e => setPassword(e.target.value)} />
            </div>
            <input type="submit" name="enviar" id="enviar" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" value="Guardar Nuevo Password" />
          </form>
        )}
        { passwordModificado && (
          <nav className="mt-10 lg:flex lg:justify-center">
            <Link to="/" className="block text-center my-5 text-gray-500">Iniciar Session</Link>
          </nav>
          )
        }
      </div>

    </>
  )
}

export default NuevoPassword