import './App.css';
import { useState } from "react";
import Tasks from './Components/Tasks';
// Imports me permettant d'utiliser fontawesome dans mon projet
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSquareCheck,
  faSquare,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faSquareCheck, faSquare, faListCheck);
function App() {

  //! STATE (état, données) *・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*

  const [tasks, setTasks] = useState([]);
  const [writeTask, setWriteTask] = useState("");


  //! COMPORTEMENTS *・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*

  const handleDelete = (id) => { // lorsqu'une fonction (=handleDelete) est liée à un évènement (= onCLick), ce que je reçois en paramètre de la fonction c'est l'évènement CLICK
    console.log(id);
    // 1. copie du state
    const copyTasks = [...tasks];  //? Spread operators pour pourvoir manipuler un clone du tableau (fonctionne aussi avec slice() )
    // 2. manipuler mon state
    const tasksCopyUpdated = copyTasks.filter(task => task.id !== id) //? Filtrer le tab pour ne garder que les éléments qui n'ont pas été cliqué, donc ceux dont l'id est différent de celui reçu en paramètre

    //ou avec splice() :  const tasksCopyUpdated = copyTasks.splice(index,1) supprimer 1 élément à partir du début de coupe donné

    // 3. modifier mon state avec le setter
    setTasks(tasksCopyUpdated);
  }


  const handleSubmit = (event) => {  //? Fonction qui gère le 'onChange' de l'input
    event.preventDefault();
    console.log(event.target.value) // event.target.value correspond au contenu de mon input
    // 1. copie du state
    const tasksCopy = [...tasks];
    // 2. manipuler mon state
    const id = new Date().getTime(); //? pour rendre l'id unique à l'instant T de sa création
    tasksCopy.push({
      id: id,
      nom: writeTask,
      isDone: false,
    }); // pusher un nouvel objet qui a un id et un nom 
    // 3. modifier mon state avec le setter
    setTasks(tasksCopy);
    setWriteTask(""); //? vider l'input après la saisie
  }


  const handleAddTask = (event) => { // la fonction reçoit l'évent lors du changement de l'input (= quand on écrit dedans)
    console.log(event.target.value); // récup la valeur de l'input après le changement -> mon state reste le même
    const valueAfterChange = event.target.value; // je stocke la nouvelle valeur dans une variable
    setWriteTask(valueAfterChange);  // que je donne à mon state grâce au setter et ça update l'affichage
  };


  const handleCheck = (index) => {
    // 1. copie du state
    const copyTasks = [...tasks];
    // 2. manipuler mon state
    copyTasks[index].isDone = !copyTasks[index].isDone;
    // 3. modifier mon state avec le setter
    setTasks(copyTasks);
  };


  //! RENDER (affichage) *・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*・*:゜・*:.。. .。.:*・゜゜・**・゜゜・*:.。..。.:*
  return (
    <>
      <div className="App">
        <header><h1>To Do List
        </h1>
        </header>
        <body>


          <form action="submit" onSubmit={handleSubmit}>


            {/*//! méthode MAP() {/* boucler sur le tableau Tasks et retourner un autre...  */}
            {/*  ...tableau transformé par une fonction et afficher 1 à 1 des éléments <li> */}
            <ul>
              {tasks.map((task, index) => {
                {/* task fait référence à chacun des éléments du tableau taskS */ }
                return (<>

                  <div key={index}>
                    <li>
                      <input type="checkbox" key={task.id} checked={task.isDone} onChange={() => {
                        handleCheck(index);
                      }} /></li>
                    <li>
                      <span className={task.isDone ? 'isDone' : ""}>{task.nom} </span></li>

                    <li>
                      <Tasks listTaches={task} tacheASupprimer={handleDelete} />
                    </li></div>
                </>)
              })}

            </ul>

            <input
              // Le contenu de mon input est ce qu'il y a dans ce stateonClick={AddTask}
              value={writeTask}
              type="text"
              placeholder="ajouter un truc à faire"
              onChange={handleAddTask} // donne la possibilité à l'input de changer
            />
            <button >+ Ajouter une tâche</button>

          </form></body>
      </div >
    </>
  )
}

export default App;
