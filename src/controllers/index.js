import * as views from '../views' 
import home from './home'
import biography from './biography'
import engagements from './engagements'

export default path => ([
  [ path, views.home, home() ],
  [ path + 'biography/', views.biography, biography() ],
  ...engagements(path + 'engagements'),
])
