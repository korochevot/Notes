import React, { Component } from 'react';
import styled from 'styled-components'
import axios from 'axios';
import FormPopup from './FormPopup';
import Articles from './Articles';

const MainBlock = styled.div`
	color: #ffffff;
	font-family: Arial, Helvetica, sans-serif;
`

const NavBlock = styled.nav`
	text-align: right;
	box-shadow: 1px 1px 10px -1px rgba(0,0,0,0.75);
`

const NavBlockBtn = styled.button`
	background-color: transparent;
	color: #fff;
	padding: 10px 35px;
	margin: ${props => props.deleteAll ? '20px 20px 20px 0' : '20px'};
	border: 1px solid #475bc4;
	border-radius: 20px;	
	outline: none;
	cursor: pointer;
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

	hideFormProp = (value) =>{
		this.setState({ formVisibility: value })
	}

	deleteAll = () => {
		axios.delete('http://localhost:3012/')
			.then(res => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});

		this.setState({ articles: [] });
	}

	render() {
		return (
			<MainBlock>
				<NavBlock>
					<NavBlockBtn
						onClick={this.showForm}>Add new
					</NavBlockBtn>
					<NavBlockBtn
						deleteAll
						onClick={this.deleteAll}>delete All
						</NavBlockBtn>
				</NavBlock>
				<FormPopup
					hideFormProp={this.hideFormProp}
					formVisibility={this.state.formVisibility}
					addArticle={this.addArticle} />
				<Articles articles={this.state.articles} />
			</MainBlock>
		);
	}
}

export default Main;