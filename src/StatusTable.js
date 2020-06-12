import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Ticker from './Ticker';


export default class StatusTable extends React.Component {
    constructor(props) {
        super(props);
        this.prevPrice = null;
        this.getPF = this.getPF.bind(this)
    }

    getPF() {
        var currPF = Math.round((this.props.stocks * this.props.price)*100)/100;
        var prevPF = Math.round((this.props.stocks * this.prevPrice)*100)/100;

        var priceDiff = (this.prevPrice ? Math.round((currPF - prevPF + Number.EPSILON) * 100) / 100 : 0);
        return <Ticker bold={false} curr={currPF} diff={priceDiff}/>;
      }

    componentDidMount() {
        if (this.prevPrice !== this.props.price) {
            this.prevPrice = this.props.price;
        }
    }

    componentDidUpdate() {
        if (this.prevPrice !== this.props.price) {
          this.prevPrice = this.props.price;
        }
      }
  
      shouldComponentUpdate(nextProps, nextState){
        if (this.props.price === nextProps.price) {
          return false;
        }
        return true;
      }
    
    render() {
        let {cash, stocks} = this.props;
        cash = Math.round(cash*100)/100;
        return (
            <table className="grayTable">
                <tbody>
                <tr>
                    <th>Cash</th>
                    <td>${cash}</td>
                </tr>
                <tr>
                    <th>Stocks Held</th>
                    <td>{stocks}</td>
                </tr>
                <tr>
                    <th>Portfolio</th>
                    <td>{this.getPF()}</td>
                </tr>
                </tbody>
            </table>
        );

    }
}

StatusTable.propTypes = {
    price: PropTypes.number,
    cash: PropTypes.number,
    stocks: PropTypes.number
  };