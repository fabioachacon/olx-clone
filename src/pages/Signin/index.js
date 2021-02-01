import React, { useState } from 'react';
import useAPI from '../../helpers/api'
import { PageArea } from './styled';
import { doLogin } from '../../helpers/AuthHandler';

import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {

    const api = useAPI();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const handlerSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);

      const json = await api.login(email, password);

      if (json.error){
        setError(json.error)
      }else{
        doLogin(json.token, rememberPassword);
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
          <PageTitle>Login</PageTitle>
          <PageArea>
              {error &&
                 <ErrorMessage>{error}</ErrorMessage>
              }
              <form onSubmit={handlerSubmit}>
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
                   <div className="area--title">Lembrar Senha</div>
                   <div className="area--input">
                       <input 
                         type="checkbox" 
                         disabled={disabled}
                         checked={rememberPassword}
                         onChange={e => setRememberPassword(!rememberPassword)}
                          />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title"></div>
                   <div className="area--input">
                       <button disabled={disabled} onMouseOver={toggleOverHandler} onMouseLeave={toggleLeaveHandler}>
                         Fazer Login
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
