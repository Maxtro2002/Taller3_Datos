import { getConnection, sql, queries } from '../database'

export const getSillas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queries.getAllSillas)
        res.json(result.recordset);
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }

};



export const getSillabyId = async (req, res) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool.request().input("Id", id).query(queries.getSillabyId);

    res.send(result.recordset[0])

};

export const updateSillabyId = async (req, res) => {

    const { estado } = req.body;
    const { id } = req.params;

    if( estado == null){
        return res.status(400).json({msg: 'Bad Request. Please Fill all fields'});
    }

    try {
        const pool = await getConnection();
        await pool.request().input('estado', sql.Bit, estado).input('id', sql.Int, id).query(queries.updateSillabyId)

        const result = await pool.request().input("Id", id).query(queries.getSillabyId);
        res.json(result.recordset[0])

    } catch (error) {
        error.status(500)
        res.send(error.message);
        console.log(error.message);
    }
}
