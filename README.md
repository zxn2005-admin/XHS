# XHS 平台 - 小红书风格社交平台

一个基于 Vue 3 + Vite 开发的仿小红书风格社交平台前端项目。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Vue Router 4** - 官方路由管理器
- **Pinia** - 状态管理库
- **Element Plus** - 基于 Vue 3 的组件库
- **Axios** - HTTP 客户端
- **Sass/SCSS** - CSS 预处理器

## 项目结构

```
XHS/
├── src/
│   ├── components/     # 公共组件
│   │   ├── NoteCard.vue      # 笔记卡片组件
│   │   ├── SearchBar.vue     # 搜索栏组件
│   │   └── UserAvatar.vue    # 用户头像组件
│   ├── layouts/        # 布局组件
│   │   └── Layout.vue        # 主布局
│   ├── router/         # 路由配置
│   │   └── index.js          # 路由定义
│   ├── stores/         # Pinia 状态管理
│   │   ├── noteStore.js      # 笔记状态
│   │   └── userStore.js      # 用户状态
│   ├── styles/         # 样式文件
│   │   ├── style.css         # 全局样式
│   │   └── variables.scss    # SCSS 变量
│   ├── utils/          # 工具函数
│   │   └── request.js        # 请求封装
│   ├── views/          # 页面视图
│   │   ├── Home.vue          # 首页
│   │   ├── Login.vue         # 登录页
│   │   ├── Register.vue      # 注册页
│   │   ├── Profile.vue       # 个人中心
│   │   ├── NoteDetail.vue    # 笔记详情
│   │   ├── Publish.vue       # 发布笔记
│   │   └── Search.vue        # 搜索页
│   ├── App.vue         # 根组件
│   └── main.js         # 入口文件
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
└── Dockerfile          # Docker 构建文件
```

## 功能特性

- 用户注册与登录
- 笔记浏览与搜索
- 笔记详情查看
- 发布新笔记
- 个人中心管理
- 响应式布局设计

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## Docker 部署

### 构建镜像

```bash
docker build -t xhs-platform .
```

### 运行容器

```bash
docker run -d -p 8080:80 xhs-platform
```

访问 http://localhost:8080 查看应用

## 开发规范

- 组件使用 PascalCase 命名
- 页面视图放在 `views` 目录
- 公共组件放在 `components` 目录
- 使用 `@` 别名指向 `src` 目录
- 样式使用 SCSS 预处理器

## 许可证

MIT
