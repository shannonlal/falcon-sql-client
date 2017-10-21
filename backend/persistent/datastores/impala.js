import fetch from 'node-fetch';
import * as impala from 'node-impala';
import {dissoc, keys, values, init, map, prepend, unnest} from 'ramda';

import Logger from '../../logger';


export function createClient(connection) {
    const client = impala.createClient();
    client.connect({
        host: connection.host,
        port: connection.port,
        resultType: 'json-array'
    });
    return client;
}

export function tables(connection) {
    const code = (connection.database) ?
        `show tables in ${connection.database}` :
        'show tables';
    return createClient(connection).query(code)
    .then(json => {
        let tableNames = json.map(t => t.name);
        if (connection.database) tableNames = tableNames.map(tn => `${connection.database}.${tn}`);
        tableNames = tableNames.map(tn => tn.toUpperCase());

        return tableNames;
    }).catch(err => {
      Logger.log(err);
      throw new Error(err);
    });
}

export function schemas(connection) {
    let columnnames = ['tablename', 'column_name', 'data_type'];
    const showTables = (connection.database) ?
        `show tables in ${connection.database}` :
        'show tables';

    return createClient(connection).query(showTables)
    .then(json => {
        let tableNames = json.map(t => t.name);
        if (connection.database) tableNames = tableNames.map(tn => `${connection.database}.${tn}`);

        /*
         * The last column in the output of describe statement is 'comment',
         * so we remove it(using Ramda.init) before sending out the result.
         */
        const promises = map(tableName => {
            return query(`describe ${tableName}`, connection)
            .then(json => map(row => prepend(tableName, init(row)), json.rows));
        }, tableNames);

        // Wait for all the describe-table promises to resolve before resolving:
        return Promise.all(promises);
    }).then(res => {

      // The results are nested inside a list, so we need to un-nest first:
      const rows = unnest(res);
      return {columnnames, rows};
    }).catch(err => {
        Logger.log(err);
        throw new Error(err);
    });
}

export function query(query, connection) {

    return createClient(connection).query(query)
    .then(json => {
      let columnnames = [];
      let rows = [[]];
      if (json.length !== 0) {
          columnnames = keys(json[0]);
          rows = json.map(obj => values(obj));
      }
      return {columnnames, rows};
    }).catch(err => {
        Logger.log(err);
        throw new Error(err)
    });
}
