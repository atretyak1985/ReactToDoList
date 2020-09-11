import React, {Component} from 'react';

import './search-panel.css';

class SearchPanel extends Component {

    render() {
        const {onSearch} = this.props;

        return (
            <input type="text"
                   className="form-control search-input"
                   placeholder="type to search"
                   onChange={(e) => onSearch(e.target.value)}
            />
        );
    }
}
export default SearchPanel;
