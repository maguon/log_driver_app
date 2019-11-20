import React, { Component } from 'react';
import {
    Text
} from 'react-native';

export default class DataTime extends Component {
    constructor(props){
        super(props);
        this.state={
            hour:'00',
            minutes:'00',
            seconds:'00',
            hidden:false,
        }
        this.countTime();
    }

    componentWillUnmount() {
        clearInterval(this._timer)
    }
    render() {
        return (
            <Text style={{fontSize:18,color:"white"}}>{this.state.hour}:{this.state.minutes}:{this.state.seconds}</Text>
        );
    }

    countTime(){
        this._timer=setInterval(()=>{
            let ct=this.state.seconds;
            let mt=this.state.minutes;
            let hu=this.state.hour;
            if (ct<59) {
                ct++;
                if(ct<10){ct="0"+ct}
                this.setState({seconds:ct});
            } else if (ct==59) {
                mt++;
                ct='00';
                if(mt<10){mt="0"+mt}
                this.setState({seconds:ct});
                this.setState({minutes:mt});
            }
            if(mt==60){
                hu++;
                mt='00';
                if(hu<10){hu="0"+hu}
                this.setState({minutes:mt});
                this.setState({hour:hu});
            }

        },1000);
    }
}
