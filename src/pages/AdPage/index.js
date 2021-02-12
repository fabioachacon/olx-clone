import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageArea, Fake } from './styled';
import useApi from '../../helpers/api';

import { PageContainer } from '../../components/MainComponents';

const Page = () => {
    const api = useApi();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState([]);

    useEffect(() => {
      const getAdInfo = async (id) => { 
        const json = await api.getAd(id, true);
        console.log('inside useffect', json);
        setAdInfo(json);
        setLoading(false);  
      }
      getAdInfo(id);
    }, [])

    return (
        <PageContainer>
          <PageArea>
            <div className="leftSide">
               <div className="box">
                  <div className="adImage">
                   {loading && <Fake height={300} />}  
                  </div>
                  <div className="ad-Info">
                      <div className="adName">
                        {loading && <Fake height={20} />}
                        {adInfo.title && 
                          <h2>{adInfo.title}</h2>
                        }
                      </div>
                      <div className="adDescription">
                        {loading && <Fake height={100} />}  
                      </div>
                  </div>
               </div>
            </div>
            <div className="rightSide">
               <div className="box box--padding">
                 {loading && <Fake height={20} />}  
               </div>
               <div className="box box--padding">
                 {loading && <Fake height={50} />}  
               </div>
            </div>
          </PageArea>
        </PageContainer>
    )
}

export default Page;