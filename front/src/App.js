import React from 'react';
import './App.css';
import { Button } from 'antd';
import ColorPicker from '@/components/ColorPicker/index'
import { Link, Route } from 'react-router-dom'


function A() {
  return (
    <div>
      A
    </div>
  )
}

function B() {
  return (
    <div>
      B
    </div>
  )
}

function App() {
  const change = (color)=>{
    window.less.modifyVars({
      '@primary-color': color
    })
  }
  const test = ()=>{
    fetch('http://localhost:8888/json').then(res => res.json()).then(res => {
      console.log(res)
    })
  }
  return (
    <div className="App">
      <h2>换肤</h2>
      <ColorPicker onChange={change}/>
      <Button onClick={test}>json</Button>
      <Button type="primary">antd按钮</Button>
      <div>
      <Link to='/a'><Button>a</Button></Link>&emsp;
      <Link to='/b'><Button>b</Button></Link>
      </div>
      <br/><br/>
      <Route path='/a' component={A}/>
      <Route path='/b' component={B}/>
    </div>
  )
}

export default App
