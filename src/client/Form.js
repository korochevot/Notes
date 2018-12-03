import React, { Component } from 'react';
import axios from 'axios';
import { stringify } from 'querystring';
import styled from 'styled-components'

const Popup = styled.div`
	visibility: ${props => props.fade ? 'hidden' : 'visible'};
`

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
`

const FormBlock = styled.form`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 700px;
	text-align: center;
	background: #dd9747;
`

const FormInput = styled.input`
	width: 80%;
	height: 30px;
	font-size: 24px;
	outline: none;
	margin-top: 25px;
	border: none;
`

const FormArea = styled.textarea`
	width: 80%;
	height: 400px;
	resize: none;
	font-size: 24px;
	outline: none;
	margin-top: 20px;
	border: none;
`

const FormSubmit = styled.button`
	cursor: pointer;
	display: block;
	margin: 20px auto;
    margin-right: 67px;
	padding: 4px 30px;
	font-size: 24px;
`

class Form extends Component {
	state = {
		articles: [],
		title: '',
		text: '',
		visible: this.props.visible,
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ visible: nextProps.visible });
	}

	handleChangeTitle = (event) => {
		this.setState({ title: event.target.value });
	}

	handleChangeText = (event) => {
		this.setState({ text: event.target.value });
	}

	addArticle = (event) => {
		event.preventDefault();

		const newArticle = {
			title: this.state.title,
			text: this.state.text
		};

		axios.post('http://localhost:3012/', stringify(newArticle))
			.then(res => {
				this.props.addArticle(res.data)
			})
		
		this.setState({
			visible: false,
		})
	}

	hidePopup = () =>{
		this.setState({
			visible: false,
		})
	}

	render() {
		return (
			<Popup fade={!this.state.visible}>
				<Overlay onClick={this.hidePopup}/>
				<FormBlock onSubmit={this.addArticle}>
					<FormInput 
						type="text"
						name="title"
						onChange={this.handleChangeTitle}
						required/>
					<FormArea
						type="text"
						name="text"
						onChange={this.handleChangeText}
						required/>
					<FormSubmit type="submit">Add</FormSubmit>
				</FormBlock>
			</Popup>
		)
	}
}

export default Form;