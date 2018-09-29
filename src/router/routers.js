const HomeIndex = () => import('../page/homeIndex')
const Home = () => import('@/page/home/home')
const Jobs = () => import('../page/jobs/jobs')
const Questions = () => import('../page/questions/questions')
const Tags = () => import('../page/Tags/tags')
const Users = () => import('../page/Users/users')
const Search = () => import('../page/search/search')

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
