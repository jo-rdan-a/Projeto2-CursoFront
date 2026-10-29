// Importação dos Hooks nativos do React para gerenciar estado (useState) e efeitos colaterais (useEffect)
import { useEffect, useState } from "react";

// Importação dos componentes filhos locais para montar a interface em blocos
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

function App() {
  // O React executa essa função apenas UMA VEZ quando o componente é montado na tela.
  const [tasks, setTasks] = useState(() => {
    // Busca os dados salvos previamente no navegador
    const savedTasks = localStorage.getItem("tasks");
    
    // Se existir algo no localStorage, converte a string JSON de volta para array/objeto
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    // Caso seja o primeiro acesso do usuário (localStorage vazio), define uma lista estática inicial
    return [
      {
        id: 1,
        title: "Estudar React",
        description: "Compreender useState, useEffect e Props",
        isCompleted: false,
      },
      {
        id: 2,
        title: "Desenvolver Projeto",
        description: "Criar a aplicação de gerenciador de tarefas",
        isCompleted: true,
      },
    ];
  });

  // useEffect com Array de Dependências [tasks]: Monitora o estado 'tasks'. Sempre que 'tasks' for modificado (adicionar, concluir ou deletar), este efeito executa automaticamente e sincroniza o novo estado com o localStorage.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Função para alternar o status de concluído (Conceito de Imutabilidade no React):
  function onTaskClick(taskId) {
    // Usamos .map() para criar um NOVO array sem modificar o original diretamente
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Retorna uma nova cópia do objeto com a propriedade 'isCompleted' invertida
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    // Atualiza a memória reativa do React para redesenhar a tela
    setTasks(newTasks);
  }

  // Função para excluir uma tarefa:
  function onDeleteTaskClick(taskId) {
    //  .filter() para gerar um NOVO array mantendo apenas os itens cujo ID seja diferente do excluído
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  // Elevação de Estado (Lifting State Up): Função passada via prop para o filho (AddTask) enviar dados de volta para o pai (App)
  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: Date.now(), // Gera um ID único 
      title,
      description,
      isCompleted: false,
    };
    // Operador Spread (...): copia todas as tarefas antigas e adiciona a nova no final
    setTasks([...tasks, newTask]);
  }

  // JSX: Sintaxe que permite escrever código semelhante a HTML dentro do JavaScript
  return (
    <div className="app-container">
      <div className="content">
        {/* Uso do componente Title passando texto como 'children' */}
        <Title>Gerenciador de Tarefas</Title>
        
        {/* Passagem de 'Props' (dados e funções) do pai para os componentes filhos */}
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
      </div>
    </div>
  );
}

// Exporta o componente App para ser importado e renderizado pelo main.jsx
export default App;