import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useAPI from '../../helpers/api';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { PageArea } from './styled';


import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

const Page = () => {
    const api = useAPI();
    const fileField = useRef();
    const history = useHistory();

    // List of Categories
    const [categories, setCategories] = useState([]);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(''); // Selected Category
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotible] = useState(false);
    const [desc, setDesc] = useState('');
    
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
          const cats = await api.getCategories();
          setCategories(cats);
        }
        getCategories();
    }, [])

    const handlerSubmit = async (e) => {
      e.preventDefault();
      setDisabled(true);
      setError('');

      let erros = [];

      if (!title.trim()) {
        erros.push('No title');
      }

      if (!category) {
        erros.push('No category');
      }

      if (erros.length === 0) {
          const fData = new FormData();
          fData.append('title', title);
          fData.append('price', price);
          fData.append('priceneg', priceNegotiable);
          fData.append('desc', desc);
          fData.append('cat', category);

          if (fileField.current.files.length > 0) {
            for (let i = 0; i < fileField.current.files.length; i++) {
                fData.append('img', fileField.current.files[i]);
            }
          }

          const json = await api.addAd(fData);

          if (!json.data) {
              history.push(`/ad/${json.id}`);
              return;
          } else {
            setError(json.error);
          }


      } else {
        setError(erros.join('\n'));
      }

      setDisabled(false);

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

    const priceMask = createNumberMask({
      prefix: 'R$ ',
      includeThousandsSeparator: true,
      thousandsSeparatorSymbol: '.',
      allowDecimalTrue: true,
      decimalSymbol: ',',

    });

    return (
        <PageContainer>
          <PageTitle>Post an Ad</PageTitle>
          <PageArea>
              {error &&
                 <ErrorMessage>{error}</ErrorMessage>
              }
              <form onSubmit={handlerSubmit}>
                 <label className="area" htmlFor="">
                   <div className="area--title">Título</div>
                   <div className="area--input">
                       <input 
                          type="text" 
                          disabled={disabled}
                          value={title}
                          required
                          onChange={e => setTitle(e.target.value)}
                           />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Categoria</div>
                   <div className="area--input">
                      <select
                       disabled={disabled}
                       onChange={e=>setCategory(e.target.value)}
                       required
                      >
                        <option></option>
                        {categories && categories.map((i, k) => 
                          <option key={i._id} valeu={i._id}>{i.name}</option>
                        )}
                      </select>
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Preço</div>
                   <div className="area--input">
                      <MaskedInput 
                        mask={priceMask}
                        placeholder='R$ '
                        disabled={disabled || priceNegotiable}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Preço Negociável</div>
                   <div className="area--input">
                      <input type="checkbox"
                        disabled={disabled}
                        checked={priceNegotiable}
                        onChange={e =>  setPriceNegotible(!priceNegotiable)}
                      />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Descrição</div>
                   <div className="area--input">
                      <textarea 
                       disabled={disabled}
                       value={desc}
                       onChange={e=>setDesc(e.target.value)}>
                      </textarea>
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title">Images (1 ou mais)</div>
                   <div className="area--input">
                      <input type="file"
                        disabled={disabled}
                        ref={fileField}
                        multiple
                      />
                   </div>
                 </label>
                 <label className="area" htmlFor="">
                   <div className="area--title"></div>
                   <div className="area--input">
                       <button disabled={disabled} onMouseOver={toggleOverHandler} onMouseLeave={toggleLeaveHandler}>
                         Adicionar Anúncio
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
