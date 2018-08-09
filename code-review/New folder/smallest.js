import React from 'react';
import PropTypes from 'prop-types';
import { Input, DatePicker, Select } from 'antd';
import '../base.css';

export const DataType = {
  Text: 0,
  Number: 1,
  Date: 2,
  Enum: 3,
};
/*
  OSInput support following props:
  key           //the key of the component
  dataType      // the dataType for the data, see definition of DataType
  title         // the title of the component
  message       // the message showing under the input box.
  style         // the style of the component(the container)
  titleStyle    // the style of the title
  messageStyle  // the style of the message
  inputStyle    // the style of the input box.
  inputConfig   // the config for the input part.
  showColon     // if show colon after the title.
  the component have the default style, if caller set the style above, the style provided by caller will be merged with default style.
  inputConfig prop will be passed to antd component directly. So, its structure should follow the document.
  Date:https://ant.design/components/date-picker-cn/
  Number: https://ant.design/components/input-number-cn/
  Text: https://ant.design/components/input-cn/
  following additional properties are supported in the inputConfig.
  Number:
  {
    decimalNumber:2
  }
  Enum:
  {
    dataSource:[{name:"",value:any}]
  }
*/
export default class OSInput extends React.Component {
  getInput(config) {
    return (<Input
      className="normalInlineElement"
      {...config}
      onChange={(e) => { config.onChanged(e.target.value); }}
    />);
  }

  getNumberInput(config) {
    const { decimalNumber } = config;
    const max = (config.max !== undefined && config.max !== null) ? config.max : Infinity;
    const min = (config.min !== undefined && config.min !== null) ? config.min : -Infinity;
    const supportNegtive = max < 0 || min < 0;
    const regex = (decimalNumber !== undefined && decimalNumber !== null && decimalNumber > 0) ?
      `^${supportNegtive ? '-?' : ''}([0-9]+(\\.[0-9]{0,${decimalNumber}})?)?$` :
      `^${supportNegtive ? '-?' : ''}([0-9]*)?$`;
    return (<Input
      className="normalInlineElement"
      {...config}
      onChange={(e) => {
        // validation.
        const valueStr = e.target.value.toString();
        if (valueStr.match(new RegExp(regex)) !== null) {
          let validationResult = (valueStr === '' || valueStr === '-');
          if (!validationResult) {
            const numberValue = config.decimalNumber && config.decimalNumber > 0 ? parseFloat(valueStr) : parseInt(valueStr);
            validationResult = (numberValue >= min && numberValue <= max);
          }

          if (validationResult) {
            config.onChanged(valueStr);
          }
        }
      }}
    />);
  }

  getDatePicker(config) {
    return (<DatePicker
      allowClear={false}
      className="normalInlineElement"
      {...config}
      onChange={(value) => {
      config.onChanged(value);
    }}
    />);
  }

  getSelector(config) {
    const options = config.dataSource.map(x => (<Select.Option key={x.value} value={x.value}>{x.name}</Select.Option>));
    return (
      <Select
        showSearch
        {...config}
        value={config.value === null ? undefined : config.value}
        onChange={((value) => {
        config.onChanged(value);
      })}
      >
        {options}
      </Select>);
  }

  getInputElement(dataType, config) {
    switch (dataType) {
      case DataType.Date:
        return this.getDatePicker(config);
      case DataType.Number:
        return this.getNumberInput(config);
      case DataType.Enum:
        return this.getSelector(config);
      default:
        return this.getInput(config);
    }
  }

  render() {
    const {
      key, dataType, title, message, style, titleStyle, messageStyle, inputStyle,
    } = this.props;
    let { inputConfig, showColon } = this.props;

    const defaultRowHeight = 30;
    const defaultTitleWidth = 100;
    const defaultInputWidth = 200;
    let containerStyle = {};
    if (style !== undefined && style !== null) {
      containerStyle = style;
    }
    let mergedTitleStyle = {
      height: defaultRowHeight, width: defaultTitleWidth, textAlign: 'right', display: 'inline-block',
    };

    const defaultInputStyle = { height: defaultRowHeight, width: defaultInputWidth };
    const mergedInputStyle = Object.assign(defaultInputStyle, inputStyle);
    inputConfig = Object.assign({ style: mergedInputStyle }, inputConfig);


    if (titleStyle !== undefined) {
      mergedTitleStyle = Object.assign(mergedTitleStyle, titleStyle);
    }

    let mergedMessageStyle = {
      paddingLeft: mergedTitleStyle.width, boxSizing: 'border-box', width: '100%', display: 'block',
    };

    if (messageStyle !== undefined) {
      mergedMessageStyle = Object.assign(mergedMessageStyle, messageStyle);
    }

    if (message === undefined || message === null || message.length === 0) {
      mergedMessageStyle.display = 'none';
    }

    if (showColon === undefined) {
      showColon = true;
    }

    const inputElement = this.getInputElement(dataType, inputConfig);
    return (
      <div key={key} style={containerStyle}>
        <div>
          <span style={mergedTitleStyle}>{title}{ showColon ? ':' : '' }</span>
          {inputElement}
        </div>
        <div style={mergedMessageStyle}>
          <span
className="normalInlineElement"
style={{
 wordWrap: 'break-word', width: mergedInputStyle.width, display: 'inline-block', paddingLeft: 20 
}}
          >{message}
          </span>
        </div>
      </div>
    );
  }
}

OSInput.propTypes = {
  key: PropTypes.string.isRequired,
  dataType: PropTypes.oneOf(['Text', 'Number', 'Date', 'Enum']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  messageStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  inputConfig: PropTypes.object,
  showColon: PropTypes.bool,
};
