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
            '/api': {
                // pathRewrite: {                   //路径重写
                //     '/api': ''                     //选择忽略拦截器里面的单词
                // },
                target: "https://localhost:3000", //跨域地址
                ws:true,//代理websocked
                changeOrigin:true, //支持跨域
                rewrite: (path) => {
                    console.log('999')
                    return path.replace(/^\/api/, " ")
                },//重写路径,替换/api

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
