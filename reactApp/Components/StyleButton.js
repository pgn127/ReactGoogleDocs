
import React from 'react';
import ReactDOM from 'react-dom';


    const inlineControls = {
      fontFamily: 'Helvetica',
      fontSize: '14px',
      marginBottom: '5px',
      userSelect: 'none',
    }

    const styleButton = {
      color: '#999',
      cursor: 'pointer',
      marginRight: '16px',
      paddingTop: '2px',
      paddingLeft:  0,
      display: 'inline-block',
      border: '1px solid #ddd',
      borderRadius: '5px'
    }

    const activeButton = {
      color: '#5890ff',
      cursor: 'pointer',
      marginRight: '16px',
      paddingTop: '2px',
      paddingLeft:  0,
      display: 'inline-block',
      border: '1px solid #ddd',
      borderRadius: '5px',
  }

  class StyleButton extends React.Component {
        constructor() {
          super();
          this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
          };
        }

        render() {
          let className = this.props.label;
          if (this.props.active) {
            className = activeButton;
          }
//style={className}
          return (
            <button className={this.props.label} onMouseDown={this.onToggle}>
              {/* {this.props.label} */}
            </button>
          );
        }
      }




export default StyleButton;
