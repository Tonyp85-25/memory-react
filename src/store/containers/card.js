import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state,ownProps) => ({
    id: state.id,
    className: state.className,
    clickable: state.clickable
})

const mapDispatchToProps = dispatch =>({
    turnCard :bindActionCreators({turnOn},dispatch)    
})

/* Container*/ 
const cardContainer = connect(mapStateToProps, mapDispatchToProps)(Card)