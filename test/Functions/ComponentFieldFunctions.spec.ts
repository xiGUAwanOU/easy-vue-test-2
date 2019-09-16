import Vue from "vue";
import EasyVueTest, { getComputed, getData, getProp, setComputed, setData, setProp } from "../../src/main";

describe("DomFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const component = Vue.component("TestComponent", {
      template: `
        <div>
          <div class="navigation">
            <p>{{ propContent }}</p>
          </div>
          <p id="the-message">{{ dataContent }}</p>
          <p class="message">{{ computedContent }}</p>
        </div>
      `,

      props: {
        propContent: { type: String, required: true },
      },

      data() {
        return {
          dataContent: "bar",
        };
      },

      computed: {
        computedContent: {
          get(): string {
            return this.dataContent + " " + this.dataContent;
          },
          set(value: string) {
            this.dataContent = value.split(" ")[0];
          },
        },
      },
    });

    easy = await EasyVueTest.mounted(component, {
      propsData: {
        propContent: "foo",
      },
    });
  });

  it("gets prop, data and computed fields correctly", () => {
    expect(easy
      .do(getProp("propContent")),
    ).toEqual("foo");

    expect(easy
      .do(getData("dataContent")),
    ).toEqual("bar");

    expect(easy
      .do(getComputed("computedContent")),
    ).toEqual("bar bar");
  });

  it("sets prop, data and computed fields correctly", async () => {
    await easy
      .do(setProp("propContent", "baz"))
      .untilAsyncTasksDone();

    expect(easy
      .do(getProp("propContent")),
    ).toEqual("baz");

    await easy
      .do(setData("dataContent", "baz"))
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("dataContent")),
    ).toEqual("baz");
    expect(easy
      .do(getComputed("computedContent")),
    ).toEqual("baz baz");

    await easy
      .do(setComputed("computedContent", "bar baz"))
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("dataContent")),
    ).toEqual("bar");
    expect(easy
      .do(getComputed("computedContent")),
    ).toEqual("bar bar");
  });
});
