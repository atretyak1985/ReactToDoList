import React, {Component} from "react";

import './item-add-form.css';

class ItemAddForm extends Component {

    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value.toUpperCase()
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onItemAdded('new item')
        this.setState({
            label:''
        })
    }

    render() {

        return (
            <form className="item-add-form d-flex"
            onSubmit={this.onSubmit}>
                <input type="text"
                       className="form-control item-add-form-input"
                       onChange={this.onLabelChange}
                       placeholder="What need to be done?"
                       value={this.state.label}
                />
                <button
                    className="btn btn-outline-secondary"
                >
                    Add Item
                </button>
            </form>
        );
    }
}

export default ItemAddForm;
