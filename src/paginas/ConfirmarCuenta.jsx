import { useEffect,useState } from "react"
import { useParams, Link } from "react-router-dom" //para leer los parametros de la url
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios"


function ConfirmarCuenta() {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({})


    const params = useParams()
    const { id } = params  //Este parametro biene de la url

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({msg:data.msg, error:false})
            } catch (error) {
                setAlerta({msg:error.response.data.msg, error:true})
            }

            setCargando(false)
        }
        confirmarCuenta()
    }, [])
    return (
        <>
        <div className="mb-20 md:mb-0">
            <h1 className="text-indigo-600 font-black text-center text-6xl">Confirma tu Cuenta y Comienza a Administrar tus <span className="text-black">Pacientes</span></h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl  bg-white">
               {!cargando &&
                <Alerta
                    estaEsmiAlerta={alerta}
                />}

                {cuentaConfirmada && (
                    <Link to="/" className="block text-center my-5 text-gray-500">Inicia Session</Link>
                )}
            </div>
        </>
    )
}

export default ConfirmarCuenta