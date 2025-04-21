import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import viteCompression from 'vite-plugin-compression';

const { resolve } = require("path");

export default defineConfig({
    plugins: [
        vue(),
        // viteCompression({
        //     threshold: 10240, // 设置只有大于 10kb 的文件才会被压缩, 单位b
        //     // 其他的属性暂不需要配置，使用默认即可；
        //     // 详细配置查看 https://github.com/vbenjs/vite-plugin-compression/blob/main/README.zh_CN.md
        // })
    ],
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
