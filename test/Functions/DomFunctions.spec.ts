import Vue from "vue";
import EasyVueTest, { checkDomExistence, dom } from "../../src/main";

describe("DomFunctions", () => {
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
      .get(dom(".navigation"))
      .do(checkDomExistence("p")),
    ).toEqual(true);

    expect(easy
      .get(dom(".navigation"))
      .do(checkDomExistence(".non-existing-element")),
    ).toEqual(false);

    expect(easy
      .do(checkDomExistence("p#the-message")),
    ).toEqual(true);

    expect(easy
      .do(checkDomExistence("p.message")),
    ).toEqual(true);

    expect(easy
      .do(checkDomExistence(".non-existing-element")),
    ).toEqual(false);
  });
});
