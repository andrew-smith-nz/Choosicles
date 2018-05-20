import Reactotron, { asyncStorage } from 'reactotron-react-native'

Reactotron
  .configure({ host: '10.0.0.4' }) // controls connection & communication settings
  .use(asyncStorage())
  .connect() // let's connect!
