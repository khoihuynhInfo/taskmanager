import React, { Component } from 'react';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = { keywork: '' }
    }

    onChange = (event) => {
        this.setState({
            keywork: event.target.value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        const { keywork = '' } = this.state;
        this.props.onSearch(keywork);
    }
    
    render() {
        const { keywork = '' } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="input-group">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for..."
                        name="keywork"
                        value={keywork}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button
                            className="btn btn-primary"
                            type="button"
                            type="submit"
                        >
                            <span className="glyphicon glyphicon-search" aria-hidden="true">
                            </span> Search!
                        </button>
                    </span>

                </div>
            </form>
        );
    }
}

export default Search;
