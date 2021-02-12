module.exports = {
  
  // devServer:{
  //   proxy: 'http://demo.digisolution.co.th',
  //   port: 5001,
  //   https: true,
  //   hotOnly: false,
  // },
  //lintOnSave: false,
  
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === 'production'
  ? '/bnp/'
  : '/'

 

};
