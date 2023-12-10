import { plugin } from '../../src';
import testSchema from './schema';

// TODO: add actual looping types to improve test

it('should support wrapOverrideObjectWithMock and terminateCircularRelationships at the same time', async () => {
    const result = await plugin(testSchema, [], {
        wrapOverrideObjectWithMock: true,
        terminateCircularRelationships: true,
    });

    expect(result).toBeDefined();

    expect(result).toContain(
        "camelCaseThing: overrides && overrides.hasOwnProperty('camelCaseThing') ? (relationshipsToOmit.has('CamelCaseThing') ? overrides.camelCaseThing! : aCamelCaseThing(overrides.camelCaseThing!, relationshipsToOmit)) : relationshipsToOmit.has('CamelCaseThing') ? {} as CamelCaseThing : aCamelCaseThing({}, relationshipsToOmit),",
    );

    expect(result).toContain(
        "listTest: overrides && overrides.hasOwnProperty('listTest') ? overrides.listTest!.map(item => (relationshipsToOmit.has('CamelCaseThing') ? item : aCamelCaseThing(item, relationshipsToOmit))) : [relationshipsToOmit.has('CamelCaseThing') ? {} as CamelCaseThing : aCamelCaseThing({}, relationshipsToOmit)],",
    );

    expect(result).toMatchSnapshot();
});
