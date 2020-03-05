import Vue from "vue";
import EasyVueTest, {
  childByName,
  childByRef,
  childBySelector,
  childrenByName,
  childrenBySelector,
  element,
  getData,
  getTextContent,
} from "../../src/main";

describe("ChildComponentFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const grandChildComponent = Vue.component("GrandChildComponent", {
      template: `
        <div class="grand-child-component" >
          <p>{{ message }}</p>
        </div>
      `,
      props: {
        message: { type: String, required: true },
      },
      data() {
        return {
          hiddenMessage: "I'm grand child component",
        };
      },
    });

    const childComponent = Vue.component("ChildComponent", {
      template: `
        <grand-child-component class="child-component" message="Hello world!" />
      `,
      components: {
        grandChildComponent,
      },
      data() {
        return {
          hiddenMessage: "I'm child component",
        };
      },
    });

    const parentComponent = Vue.component("ParentComponent", {
      template: `
        <div>
          <child-component class="child" ref="child"/>
        </div>
      `,
      components: {
        childComponent,
      },
    });

    easy = await EasyVueTest.mounted(parentComponent);
  });

  it("gets child or children by name", () => {
    expect(easy
      .get(childByName("child-component"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .getAll(childrenByName("child-component"))[0]
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });

  it("gets child or children by querying selector", () => {
    expect(easy
      .get(childBySelector(".child"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .get(childBySelector(".child"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .getAll(childrenBySelector(".child"))[0]
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });

  it("gets the child and children by querying selector and filtering by name", () => {
    expect(easy
      .get(childBySelector(".child", "child-component"))
      .do(getData("hiddenMessage")),
    ).toEqual("I'm child component");

    expect(easy
      .get(childBySelector(".child", "grand-child-component"))
      .do(getData("hiddenMessage")),
    ).toEqual("I'm grand child component");

    expect(easy
      .getAll(childrenBySelector(".child", "child-component"))[0]
      .do(getData("hiddenMessage")),
    ).toEqual("I'm child component");

    expect(easy
      .getAll(childrenBySelector(".child", "grand-child-component"))[0]
      .do(getData("hiddenMessage")),
    ).toEqual("I'm grand child component");
  });

  it("gets child component in different ways", () => {
    expect(easy
      .get(childByName("child-component"))
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");

    expect(easy
      .get(childBySelector(".child"))
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
      .getAll(childrenBySelector(".child"))[0]
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });
});
