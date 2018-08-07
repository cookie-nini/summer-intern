import React from 'react';
import {Modal,Button} from 'antd';
import Loading from '../Common/components/Loading'     //加载的图标
import { DataType } from '../Common/components/OSInput'; //input的类型，因为这个父组件要管理数据，所以要初始化所有的字段
import { getPropertyValue, setPropertyValue } from '../Common/util'; //前一个函数用于获取json格式中带点名字的拆成正确格式，后一个函数用于合成
import handleError from '../Common/errorHandlingUtil'; //处理错误
import SlaRecord from './models/slaRecord'; //？？？？
import './slaModificationModal.css';
import SLAPropertyEditorList from './components/SLAEdiotr';
import SLAServiceProxy from './slaServiceProxy'; //封装处理ajax请求

/*处理简单的数据验证*/
const percentConfig = { min: -100, max: 100, decimalNumber: 2 };
const positiveIntegerConfig = { min: 0, max: Infinity };
const negativeIntegerConfig = { min: -Infinity, max: 0 };
/*notice*/
const multipleValueHint = 'The selected item contain different values for this input. To edit and set all items for this input to same value.';
const nullValueHint = 'All selected items are null for this input, To edit and set all items to the same value for this input.';
const invalidDateHint = 'Date applicable from should be earlier than Date applicable to.';
const emptyDataHint = 'Please input valid data.(Blank is not acceptable.)';
/*提交时显示的加载文字*/
const loadingText = 'Submitting Data...';

export default class SLAModificationModal extends React.Component{
	constructor(props){
		super(props);
		this.slaService=new SLAServiceProxy(); //???
		this.state={
			loading:false,
			dataChanged:false,  //用于标记数据在edit界面是否被用户更改过
			propertyViewModels:[
        {
          name: 'actualTime.downtime', //相当于id，在和后台传递数据时唯一标识该数据
          dataType: DataType.Number,
          title: 'Downtime',
          isMultipleValue: false,
          value: null,
          message: null, //就是每个input下面可能出现的notice
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
        }],
	};		
}

/*组件生命周期方法，在组件接受到一个新的prop（更新后）时被调用。这个方法在初始化render时不会被调用
参数nextprops是父组件更新后的props*/
	componentWillReceiveProps(nextProps){
		if(nextProps.visible){
			this.refreshPropertyViewModels(nextProps.editingRecords);
		}
	}
	/*设置multiple value和null value的notice*/
	onStartEditing(name){
		const {propertyViewModels}=this.state;  //解构赋值？？？？？
		const propertyViewModel=propertyViewModels.filter(item=>{item.name==name})[0];
		if(!propertyViewModel.message){
			if(propertyViewModel.isMultipleValue){
				propertyViewModel.message=multipleValueHint;
			}else if(propertyViewModel.value===null||propertyViewModel.value===''){
				propertyViewModel.message=nullValueHint;
			}
			//可以有这样的逻辑吗？？？已经在if(!propertyViewModel.message)
			if(propertyViewModel.message){
				this.setState({propertyViewModels});
			}
		}
	}
	/*这段和上一段的作用不是一样吗？emmm好像是专门用来初始化message的。orivalue又是在哪定义的*/
	getDeafaultMessage(propertyViewModel){
		if(propertyViewModel.isMultipleValue){
			return propertyViewModel.message?multipleValueHint:null;
		}else if(propertyViewModel.oriValue===null||propertyViewModel.oriValue===''){
			return propertyViewModel.message?nullValueHint:null;
		}
		
		return null;
	}
	
