const config = {
  mode: process.env.NODE_ENV == 'development' ? 'exploit' : 'onLine',
  exploit:{
    baseUrl: "http://192.168.7.219:9277/",
  },
  onLine:{
    baseUrl: "http://192.168.7.219:9277/",
  }
}

export default {
  ...config[config.mode],
  mode: config.mode
}
