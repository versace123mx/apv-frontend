import { createContext, useState, useEffect } from 'react'
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext()

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth();

    useEffect(() => {

        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data);
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes();
    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState.id == data._id ? data : pacienteState)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                setPacientes(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?')
        if (confirmar) {
            const token = localStorage.getItem('token');
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}



export default PacientesContext