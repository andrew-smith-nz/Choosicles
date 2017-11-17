import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
  .configure({ host: '192.168.159.128' }) // controls connection & communication settings
  .use(asyncStorage())
  .connect() // let's connect!
