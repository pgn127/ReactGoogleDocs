
import React from 'react';
import ReactDOM from 'react-dom';


    const activeButton = {
      color: '#5890ff',
      cursor: 'pointer',
      border: '1px solid #ddd',
      borderRadius: '3px',
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
            className += activeButton;
          }
//style={className}
          return (
            <button className={this.props.label+' styleButton'} style={this.props.active ? activeButton: {}} onMouseDown={this.onToggle}>
              {/* {this.props.label} */}
            </button>
          );
        }
      }




export default StyleButton;
