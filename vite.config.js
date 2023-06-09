import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "src")
            }
        ]
    },
    server: {
        open: true,
        cors: true,
        proxy: {
            "/apii": {
                target: "http://124.223.59.64:8083/checkNews",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ""),
                bypass: function (req, res, proxyOptions) {
                    // 在这里修改请求头
                    req.headers["Content-Type"] = "application/raw";
                    req.headers["Authorization"] = "18e9e259-8c8a-438b-aa33-a2ef6fdff16c";
          
                    // 携带数据
                    const requestData = {
                      // 添加你要携带的数据字段
                      key: ""
                    };
                    req.body = JSON.stringify(requestData);
          
                    // 返回 null 表示继续使用代理默认行为
                    return null;
                  },
            }
        }
    },
    /* 打包配置 */
    base: "./",
    build: {
        brotliSize: false,
        emptyOutDir: false,
        outDir: "dist",
        assetsDir: "static"
    }
});
