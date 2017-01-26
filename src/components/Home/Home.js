import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { addOption } from '../../modules/home'

class PollOption extends React.Component {
  render () {
    return (
      <TextField
        hintText='Poll Option'
        onClick={addOption}
      />
    )
  }
}

function handleOptionClick (index, props) {
  if (index === props.options - 1) {
    // add option
    props.addOption()
  }
}

export const Home = (props) => {
  var pollOptions = []
  for (let i = 0; i < props.options; i++){
    pollOptions.push(<PollOption index={i} />)
  }
  var pollList = pollOptions.map((option, i) => {
    return (
      <div key={option.props.index}>
        <TextField
          hintText='Poll Option'
          onClick={() => handleOptionClick(option.props.index, props)}
        /><br />
      </div>
    )
  })
  return (
    <div className='home-container'>
      <div className='container home'>
        <div className='row'>
          <div className='twelve colums'>
            <h1> Create Real Time polls </h1>
            <TextField
              hintText='Type your question here...'
            /><br />
            {pollList}
          </div>
        </div>
      </div>
    </div>
  )
}

/*
class Home extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    var pollOptions = []
    /*
    for (let i = 0; i < props.home.options; i++) {
      pollOptions.push(<PollOption />)
    }
    console.log(pollOptions)
    return (
      <div className='home-container'>
        <div className='container home'>
          <div className='row'>
            <div className='twelve colums'>
              <h1> Create Real Time polls </h1>
              <TextField
                hintText='Type your question here...'
              /><br />

            </div>
          </div>
        </div>
      </div>
    )
    */

export default Home
