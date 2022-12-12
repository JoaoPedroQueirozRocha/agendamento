import { useEffect, useState } from 'react'
import './App.css'
import Axios from 'axios'


function App() {
  const baseUrl = "http://localhost:3000"

  const [values, setValues] = useState();
  let [professores, setProfessores] = useState([])
  let [materias, setMaterias] = useState([])
  let [turmas, setTurmas] = useState([])
  let [agendamentos, setAgendamentos] = useState([])

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value
    }))
  }

  const handleClickButton = () => {
    Axios.post(`${baseUrl}/cadastro/professor`, {
      Nome: values.Nome,
      Email: values.Email,
    }).then((response) => {
      console.log(response)
    })

  }

  const handleClickButtonMateria = () => {
    Axios.post(`${baseUrl}/cadastro/materia`, {
      Nome_Materia: values.Nome_Materia
    }).then((response) => {
      console.log(response)
    })
    alert("Enviado")
  }

  const handleClickButtonTurmas = () => {
    Axios.post(`${baseUrl}/cadastro/turma`, {
      Nome_Turma: values.Nome_Turma,
      Turno: values.Turno
    }).then((response) => {
      console.log(response)
    })
    alert("Enviado")
  }

  const handleClickButtonAgendar = () => {
    Axios.post(`${baseUrl}/agendar`, {

      Inicio: values.Inicio,
      Fim: values.Fim,
      Professor: values.Professor,
      Materia: values.Materia,
      Turma: values.Turma
    }).then((response) => {
      console.log(response)
    })
    console.log(values)
  }



  useEffect(() => {
    Axios.get(`${baseUrl}/professores`)
      .then((response) => {
        setProfessores(professores = response.data)
      })
    Axios.get(`${baseUrl}/materias`)
      .then((response) => {
        setMaterias(materias = response.data)
      })
    Axios.get(`${baseUrl}/turmas`)
      .then((response) => {
        // console.log(response.data)
        setTurmas(turmas = response.data)
      })
    Axios.get(`${baseUrl}/horarios`)
      .then((response) => {
        // console.log(response.data)
        setAgendamentos(response.data)
      })
  })

  const exibir = () => {
    // console.log(professores)
    // console.log(materias)
    // console.log(turmas)
    console.log(agendamentos)
    // console.log(removeTime())
    // removeTime()
    // console.log(horarios)
    console.log(agendamentos)


  }


  let turnoPlaceholder = "Turno"
  return (
    <div>
      <header>
        <h1>Agendamento</h1>
      </header>
      <div id='containerMains'>
        <div id='titleHeader'>
          <h1>Cadastros</h1>
        </div>
        <div id='cadastrosMain'>
          <div className='cadastros'>
            <div>
              <h2 className='titleForms'>Professor</h2>
            </div>
            <input type="text" name='Nome' id='Nome' placeholder='Nome' onChange={handleChangeValues} />
            <input type="text" name="Email" id="Email" placeholder='E-mail' onChange={handleChangeValues} />
            <button onClick={handleClickButton} className="buttonsCadastro">Cadastrar</button>
          </div>
          <div className='cadastros'>
            <div>
              <h2 className='titleForms'>Matéria</h2>
            </div>
            <input type="text" name='Nome_Materia' id='materia' placeholder='Materia' onChange={handleChangeValues} />
            <button onClick={handleClickButtonMateria} className="buttonsCadastro">Cadastrar</button>
          </div>
          <div className='cadastros'>
            <div>
              <h2 className='titleForms'>Turma</h2>
            </div>
            <input type="text" name='Nome_Turma' id='turma' placeholder='Turma' onChange={handleChangeValues} />
            <select name="Turno" id="turnos" onChange={handleChangeValues}>
              <option value="" defaultValue={turnoPlaceholder}>Turno</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
            <button onClick={handleClickButtonTurmas} className="buttonsCadastro">Cadastrar</button>
          </div>
        </div>


        <div className='containerAgentamentos'>
          <div id='titleHeader'>
            <h1>Agendar aula</h1>
          </div>
          <div id='agendamentosMain'>
            {/* Inicioda div */}
            <div id='dadosAgendamento'>
              <div>
                <div>
                  <div>
                    <h2 className='titleForms'>Professor</h2>
                    <select name="Professor" id="" onChange={handleChangeValues}>
                      <option value="">Professor</option>
                      {professores.map((professor) => (
                        <option value={professor.Id}>{professor.Nome}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2 className='titleForms'>Matéria</h2>
                    <select name="Materia" id="" onChange={handleChangeValues}>
                      <option>Matéria</option>
                      {materias.map((materia) => (
                        <option value={materia.Id}>{materia.Nome_Materia}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <h2 className='titleForms'>Turma</h2>
                    <select name="Turma" id="" onChange={handleChangeValues}>
                      <option>Turma</option>
                      {turmas.map((turma) => (
                        <option value={turma.Id}>{turma.Nome_Turma}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* final da div */}

              <div id='divDatas'>
                <div>
                  <div>
                    <h2 className='titleForms'>Início das aulas</h2>
                    <input type="date" name='Inicio' className='data' id='DateInicio' onChange={handleChangeValues} />
                  </div>
                  <div>
                    <h2 className='titleForms'>Fim das aulas</h2>
                    <input type="date" name='Fim' className='data' id='DateFim' onChange={handleChangeValues} />
                  </div>
                </div>
              </div>
            </div>
            {/* div dos dados */}
            <div>
              <div>
                <button>Agendar</button>
              </div>
            </div>
          </div>




        </div>{/*containerAgendamentos*/}
        <div className='exibir'>
          <table>
            <tbody>
              <tr id='legenda'>
                <th>Professor</th>
                <th>Matéria</th>
                <th>Turma</th>
                <th>Data início</th>
                <th>Data fim</th>
              </tr>
              {agendamentos.map((horario) => (
                <tr>
                  <td>{horario.Nome}</td>
                  <td>{horario.Nome_Materia}</td>
                  <td>{horario.Nome_Turma}</td>
                  <td>{horario.Inicio.slice(0, 10)}</td>
                  <td>{horario.Fim.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
