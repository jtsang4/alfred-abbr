import alfy from 'alfy'
import { query } from './api'

query(alfy.input).then(data => {
  alfy.output(data)
})