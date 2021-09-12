import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => (    
  <tr>
    <td className={props.todo.completed ? 'completed' : ''}>{props.todo.title}</td>
    <td className={props.todo.completed ? 'completed' : ''}>{props.todo.description}</td>
    <td className={props.todo.completed ? 'completed' : ''}>{props.todo.priority}</td>
    <td>
      <button type="button" onClick={() => props.finished(props.todo)} className="btn btn-primary btn-sm mx-1">Finish</button>
      <Link className="btn btn-sm btn-secondary" to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };

    this.finishTask = this.finishTask.bind(this);
  }  

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  finishTask(task){
    task.completed = true;
    axios
      .put("http://localhost:4000/todos/" + task._id, task)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
        }
      });
  }

  todoList() {
    return this.state.todos.map((todo, index) => {
      return <Todo todo={todo} key={index} finished={(task) => this.finishTask(task)} />;
    });
  }

  render() {
    return (
      <div>
       <h4>Todo List</h4>
       <table className="table">
           <thead>
               <tr>
                   <th>Title</th>
                   <th>Description</th>
                   <th>Priority</th>
                   <th></th>
               </tr>
           </thead>
           <tbody>
           { this.todoList() }
           </tbody>
       </table>
      </div>
    );
  }
}
