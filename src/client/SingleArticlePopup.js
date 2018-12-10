import React, { Component } from 'react';
import styled from 'styled-components'

const ArticlePopupBlock = styled.div`
	visibility: ${props => props.fade ? 'hidden' : 'visible'};
`

const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	z-index: 10;
`

const ArticlePopup = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 300px;
	background-color: darkcyan;
	z-index: 10;
`

class SingleArticlePopup extends Component {
	state = {
		articleData: this.props.article,
		articleVisibility: this.props.articleVisibility
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({ articleData: nextProps.article });
		this.setState({ articleVisibility: nextProps.articleVisibility });
	}

	hideArticlePopup = () => {
		this.props.hideArticleProp(false);
		this.setState({ articleVisibility: false });
	}

	render() {
		return (
			<ArticlePopupBlock fade={!this.state.articleVisibility}>
				<Overlay onClick={this.hideArticlePopup} />
				<ArticlePopup>
					<h1>{this.state.articleData.title}</h1> 
					<p>{this.state.articleData.text}</p>
					<button onClick={this.hideArticlePopup}>закрыть</button>
				</ArticlePopup>
			</ArticlePopupBlock>
		)
	}
}

export default SingleArticlePopup