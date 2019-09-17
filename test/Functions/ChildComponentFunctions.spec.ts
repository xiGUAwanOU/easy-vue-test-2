import Vue from "vue";
import EasyVueTest, {
  childByName,
  childByRef,
  childBySelector,
  childrenByName,
  childrenBySelector,
  element,
  getTextContent,
} from "../../src/main";

describe("ChildComponentFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const childComponent = Vue.component("Child", {
      template: `
        <div>
          <p>Hello world!</p>
        </div>
      `,
    });

    const component = Vue.component("Parent", {
      template: `
        <div>
          <child-component id="child" ref="child"/>
        </div>
      `,
      components: {
        childComponent,
      },
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("gets child component in different ways", () => {
    expect(easy
      .get(childByName("child-component"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .get(childBySelector("#child"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .get(childByRef("child"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });

  it("gets children components in different ways", () => {
    expect(easy
      .getAll(childrenByName("child-component"))[0]
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .getAll(childrenBySelector("#child"))[0]
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });
});
