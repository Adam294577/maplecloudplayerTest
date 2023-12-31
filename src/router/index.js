import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'

import LogImg from '@/assets/logo/metaImg.png'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title: "楓雲玩家",
      metaTags: [
        {
          name: 'description',
          content: '楓谷來自琉德的雲玩家'
        },
        {
          property: 'og:description',
          content: '楓谷來自琉德的雲玩家'
        }
      ]    
    },   
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta:{
      title: "楓雲玩家-about",
      metaTags: [
        {
          name: 'description',
          content: '楓谷來自琉德的雲玩家'
        },
        {
          property: 'og:description',
          content: '楓谷來自琉德的雲玩家'
        }
      ]    
    },   
  },
  {
    path: '/work',
    name: "work",
    children:[
      {
        path: 'chatRing',
        name: 'chatRing',
        component: () => import('../views/work/chatRingView.vue'),
        meta:{
          title: "聊天模擬器",
          metaTags: [
            {
              property: 'og:type',
              content: 'website'
            },
            {
              property: 'og:title',
              content: '聊天模擬器'
            },

            {
              property: 'og:description',
              content: '簡單的楓谷聊天模擬器'
            },
 

            {
              property: 'og:image',
              content: LogImg
            },            
            {
              name: 'twitter:card',
              content: 'summary'
            },
            {
              name: 'twitter:site',
              content: '@maplecloudplayer'
            },
            {
              name: 'description',
              content: '簡單的楓谷聊天模擬器'
            },
            {
              name: 'twitter:title',
              content: '聊天模擬器'
            },
            {
              name: 'twitter:description',
              content: '簡單的楓谷聊天模擬器'
            },
            {
              name: 'twitter:image',
              content: LogImg
            },
            {
              name: 'twitter:image:alt',
              content: '雲玩家'
            },            


          ]    
        },          
      },
      {
        path: 'BossInfo',
        name: 'BossInfo',
        component: () => import('../views/work/BossInfo.vue')
      },
    ]
  },

  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});




export default router
