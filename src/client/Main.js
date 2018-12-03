import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import Form from './Form';
import Notes from './Notes';

const MainBlock = styled.div`
	color: #ffffff;
	font-family: Arial, Helvetica, sans-serif;
`

const OpenForm = styled.button`

`

class Main extends Component {
	state = {
		articles: [],
	}

	componentDidMount = () => {
		axios.get('http://localhost:3012/')
			.then(res => {
				this.setState({ articles: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addArticle = (value) => {
		this.setState({ newNote: value })
		this.setState({ articles: [...this.state.articles, this.state.newNote] });
	}

	showForm = () =>{
		this.setState({visible: true})
	}

	render() {
		return (
			<MainBlock>
				<OpenForm onClick={this.showForm}>Add new</OpenForm>
				<Form visible={this.state.visible} addArticle={this.addArticle}/>
				<Notes articles={this.state.articles}/>
			</MainBlock>
		);
	}
}

export default Main;