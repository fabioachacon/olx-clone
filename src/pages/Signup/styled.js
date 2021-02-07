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
                input[type='email'],
                input[type='text'] {
                    width: 100%;
                }

                button {
                    background-color: #7B7CF3;
                    color: #FFF;
                    border: none;
                    outline: none;
                    padding: 10px 20px;
                    border-radius: 6px;
                    font-size: 15px;
                    cursor: pointer;
                    position: relative;
                    .hover{
                        position: absolute;
                        display: block;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        right: 0;
                        background: #9ab3e0;
                        transform: scaleX(0);
                        opacity: 0.3;
                        transform-origin: right;
                        transition: transform 0.35s ease-in-out;
                        will-change: transform;
                    }
                    .toggle{
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                   
                }
            }
         }
     }
`;