// Recebe a prop especial 'children', que representa qualquer conteúdo colocado dentro da tag
function Title({ children }) {
  return (
    <h1 className="title">
      {/* Renderiza dinamicamente o conteúdo repassado (ex: <Title>Gerenciador de Tarefas</Title>) */}
      {children}
    </h1>
  );
}

export default Title;