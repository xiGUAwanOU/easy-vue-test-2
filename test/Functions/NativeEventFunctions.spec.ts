import Vue from "vue";
import EasyVueTest, { click, element, getData, KEYS, keyup } from "../../src/main";

describe("NativeEventFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const component = Vue.component("TestComponent", {
      template: `
        <div>
          <input class="enter-event-dispatcher" @keyup.enter="onKeyup"></input>
          <input class="escape-event-dispatcher" @keyup.esc="onKeyup"></input>
          <button class="mouse-event-dispatcher" @click="onClick">Click Me!</button>
        </div>
      `,

      data() {
        return {
          log: [] as string[],
        };
      },

      methods: {
        onKeyup(event: any) {
          this.log.push(`${event.key} pressed`);
        },

        onClick() {
          this.log.push("clicked");
        },
      },
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("fires up the click event correctly", async () => {
    await easy
      .get(element(".mouse-event-dispatcher"))
      .do(click())
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("log")),
    ).toContain("clicked");
  });

  it("fires up the keyboard event correctly", async () => {
    await easy
      .get(element(".enter-event-dispatcher"))
      .do(keyup())
      .untilAsyncTasksDone();

    await easy
      .get(element(".escape-event-dispatcher"))
      .do(keyup(KEYS.ESCAPE))
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("log")),
    ).toContain("Enter pressed");
    expect(easy
      .do(getData("log")),
    ).toContain("Escape pressed");
  });

  it("doesn't fire up keyboard event if the key is not matching", async () => {
    await easy
      .get(element(".escape-event-dispatcher"))
      .do(keyup(KEYS.ENTER))
      .untilAsyncTasksDone();

    expect(easy
      .do(getData("log")),
    ).toEqual([]);
  });
});
