
import React from 'react';
import ReactDOM from 'react-dom';



// class ButtonToolbar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//
//     };
//
//   }
//   render() {
//     return (
//       <div className="btn-toolbar">
//           <div className="btn-group">
//               <button onClick={() => this.props.onBoldClick()} className="btn">
//                   <i className="icon-bold"></i>
//               </button>
//               <button className="btn"><i className="icon-italic"></i></button>
//           <button className="btn"><i className="icon-list"></i></button>
//           <button className="btn"><i className="icon-picture"></i></button>
//           <button className="btn"><i className="icon-arrow-right"></i></button>
//         </div>
//         <div className="btn-group">
//           <button className="btn"><i className="icon-align-right"></i></button>
//           <button className="btn"><i className="icon-align-center"></i></button>
//           <button className="btn"><i className="icon-align-left"></i></button>
//         </div>
//         <div className="btn-group">
//           <button className="btn"><i className="icon-eye-open"></i></button>
//           <button className="btn"><i className="icon-ok"></i></button>
//           <button className="btn"><i className="icon-trash"></i></button>
//         </div>
//       </div>
//     )
//   }
// }



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
