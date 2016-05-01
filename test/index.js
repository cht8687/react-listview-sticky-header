import React from 'react'
import test from 'tape'
import ListHeader from '../src/lib/ListHeader'
import ListItems from '../src/lib/ListItems'
import ReactListView from '../src/ReactListView'
import { data } from './data'
import { styles } from './style'
import { shallow } from 'enzyme'

test('----- React Component Tests: ReactListView -----', t => {
  t.plan(3)
  const app = shallow(<ReactListView data={data} headerAttName='headerName'itemsAttName='items' styles={styles} />)
  t.ok(ReactListView instanceof Function, 'should be function')
  t.equal(5, app.find(ListHeader).length)
  t.equal(5, app.find(ListItems).length)
  t.end()
})

test('----- React Component Tests: ListHeader -----', t => {
  t.ok(ListHeader instanceof Function, 'should be function')
  t.end()
})

test('----- React Component Tests: ListItems -----', t => {
  t.ok(ListItems instanceof Function, 'should be function')
  t.end()
})
