import { tap, pipeP, prop, pluck } from 'ramda'
import print from './util/print'
import contentful from './util/contentful'
import render from './util/render'
import write from './util/write'
import Engagement from './components/engagement'

export default pipeP(
  () => contentful.getEntries({ content_type: 'staticContent' }),
  prop('items'),
  pluck('fields'),
  //tap(print),
  engagements => (
    <div>
      {engagements.map(engagment => <Engagement {...engagment} />)}
    </div>
  ),
  render,
  write('engagements.html')
)
