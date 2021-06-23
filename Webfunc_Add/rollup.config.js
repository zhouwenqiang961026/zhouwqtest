import babel from "rollup-plugin-babel";
import { terser } from 'rollup-plugin-terser';
export default {
    input: './src/index.js',
    output: {
        file: './dist/index.js',
        format: 'umd',
        name: 'com.yindangu.vplatform.function.client.add',
        sourcemap: false
    },
    plugins: [
        babel({
            runtimeHelpers: true
        }),
        terser()
    ]
};