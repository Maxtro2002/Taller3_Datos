import React, { Children, useEffect, useState } from 'react'
import axios from 'axios'
import { usuarios } from '../services/routes'

export default function Login({ children }) {
    const currentUser = localStorage.getItem('user')
    const [puedePasar, setPuedePasar] = useState(false)
    //CONSTANTE DE MENSAJES DE ERROR
    const [error, setError] = useState('')
    //CONSTANTE PARA LOS DATOS DEL USUARIO
    const [esNuevo, setEsNuevo] = useState(false)
    const [user, setUser] = useState({
        Cedula: '',
        Nombre: '',
    })

    useEffect(() => {
        if (currentUser) {
            setPuedePasar(true)
        }
    }, [currentUser])

    const handleChange = ({ target: { name, value } }) => {
        setError('') //LIMPIA EL MENSAJE DE ERROR
        setUser({ ...user, [name]: value })
    }

    const Register = async () => {
        try {
            const register = await axios.post(usuarios, user)
            localStorage.setItem('user', JSON.stringify(register.data))
            setPuedePasar(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (handleValidate()) {
            if (esNuevo) {
                Register()
            } else {
                Login()
            }
        }
    }

    const handleValidate = () => {
        if (user.Cedula === '' || user.Email === '') {
            setError('Por favor rellene los campos')
            return false
        } else if (user.Cedula.length < 4 || user.Cedula.length > 12) {
            setError('La cédula debe estar entre 4 y 12')
            return false
        } else if (esNuevo && user.Nombre.length < 3) {
            setError('Mínimo 3 letras para el nombre')
            return false
        }
        return true
    }

    const Login = async () => {
        try {
            const login = await axios.get(`${usuarios}${user.Cedula}`)
            localStorage.setItem('user', JSON.stringify(login.data))
            setPuedePasar(true)
        } catch (error) {
            if (error.response.data.msg === 'No se encontró el usuario') {
                /* const register = await axios.post(registerUser, user)
                console.log(register)
                setPuedePasar() */
                setError('Regístrese')
                setEsNuevo(true)
            }
        }
    }
    if (puedePasar) {
        return (
            <>{children}</>
        )
    }
    return (
        <div className='login__container'>
            <form onSubmit={handleSubmit} className='login__form'>
                <input
                    className='cedula__input'
                    type='text'
                    name='Cedula'
                    onChange={handleChange}
                    placeholder='Cédula'
                    autoComplete='off'
                />
                {
                    esNuevo ?
                        <input
                            className='email__input'
                            type='text'
                            name='Nombre'
                            onChange={handleChange}
                            placeholder='Nombre'
                            autoComplete='off'
                        />
                        :
                        null
                }
                <button>{esNuevo ? 'Registrarse' : 'Ingresar'}</button>

                <div className='error__container'>
                    <br></br>
                    <h4>{error}</h4>
                </div>
            </form>
        </div>
    )
}
