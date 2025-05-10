import type { RouteRecordRaw } from 'vue-router'

export default Array.from({ length: 1 }).map((_, index) => ({
  path: `/demo${index || ''}`,
  name: `Demo${index || ''}`,
  meta: {
    title: '演示页面',
    icon: 'AppstoreOutlined',
    sort: 20,
  },
  children: [
    {
      path: 'editor',
      name: `Editor`,
      component: () => import('@/views/demo/Editor.vue'),
      meta: {
        title: '富文本',
        icon: 'EditOutlined',
      },
    },
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('@/views/demo/Upload.vue'),
      meta: {
        title: '文件上传',
        icon: 'UploadOutlined',
      },
    },
    {
      path: 'firework',
      name: 'Firework',
      component: () => import('@/views/demo/Firework.vue'),
      meta: {
        title: '烟花组件',
        icon: 'FireOutlined',
      },
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => import('@/views/demo/Echarts.vue'),
      meta: {
        title: 'Echarts图表',
        icon: 'BarChartOutlined',
      },
    },
    {
      path: 'icon',
      name: 'Icon',
      component: () => import('@/views/demo/Icon.vue'),
      meta: {
        title: '图标',
        icon: 'FontColorsOutlined',
      },
    },
    {
      path: 'higlight',
      name: 'Higlight',
      component: () => import('@/views/demo/Higlight.vue'),
      meta: {
        title: '代码高亮',
        icon: 'CodeOutlined',
      },
    },
    {
      path: 'tab',
      name: 'Tab',
      component: () => import('@/views/demo/Tab.vue'),
      meta: {
        title: '标签页',
        icon: 'BranchesOutlined',
      },
    },
    {
      path: 'locale',
      name: 'Locale',
      component: () => import('@/views/demo/Locale.vue'),
      meta: {
        title: '国际化',
        icon: 'GlobalOutlined',
      },
    },
    {
      path: 'bpmn',
      name: 'Bpmn',
      component: () => import('@/views/demo/Bpmn.vue'),
      meta: {
        title: 'Bpmn流程图',
        icon: 'ProjectOutlined',
      },
    },
    {
      path: 'simplebar',
      name: 'Simplebar',
      component: () => import('@/views/demo/Simplebar.vue'),
      meta: {
        title: '滚动条',
        icon: 'SlidersOutlined',
      },
    },
    {
      path: 'test',
      name: 'Test',
      component: () => import('@/views/demo/Test.vue'),
      meta: {
        title: '测试',
        icon: 'BugOutlined',
        layout: 'empty',
      },
    },
    {
      path: 'drag',
      name: 'Drag',
      component: () => import('@/views/demo/Drag.vue'),
      meta: {
        title: '拖拽',
        icon: 'DragOutlined',
      },
    },
    {
      path: 'multi-menu',
      name: 'MultiMenu',
      meta: {
        title: '多级菜单',
        icon: 'MenuOutlined',
      },
      children: [
        {
          path: 'child1',
          name: 'Child1',
          component: () => import('@/views/demo/Test.vue'),
          meta: {
            title: '子菜单1',
            icon: 'MenuOutlined',
          },
        },
        {
          path: 'child2',
          name: 'Child2',
          meta: {
            title: '子菜单2',
            icon: 'MenuOutlined',
          },
          children: [
            {
              path: 'child2-1',
              name: 'Child2-1',
              component: () => import('@/views/demo/Test.vue'),
              meta: {
                title: '子菜单2-1',
                icon: 'MenuOutlined',
              },
            },
            {
              path: 'child2-2',
              name: 'Child2-2',
              component: () => import('@/views/demo/Test.vue'),
              meta: {
                title: '子菜单2-2',
                icon: 'MenuOutlined',
              },
            },
          ],
        },
      ],
    },
    // ...Array.from({ length: 10 }).map((_, index) => ({
    //   path: `test${index}`,
    //   name: `Test${index}`,
    //   component: () => import('@/views/demo/Test.vue'),
    //   meta: {
    //     title: `测试${index}`,
    //     icon: 'BugOutlined',
    //   },
    // })),
  ],
})) as RouteRecordRaw[]
