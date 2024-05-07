{/* <input type="checkbox">
<div>teste do item 1</div>
<input id="btn" type="button" value="X"> */}
const getTarefas = () => JSON.parse(localStorage.getItem('todoList')) ?? []
const setTarefas = (tarefasLista) => localStorage.setItem('todoList', JSON.stringify(tarefasLista))
const addTarefa = (e, status) => {
    const tarefa = document.querySelector('#tarefa')
    const tecla = e.key
    if (tecla === 'Enter') {
        if (tarefa.value === '') {
            alert('Por favor, digite uma tarefa!')
            return
        }
        atualizarTela()
        criarTarefa(tarefa.value)
        const tarefasLista = getTarefas()
        tarefasLista.push({ id: tarefasLista.length + 1, name: `${tarefa.value}`, status: '' })
        setTarefas(tarefasLista)
        tarefa.value = ''
    }
}

const atualizarTela = () => {
    const tarefasLista = getTarefas()
    verificarTarefas()
    tarefasLista.forEach((item, indice) => criarTarefa(item.name, item.status, indice))
}

const verificarTarefas = () => {
    const todoList = document.querySelector('.todo_list')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const criarTarefa = (text, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item')
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${text}</div>
    <input id="btn" type="button" value="X" data-indice=${indice}> 
    `
    document.querySelector('.todo_list').appendChild(item)
}

const atualizarItem = (indice) => {
    const tarefasLista = getTarefas()
    tarefasLista[indice].status = tarefasLista[indice].status === '' ? 'checked' : ''
    setTarefas(tarefasLista)
    atualizarTela()
}

const clickItem = (e) => {
    const tarefasLista = getTarefas()
    const elemento = e.target
    const indice = elemento.dataset.indice
    if (elemento.type === 'button') {
        tarefasLista.splice(indice, 1)
        setTarefas(tarefasLista)
        atualizarTela()
    } else if (elemento.type === 'checkbox') {
        atualizarItem(indice)
    }

}
document.querySelector('.todo_list').addEventListener("click", clickItem)
document.querySelector('#tarefa').addEventListener("keypress", addTarefa)
atualizarTela()