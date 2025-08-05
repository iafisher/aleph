import m from "mithril";

const PageView = {
  oninit(vnode) {
    vnode.state.terminals = [{}];
  },

  view(vnode) {
    return m(
      "main", 
      vnode.state.terminals.map((t, idx) => 
        m(TerminalView, { key: idx, onFinish: () => this.onFinish(vnode) })
      ),
    );
  },

  onFinish(vnode) {
    vnode.state.terminals.push({});
  },
};

const TerminalView = {
  oninit(vnode) {
    vnode.state.command = null;
  },

  view(vnode) {
    const finished = vnode.state.command !== null;
    const parentClass = finished ? "finished" : "pending";
    return m(
      "div.terminal",
      { class: parentClass },
      [
        m(
          "div.entry",
          [
            m("span.prefix", "$"),
            m("input", {
              disabled: finished,
              onkeydown: e => this.onKeyDown(vnode, e),
              oncreate: v => { v.dom.focus(); },
            }),
          ]
        ),
        m("textarea", { readonly: true, oncreate: v => { vnode.state.textarea = v.dom; } }),
      ]
    );
  },

  onKeyDown(vnode, e) {
    if (e.key === "Enter") {
      vnode.state.command = e.target.value;
      executeCommand(e.target.value, vnode.state.textarea);
      vnode.attrs.onFinish();
    }
  },
};

function executeCommand(cmd, textarea) {
  setTimeout(() => {
    textarea.value += "Lorem ipsum\n";
  }, 500);
}

m.mount(document.body, PageView);
