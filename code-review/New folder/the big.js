import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import OSInput from '../../Common/components/OSInput';
import './SLAEditor.css';

export default class SLAPropertyEditorList extends React.Component {
  render() {
    const itemInputContainer = {
      marginBottom: '15px',
      marginLeft: '50px',
    };
    const itemTitle = {
      fontSize: '14px',
      color: 'rgb(102, 102, 102)',
      width: '260px',
      textAlign: 'right',
      height: '40px',
      paddingTop: '11px',
    };
    const inputNotice = {
      fontSize: '14px',
      lineHeight: '16px',
      color: 'rgb(0, 131, 181)',
      marginTop: '5px',
      marginLeft: '8./. x',
      textAlign: 'left',
    };
    const itemInput = {
      width: '400px',
      border: '1px solid rgb(212, 212, 212)',
      borderRadius: '5px',
    };

    const { propertyViewModels } = this.props;

    const propertyEditors = propertyViewModels.map((item) => {
      let mergedConfig = {
        onChanged: (value) => {
          this.props.onPropertyValueChanged(item.name, value);
        },
        onFocus: () => {
          this.props.onStartEditing(item.name);
        },
        value: item.value,
        placeholder: (item.isMultipleValue ? 'Multiple Value' : ''),
      };
      mergedConfig = Object.assign(mergedConfig, item.config);

      return (<OSInput
        key={item.name}
        style={itemInputContainer}
        dataType={item.dataType}
        title={item.title}
        message={item.message}
        titleStyle={itemTitle}
        messageStyle={inputNotice}
        inputStyle={itemInput}
        inputConfig={mergedConfig}
      />);
    });

    return (
      <div className="main_box">
        {propertyEditors}
      </div>
    );
  }
}

SLAPropertyEditorList.propTypes = {
  propertyViewModels: PropTypes.array.isRequired,
  onPropertyValueChanged: PropTypes.func.isRequired,
  onStartEditing: PropTypes.func.isRequired,
};