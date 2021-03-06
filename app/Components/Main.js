var React = require('react');
var Search = require('./Children/Search');
var Saved = require('./Children/Saved');
var helpers = require('./utils/helpers');


var Main = React.createClass({

	socketio: io(),

	getInitialState: function() {

		return {
			topic: '',
			articles: [],
			article_deleted: {}
		}
		
	}, // end getInitialState()

	// we need this function so the child can update the parent that an article has been saved and can then call componentDidUpdate and pull that article into the saved section without refreshing the page
	setArticles: function(search_topic) {

		this.setState({
			topic: search_topic
		});

	}, // end setArticles()

	// same as above in that we need this function to automatically display the items on the page with componentDidUpdate function
	setDeleteArticles: function(article_deleted) {

		this.setState({
			article_deleted: article_deleted
		});

	}, // end setDeleteArticles()

	// we will call this function form the component did mount and component did update functions below
	getArticlesFromHelpers: function() {
		
		// access helpers.js to use the getArticles function and access the get route defined in server.js
		helpers.getArticles()
			.then(function(response) {

				// set the state of articles with the articles stored in the database
				this.setState({
					articles: response.data
				})
				
		}.bind(this)); // end helpers.getArticles()

	}, // end getArticlesFromHelpers()

	componentDidUpdate: function() {
		
		// this is being called whenever a save article button is pressed in the search.js file
		this.getArticlesFromHelpers();

	}, // end componentDidUpdate()

	// once the page loads get all the articles in the database
	componentDidMount: function() {
		
		this.getArticlesFromHelpers();

	}, // end componentDidMount()

	render: function() {
		
		return (

			<div>

				<div className="jumbotrosn">
					<div className="container">
						<h1>New York Times Article Scrubber</h1>
						<p>Search for and annotate articles of interest!</p>
					</div>
				</div>

				<div className="search">
				{/* we need to pass the ability to update the parent that an article has been saved to the database so that the articles can be added automatically to the saved component below */}
					<Search setArticles={this.setArticles} />
				}
				</div>

				<div className="saved">
					<Saved 
						articles={this.state.articles}
						setDeleteArticles={this.setDeleteArticles} />
				</div>

			</div>

		);
	}

});

module.exports = Main;