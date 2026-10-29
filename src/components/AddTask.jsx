import { useState } from "react";

// Componente filho responsável por capturar a criação de novas tarefas
// Recebe a função 'onAddTaskSubmit' do pai via desestruturação de Props
function AddTask({ onAddTaskSubmit }) {
  // Estados locais para controlar individualmente os valores digitados nos inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Trata a validação e o envio do formulário
  function handleSubmit() {
    // .trim() remove espaços em branco antes e depois do texto
    if (!title.trim() || !description.trim()) {
      return alert("Preencha o título e a descrição da tarefa.");
    }
    
    // Executa a função do pai repassando os dados capturados
    onAddTaskSubmit(title, description);
    
    // Reseta os campos de input de volta para texto vazio
    setTitle("");
    setDescription("");
  }

  return (
    <div className="add-task-container">
      {/* 
        Componente Controlado (Controlled Component):
        1. value={title}: O valor exibido no input é forçado a ser exatamente o estado do React.
        2. onChange: Ouve cada tecla digitada e atualiza o estado com event.target.value.
      */}
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {/* Dispara a função de validação e envio ao clicar */}
      <button onClick={handleSubmit}>
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;