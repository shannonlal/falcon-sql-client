jest.dontMock('../../../../../app/components/Settings/ConnectButton/ConnectButton.react.js');
var ConnectButton = require('../../../../../app/components/Settings/ConnectButton/ConnectButton.react.js');
import React from 'react';
var TestUtils = require('react-addons-test-utils');
import { mount, shallow } from 'enzyme';     

test('ConnectButton test components ', () => {


    expect( 'hello' ).toBeDefined();

    expect( ConnectButton ).toBeDefined();
    
    /*var planDurationLabel = TestUtils.renderIntoDocument(
        <ConnectButton />
    );

    var planLabelNode = ReactDOM.findDOMNode(planDurationLabel);

    expect(planLabelNode).toBeDefined();*/
});