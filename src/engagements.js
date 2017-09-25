import { pipe, prop } from 'ramda'
import render from './util/render'
import write from './util/write'
import Engagement from './components/engagement'

export default pipe(
  prop('engagements'),
  engagements => (
    <ul className="engagements">
      {engagements.map(engagment => <Engagement key={engagment.id} {...engagment} />)}
    </ul>
  ),
  render,
  write('build/engagements.html')
)
