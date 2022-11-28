const express = require('express')
const server = express()
const mysql = require('mysql2')
const cors = require('cors');
const port = 3000
const alert = require('react-alert')
const alert_template = require('react-alert-template-basic')
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Agenda'
});

server.use(express.json())
server.use(cors())


server.post('/cadastro/professor', (req, res) => {
    let erros = [];

    if (!req.body.Nome || typeof req.body.Nome === undefined || req.body.Nome === null) {
        erros.push({ text: 'Nome inválido' })
    }
    if (!req.body.Email || typeof req.body.Email === undefined || req.body.Email === null) {
        erros.push({ text: 'Email inválido' })
    }

    if (erros.length === 0) {
        let getProfNome = `SELECT * FROM Professores WHERE Nome = '${req.body.Nome}'`;
        let getProfEmail = `SELECT * FROM Professores WHERE Email = '${req.body.Email}'`;
        db.query(getProfEmail, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Email já cadastrado' });
                alert.show('teste')
            } else {
                db.query(getProfNome, async function (err, resultado, fields) {
                    if (resultado.length > 0) {
                        erros.push({ text: 'Professor já cadastrado' })
                    } else {
                        const { Nome } = req.body;
                        const { Email } = req.body;

                        let insertProf = 'INSERT INTO Professores(Nome, Email) VALUES(?,?)';
                        db.query(insertProf, [Nome, Email], (err, result) => {
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

server.post('/cadastro/materia', (req, res) => {

    let erros = [];

    if (!req.body.Nome_Materia || typeof req.body.Nome_Materia === undefined || req.body.Nome_Materia == null) {
        erros.push({ text: 'Matéria inválida' })
    }

    if (erros.length === 0) {
        let getMateria = `SELECT * FROM Materias WHERE Nome_Materia = '${req.body.Nome_Materia}'`;
        db.query(getMateria, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Matéria já cadastrada' })
            } else {
                const { Nome_Materia } = req.body;

                let insertMateria = 'INSERT INTO Materias(Nome_Materia) VALUES (?)';
                db.query(insertMateria, [Nome_Materia], (err, result) => {
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

server.post('/cadastro/turma', (req, res) => {

    let erros = [];

    if (!req.body.Nome_Turma || req.body.Nome_Turma === undefined || req.body.Nome_Turma === null) {
        erros.push({ text: 'Turma inválida' })
    }
    if (!req.body.Turno || req.body.Turno === undefined || req.body.Turno === null) {
        erros.push({ text: 'Turno inválido' })
    }


    if (erros.length === 0) {
        let getTurma = `SELECT * FROM Turmas WHERE Nome_Turma = '${req.body.Nome_Turma}'`;
        db.query(getTurma, async function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if (result.length > 0) {
                erros.push({ text: 'Turma já cadastrada' })
            } else {
                const { Nome_Turma } = req.body;
                const { Turno } = req.body;

                let insertTurma = 'INSERT INTO Turmas(Nome_Turma, Turno) VALUES(?,?)';
                db.query(insertTurma, [Nome_Turma, Turno], (err, result) => {
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
        console.log(Professor)

        let insertHorarios = 'INSERT INTO Horarios(Inicio, Fim, Professor, Materia, Turma) VALUES (?,?,?,?,?)';
        db.query(insertHorarios, [Inicio, Fim, Professor, Materia, Turma], (err, result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }    
})

server.get('/professores', (req, res) => {

    let getProf = 'SELECT * FROM Professores';
    db.query(getProf, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/materias', (req, res) => {

    let getMaterias = 'SELECT * FROM Materias';
    db.query(getMaterias, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/turmas', (req, res) => {

    let getTurmas = 'SELECT * FROM Turmas';
    db.query(getTurmas, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

server.get('/horarios', (req,res)=>{
    
    let getHorarios = 'select Horarios.Id,Inicio,Fim, Professores.Nome, Materias.Nome_Materia, Turmas.Nome_Turma from Horarios inner join Professores on Horarios.Professor = Professores.Id inner join Materias on Horarios.Materia = Materias.Id inner join Turmas on Horarios.Turma = Turmas.Id';
    db.query(getHorarios, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            // console.log(result)
            res.send(result)
        }
    })
})

server.listen(port, () => console.log(`server running in ${port}`))
