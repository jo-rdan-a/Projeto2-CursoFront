// Componente responsável por exibir a lista de tarefas
function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  // Renderização Condicional: Se o array de tarefas estiver vazio, exibe uma mensagem
  if (tasks.length === 0) {
    return <p className="empty-message">Nenhuma tarefa encontrada.</p>;
  }

  return (
    <ul className="tasks-list">
      {/* 
        Iteração de Listas com .map():
        Percorre cada objeto do array 'tasks' e transforma em uma tag <li> do HTML.
      */}
      {tasks.map((task) => (
        /* 
          O React exige uma chave única (task.id) para rastrear modificações na lista de forma eficiente.
        */
        <li key={task.id} className="task-item">
          <button
            /* Usa uma arrow function para garantir que a função só execute após o clique, passando o ID */
            onClick={() => onTaskClick(task.id)}
            /* Template String com operador ternário para aplicar a classe 'completed' condicionalmente */
            className={`task-button ${task.isCompleted ? "completed" : ""}`}
          >
            <div className="task-info">
              <strong>{task.isCompleted ? "OK " : ""}{task.title}</strong>
              
              {task.description && <small>{task.description}</small>}
            </div>
          </button>

          <button 
            onClick={() => onDeleteTaskClick(task.id)}
            className="delete-button"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;