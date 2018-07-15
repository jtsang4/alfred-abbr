import pkg from './package.json'

export default 	{
  input: 'src/index.js',
  external: ['alfy', 'querystring'],
  output: [
    { file: pkg.main, format: 'cjs' },
  ]
}