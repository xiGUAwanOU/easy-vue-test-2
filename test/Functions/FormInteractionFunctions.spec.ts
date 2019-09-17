import Vue from "vue";
import EasyVueTest, {
  childByName,
  childByRef,
  childBySelector,
  childrenByName,
  childrenBySelector,
  element,
  getInputValue,
  getTextContent,
  setData,
  setInputValue,
} from "../../src/main";

describe("FormInteractionFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const component = Vue.component("TestComponent", {
      template: `
        <div>
          <input class="text-input" type="text" v-model="text"/>
          <span class="text-input-value">{{ text }}</span>
        </div>
      `,
      data() {
        return { text: "" };
      },
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("sets text input value", async () => {
    await easy
      .get(element(".text-input"))
      .do(setInputValue("hello world"))
      .untilAsyncTasksDone();

    expect(easy
      .get(element(".text-input-value"))
      .do(getTextContent()),
    ).toEqual("hello world");
  });

  it("gets text input value", async () => {
    await easy
      .do(setData("text", "hello world"))
      .untilAsyncTasksDone();

    expect(easy
      .get(element(".text-input"))
      .do(getInputValue()),
    ).toEqual("hello world");
  });
});
