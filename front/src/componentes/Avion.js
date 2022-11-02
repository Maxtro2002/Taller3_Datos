import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { reservas, sillas } from '../services/routes'
import silla from '../assets/silla.svg'


var numSillasSeleccionadas = 0
var valorEstaCompra = 0
var sillasSeleccionadas = []

export default function Avion() {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const [asientos, setAsientos] = useState([])
    const [ejecutivas, setEjecutivas] = useState([])
    const [economicas, setEconomicas] = useState([])
    const [error, setError] = useState([])
    const getAsientos = useCallback(async () => {
        try {
            const response = await axios.get(sillas)
            var asientos = []
            response.data.forEach(element => {
                if (element.Estado === false) {
                    element.reservada = false
                    asientos.push(element)
                } else {
                    element.reservada = true
                    asientos.push(element)
                }
            });
            setAsientos(asientos)
        } catch (error) {
            console.log(error)
        }
    }, [])
    useEffect(() => {
        setEjecutivas(asientos.filter((asiento) => asiento.Clase === 'Ejecutiva'))
        setEconomicas(asientos.filter((asiento) => asiento.Clase === 'Economica'))
    }, [asientos])
    useEffect(() => {
        getAsientos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleSelect = (tipoSilla, index) => {
        if (tipoSilla === 'Ejecutiva') {
            let sillas = [...ejecutivas]
            let silla = { ...sillas[index] }
            if (silla.reservada) {
                setError('Ya está reservada')
            } else {
                if (silla.Estado === true) {
                    silla.Estado = false
                    numSillasSeleccionadas -= 1
                    valorEstaCompra -= silla.Precio
                    let indexSilla = sillasSeleccionadas.indexOf(silla.idSilla)
                    sillasSeleccionadas.splice(indexSilla, 1)
                    sillas[index] = silla
                    setEjecutivas(sillas)
                } else {
                    if (numSillasSeleccionadas < 3) {
                        silla.Estado = true
                        numSillasSeleccionadas += 1
                        valorEstaCompra += silla.Precio
                        sillasSeleccionadas.push(silla.idSilla)

                        sillas[index] = silla
                        setEjecutivas(sillas)
                    } else {
                        setError(['No puede seleccionar más de 3 asientos por compra'])
                    }
                }
            }
        } else {
            let sillas = [...economicas]
            let silla = { ...sillas[index] }
            if (silla.reservada) {
                setError('Ya está reservada')
            } else {
                if (silla.Estado === true) {
                    silla.Estado = false
                    numSillasSeleccionadas -= 1
                    valorEstaCompra -= silla.Precio
                    let indexSilla = sillasSeleccionadas.indexOf(silla.idSilla)
                    sillasSeleccionadas.splice(indexSilla, 1)
                    sillas[index] = silla
                    setEconomicas(sillas)
                } else {
                    if (numSillasSeleccionadas < 3) {
                        silla.Estado = true
                        numSillasSeleccionadas += 1
                        valorEstaCompra += silla.Precio
                        sillasSeleccionadas.push(silla.idSilla)

                        sillas[index] = silla
                        setEconomicas(sillas)
                    } else {
                        setError(['No puede seleccionar más de 3 asientos por compra'])
                    }
                }
            }
        }
    }
    const handleReserva = () => {
        setError('')
        var venta = []
        if (numSillasSeleccionadas === 0) {
            setError('Debe seleccionar al menos 1 silla')
            return false
        } else {
            sillasSeleccionadas.forEach(element => {
                venta.push({
                    asiento: asientos.filter((asiento) => asiento.idSilla === element),
                    usuario: JSON.parse(localStorage.getItem('user')),
                })
            })
        }
        venta.forEach(async (venta) => {
            try {
                let usuario = JSON.parse(localStorage.getItem("user"))
                await axios.post(reservas, {
                    "idReserva": (Date.now() % 100000),
                    "idSilla": venta.asiento[0].idSilla,
                    "idCedula": usuario.Cedula
                })
                await axios.put(`${sillas}/${venta.asiento[0].idSilla}`, {
                    "estado": true
                })
            } catch (error) {
                console.log(error)
            }
        });
        setTimeout(() => {
            window.location.reload(false)
        }, 1500)
    }

    const logOut = () => {
        localStorage.removeItem('user')
        window.location.reload(false)
    }
    return (
        <div className='avionContenedor'>
            <div className='errorContenedor'>
                <center><h4>{error}</h4></center>
                <br></br>
            </div>
            <div className='asientosContenedor'>
                <div className='ejecutivas'>
                    {
                        ejecutivas.map((ejecutiva, index) => {
                            return (
                                <div className='asiento__contenedor' key={index}>
                                    {
                                        ejecutiva.Estado === false
                                            ?
                                            <img
                                                src={silla}
                                                alt="asiento"
                                                className='asiento green__filter'
                                                onClick={() => handleSelect('Ejecutiva', index)}
                                            />
                                            :
                                            <img
                                                src={silla}
                                                alt="asiento"
                                                className='asiento red__filter'
                                                onClick={() => handleSelect('Ejecutiva', index)}
                                            />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className='economicas'>
                    {
                        economicas.map((economica, index) => {
                            return (
                                <div className='asiento__contenedor' key={index}>
                                    {
                                        economica.Estado === false
                                            ?
                                            <img
                                                src={silla}
                                                alt="asiento"
                                                className='asiento green__filter'
                                                onClick={() => handleSelect('Economica', index)}
                                            />
                                            :
                                            <img
                                                src={silla}
                                                alt="asiento"
                                                className='asiento red__filter'
                                                onClick={() => handleSelect('Economica', index)}
                                            />
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='infoVenta'>
                <div>
                    <h4>Hola, {currentUser.Nombre}</h4>
                    <h4>Valor de la Compra: {valorEstaCompra}</h4>
                    <h4>Cantidad de Sillas: {numSillasSeleccionadas}</h4>
                    <button onClick={handleReserva}>Confirmar Compra</button>
                    <button onClick={logOut}>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    )
}
