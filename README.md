# 3Dmap Project

这是一个基于 **Vue 2** + **TypeScript** + **Babylon.js** 的轻量级 3D 地图可视化项目。

## 🚀 快速开始 (Quick Start)

只需简单三步，即可在本地运行本项目。

### 1. 克隆项目 (Clone)
```bash
git clone <repository-url>
cd 3Dmap
```

### 2. 安装依赖 (Install)
确保您的环境已安装 Node.js (推荐 v14+)。
```bash
npm install
```

### 3. 运行项目 (Run)
启动本地开发服务器。
```bash
npm run serve
```
启动成功后，访问控制台输出的地址（通常是 `http://localhost:8080`）即可预览 3D 地图效果。

---

## 📂 项目结构

核心文件说明，方便您快速上手修改：

- `public/sceneConfig.js`: **全局配置文件**。修改此处可调整地图颜色、相机视角、背景色等，无需重新打包。
- `src/resources/`: **地图数据**。存放 GeoJSON 数据（如 `China.json`）和城市建筑数据。
- `src/components/index.ts`: **核心逻辑**。地图的初始化、渲染和交互逻辑主要在此处。
- `src/scene/`: **3D 场景工厂**。
  - `MeshFactory.ts`: 负责生成 3D 网格（地图块、建筑等）。
  - `MaterialFactory.ts`: 负责材质和纹理处理。

## 🛠 常用命令

- `npm run serve`: 启动开发服务器（热重载）。
- `npm run build`: 构建生产环境代码（输出到 `dist/` 目录）。
- `npm run lint`: 代码风格检查与修复。

## 📦 技术栈

- **Core**: Vue.js 2.x, TypeScript
- **3D Engine**: Babylon.js 6.x
- **Build**: Webpack (Vue CLI)

---

> 注意：本项目为纯前端项目，无需后端服务支持。所有地图数据均为本地 JSON 文件。
