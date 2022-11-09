const express = require('express')
const server = express()
const mysql = require('mysql2')
const cors = require('cors');
const port = 3000
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Agenda'
});

server.use(express.json())
server.use(cors())

server.post('/cadastrarProfessores', (req, res) => {
    let erros = [];

    if (!req.body.Nome || typeof req.body.Nome === undefined || req.body.Nome === null) {
        erros.push({ text: 'Nome inválido' })
    }
    if (!req.body.Email || typeof req.body.Email === undefined || req.body.Email === null) {
        erros.push({ text: 'Email inválido' })
    }

    if (erros.length === 0) {
        let Name = `SELECT * FROM Professores WHERE Nome = '${req.body.Nome}'`;
        let EnderecoEmail = `SELECT * FROM Professores WHERE Email = '${req.body.Email}'`;
        db.query(EnderecoEmail, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Email já cadastrado' });


            } else {
                db.query(Name, async function (err, resultado, fields) {
                    if (resultado.length > 0) {
                        erros.push({ text: 'Professor já cadastrado' })
                    } else {
                        const { Nome } = req.body;
                        const { Email } = req.body;

                        let sql = 'INSERT INTO Professores(Nome, Email) VALUES(?,?)';
                        db.query(sql, [Nome, Email], (err, result) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(result)
                            }
                        })
                    }
                })
            }

        })
    }




})

server.get('/professores', (req, res) => {
    let sql = 'SELECT * FROM Professores';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/materias', (req, res) => {
    let sql = 'SELECT * FROM Materias';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/turmas', (req, res) => {
    let sql = 'SELECT * FROM Turmas';
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/horarios', (req,res)=>{
    let sql = 'SELECT * FROM Horarios';
    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

server.post('/cadastrarMateria', (req, res) => {

    let erros = [];

    if (!req.body.Materia || typeof req.body.Materia === undefined || req.body.Materia == null) {
        erros.push({ text: 'Matéria inválida' })
    }

    if (erros.length === 0) {
        let Subject = `SELECT * FROM Materias WHERE Materia = '${req.body.Materia}'`;
        db.query(Subject, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Matéria já cadastrada' })
            } else {
                const { Materia } = req.body;

                let sql = 'INSERT INTO Materias(Materia) VALUES (?)';
                db.query(sql, [Materia], (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                    }
                })
            }

        })
    }


})

server.post('/cadastrarTurmas', (req, res) => {

    let erros = [];

    if (!req.body.Turma || req.body.Turma === undefined || req.body.Turma === null) {
        erros.push({ text: 'Turma inválida' })
    }
    if (!req.body.Turno || req.body.Turno === undefined || req.body.Turno === null) {
        erros.push({ text: 'Turno inválido' })
    }

    if (erros.length === 0) {
        let Classroom = `SELECT * FROM Turmas WHERE Turma = '${req.body.Turma}'`;
        db.query(Classroom, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Turma já cadastrada' })
            } else {
                const { Turma } = req.body;
                const { Turno } = req.body;

                let sql = 'INSERT INTO Turmas(Turma, Turno) VALUES(?,?)';
                db.query(sql, [Turma, Turno], (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(result)
                    }
                })
            }
        })
    }
})

server.post('/agendar', (req, res)=>{
    let erros = [];

    if(!req.body.Professor || req.body.Professor === undefined || req.body.Professor === null){
        erros.push({text:'Professor inválido'})
    }
    if(!req.body.Materia || req.body.Materia === undefined || req.body.Materia === null){
        erros.push({text:'Matéria inválida'})
    }
    if(!req.body.Turma || req.body.Turma === undefined || req.body.Turma === null){
        erros.push({text:'Turma inválida'})
    }
    if(!req.body.Inicio || req.body.Inicio === undefined || req.body.Inicio === null){
        erros.push({text:'Data inválida'})
    }
    if(!req.body.Fim || req.body.Fim === undefined || req.body.Fim === null){
        erros.push({text:'Data inválida'})
    }

    if(erros.length === 0){
        const {Professor} = req.body;
        const {Materia} = req.body;
        const {Turma} = req.body;
        const {Inicio} = req.body;
        const {Fim} = req.body;

        let sql = 'INSERT INTO Horarios(Professor, Materia, Turma, Inicio, Fim) VALUES (?,?,?,?,?)';
        db.query(sql, [Professor, Materia, Turma, Inicio, Fim], (err, result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }



    
})

server.listen(port, () => console.log(`localhost:80`))
