import RoutesComponent from './routesComponent.js'

export default [
	{
		path: '/',
		name: 'Index',
		component: RoutesComponent.Index,
		children: [{
				path: '/register',
				name: 'Register',
				component: RoutesComponent.Register
			},
			{
				path: '/login',
				name: 'Login',
				component: RoutesComponent.Login

			}
		]
	},
	{
		path: '/main/songlist',
		name: 'SongList',
		component: RoutesComponent.SongList
	},
	{
		path: '/play',
		name: 'Play',
		component: RoutesComponent.Play
	},
	{
		path: '/search',
		name: 'Search',
		component: RoutesComponent.Search
	},

	{
		path: '/main',
		name: 'Main',
		component: RoutesComponent.Main,
		children: [{
				path: '/main/home',
				name: 'Home',
				component: RoutesComponent.Home

			},
			{
				path: '/main/hot',
				name: 'Hot',
				component: RoutesComponent.Hot
			},
			{
				path: '/main/newest',
				name: 'Newest',
				component: RoutesComponent.Newest
			},
			{
				path: '/main/myhome',
				name: 'MyHome',
				component: RoutesComponent.MyHome,
				children:[
				{
					path: '/main/myhome/modifidata',
					name: 'Modifidata',
					component: RoutesComponent.Modifidata
				}
				]
			}

		]
	},
	{
		path: '/myhome/collmusic',
		name: 'CollMusic',
		component: RoutesComponent.CollMusic
	}
]