jest.dontMock('../../../../../app/components/Settings/ConnectButton/ConnectButton.react.js');
import ConnectButton from '../../../../../app/components/Settings/ConnectButton/ConnectButton.react.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render, configure } from 'enzyme';   
import Adapter from 'enzyme-adapter-react-15';

describe('Connect Button Tests', () => {

    beforeAll( ()=> {
        //Setup the test
        configure({ adapter: new Adapter() });
    });

    it('Should verify Connection Request Error', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:400
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().isConnectionError()).toBeTruthy();
    });

    it('Should verify Save Connections Request Error', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:400
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().isConnectionError()).toBeTruthy();
    });

    it('Should verify Save Connections Request without Error', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().isConnectionError()).toBeFalsy();
    });

    it('Should verify loading connection request loading status', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:'loading'
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().loadingStatus()).toBeTruthy();
    });

    it('Should verify loading save connections request loading status', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:'loading'
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().loadingStatus()).toBeTruthy();
    });

    it('Should verify not loading status', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().loadingStatus()).toBeFalsy();
    });

    it('Should verify valid connection', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = true;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();

        expect( button.instance().isValidConnection()).toBeTruthy();
    });

    it('Should verify valid connection', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:400
        };
        const saveConnectionsRequest = {
            status:400
        };
        const editMode = true;

        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();
        expect( button.instance().isValidConnection()).toBeFalsy();
    });

    it('Should verify connection status', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
        };
        const saveConnectionsRequest = {
            status:400
        };
        const editMode = true;
        
        const buttonWrapper = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( buttonWrapper ).toBeDefined();
        expect( buttonWrapper.instance().isValidConnection()).toBeFalsy();
    });

    it('Should create valid connected button', () => {
        expect( ConnectButton ).toBeDefined();

        const connect = function(){}
        const connectRequest = {
            status:200
        };
        const saveConnectionsRequest = {
            status:200
        };
        const editMode = false;
        
        const button = mount( <ConnectButton connect={connect} connectRequest={connectRequest} 
            saveConnectionsRequest={saveConnectionsRequest} 
            editMode={editMode}/>);

        expect( button ).toBeDefined();

        //If length is 0 not found else length is 1
        let b = button.find({editMode:false});

        //Length is 1
        b = button.find( '.connectButtonContainer' );

        //Length is 0
        b = button.find( '.connectButtonContainer1231' );
        console.log( 'b', b);

        //console.log( 'Button Node', button );

        expect(button.find('.connectButtonContainer121')).toBeDefined();

        //const b = button.find( '.connectButtonContainer111');//.toBeDefined();

        //console.log( 'Div', b);
    });
});