import { getDirname, path } from '@vuepress/utils';
const __dirname = getDirname(import.meta.url);
export const upAndDownPlugin = () => ({
    name: '@nesercode/vuepress-plugin-up-and-down',
    clientConfigFile: path.resolve(__dirname, '../client/config.js'),
});
