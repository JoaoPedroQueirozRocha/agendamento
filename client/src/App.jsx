import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Axios from 'axios'


function App() {
  const baseUrl = "http://localhost:3000"

  const [values, setValues] = useState();
  const [professores, setProfessores] = useState([])
  const [materias, setMaterias] = useState([])
  const [turmas, setTurmas] = useState([])
  const [agendamentos, setAgendamentos] = useState([])

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }))
  }

  const handleClickButton = () => {
    Axios.post(`${baseUrl}/cadastrarProfessores`, {
      Nome: values.Nome,
      Email: values.Email,
    }).then((response) => {
      console.log(response)
    })
  }

  const handleClickButtonMateria = () => {
    Axios.post(`${baseUrl}/cadastrarMateria`, {
      Materia: values.Materia
    }).then((response) => {
      console.log(response)
    })
  }

  const handleClickButtonTurmas = () => {
    Axios.post(`${baseUrl}/cadastrarTurmas`, {
      Turma: values.Turma,
      Turno: values.Turno
    }).then((response) => {
      console.log(response)
    })
  }

  const handleClickButtonAgendar = () => {
    Axios.post(`${baseUrl}/agendar`, {
      Professor: values.Professor,
      Materia: values.Materia,
      Turma: values.Turma,
      Inicio: values.Inicio,
      Fim: values.Fim
    }).then((response) => {
      console.log(response)
    })
  }

  useEffect(() => {
    Axios.get(`${baseUrl}/professores`)
      .then((response) => {
        setProfessores(response.data)
      })
    Axios.get(`${baseUrl}/materias`)
      .then((response) => {
        setMaterias(response.data)
      })
    Axios.get(`${baseUrl}/turmas`)
      .then((response) => {
        setTurmas(response.data)
      })
    Axios.get(`${baseUrl}/horarios`)
      .then((response) => {
        setAgendamentos(response.data)
      })
  })

  const exibir = () => {
    console.log(professores)
    console.log(materias)
    console.log(turmas)
    console.log(agendamentos)
  }

  const exibirOcultar = () => {
    let agendamentos = document.getElementById('agendamento')
    if (agendamentos.style = "display:none") {
      agendamentos.style = 'display:flex;'
    }else if(agendamentos.style = 'display:flex;'){
      agendamentos.style = 'display:none;'
    }
  }

  let turnoPlaceholder = "Turno"
  return (
    <div className='App' >
      <div id='containerMain'>
        <div>
          <h1>Cadastros</h1>
        </div>
        <div id='containerCadastros'>
          <div className='formulario'>

            <h2>Professores</h2>
            <input type="text" name='Nome' id='Nome' placeholder='Nome' onChange={handleChangeValues} />
            <input type="text" name="Email" id="Email" placeholder='E-mail' onChange={handleChangeValues} />
            <button onClick={handleClickButton}>Cadastrar</button>

          </div>
          <div className='formulario'>
            <h2>Matérias</h2>
            <input type="text" name='Materia' id='materia' placeholder='Materia' onChange={handleChangeValues} />
            <button onClick={handleClickButtonMateria}>Cadastrar</button>
          </div>
          <div className='formulario'>
            <h2>Turmas</h2>
            <input type="text" name='Turma' id='turma' placeholder='Turma' onChange={handleChangeValues} />
            <select name="Turno" id="turnos" onChange={handleChangeValues}>
              <option value="" defaultValue={turnoPlaceholder}>Turno</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
            <button onClick={handleClickButtonTurmas}>Cadastrar</button>
          </div>
        </div>{/*ContainerCadastro*/}
        <div>
              <h1>Agendar</h1>
              <button onClick={exibirOcultar}>Agendar</button>
          <div id='agendamento' className='agendamento'>
            <div id='tituloAgendamento'>
              <button onClick={exibir}>exibir</button>
            </div>
            <div id='selects'>
              {/* <label htmlFor="">Professor</label> */}
              <h2>Professor</h2>
              <select name="Professor" id="" onChange={handleChangeValues}>
                <option value="">Professor</option>
                {professores.map((professor) => (
                  <option value={professor.Id}>{professor.Nome}</option>
                ))}
              </select>
              {/* <label htmlFor="">Materia</label> */}
              <h2>Matéria</h2>
              <select name="Materia" id="" onChange={handleChangeValues}>
                <option>Matéria</option>
                {materias.map((materia) => (
                  <option value={materia.Id}>{materia.Materia}</option>
                ))}
              </select>
              {/* <label htmlFor="">Turma</label> */}
              <h2>Turma</h2>
              <select name="Turma" id="" onChange={handleChangeValues}>
                <option >Turma</option>
                {turmas.map((turma) => (
                  <option value={turma.Id}>{turma.Turma}</option>
                ))}
              </select>
            </div>
            <div id='containerDatas'>
                <div>
                  {/* <label label htmlFor="">Dia</label> */}
                  <h2>Dia</h2>
                </div>
                <div id='itensAgendar'>
                  <div className='dateInput'>
                    {/* <label htmlFor="">Início</label> */}
                    <h2>Início</h2>
                    <input type="date" name='Inicio' className='data' onChange={handleChangeValues} />
                  </div>
                  <div className='dateInput'>
                    {/* <label htmlFor="">Fim</label> */}
                    <h2>Fim</h2>
                    <input type="date" name='Fim' className='data' onChange={handleChangeValues} />
                  </div>
                </div>
              </div>
              <button id='btnAgendar' onClick={handleClickButtonAgendar}>Agendar</button>
          </div>
        </div>
      </div>{/*ContainerMain*/}
    </div>
  )
}

export default App
