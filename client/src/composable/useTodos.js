import { ref, readonly} from  "vue"
import axios from "axios"
export default function useTodos() {
  const todos = ref([])

  async function getTodos() {
    try {
      const {data} = await axios.get('http://localhost:3000/api/todo')
      todos.value = data
    } catch(err) {
       console.warn('get todos err',err)
    }
  }

  async function getTodoById(id) {
    try {
      const {data} = await axios.get(`http://localhost:3000/api/todo/${id}`)
      return data
    } catch(err) {
       console.warn('get todo by id err',err)
    }
  }

  async function createTodo(name, time) {
    try {
      await axios.post('http://localhost:3000/api/todo',{
        name,
        time
      },{
        headers: {
          'Content-Type': 'application/json', // 設定請求標頭
        },
      })
    } catch(err) {
       console.warn('create todos err',err)
    }
  }

  return {
    todos: readonly(todos),
    getTodos,
    getTodoById,
    createTodo
  }
}
