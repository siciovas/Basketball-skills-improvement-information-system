import pkg from 'fs-extra';
const { existsSync, unlinkSync, copySync } = pkg;

const webConfigPath = './dist/web.config';

if (existsSync(webConfigPath)) {
    unlinkSync(webConfigPath);
}

copySync('./iisConfig/web.config', webConfigPath);