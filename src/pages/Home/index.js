import React, { useState, useEffect } from 'react';
import useAPI from '../../helpers/api'
import { PageArea, SearchArea } from './styled';
import { Link } from 'react-router-dom';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';
const Page = () => {

    const api = useAPI();

    // States
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

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

    //Fetch Recent Ads
    useEffect(() => {
      const getRecentAds = async () => {
        const json = await api.getAds({
          sort: 'desc',
          limit: 3,

        });
        setAdList(json.ads);
      }
      getRecentAds();
    }, []);

    return (
      <React.Fragment>
         <SearchArea>
           <PageContainer>
              <div className="searchBox">
                <form method="GET" action="/ads">
                  <input type="text" name='q' placeholder='search'/>
                  <select name="state">
                    {stateList.map((item, key) => 
                       <option key={key} value={item.name}>{item.name}</option>
                     )}
                  </select>
                  <button>Pesquisar</button>
                </form>
              </div>
              <div className="categoryList">
                {categories.map((item, key) =>
                  <Link key={key} to={`/ads?cat=${item.slug}`} className='categoryItem'>
                     <img src={item.img} alt=""/>
                     <span>{item.name}</span>
                  </Link>
                )}
              </div>
           </PageContainer>
         </SearchArea>
         <PageContainer>
          <PageArea>
             <h2>Recent Ads</h2>
             <div className="list">
               {adList.map((item, key) => 
                 <AdItem key={key} data={item} />
               )}
             </div>
             <Link to='/ads' className='seeAllLink'>See All</Link>
             <hr/>
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, iure sit! Eos libero sint, inventore soluta omnis accusantium? Placeat animi voluptates pariatur atque fuga eveniet architecto cumque voluptatem, tempora autem.
          </PageArea>
        </PageContainer>
      </React.Fragment>
    );
}

export default Page;
