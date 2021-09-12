import React, { Component } from "react";
import axios from "axios";

export default class CreateTodo extends Component {
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [target.name]: value });
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
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              rows="3"
              value={this.state.description}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityLow"
                  value="Low"
                  checked={this.state.priority === "Low"}
                  onChange={this.handleInputChange}
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
                  name="priority"
                  id="priorityMedium"
                  value="Medium"
                  checked={this.state.priority === "Medium"}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  name="priority"
                  id="priorityHigh"
                  value="High"
                  checked={this.state.priority === "High"}
                  onChange={this.handleInputChange}
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
