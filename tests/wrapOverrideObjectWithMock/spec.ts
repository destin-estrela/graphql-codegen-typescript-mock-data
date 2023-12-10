import { plugin } from '../../src';
import testSchema from './schema';

// TODO: test behavior more with implementing types, likely don't
// want to inject at all when there are implementing types due to type name claching

it('should wrap overrided object types with its associated mock function', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toBeDefined();
    expect(result).toContain(
        "avatar: overrides && overrides.hasOwnProperty('avatar') ? anAvatar(overrides.avatar!) : anAvatar(),",
    );
    expect(result).toMatchSnapshot();
});

it('should not wrap union types', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toContain(
        "unionThing: overrides && overrides.hasOwnProperty('unionThing') ? overrides.unionThing! : anAvatar(),",
    );
});

it('should support non-nullable lists with nullable elements', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });
    // [Avatar]!
    expect(result).toContain(
        "listTest1: overrides && overrides.hasOwnProperty('listTest1') ? overrides.listTest1!.map(item => item ? anAvatar(item) : null) : [anAvatar()],",
    );
});

it('should support non-nullable lists with non-nullable elements', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });
    // [Avatar!]!
    expect(result).toBeDefined();
    expect(result).toContain(
        "listTest2: overrides && overrides.hasOwnProperty('listTest2') ? overrides.listTest2!.map(item => anAvatar(item)) : [anAvatar()],",
    );
});

it('should support deeply nested lists alternating between nullable and non-nullable mapping types', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    // [[[[[Avatar!]!]!]]]!
    expect(result).toContain(
        "listTest3: overrides && overrides.hasOwnProperty('listTest3') ? overrides.listTest3!.map(item => item ? item.map(item => item ? item.map(item => item.map(item => item.map(item => anAvatar(item)))) : null) : null) : [[[[[anAvatar()]]]]],",
    );
    // [[[Avatar!]]!]!
    expect(result).toContain(
        "listTest4: overrides && overrides.hasOwnProperty('listTest4') ? overrides.listTest4!.map(item => item.map(item => item ? item.map(item => anAvatar(item)) : null)) : [[[anAvatar()]]]",
    );
});

it('should not affect lists or nested lists of primitive types', async () => {
    const result = await plugin(testSchema, [], { wrapOverrideObjectWithMock: true });

    expect(result).toContain("listTest5: overrides && overrides.hasOwnProperty('listTest5') ? overrides.listTest5! :");
    expect(result).toContain("listTest6: overrides && overrides.hasOwnProperty('listTest6') ? overrides.listTest6! :");
});
