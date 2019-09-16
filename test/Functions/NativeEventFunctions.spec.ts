import Vue from "vue";
import EasyVueTest, { click, dom, getData, keyup } from "../../src/main";

describe("NativeEventFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const component = Vue.component("TestComponent", {
      template: `
        <div>
          <input class="keyboard-event-dispatcher" @keyup.enter="onEnterPressed"></input>
          <button class="mouse-event-dispatcher" @click="onClicked">Click Me!</button>
        </div>
      `,

      data() {
        return {
          log: [] as string[],
        };
      },

      methods: {
        onEnterPressed(event: any) {
          this.log.push("enter pressed");
        },

        onClicked() {
          this.log.push("clicked");
        },
      },
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("fires up the click event correctly", async () => {
    await easy
      .get(dom(".mouse-event-dispatcher"))
      .do(click())
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("log")),
    ).toContain("clicked");
  });

  it("fires up the keyboard event correctly", async () => {
    await easy
      .get(dom(".keyboard-event-dispatcher"))
      .do(keyup())
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("log")),
    ).toContain("enter pressed");
  });
});
