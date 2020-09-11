import React, {Component} from 'react';

import './item-status-filter.css';

class ItemStatusFilter extends Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Done'}
    ]

    render() {
        const {onFilter, filter} = this.props;

        const buttons = this.buttons.map((button) => {
            const isActive = filter === button.name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button key={button.name}
                        type="button"
                        className={`btn ${clazz}`}
                        onClick={() => onFilter(button.name)}>
                    {button.label}
                </button>
            )
        });

        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
    }
}

export default ItemStatusFilter;
