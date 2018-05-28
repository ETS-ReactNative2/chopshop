import { connect } from 'react-redux';
import Workspace from '../components/Workspace';
import { testDrive } from '../actions/testDrive';
function mapStateToProps(state){
	return {
		height: state.dimensions.workspaceHeight,
		width: state.dimensions.workspaceWidth,
    carConfig: state.carConfig
	}

}
function mapDispatchToProps(dispatch){
  return {
    handleTestDrive: (e)=>{
      dispatch(testDrive());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Workspace)
