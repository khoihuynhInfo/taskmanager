import React, { Component } from 'react';

class Sort extends Component {
    stylesort = {
        borderRight:'5px solid black'
    }


    constructor(props) {
        super(props);
        this.state = {
            kindSort: 0
        }

    }

    onSort = (kindSort = 0) => {
        this.props.onSort(kindSort);
        this.setState({
            kindSort: kindSort
        });
    }

    render() {
        const { kindSort } = this.state;
        console.log(kindSort);
        return (
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle"
                    type="button" data-toggle="dropdown">Sort &nbsp;
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" style={{ cursor: 'pointer', padding: '10px' }}>
                    <li onClick={() => this.onSort(0)}
                        style={(kindSort === 0) ? this.stylesort : undefined}>
                        <span className="glyphicon glyphicon-sort-by-alphabet">
                        </span> A - Z
                    </li>
                    <li onClick={() => this.onSort(1)}
                        style={(kindSort === 1) ? this.stylesort : undefined}>
                        <span className="glyphicon glyphicon-sort-by-alphabet-alt">
                        </span> Z - A
                    </li>
                </ul>
            </div>
        );
    }
}

export default Sort;
