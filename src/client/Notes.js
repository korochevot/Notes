import React, { Component } from 'react';
import axios from 'axios';
import Popup from './Popup';
import styled from 'styled-components'

const ArticleBlock = styled.div`
	width: 100%;
	border: 1px solid silver;
	margin: 10px 0;
	padding: 15px;
	box-sizing: border-box;
`

const Article = styled.div`
	&:hover{
		cursor: pointer;
	}
`

class Notes extends Component {
	state = {
		articles: this.props.articles,
		singleArticle: ''
	};

	componentWillReceiveProps(nextProps) {
		this.setState({ articles: nextProps.articles });
	}

	getArticleById = (id) => {
		axios.get('http://localhost:3012/' + id)
			.then(res => {
				this.setState({ singleArticle: res.data })
			})
			.catch((err) => {
				console.log(err);
			});
	}

	deleteArticleById = (id, index) => {
		axios.delete('http://localhost:3012/' + id)
			.then(res => {
				const articlesArray = this.state.articles;
				articlesArray.splice(index, 1);
				this.setState({
					articles: articlesArray
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				{this.state.articles.map((article, index) =>
					<ArticleBlock key={article._id}>
						<Article
							index={index}
							onClick={this.getArticleById.bind(this, article._id)}>
							<h2>{article.title}</h2>
						</Article>
						<button
							onClick={this.deleteArticleById.bind(this, article._id, index)}>
							Удалить
						</button>
					</ArticleBlock>
				)}
				<Popup article={this.state.singleArticle} />
			</div>
		)
	}
}

export default Notes;