import { getConnection, sql, queries } from '../database'



export const getReserva = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllReserva)
        res.json(result.recordset);
    } catch (error) {
        error.status(500)
        res.send(error.message);
    }

};



export const createNewReserva = async (req, res) => {

    const {idReserva, idSilla, idCedula} = req.body;
    
    if (idReserva == null || idSilla == null || idCedula == null) {
        return res.status(404).json({msg: 'Bad Request. Please Fill all fields'});
    }

    try {
        const pool = await getConnection();
        
        await pool.request()
        .input("idReserva", sql.Int, idReserva)
        .input("id_Silla", sql.Int, idSilla)
        .input("id_Cedula", sql.Int, idCedula)
        .query(queries.addNewReserva)

        console.log(idReserva, idSilla, idCedula);

        res.json({idReserva, idSilla, idCedula});
    } catch (error) {
        error.status(500)
        res.send(error.message);
    }

};