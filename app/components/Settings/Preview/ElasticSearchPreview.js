
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {flatten, keys} from 'ramda';
import Select from 'react-select';

class ElasticSearchPreview extends Component {

    constructor( props ){
        super(props);
        console.log( 'Building Elastic Search Preview');
        /*const {
        } = props;*/
    }

    handleChange(selectedOption){
        this.setState({ selectedOption });
        console.log(`Selected: ${selectedOption.label}`);
    }

    renderElasticsearchIndecies() {
        const {
            elasticsearchMappingsRequest: EMR,
            setIndex,
            selectedIndex
        } = this.props;
        if (!EMR.status) {
            return null;
        } else if (EMR.status === 'loading') {
            return <div>{'Loading docs'}</div>;
        } else if (EMR.status > 300) {
            // TODO - Make this prettier.
            return (
                <div>
                    <div>{'There was an error loading up your docs'}</div>
                    <div style={{color: 'red'}}>{JSON.stringify(EMR)}</div>
                </div>
            );
        } else if (EMR.status === 200) {
            const indeciesList = keys(EMR.content);
            if (indeciesList.length === 0) {
                return <div>{'No docs found'}</div>;
            }
            return (
                <div className={'dropdown'}
                    id="test-table-dropdown"
                >
                    <Select
                        options={indeciesList.map(t => ({label: t, value: t}))}
                        value={selectedIndex}
                        searchable={false}
                        onChange={option => {
                            setIndex(option.value);
                        }}
                    />
                </div>
            );
        }
    }

    renderElasticsearchDocs() {
        const {
            selectedTable,
            selectedIndex,
            elasticsearchMappingsRequest: EMR,
            setTable
        } = this.props;

        if (!selectedIndex) {
            return null;
        }

        const tablesList = keys(EMR.content[selectedIndex].mappings);
        if (tablesList.length === 0) {
            return <div>{'No docs found'}</div>;
        }

        return (
            <div className={'dropdown'}
                id="test-table-dropdown"
            >
                <Select
                    options={tablesList.map(t => ({label: t, value: t}))}
                    value={selectedTable}
                    searchable={false}
                    onChange={option => {
                        setTable(option.value);
                    }}
                />
            </div>
        );
    }

    render(){

        return (
            <div style={{marginTop: '25px'}}>
                {this.renderElasticsearchIndecies()}
                {this.renderElasticsearchDocs()}
            </div>
        );
    }
};

ElasticSearchPreview.propTypes = {
};

export default ElasticSearchPreview;
