<div className='App' >
      <div id='containerMain'>
        <div id='header'>
          <h1>Agendamento</h1>
        </div>
        <div id='containerCadastros'>
        <div>
          {/* titulo do container */}
          <h1>Cadastros</h1>
          </div>
        </div>
        <div>
          {/* itens do container */}
        
        </div>

          <div className='titulos'>
          <div className='formulario'>
            <div className='titles'>
              <h2>Professores</h2>
            </div>
            <input type="text" name='Nome' id='Nome' placeholder='Nome' onChange={handleChangeValues} />
            <input type="text" name="Email" id="Email" placeholder='E-mail' onChange={handleChangeValues} />
            <button onClick={handleClickButton} className="buttonsCadastro">Cadastrar</button>
          </div>
          <div className='formulario'>
            <div className='titles'>
              <h2 >Matérias</h2>
            </div>
            <input type="text" name='Nome_Materia' id='materia' placeholder='Materia' onChange={handleChangeValues} />
            <button onClick={handleClickButtonMateria} className="buttonsCadastro">Cadastrar</button>
          </div>
          <div className='formulario'>
            <div className='titles'>
              <h2>Turmas</h2>
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
        </div>{/*ContainerCadastro*/}
          <div>
          


        <div>
          <h1>Agendar</h1>
          <div id='agendamento' className='agendamento'>
            <div>
              <div id='selects'>
                <h2 >Professor</h2>
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
                    <option value={materia.Id}>{materia.Nome_Materia}</option>
                  ))}
                </select>
                {/* <label htmlFor="">Turma</label> */}
                <h2>Turma</h2>
                <select name="Turma" id="" onChange={handleChangeValues}>
                  <option>Turma</option>
                  {turmas.map((turma) => (
                    <option value={turma.Id}>{turma.Nome_Turma}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <div id='containerDatas'>
                <div>
                  {/* <label label htmlFor="">Dia</label> */}
                  <h2>Dia</h2>
                </div>
                <div id='itensAgendar'>
                  <div className='dateInput'>
                    {/* <label htmlFor="">Início</label> */}
                    <h2>Início</h2>
                    <input type="date" name='Inicio' className='data' id='DateInicio' onChange={handleChangeValues} />
                  </div>
                  <div className='dateInput'>
                    {/* <label htmlFor="">Fim</label> */}
                    <h2>Fim</h2>
                    <input type="date" name='Fim' className='data' id='DateFim' onChange={handleChangeValues} />
                  </div>
                </div>
              </div>
            </div>
            <button id='btnAgendar' onClick={handleClickButtonAgendar}>Agendar</button>
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
      </div>{/*ContainerMain*/}
    </div>