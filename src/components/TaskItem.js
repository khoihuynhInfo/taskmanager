import React, { Component } from 'react';


class TaskItem extends Component {

    updateStatus = () => {
        this.props
            .updateStatus(
                this.props.task.id
            );
    }

    deleteItem = () => {
        this.props
            .deleteItem(
                this.props.task.id
            );
    }

    updateData = () => {
        this.props
            .updateData(
                this.props.task
            );
    }

    render() {
        const { index = 0 } = this.props;
        const {
            name = '',
            status = false,
        } = this.props.task;

        return (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{name}</td>
                <td style={{ cursor: 'pointer' }} onClick={this.updateStatus}>
                    {
                        status ? <label style={{ cursor: 'pointer' }}
                            className="label label-success">
                            Active
                        </label>
                            : <label style={{ cursor: 'pointer' }}
                                className="label label-danger">
                                DisActive
                        </label>
                    }

                </td>
                <td>
                    <span>
                        <button className="btn btn-warning" onClick={this.updateData}>
                            <span className="glyphicon glyphicon-pencil"> Update</span>
                        </button>
                    </span>
                    &nbsp;
                      <span>
                        <button className="btn btn-danger" onClick={this.deleteItem}>
                            <span className="glyphicon glyphicon-trash"> Delete</span>
                        </button>
                    </span>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
