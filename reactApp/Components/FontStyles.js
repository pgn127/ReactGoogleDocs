import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton.js'
import { CirclePicker } from 'react-color';
import Popover from 'material-ui/Popover';
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';

var FONT_STYLES = [
  {label: 'icon-bold', style: 'BOLD'},
  {label: 'icon-italic', style: 'ITALIC'},
  {label: 'icon-underline', style: 'UNDERLINE'},
  // {label: 'icon-font', style: 'FONT_COLOR'},
  // {label: 'icon-text-height', style: 'FONT_SIZE'},
];

class FontStyles extends React.Component {
  constructor(props) {
    super(props);
    this.currentStyle = this.props.editorState.getCurrentInlineStyle();
    this.state = {
      colorPickerOpen: false,
      colorPickerButton: null
    }

  }

  openColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    })

  }

  closeColorPicker() {
    this.setState({colorPickerOpen: false})
  }

  colorPicker() {
    return (
      <div style={{display: 'inline-block'}}>
        <button className="icon-font styleButton"
        onClick={this.openColorPicker.bind(this)}
        />
        <Popover
          open={this.state.colorPickerOpen}
          anchorEl={this.state.colorPickerButton}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.closeColorPicker.bind(this)}
        >
        <CirclePicker onChangeComplete={this.props.onFontColorClick.bind(this)} />
        </Popover>
      </div>
    )
  };

  fontSizeIcons() {
    return(
      <div>
        <button className="icon-zoom-in styleButton"
        onClick={this.props.onFontSizeIncreaseClick.bind(this)}
        />
        <button className="icon-zoom-out styleButton"
        onClick={this.props.onFontSizeDecreaseClick.bind(this)}
        />
      </div>
    )
  }

  render() {
    return (
        <div>
            <div className="RichEditor-controls">
                {FONT_STYLES.map(type =>
                    <StyleButton
                        key={type.label}
                        active={this.currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={this.props.onToggle}
                        style={type.style}
                    />
                )}
              {this.colorPicker()}
              {this.fontSizeIcons()}
            </div>
        </div>
    );
  }

}

// const FontStyles = (props) => {
//   var currentStyle = props.editorState.getCurrentInlineStyle();
//   var fontSize = '';
//   var fontColor = '';
//
//   var colorPickerOpen;
//   var colorPickerButton;
//
//   var openColorPicker = function (e) {
//     colorPickerOpen = true;
//     colorPickerButton = e.target;
//   }
//
//   var closeColorPicker = function () {
//     colorPickerOpen = false;
//   }
//
//   var colorPicker = function () {
//     return (
//       <div style={{display: 'inline-block'}}>
//         <button className="icon-font styleButton"
//         onClick={openColorPicker.bind(this)}
//         />
//         <Popover
//           open={colorPickerOpen}
//           anchorEl={colorPickerButton}
//           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//           targetOrigin={{horizontal: 'left', vertical: 'top'}}
//           onRequestClose={closeColorPicker.bind(this)}
//         >
//         <CirclePicker />
//         </Popover>
//       </div>
//     )
//   };
//
//   return (
//       <div>
//           <div className="RichEditor-controls">
//               {FONT_STYLES.map(type =>
//                   <StyleButton
//                       key={type.label}
//                       active={currentStyle.has(type.style)}
//                       label={type.label}
//                       onToggle={props.onToggle}
//                       style={type.style}
//                   />
//               )}
//             {colorPicker()}
//           </div>
//           {/* <input type="text"
//               onChange={(e) => {fontSize = e.target.value;}}
//               onKeyUp={(e) => {
//                   if (e.keyCode === 13) {
//                       props.onFontSizeClick(fontSize);
//                   }
//               }} />
//           <input type="text"
//               onChange={(e) => {fontColor = e.target.value;}}
//               onKeyUp={(e) => {
//                   if (e.keyCode === 13) {
//                       props.onFontColorClick(fontColor);
//                   }
//               }} /> */}
//       </div>
//   );
// };

export default FontStyles;
