import React, { useState, useEffect } from 'react';
import useAPI from '../../helpers/api'
import { PageArea } from './styled';
import { useLocation, useHistory } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = useAPI();
    const history = useHistory();
    let timer;

    const useQueryString = () => {
      return new URLSearchParams( useLocation().search );
    }

    const query = useQueryString();

    // States
    const [q, setQ] = useState( query.get('q') !== null ? query.get('q') : '' );
    const [cat, setCat] = useState( query.get('cat') !== null ? query.get('cat') : '' );
    const [state, setState] = useState( query.get('state') !== null ? query.get('state') : '' );

    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);
    
    const [resultOpacity, setResultOpacity] = useState(1);
    const [loading, setLoading] = useState(true);

    const getAdsList = async () => {
      setLoading(true)
      const json = await api.getAds({
        sort: 'desc',
        limit: 9,
        q,
        cat,
        state
      });
      setAdList(json.ads);
      setAdsTotal(json.total);
      setResultOpacity(1);
      setLoading(false);
    }

    useEffect(() => {
      const queryString = [];

      if (q) {
        queryString.push(`q=${q}`);
      }

      if (cat) {
        queryString.push(`cat=${cat}`);
      }

      if (state) {
        queryString.push(`state=${state}`);
      }

      history.replace({
        search: `?${queryString.join('&')}`,
      });

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(getAdsList, 2000);
      setResultOpacity(0.3);
    },[q, cat, state])

    // Fetch list of registred states
    useEffect(() => {
      const getStates = async () => {
        const slist = await api.getStates();
        setStateList(slist);
      }
      getStates();
    }, []);

    // Fetch Categories
    useEffect(() => {
      const getCategories = async () => {
        const cats = await api.getCategories();
        setCategories(cats);
      }
      getCategories()
    }, []);

    return (
      <PageContainer>
          <PageArea>
            <div className="leftSide">
               <form action="" method="GET">
                  <input 
                    type="text" 
                    name='q' 
                    placeholder='What are you searching?' 
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    />

                  <div className="filterName">Estado:</div>
                  <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                    <option value=""></option>
                    {stateList.map((i, k) => 
                      <option key={k} value={i.name}>{i.name}</option>
                    )}
                  </select>
                  <div className="filterName">Categoria:</div>
                  <ul>
                     {categories.map((i, k) => 
                        <li
                         onClick={() => setCat(i.slug)} 
                         key={k} 
                         className={cat === i.slug ? 'categoryItem active' : 'categoryItem'}>
                          <img src={i.img} alt=""/>
                          <span>{i.name}</span>
                        </li>
                     )}
                  </ul>
               </form>
            </div>
            <div className="rightSide">
              <h2>Resultados</h2>

              {loading &&
                <div className="listWarning">Carregando...</div>
              }

              {!loading && adList.length === 0  &&
                <div className="listWarning">Não encontrados Resultados</div>
              }
              
              <div className="list" style={{opacity: resultOpacity}}>
                {adList.map((i, k) => 
                  <AdItem key={k} data={i}/>
                )}
              </div>
            </div>
          </PageArea>
      </PageContainer>
    );
}

export default Page;
