import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function Tasks(props) {
//! STATE


//! COMPORTEMENTS


//! RENDER

return  (
        <li key={props.listTaches.id}> 
        <FontAwesomeIcon icon="square" className="icon"/> 
        {props.listTaches.nom} 
        
        <button className='btnDel' onClick={() => props.tacheASupprimer(props.listTaches.id)}>x</button>
        
        </li>
)
}