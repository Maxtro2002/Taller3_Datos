export const queries = {
    getAllSillas: 'SELECT * FROM Silla',
    getAllUsuarios: 'SELECT * FROM Usuario',
    addNewUsuario: 'INSERT INTO Usuario (Cedula, Nombre) VALUES (@Cedula, @Nombre)',
    getSillabyId: 'SELECT * FROM Silla Where idSilla = @Id',
    getUsuariobyId: 'SELECT * FROM Usuario Where cedula = @Cedula',
    getAllReserva: 'SELECT * FROM Reserva',
    addNewReserva: 'INSERT INTO Reserva (idReserva, id_Silla, id_Cedula) VALUES (@idReserva, @id_Silla, @id_Cedula)', 
    updateSillabyId: 'UPDATE Silla SET Estado = @estado WHERE idSilla = @id',
}