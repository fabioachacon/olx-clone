import styled from 'styled-components';

export const HeaderArea = styled.div`
   height: 60px;
   border-bottom: 1px solid #CCC;
   
   .container{
      max-width: 1000px;
      display: flex;
      margin: auto;
      height: 100%;
   }
   
   a{
      text-decoration: none;
   }

   .logo{
      flex: 1;
      display: flex;
      align-items: center;
      .logo-1,
      .logo-2,
      .logo-3{
         font-size: 27px;
         font-weight: bold;
         
      }
      .logo-1 { color: #FF0000; }
      .logo-2 { color: #00FF00; }
      .logo-3 { color: #0000FF; }
   }

   nav {
      padding-top: 10px;
      padding-bottom: 10px;
      ul, li{
         margin: 0;
         padding: 0;
         list-style: none;
      }

      ul {
         display: flex;
         align-items: center;
         height: 40px;
      }
      li{
        margin-left: 20px;
        margin-right: 20px;
        
        a, button {
           color: #000;
           font-size: 14px;
           border: 0;
           background: none;
           cursor: pointer;
           outline: none;
           &:hover{
              color: #999;
           }

         &.button{
            background-color: #FF8100;
            border-radius: 3px;
            color: #FFF;
            padding: 10px;
         }
         &.button:hover{
            background-color: #E57706;

         }
        }
      }
   }

   @media screen and (max-width: 600px) {
     & {
        height: auto;
     }

      .container {
         flex-direction: column;
      }

      .logo {
         justify-content: center;
         margin: 10px 0;
      }

      nav ul {
         flex-direction: column;
      }

      nav li {
         margin: 2px 10px;
      }


   }
`;