import styled from 'styled-components';


export const PageArea = styled.div`
     form {
         background: #fff;
         border-radius: 3px;
         padding: 10px;
         box-shadow: 0px 0px 3px #999;

         .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
            
            .area--title{
                width: 200px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
                font-size: 14px;        
            }
            
            .area--input{
                flex: 1;
                input {
                    font-size: 14px;
                    padding: 5px;
                    border: 1px solid #DDD;
                    border-radius: 3px;
                    outline: none;
                    transition: all ease 0.4s;
                    &:focus {
                        border: 1px solid #333;
                        color: #333;
                    }
                }
                input[type='password'],
                input[type='email'] {
                    width: 100%;
                }

                button {
                    background-color: #0089FF;
                    color: #FFF;
                    border: none;
                    outline: none;
                    padding: 10px 20px;
                    border-radius: 3px;
                    font-size: 15px;
                    cursor: pointer;
                    
                    &:hover{
                        background-color: #006FCE;
                    }
                }
            }
         }
     }
`;