import HomeIndex from '../page/homeIndex'
import Home from '@/page/home/home'
import Jobs from '../page/jobs/jobs'
import Questions from '../page/questions/questions'
import Tags from '../page/Tags/tags'
import Users from '../page/Users/users'
import Search from '../page/search/search'

// const childBanner = [
//   {
//     path: '/',
//     name: 'Home',
//     components: {
//       childBanner: require('../page/home/home.vue')
//     }
//   }
// ]

// const main = [
  // {
  //   path: '/users',
  //   name: 'Users',
  //   component: {
  //     main: require('../page/users/users.vue')
  //   }
  // },
  // {
  //   path: '/tags',
  //   name: 'Tags',
  //   component: {
  //     main: require('../page/tags/tags.vue')
  //   }
  // },
  // {
  //   path: '/questions',
  //   name: 'Questions',
  //   component: {
  //     main: require('../page/questions/questions.vue')
  //   }
  // },
  // {
  //   path: '/jobs',
  //   name: 'Jobs',
  //   component: {
  //     main: require('../page/jobs/jobs.vue')
  //   }
  // }
// ]

const index = [
  {
    path:'*',
    redirect: '/'
  },
  {
    path: '/',
    component: HomeIndex,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/users',
        name: 'Users',
        component: Users
      },
      {
        path: '/tags',
        name: 'Tags',
        component: Tags
      },
      {
        path: '/questions',
        name: 'Questions',
        component: Questions
      },
      {
        path: '/jobs',
        name: 'Jobs',
        component: Jobs
      },
      {
        path: '/search',
        name: 'Search',
        component: Search
      }
    ]
  }
]
export default index
