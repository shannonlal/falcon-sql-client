import {assert} from 'chai';

import {
    PlotlyAPIRequest,
    updateGrid
} from '../../backend/persistent/PlotlyAPI.js';
import {saveSetting} from '../../backend/settings.js';
import {
    apiKey,
    assertResponseStatus,
    createGrid,
    getResponseJson,
    names,
    username
} from './utils.js';

// Suppressing ESLint cause Mocha ensures `this` is bound in test functions
/* eslint-disable no-invalid-this */
describe('Grid API Functions', function () {
    before(() => {
        saveSetting('USERS', [{username, apiKey}]);
        saveSetting('PLOTLY_API_DOMAIN', 'api.plot.ly');
        saveSetting('PLOTLY_API_SSL_ENABLED', true);
    });

    it('updateGrid overwrites a grid with new data', function () {
        // First, create a new grid.
        // Note that the app never actually does this,
        // it works off of the assumption that a grid exists

        let fid;
        return createGrid('Test updateGrid')
        .then(assertResponseStatus(201))
        .then(getResponseJson).then(json => {
            fid = json.file.fid;
            const uids = json.file.cols.map(col => col.uid);
            return updateGrid(
                [
                    ['x', 10, 40, 70, 100, 130],
                    ['y', 20, 50, 80, 110, 140],
                    ['z', 30, 60, 90, 120, 150]
                ],
                fid,
                uids,
                username
            );
        })
        .then(assertResponseStatus(200))
        .then(() => {
            const url = `grids/${fid}/content`;
            return PlotlyAPIRequest(url, {username, apiKey, method: 'GET'});
        })
        .then(assertResponseStatus(200))
        .then(getResponseJson).then(json => {
            assert.deepEqual(
                json.cols[names[0]].data,
                ['x', 'y', 'z']
            );
            assert.deepEqual(
                json.cols[names[1]].data,
                [10, 20, 30]
            );
            assert.deepEqual(
                json.cols[names[2]].data,
                [40, 50, 60]
            );
            assert.deepEqual(
                json.cols[names[3]].data,
                [70, 80, 90]
            );
            assert.deepEqual(
                json.cols[names[4]].data,
                [100, 110, 120]
            );
            assert.deepEqual(
                json.cols[names[5]].data,
                [130, 140, 150]
            );
        });
    });
});
/* eslint-enable no-invalid-this */
