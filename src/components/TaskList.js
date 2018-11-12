import React, { Component } from 'react';
import TaskItem from './TaskItem'

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fillterName: '',
            fillterStatus: 0
        }
    }

    onChange = (event) => {
        const {
            fillterName = '',
            fillterStatus = 0
        } = this.state;

        const target = event.target;
        const name = target.name;
        const value = (target.value === '0'
            || target.value === '1'
            || target.value === '-1')
            ? parseInt(target.value)
            : target.value;

        this.props.fillterList({
            fillterName:
                name === 'fillterName'
                    ? value
                    : fillterName,
            fillterStatus:
                name === 'fillterStatus'
                    ? value
                    : fillterStatus
        });

        this.setState({ [name]: value });
    }


    render() {
        const { tasks = [] } = this.props;

        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Tool</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"></th>

                            <td><input
                                name="fillterName"
                                value={this.state.fillterName}
                                onChange={this.onChange}
                                type="text"
                                className="form-control"
                                placeholder="Username" />
                            </td>
                            <td>
                                <div className="form-group">
                                    <select
                                        onChange={this.onChange}
                                        name="fillterStatus"
                                        className="form-control"
                                        value={this.state.fillterStatus}>

                                        <option value={0}>All</option>
                                        <option value={1}>Active</option>
                                        <option value={-1}>DisActive</option>
                                    </select>
                                </div>
                            </td>

                            <td></td>
                        </tr>


                        {/* TASK ITEM */}
                        {
                            tasks.map((task, index) => {
                                return (
                                    <TaskItem
                                        key={index}
                                        task={task}
                                        index={index}
                                        updateStatus={this.props.updateStatus}
                                        deleteItem={this.props.deleteItem}
                                        updateData={this.props.updateData}

                                    />
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskList;
