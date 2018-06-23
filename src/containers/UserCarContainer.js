import { connect } from 'react-redux';
import CarSVG from '../components/CarSVG';
//import { setConfigVar, clearConfigVar } from '../actions/carConfig';
function mapStateToProps(state) {
  return {
    config: state.carConfig,
    height: state.dimensions.workspaceHeight,
    width: state.dimensions.workspaceWidth,
    hullColor: "red",
    wheelColor: "black"
  }

}

export default connect(mapStateToProps)(CarSVG);
