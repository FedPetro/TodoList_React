import { useState } from "react"; // Importa il modulo 'useState' da React per gestire lo stato nel componente

export default function Todolist() {
  const [tasks, setTasks] = useState([]); // Stato per la lista dei task, inizialmente un array vuoto
  const [newTask, setNewTask] = useState(""); // Stato per il task che l'utente sta scrivendo nel campo input

  // Funzione per aggiornare lo stato 'newTask' quando cambia l'input dell'utente
  function handleInputChange(event) {
    setNewTask(event.target.value); // Imposta 'newTask' con il valore corrente dell'input
  }

  // Funzione per aggiungere il task quando l'utente preme il tasto "Enter"
  function handleKeyDown(event) {
    if (event.key === "Enter") { // Controlla se il tasto premuto è "Enter"
      addTask(); // Chiama la funzione che aggiunge il task
    }
  }

  // Funzione per aggiungere un nuovo task alla lista
  function addTask() {
    if (newTask.trim() !== "") { // Controlla se il campo 'newTask' non è vuoto o solo spazi
      setTasks((t) => [...t, { text: newTask, completed: false }]); // Aggiunge un nuovo oggetto task (con testo e stato 'completed' a false)
      setNewTask(""); // Ripulisce l'input dopo aver aggiunto il task
    }
  }

  // Funzione per rimuovere un task dalla lista
  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, indexElement) => indexElement !== index); // Filtra la lista dei task escludendo quello con l'indice specificato
    setTasks(updatedTasks); // Aggiorna lo stato con la nuova lista di task
  }

  // Funzione per spostare un task verso l'alto nella lista
  function TaskUp(index) {
    if (index > 0) { // Controlla se il task non è già in prima posizione
      const updatedTasks = [...tasks]; // Crea una copia dell'array dei task
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]]; // Scambia la posizione del task corrente con quello sopra
      setTasks(updatedTasks); // Aggiorna lo stato con la lista dei task scambiata
    }
  }

  // Funzione per spostare un task verso il basso nella lista
  function TaskDown(index) {
    if (index < tasks.length - 1) { // Controlla se il task non è già in ultima posizione
      const updatedTasks = [...tasks]; // Crea una copia dell'array dei task
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]]; // Scambia la posizione del task corrente con quello sotto
      setTasks(updatedTasks); // Aggiorna lo stato con la lista dei task scambiata
    }
  }

  // Funzione per segnare o deselezionare un task come completato e spostarlo in fondo alla lista
  function TaskCompleted(index) {
    const updatedTasks = [...tasks]; // Crea una copia dell'array dei task
    updatedTasks[index].completed = !updatedTasks[index].completed; // Inverte lo stato 'completed' del task specificato

    // Se il task è completato, lo sposta in fondo alla lista
    const taskBottom = updatedTasks.splice(index, 1)[0]; // Rimuove il task dall'array
    setTasks((prevTasks) => [...updatedTasks, taskBottom]); // Aggiunge il task in fondo alla lista
  }

  return (
    <>
      <div className="w-full">
        <h1 className="font-display font-extrabold text-3xl m-10 text-third">To do List</h1> {/* Titolo della pagina */}

        <div className="input w-full justify-around grid grid-cols-10">
          {/* Campo di input per scrivere un nuovo task */}
          <input
            type="text"
            placeholder="Cosa devi fare oggi?"
            value={newTask} // Imposta il valore del campo con lo stato 'newTask'
            onChange={handleInputChange} // Chiama la funzione 'handleInputChange' quando l'input cambia
            onKeyDown={handleKeyDown} // Chiama 'handleKeyDown' quando l'utente preme un tasto (per verificare se è "Enter")
            className="border rounded-lg flex justify-center md:h-10 px-4 py-4 focus:outline-none focus:border-third focus:ring-1 focus:ring-third md:col-span-8 col-span-7 font-display" // Stile del campo input
          />
          <span className="col-span-1"></span> {/* Spaziatura tra l'input e il bottone */}

          {/* Bottone per aggiungere un nuovo task */}
          <button
            className="border rounded-lg flex justify-center items-center md:h-10 px-4 py-4 focus:outline-none active:border-third active:border-2 md:col-span-1 col-span-2 bg-primary"
            onClick={addTask} // Aggiunge il task quando viene cliccato
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-third ">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="h2-tasks">
          <h2 className="font-display font-bold text-xl mt-10 w-full flex justify-start text-third">I tuoi task di oggi:</h2>
        </div>

        {/* Lista dei task */}
        <div className="tasks-box mt-3">
          {tasks.map((task, index) => ( // Mappa ogni task nell'array e crea un elemento div per ciascuno
            <div className={`grid grid-cols-10 task px-2 bg-third rounded-md mb-3 border-primary border-2 ${task.completed ? "bg-white border-2 border-third" : ""}`} key={index}>
              
              {/* Marca il task come completato al click */}
              <button className="" onClick={() => TaskCompleted(index)}> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-green-500">
                  {task.completed ? (
                    /* SVG del pollice */
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  ) :  /* altrimenti */      
                  (
                    /* SVG del check */
                    <path
                      fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd"
                    />
                  )}
                </svg>
              </button>

              {/* Testo del task, barrato se completato */}
              <p className={`h-16 flex items-center justify-center col-span-6 text-xl font-display font-bold text-primary ${task.completed ? "text-third line-through" : ""}`}> {/* Applica la classe CSS "line-through" se il task è completato */}
                {task.text} {/* Visualizza il testo del task */}
              </p>

              {/* Bottone per eliminare il task */}
              <button className="" onClick={() => deleteTask(index)}> {/* Elimina il task al click */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-red-500">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Visualizza i bottoni per spostare il task solo se il task non è completato */}
              {!task.completed && (
                <>
                  {/* Bottone per spostare il task verso l'alto */}
                  <button onClick={() => TaskUp(index)}> {/* Sposta il task verso l'alto */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-primary">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Bottone per spostare il task verso il basso */}
                  <button onClick={() => TaskDown(index)}> {/* Sposta il task verso il basso */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-primary">
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72v-5.69a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
