import React, { Component } from "react";
import axios from "axios";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      title: "",
      priority: "",
      completed: false,
      message: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          description: response.data.description,
          title: response.data.title,
          priority: response.data.priority,
          completed: response.data.completed,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [target.name]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      description: this.state.description,
      title: this.state.title,
      priority: this.state.priority,
      completed: this.state.completed,
    };
    axios
      .put("http://localhost:4000/todos/" + this.props.match.params.id, obj)
      .then((res) => {
        if (res.status === 200) {
          this.props.history.push("/");
        }
      });
  }

  render() {
    return (
      <div>
        <h3>Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>title: </label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              name="description"
              className="form-control"
              rows="3"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityLow"
                value="Low"
                checked={this.state.priority === "Low"}
                onChange={this.handleInputChange}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityMedium"
                value="Medium"
                checked={this.state.priority === "Medium"}
                onChange={this.handleInputChange}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityHigh"
                value="High"
                checked={this.state.priority === "High"}
                onChange={this.handleInputChange}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completed"
              onChange={this.handleInputChange}
              checked={this.state.completed}
              value={this.state.completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
