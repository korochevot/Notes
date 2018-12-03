import React, { Component } from 'react';

class Popup extends Component {
	state = {
		articleData: this.props.article
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ articleData: nextProps.article });
	}

	render(){
		return (
			<div>
				<h1>{this.state.articleData.title}</h1>
				<p>{this.state.articleData.text}</p>
			</div>
		)
	}
}

export default Popup