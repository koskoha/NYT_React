var React = require('react');
var helpers = require('../utils/helpers');

var Saved = React.createClass({

	getInitialState: function() {
		
		return {
			article_delete: ''
		}

	}, // end getInitialState()

	clickHandler: function(event) {
		
		event.preventDefault();

		// set the id of the article to delete to the article_id variable
		var article_id = event.target.parentElement.children[0].id;

		// set the state of the article_id we're deleting
		this.setState({
			article_delete: {
				article_id: article_id
			}
		// callback function so the state can update before we do anyting this that data
		}, function() {
			
			// call the deleteArticle function and pass the article
			helpers.deleteArticle(this.state.article_delete);

			// this needs to be called in the callback or this function will run before deleteArticle and the screen won't remove the most recently deleted article without refreshing or clicking on another article to delete
			// need to call the deleteArticles function in main.js so that the newly deleted article from the database automatically dissapears in the saved section
			this.props.setDeleteArticles(this.state.article_delete);

		});	// end setState()

	}, // end clickHandler()

	render: function() {
		
		return (

			<div className="container">

				<div className="row">
					<div className="col-md-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h2>Saved Articles</h2>
							</div>
							<div className="panel-body" onClick={this.clickHandler}>
						{/* using map to loop through the array being returned from the db with the articles it holds */}
								{this.props.articles.map(function(search, i) {
									return <p key={i}><a href="" className="btn btn-danger" id={search._id} >Delete</a> <a href={search.article_url}>{search.article_title}</a> <span>{search.article_pub_date}</span></p>
								})}
							</div>
						</div>
					</div>
				</div>

			</div>

		)
	}

});

module.exports = Saved;