import React, { Component } from 'react';
import axios from 'axios';
import SingleArticlePopup from './SingleArticlePopup';
import styled from 'styled-components'

const lightGrey = '#9ea3b4';

const ArticlesSection = styled.section`
	display: block;
	width: 100%;
`

const ArticleBlock = styled.div`
	display: inline-block;
	background-color: #3a3e52;
	width: 15%;
    min-width: 280px;
	border-radius: 3px;
	margin: 10px 10px;
	padding: 20px 15px;
	box-sizing: border-box;
	position: relative;
`

const Avatar = styled.div`
	display: inline-block;
	vertical-align: middle;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: yellow;
`

const ArticleContent = styled.div`
	display: inline-block;
	vertical-align: middle;
	margin-left: 15px;
`

const ArticleTitle = styled.p`
	margin: 0;
	&:hover{
		cursor: pointer;
		text-decoration: underline;
	}
`

const ArticleDate = styled.span`
	font-size: 12px;
	color: ${lightGrey};
	margin: 0;
`

const OptionsBtn = styled.div`
	position: absolute;
	top: 50%;
	right: 5px;
	transform: translateY(-50%);
	width: 10px;
	height: 30px;
	&:hover{
		cursor: pointer;
	}
`

const OptionsBtnSpan = styled.span`
	position: relative;
	display: block;
    margin: 0 auto;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: ${lightGrey};
	&:before{
		content: '';
		position: absolute;
		top: 10px;
		right: 0;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: ${lightGrey};
	}
	&:after{
		content: '';
		position: absolute;
		top: 20px;
		right: 0;
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background-color: ${lightGrey};
	}
`

class Articles extends Component {
	state = {
		articles: this.props.articles,
		singleArticle: '',
		articleVisibility: false
	};

	componentWillReceiveProps = (nextProps) => {
		this.setState({ articles: nextProps.articles });
	}

	getArticleById = (id) => {
		axios.get('http://localhost:3012/' + id)
			.then(res => {
				this.setState({ singleArticle: res.data });
				this.setState({ articleVisibility: true });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	hideArticleProp = (value) =>{
		this.setState({ articleVisibility: value })
	}

	deleteArticleById = (id, index) => {
		axios.delete('http://localhost:3012/' + id)
			.then(res => {
				const articlesArray = this.state.articles;
				articlesArray.splice(index, 1);
				this.setState({ articles: articlesArray });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<ArticlesSection>
				{this.state.articles.map((article, index) =>
					<ArticleBlock key={article._id}>
						<div index={index}>
							<Avatar />
							<ArticleContent>
								<ArticleTitle onClick={this.getArticleById.bind(this, article._id)}>
									{article.title}
								</ArticleTitle>
								<ArticleDate>11.01.1222</ArticleDate>
							</ArticleContent>
						</div>
						<OptionsBtn>
							<OptionsBtnSpan />
						</OptionsBtn>

						{/* <button
							onClick={this.deleteArticleById.bind(this, article._id, index)}>
							Удалить
						</button> */}
					</ArticleBlock>
				)}
				<SingleArticlePopup
					hideArticleProp={this.hideArticleProp}
					articleVisibility={this.state.articleVisibility}
					article={this.state.singleArticle} />
			</ArticlesSection>
		)
	}
}

export default Articles;