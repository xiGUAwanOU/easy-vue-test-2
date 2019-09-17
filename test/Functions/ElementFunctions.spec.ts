import Vue from "vue";
import EasyVueTest, { checkElementExistence, element } from "../../src/main";

describe("ElementFunctions", () => {
  let easy: EasyVueTest;

  beforeEach(async () => {
    const component = Vue.component("TestComponent", {
      template: `
        <div>
          <div class="navigation">
            <p>foo</p>
          </div>
          <p id="the-message">bar</p>
          <p class="message">baz</p>
        </div>
      `,
    });

    easy = await EasyVueTest.mounted(component);
  });

  it("checks the existence of an element correctly", () => {
    expect(easy
      .get(element(".navigation"))
      .do(checkElementExistence("p")),
    ).toEqual(true);

    expect(easy
      .get(element(".navigation"))
      .do(checkElementExistence(".non-existing-element")),
    ).toEqual(false);

    expect(easy
      .do(checkElementExistence("p#the-message")),
    ).toEqual(true);

    expect(easy
      .do(checkElementExistence("p.message")),
    ).toEqual(true);

    expect(easy
      .do(checkElementExistence(".non-existing-element")),
    ).toEqual(false);
  });
});
