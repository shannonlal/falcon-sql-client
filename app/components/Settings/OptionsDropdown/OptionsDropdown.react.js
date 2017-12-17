import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {flatten, keys} from 'ramda';
import Select from 'react-select';

export default class OptionsDropdown extends Component {
    constructor(props) {
        super(props);
        this.renderSQLOptions = this.renderSQLOptions.bind(this);
        this.renderElasticsearchIndecies = this.renderElasticsearchIndecies.bind(this);
        this.renderElasticsearchDocs = this.renderElasticsearchDocs.bind(this);
    }

    static propTypes = {
        // See type of react-select's Select `value` property
        selectedTable: PropTypes.any,
        selectedIndex: PropTypes.any,

        tablesRequest: PropTypes.object,
        setTable: PropTypes.func,
        elasticsearchMappingsRequest: PropTypes.object,
        setIndex: PropTypes.func
    }

    renderSQLOptions() {
        const {selectedTable, tablesRequest, setTable} = this.props;
        if (!tablesRequest.status) {
            return null;
        } else if (tablesRequest.status === 'loading') {
            return <div>{'Loading tables'}</div>;
        } else if (tablesRequest.status > 300) {
            // TODO - Make this prettier.
            return (
                <div>
                    <div>{'Hm.. there was an error loading up your tables'}</div>
                    <div style={{color: 'red'}}>{JSON.stringify(tablesRequest)}</div>
                </div>
            );
        } else if (tablesRequest.status === 200) {
            const tablesList = flatten(tablesRequest.content);
            if (tablesList.length === 0) {
                return <div>{'No tables found'}</div>;
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
    }

    renderElasticsearchIndecies() {
        console.log( 'Rendering elastic search drop down');
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
                            console.log( 'Changing value', option);
                            setIndex(option.value);
                        }}
                    />
                </div>
            );
        }
    }

    renderElasticsearchDocs() {
        console.log( 'Rendering elastic search drop down docs');
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
                        console.log( 'Setting table', option);
                        setTable(option.value);
                    }}
                />
            </div>
        );
    }

    render() {
        return (
            <div style={{marginTop: '25px'}}>
                {this.renderSQLOptions()}
                {this.renderElasticsearchIndecies()}
                {this.renderElasticsearchDocs()}
            </div>
        );
    }
}
