import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'

function ColorPicker(props) {
    // function getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.color && nextProps.color !== prevState.color) {
    //         return {
    //             color: nextProps.color
    //         }
    //     }
    //     return null
    // }

    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState('')

    const handleClick = () => {
      setDisplayColorPicker(!displayColorPicker)
    }

    const handleClose = () => {
      setDisplayColorPicker(false)
    }

    const handleChange = (color) => {
        props.onChange(color.hex)
        setColor(color.hex)
    };
    const styles = {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      },
    }
    return (
      <div style={{ lineHeight: '15px' }}>
        <div style={styles.swatch} onClick={handleClick}>
          <div style={styles.color} />
        </div>
        {displayColorPicker ? <div style={styles.popover}>
          <div style={styles.cover} onClick={handleClose} />
          <SketchPicker {...props} color={color} onChange={handleChange} />
        </div> : null}
      </div>
    )
}
ColorPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func,
  presetColors: PropTypes.array,
  disableAlpha:PropTypes.bool,
}

ColorPicker.defaultProps = {
  color: '',
  onChange: () => { },
  presetColors: [
      '#F5222D',
      '#FA541C',
      '#FA8C16',
      '#FAAD14',
      '#FADB14',
      '#A0D911',
      '#52C41A',
      '#13C2C2',
      '#1890FF',
      '#2F54EB',
      '#722ED1',
      '#EB2F96',
  ],
  disableAlpha:true   //禁用rgba
}

export default ColorPicker