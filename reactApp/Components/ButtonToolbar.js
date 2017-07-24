
import React from 'react';
import ReactDOM from 'react-dom';



class ButtonToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }
  render() {
    return (
      <div className="btn-toolbar">
          <div className="btn-group">
              <button onClick={() => this.props.onBoldClick()} className="btn">
                  <i className="icon-bold"></i>
              </button>
              <button className="btn"><i className="icon-italic"></i></button>
          <button className="btn"><i className="icon-list"></i></button>
          <button className="btn"><i className="icon-picture"></i></button>
          <button className="btn"><i className="icon-arrow-right"></i></button>
        </div>
        <div className="btn-group">
          <button className="btn"><i className="icon-align-right"></i></button>
          <button className="btn"><i className="icon-align-center"></i></button>
          <button className="btn"><i className="icon-align-left"></i></button>
        </div>
        <div className="btn-group">
          <button className="btn"><i className="icon-eye-open"></i></button>
          <button className="btn"><i className="icon-ok"></i></button>
          <button className="btn"><i className="icon-trash"></i></button>
        </div>
      </div>
    )
  }
}

  export default ButtonToolbar;
