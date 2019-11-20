import React, { Component, createContext } from 'react';
import apiService from '../Services/apiService';

const SnippetContext = createContext({
    snippets: [],
    postSnippet: () => { },
    getSnippets: () => { },
    editSnippet: () => { }
});

export default SnippetContext;

export class SnippetProvider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            snippets: []
        }
    }

    updateSnippets = (snippets) => {
        this.setState({ snippets })
    }

    getSnippets = async () => {
        try {
            const snippets = await apiService.getSnippets();
            if (snippets) {
                this.updateSnippets(snippets);
            }
        }
        catch (error) {
            next(error)
        }
    }

    render() {
        const value = {
            snippets: this.state.snippets,
            getSnippets: this.getSnippets
        }

        return (
            <SnippetContext.Provider value={value}>
                {this.props.children}
             </SnippetContext.Provider>
        )
    }
}
