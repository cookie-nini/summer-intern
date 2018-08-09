import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import Loading from '../Common/components/Loading';
import { DataType } from '../Common/components/OSInput';
import { getPropertyValue, setPropertyValue } from '../Common/util';
import handleError from '../Common/errorHandlingUtil';
import SlaRecord from './models/slaRecord';
import './slaModificationModal.css';
import SLAPropertyEditorList from './components/SLAEdiotr';
import SLAServiceProxy from './slaServiceProxy';

const percentConfig = { min: -100, max: 100, decimalNumber: 2 };
const positiveIntegerConfig = { min: 0, max: Infinity };
const negativeIntegerConfig = { min: -Infinity, max: 0 };
const multipleValueHint = 'The selected item contain different values for this input. To edit and set all items for this input to same value.';
const nullValueHint = 'All selected items are null for this input, To edit and set all items to the same value for this input.';
const invalidDateHint = 'Date applicable from should be earlier than Date applicable to.';
const emptyDataHint = 'Please input valid data.(Blank is not acceptable.)';
const loadingText = 'Submitting Data...';
export default class SLAModificationModal extends React.Component {
  constructor(props) {
    super(props);
    this.slaService = new SLAServiceProxy();
    this.state = {
      loading: false,
      dataChanged: false,
      propertyViewModels: [
        {
          name: 'actualTime.downtime',
          dataType: DataType.Number,
          title: 'Downtime',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'actualTime.responseTime',
          dataType: DataType.Number,
          title: 'Response Time',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'firstCallCompletion',
          dataType: DataType.Number,
          title: 'First Call Competion(%)',
          isMultipleValue: false,
          value: null,
          message: null,
          config: percentConfig,
        },
        {
          name: 'PMItem.acceptRangeMinus',
          dataType: DataType.Number,
          title: 'PM Accept.Range Minus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: negativeIntegerConfig,
        },
        {
          name: 'PMItem.acceptRangePlus',
          dataType: DataType.Number,
          title: 'PM Acceptance Range Plus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'PMItem.onTimeCompletion',
          dataType: DataType.Number,
          title: 'On Time PM Completion(%)',
          isMultipleValue: false,
          value: null,
          message: null,
          config: percentConfig,
        },
        {
          name: 'CalsItem.acceptRangeMinus',
          dataType: DataType.Number,
          title: 'Calibrations Accept.Range Minus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: negativeIntegerConfig,
        },
        {
          name: 'CalsItem.acceptRangePlus',
          dataType: DataType.Number,
          title: 'Calibrations Accepetence Range Plus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'CalsItem.onTimeCompletion',
          dataType: DataType.Number,
          title: 'On Time Calibrations Completion(%)',
          isMultipleValue: false,
          value: null,
          message: null,
          config: percentConfig,
        },
        {
          name: 'QuaItem.acceptRangeMinus',
          dataType: DataType.Number,
          title: 'Qualifications Acceptance Range Minus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: negativeIntegerConfig,
        },
        {
          name: 'QuaItem.acceptRangePlus',
          dataType: DataType.Number,
          title: 'Qualifications Acceptance Range Plus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'QuaItem.onTimeCompletion',
          dataType: DataType.Number,
          title: 'On Time Qualifications Completion(%)',
          isMultipleValue: false,
          value: null,
          message: null,
          config: percentConfig,
        },
        {
          name: 'ChkItem.acceptRangeMinus',
          dataType: DataType.Number,
          title: 'Checks Acceptance Range Minus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: negativeIntegerConfig,
        },
        {
          name: 'ChkItem.acceptRangePlus',
          dataType: DataType.Number,
          title: 'Checks Acceptance Range Plus',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'ChkItem.onTimeCompletion',
          dataType: DataType.Number,
          title: 'On Time Checks Completion(%)',
          isMultipleValue: false,
          value: null,
          message: null,
          config: percentConfig,
        },
        {
          name: 'contractedTime.downtime',
          dataType: DataType.Number,
          title: 'Contracted Reponse',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'contractedTime.responseTime',
          dataType: DataType.Number,
          title: 'Contracted Downtime',
          isMultipleValue: false,
          value: null,
          message: null,
          config: positiveIntegerConfig,
        },
        {
          name: 'scheduledServicesDueWithinMonth',
          dataType: DataType.Enum,
          title: 'Scheduled Services Due Within Month',
          isMultipleValue: false,
          value: null,
          message: null,
          config: { dataSource: [{ name: 'Blank', value: false }, { name: 'Yes', value: true }] },
        },
        {
          name: 'applicableFromMoment',
          dataType: DataType.Date,
          title: 'Date applicable from',
          isMultipleValue: false,
          value: null,
          message: null,
        },
        {
          name: 'applicableToMoment',
          dataType: DataType.Date,
          title: 'Date applicable to',
          isMultipleValue: false,
          value: null,
          message: null,
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.refreshPropertyViewModels(nextProps.editingRecords);
    }
  }

  onStartEditing(name) {
    const { propertyViewModels } = this.state;
    const propertyViewModel = propertyViewModels.filter(item => (item.name === name))[0];
    if (!propertyViewModel.message) {
      if (propertyViewModel.isMultipleValue) {
        propertyViewModel.message = multipleValueHint;
      } else if (propertyViewModel.value === null || propertyViewModel.value === '') {
        propertyViewModel.message = nullValueHint;
      }

      if (propertyViewModel.message) {
        this.setState({ propertyViewModels });
      }
    }
  }

  getDefaultMessage(propertyViewModel) {
    if (propertyViewModel.isMultipleValue) {
      return propertyViewModel.message ? multipleValueHint : null;
    } else if (propertyViewModel.oriValue === null || propertyViewModel.oriValue === '') {
      return propertyViewModel.message ? nullValueHint : null;
    }

    return null;
  }

  refreshPropertyViewModels(editingRecords) {
    // regenerate the property view models based on the new editing records collection.
    const { propertyViewModels } = this.state;
    propertyViewModels.forEach((item) => {
      const propertyViewModel = item;
      propertyViewModel.message = null;
      propertyViewModel.isMultipleValue = false;
      editingRecords.forEach((record, index) => {
        propertyViewModel.validData = true;// indicate if the property value is valid, set to true by default.
        const propertyValue = getPropertyValue(record, propertyViewModel.name);
        if (index === 0) {
          propertyViewModel.oriValue = propertyValue;
          propertyViewModel.value = propertyValue;
        } else if (propertyViewModel.value !== propertyValue) {
          propertyViewModel.value = null;
          propertyViewModel.oriValue = null;
          propertyViewModel.isMultipleValue = true;
        }
      });
    });

    this.setState({ propertyViewModels, dataChanged: false });
  }

  updatePropertyValue(name, value) {
    const { propertyViewModels } = this.state;
    const propertyViewModel = propertyViewModels.filter(item => (item.name === name))[0];
    propertyViewModel.validData = true;
    propertyViewModel.value = value;
    propertyViewModel.message = this.getDefaultMessage(propertyViewModel);

    if (name === 'applicableFromMoment' || name === 'applicableToMoment') {
      const fromMomentViewModel = propertyViewModels.filter(item => (item.name === 'applicableFromMoment'))[0];
      const toMomentViewModel = propertyViewModels.filter(item => (item.name === 'applicableToMoment'))[0];
      fromMomentViewModel.message = this.getDefaultMessage(fromMomentViewModel);
      toMomentViewModel.message = this.getDefaultMessage(toMomentViewModel);
      if (fromMomentViewModel.value || toMomentViewModel.value) {
        if (!fromMomentViewModel.value) {
          fromMomentViewModel.message = invalidDateHint;
          fromMomentViewModel.validData = false;
        }

        if (!toMomentViewModel.value) {
          toMomentViewModel.message = invalidDateHint;
          toMomentViewModel.validData = false;
        }

        if (toMomentViewModel.value && fromMomentViewModel.value && toMomentViewModel.value.isBefore(fromMomentViewModel.value)) {
          propertyViewModel.message = invalidDateHint;
          propertyViewModel.validData = false;
        }
      }
    } else if (!value || value === '' ||
               (propertyViewModel.dataType === DataType.Number && isNaN(parseInt(value, 10)) && isNaN(parseFloat(value)))) {
      propertyViewModel.message = emptyDataHint;
      propertyViewModel.validData = false;
    }

    this.setState({ propertyViewModels, dataChanged: true });
  }

  handleCancel() {
    this.props.onClose();
  }

  handleSubmit() {
    const { propertyViewModels } = this.state;
    const { editingRecords } = this.props;
    const updatedFields = Object.create(SlaRecord.prototype);
    const slaIds = this.props.editingRecords.map(x => x.id);
    const changedProperties = [];
    propertyViewModels.forEach((item) => {
      if (item.oriValue !== item.value) {
        changedProperties.push(item.name);
        setPropertyValue(updatedFields, item.name, item.value);
      }
    });

    const batchUpdateRequest = { SLAIds: slaIds, SLAUpdateFields: updatedFields };
    this.setState({ loading: true, loadingHint: loadingText });
    this.slaService.submitSLAModification(batchUpdateRequest)
      .then(() => {
        this.setState({ loading: false });

        // update the editing records in memory.
        changedProperties.forEach((name) => {
          const newValue = propertyViewModels.filter(x => (x.name === name))[0].value;
          editingRecords.forEach((item) => {
            setPropertyValue(item, name, newValue);
          });
        });
        this.props.onCompleteEditing();
        this.props.onClose();
      })
      .catch((error) => {
        this.setState({ loading: false });
        handleError(error);
      });
  }

  render() {
    const {
      loading, loadingHint, propertyViewModels, dataChanged,
    } = this.state;
    const allowSubmit = dataChanged && propertyViewModels.reduce((first, second) => ({ validData: first.validData && second.validData })).validData;
    return (
      <Modal
        destroyOnClose
        wrapClassName="vertical-center-modal new_modal"
        title={<div className="img_container"><img className="edit_img" src={require('../Resources/images/icon_edit.png')} alt="" />Edit Entry</div>}
        visible={this.props.visible}
        onCancel={() => { this.handleCancel(); }}
        onOk={() => { this.handleSubmit(); }}
        footer={[
          <Button key="back" onClick={() => { this.handleCancel(); }}>Cancel</Button>,
          <Button key="submit" type="primary" disabled={!allowSubmit} onClick={() => { this.handleSubmit(); }}>Update</Button>,
                    ]}
      >
        <Loading isLoading={loading} hint={loadingHint} />
        <SLAPropertyEditorList
          propertyViewModels={propertyViewModels}
          onStartEditing={(name) => {
            this.onStartEditing(name);
          }}
          onPropertyValueChanged={(propertyName, value) => {
            this.updatePropertyValue(propertyName, value);
          }}
        />
      </Modal>);
  }
}

SLAModificationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  editingRecords: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired.isRequired,
  onCompleteEditing: PropTypes.func.isRequired,
};