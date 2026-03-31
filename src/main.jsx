import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { insertCoin } from 'playroomkit';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)

// const root = createRoot(document.getElementById("root"));

// insertCoin({
//   // gameId: "d8iBEGkR64p3088q5ZDH"
// }).then(() => {
//   root.render(
//     // <StrictMode>
//       <App />
//     // </StrictMode>
//   );
// }); 
