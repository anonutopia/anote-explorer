import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {UnconfirmedTxList} from './UnconfirmedTxList.view';

class UnconfirmedTxListContainer extends React.Component {
    state = {
        unconfirmed: []
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        return ServiceFactory.forNetwork(networkId).transactionService().loadUnconfirmed()
            .then(unconfirmed => this.setState({unconfirmed}));
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 5000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load unconfirmed transactions">
                <UnconfirmedTxList transactions={this.state.unconfirmed} />
            </Loader>
        );
    }
}

export const RoutedUnconfirmedTxListContainer = withRouter(UnconfirmedTxListContainer);
