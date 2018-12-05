import React, { Component } from 'react';
import axios from 'axios';
import { stringify } from 'querystring';
import styled from 'styled-components'

const FormPopupBlock = styled.div`
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

const ClosePopup = styled.span`
	position: absolute;
	top: 5px;
	right: 7px;
	font-size: 25px;
	cursor: pointer;
`

class FormPopup extends Component {
	state = {
		articles: [],
		title: '',
		text: '',
		formVisibility: this.props.formVisibility,
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ formVisibility: nextProps.formVisibility });
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
				this.props.addArticle(res.data);
				this.hideFormPopup();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	hideFormPopup = () => {
		this.setState({ formVisibility: !this.state.formVisibility });
		this.setState({ title: '' });
		this.setState({ text: '' });
	}

	render() {
		return (
			<FormPopupBlock fade={!this.state.formVisibility}>
				<Overlay onClick={this.hideFormPopup} />
				<FormBlock onSubmit={this.addArticle}>
					<ClosePopup onClick={this.hideFormPopup}>X</ClosePopup>
					<FormInput
						value={this.state.title}
						type="text"
						name="title"
						onChange={this.handleChangeTitle}
						required />
					<FormArea
						value={this.state.text}
						type="text"
						name="text"
						onChange={this.handleChangeText}
						required />
					<FormSubmit type="submit">Add</FormSubmit>
				</FormBlock>
			</FormPopupBlock>
		)
	}
}

export default FormPopup;