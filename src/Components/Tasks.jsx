import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Tasks(props) {
//! STATE


//! COMPORTEMENTS


//! RENDER

return  (
        <li key={props.listTaches.id}> 
     
     
        
        <button className='btnDel' onClick={() => props.tacheASupprimer(props.listTaches.id)}>x</button>
        
        </li>
)
}