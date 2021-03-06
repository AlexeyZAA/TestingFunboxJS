import React from 'react'
import Footercontent from './Footercontent'
import LayoutmapContaner from './LayoutmapContaner'
import { Layout } from 'antd'
import './Layout.css'
import 'antd/dist/antd.css'

const { Header, Footer } = Layout

function Layoutapp(props) {
  return (
    <Layout className={'lay'}>
      <Header className={'head'}>
        <h1>
          <span className={'headtext'}>Построение маршрута</span>
        </h1>
      </Header>
      <LayoutmapContaner />
      <Footer className={'foot'}>
        <Footercontent firstName='Алексей' lastName='Зубенко' />
      </Footer>
    </Layout>
  )
}

export default Layoutapp
