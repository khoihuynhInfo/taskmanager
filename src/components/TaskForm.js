import React, { Component } from 'react';

class TaskForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false,
      isAdd: true,
    }
  }

  // when form load, get item want update
  componentWillMount() {
    const { taskEdit = {} } = this.props;
    const {
      id = '',
      name = '',
      status = false
    } = taskEdit;

    if (taskEdit.id) {
      this.setState({
        id: id,
        name: name,
        status: status,
        isAdd: false
      });
    }
  }

  // New next props edit pass into component
  componentWillReceiveProps(nextProps) {
    const { taskEdit = {} }
      = nextProps;
    const {
      id = '',
      name = '',
      status = false,
    } = taskEdit;

    if (id) {
      this.setState({
        id: id,
        name: name,
        status: status,
        isAdd: false
      });
    } else {
      this.setState({
        isAdd: true
      });
    }

  }

  closeAddTask = () => {
    this.props.closeAddTask();
  }

  // form change select status, input name, 
  onChange = (event) => {
    const { id = '' } = this.state;
    const target = event.target;
    const name = target.name;
    let value = target.value;

    if (name === 'status') {
      value = target.value
        === 'true'
        ? true
        : false;
    }

    this.setState({
      id: id ? id
        : this.generateID(name, value),
      [name]: value
    });
  }

  // create ID ramdom for data
  generateID(name, value) {
    return `${Math.random()
      }-${name
      }-x9x9-${value
      }-${Math.random()}`;
  }


  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.clearForm();
    this.closeAddTask();
  }

  clearForm = () => {
    this.setState({
      id: '',
      name: '',
      status: false
    });
  }

  render() {

    const { isAdd = false } = this.state;

    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <span>
            <h3 className="panel-title"> {!isAdd ? 'Edit Task' : 'Add Task'}
              <span onClick={this.closeAddTask}
                className="glyphicon glyphicon-remove text-right"
                style={{ cursor: 'pointer', float: 'right', fontSize: '12px' }}>
              </span>
            </h3>
          </span>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}>onSubmit

                <option value={true}>Active</option>
                <option value={false}>DisActive</option>
              </select>
            </div>

            <span>
              <button className="btn btn-warning" type="submit">Save</button>
            </span>
            &nbsp;
            <span><button className="btn btn-danger"
              onClick={this.clearForm}>Cancel</button></span>
          </form>
        </div>

      </div>
    );
  }
}

export default TaskForm;
