import { getConnection, sql, queries } from '../database'



export const getUsuario = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllUsuarios)
        res.json(result.recordset);
    } catch (error) {
        error.status(500)
        res.send(error.message);
    }

};

export const getUsuariobyId = async (req, res) => {
    const { cedula } = req.params;

    const pool = await getConnection();
    const result = await pool.request().input("cedula", cedula).query(queries.getUsuariobyId);
    if(result.recordset.length === 0){
        res.status(404).json({msg: 'No se encontró el usuario'});
    }
    res.send(result.recordset[0])

};



export const createNewUsuario = async (req, res) => {

    const {Cedula, Nombre} = req.body;
    if (Cedula == null || Nombre == null) {
        return res.status(404).json({msg: 'Bad Request. Please Fill all fields'});
    }

    try {
        const pool = await getConnection();
        
        await pool.request()
        .input("Cedula", sql.Int, Cedula)
        .input("Nombre", sql.VarChar, Nombre)
        .query(queries.addNewUsuario)

        console.log(Cedula, Nombre);

        res.json({Cedula, Nombre});
    } catch (error) {
        error.status(500)
        res.send(error.message);
    }

};