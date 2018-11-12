import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      taskEdit: {},
      tasks: [],
      isDisplayForm: false,
      dataFilter: {},
      keywork: '',
      kindSort: 0
    }
  }

  updateData = (data) => {
    this.setState({ taskEdit: data });
    this.openEditTask();
  }

  generateData = () => {

    const tasks = [
      { id: 1, name: 'Reactjs', status: true },
      { id: 2, name: 'Angular4', status: false },
      { id: 3, name: 'Python', status: true },
    ];

    this.setState({ tasks: tasks });

    localStorage.setItem('tasks',
      JSON.stringify(tasks));

  }
  // fill all, fill active, fill disactive
  fillterList = (data) => {
    this.setState({
      dataFilter: data
    });
  }

  onFillter(dataFilter, tasks) {
    let taskFillter = [];
    const {
      fillterName = '',
      fillterStatus = 0
    } = dataFilter;

    if (tasks && tasks.length) {
      switch (fillterStatus) {
        case 1: // Active
          taskFillter = [...
            [...tasks].filter(task => {
              return (
                task.name.toLowerCase()
                  .indexOf(fillterName)
                !== -1
                && task.status
              );
            })];
          break;
        case -1: // DisActive
          taskFillter = [...
            [...tasks].filter(task => {
              return (
                task.name.toLowerCase()
                  .indexOf(fillterName)
                !== -1
                && !task.status
              );
            })];
          break;
        default: // All
          taskFillter = [...
            [...tasks].filter(task => {
              return (
                task.name.toLowerCase()
                  .indexOf(fillterName)
                !== -1
              );
            })];
      }
    }

    return taskFillter;
  }

  onSearch = (keywork = '') => {
    this.setState({
      keywork: keywork
    });
  }

  onSort = (kindSort = 0) => {
    this.setState({ kindSort: kindSort });
  }

  sortName = (tasks = []) => {
    const { kindSort = 0 } = this.state;
    return (kindSort === 0)
      ? [...tasks].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) return 1;
        else if (nameA < nameB) return -1;
        else return 0;
      })
      :
      [...tasks].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) return 1;
        else if (nameA > nameB) return -1;
        else return 0;
      });
      
  }
  componentWillMount() {
    if (localStorage
      && localStorage.getItem('tasks')) {

      const tasks = JSON.parse(
        localStorage.getItem('tasks')
      );
      this.setState({ tasks: tasks });
    }
  }

  addTask = () => {
    this.setState({
      isDisplayForm: true,
      taskEdit: {}
    });

  }

  closeAddTask = () => {
    const { isDisplayForm = false } = this.state;
    this.setState({ isDisplayForm: !isDisplayForm });
  }

  openEditTask = () => {
    this.setState({ isDisplayForm: true });
  }

  onSubmit = (data) => {

    let { tasks = [] } = this.state;
    const { isAdd = false, id } = data;

    if (isAdd) { // Update
      tasks = [data, ...tasks];
    } else { // Edit
      tasks.find(e => {
        if (e.id === id) {
          e.name = data.name;
          e.status = data.status;
        }
      });
    }

    localStorage.setItem('tasks',
      JSON.stringify(tasks));

    this.setState({
      tasks: tasks
    });
  }

  updateStatus = (id) => {
    const { tasks = [] } = this.state;
    if (tasks && tasks.length) {
      tasks.find(e => {
        if (e.id === id) {
          e.status = !e.status;
        }
      });
    }
    this.setState({ tasks: tasks });
    localStorage.setItem('tasks',
      JSON.stringify(tasks));
  }

  deleteItem = (id) => {
    const { tasks = [] } = this.state;
    if (tasks
      && tasks.length) {
      const newtasks = tasks.filter(task =>
        task.id !== id);

      this.setState({
        tasks: newtasks
      });

      localStorage.setItem('tasks',
        JSON.stringify(newtasks));
    }
  }

  search = (tasks = [], keywork = '') => {
    return (tasks
      && tasks.length
      && keywork
    )
      ? [...tasks].filter(task => {
        return (
          task.name
            .toLowerCase()
            .indexOf(keywork)
          !== -1 ||
          task.name
            .toUpperCase()
            .indexOf(keywork)
          !== -1
        );
      })
      : tasks;
  }

  render() {
    let { tasks = [], keywork } = this.state;
    const {
      isDisplayForm = false,
      taskEdit = {},
      dataFilter = {},
    } = this.state;

    // call function excute fillter 
    tasks = [...this.onFillter(
      dataFilter,
      tasks
    )];

    // call function excute search
    tasks = [...this.search(tasks, keywork)];

    // sort with name
    tasks = [...this.sortName(tasks)];
    console.log(tasks);

    const elementTaskForm = isDisplayForm
      ? <TaskForm
        onSubmit={this.onSubmit}
        closeAddTask={this.closeAddTask}
        taskEdit={taskEdit}
      />
      : '';
    return (
      <div>

        <div className="container">

          <div className="text-center">
            <h1>Management Task</h1><hr />
          </div>

          <div className="row">
            {/* FORM */}
            <div className="col-lg-4 col-md-6">
              {elementTaskForm}
            </div>
            {/* button add job */}

            <div className={
              isDisplayForm ? 'col-lg-8 col-md-6' : 'col-lg-12 col-md-12'
            } >
              <span>
                <button className="btn btn-primary" onClick={this.addTask}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true">
                  </span> Add task
                </button>
              </span>
              <span >
                <button className="btn btn-danger"
                  onClick={this.generateData}> Generate Data</button>
              </span>
              <br />
              <br />
              {/* Search & Sort */}
              <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
              />
              <br />
              {/* Table */}
              <TaskList
                tasks={tasks}
                updateStatus={this.updateStatus}
                deleteItem={this.deleteItem}
                updateData={this.updateData}
                fillterList={this.fillterList}
              />
            </div>
          </div>
        </div>

      </div >
    );
  }
}

export default App;
