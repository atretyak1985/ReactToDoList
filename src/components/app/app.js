import React, {Component} from "react";
import './app.css';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createToDoItem('Drink Coffee'),
            this.createToDoItem('Make Awesome App'),
            this.createToDoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' //All, Active, Done
    };

    createToDoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    addItem = (text) => {
        //add item to list
        this.setState(({todoData}) => {
            return {
                todoData: [
                    ...todoData,
                    this.createToDoItem(text)
                ]
            }
        })
    }

    deleteItem = (id) => {
        this.setState( ({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            // not recomended because it change state
            // todoData.splice(idx, 1);

            const newArr = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArr
            };
        })
    }

    toggleProperty(arr, id, propertyName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propertyName]: !oldItem[propertyName]
        }

        const newArr = [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];

        return newArr
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    search(items, term) {
        if(!term){
            return items;
        }
        return items.filter((el) => el.label.toLowerCase().includes(term.toLowerCase()));
    }

    filter(items, type) {
        switch (type){
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                return items.filter((el) => el.done);
            default:
                return items;
        }
    }

    onSearch = (text) => {
        this.setState({
            term: text
        })
    }

    onFilter = (type) => {
        this.setState({
            filter: type
        })
    }

    render() {
        const {todoData, term, filter} = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((item) => item.done).length;
        const doneImportant = todoData.filter((item) => item.important).length;

        return (
            <div className="todo-app">
                <AppHeader toDo={doneImportant} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearch={this.onSearch} />
                    <ItemStatusFilter onFilter={this.onFilter}
                                      filter={filter}/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    };
}

export default App;
