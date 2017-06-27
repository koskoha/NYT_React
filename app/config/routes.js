var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hasHistory = ReactRouter.hasHistory;
var app = require('../app');
var Main = require('../app/Components/Main');

var routes = (

	<Router history={hasHistory}>
		<Route path='/' component={app}>
			<IndexRoute component={Main} />
		</Route>
	</Router>

);

module.exports = routes;