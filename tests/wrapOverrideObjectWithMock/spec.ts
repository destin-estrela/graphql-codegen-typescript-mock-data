import { plugin } from '../../src';
import testSchema from './schema';

it('should wrap overrided object types with its associated mock function when wrapOverrideObjectWithmock is true', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "avatar: overrides && overrides.hasOwnProperty('avatar') ? anAvatar(overrides.avatar!) : anAvatar(),",
    );
    expect(result).toMatchSnapshot();
});

it('should not wrap union types', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "unionThing: overrides && overrides.hasOwnProperty('unionThing') ? overrides.unionThing! : anAvatar(),",
    );
});

it('should wrap each object in an overrided list type with its associated mock function when wrapOverrideObjectWithmock is true', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "listOfObjects: overrides && overrides.hasOwnProperty('listOfObjects') ? overrides.listOfObjects!.map(item => anAbcType(item)) : [anAbcType()],",
    );
});

it('should support nullable nested lists', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "nestedList: overrides && overrides.hasOwnProperty('nestedList') ? overrides.nestedList!.map(item => item ? item.map(item => item ? item.map(item => item ? anAbcType(item) : null) : null) : null) : [[[anAbcType()]]],",
    );
});

it('should not wrap non-object types in overrided list type', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "nullableStringList: overrides && overrides.hasOwnProperty('nullableStringList') ? overrides.nullableStringList! : ['eum'],",
    );
});

it.skip('should wrap overrided object types with its associated mock function when terminateCircularRelationships is true', async () => {
    const result = await plugin(testSchema, [], {
        wrapOverrideObjectWithMock: true,
        terminateCircularRelationships: true,
    });

    expect(result).toBeDefined();
    expect(result).toContain(
        "avatar: overrides && overrides.hasOwnProperty('avatar') ? anAvatar(overrides.avatar!) : anAvatar(),",
    );
    expect(result).toMatchSnapshot();
});
