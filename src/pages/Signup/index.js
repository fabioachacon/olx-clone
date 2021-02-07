import React, { useState, useEffect } from 'react';
import useAPI from '../../helpers/api'
import { PageArea } from './styled';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {

    const api = useAPI();

    const [name, setName] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const getStates = async () => {
        const slist = await api.getStates();
        setStateList(slist);
      }
      getStates();
    }, [])

    const handlerSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);
      setError('');

      if (password !== confirmPassword){
        setError('Password does not match!');
        setDisabled(false);
        return;
      }

      const json = await api.register(name, email, password, stateLoc);

      if (json.error){
        setError(json.error)
      }else{
        doLogin(json.token);
        window.location.href = '/';
      }

      setDisabled(false);

    }

    const toggleOverHandler = () => {
      const hoverElement = document.querySelector('div.hover');
      hoverElement.classList.add('toggle');
    }
    
    const toggleLeaveHandler = () => {
       const hoverElement = document.querySelector('div.hover');
       hoverElement.classList.remove('toggle');
    }


    return (
        <PageContainer>
          <PageTitle>Signup</PageTitle>
          <PageArea>
              {error &&
                 <ErrorMessage>{error}</ErrorMessage>
              }
              <form onSubmit={handlerSubmit}>
                <label className="area" htmlFor="">
                   <div className="area--title">Nome Completo</div>
                   <div className="area--input">
                       <input 
                          type="text" 
                          disabled={disabled}
                          value={name}
                          required
                          onChange={e => setName(e.target.value)}
                        />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Estado</div>
                   <div className="area--input">
                       <select onChange={e => setStateLoc(e.target.value)} value={stateLoc} required name="" id="">
                          <option ></option>
                          {stateList.map((item, key) => (
                              <option key={key} value={item.id}>{item.name}</option>
                          ))}
                       </select>
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">E-mail</div>
                   <div className="area--input">
                       <input 
                          type="email" 
                          disabled={disabled}
                          value={email}
                          required
                          onChange={e => setEmail(e.target.value)}
                           />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Senha</div>
                   <div className="area--input">
                       <input 
                         type="password" 
                         disabled={disabled} 
                         value={password}
                         required
                         onChange={e => setPassword(e.target.value)}
                        />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Confirmar Senha</div>
                   <div className="area--input">
                       <input 
                         type="password" 
                         disabled={disabled} 
                         value={confirmPassword}
                         required
                         onChange={e => setConfirmPassword(e.target.value)}
                        />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title"></div>
                   <div className="area--input">
                       <button disabled={disabled} onMouseOver={toggleOverHandler} onMouseLeave={toggleLeaveHandler}>
                         Cadastrar
                         <div className="hover"></div>
                       </button>
                   </div>
                 </label>
              </form>
          </PageArea>
        </PageContainer>
    );
}

export default Page;
