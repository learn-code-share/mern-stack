import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      description: "",
      title: "",
      priority: "",
      completed: false,
      message: "",
    };
  }

  onChangeTodoDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeTodoTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      priority: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newTodo = {
      description: this.state.description,
      title: this.state.title,
      priority: this.state.priority,
      completed: this.state.completed,
    };
    axios.post("http://localhost:4000/todos/", newTodo).then((res) => {
      if (res.status === 200) {
        this.setState({
          description: "",
          title: "",
          priority: "",
          message: "Todo created successfully.",
        });
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTodoTitle}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              className="form-control"
              rows="3"
              value={this.state.description}
              onChange={this.onChangeTodoDescription}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityLow"
                  value="Low"
                  checked={this.state.priority === "Low"}
                  onChange={this.onChangeTodoPriority}
                />
                Low
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                Medium
                <input
                  className="form-check-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityMedium"
                  value="Medium"
                  checked={this.state.priority === "Medium"}
                  onChange={this.onChangeTodoPriority}
                />
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priorityOptions"
                  id="priorityHigh"
                  value="High"
                  checked={this.state.priority === "High"}
                  onChange={this.onChangeTodoPriority}
                />
                High
              </label>
            </div>
          </div>
          <p>{this.state.message}</p>
          <div className="form-group">
            <input
              type="submit"
              value="Create Todo"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
