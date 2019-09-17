import Vue from "vue";
import EasyVueTest, { childBySelector, click, element, emitVueEvent, getTextContent, setVueEventListener } from "../../src/main";

describe("VueEventFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const childComponent = Vue.component("Child", {
      template: "<div><p>Hello world!</p></div>",
    });

    const component = Vue.component("Parent", {
      template: `
      <div>
        <child-component id="child" @event="onVueEventFromChild"></child-component>
        <p>{{ message }}</p>
        <button @click="$emit('clicked', 'Mouse button clicked!')">Click me!</button>
      </div>
      `,
      components: {
        childComponent,
      },
      data() {
        return { message: "" };
      },
      methods: {
        onVueEventFromChild() {
          this.message = "Vue event received!";
        },
      },
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("calls event listener while vue event being triggered", async () => {
    const eventListener = jest.fn();
    easy.do(setVueEventListener("clicked", eventListener));

    await easy
      .get(element("button"))
      .do(click())
      .untilAsyncTasksDone();

    expect(eventListener).toHaveBeenCalledWith("Mouse button clicked!");
  });

  it("triggers event from root element", async () => {
    const eventListener = jest.fn();
    easy.do(setVueEventListener("triggered", eventListener));

    await easy
      .do(emitVueEvent("triggered", "foo", "bar"))
      .untilAsyncTasksDone();

    expect(eventListener).toHaveBeenCalledWith("foo", "bar");
  });

  it("triggers event from child element", async () => {
    await easy
      .get(childBySelector("#child"))
      .do(emitVueEvent("event"))
      .untilAsyncTasksDone();

    expect(easy
      .get(element("p"))
      .do(getTextContent()),
    ).toEqual("Hello world!");
  });
});
