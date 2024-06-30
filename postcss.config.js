import postcssJitProps from 'postcss-jit-props';
import openProps from 'open-props';
import postcssPresetEnv from 'postcss-preset-env';

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: [
        postcssJitProps(openProps),
        postcssPresetEnv(),
    ]
}

export default config;