import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import {Board} from '../../components/board'

const mapStateToProps = (state,ownProps) => ({
    cards : state.cards,
    pairs : state.pairs
})

const mapDispatchToProps = dispatch =>({
        
})

export const BoardContainer = connect(mapStateToProps,mapDispatchToProps)(Board)