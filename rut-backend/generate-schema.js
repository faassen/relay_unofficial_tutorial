import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';
import fs from 'fs';
import path from 'path';
import {Schema} from './src/schema';

graphql(Schema, introspectionQuery).then(result => {
    if (result.errors) {
        return console.error('Could not generate schema:',
                             JSON.stringify(result.errors, null, 2));
    }
    fs.writeFileSync(
        path.join(__dirname, './schema.json'),
        JSON.stringify(result, null, 2)
    );
    console.log("Generated schema.json");
});
