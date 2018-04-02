import { find, propEq } from 'ramda'
import staticContent from '../../data/staticContent.json'

export default () => find(propEq('location', 'Biography'), staticContent)
