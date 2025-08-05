import m from "mithril";

class PageView {
  view() {
    return m("p", "Hello, world!");
  }
}

m.mount(document.body, PageView);