	/*根据传进来的records初始化edit界面的数据部分*/
	refreshPropertyViewModels(editingRecords){
		const {propertyViewModels}=this.state;
		propertyViewModels.forEach(item=>{
			const propertyViewModel=item;
			propertyViewModel.message=null;
			propertyViewModel.isMultipleValue=false;
			editingRecords.forEach((record,index)=>{
				propertyViewModel.validData=true; //每条记录都有全部的propertyViewModel
				const propertyValue=getPropertyValue(record,propertyViewModel.name);
				if(index===0){
					propertyViewModel.oriValue=propertyValue;
					propertyViewModel.value=propertyValue; //？？？？这个函数得到的不是名字而已嘛
				}else if(propertyViewModel.value!=propertyValue){
					propertyViewModel.value=null;
					propertyViewModel.oriValue=null;
					propertyViewModel.isMultipleValue=true;
				}
			});
		});
		this.setState({propertyViewModels,dataChanged:false});
	}
	
	/*根据用户的输入更新edit界面的数据，并且进一步验证*/
	updataPropertyValue(name,value){
		const {propertyViewModels}=this.state;
		const propertyViewModel=propertyViewModels.filter(item=>{item.name===name})[0];
		propertyViewModel.validData=true;
		propertyViewModel.value=value;
		propertyViewModel.message=this.getDeafaultMessage(propertyViewModel);
		
		if(name==='applicableFromMoment'||name==='applicableToMoment'){
			const fromMomentViewModel=propertyViewModels.filter(item=>{item.name==='applicableFromMoment'})[0];
			const toMomentViewModel=propertyViewModels.filter(item=>{item.name==='applicableToMoment'})[0];
			//因为用户可以多次更改同一个属性字段，所以每次更改的时候都要重新初始化
			fromMomentViewModel.message=this.getDeafaultMessage(fromMomentViewModel);
			toMomentViewModel.message=this.getDeafaultMessage(toMomentViewModel);
			if(fromMomentViewModel.value||toMomentViewModel.value){
				if(!fromMomentViewModel){
					fromMomentViewModel.message=invalidDateHint;
					fromMomentViewModel.validData=false;
				}
				
				if(!toMomentViewModel.value){
					toMomentViewModel.message=invalidDateHint;
					toMomentViewModel.validData=false;
				}
				
				if(toMomentViewModel.value&&fromMomentViewModel.value&&toMomentViewModel.value.isBefore(fromMomentViewModel.value)){
					propertyViewModel.message=invalidDateHint;
					propertyViewModel.validData=false;
				}
			}
		}else if(!value||value===''||(propertyViewModel.dataType===dataType.Number&&isNaN(parseInt(value, 10)) && isNaN(parseFloat(value)))){
			propertyViewModel.message=emptyDataHint;
			propertyViewModel.validData=false;
		}
		//这段else if是用当用户只输入-时能检测出错误
		
		this.setState({propertyViewModels,dataChanged:true})
	}	
	
	handleCancel(){
		this.props.onClose();
	}
	
	handleSubmit(){
		const {propertyViewModels}=this.state;
		const {editingRecords}=this.props;  //???这句话的意思和目的
		const updatedFields=Object.create(slaRecord.prototype); //？？还不是很清楚。object.prototype就是表示原型对象。但不明白这句话的目的
		const slaIds=this.props.editingRecords.map(x=>x.id);
		const changeProperties=[];
		propertyViewModels.forEach(item=>{
			if(item.oriValue!=value){
				changeProperties.push(item.name);
				setPropertyValue(updatedFields,item.name,item.value);
			}
		});
		
		const batchUpdateRequest = { SLAIds: slaIds, SLAUpdateFields: updatedFields };
		this.setState({loading:true,loadingHint:loadingText}); //显示提交时的加载画面
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
  
  render(){
	  const {loading,loadingHint,propertyViewModels,dataChanged}=this.state;
	  const allowSubmit=dataChanged&&propertyViewModels.reduce((first,second)=>({validData:first.validData&&second.validData})).validData;//???不是返回结果就已经是validdata了吗
	  
	  return(){
		  <modal
			destroyOnClose
			wrapClassName="vertical-center-modal new_modal"
			title={<div className='img_container'><img className='edit_img' src={require('../Resources/images/icon_edit.png')} alt=''/>Edit Entry</div>
			visible={this.props.visible}
			onCancel={()=>{this.handleCancel();}}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

