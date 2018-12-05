import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import FormPopup from './FormPopup';
import Articles from './Articles';

const MainBlock = styled.div`
	color: #ffffff;
	font-family: Arial, Helvetica, sans-serif;
`

const OpenForm = styled.button`

`

class Main extends Component {
	state = {
		articles: [],
		formVisibility: false
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

	showForm = () => {
		this.setState({ formVisibility: true })
	}

	render() {
		return (
			<MainBlock>
				<OpenForm onClick={this.showForm}>Add new</OpenForm>
				<FormPopup
					formVisibility={this.state.formVisibility}
					addArticle={this.addArticle} />
				<Articles articles={this.state.articles} />
			</MainBlock>
		);
	}
}

export default Main;